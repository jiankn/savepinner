/**
 * Pin page fetching — PRD §12.3 (parsing strategy).
 *
 * Downloads the public Pin page HTML (capped at 2 MB, 8 s budget) following
 * at most 2 Pinterest-internal redirects. Each hop is re-validated.
 */

import { ApiError } from "@/lib/errors";
import { guardedFetch, readBodyWithCap } from "@/lib/net-guard";
import { config } from "@/lib/config";
import { validateInputUrl } from "./validate-url";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);
const MAX_INTERNAL_REDIRECTS = 2;

export async function fetchPinHtml(pinUrl: string): Promise<string> {
  let current = pinUrl;

  for (let hop = 0; hop <= MAX_INTERNAL_REDIRECTS; hop += 1) {
    const res = await guardedFetch(current, {
      method: "GET",
      timeoutMs: config.resolveTimeoutMs,
      headers: {
        "user-agent": UA,
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "accept-language": "en-US,en;q=0.9",
      },
    });

    if (REDIRECT_STATUSES.has(res.status)) {
      const location = res.headers.get("location");
      await res.body?.cancel().catch(() => undefined);
      if (!location) throw new ApiError("UPSTREAM_BLOCKED", "pin redirect without location");
      let next: string;
      try {
        next = new URL(location, current).toString();
      } catch {
        throw new ApiError("REDIRECT_REJECTED", "pin redirect target does not parse");
      }
      // Login walls and off-Pinterest redirects mean we cannot access the Pin.
      try {
        const validated = validateInputUrl(next);
        if (validated.kind !== "pin") throw new ApiError("PIN_NOT_PUBLIC", "redirected off pin path");
        current = validated.url;
      } catch (err) {
        if (err instanceof ApiError && err.code === "PIN_NOT_PUBLIC") throw err;
        throw new ApiError("PIN_NOT_PUBLIC", "pin redirected to unsupported/login page");
      }
      continue;
    }

    if (res.status === 404) {
      await res.body?.cancel().catch(() => undefined);
      throw new ApiError("MEDIA_NOT_FOUND", "pin page returned 404");
    }
    if (res.status === 401 || res.status === 403) {
      await res.body?.cancel().catch(() => undefined);
      throw new ApiError("PIN_NOT_PUBLIC", `pin page returned ${res.status}`);
    }
    if (res.status !== 200) {
      await res.body?.cancel().catch(() => undefined);
      throw new ApiError("UPSTREAM_BLOCKED", `pin page returned ${res.status}`);
    }

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) {
      await res.body?.cancel().catch(() => undefined);
      throw new ApiError("UPSTREAM_BLOCKED", "pin page did not return html");
    }

    const body = await readBodyWithCap(res, config.maxHtmlBytes);
    return body.toString("utf8");
  }

  throw new ApiError("REDIRECT_REJECTED", "too many pin page redirects");
}
