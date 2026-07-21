/**
 * Variant verification — PRD §6.2 (FR-003/004/005) and §12.3.
 *
 * Every candidate URL is actually checked server-side before being shown:
 * exact CDN host allow list, DNS guard, HTTP status, MIME family and size
 * ceiling. Candidates that fail are dropped silently; we never present
 * unverified "original" URLs.
 */

import { guardedFetch } from "@/lib/net-guard";
import { isAllowedMediaHost } from "./validate-url";
import type { MediaCandidate } from "./parse-media";

export interface VerifiedVariant extends MediaCandidate {
  mime: string;
  bytes?: number;
}

interface VerifyOptions {
  maxBytes: number;
  timeoutMs?: number;
  /** Expected MIME family: "image" or "video". */
  family: "image" | "video";
}

const VERIFY_TIMEOUT_MS = 5_000;
const CONCURRENCY = 4;

function mimeOk(mime: string, family: "image" | "video"): boolean {
  return mime.toLowerCase().startsWith(`${family}/`);
}

function parseBytes(headers: Headers): number | undefined {
  const len = headers.get("content-length");
  if (!len) return undefined;
  const n = Number(len);
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

async function headThenRangeGet(url: string, timeoutMs: number): Promise<Response | null> {
  try {
    const head = await guardedFetch(url, { method: "HEAD", timeoutMs });
    await head.body?.cancel().catch(() => undefined);
    if (head.ok) return head;
    if (![405, 501, 403].includes(head.status)) return null;
  } catch {
    // fall through to range GET
  }
  try {
    const get = await guardedFetch(url, {
      method: "GET",
      timeoutMs,
      headers: { range: "bytes=0-0" },
    });
    if (get.status === 200 || get.status === 206) return get;
    await get.body?.cancel().catch(() => undefined);
    return null;
  } catch {
    return null;
  }
}

export async function verifyCandidate(
  candidate: MediaCandidate,
  options: VerifyOptions,
): Promise<VerifiedVariant | null> {
  let target: URL;
  try {
    target = new URL(candidate.url);
  } catch {
    return null;
  }
  if (target.protocol !== "https:" || !isAllowedMediaHost(target.hostname)) return null;

  const res = await headThenRangeGet(candidate.url, options.timeoutMs ?? VERIFY_TIMEOUT_MS);
  if (!res) return null;
  await res.body?.cancel().catch(() => undefined);

  const mime = (res.headers.get("content-type") ?? "").split(";")[0].trim().toLowerCase();
  if (!mimeOk(mime, options.family)) return null;

  const bytes = parseBytes(res.headers);
  if (bytes !== undefined && bytes > options.maxBytes) return null;

  return { ...candidate, mime, bytes };
}

/** Verifies candidates concurrently (bounded), preserving sort order. */
export async function verifyCandidates(
  candidates: MediaCandidate[],
  options: VerifyOptions,
): Promise<VerifiedVariant[]> {
  const results: Array<VerifiedVariant | null> = new Array(candidates.length).fill(null);
  let cursor = 0;

  async function worker(): Promise<void> {
    while (cursor < candidates.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await verifyCandidate(candidates[index], options);
    }
  }

  const workers = Array.from({ length: Math.min(CONCURRENCY, candidates.length) }, () => worker());
  await Promise.all(workers);
  return results.filter((r): r is VerifiedVariant => r !== null);
}
