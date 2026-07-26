/**
 * Input URL validation — PRD §6.1 (FR-001) and §11.1.
 *
 * Uses exact host allow lists (no substring/contains matching) and accepts:
 * - https://www.pinterest.com/pin/{id}/ and regional Pinterest domains
 * - https://pin.it/{shortcode}
 */

import { ApiError } from "@/lib/errors";

/**
 * Known Pinterest country/regional domains. Exact-match only; extend this
 * list as Pinterest adds regional domains.
 */
const COUNTRY_PIN_HOSTS = [
  "pinterest.ca",
  "pinterest.co.uk",
  "pinterest.com.au",
  "pinterest.co.nz",
  "pinterest.ie",
  "pinterest.de",
  "pinterest.fr",
  "pinterest.es",
  "pinterest.it",
  "pinterest.pt",
  "pinterest.nl",
  "pinterest.be",
  "pinterest.at",
  "pinterest.ch",
  "pinterest.dk",
  "pinterest.no",
  "pinterest.se",
  "pinterest.fi",
  "pinterest.pl",
  "pinterest.cz",
  "pinterest.gr",
  "pinterest.hu",
  "pinterest.ro",
  "pinterest.sk",
  "pinterest.jp",
  "pinterest.co.kr",
  "pinterest.com.mx",
  "pinterest.cl",
  "pinterest.com.pe",
  "pinterest.co",
  "pinterest.ph",
  "pinterest.id",
  "pinterest.com.tr",
  "pinterest.com.br",
] as const;

const REGIONAL_PIN_SUBDOMAINS = [
  "au",
  "at",
  "be",
  "br",
  "ca",
  "ch",
  "cl",
  "co",
  "cz",
  "de",
  "dk",
  "es",
  "fi",
  "fr",
  "gr",
  "hu",
  "id",
  "ie",
  "it",
  "jp",
  "kr",
  "mx",
  "nl",
  "no",
  "nz",
  "pe",
  "ph",
  "pl",
  "pt",
  "ro",
  "se",
  "sk",
  "tr",
  "uk",
] as const;

const PIN_HOSTS: ReadonlySet<string> = new Set([
  "pinterest.com",
  "www.pinterest.com",
  ...COUNTRY_PIN_HOSTS,
  ...COUNTRY_PIN_HOSTS.map((host) => `www.${host}`),
  ...REGIONAL_PIN_SUBDOMAINS.map((region) => `${region}.pinterest.com`),
]);

const SHORT_HOST = "pin.it";
const CANONICAL_PIN_HOST = "www.pinterest.com";

/** Pinterest CDN hosts allowed as media download targets (PRD §7.2). */
export const MEDIA_HOSTS: ReadonlySet<string> = new Set([
  "i.pinimg.com",
  "v.pinimg.com",
  "v1.pinimg.com",
]);

export interface ValidatedPinUrl {
  kind: "pin";
  pinId: string;
  /** Normalized canonical form: https://{host}/pin/{id}/ */
  url: string;
  host: string;
}

export interface ValidatedShortUrl {
  kind: "short";
  url: string;
  shortcode: string;
}

export type ValidatedInputUrl = ValidatedPinUrl | ValidatedShortUrl;

const PIN_PATH_RE =
  /^\/pin\/(?:(\d{1,20})|[A-Za-z0-9][A-Za-z0-9_-]*--(\d{1,20}))(?:\/[A-Za-z0-9_-]*)?\/?$/;
const SHORTCODE_RE = /^\/([A-Za-z0-9]{2,})\/?$/;

export function validateInputUrl(raw: unknown): ValidatedInputUrl {
  if (typeof raw !== "string") {
    throw new ApiError("INVALID_URL", "url is not a string");
  }
  const trimmed = raw.trim();
  if (trimmed.length === 0 || trimmed.length > 2048) {
    throw new ApiError("INVALID_URL", "url empty or too long");
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    throw new ApiError("INVALID_URL", "url does not parse");
  }

  if (parsed.protocol !== "https:") {
    throw new ApiError("INVALID_URL", "non-https url rejected");
  }
  if (parsed.port !== "" && parsed.port !== "443") {
    throw new ApiError("INVALID_URL", "non-standard port rejected");
  }
  if (parsed.username || parsed.password) {
    throw new ApiError("INVALID_URL", "credentials in url rejected");
  }

  const host = parsed.hostname.toLowerCase();

  if (host === SHORT_HOST) {
    const match = SHORTCODE_RE.exec(parsed.pathname);
    if (!match) {
      throw new ApiError("UNSUPPORTED_URL", `unsupported pin.it path: ${parsed.pathname.length} chars`);
    }
    return { kind: "short", url: `https://${SHORT_HOST}/${match[1]}/`, shortcode: match[1] };
  }

  if (!PIN_HOSTS.has(host)) {
    throw new ApiError("INVALID_URL", "host not in pinterest allow list");
  }

  const match = PIN_PATH_RE.exec(parsed.pathname);
  if (!match) {
    throw new ApiError("UNSUPPORTED_URL", "pinterest host but not a /pin/ path");
  }

  return {
    kind: "pin",
    pinId: match[1] ?? match[2],
    url: `https://${CANONICAL_PIN_HOST}/pin/${match[1] ?? match[2]}/`,
    host: CANONICAL_PIN_HOST,
  };
}

/** Exact host check for media/CDN targets. */
export function isAllowedMediaHost(host: string): boolean {
  return MEDIA_HOSTS.has(host.toLowerCase());
}

export function isAllowedPinHost(host: string): boolean {
  return PIN_HOSTS.has(host.toLowerCase());
}
