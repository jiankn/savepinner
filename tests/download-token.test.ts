import { describe, expect, it } from "vitest";
import { mintToken, sanitizeFilename, tokenTargetUrl, verifyToken } from "@/lib/download-token";
import { ApiError } from "@/lib/errors";

const baseInput = {
  typ: "dl" as const,
  url: "https://i.pinimg.com/originals/ab/cd/ef/abcdef.jpg?x=1",
  mime: "image/jpeg",
  maxBytes: 25 * 1024 * 1024,
  filename: "savepinner-image-736x1104",
  ttlMs: 5 * 60 * 1000,
};

describe("download token", () => {
  it("round-trips a valid token", () => {
    const token = mintToken(baseInput);
    const payload = verifyToken(token, "dl");
    expect(payload.host).toBe("i.pinimg.com");
    expect(payload.path).toBe("/originals/ab/cd/ef/abcdef.jpg?x=1");
    expect(payload.mime).toBe("image/jpeg");
    expect(payload.max).toBe(baseInput.maxBytes);
    expect(tokenTargetUrl(payload)).toBe(baseInput.url);
  });

  it("does not contain the original pin url or raw host in plaintext part", () => {
    const token = mintToken(baseInput);
    // Token payload is base64url JSON; make sure a pin page url is not embedded.
    expect(token).not.toContain("pinterest.com/pin");
  });

  it("rejects tampered payloads", () => {
    const token = mintToken(baseInput);
    const [data, sig] = token.split(".");
    const forged = JSON.parse(Buffer.from(data, "base64url").toString("utf8")) as { max: number };
    forged.max = 999_999_999;
    const forgedData = Buffer.from(JSON.stringify(forged), "utf8").toString("base64url");
    expect(() => verifyToken(`${forgedData}.${sig}`, "dl")).toThrowError(ApiError);
  });

  it("rejects truncated and malformed tokens", () => {
    expect(() => verifyToken("garbage", "dl")).toThrowError(ApiError);
    expect(() => verifyToken("a.b.c", "dl")).toThrowError(ApiError);
    expect(() => verifyToken("", "dl")).toThrowError(ApiError);
  });

  it("rejects wrong token type (preview token used for download)", () => {
    const token = mintToken({ ...baseInput, typ: "pv" });
    try {
      verifyToken(token, "dl");
      throw new Error("should have thrown");
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError);
      expect((err as ApiError).code).toBe("TOKEN_INVALID");
    }
  });

  it("rejects expired tokens", () => {
    const token = mintToken({ ...baseInput, ttlMs: -1000 });
    try {
      verifyToken(token, "dl");
      throw new Error("should have thrown");
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError);
      expect((err as ApiError).code).toBe("TOKEN_EXPIRED");
    }
  });
});

describe("sanitizeFilename", () => {
  it("strips header-injection characters", () => {
    expect(sanitizeFilename('a"\r\nb.jpg')).toBe("a-b.jpg");
    // Path separators are removed; the result is header-safe.
    expect(sanitizeFilename("../../../etc/passwd")).toBe("..-..-..-etc-passwd");
    expect(sanitizeFilename("../../../etc/passwd")).not.toContain("/");
  });

  it("keeps safe names and provides a fallback", () => {
    expect(sanitizeFilename("savepinner-image-736x1104")).toBe("savepinner-image-736x1104");
    expect(sanitizeFilename('""')).toBe("savepinner-media");
  });
});
