import type { Metadata } from "next";
import { config } from "@/lib/config";
import { TOOL_PAGES, type ToolPageContent } from "@/lib/page-content";

export function getPageSeo(
  slug: ToolPageContent["slug"],
  locale = "en",
): Metadata {
  const page = TOOL_PAGES[slug];
  return {
    title: { absolute: page.seoTitle },
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: {
      canonical: page.path,
      languages: { en: page.path, "x-default": page.path },
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : locale,
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
        description: "Free Pinterest image and video downloader. No login, no watermark.",
        url: `${config.siteUrl}${page.path}`,
        applicationCategory: "Multimedia",
        operatingSystem: "All",
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}
