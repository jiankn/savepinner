import type { MetadataRoute } from "next";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://savepinner.com").replace(/\/+$/, "");

/**
 * PRD §9.1: sitemap contains only indexable, self-canonical, 200-status pages.
 * Result states, API routes and token URLs are never listed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/how-to-use/", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/privacy/", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms/", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/copyright/", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/contact/", priority: 0.4, changeFrequency: "yearly" as const },
  ];
  return pages.map((page) => ({
    url: `${siteUrl}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
