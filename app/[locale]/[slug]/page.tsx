import { notFound } from "next/navigation";
import ToolLandingPage from "@/components/ToolLandingPage";
import { PREFIXED_LOCALES } from "@/lib/i18n";
import { LOCALE_PAGES, LOCALE_VIDEO_SLUGS, type PrefixedLocale } from "@/lib/locale-content";
import { getLocalePageSeo } from "@/lib/seo";

export const dynamicParams = false;

/**
 * Slugs are localized (/es/descargar-videos-de-pinterest/,
 * /id/pinterest-video-download/), so the valid pairs are enumerated rather
 * than derived from a shared English slug.
 */
export function generateStaticParams() {
  return PREFIXED_LOCALES.map((locale) => ({ locale, slug: LOCALE_VIDEO_SLUGS[locale] }));
}

function pageFor(locale: string, slug: string) {
  if (!(locale in LOCALE_VIDEO_SLUGS)) return undefined;
  const typed = locale as PrefixedLocale;
  return LOCALE_VIDEO_SLUGS[typed] === slug ? LOCALE_PAGES[typed].video : undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const page = pageFor(locale, slug);
  if (!page) notFound();
  return getLocalePageSeo(page);
}

export default async function LocaleToolPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const page = pageFor(locale, slug);
  if (!page) notFound();
  return <ToolLandingPage content={page} />;
}
