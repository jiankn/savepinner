import type { MetadataRoute } from "next";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://savepinner.com").replace(/\/+$/, "");

/**
 * PRD §9.1: sitemap contains only indexable, self-canonical, 200-status pages.
 * Result states, API routes and token URLs are never listed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastMeaningfulUpdate = "2026-07-26";
  const pages = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/pinterest-video-downloader/", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/pinterest-gif-downloader/", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/pinterest-story-downloader/", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/privacy/", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms/", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/dmca/", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/contact/", priority: 0.4, changeFrequency: "yearly" as const },
  ];
  return pages.map((page) => ({
    url: `${siteUrl}${page.path}`,
    lastModified: lastMeaningfulUpdate,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
