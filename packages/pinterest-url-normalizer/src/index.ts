const COUNTRY_HOSTS = [
  "pinterest.at",
  "pinterest.be",
  "pinterest.ca",
  "pinterest.ch",
  "pinterest.cl",
  "pinterest.co",
  "pinterest.co.kr",
  "pinterest.co.nz",
  "pinterest.co.uk",
  "pinterest.com.au",
  "pinterest.com.br",
  "pinterest.com.mx",
  "pinterest.com.pe",
  "pinterest.com.tr",
  "pinterest.cz",
  "pinterest.de",
  "pinterest.dk",
  "pinterest.es",
  "pinterest.fi",
  "pinterest.fr",
  "pinterest.gr",
  "pinterest.hu",
  "pinterest.id",
  "pinterest.ie",
  "pinterest.it",
  "pinterest.jp",
  "pinterest.nl",
  "pinterest.no",
  "pinterest.ph",
  "pinterest.pl",
  "pinterest.pt",
  "pinterest.ro",
  "pinterest.se",
  "pinterest.sk",
] as const;

const REGIONAL_SUBDOMAINS = [
  "at",
  "au",
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

const PINTEREST_HOSTS: ReadonlySet<string> = new Set([
  "pinterest.com",
  "www.pinterest.com",
  "m.pinterest.com",
  ...COUNTRY_HOSTS,
  ...COUNTRY_HOSTS.map((host) => `www.${host}`),
  ...REGIONAL_SUBDOMAINS.map((region) => `${region}.pinterest.com`),
]);

const RESERVED_FIRST_SEGMENTS: ReadonlySet<string> = new Set([
  "business",
  "categories",
  "explore",
  "help",
  "ideas",
  "login",
  "logout",
  "oauth",
  "pin",
  "pin-builder",
  "resource",
  "search",
  "settings",
  "signup",
  "today",
  "topics",
]);

const CANONICAL_HOST = "www.pinterest.com";
const SHORT_HOST = "pin.it";
const PIN_PATH_RE =
  /^\/pin\/(?:(\d{1,20})|[A-Za-z0-9][A-Za-z0-9_-]*--(\d{1,20}))(?:\/[A-Za-z0-9_-]*)?\/?$/;
const SHORT_PATH_RE = /^\/([A-Za-z0-9]{2,})\/?$/;
const IDEAS_PATH_RE = /^\/ideas\/([A-Za-z0-9][A-Za-z0-9_-]*)\/(\d{1,20})\/?$/;
const USERNAME_RE = /^[A-Za-z0-9_][A-Za-z0-9_.-]*$/;
const BOARD_SLUG_RE = /^[A-Za-z0-9][A-Za-z0-9_-]*$/;

export type PinterestUrlKind = "pin" | "short" | "profile" | "board" | "ideas";
export type PinterestUrlErrorCode = "INVALID_URL" | "UNSUPPORTED_URL";

interface ParsedBase {
  kind: PinterestUrlKind;
  originalUrl: string;
  normalizedUrl: string;
  host: string;
}

export interface ParsedPinUrl extends ParsedBase {
  kind: "pin";
  pinId: string;
}

export interface ParsedShortUrl extends ParsedBase {
  kind: "short";
  shortcode: string;
}

export interface ParsedProfileUrl extends ParsedBase {
  kind: "profile";
  username: string;
}

export interface ParsedBoardUrl extends ParsedBase {
  kind: "board";
  username: string;
  boardSlug: string;
}

export interface ParsedIdeasUrl extends ParsedBase {
  kind: "ideas";
  ideaSlug: string;
  ideaId: string;
}

export type ParsedPinterestUrl =
  | ParsedPinUrl
  | ParsedShortUrl
  | ParsedProfileUrl
  | ParsedBoardUrl
  | ParsedIdeasUrl;

export class PinterestUrlError extends Error {
  readonly code: PinterestUrlErrorCode;

  constructor(code: PinterestUrlErrorCode, message: string) {
    super(message);
    this.name = "PinterestUrlError";
    this.code = code;
  }
}

function parseHttpsUrl(input: string): URL {
  if (typeof input !== "string") {
    throw new PinterestUrlError("INVALID_URL", "URL must be a string");
  }

  const trimmed = input.trim();
  if (trimmed.length === 0 || trimmed.length > 2048) {
    throw new PinterestUrlError("INVALID_URL", "URL is empty or too long");
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    throw new PinterestUrlError("INVALID_URL", "URL could not be parsed");
  }

  if (parsed.protocol !== "https:") {
    throw new PinterestUrlError("INVALID_URL", "Only HTTPS URLs are supported");
  }
  if ((parsed.port && parsed.port !== "443") || parsed.username || parsed.password) {
    throw new PinterestUrlError("INVALID_URL", "Credentials and non-standard ports are not supported");
  }

  return parsed;
}

export function isPinterestHost(host: string): boolean {
  return PINTEREST_HOSTS.has(host.toLowerCase());
}

export function parsePinterestUrl(input: string): ParsedPinterestUrl {
  const parsed = parseHttpsUrl(input);
  const originalUrl = input.trim();
  const host = parsed.hostname.toLowerCase();

  if (host === SHORT_HOST) {
    const shortMatch = SHORT_PATH_RE.exec(parsed.pathname);
    if (!shortMatch) {
      throw new PinterestUrlError("UNSUPPORTED_URL", "Unsupported pin.it path");
    }
    const shortcode = shortMatch[1];
    return {
      kind: "short",
      originalUrl,
      normalizedUrl: `https://${SHORT_HOST}/${shortcode}/`,
      host: SHORT_HOST,
      shortcode,
    };
  }

  if (!isPinterestHost(host)) {
    throw new PinterestUrlError("INVALID_URL", "Host is not an allowed Pinterest domain");
  }

  const pinMatch = PIN_PATH_RE.exec(parsed.pathname);
  if (pinMatch) {
    const pinId = pinMatch[1] ?? pinMatch[2];
    return {
      kind: "pin",
      originalUrl,
      normalizedUrl: `https://${CANONICAL_HOST}/pin/${pinId}/`,
      host: CANONICAL_HOST,
      pinId,
    };
  }

  const ideasMatch = IDEAS_PATH_RE.exec(parsed.pathname);
  if (ideasMatch) {
    const [, ideaSlug, ideaId] = ideasMatch;
    return {
      kind: "ideas",
      originalUrl,
      normalizedUrl: `https://${CANONICAL_HOST}/ideas/${ideaSlug}/${ideaId}/`,
      host: CANONICAL_HOST,
      ideaSlug,
      ideaId,
    };
  }

  const segments = parsed.pathname.split("/").filter(Boolean);
  const firstSegment = segments[0]?.toLowerCase();
  if (!firstSegment || RESERVED_FIRST_SEGMENTS.has(firstSegment)) {
    throw new PinterestUrlError("UNSUPPORTED_URL", "Unsupported Pinterest path");
  }

  if (segments.length === 1 && USERNAME_RE.test(segments[0])) {
    const username = segments[0];
    return {
      kind: "profile",
      originalUrl,
      normalizedUrl: `https://${CANONICAL_HOST}/${username}/`,
      host: CANONICAL_HOST,
      username,
    };
  }

  if (
    segments.length === 2 &&
    USERNAME_RE.test(segments[0]) &&
    BOARD_SLUG_RE.test(segments[1])
  ) {
    const [username, boardSlug] = segments;
    return {
      kind: "board",
      originalUrl,
      normalizedUrl: `https://${CANONICAL_HOST}/${username}/${boardSlug}/`,
      host: CANONICAL_HOST,
      username,
      boardSlug,
    };
  }

  throw new PinterestUrlError("UNSUPPORTED_URL", "Unsupported Pinterest path");
}

export function normalizePinterestUrl(input: string): string {
  return parsePinterestUrl(input).normalizedUrl;
}

export function isPinterestUrl(input: unknown): input is string {
  if (typeof input !== "string") return false;
  try {
    parsePinterestUrl(input);
    return true;
  } catch {
    return false;
  }
}
