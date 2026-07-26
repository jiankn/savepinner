import { describe, expect, it } from "vitest";
import {
  acquireConcurrency,
  addBandwidth,
  bandwidthState,
  checkRateLimit,
  getClientIp,
  resetBandwidthForTests,
  tryReserveBandwidth,
} from "@/lib/rate-limit";

describe("checkRateLimit", () => {
  it("allows up to the limit then blocks with retry-after", () => {
    const key = `test:${Math.random()}`;
    for (let i = 0; i < 3; i += 1) {
      expect(checkRateLimit(key, 3, 60_000).allowed).toBe(true);
    }
    const blocked = checkRateLimit(key, 3, 60_000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSec).toBeGreaterThan(0);
  });

  it("resets after the window", () => {
    const key = `test:${Math.random()}`;
    expect(checkRateLimit(key, 1, 5).allowed).toBe(true);
    expect(checkRateLimit(key, 1, 5).allowed).toBe(false);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(checkRateLimit(key, 1, 5).allowed).toBe(true);
        resolve();
      }, 10);
    });
  });
});

describe("acquireConcurrency", () => {
  it("caps concurrent slots and releases them", () => {
    const key = `test:${Math.random()}`;
    const a = acquireConcurrency(key, 2);
    const b = acquireConcurrency(key, 2);
    const c = acquireConcurrency(key, 2);
    expect(a).toBeTypeOf("function");
    expect(b).toBeTypeOf("function");
    expect(c).toBeNull();
    a!();
    const d = acquireConcurrency(key, 2);
    expect(d).toBeTypeOf("function");
    b!();
    d!();
    // Releasing twice is a no-op.
    d!();
  });
});

describe("tryReserveBandwidth", () => {
  it("rejects reservations beyond the cap", () => {
    resetBandwidthForTests();
    const cap = 1000;
    expect(tryReserveBandwidth(600, cap)).toBe(true);
    expect(tryReserveBandwidth(600, cap)).toBe(false);
    expect(tryReserveBandwidth(300, cap)).toBe(true);
  });
});

describe("bandwidthState", () => {
  it("flips to capped as the remaining budget falls below the low-water floor", () => {
    resetBandwidthForTests();
    const cap = 100 * 1024 * 1024;
    expect(bandwidthState(cap).capped).toBe(false);
    addBandwidth(cap - 1024);
    expect(bandwidthState(cap).capped).toBe(true);
    resetBandwidthForTests();
  });

  it("reports the next UTC midnight as the reset time", () => {
    resetBandwidthForTests();
    const { resetAt } = bandwidthState(1024);
    const now = Date.now();
    expect(resetAt).toBeGreaterThan(now);
    expect(resetAt - now).toBeLessThanOrEqual(24 * 60 * 60 * 1000);
    expect(resetAt % (24 * 60 * 60 * 1000)).toBe(0);
  });
});

describe("getClientIp", () => {
  it("prefers the first x-forwarded-for entry", () => {
    const headers = new Headers({ "x-forwarded-for": "1.2.3.4, 5.6.7.8" });
    expect(getClientIp(headers)).toBe("1.2.3.4");
  });

  it("falls back to x-real-ip then unknown", () => {
    expect(getClientIp(new Headers({ "x-real-ip": "9.9.9.9" }))).toBe("9.9.9.9");
    expect(getClientIp(new Headers())).toBe("unknown");
  });
});
