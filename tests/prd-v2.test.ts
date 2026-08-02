import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import {
  getPinterestDownloaderHubJsonLd,
  HUB_URL_FORMATS,
  PINTEREST_DOWNLOADER_HUB,
} from "@/lib/hub-content";
import { buildImageRenditions } from "@/lib/pinterest";
import { TOOL_PAGES } from "@/lib/page-content";
import { getPageJsonLd } from "@/lib/seo";
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
    const entries = sitemap();
    const urls = new Set(entries.map((entry) => new URL(entry.url).pathname));
    for (const page of Object.values(TOOL_PAGES)) {
      expect(urls.has(page.path), `sitemap missing ${page.path}`).toBe(true);
      expect(entries.find((entry) => new URL(entry.url).pathname === page.path)?.lastModified)
        .toBe(page.lastModified);
    }
    expect(urls.has(PINTEREST_DOWNLOADER_HUB.path)).toBe(true);
  });

  it("keeps the generic category keyword on a separate hub", () => {
    expect(PINTEREST_DOWNLOADER_HUB.path).toBe("/pinterest-downloader/");
    expect(PINTEREST_DOWNLOADER_HUB.seoTitle.startsWith("Pinterest Downloader")).toBe(true);
    expect(TOOL_PAGES.home.seoTitle).toBe("Free Pinterest Image Downloader — HD, No Watermark");
  });

  it("makes the generic hub a real tool and maintained reference", () => {
    expect(PINTEREST_DOWNLOADER_HUB.lastModified).toBe("2026-08-02");
    expect(PINTEREST_DOWNLOADER_HUB.seoTitle.length).toBeLessThanOrEqual(60);
    expect(PINTEREST_DOWNLOADER_HUB.metaDescription.length).toBeLessThanOrEqual(155);
    expect(HUB_URL_FORMATS.map((format) => format.status)).toContain("Supported");
    expect(HUB_URL_FORMATS.map((format) => format.status)).toContain("Not supported");

    const graph = getPinterestDownloaderHubJsonLd()["@graph"];
    expect(graph.map((entity) => entity["@type"])).toEqual([
      "CollectionPage",
      "WebApplication",
    ]);
    expect(JSON.stringify(graph)).not.toContain("aggregateRating");
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

  describe("media-intent pages", () => {
    const mediaPages = [TOOL_PAGES.video, TOOL_PAGES.gif, TOOL_PAGES.story];

    it.each(mediaPages)("$slug carries substantial intent-specific guidance", (page) => {
      const words = (page.sections ?? [])
        .flatMap((section) => [
          section.heading,
          ...section.body,
          ...(section.bullets ?? []),
        ])
        .join(" ")
        .split(/\s+/).length;

      expect(page.sections?.length ?? 0).toBeGreaterThanOrEqual(4);
      expect(words).toBeGreaterThan(300);
    });

    it("does not pretend every Story Pin or GIF is one fixed format", () => {
      const videoText = JSON.stringify(TOOL_PAGES.video);
      const storyText = JSON.stringify(TOOL_PAGES.story);
      const gifText = JSON.stringify(TOOL_PAGES.gif);

      expect(videoText).toContain("HLS");
      expect(videoText).toContain("audio track");
      expect(storyText).toContain("image");
      expect(storyText).toContain("video");
      expect(gifText).toContain("looping MP4");
      expect(gifText).toContain("static");
    });
  });
});

describe("homepage structured data", () => {
  it("identifies the site, operator and real free web application", () => {
    const graph = getPageJsonLd(TOOL_PAGES.home)["@graph"];
    const types = graph.map((entity) => entity["@type"]);

    expect(types).toEqual([
      "Organization",
      "WebSite",
      "WebApplication",
      "FAQPage",
    ]);
    expect(JSON.stringify(graph)).toContain("https://savepinner.com/icon.png");
    expect(JSON.stringify(graph)).not.toContain("aggregateRating");
    expect(JSON.stringify(graph)).not.toContain("\"review\"");
  });

  it("does not repeat site-level entities on every tool page", () => {
    const types = getPageJsonLd(TOOL_PAGES.video)["@graph"].map(
      (entity) => entity["@type"],
    );

    expect(types).toEqual(["WebApplication", "FAQPage"]);
  });
});
