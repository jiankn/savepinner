import { notFound } from "next/navigation";
import ToolLandingPage from "@/components/ToolLandingPage";
import TrustContentPage from "@/components/TrustContentPage";
import { LOCALE_PAGES, LOCALE_VIDEO_SLUGS, type PrefixedLocale } from "@/lib/locale-content";
import { getLocalePageSeo, getTrustPageSeo } from "@/lib/seo";
import {
  TRUST_PAGES,
  TRUST_PATHS,
  type TrustPageKey,
} from "@/lib/trust-content";

export const dynamicParams = false;

/**
 * Build each locale's video and trust slugs under the locale-aware root
 * layout. Keeping them in this segment lets the server emit the correct
 * document-level html[lang] without request-time pathname inspection.
 */
export function generateStaticParams({
  params: { locale },
}: {
  params: { locale: string };
}) {
  if (!(locale in LOCALE_VIDEO_SLUGS)) return [];
  const typedLocale = locale as PrefixedLocale;
  return [
    { slug: LOCALE_VIDEO_SLUGS[typedLocale] },
    ...(["about", "privacy"] as const).map((key) => ({
      slug: slugFromPath(TRUST_PATHS[typedLocale][key]),
    })),
  ];
}

function slugFromPath(path: string) {
  return path.split("/").filter(Boolean).at(-1) ?? "";
}

function routeFor(locale: string, slug: string) {
  if (!(locale in LOCALE_VIDEO_SLUGS)) return undefined;
  const typed = locale as PrefixedLocale;

  if (LOCALE_VIDEO_SLUGS[typed] === slug) {
    return { kind: "tool" as const, content: LOCALE_PAGES[typed].video };
  }

  const trustKey = (["about", "privacy"] as const).find(
    (key) => slugFromPath(TRUST_PATHS[typed][key]) === slug,
  );
  if (!trustKey) return undefined;

  return {
    kind: "trust" as const,
    content: TRUST_PAGES[typed][trustKey as TrustPageKey],
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const route = routeFor(locale, slug);
  if (!route) notFound();
  return route.kind === "tool"
    ? getLocalePageSeo(route.content)
    : getTrustPageSeo(route.content);
}

export default async function LocaleToolPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const route = routeFor(locale, slug);
  if (!route) notFound();
  return route.kind === "tool" ? (
    <ToolLandingPage content={route.content} />
  ) : (
    <TrustContentPage content={route.content} />
  );
}
