import { describe, expect, it } from "vitest";
import { ApiError, ERROR_DEFS, toErrorResponse } from "@/lib/errors";
import { formatBytes, formatEta } from "@/lib/format";

describe("error model (PRD FR-008)", () => {
  it("maps every code to the documented HTTP status", () => {
    const expected: Record<string, number> = {
      INVALID_URL: 400,
      UNSUPPORTED_URL: 400,
      REDIRECT_REJECTED: 400,
      PIN_NOT_PUBLIC: 403,
      MEDIA_NOT_FOUND: 404,
      UNSUPPORTED_MEDIA: 422,
      RATE_LIMITED: 429,
      DAILY_CAP_REACHED: 429,
      UPSTREAM_BLOCKED: 502,
      RESOLVE_TIMEOUT: 504,
      INTERNAL_ERROR: 500,
    };
    for (const [code, status] of Object.entries(expected)) {
      expect(ERROR_DEFS[code as keyof typeof ERROR_DEFS].status, code).toBe(status);
    }
  });

  it("toErrorResponse returns safe body for ApiError", () => {
    const { body, status } = toErrorResponse(new ApiError("MEDIA_NOT_FOUND"), "req_x");
    expect(status).toBe(404);
    expect(body.requestId).toBe("req_x");
    expect(body.error.code).toBe("MEDIA_NOT_FOUND");
    expect(body.error.message.length).toBeGreaterThan(0);
  });

  it("toErrorResponse hides internals for unknown errors", () => {
    const { body, status } = toErrorResponse(new Error("secret db password leaked"), "req_y");
    expect(status).toBe(500);
    expect(body.error.code).toBe("INTERNAL_ERROR");
    expect(JSON.stringify(body)).not.toContain("secret");
  });
});

describe("formatBytes", () => {
  it("formats sizes and handles unknown", () => {
    expect(formatBytes(undefined)).toBe("—");
    expect(formatBytes(512)).toBe("512 B");
    expect(formatBytes(284193)).toBe("278 KB");
    expect(formatBytes(25 * 1024 * 1024)).toBe("25.0 MB");
  });
});

describe("formatEta", () => {
  it("formats countdowns coarsely without seconds", () => {
    expect(formatEta(0)).toBe("under a minute");
    expect(formatEta(59_000)).toBe("1m");
    expect(formatEta(24 * 60_000)).toBe("24m");
    expect(formatEta(3 * 3_600_000)).toBe("3h");
    expect(formatEta(3 * 3_600_000 + 24 * 60_000)).toBe("3h 24m");
    expect(formatEta(-5_000)).toBe("under a minute");
  });
});
