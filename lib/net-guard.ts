/**
 * Network egress guard — PRD §11.1 (SSRF protection).
 *
 * Every outbound request must go through guardedFetch(), which enforces:
 * - HTTPS only (callers also validate before this point),
 * - exact-host allow lists (enforced by callers),
 * - DNS resolution checked against private/reserved ranges before connecting,
 * - manual redirect handling (callers re-validate every hop),
 * - response body size caps via readBodyWithCap().
 */

import dns from "node:dns/promises";
import net from "node:net";
import { ApiError } from "./errors";

const IPV4_PRIVATE: Array<[number, number]> = [
  // [network as int, mask bits]
  [0x00000000, 8], // 0.0.0.0/8 "this network"
  [0x0a000000, 8], // 10.0.0.0/8
  [0x64400000, 10], // 100.64.0.0/10 CGNAT
  [0x7f000000, 8], // 127.0.0.0/8 loopback
  [0xa9fe0000, 16], // 169.254.0.0/16 link-local
  [0xac100000, 12], // 172.16.0.0/12
  [0xc0000000, 24], // 192.0.0.0/24
  [0xc0000200, 24], // 192.0.2.0/24 documentation
  [0xc0a80000, 16], // 192.168.0.0/16
  [0xc6120000, 15], // 198.18.0.0/15 benchmarking
  [0xc6336400, 24], // 198.51.100.0/24 documentation
  [0xcb007100, 24], // 203.0.113.0/24 documentation
  [0xe0000000, 4], // 224.0.0.0/4 multicast
  [0xf0000000, 4], // 240.0.0.0/4 reserved
];

function ipv4ToInt(ip: string): number | null {
  const parts = ip.split(".");
  if (parts.length !== 4) return null;
  let value = 0;
  for (const part of parts) {
    const n = Number(part);
    if (!Number.isInteger(n) || n < 0 || n > 255) return null;
    value = value * 256 + n;
  }
  return value >>> 0;
}

export function isPrivateOrReservedIp(ip: string): boolean {
  // Handle IPv4-mapped IPv6 forms like ::ffff:127.0.0.1
  const mapped = ip.toLowerCase().match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return isPrivateOrReservedIp(mapped[1]);

  if (net.isIPv4(ip)) {
    const value = ipv4ToInt(ip);
    if (value === null) return true;
    return IPV4_PRIVATE.some(([network, bits]) => {
      const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;
      return (value & mask) === (network & mask);
    });
  }

  if (net.isIPv6(ip)) {
    const normalized = ip.toLowerCase();
    if (normalized === "::" || normalized === "::1") return true;
    // Unique local fc00::/7, link-local fe80::/10, documentation 2001:db8::/32
    if (/^f[cd]/.test(normalized)) return true;
    if (/^fe[89ab]/.test(normalized)) return true;
    if (normalized.startsWith("2001:db8:")) return true;
    return false;
  }

  // Not an IP literal at all — caller resolves hostnames via DNS.
  return false;
}

/** Resolves a hostname and rejects if every address is private/reserved. */
export async function assertPublicHost(host: string): Promise<void> {
  if (net.isIP(host)) {
    if (isPrivateOrReservedIp(host)) {
      throw new ApiError("UPSTREAM_BLOCKED", `ssrf: ip literal rejected ${host}`);
    }
    return;
  }
  let addresses: string[];
  try {
    const results = await dns.lookup(host, { all: true, verbatim: true });
    addresses = results.map((r) => r.address);
  } catch {
    throw new ApiError("UPSTREAM_BLOCKED", `ssrf: dns resolution failed for host`);
  }
  if (addresses.length === 0 || addresses.every(isPrivateOrReservedIp)) {
    throw new ApiError("UPSTREAM_BLOCKED", `ssrf: host resolves to private range`);
  }
}

export interface GuardedFetchOptions extends Omit<RequestInit, "redirect"> {
  timeoutMs: number;
  redirect?: RequestRedirect;
}

/**
 * fetch() with DNS pre-validation and a hard timeout. Redirects default to
 * "manual" so every hop is re-validated by the caller.
 */
export async function guardedFetch(url: string, options: GuardedFetchOptions): Promise<Response> {
  const target = new URL(url);
  if (target.protocol !== "https:") {
    throw new ApiError("UPSTREAM_BLOCKED", "ssrf: non-https target rejected");
  }
  if (target.port !== "" && target.port !== "443") {
    throw new ApiError("UPSTREAM_BLOCKED", "ssrf: non-standard port rejected");
  }
  await assertPublicHost(target.hostname);
  try {
    return await fetch(target, {
      ...options,
      redirect: options.redirect ?? "manual",
      signal: AbortSignal.timeout(options.timeoutMs),
    });
  } catch (err) {
    if (err instanceof ApiError) throw err;
    const name = err instanceof Error ? err.name : "";
    if (name === "TimeoutError" || name === "AbortError") {
      throw new ApiError("RESOLVE_TIMEOUT", "upstream fetch timed out");
    }
    throw new ApiError("UPSTREAM_BLOCKED", `upstream fetch failed: ${name || "unknown"}`);
  }
}

/** Reads a response body with a hard byte cap; aborts when exceeded. */
export async function readBodyWithCap(res: Response, maxBytes: number): Promise<Buffer> {
  if (!res.body) return Buffer.alloc(0);
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) {
        await reader.cancel().catch(() => undefined);
        throw new ApiError("UPSTREAM_BLOCKED", "response exceeded size cap");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return Buffer.concat(chunks.map((c) => Buffer.from(c)));
}
