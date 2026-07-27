import type { Metadata } from "next";
import { config } from "@/lib/config";
import { HREFLANG, type Locale } from "@/lib/i18n";
import { LOCALE_PATHS, type LocalePageKey } from "@/lib/locale-content";
import { TOOL_PAGES, type PageKey, type ToolPageContent } from "@/lib/page-content";
import {
  TRUST_PATHS,
  type TrustPageContent,
  type TrustPageKey,
} from "@/lib/trust-content";

/**
 * Social card, shared by every page and both networks.
 *
 * This is declared explicitly rather than via the app/opengraph-image file
 * convention: metadata from nested segments is shallow-merged, so a child
 * page's `openGraph` object replaces the root's entirely — file-convention
 * images survived on `/` but silently vanished on every other route.
 *
 * It is served from public/ (not a generated route) because `trailingSlash`
 * 308-redirects extensionless paths, and some social crawlers will not follow
 * a redirect to fetch a card. Regenerate it with scripts/og-image.tsx.
 */
export const OG_CARD = {
  url: "/og-card.png",
  width: 1200,
  height: 630,
  alt: "SavePinner — download Pinterest images, videos and GIFs in HD",
} as const;

const OG_LOCALES: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
  id: "id_ID",
  pt: "pt_BR",
};

/**
 * hreflang cluster for a page. Only home and video exist in every locale;
 * gif/story are English-only for now, so they self-reference instead of
 * pointing at pages that do not exist yet (a common hreflang error).
 */
function alternateLanguages(page: ToolPageContent): Record<string, string> {
  if (page.slug !== "home" && page.slug !== "video") {
    return { [HREFLANG.en]: page.path, "x-default": page.path };
  }
  const key: LocalePageKey = page.slug;
  const englishPath = TOOL_PAGES[key].path;
  return {
    [HREFLANG.en]: englishPath,
    [HREFLANG.es]: LOCALE_PATHS.es[key],
    [HREFLANG.id]: LOCALE_PATHS.id[key],
    [HREFLANG.pt]: LOCALE_PATHS.pt[key],
    // x-default points at the English version: it is the fallback for
    // visitors whose language we do not publish.
    "x-default": englishPath,
  };
}

export function getPageSeo(slug: PageKey, locale: Locale = "en"): Metadata {
  const page = locale === "en" ? TOOL_PAGES[slug] : undefined;
  if (!page) throw new Error(`getPageSeo: use getLocalePageSeo for locale "${locale}"`);
  return buildMetadata(page);
}

export function getLocalePageSeo(page: ToolPageContent): Metadata {
  return buildMetadata(page);
}

function trustAlternateLanguages(key: TrustPageKey): Record<string, string> {
  return {
    [HREFLANG.en]: TRUST_PATHS.en[key],
    [HREFLANG.es]: TRUST_PATHS.es[key],
    [HREFLANG.id]: TRUST_PATHS.id[key],
    [HREFLANG.pt]: TRUST_PATHS.pt[key],
    "x-default": TRUST_PATHS.en[key],
  };
}

export function getTrustPageSeo(page: TrustPageContent): Metadata {
  return {
    title: { absolute: page.seoTitle },
    description: page.metaDescription,
    alternates: {
      canonical: page.path,
      languages: trustAlternateLanguages(page.key),
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALES[page.locale],
      siteName: "SavePinner",
      title: page.seoTitle,
      description: page.metaDescription,
      url: page.path,
      images: [OG_CARD],
    },
    twitter: {
      card: "summary_large_image",
      title: page.seoTitle,
      description: page.metaDescription,
      images: [OG_CARD],
    },
  };
}

function buildMetadata(page: ToolPageContent): Metadata {
  return {
    title: { absolute: page.seoTitle },
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: {
      canonical: page.path,
      languages: alternateLanguages(page),
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALES[page.locale],
      siteName: "SavePinner",
      title: page.seoTitle,
      description: page.metaDescription,
      url: page.path,
      images: [OG_CARD],
    },
    twitter: {
      // The card is 1200x630, so it needs the large-image layout;
      // "summary" would crop it to a small square.
      card: "summary_large_image",
      title: page.seoTitle,
      description: page.metaDescription,
      images: [OG_CARD],
    },
  };
}

export function getPageJsonLd(page: ToolPageContent) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "SavePinner",
        description: page.metaDescription,
        url: `${config.siteUrl}${page.path}`,
        applicationCategory: "Multimedia",
        operatingSystem: "All",
        inLanguage: HREFLANG[page.locale],
      },
      {
        "@type": "FAQPage",
        inLanguage: HREFLANG[page.locale],
        mainEntity: page.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}
