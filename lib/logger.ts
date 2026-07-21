/**
 * Structured logging — PRD §12.1 / §10.4.
 * Emits single-line JSON so logs can be shipped to any aggregator.
 *
 * Privacy rules (enforced by convention at call sites):
 * - never log full Pin URLs, full media URLs, query strings or tokens;
 * - log hosts (via safeHost), pin ids, error codes and durations only;
 * - IPs are only used transiently for rate limiting, never logged.
 */

type Level = "info" | "warn" | "error";
type Fields = Record<string, unknown>;

function emit(level: Level, event: string, fields: Fields): void {
  const line = JSON.stringify({
    ts: new Date().toISOString(),
    level,
    event,
    ...fields,
  });
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

export const logger = {
  info: (event: string, fields: Fields = {}) => emit("info", event, fields),
  warn: (event: string, fields: Fields = {}) => emit("warn", event, fields),
  error: (event: string, fields: Fields = {}) => emit("error", event, fields),
};

/** Extracts only the hostname for privacy-safe logging. */
export function safeHost(rawUrl: string): string {
  try {
    return new URL(rawUrl).host;
  } catch {
    return "invalid-url";
  }
}

/** Coarse size buckets for download metrics (PRD §14.1 size_bucket). */
export function sizeBucket(bytes: number | undefined): string {
  if (bytes === undefined) return "unknown";
  if (bytes < 1 * 1024 * 1024) return "<1mb";
  if (bytes < 10 * 1024 * 1024) return "1-10mb";
  if (bytes < 50 * 1024 * 1024) return "10-50mb";
  if (bytes < 250 * 1024 * 1024) return "50-250mb";
  return ">=250mb";
}

/** Coarse duration buckets for resolve metrics (PRD §14.1 duration_bucket). */
export function durationBucket(ms: number): string {
  if (ms < 500) return "<0.5s";
  if (ms < 1500) return "0.5-1.5s";
  if (ms < 4000) return "1.5-4s";
  return ">=4s";
}
