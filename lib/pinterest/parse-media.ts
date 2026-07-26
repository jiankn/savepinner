/**
 * Media extraction from Pin page HTML — PRD §6.2 (FR-003/004/005).
 *
 * Primary source: the embedded `__PWS_DATA__` JSON blob (public page
 * metadata). Fallback: Open Graph / Twitter meta tags. Every candidate is
 * still verified server-side before being shown (see verify-variant.ts) —
 * we never fabricate "original" URLs by string rewriting.
 */

export type MediaKind = "image" | "gif" | "video";

export interface MediaCandidate {
  url: string;
  kind: "image" | "video";
  width?: number;
  height?: number;
  /** Lowercase file extension without dot, e.g. "jpg", "mp4". */
  format: string;
  /** Pinterest's own rendition key when present (for example V_720P). */
  qualityHint?: string;
}

/** One page of an Idea Pin, with its renditions ordered largest first. */
export interface StoryPinPage {
  /** 1-based position inside the Idea Pin. */
  index: number;
  kind: "image" | "video";
  candidates: MediaCandidate[];
  /** Poster frame supplied by Pinterest for video pages. */
  thumbnail?: string;
}

export interface ParsedMedia {
  kind: MediaKind;
  title?: string;
  description?: string;
  images: MediaCandidate[];
  videos: MediaCandidate[];
  /** Empty for everything except Idea Pins. */
  storyPages: StoryPinPage[];
}

interface PinImageEntry {
  url?: string;
  width?: number;
  height?: number;
}

interface PinVideoEntry {
  url?: string;
  width?: number;
  height?: number;
  duration?: number;
}

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** First value that is a plain object, for fields Pinterest names both ways. */
function firstRecord(...values: unknown[]): JsonRecord | null {
  for (const value of values) {
    if (isRecord(value)) return value;
  }
  return null;
}

function extFromUrl(url: string): string {
  try {
    const path = new URL(url).pathname.toLowerCase();
    const match = /\.([a-z0-9]+)$/.exec(path);
    return match?.[1] ?? "";
  } catch {
    return "";
  }
}

function asNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? Math.round(value) : undefined;
}

function dedupeAndSort(candidates: MediaCandidate[]): MediaCandidate[] {
  const seen = new Set<string>();
  const out: MediaCandidate[] = [];
  for (const c of candidates) {
    if (seen.has(c.url)) continue;
    seen.add(c.url);
    out.push(c);
  }
  out.sort((a, b) => (b.width ?? 0) * (b.height ?? 0) - (a.width ?? 0) * (a.height ?? 0));
  return out;
}

function toImageCandidate(entry: PinImageEntry): MediaCandidate | null {
  if (!entry || typeof entry.url !== "string" || !entry.url.startsWith("https://")) return null;
  return {
    url: entry.url,
    kind: "image",
    width: asNumber(entry.width),
    height: asNumber(entry.height),
    format: extFromUrl(entry.url),
  };
}

function toVideoCandidate(entry: PinVideoEntry, qualityHint?: string): MediaCandidate | null {
  if (!entry || typeof entry.url !== "string" || !entry.url.startsWith("https://")) return null;
  const format = extFromUrl(entry.url);
  // Only progressive files are downloadable as single files; skip HLS/DASH.
  if (format !== "mp4" && format !== "mov" && format !== "webm") return null;
  return {
    url: entry.url,
    kind: "video",
    width: asNumber(entry.width),
    height: asNumber(entry.height),
    format,
    qualityHint,
  };
}

/**
 * A Story Pin block exposes the same clip through several `videoList*`
 * containers (`videoList720P`, `videoListEXP3`…`videoListEXP7`, HLS lists).
 * They are alternate encodes of one file, so the most specific progressive
 * container wins instead of emitting five near-identical download buttons.
 */
const VIDEO_LIST_PREFERENCE = ["videolist720p", "videolist", "videolistmobile"];

function videoListRank(key: string): number {
  const index = VIDEO_LIST_PREFERENCE.indexOf(key.toLowerCase());
  return index === -1 ? VIDEO_LIST_PREFERENCE.length : index;
}

function blockVideoCandidates(block: JsonRecord): { candidates: MediaCandidate[]; thumbnail?: string } {
  const videoData = firstRecord(
    block.videoDataV2,
    block.video_data_v2,
    block.videoData,
    block.video_data,
  );
  if (!videoData) return { candidates: [] };

  const containers = Object.keys(videoData)
    .filter((key) => isRecord(videoData[key]) && /video_?list/i.test(key))
    .sort((a, b) => videoListRank(a) - videoListRank(b));

  for (const key of containers) {
    const candidates: MediaCandidate[] = [];
    let thumbnail: string | undefined;
    for (const [quality, entry] of Object.entries(videoData[key] as JsonRecord)) {
      const candidate = toVideoCandidate(entry as PinVideoEntry, quality);
      if (!candidate) continue;
      candidates.push(candidate);
      if (!thumbnail && isRecord(entry) && typeof entry.thumbnail === "string") {
        thumbnail = entry.thumbnail.startsWith("https://") ? entry.thumbnail : undefined;
      }
    }
    if (candidates.length > 0) return { candidates: dedupeAndSort(candidates), thumbnail };
  }
  return { candidates: [] };
}

function blockImageCandidates(block: JsonRecord): MediaCandidate[] {
  const candidates: MediaCandidate[] = [];
  for (const [key, value] of Object.entries(block)) {
    const entry = imageFieldEntry(key, value);
    if (!entry) continue;
    const candidate = toImageCandidate(entry);
    if (candidate) candidates.push(candidate);
  }
  return dedupeAndSort(candidates);
}

/**
 * Idea Pins (Story Pins) leave `pin.videos` null and carry their media under
 * `storyPinData.pages[].blocks[]` — video pages in `videoDataV2`, image pages
 * in `images_*` fields. Without this a video Idea Pin looks like a plain image
 * and only its cover gets offered — PRD §6.2.
 */
function storyPinPages(pin: JsonRecord): StoryPinPage[] {
  const story = firstRecord(pin.storyPinData, pin.story_pin_data);
  if (!story || !Array.isArray(story.pages)) return [];

  const pages: StoryPinPage[] = [];
  story.pages.forEach((page, position) => {
    if (!isRecord(page) || !Array.isArray(page.blocks)) return;
    for (const block of page.blocks) {
      if (!isRecord(block)) continue;

      const video = blockVideoCandidates(block);
      if (video.candidates.length > 0) {
        pages.push({
          index: position + 1,
          kind: "video",
          candidates: video.candidates,
          thumbnail: video.thumbnail,
        });
        return;
      }

      const images = blockImageCandidates(block);
      if (images.length > 0) {
        pages.push({ index: position + 1, kind: "image", candidates: images });
        return;
      }
    }
  });
  return pages;
}

function imageFieldEntry(key: string, value: unknown): PinImageEntry | null {
  if (!isRecord(value)) return null;
  if (
    key === "images" ||
    /^(?:images?|imageSpec)_(?:orig|original|originals|\d+x?|\d+x\d+)$/i.test(key)
  ) {
    return value as PinImageEntry;
  }
  return null;
}

function pinEntityScore(entity: JsonRecord, pinId?: string): number {
  let score = 0;
  if (pinId && String(entity.entityId ?? "") === pinId) score += 1_000;
  if (pinId && typeof entity.seoUrl === "string" && entity.seoUrl.includes(`--${pinId}/`)) {
    score += 900;
  }
  if (isRecord(entity.videos)) score += 40;
  if (firstRecord(entity.storyPinData, entity.story_pin_data)) score += 40;
  if (isRecord(entity.embed) && entity.embed.type === "gif") score += 35;
  if (
    Object.entries(entity).some(([key, value]) => {
      if (key === "images" && isRecord(value)) return true;
      return imageFieldEntry(key, value) !== null;
    })
  ) {
    score += 20;
  }
  if (entity.__typename === "Pin") score += 5;
  if ([entity.title, entity.gridTitle, entity.grid_title, entity.seoTitle].some(
    (value) => typeof value === "string" && value.trim().length > 0,
  )) {
    score += 5;
  }
  return score;
}

/** Finds the best matching Pin record without executing embedded page scripts. */
function extractPinEntity(sources: unknown[], pinId?: string): JsonRecord | null {
  const seen = new WeakSet<object>();
  let best: JsonRecord | null = null;
  let bestScore = 0;
  let visited = 0;

  const visit = (value: unknown, depth: number) => {
    if ((!isRecord(value) && !Array.isArray(value)) || depth > 24 || visited >= 50_000) return;
    if (seen.has(value)) return;
    seen.add(value);
    visited += 1;

    if (isRecord(value)) {
      const score = pinEntityScore(value, pinId);
      if (score > bestScore) {
        best = value;
        bestScore = score;
      }
      for (const child of Object.values(value)) visit(child, depth + 1);
      return;
    }
    for (const child of value) visit(child, depth + 1);
  };

  for (const source of sources) visit(source, 0);
  return best;
}

function metaContent(html: string, property: string): string | undefined {
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']*)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+property=["']${property}["']`, "i"),
    new RegExp(`<meta[^>]+name=["']${property}["'][^>]+content=["']([^"']*)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+name=["']${property}["']`, "i"),
  ];
  for (const pattern of patterns) {
    const match = pattern.exec(html);
    if (match?.[1]) return match[1];
  }
  return undefined;
}

function extractEmbeddedJson(html: string): unknown | null {
  const match = /<script[^>]+id=["']__PWS_DATA__["'][^>]*>([\s\S]*?)<\/script>/i.exec(html);
  if (!match?.[1]) return null;
  try {
    return JSON.parse(match[1]);
  } catch {
    return null;
  }
}

function extractRelayJson(html: string): unknown[] {
  const payloads: unknown[] = [];
  const scriptPattern =
    /<script\b(?=[^>]*\bdata-relay-completed-request=["']true["'])[^>]*>([\s\S]*?)<\/script>/gi;

  for (const match of html.matchAll(scriptPattern)) {
    const wrapper = match[1].trim();
    const payloadMatch =
      /^window\.__PWS_RELAY_REGISTER_COMPLETED_REQUEST__\("[^"]*",\s*([\s\S]+)\);\s*$/.exec(
        wrapper,
      );
    if (!payloadMatch?.[1]) continue;
    try {
      payloads.push(JSON.parse(payloadMatch[1]));
    } catch {
      // A malformed relay payload must not prevent the documented fallbacks.
    }
  }
  return payloads;
}

function extractImageXlargeUrl(html: string): string | undefined {
  const match = /["']image_xlarge_url["']\s*:\s*["'](https?:\\?\/\\?\/[^"']+)["']/i.exec(html);
  if (!match?.[1]) return undefined;
  return match[1].replace(/\\\//g, "/");
}

function firstNonEmptyString(...values: unknown[]): string | undefined {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return undefined;
}

export function parseMediaFromHtml(html: string, pinId?: string): ParsedMedia {
  const images: MediaCandidate[] = [];
  const videos: MediaCandidate[] = [];
  let storyPages: StoryPinPage[] = [];
  let title: string | undefined;
  let description: string | undefined;

  const data = extractEmbeddedJson(html);
  const sources = data ? [data, ...extractRelayJson(html)] : extractRelayJson(html);
  const pin = extractPinEntity(sources, pinId);

  if (pin) {
    const pinImages = isRecord(pin.images) ? pin.images : null;
    if (pinImages) {
      for (const entry of Object.values(pinImages)) {
        const candidate = toImageCandidate(entry as PinImageEntry);
        if (candidate) images.push(candidate);
      }
    }

    for (const [key, value] of Object.entries(pin)) {
      const entry = imageFieldEntry(key, value);
      if (!entry || key === "images") continue;
      const candidate = toImageCandidate(entry);
      if (candidate) images.push(candidate);
    }

    const embed = isRecord(pin.embed) ? pin.embed : null;
    if (embed?.type === "gif" && typeof embed.src === "string") {
      const candidate = toImageCandidate({ url: embed.src });
      if (candidate) images.push(candidate);
    }

    const videoContainer = isRecord(pin.videos) ? pin.videos : null;
    const videoList = videoContainer && (
      isRecord(videoContainer.videoList)
        ? videoContainer.videoList
        : isRecord(videoContainer.video_list)
          ? videoContainer.video_list
          : null
    );
    if (videoList) {
      for (const [quality, entry] of Object.entries(videoList)) {
        const candidate = toVideoCandidate(entry as PinVideoEntry, quality);
        if (candidate) videos.push(candidate);
      }
    }
    if (videoContainer && Array.isArray(videoContainer.videoUrls)) {
      for (const url of videoContainer.videoUrls) {
        if (typeof url !== "string") continue;
        const candidate = toVideoCandidate(
          { url },
          /\/(1080|720|480|360)p\//i.exec(url)?.[1]?.concat("P"),
        );
        if (candidate) videos.push(candidate);
      }
    }
    storyPages = storyPinPages(pin);
    // A single-page Story Pin *is* its video. Multi-page ones are slideshows
    // of independent slides, so the Pin keeps its cover and the slides are
    // reported separately via `storyPages`.
    if (videos.length === 0 && storyPages.length === 1 && storyPages[0].kind === "video") {
      videos.push(...storyPages[0].candidates);
    }

    title = firstNonEmptyString(pin.title, pin.gridTitle, pin.grid_title, pin.seoTitle);
    description = firstNonEmptyString(
      pin.closeupUnifiedDescription,
      pin.closeup_unified_description,
      pin.gridDescription,
      pin.grid_description,
      pin.description,
    )?.slice(0, 500);
  }

  // Open Graph fallback / complement.
  if (images.length === 0) {
    const ogImage =
      metaContent(html, "og:image") ??
      metaContent(html, "image_xlarge_url") ??
      extractImageXlargeUrl(html);
    if (ogImage?.startsWith("https://")) {
      images.push({ url: ogImage, kind: "image", format: extFromUrl(ogImage) });
    }
  }
  if (videos.length === 0) {
    const ogVideo = metaContent(html, "og:video") ?? metaContent(html, "og:video:url");
    if (ogVideo?.startsWith("https://")) {
      const candidate = toVideoCandidate({ url: ogVideo });
      if (candidate) videos.push(candidate);
    }
  }
  title ??= metaContent(html, "og:title");
  description ??= metaContent(html, "og:description")?.slice(0, 500);

  const sortedImages = dedupeAndSort(images);
  const sortedVideos = dedupeAndSort(videos);

  let kind: MediaKind = "image";
  if (sortedVideos.length > 0) {
    kind = "video";
  } else if (sortedImages.some((candidate) => candidate.format === "gif")) {
    kind = "gif";
  }

  return { kind, title, description, images: sortedImages, videos: sortedVideos, storyPages };
}

/** Picks a small image candidate for the on-page preview (not for download). */
export function pickPreviewCandidate(images: MediaCandidate[]): MediaCandidate | undefined {
  if (images.length === 0) return undefined;
  const sorted = [...images].sort(
    (a, b) => (a.width ?? 0) * (a.height ?? 0) - (b.width ?? 0) * (b.height ?? 0),
  );
  // Prefer something around 236–474px wide when dimensions are known.
  const withWidth = sorted.filter((c) => c.width !== undefined);
  const preferred = withWidth.find((c) => (c.width ?? 0) >= 236) ?? withWidth[0];
  return preferred ?? sorted[0];
}
