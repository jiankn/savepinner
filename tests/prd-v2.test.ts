import { describe, expect, it } from "vitest";
import { buildImageRenditions } from "@/lib/pinterest";
import { TOOL_PAGES } from "@/lib/page-content";
import { parseDownloadTarget } from "@/app/api/dl/route";

describe("PRD v2 image renditions", () => {
  it("creates the exact four Pinterest image sizes", () => {
    const variants = buildImageRenditions({
      kind: "image",
      url: "https://i.pinimg.com/736x/aa/bb/cc/example.jpg",
      format: "jpg",
      width: 736,
      height: 1104,
    });

    expect(variants.map((variant) => variant.quality)).toEqual([
      "Original",
      "736x",
      "564x",
      "Thumbnail (236x)",
    ]);
    expect(variants.map((variant) => new URL(variant.url).pathname.split("/")[1])).toEqual([
      "originals",
      "736x",
      "564x",
      "236x",
    ]);
  });
});

describe("PRD v2 download proxy allow list", () => {
  it.each([
    "https://i.pinimg.com/originals/a.jpg",
    "https://v.pinimg.com/videos/a.mp4",
    "https://v1.pinimg.com/videos/a.mp4",
  ])(
    "allows %s",
    (url) => expect(parseDownloadTarget(url).toString()).toBe(url),
  );

  it.each([
    "http://i.pinimg.com/originals/a.jpg",
    "https://evil.example/a.jpg",
    "https://i.pinimg.com.evil.example/a.jpg",
  ])("rejects %s", (url) => {
    expect(() => parseDownloadTarget(url)).toThrow();
  });
});

describe("PRD v2 page matrix", () => {
  it("uses the exact home TDK and eight required FAQs", () => {
    expect(TOOL_PAGES.home.seoTitle).toBe(
      "SavePinner - Free Pinterest Image Downloader (HD, No Watermark)",
    );
    expect(TOOL_PAGES.home.metaDescription).toBe(
      "Download Pinterest images & thumbnails in HD quality for free. No login required. Supports JPG, PNG, GIF, WebP. Fast, secure, and no watermark. Try our free Pinterest image downloader now.",
    );
    expect(TOOL_PAGES.home.faq).toHaveLength(8);
  });

  it("ships the three first-release keyword pages and defers the board page", () => {
    expect(Object.values(TOOL_PAGES).map((page) => page.path)).toEqual([
      "/",
      "/pinterest-video-downloader/",
      "/pinterest-gif-downloader/",
      "/pinterest-story-downloader/",
    ]);
  });
});
