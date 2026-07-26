import { config } from "@/lib/config";
import { ApiError } from "@/lib/errors";
import type { ResolvedMedia, ResolvedVariant } from "@/lib/api-types";
import { fetchPinHtml } from "@/lib/pinterest/fetch-pin";
import {
  parseMediaFromHtml,
  pickPreviewCandidate,
  type MediaCandidate,
} from "@/lib/pinterest/parse-media";
import { resolveShortUrl } from "@/lib/pinterest/resolve-short-url";
import { isAllowedMediaHost, validateInputUrl } from "@/lib/pinterest/validate-url";
import { verifyCandidates } from "@/lib/pinterest/verify-variant";

const IMAGE_RENDITIONS = [
  { quality: "Original", segment: "originals", width: undefined },
  { quality: "736x", segment: "736x", width: 736 },
  { quality: "564x", segment: "564x", width: 564 },
  { quality: "Thumbnail (236x)", segment: "236x", width: 236 },
] as const;

function isDownloadableCdnUrl(url: string): boolean {
  try {
    return isAllowedMediaHost(new URL(url).hostname);
  } catch {
    return false;
  }
}

function extensionFromUrl(url: string, fallback: string): string {
  const match = /\.([a-z0-9]+)$/i.exec(new URL(url).pathname);
  return (match?.[1] ?? fallback ?? "jpg").toLowerCase();
}

/** Builds the four image CDN renditions required by the PRD. */
export function buildImageRenditions(source: MediaCandidate): Array<MediaCandidate & { quality: string }> {
  const parsed = new URL(source.url);
  const hasSizeSegment = /\/(?:originals|236x|474x|564x|736x)\//.test(parsed.pathname);

  if (!hasSizeSegment) {
    return [{ ...source, quality: source.width ? `${source.width}x` : "Original" }];
  }

  return IMAGE_RENDITIONS.map((rendition) => {
    const target = new URL(parsed);
    target.pathname = target.pathname.replace(
      /\/(?:originals|236x|474x|564x|736x)\//,
      `/${rendition.segment}/`,
    );
    return {
      ...source,
      url: target.toString(),
      width: rendition.width ?? source.width,
      quality: rendition.quality,
    };
  });
}

function videoQuality(candidate: MediaCandidate): string {
  const hinted = candidate.qualityHint?.match(/(1080|720|480|360)P/i)?.[1];
  if (hinted) return `${hinted}P`;

  if (candidate.width && candidate.height) {
    const shortSide = Math.min(candidate.width, candidate.height);
    if (shortSide >= 1080) return "1080P";
    if (shortSide >= 720) return "720P";
    if (shortSide >= 480) return "480P";
    if (shortSide >= 360) return "360P";
  }
  return "Video";
}

function dedupeVariants(variants: ResolvedVariant[]): ResolvedVariant[] {
  const seen = new Set<string>();
  return variants.filter((variant) => {
    if (seen.has(variant.url)) return false;
    seen.add(variant.url);
    return true;
  });
}

/**
 * Resolves one public Pinterest Pin into directly downloadable CDN variants.
 * This is the single parser entry point used by the whole site.
 */
export async function resolvePin(url: string): Promise<ResolvedMedia> {
  const input = validateInputUrl(url);
  const pin = input.kind === "short" ? await resolveShortUrl(input.url) : input;
  const html = await fetchPinHtml(pin.url);
  const media = parseMediaFromHtml(html, pin.pinId);

  if (media.kind === "video" && !config.videoEnabled) {
    throw new ApiError("UNSUPPORTED_MEDIA", "video parsing disabled");
  }
  if (media.kind === "gif" && !config.gifEnabled) {
    throw new ApiError("UNSUPPORTED_MEDIA", "gif parsing disabled");
  }

  if (media.kind === "video") {
    const verified = (await verifyCandidates(media.videos.slice(0, 12), {
      family: "video",
      maxBytes: config.maxVideoBytes,
    })).filter((variant) => isDownloadableCdnUrl(variant.url));
    if (verified.length === 0) {
      throw new ApiError("MEDIA_NOT_FOUND", "no downloadable video found");
    }

    return {
      type: "video",
      title: media.title ?? "Pinterest video",
      thumbnail: pickPreviewCandidate(media.images)?.url ?? media.images[0]?.url ?? "",
      variants: dedupeVariants(
        verified.map((variant) => ({
          quality: videoQuality(variant),
          url: variant.url,
          ext: extensionFromUrl(variant.url, variant.format || "mp4"),
          width: variant.width,
          height: variant.height,
        })),
      ),
    };
  }

  const source =
    (media.kind === "gif"
      ? media.images.find((candidate) => candidate.format === "gif")
      : media.images.find((candidate) => candidate.url.includes("/originals/"))) ??
    media.images[0];
  if (!source) throw new ApiError("MEDIA_NOT_FOUND", "no downloadable image found");

  const candidates = media.kind === "gif" ? [{ ...source, quality: "Original" }] : buildImageRenditions(source);
  const qualityByUrl = new Map(candidates.map((candidate) => [candidate.url, candidate.quality]));
  const verified = (await verifyCandidates(candidates, {
    family: "image",
    maxBytes: config.maxImageBytes,
  })).filter((variant) => isDownloadableCdnUrl(variant.url));
  if (verified.length === 0) {
    throw new ApiError("MEDIA_NOT_FOUND", "no downloadable image rendition found");
  }

  const variants = dedupeVariants(
    verified.map((variant) => ({
      quality: qualityByUrl.get(variant.url) ?? "Original",
      url: variant.url,
      ext: extensionFromUrl(variant.url, variant.format),
      width: variant.width,
      height: variant.height,
    })),
  );

  return {
    type: media.kind,
    title: media.title ?? (media.kind === "gif" ? "Pinterest GIF" : "Pinterest image"),
    thumbnail:
      variants.find((variant) => variant.quality.includes("236x"))?.url ?? variants[0].url,
    variants,
  };
}
