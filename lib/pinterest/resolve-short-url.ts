/**
 * pin.it short-link resolution — PRD §6.1 (FR-002).
 *
 * Follows at most 3 redirects manually; every hop re-validates protocol and
 * host against the allow lists. The final address must be a supported
 * /pin/{id}/ URL or the request is rejected with REDIRECT_REJECTED.
 */

import { ApiError } from "@/lib/errors";
import { guardedFetch } from "@/lib/net-guard";
import { config } from "@/lib/config";
import {
  isAllowedPinHost,
  validateInputUrl,
  type ValidatedPinUrl,
} from "./validate-url";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);

export async function resolveShortUrl(shortUrl: string): Promise<ValidatedPinUrl> {
  let current = shortUrl;
  const visited = new Set<string>([current]);

  for (let hop = 0; hop <= config.maxRedirects; hop += 1) {
    const res = await guardedFetch(current, {
      method: "GET",
      timeoutMs: config.redirectTimeoutMs,
      headers: { "user-agent": UA, accept: "text/html" },
    });

    if (!REDIRECT_STATUSES.has(res.status)) {
      // Consume/cancel the body so the connection can be reused.
      await res.body?.cancel().catch(() => undefined);
      if (res.status === 404) throw new ApiError("MEDIA_NOT_FOUND", "short link returned 404");
      throw new ApiError("UPSTREAM_BLOCKED", `short link returned status ${res.status}`);
    }

    const location = res.headers.get("location");
    await res.body?.cancel().catch(() => undefined);
    if (!location) {
      throw new ApiError("REDIRECT_REJECTED", "redirect without location header");
    }

    let next: URL;
    try {
      next = new URL(location, current);
    } catch {
      throw new ApiError("REDIRECT_REJECTED", "redirect target does not parse");
    }

    if (next.protocol !== "https:") {
      throw new ApiError("REDIRECT_REJECTED", "redirect to non-https target");
    }
    const nextHost = next.hostname.toLowerCase();
    if (nextHost !== "pin.it" && !isAllowedPinHost(nextHost)) {
      throw new ApiError("REDIRECT_REJECTED", "redirect to non-pinterest host");
    }
    if (visited.has(next.toString())) {
      throw new ApiError("REDIRECT_REJECTED", "redirect loop detected");
    }
    visited.add(next.toString());

    // Accept as soon as the hop lands on a supported Pin URL.
    try {
      const validated = validateInputUrl(next.toString());
      if (validated.kind === "pin") return validated;
      current = validated.url; // another pin.it short link — keep following
    } catch (err) {
      if (err instanceof ApiError && err.code === "INVALID_URL") throw err;
      throw new ApiError("REDIRECT_REJECTED", "final redirect target is not a pin url");
    }
  }

  throw new ApiError("REDIRECT_REJECTED", "too many redirects");
}
