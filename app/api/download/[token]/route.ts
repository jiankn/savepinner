/**
 * GET /api/download/{token} — PRD §7.2.
 *
 * Streams a token-verified Pinterest CDN resource as an attachment. No
 * arbitrary URL proxying: the target is entirely defined by the signed
 * token minted by /api/resolve.
 */

import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { config } from "@/lib/config";
import { verifyToken } from "@/lib/download-token";
import { ApiError, toErrorResponse } from "@/lib/errors";
import { logger } from "@/lib/logger";
import { acquireConcurrency, checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { streamVerifiedMedia } from "@/lib/transfer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request, ctx: { params: Promise<{ token: string }> }) {
  const requestId = `dl_${randomBytes(6).toString("hex")}`;
  const ip = getClientIp(req.headers);

  const fail = (err: unknown): NextResponse => {
    const { body, status, code } = toErrorResponse(err, requestId);
    logger.warn("download_failed", { requestId, code });
    return NextResponse.json(body, { status });
  };

  const rate = checkRateLimit(`download:${ip}`, config.rateDownloadPerMin, 60_000);
  if (!rate.allowed) {
    return NextResponse.json(fail(new ApiError("RATE_LIMITED", "download minute budget exceeded")).body, {
      status: 429,
      headers: { "retry-after": String(rate.retryAfterSec) },
    });
  }
  const slot = acquireConcurrency("download:global", config.downloadGlobalConcurrency);
  if (!slot) return fail(new ApiError("RATE_LIMITED", "global download concurrency exceeded"));

  try {
    const { token } = await ctx.params;
    const payload = verifyToken(token, "dl");
    return await streamVerifiedMedia(payload, req.signal, {
      disposition: "attachment",
      logStartedEvent: "download_started",
      logFailedEvent: "download_failed",
    });
  } catch (err) {
    return fail(err);
  } finally {
    // The stream continues after the handler returns; releasing the slot here
    // bounds accepted connections rather than completed transfers, which is
    // the intended backpressure signal for this MVP.
    slot();
  }
}
