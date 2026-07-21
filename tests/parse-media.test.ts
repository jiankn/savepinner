import { describe, expect, it } from "vitest";
import { parseMediaFromHtml, pickPreviewCandidate } from "@/lib/pinterest/parse-media";

function htmlWithPwsData(data: unknown): string {
  return `<!doctype html><html><head><title>Pin</title></head><body><script id="__PWS_DATA__" type="application/json">${JSON.stringify(
    data,
  )}</script></body></html>`;
}

function pwsData(pin: Record<string, unknown>) {
  return { props: { initialReduxState: { pins: { "123": pin } } } };
}

describe("parseMediaFromHtml", () => {
  it("parses image pins with sorted, deduped candidates", () => {
    const html = htmlWithPwsData(
      pwsData({
        title: "Cute cat",
        closeup_unified_description: "A very cute cat",
        images: {
          "236x": { url: "https://i.pinimg.com/236x/ab/cd/ef/x.jpg", width: 236, height: 354 },
          orig: { url: "https://i.pinimg.com/originals/ab/cd/ef/x.jpg", width: 1000, height: 1500 },
          "736x": { url: "https://i.pinimg.com/736x/ab/cd/ef/x.jpg", width: 736, height: 1104 },
          dup: { url: "https://i.pinimg.com/originals/ab/cd/ef/x.jpg", width: 1000, height: 1500 },
        },
      }),
    );
    const media = parseMediaFromHtml(html);
    expect(media.kind).toBe("image");
    expect(media.title).toBe("Cute cat");
    expect(media.description).toBe("A very cute cat");
    expect(media.images.map((c) => c.width)).toEqual([1000, 736, 236]);
    expect(new Set(media.images.map((c) => c.url)).size).toBe(media.images.length);
  });

  it("detects video pins and skips HLS streams", () => {
    const html = htmlWithPwsData(
      pwsData({
        title: "Clip",
        images: { "736x": { url: "https://i.pinimg.com/736x/a/b/c/poster.jpg", width: 736, height: 1308 } },
        videos: {
          video_list: {
            V_720P: { url: "https://v1.pinimg.com/videos/mc/hls/720p.mp4", width: 720, height: 1280 },
            V_480P: { url: "https://v1.pinimg.com/videos/mc/hls/480p.mp4", width: 480, height: 853 },
            V_HLS: { url: "https://v1.pinimg.com/videos/mc/hls/stream.m3u8", width: 720, height: 1280 },
          },
        },
      }),
    );
    const media = parseMediaFromHtml(html);
    expect(media.kind).toBe("video");
    expect(media.videos).toHaveLength(2);
    expect(media.videos[0].width).toBe(720);
    expect(media.videos.every((v) => v.url.endsWith(".mp4"))).toBe(true);
    expect(media.images).toHaveLength(1); // poster kept for preview
  });

  it("detects gif pins via the largest image extension", () => {
    const html = htmlWithPwsData(
      pwsData({
        images: {
          orig: { url: "https://i.pinimg.com/originals/a/b/c/anim.gif", width: 480, height: 270 },
          "474x": { url: "https://i.pinimg.com/474x/a/b/c/anim.jpg", width: 474, height: 267 },
        },
      }),
    );
    const media = parseMediaFromHtml(html);
    expect(media.kind).toBe("gif");
  });

  it("falls back to og meta tags when no embedded json exists", () => {
    const html = `<html><head>
      <meta property="og:title" content="OG Pin" />
      <meta property="og:image" content="https://i.pinimg.com/originals/z/y/x/photo.jpg" />
      <meta property="og:description" content="desc here" />
    </head><body></body></html>`;
    const media = parseMediaFromHtml(html);
    expect(media.kind).toBe("image");
    expect(media.title).toBe("OG Pin");
    expect(media.images[0]?.url).toContain("photo.jpg");
  });

  it("returns empty candidate lists for pages without media", () => {
    const media = parseMediaFromHtml("<html><body>nothing here</body></html>");
    expect(media.images).toHaveLength(0);
    expect(media.videos).toHaveLength(0);
  });

  it("ignores non-https candidate urls", () => {
    const html = htmlWithPwsData(
      pwsData({
        images: {
          orig: { url: "http://i.pinimg.com/originals/a.jpg", width: 100, height: 100 },
        },
      }),
    );
    const media = parseMediaFromHtml(html);
    expect(media.images).toHaveLength(0);
  });
});

describe("pickPreviewCandidate", () => {
  it("prefers a small candidate around 236px+", () => {
    const images = [
      { url: "https://i.pinimg.com/originals/x.jpg", kind: "image" as const, width: 1000, height: 1000, format: "jpg" },
      { url: "https://i.pinimg.com/236x/x.jpg", kind: "image" as const, width: 236, height: 236, format: "jpg" },
      { url: "https://i.pinimg.com/75x75/x.jpg", kind: "image" as const, width: 75, height: 75, format: "jpg" },
    ];
    expect(pickPreviewCandidate(images)?.width).toBe(236);
  });

  it("returns undefined for empty lists", () => {
    expect(pickPreviewCandidate([])).toBeUndefined();
  });
});
