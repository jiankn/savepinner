/**
 * Signed, short-lived download/preview tokens — PRD §6.3 (FR-007) / §7.2.
 *
 * The token payload carries the *verified* CDN target (host + resource path),
 * expected MIME family, size ceiling and expiry. It deliberately does NOT
 * contain the original Pin URL (PRD §11.3). Tampering, expiry or type
 * confusion (download vs preview) are rejected.
 */

import crypto from "node:crypto";
import { getTokenSecret } from "./config";
import { ApiError } from "./errors";

export type TokenType = "dl" | "pv";

export interface TokenPayload {
  v: 1;
  typ: TokenType;
  /** Verified Pinterest CDN host, e.g. i.pinimg.com */
  host: string;
  /** Resource identifier: pathname (+ search) on that host. */
  path: string;
  /** Expected MIME type from verification, e.g. image/jpeg */
  mime: string;
  /** Maximum allowed bytes for this transfer. */
  max: number;
  /** Safe download filename (ASCII, no header-injection risk). */
  name: string;
  iat: number;
  exp: number;
  n: string;
}

function b64url(buf: Buffer): string {
  return buf.toString("base64url");
}

function signData(data: string): string {
  return b64url(crypto.createHmac("sha256", getTokenSecret()).update(data).digest());
}

export interface MintTokenInput {
  typ: TokenType;
  url: string;
  mime: string;
  maxBytes: number;
  filename: string;
  ttlMs: number;
}

export function mintToken(input: MintTokenInput): string {
  const target = new URL(input.url);
  const now = Date.now();
  const payload: TokenPayload = {
    v: 1,
    typ: input.typ,
    host: target.host,
    path: target.pathname + target.search,
    mime: input.mime,
    max: input.maxBytes,
    name: sanitizeFilename(input.filename),
    iat: now,
    exp: now + input.ttlMs,
    n: crypto.randomBytes(8).toString("hex"),
  };
  const data = b64url(Buffer.from(JSON.stringify(payload), "utf8"));
  return `${data}.${signData(data)}`;
}

export function verifyToken(token: string, expectedType: TokenType): TokenPayload {
  const parts = token.split(".");
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    throw new ApiError("TOKEN_INVALID", "malformed token");
  }
  const [data, sig] = parts;
  const expected = signData(data);
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    throw new ApiError("TOKEN_INVALID", "bad signature");
  }
  let payload: TokenPayload;
  try {
    payload = JSON.parse(Buffer.from(data, "base64url").toString("utf8")) as TokenPayload;
  } catch {
    throw new ApiError("TOKEN_INVALID", "undecodable payload");
  }
  if (payload.v !== 1 || payload.typ !== expectedType) {
    throw new ApiError("TOKEN_INVALID", "wrong token type");
  }
  if (typeof payload.exp !== "number" || payload.exp < Date.now()) {
    throw new ApiError("TOKEN_EXPIRED");
  }
  if (!payload.host || !payload.path || !payload.mime || typeof payload.max !== "number") {
    throw new ApiError("TOKEN_INVALID", "incomplete payload");
  }
  return payload;
}

/** Rebuilds the verified upstream URL from a token payload. */
export function tokenTargetUrl(payload: TokenPayload): string {
  return `https://${payload.host}${payload.path}`;
}

/** Strips anything that could break a Content-Disposition header. */
export function sanitizeFilename(name: string): string {
  const cleaned = name.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
  return cleaned.slice(0, 80) || "savepinner-media";
}
