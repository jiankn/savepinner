/**
 * GET /api/preview/{token}
 *
 * Token-guarded inline image preview for the result card. Same controls as
 * the download endpoint, but images only, smaller cap and no attachment
 * disposition.
 */

import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/download-token";
import { ApiError, toErrorResponse } from "@/lib/errors";
import { logger } from "@/lib/logger";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { streamVerifiedMedia } from "@/lib/transfer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request, ctx: { params: Promise<{ token: string }> }) {
  const requestId = `pv_${randomBytes(6).toString("hex")}`;
  const ip = getClientIp(req.headers);

  const fail = (err: unknown): NextResponse => {
    const { body, status, code } = toErrorResponse(err, requestId);
    logger.warn("preview_failed", { requestId, code });
    return NextResponse.json(body, { status });
  };

  const rate = checkRateLimit(`preview:${ip}`, 60, 60_000);
  if (!rate.allowed) return fail(new ApiError("RATE_LIMITED", "preview minute budget exceeded"));

  try {
    const { token } = await ctx.params;
    const payload = verifyToken(token, "pv");
    if (!payload.mime.toLowerCase().startsWith("image/")) {
      throw new ApiError("TOKEN_INVALID", "preview token is not for an image");
    }
    return await streamVerifiedMedia(payload, req.signal, {
      disposition: "inline",
      logStartedEvent: "preview_started",
      logFailedEvent: "preview_failed",
    });
  } catch (err) {
    return fail(err);
  }
}
