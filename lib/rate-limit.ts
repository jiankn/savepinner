/**
 * Rate limiting — PRD §11.2 / §11.3.
 *
 * The public surface is intentionally small and interface-like so the storage
 * backend can be swapped for an external KV (e.g. Upstash Redis) in multi-
 * instance production deployments without touching call sites. The bundled
 * implementation is a single-process in-memory store, suitable for MVP/dev.
 */

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSec: number;
}

interface WindowBucket {
  count: number;
  resetAt: number;
}

const windows = new Map<string, WindowBucket>();
const concurrency = new Map<string, number>();

let lastSweep = Date.now();

function sweep(now: number): void {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, bucket] of windows) {
    if (bucket.resetAt <= now) windows.delete(key);
  }
}

/** Fixed-window counter. */
export function checkRateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  sweep(now);
  const bucket = windows.get(key);
  if (!bucket || bucket.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSec: 0 };
  }
  if (bucket.count >= limit) {
    return { allowed: false, retryAfterSec: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)) };
  }
  bucket.count += 1;
  return { allowed: true, retryAfterSec: 0 };
}

/**
 * Concurrency slot. Returns a release function when a slot was acquired,
 * or null when the caller is already at `max` concurrent operations.
 */
export function acquireConcurrency(key: string, max: number): (() => void) | null {
  const current = concurrency.get(key) ?? 0;
  if (current >= max) return null;
  concurrency.set(key, current + 1);
  let released = false;
  return () => {
    if (released) return;
    released = true;
    const next = (concurrency.get(key) ?? 1) - 1;
    if (next <= 0) concurrency.delete(key);
    else concurrency.set(key, next);
  };
}

/** Daily bandwidth budget (in-memory, resets at UTC midnight). */
interface DayBucket {
  day: string;
  bytes: number;
}

const bandwidth: DayBucket = { day: currentUtcDay(), bytes: 0 };

function currentUtcDay(): string {
  return new Date().toISOString().slice(0, 10);
}

export function tryReserveBandwidth(bytes: number, capBytes: number): boolean {
  if (bandwidth.day !== currentUtcDay()) {
    bandwidth.day = currentUtcDay();
    bandwidth.bytes = 0;
  }
  if (bandwidth.bytes + bytes > capBytes) return false;
  bandwidth.bytes += bytes;
  return true;
}

export function addBandwidth(bytes: number): void {
  if (bandwidth.day !== currentUtcDay()) {
    bandwidth.day = currentUtcDay();
    bandwidth.bytes = 0;
  }
  bandwidth.bytes += bytes;
}

/** Best-effort client IP extraction for rate limiting (never logged). */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}
