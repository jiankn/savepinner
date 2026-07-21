/**
 * Controlled media transfer — PRD §6.3 (FR-007) and §11.2.
 *
 * Streams a token-verified CDN resource to the client. The client can never
 * pick an arbitrary upstream URL: the target comes from the signed token,
 * is re-checked against the CDN allow list and DNS guard, and is bounded by
 * the token's MIME family and byte ceiling.
 */

import { ApiError } from "./errors";
import { config } from "./config";
import { guardedFetch } from "./net-guard";
import { logger, safeHost, sizeBucket } from "./logger";
import { addBandwidth, tryReserveBandwidth } from "./rate-limit";
import { tokenTargetUrl, type TokenPayload } from "./download-token";
import { isAllowedMediaHost } from "./pinterest/validate-url";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/quicktime": "mov",
};

export function extForMime(mime: string): string {
  return EXT_BY_MIME[mime.toLowerCase()] ?? "bin";
}

export interface TransferOptions {
  disposition: "attachment" | "inline";
  /** Event names for structured logs, e.g. download_started/download_failed. */
  logStartedEvent: string;
  logFailedEvent: string;
}

export async function streamVerifiedMedia(
  payload: TokenPayload,
  clientSignal: AbortSignal,
  options: TransferOptions,
): Promise<Response> {
  if (!isAllowedMediaHost(payload.host)) {
    throw new ApiError("TOKEN_INVALID", "token host not in cdn allow list");
  }
  const target = tokenTargetUrl(payload);
  const family = payload.mime.split("/")[0];

  const upstream = await guardedFetch(target, {
    method: "GET",
    timeoutMs: config.downloadTimeoutMs,
    headers: { "user-agent": UA, accept: `${family}/*,*/*;q=0.8` },
  });

  if (upstream.status !== 200 || !upstream.body) {
    await upstream.body?.cancel().catch(() => undefined);
    throw new ApiError("UPSTREAM_BLOCKED", `cdn returned status ${upstream.status}`);
  }

  const mime = (upstream.headers.get("content-type") ?? "").split(";")[0].trim().toLowerCase();
  if (!mime.startsWith(`${family}/`)) {
    await upstream.body.cancel().catch(() => undefined);
    throw new ApiError("UPSTREAM_BLOCKED", "cdn mime family mismatch");
  }

  const declared = Number(upstream.headers.get("content-length") ?? NaN);
  if (Number.isFinite(declared)) {
    if (declared > payload.max) {
      await upstream.body.cancel().catch(() => undefined);
      throw new ApiError("FILE_TOO_LARGE", `cdn content-length ${declared} exceeds token max`);
    }
    if (!tryReserveBandwidth(declared, config.dailyBandwidthCapBytes)) {
      await upstream.body.cancel().catch(() => undefined);
      throw new ApiError("RATE_LIMITED", "daily bandwidth budget exhausted");
    }
  }

  logger.info(options.logStartedEvent, {
    host: safeHost(target),
    family,
    sizeBucket: sizeBucket(Number.isFinite(declared) ? declared : undefined),
  });

  const reader = upstream.body.getReader();
  const max = payload.max;
  let transferred = 0;

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const onAbort = () => {
        reader.cancel().catch(() => undefined);
      };
      clientSignal.addEventListener("abort", onAbort, { once: true });
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          transferred += value.byteLength;
          if (transferred > max) {
            logger.warn(options.logFailedEvent, {
              host: safeHost(target),
              reason: "size-exceeded-mid-stream",
              sizeBucket: sizeBucket(transferred),
            });
            await reader.cancel().catch(() => undefined);
            controller.error(new Error("size-exceeded"));
            return;
          }
          controller.enqueue(value);
        }
        controller.close();
        if (!Number.isFinite(declared)) addBandwidth(transferred);
      } catch (err) {
        logger.warn(options.logFailedEvent, {
          host: safeHost(target),
          reason: err instanceof Error ? err.message : "stream error",
        });
        controller.error(err);
      } finally {
        clientSignal.removeEventListener("abort", onAbort);
        reader.releaseLock();
      }
    },
    async cancel() {
      await reader.cancel().catch(() => undefined);
    },
  });

  const ext = extForMime(payload.mime);
  const filename = `${payload.name}.${ext}`;
  const headers = new Headers({
    "content-type": mime,
    "content-disposition": `${options.disposition}; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
    "cache-control": options.disposition === "inline" ? "private, max-age=300" : "private, no-store",
    "x-content-type-options": "nosniff",
  });
  if (Number.isFinite(declared)) headers.set("content-length", String(declared));

  return new Response(stream, { status: 200, headers });
}
