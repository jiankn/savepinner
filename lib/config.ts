/**
 * Central runtime configuration. All values can be overridden via environment
 * variables; see .env.example. Limits follow PRD §11.3 initial quotas.
 */

function num(value: string | undefined, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function bool(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined || value === "") return fallback;
  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
}

export const config = {
  isProd: process.env.NODE_ENV === "production",

  /** Public origin of the site, used for canonical URLs, sitemap and robots. */
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://savepinner.com").replace(/\/+$/, ""),

  /** HMAC secret for signing download/preview tokens. */
  tokenSecret: process.env.TOKEN_SECRET ?? "",
  /** Download token lifetime — PRD §11.3: 5 minutes. */
  tokenTtlMs: num(process.env.DOWNLOAD_TOKEN_TTL_MS, 5 * 60 * 1000),

  /** Total resolve budget incl. upstream requests — PRD §11.3: 8 seconds. */
  resolveTimeoutMs: num(process.env.RESOLVE_TIMEOUT_MS, 8_000),
  redirectTimeoutMs: num(process.env.REDIRECT_TIMEOUT_MS, 5_000),
  /** HTML page cap — PRD §11.3: 2 MB. */
  maxHtmlBytes: num(process.env.MAX_HTML_BYTES, 2 * 1024 * 1024),

  /** Media caps — PRD §11.3: images 25 MB, videos 250 MB. */
  maxImageBytes: num(process.env.MAX_IMAGE_BYTES, 25 * 1024 * 1024),
  maxVideoBytes: num(process.env.MAX_VIDEO_BYTES, 250 * 1024 * 1024),
  maxPreviewBytes: num(process.env.MAX_PREVIEW_BYTES, 5 * 1024 * 1024),

  /** Short-link redirect hops — PRD §11.3: at most 3, re-validated each hop. */
  maxRedirects: 3,

  /** Rate limits — PRD §11.3. */
  rateResolvePerMin: num(process.env.RATE_RESOLVE_PER_MIN, 10),
  resolveConcurrencyPerIp: num(process.env.RESOLVE_CONCURRENCY_PER_IP, 3),
  rateDownloadPerMin: num(process.env.RATE_DOWNLOAD_PER_MIN, 30),
  downloadGlobalConcurrency: num(process.env.DOWNLOAD_GLOBAL_CONCURRENCY, 64),
  downloadTimeoutMs: num(process.env.DOWNLOAD_TIMEOUT_MS, 120_000),
  dailyBandwidthCapBytes: num(process.env.DAILY_BANDWIDTH_CAP_BYTES, 10 * 1024 ** 3),

  /** Feature switches — PRD §10.3: parsers must be independently killable. */
  videoEnabled: !bool(process.env.DISABLE_VIDEO, false),
  gifEnabled: !bool(process.env.DISABLE_GIF, false),
} as const;

let warnedAboutSecret = false;

/**
 * Returns the HMAC secret. Fails closed in production when unset; uses an
 * insecure development fallback otherwise (with a one-time warning).
 */
export function getTokenSecret(): string {
  if (config.tokenSecret) return config.tokenSecret;
  if (config.isProd) {
    throw new Error("TOKEN_SECRET environment variable is required in production");
  }
  if (!warnedAboutSecret) {
    warnedAboutSecret = true;
    console.warn("[savepinner] TOKEN_SECRET is not set — using an insecure development fallback");
  }
  return "savepinner-dev-insecure-secret";
}
