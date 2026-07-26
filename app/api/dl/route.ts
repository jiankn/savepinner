import { NextResponse } from "next/server";
import { config } from "@/lib/config";
import { sanitizeFilename } from "@/lib/download-token";
import { ApiError, toErrorResponse } from "@/lib/errors";
import { guardedFetch } from "@/lib/net-guard";
import { isAllowedMediaHost } from "@/lib/pinterest/validate-url";
import {
  acquireConcurrency,
  addBandwidth,
  bandwidthState,
  checkRateLimit,
  getClientIp,
  tryReserveBandwidth,
} from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function parseDownloadTarget(value: string | null): URL {
  let target: URL;
  try {
    target = new URL(value ?? "");
  } catch {
    throw new ApiError("TOKEN_INVALID", "download url does not parse");
  }
  if (
    target.protocol !== "https:" ||
    target.port !== "" ||
    target.username ||
    target.password ||
    !isAllowedMediaHost(target.hostname)
  ) {
    throw new ApiError("TOKEN_INVALID", "download host is not allowed");
  }
  return target;
}

function fallbackFilename(target: URL): string {
  const last = target.pathname.split("/").filter(Boolean).at(-1) ?? "savepinner-download";
  return sanitizeFilename(last);
}

/** Pass-through stream that charges actual bytes against the daily budget. */
function countingStream(onBytes: (n: number) => void): TransformStream<Uint8Array, Uint8Array> {
  return new TransformStream({
    transform(chunk, controller) {
      onBytes(chunk.byteLength);
      controller.enqueue(chunk);
    },
  });
}

export async function GET(req: Request) {
  const ip = getClientIp(req.headers);
  const rate = checkRateLimit(`download:${ip}`, config.rateDownloadPerMin, 60_000);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: { code: "RATE_LIMITED", message: "Too many requests — please try again in a moment." } },
      { status: 429, headers: { "retry-after": String(rate.retryAfterSec) } },
    );
  }

  const release = acquireConcurrency("download:global", config.downloadGlobalConcurrency);
  if (!release) {
    return NextResponse.json(
      { error: { code: "RATE_LIMITED", message: "Too many requests — please try again in a moment." } },
      { status: 429 },
    );
  }

  try {
    const requestUrl = new URL(req.url);
    const target = parseDownloadTarget(requestUrl.searchParams.get("url"));
    const requestedName = requestUrl.searchParams.get("name");
    const filename = sanitizeFilename(requestedName || fallbackFilename(target));

    // Daily fuse — reject before spending an upstream fetch on a dead budget.
    if (bandwidthState(config.dailyBandwidthCapBytes).capped) {
      throw new ApiError("DAILY_CAP_REACHED", "daily bandwidth budget exhausted");
    }

    const upstream = await guardedFetch(target.toString(), {
      method: "GET",
      timeoutMs: config.downloadTimeoutMs,
      headers: {
        referer: "https://www.pinterest.com/",
        "user-agent": "Mozilla/5.0 (compatible; SavePinner/1.0)",
        accept: "image/*,video/*,*/*;q=0.8",
      },
    });
    if (!upstream.ok || !upstream.body) {
      await upstream.body?.cancel().catch(() => undefined);
      throw new ApiError("UPSTREAM_BLOCKED", `cdn returned ${upstream.status}`);
    }

    const contentType = upstream.headers.get("content-type") ?? "application/octet-stream";
    if (!/^(image|video)\//i.test(contentType)) {
      await upstream.body.cancel().catch(() => undefined);
      throw new ApiError("UPSTREAM_BLOCKED", "cdn returned an unsupported content type");
    }

    // Charge the daily budget: reserve up front when the CDN declares a size
    // (the normal case), otherwise meter the stream as bytes actually flow.
    const declaredBytes = Number(upstream.headers.get("content-length"));
    let body: ReadableStream<Uint8Array> = upstream.body;
    if (Number.isFinite(declaredBytes) && declaredBytes > 0) {
      if (!tryReserveBandwidth(declaredBytes, config.dailyBandwidthCapBytes)) {
        await upstream.body.cancel().catch(() => undefined);
        throw new ApiError("DAILY_CAP_REACHED", "file would exceed the daily budget");
      }
    } else {
      body = upstream.body.pipeThrough(countingStream(addBandwidth));
    }

    const headers = new Headers({
      "content-type": contentType,
      "content-disposition": `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
      "cache-control": "private, no-store",
      "x-content-type-options": "nosniff",
    });
    const length = upstream.headers.get("content-length");
    if (length) headers.set("content-length", length);
    return new Response(body, { status: 200, headers });
  } catch (err) {
    const { body, status, code } = toErrorResponse(err, "download");
    const response = NextResponse.json(body, { status });
    if (code === "DAILY_CAP_REACHED") {
      const { resetAt } = bandwidthState(config.dailyBandwidthCapBytes);
      response.headers.set("retry-after", String(Math.max(1, Math.ceil((resetAt - Date.now()) / 1000))));
    }
    return response;
  } finally {
    release();
  }
}
