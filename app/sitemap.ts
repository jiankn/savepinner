import type { MetadataRoute } from "next";
import { PINTEREST_DOWNLOADER_HUB } from "@/lib/hub-content";
import { HREFLANG, PREFIXED_LOCALES } from "@/lib/i18n";
import { LOCALE_PAGES, LOCALE_PATHS } from "@/lib/locale-content";
import { TOOL_PAGES } from "@/lib/page-content";
import {
  TRUST_LOCALES,
  TRUST_PAGES,
  TRUST_PATHS,
  type TrustPageKey,
} from "@/lib/trust-content";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://savepinner.com").replace(/\/+$/, "");

/**
 * PRD §9.1: sitemap contains only indexable, self-canonical, 200-status pages.
 * Result states, API routes and token URLs are never listed.
 *
 * Home and video exist in every published language, so those entries carry the
 * hreflang cluster (Google reads alternates from the sitemap as well as from
 * the page head).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const localizedClusters = [
    { key: "home" as const, englishPath: "/", priority: 1.0 },
    { key: "video" as const, englishPath: "/pinterest-video-downloader/", priority: 0.9 },
  ];

  const localizedEntries = localizedClusters.flatMap((cluster) => {
    const languages: Record<string, string> = {
      [HREFLANG.en]: `${siteUrl}${cluster.englishPath}`,
    };
    for (const locale of PREFIXED_LOCALES) {
      languages[HREFLANG[locale]] = `${siteUrl}${LOCALE_PATHS[locale][cluster.key]}`;
    }
    languages["x-default"] = `${siteUrl}${cluster.englishPath}`;
    const pages = [
      TOOL_PAGES[cluster.key],
      ...PREFIXED_LOCALES.map((locale) => LOCALE_PAGES[locale][cluster.key]),
    ];
    return pages.map((page) => ({
      url: `${siteUrl}${page.path}`,
      lastModified: page.lastModified,
      changeFrequency: "weekly" as const,
      priority: cluster.priority,
      alternates: { languages },
    }));
  });

  const trustClusters: Array<{
    key: TrustPageKey;
    priority: number;
  }> = [
    { key: "about", priority: 0.4 },
    { key: "privacy", priority: 0.3 },
  ];

  const trustEntries = trustClusters.flatMap((cluster) => {
    const languages: Record<string, string> = {};
    for (const locale of TRUST_LOCALES) {
      languages[HREFLANG[locale]] = `${siteUrl}${TRUST_PATHS[locale][cluster.key]}`;
    }
    languages["x-default"] = `${siteUrl}${TRUST_PATHS.en[cluster.key]}`;

    return Object.values(TRUST_PAGES).map((pages) => ({
      url: `${siteUrl}${pages[cluster.key].path}`,
      lastModified: pages[cluster.key].lastModified,
      changeFrequency: "yearly" as const,
      priority: cluster.priority,
      alternates: { languages },
    }));
  });

  const englishOnly = [
    {
      path: PINTEREST_DOWNLOADER_HUB.path,
      priority: 0.95,
      changeFrequency: "weekly" as const,
      lastModified: PINTEREST_DOWNLOADER_HUB.lastModified,
    },
    {
      path: TOOL_PAGES.gif.path,
      priority: 0.8,
      changeFrequency: "weekly" as const,
      lastModified: TOOL_PAGES.gif.lastModified,
    },
    {
      path: TOOL_PAGES.story.path,
      priority: 0.8,
      changeFrequency: "weekly" as const,
      lastModified: TOOL_PAGES.story.lastModified,
    },
    {
      path: TOOL_PAGES.iphone.path,
      priority: 0.7,
      changeFrequency: "monthly" as const,
      lastModified: TOOL_PAGES.iphone.lastModified,
    },
    {
      path: TOOL_PAGES.android.path,
      priority: 0.7,
      changeFrequency: "monthly" as const,
      lastModified: TOOL_PAGES.android.lastModified,
    },
    { path: "/terms/", priority: 0.3, changeFrequency: "yearly" as const, lastModified: "2026-07-27" },
    { path: "/dmca/", priority: 0.3, changeFrequency: "yearly" as const, lastModified: "2026-07-27" },
    { path: "/contact/", priority: 0.4, changeFrequency: "yearly" as const, lastModified: "2026-07-27" },
  ].map((page) => ({
    url: `${siteUrl}${page.path}`,
    lastModified: page.lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  return [...localizedEntries, ...trustEntries, ...englishOnly];
}
