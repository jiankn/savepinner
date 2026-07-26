import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
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
  // Diverges from PRD §5 on purpose: the strings it specified were 63 and 188
  // characters, both past the point Google truncates them in the SERP. The
  // brand prefix was dropped so the target keyword leads.
  it("uses the exact home TDK and eight required FAQs", () => {
    expect(TOOL_PAGES.home.seoTitle).toBe("Free Pinterest Image Downloader — HD, No Watermark");
    expect(TOOL_PAGES.home.metaDescription).toBe(
      "Download Pinterest images and thumbnails in original HD quality. Free, no login, no watermark. Supports JPG, PNG, GIF and WebP.",
    );
    expect(TOOL_PAGES.home.faq).toHaveLength(8);
  });

  // The board page stays deferred deliberately: board download is not built
  // yet, and a landing page for a feature that does not exist is a doorway
  // page. The device pages target real, shipped behaviour.
  it("ships the keyword pages and defers the board page", () => {
    expect(Object.values(TOOL_PAGES).map((page) => page.path)).toEqual([
      "/",
      "/pinterest-video-downloader/",
      "/pinterest-gif-downloader/",
      "/pinterest-story-downloader/",
      "/pinterest-downloader-iphone/",
      "/pinterest-downloader-android/",
    ]);
  });

  it("lists every indexable page in the sitemap", () => {
    const urls = new Set(sitemap().map((entry) => new URL(entry.url).pathname));
    for (const page of Object.values(TOOL_PAGES)) {
      expect(urls.has(page.path), `sitemap missing ${page.path}`).toBe(true);
    }
  });

  /**
   * A device page exists to answer a device-specific question. If its prose
   * could sit on the home page unchanged it is a near-duplicate, which costs
   * more than the page earns — so require real, non-shared substance.
   */
  describe("device pages", () => {
    const devicePages = [TOOL_PAGES.iphone, TOOL_PAGES.android];

    it.each(devicePages)("$slug carries substantial original prose", (page) => {
      const words = (page.sections ?? [])
        .flatMap((s) => [s.heading, ...s.body, ...(s.bullets ?? [])])
        .join(" ")
        .split(/\s+/).length;

      expect(page.sections?.length ?? 0).toBeGreaterThanOrEqual(4);
      expect(words).toBeGreaterThan(500);
    });

    it.each(devicePages)("$slug does not reuse the home page's FAQ", (page) => {
      const homeQuestions = new Set(TOOL_PAGES.home.faq.map((item) => item.question));
      for (const item of page.faq) {
        expect(homeQuestions.has(item.question), item.question).toBe(false);
      }
    });
  });
});
