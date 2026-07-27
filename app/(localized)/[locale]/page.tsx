import { notFound } from "next/navigation";
import ToolLandingPage from "@/components/ToolLandingPage";
import { LOCALE_PAGES, type PrefixedLocale } from "@/lib/locale-content";
import { getLocalePageSeo } from "@/lib/seo";

function pageFor(locale: string) {
  return (LOCALE_PAGES as Record<string, (typeof LOCALE_PAGES)[PrefixedLocale]>)[locale]?.home;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const page = pageFor((await params).locale);
  if (!page) notFound();
  return getLocalePageSeo(page);
}

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const page = pageFor((await params).locale);
  if (!page) notFound();
  return <ToolLandingPage content={page} />;
}
