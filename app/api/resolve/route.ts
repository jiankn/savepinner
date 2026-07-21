/**
 * POST /api/resolve — PRD §7.1.
 *
 * Validates a Pinterest URL, fetches and parses the public Pin page,
 * verifies every media candidate server-side and returns signed,
 * short-lived download tokens for the verified variants.
 */

import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { config } from "@/lib/config";
import { mintToken } from "@/lib/download-token";
import { ApiError, toErrorResponse } from "@/lib/errors";
import { durationBucket, logger } from "@/lib/logger";
import { acquireConcurrency, checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { fetchPinHtml } from "@/lib/pinterest/fetch-pin";
import { parseMediaFromHtml, pickPreviewCandidate, type MediaKind } from "@/lib/pinterest/parse-media";
import { resolveShortUrl } from "@/lib/pinterest/resolve-short-url";
import { validateInputUrl } from "@/lib/pinterest/validate-url";
import { verifyCandidate, verifyCandidates } from "@/lib/pinterest/verify-variant";

export const runtime = "nodejs";

const BodySchema = z.object({
  url: z.string().trim().min(1).max(2048),
});

const MAX_CANDIDATES_TO_CHECK = 12;
const MAX_VARIANTS_RETURNED = 6;

function variantFilename(kind: MediaKind, width?: number, height?: number): string {
  const dims = width && height ? `-${width}x${height}` : "";
  return `savepinner-${kind}${dims}`;
}

export async function POST(req: Request) {
  const requestId = `req_${randomBytes(6).toString("hex")}`;
  const startedAt = Date.now();
  const ip = getClientIp(req.headers);

  const fail = (err: unknown): NextResponse => {
    const { body, status, code } = toErrorResponse(err, requestId);
    const durationMs = Date.now() - startedAt;
    logger.warn("resolve_failed", {
      requestId,
      code,
      durationMs,
      durationBucket: durationBucket(durationMs),
      internal: err instanceof ApiError ? err.internal : undefined,
    });
    return NextResponse.json(body, { status });
  };

  const rate = checkRateLimit(`resolve:${ip}`, config.rateResolvePerMin, 60_000);
  if (!rate.allowed) {
    return NextResponse.json(fail(new ApiError("RATE_LIMITED", "ip minute budget exceeded")).body, {
      status: 429,
      headers: { "retry-after": String(rate.retryAfterSec) },
    });
  }
  const slot = acquireConcurrency(`resolve:${ip}`, config.resolveConcurrencyPerIp);
  if (!slot) return fail(new ApiError("RATE_LIMITED", "too many concurrent resolves"));

  try {
    let json: unknown;
    try {
      json = await req.json();
    } catch {
      throw new ApiError("INVALID_URL", "request body is not json");
    }
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) throw new ApiError("INVALID_URL", "request body failed schema");

    const input = validateInputUrl(parsed.data.url);
    const pin = input.kind === "short" ? await resolveShortUrl(input.url) : input;

    const html = await fetchPinHtml(pin.url);
    const media = parseMediaFromHtml(html);

    if (media.kind === "video" && !config.videoEnabled) {
      throw new ApiError("UNSUPPORTED_MEDIA", "video parsing disabled by feature switch");
    }
    if (media.kind === "gif" && !config.gifEnabled) {
      throw new ApiError("UNSUPPORTED_MEDIA", "gif parsing disabled by feature switch");
    }

    const family = media.kind === "video" ? ("video" as const) : ("image" as const);
    const maxBytes = media.kind === "video" ? config.maxVideoBytes : config.maxImageBytes;
    const candidates = media.kind === "video" ? media.videos : media.images;
    if (candidates.length === 0) {
      throw new ApiError("MEDIA_NOT_FOUND", `no ${family} candidates found in pin page`);
    }

    const verified = await verifyCandidates(candidates.slice(0, MAX_CANDIDATES_TO_CHECK), {
      maxBytes,
      family,
    });
    if (verified.length === 0) {
      throw new ApiError("MEDIA_NOT_FOUND", "no candidate passed server verification");
    }

    // FR-004 honesty rule: if nothing verified as an actual GIF, report the
    // pin as a static image instead of claiming a GIF.
    const effectiveKind: MediaKind =
      media.kind === "gif" && !verified.some((v) => v.mime === "image/gif") ? "image" : media.kind;

    // Optional on-page preview, also token-guarded and verified.
    let previewUrl: string | undefined;
    const previewCandidate = pickPreviewCandidate(media.images);
    if (previewCandidate) {
      const pv = await verifyCandidate(previewCandidate, {
        maxBytes: config.maxPreviewBytes,
        family: "image",
      });
      if (pv) {
        previewUrl = `/api/preview/${mintToken({
          typ: "pv",
          url: pv.url,
          mime: pv.mime,
          maxBytes: config.maxPreviewBytes,
          filename: "savepinner-preview",
          ttlMs: config.tokenTtlMs,
        })}`;
      }
    }

    const variants = verified.slice(0, MAX_VARIANTS_RETURNED).map((v, index) => ({
      id: `variant_${index + 1}`,
      label: v.width && v.height ? `${v.width} × ${v.height}` : "Unspecified size",
      format: (v.format || v.mime.split("/")[1] || "").toLowerCase(),
      width: v.width,
      height: v.height,
      bytes: v.bytes,
      downloadToken: mintToken({
        typ: "dl",
        url: v.url,
        mime: v.mime,
        maxBytes,
        filename: variantFilename(effectiveKind, v.width, v.height),
        ttlMs: config.tokenTtlMs,
      }),
    }));

    const durationMs = Date.now() - startedAt;
    logger.info("resolve_succeeded", {
      requestId,
      mediaType: effectiveKind,
      variantCount: variants.length,
      durationMs,
      durationBucket: durationBucket(durationMs),
      pinHost: pin.host,
    });

    return NextResponse.json({
      requestId,
      type: effectiveKind,
      title: media.title,
      previewUrl,
      variants,
    });
  } catch (err) {
    return fail(err);
  } finally {
    slot();
  }
}
