import { describe, expect, it } from "vitest";
import { isAllowedShortRedirectTarget } from "@/lib/pinterest/resolve-short-url";

describe("pin.it redirect allow list", () => {
  it("allows Pinterest's current URL-shortener intermediate endpoint", () => {
    expect(
      isAllowedShortRedirectTarget(
        new URL("https://api.pinterest.com/url_shortener/39YYRhN0f/redirect/"),
      ),
    ).toBe(true);
  });

  it("allows final Pinterest Pin targets", () => {
    expect(
      isAllowedShortRedirectTarget(
        new URL("https://www.pinterest.com/pin/example-title--68746366275/"),
      ),
    ).toBe(true);
  });

  it.each([
    "https://api.pinterest.com/other/path/",
    "https://api.pinterest.com.evil.example/url_shortener/abc/redirect/",
    "http://api.pinterest.com/url_shortener/abc/redirect/",
    "https://evil.example/pin/123/",
  ])("rejects %s", (url) => {
    expect(isAllowedShortRedirectTarget(new URL(url))).toBe(false);
  });
});
