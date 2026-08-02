import type { Metadata } from "next";
import { config } from "@/lib/config";
import { HREFLANG, PREFIXED_LOCALES, type Locale } from "@/lib/i18n";
import { LOCALE_PATHS, type LocalePageKey } from "@/lib/locale-content";
import { TOOL_PAGES, type PageKey, type ToolPageContent } from "@/lib/page-content";
import {
  TRUST_LOCALES,
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
  fr: "fr_FR",
  de: "de_DE",
  it: "it_IT",
  nl: "nl_NL",
  ja: "ja_JP",
  tr: "tr_TR",
  pl: "pl_PL",
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
  const languages: Record<string, string> = {
    [HREFLANG.en]: englishPath,
  };
  for (const locale of PREFIXED_LOCALES) {
    languages[HREFLANG[locale]] = LOCALE_PATHS[locale][key];
  }
  // x-default points at the English version: it is the fallback for
  // visitors whose language we do not publish.
  languages["x-default"] = englishPath;
  return languages;
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
  const languages: Record<string, string> = {};
  for (const locale of TRUST_LOCALES) {
    languages[HREFLANG[locale]] = TRUST_PATHS[locale][key];
  }
  languages["x-default"] = TRUST_PATHS.en[key];
  return languages;
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
  const organizationId = `${config.siteUrl}/#organization`;
  const websiteId = `${config.siteUrl}/#website`;
  const siteEntities =
    page.slug === "home" && page.locale === "en"
      ? [
          {
            "@type": "Organization",
            "@id": organizationId,
            name: "SavePinner",
            url: config.siteUrl,
            logo: {
              "@type": "ImageObject",
              url: `${config.siteUrl}/icon.png`,
            },
          },
          {
            "@type": "WebSite",
            "@id": websiteId,
            name: "SavePinner",
            url: config.siteUrl,
            inLanguage: "en",
            publisher: { "@id": organizationId },
          },
        ]
      : [];

  return {
    "@context": "https://schema.org",
    "@graph": [
      ...siteEntities,
      {
        "@type": "WebApplication",
        "@id": `${config.siteUrl}${page.path}#webapplication`,
        name: "SavePinner",
        description: page.metaDescription,
        url: `${config.siteUrl}${page.path}`,
        applicationCategory: "Multimedia",
        operatingSystem: "All",
        inLanguage: HREFLANG[page.locale],
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        ...(page.locale === "en" ? { provider: { "@id": organizationId } } : {}),
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
