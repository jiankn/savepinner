import type { MetadataRoute } from "next";
import { HREFLANG } from "@/lib/i18n";
import { LOCALE_PATHS } from "@/lib/locale-content";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://savepinner.com").replace(/\/+$/, "");

/**
 * PRD §9.1: sitemap contains only indexable, self-canonical, 200-status pages.
 * Result states, API routes and token URLs are never listed.
 *
 * Home and video exist in four languages, so those entries also carry the
 * hreflang cluster (Google reads alternates from the sitemap as well as from
 * the page head).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastMeaningfulUpdate = "2026-07-27";

  const localizedClusters = [
    { key: "home" as const, englishPath: "/", priority: 1.0 },
    { key: "video" as const, englishPath: "/pinterest-video-downloader/", priority: 0.9 },
  ];

  const localizedEntries = localizedClusters.flatMap((cluster) => {
    const languages: Record<string, string> = {
      [HREFLANG.en]: `${siteUrl}${cluster.englishPath}`,
      [HREFLANG.es]: `${siteUrl}${LOCALE_PATHS.es[cluster.key]}`,
      [HREFLANG.id]: `${siteUrl}${LOCALE_PATHS.id[cluster.key]}`,
      [HREFLANG.pt]: `${siteUrl}${LOCALE_PATHS.pt[cluster.key]}`,
    };
    const paths = [
      cluster.englishPath,
      LOCALE_PATHS.es[cluster.key],
      LOCALE_PATHS.id[cluster.key],
      LOCALE_PATHS.pt[cluster.key],
    ];
    return paths.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: lastMeaningfulUpdate,
      changeFrequency: "weekly" as const,
      priority: cluster.priority,
      alternates: { languages },
    }));
  });

  const englishOnly = [
    { path: "/pinterest-gif-downloader/", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/pinterest-story-downloader/", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/pinterest-downloader-iphone/", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/pinterest-downloader-android/", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/privacy/", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms/", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/dmca/", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/contact/", priority: 0.4, changeFrequency: "yearly" as const },
  ].map((page) => ({
    url: `${siteUrl}${page.path}`,
    lastModified: lastMeaningfulUpdate,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  return [...localizedEntries, ...englishOnly];
}
