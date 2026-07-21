import { describe, expect, it } from "vitest";
import { ApiError } from "@/lib/errors";
import {
  isAllowedMediaHost,
  validateInputUrl,
} from "@/lib/pinterest/validate-url";

function expectCode(fn: () => unknown, code: string) {
  try {
    fn();
  } catch (err) {
    expect(err).toBeInstanceOf(ApiError);
    expect((err as ApiError).code).toBe(code);
    return;
  }
  throw new Error(`expected ApiError ${code}, but nothing was thrown`);
}

describe("validateInputUrl", () => {
  it("accepts a standard pin url and normalizes it", () => {
    const result = validateInputUrl("https://www.pinterest.com/pin/123456789/");
    expect(result).toEqual({
      kind: "pin",
      pinId: "123456789",
      url: "https://www.pinterest.com/pin/123456789/",
      host: "www.pinterest.com",
    });
  });

  it("accepts pin urls with tracking params and strips them", () => {
    const result = validateInputUrl("https://www.pinterest.com/pin/987654321/?mt=login&foo=bar");
    expect(result.kind).toBe("pin");
    if (result.kind === "pin") {
      expect(result.pinId).toBe("987654321");
      expect(result.url).toBe("https://www.pinterest.com/pin/987654321/");
    }
  });

  it("accepts regional pinterest domains", () => {
    for (const host of ["pinterest.co.uk", "pinterest.de", "pinterest.jp", "pinterest.com.mx"]) {
      const result = validateInputUrl(`https://${host}/pin/555/`);
      expect(result.kind).toBe("pin");
    }
  });

  it("accepts pin.it short links", () => {
    const result = validateInputUrl("https://pin.it/AbC123");
    expect(result).toEqual({ kind: "short", url: "https://pin.it/AbC123/", shortcode: "AbC123" });
  });

  it("rejects http (non-https)", () => {
    expectCode(() => validateInputUrl("http://www.pinterest.com/pin/123/"), "INVALID_URL");
  });

  it("rejects non-pinterest hosts", () => {
    expectCode(() => validateInputUrl("https://evil.com/pin/123/"), "INVALID_URL");
    // Contains-matching must not pass (PRD §11.1 exact allow list).
    expectCode(() => validateInputUrl("https://www.pinterest.com.evil.com/pin/123/"), "INVALID_URL");
    expectCode(() => validateInputUrl("https://fakepinterest.com/pin/123/"), "INVALID_URL");
  });

  it("rejects pinterest non-pin paths as unsupported", () => {
    expectCode(() => validateInputUrl("https://www.pinterest.com/someuser/"), "UNSUPPORTED_URL");
    expectCode(() => validateInputUrl("https://www.pinterest.com/someuser/board-name/"), "UNSUPPORTED_URL");
    expectCode(() => validateInputUrl("https://www.pinterest.com/search/pins/?q=cats"), "UNSUPPORTED_URL");
  });

  it("rejects credentials and non-standard ports", () => {
    expectCode(() => validateInputUrl("https://user:pass@www.pinterest.com/pin/123/"), "INVALID_URL");
    expectCode(() => validateInputUrl("https://www.pinterest.com:8080/pin/123/"), "INVALID_URL");
  });

  it("rejects empty, overlong and unparseable input", () => {
    expectCode(() => validateInputUrl(""), "INVALID_URL");
    expectCode(() => validateInputUrl("   "), "INVALID_URL");
    expectCode(() => validateInputUrl("not a url"), "INVALID_URL");
    expectCode(() => validateInputUrl(`https://www.pinterest.com/pin/123/${"x".repeat(2100)}`), "INVALID_URL");
    expectCode(() => validateInputUrl(42), "INVALID_URL");
  });

  it("rejects localhost and private ip literal hosts", () => {
    expectCode(() => validateInputUrl("https://localhost/pin/123/"), "INVALID_URL");
    expectCode(() => validateInputUrl("https://127.0.0.1/pin/123/"), "INVALID_URL");
    expectCode(() => validateInputUrl("https://192.168.1.1/pin/123/"), "INVALID_URL");
  });
});

describe("isAllowedMediaHost", () => {
  it("allows known pinterest cdn hosts", () => {
    expect(isAllowedMediaHost("i.pinimg.com")).toBe(true);
    expect(isAllowedMediaHost("v.pinimg.com")).toBe(true);
  });

  it("rejects lookalikes and other hosts", () => {
    expect(isAllowedMediaHost("i.pinimg.com.evil.com")).toBe(false);
    expect(isAllowedMediaHost("pinimg.com")).toBe(false);
    expect(isAllowedMediaHost("evil.com")).toBe(false);
  });
});
