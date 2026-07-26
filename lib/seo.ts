import type { Metadata } from "next";
import { config } from "@/lib/config";
import { HREFLANG, type Locale } from "@/lib/i18n";
import { LOCALE_PATHS, type LocalePageKey } from "@/lib/locale-content";
import { TOOL_PAGES, type PageKey, type ToolPageContent } from "@/lib/page-content";

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
    },
    twitter: {
      card: "summary",
      title: page.seoTitle,
      description: page.metaDescription,
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
