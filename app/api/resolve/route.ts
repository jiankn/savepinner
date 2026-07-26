import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { config } from "@/lib/config";
import { ApiError, toErrorResponse } from "@/lib/errors";
import { durationBucket, logger } from "@/lib/logger";
import { acquireConcurrency, checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { resolvePin } from "@/lib/pinterest";

export const runtime = "nodejs";

const BodySchema = z.object({ url: z.string().trim().min(1).max(2048) });

export async function POST(req: Request) {
  const requestId = `req_${randomBytes(6).toString("hex")}`;
  const startedAt = Date.now();
  const ip = getClientIp(req.headers);

  const fail = (err: unknown): NextResponse => {
    const { body, status, code } = toErrorResponse(err, requestId);
    logger.warn("resolve_failed", {
      requestId,
      code,
      durationMs: Date.now() - startedAt,
      internal: err instanceof ApiError ? err.internal : undefined,
    });
    return NextResponse.json(body, { status });
  };

  const rate = checkRateLimit(`resolve:${ip}`, config.rateResolvePerMin, 60_000);
  if (!rate.allowed) {
    const response = fail(new ApiError("RATE_LIMITED", "ip minute budget exceeded"));
    response.headers.set("retry-after", String(rate.retryAfterSec));
    return response;
  }

  const release = acquireConcurrency(`resolve:${ip}`, config.resolveConcurrencyPerIp);
  if (!release) return fail(new ApiError("RATE_LIMITED", "too many concurrent resolves"));

  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      throw new ApiError("INVALID_URL", "request body is not json");
    }
    const parsed = BodySchema.safeParse(body);
    if (!parsed.success) throw new ApiError("INVALID_URL", "request body failed schema");

    const result = await resolvePin(parsed.data.url);
    const durationMs = Date.now() - startedAt;
    logger.info("resolve_succeeded", {
      requestId,
      mediaType: result.type,
      variantCount: result.variants.length,
      durationMs,
      durationBucket: durationBucket(durationMs),
    });
    return NextResponse.json(result);
  } catch (err) {
    return fail(err);
  } finally {
    release();
  }
}
