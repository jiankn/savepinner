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

function htmlWithRelayData(pinId: string, pin: Record<string, unknown>): string {
  const variables = encodeURIComponent(JSON.stringify({ variables: { pinId } }));
  const payload = JSON.stringify({
    data: { v3GetPinQueryv2: { data: { ...pin, entityId: pinId, __typename: "Pin" } } },
  });
  return `<!doctype html><html><body><script data-relay-completed-request="true">window.__PWS_RELAY_REGISTER_COMPLETED_REQUEST__("${variables}", ${payload});</script></body></html>`;
}

describe("parseMediaFromHtml", () => {
  function missingPinHtml(pinId: string): string {
    const key = encodeURIComponent(JSON.stringify({ variables: { pinId } }));
    return `<meta property="og:image" content="https://i.pinimg.com/originals/generic.jpg">
      <script data-relay-completed-request="true">window.__PWS_RELAY_REGISTER_COMPLETED_REQUEST__("${key}", {"data":{"v3GetPinQueryv2":{"__typename":"PinNotFound","__isError":"PinNotFound"}}});</script>`;
  }

  it("rejects a missing requested Pin even when generic image metadata exists", () => {
    expect(() => parseMediaFromHtml(missingPinHtml("123"), "123")).toThrow(
      expect.objectContaining({ code: "MEDIA_NOT_FOUND", status: 404 }),
    );
  });

  it("does not reject a valid Pin because another relay request reports PinNotFound", () => {
    const html = missingPinHtml("456") + htmlWithRelayData("123", {
      images_orig: { url: "https://i.pinimg.com/originals/requested.jpg" },
    });
    expect(parseMediaFromHtml(html, "123").images[0].url).toContain("requested.jpg");
  });

  it("does not use an unrelated relay Pin when the requested Pin has only OG metadata", () => {
    const other = htmlWithRelayData("456", {
      images_orig: { url: "https://i.pinimg.com/originals/unrelated.jpg" },
    });
    const html = other + '<meta property="og:image" content="https://i.pinimg.com/originals/requested.jpg">';
    expect(parseMediaFromHtml(html, "123").images[0].url).toContain("requested.jpg");
  });

  it("preserves valid relay payloads with legacy opaque request keys", () => {
    const html = htmlWithRelayData("123", {
      images_orig: { url: "https://i.pinimg.com/originals/requested.jpg" },
    }).replace(/%7B[^\"]+/, "legacy-key");
    expect(parseMediaFromHtml(html, "123").images[0].url).toContain("requested.jpg");
  });

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

  it("parses Pinterest's current relay videoList payload and v1 CDN URLs", () => {
    const pinId = "68746366275";
    const html = htmlWithRelayData(pinId, {
      gridTitle: "Pineapple Roasted Chicken",
      images_236x: {
        url: "https://i.pinimg.com/236x/e/b/c/poster.jpg",
        width: 236,
        height: 419,
      },
      images_orig: { url: "https://i.pinimg.com/originals/e/b/c/poster.jpg" },
      videos: {
        videoUrls: [
          "https://v1.pinimg.com/videos/mc/hls/e/b/c/stream.m3u8",
          "https://v1.pinimg.com/videos/mc/720p/e/b/c/video.mp4",
        ],
        videoList: {
          __typename: "VideoList",
          vHLSV4: {
            url: "https://v1.pinimg.com/videos/mc/hls/e/b/c/stream.m3u8",
            width: 576,
            height: 1024,
          },
          v720P: {
            url: "https://v1.pinimg.com/videos/mc/720p/e/b/c/video.mp4",
            width: 576,
            height: 1024,
          },
        },
      },
    });

    const media = parseMediaFromHtml(html, pinId);
    expect(media.kind).toBe("video");
    expect(media.title).toBe("Pineapple Roasted Chicken");
    expect(media.videos).toHaveLength(1);
    expect(media.videos[0]).toMatchObject({
      url: "https://v1.pinimg.com/videos/mc/720p/e/b/c/video.mp4",
      qualityHint: "v720P",
    });
    expect(media.images.some((candidate) => candidate.url.includes("/236x/"))).toBe(true);
  });

  it("parses current relay GIF fields and prefers the animated original", () => {
    const pinId = "441282463488355461";
    const html = htmlWithRelayData(pinId, {
      gridTitle: "Animated Sticker",
      embed: {
        type: "gif",
        src: "https://i.pinimg.com/originals/b/a/e/animated.gif",
      },
      images_236x: {
        url: "https://i.pinimg.com/236x/b/a/e/animated.jpg",
        width: 236,
        height: 171,
      },
      images_orig: {
        url: "https://i.pinimg.com/originals/b/a/e/animated.gif",
      },
      videos: null,
    });

    const media = parseMediaFromHtml(html, pinId);
    expect(media.kind).toBe("gif");
    expect(media.images.some((candidate) => candidate.format === "gif")).toBe(true);
    expect(media.title).toBe("Animated Sticker");
  });

  it("parses Idea Pin clips stored under storyPinData instead of pin.videos", () => {
    const pinId = "580471839512797064";
    const stem = "https://v1.pinimg.com/videos/iht/720p/9c/30/fe/9c30fe6d6f7b76bde4f732f94a4dca8a";
    const hls = "https://v1.pinimg.com/videos/iht/hls/9c/30/fe/9c30fe6d6f7b76bde4f732f94a4dca8a.m3u8";
    const html = htmlWithRelayData(pinId, {
      gridTitle: "Idea Pin clip",
      images_236x: { url: "https://i.pinimg.com/236x/63/96/20/cover.jpg", width: 236, height: 419 },
      images_orig: { url: "https://i.pinimg.com/originals/63/96/20/cover.jpg" },
      videos: null,
      storyPinData: {
        pages: [
          {
            blocks: [
              {
                __typename: "StoryPinVideoBlock",
                videoDataV2: {
                  videoListMobile: { vHLSV3MOBILE: { url: hls, width: 720, height: 1280 } },
                  videoListEXP3: null,
                  videoList720P: { v720P: { url: `${stem}.mp4`, width: 720, height: 1280 } },
                  videoList: { vHLSV3MOBILE: { url: hls, width: 720, height: 1280 } },
                  v_hlsv4_video_list: { vHLSV4: { url: hls, width: 720, height: 1280 } },
                },
              },
            ],
          },
        ],
      },
    });

    const media = parseMediaFromHtml(html, pinId);
    expect(media.kind).toBe("video");
    expect(media.videos).toHaveLength(1);
    expect(media.videos[0]).toMatchObject({ url: `${stem}.mp4`, qualityHint: "v720P" });
    expect(media.images.some((candidate) => candidate.url.includes("/236x/"))).toBe(true);
  });

  it("keeps pin.videos ahead of storyPinData when a Pin carries both", () => {
    const pinId = "68746366275";
    const html = htmlWithRelayData(pinId, {
      videos: {
        videoList: {
          v720P: { url: "https://v1.pinimg.com/videos/mc/720p/main.mp4", width: 576, height: 1024 },
        },
      },
      storyPinData: {
        pages: [
          {
            blocks: [
              {
                videoDataV2: {
                  videoList720P: {
                    v720P: { url: "https://v1.pinimg.com/videos/iht/720p/story.mp4", width: 720, height: 1280 },
                  },
                },
              },
            ],
          },
        ],
      },
    });

    const media = parseMediaFromHtml(html, pinId);
    expect(media.videos.map((candidate) => candidate.url)).toEqual([
      "https://v1.pinimg.com/videos/mc/720p/main.mp4",
    ]);
  });

  it("returns one variant per Idea Pin clip instead of every alternate encode", () => {
    const pinId = "580471839512797065";
    const stem = "https://v1.pinimg.com/videos/iht";
    const html = htmlWithRelayData(pinId, {
      images_orig: { url: "https://i.pinimg.com/originals/6/3/9/cover.jpg" },
      videos: null,
      storyPinData: {
        pages: [
          {
            blocks: [
              {
                videoDataV2: {
                  videoListEXP3: { vEXP3: { url: `${stem}/expMp4/a/b/c/clip_t1.mp4`, width: 1080, height: 1920 } },
                  videoListEXP7: { vEXP7: { url: `${stem}/expMp4/a/b/c/clip.mp4`, width: 1080, height: 1920 } },
                  videoList720P: { v720P: { url: `${stem}/720p/a/b/c/clip.mp4`, width: 1080, height: 1920 } },
                  videoList: { vHLSV3MOBILE: { url: `${stem}/hls/a/b/c/clip.m3u8`, width: 1080, height: 1920 } },
                },
              },
            ],
          },
        ],
      },
    });

    const media = parseMediaFromHtml(html, pinId);
    expect(media.videos.map((candidate) => candidate.url)).toEqual([`${stem}/720p/a/b/c/clip.mp4`]);
  });

  it("leaves multi-page Idea Pin slideshows as image downloads but lists every page", () => {
    const pinId = "424605071126047814";
    const clip = (name: string) => ({
      __typename: "StoryPinVideoBlock",
      videoDataV2: {
        videoListMobile: {
          vHLSV3MOBILE: { url: `https://v1.pinimg.com/videos/mc/hls/9/4/8/${name}.m3u8` },
        },
        videoList720P: {
          v720P: {
            url: `https://v1.pinimg.com/videos/mc/720p/9/4/8/${name}.mp4`,
            width: 1080,
            height: 1920,
            thumbnail: `https://i.pinimg.com/videos/thumbnails/originals/9/4/8/${name}.jpg`,
          },
        },
      },
    });
    const html = htmlWithRelayData(pinId, {
      title: "Skin Tone Ranges",
      images_orig: { url: "https://i.pinimg.com/originals/b6/d0/aa/cover.png", width: 1000, height: 1500 },
      videos: null,
      storyPinData: {
        pages: [
          { blocks: [clip("first")] },
          {
            blocks: [
              {
                __typename: "StoryPinImageBlock",
                images_750x: { url: "https://i.pinimg.com/736x/f5/7d/6a/slide.jpg", width: 736, height: 1308 },
              },
            ],
          },
          { blocks: [clip("third")] },
        ],
      },
    });

    const media = parseMediaFromHtml(html, pinId);
    expect(media.kind).toBe("image");
    expect(media.videos).toHaveLength(0);
    expect(media.storyPages).toHaveLength(3);
    expect(media.storyPages.map((page) => [page.index, page.kind])).toEqual([
      [1, "video"],
      [2, "image"],
      [3, "video"],
    ]);
    expect(media.storyPages[0].candidates[0].url).toBe(
      "https://v1.pinimg.com/videos/mc/720p/9/4/8/first.mp4",
    );
    expect(media.storyPages[0].thumbnail).toBe(
      "https://i.pinimg.com/videos/thumbnails/originals/9/4/8/first.jpg",
    );
    expect(media.storyPages[1].candidates[0].url).toBe("https://i.pinimg.com/736x/f5/7d/6a/slide.jpg");
  });

  it("keeps page numbering aligned when a slide carries no downloadable media", () => {
    const pinId = "424605071126047815";
    const html = htmlWithRelayData(pinId, {
      images_orig: { url: "https://i.pinimg.com/originals/b6/d0/aa/cover.png" },
      videos: null,
      storyPinData: {
        pages: [
          { blocks: [{ __typename: "StoryPinTextBlock", text: "intro" }] },
          {
            blocks: [
              {
                __typename: "StoryPinImageBlock",
                images_750x: { url: "https://i.pinimg.com/736x/f5/7d/6a/slide.jpg", width: 736 },
              },
            ],
          },
        ],
      },
    });

    const media = parseMediaFromHtml(html, pinId);
    expect(media.storyPages.map((page) => page.index)).toEqual([2]);
  });

  it("reports no story pages for ordinary Pins", () => {
    const html = htmlWithPwsData(
      pwsData({ title: "Cat", images: { orig: { url: "https://i.pinimg.com/originals/a/b/c/x.jpg" } } }),
    );
    expect(parseMediaFromHtml(html).storyPages).toEqual([]);
  });

  it("ignores Idea Pins whose only renditions are HLS streams", () => {
    const pinId = "580471839512797066";
    const hls = "https://v1.pinimg.com/videos/iht/hls/a/b/c/stream.m3u8";
    const html = htmlWithRelayData(pinId, {
      images_orig: { url: "https://i.pinimg.com/originals/6/3/9/cover.jpg" },
      videos: null,
      storyPinData: {
        pages: [
          {
            blocks: [
              {
                videoDataV2: {
                  videoListMobile: { vHLSV3MOBILE: { url: hls, width: 720, height: 1280 } },
                  videoList: { vHLSV3MOBILE: { url: hls, width: 720, height: 1280 } },
                },
              },
            ],
          },
        ],
      },
    });

    const media = parseMediaFromHtml(html, pinId);
    expect(media.kind).toBe("image");
    expect(media.videos).toHaveLength(0);
  });

  it("selects the requested Pin when a relay page contains other Pin records", () => {
    const targetId = "989243874418277815";
    const other = htmlWithRelayData("111", {
      title: "Unrelated video",
      videos: {
        videoList: {
          v720P: {
            url: "https://v1.pinimg.com/videos/mc/720p/other.mp4",
            width: 720,
            height: 1280,
          },
        },
      },
    });
    const target = htmlWithRelayData(targetId, {
      title: "Requested image",
      images_orig: {
        url: "https://i.pinimg.com/originals/5/9/f/requested.jpg",
        width: 736,
        height: 857,
      },
    });
    const html = other.replace("</body></html>", "") + target.replace("<!doctype html><html><body>", "");

    const media = parseMediaFromHtml(html, targetId);
    expect(media.kind).toBe("image");
    expect(media.title).toBe("Requested image");
    expect(media.images[0]?.url).toContain("requested.jpg");
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

  it("falls back to an embedded image_xlarge_url field", () => {
    const html = `<html><body><script>{"image_xlarge_url":"https:\\/\\/i.pinimg.com\\/736x\\/z\\/y\\/x\\/photo.jpg"}</script></body></html>`;
    const media = parseMediaFromHtml(html);
    expect(media.images[0]?.url).toBe("https://i.pinimg.com/736x/z/y/x/photo.jpg");
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
