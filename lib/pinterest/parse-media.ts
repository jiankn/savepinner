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
}

export interface ParsedMedia {
  kind: MediaKind;
  title?: string;
  description?: string;
  images: MediaCandidate[];
  videos: MediaCandidate[];
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

function toVideoCandidate(entry: PinVideoEntry): MediaCandidate | null {
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
  };
}

/** Finds the pin entity inside the __PWS_DATA__ JSON structure. */
function extractPinEntity(data: unknown): Record<string, unknown> | null {
  if (typeof data !== "object" || data === null) return null;
  const state = (data as Record<string, unknown>).props as Record<string, unknown> | undefined;
  const redux = (state?.initialReduxState ?? state) as Record<string, unknown> | undefined;
  const pins = redux?.pins as Record<string, unknown> | undefined;
  if (pins && typeof pins === "object") {
    const first = Object.values(pins)[0];
    if (first && typeof first === "object") return first as Record<string, unknown>;
  }
  return null;
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

export function parseMediaFromHtml(html: string): ParsedMedia {
  const images: MediaCandidate[] = [];
  const videos: MediaCandidate[] = [];
  let title: string | undefined;
  let description: string | undefined;

  const data = extractEmbeddedJson(html);
  const pin = data ? extractPinEntity(data) : null;

  if (pin) {
    const pinImages = pin.images as Record<string, PinImageEntry> | undefined;
    if (pinImages && typeof pinImages === "object") {
      for (const entry of Object.values(pinImages)) {
        const candidate = toImageCandidate(entry);
        if (candidate) images.push(candidate);
      }
    }
    const pinVideos = (pin.videos as Record<string, unknown> | undefined)?.video_list as
      | Record<string, PinVideoEntry>
      | undefined;
    if (pinVideos && typeof pinVideos === "object") {
      for (const entry of Object.values(pinVideos)) {
        const candidate = toVideoCandidate(entry);
        if (candidate) videos.push(candidate);
      }
    }
    if (typeof pin.title === "string" && pin.title.trim()) title = pin.title.trim();
    else if (typeof pin.grid_title === "string" && pin.grid_title.trim()) title = pin.grid_title.trim();
    const desc = pin.closeup_unified_description ?? pin.description;
    if (typeof desc === "string" && desc.trim()) description = desc.trim().slice(0, 500);
  }

  // Open Graph fallback / complement.
  if (images.length === 0) {
    const ogImage = metaContent(html, "og:image");
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
  } else {
    const largest = sortedImages[0];
    if (largest && largest.format === "gif") kind = "gif";
  }

  return { kind, title, description, images: sortedImages, videos: sortedVideos };
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
