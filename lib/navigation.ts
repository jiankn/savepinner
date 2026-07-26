/**
 * Locale-aware link sets for the header, footer and language switcher.
 * Kept separate from lib/i18n.ts so the dictionaries stay dependency-free.
 */

import { LOCALE_LABELS, type Locale, type UiMessages } from "@/lib/i18n";
import { LOCALE_PATHS, type LocalePageKey } from "@/lib/locale-content";
import { TOOL_PAGES } from "@/lib/page-content";

export interface NavItem {
  href: string;
  label: string;
}

/**
 * English carries the full tool matrix. Locales expose only the pages that
 * exist in that language — an English link inside a Spanish nav is a worse
 * experience than a shorter nav.
 */
export function navItems(locale: Locale, t: UiMessages): NavItem[] {
  if (locale === "en") {
    return [
      { href: TOOL_PAGES.home.path, label: t.nav.home },
      { href: TOOL_PAGES.video.path, label: t.nav.video },
      { href: TOOL_PAGES.gif.path, label: t.nav.gif },
    ];
  }
  return [
    { href: LOCALE_PATHS[locale].home, label: t.nav.home },
    { href: LOCALE_PATHS[locale].video, label: t.nav.video },
  ];
}

export function homePath(locale: Locale): string {
  return locale === "en" ? "/" : LOCALE_PATHS[locale].home;
}

export function toolLinks(locale: Locale, t: UiMessages): NavItem[] {
  if (locale === "en") {
    return [
      { href: TOOL_PAGES.video.path, label: t.nav.video },
      { href: TOOL_PAGES.gif.path, label: t.nav.gif },
      { href: TOOL_PAGES.story.path, label: t.nav.story },
    ];
  }
  return [
    { href: LOCALE_PATHS[locale].home, label: t.nav.home },
    { href: LOCALE_PATHS[locale].video, label: t.nav.video },
  ];
}

/** Legal pages are English-only; they are linked from every locale footer. */
export function legalLinks(t: UiMessages): NavItem[] {
  return [
    { href: "/privacy/", label: t.footer.privacy },
    { href: "/terms/", label: t.footer.terms },
    { href: "/dmca/", label: t.footer.dmca },
    { href: "/contact/", label: t.footer.contact },
  ];
}

export interface LanguageLink {
  locale: Locale;
  href: string;
  label: string;
  current: boolean;
}

/**
 * Switcher targets stay on the same page type, so a visitor reading the
 * Spanish video page lands on the Indonesian video page, not its home.
 */
export function languageLinks(locale: Locale, pageKey: LocalePageKey | "other"): LanguageLink[] {
  const key: LocalePageKey = pageKey === "other" ? "home" : pageKey;
  return [
    { locale: "en" as const, href: TOOL_PAGES[key].path },
    { locale: "es" as const, href: LOCALE_PATHS.es[key] },
    { locale: "id" as const, href: LOCALE_PATHS.id[key] },
    { locale: "pt" as const, href: LOCALE_PATHS.pt[key] },
  ].map((entry) => ({
    ...entry,
    label: LOCALE_LABELS[entry.locale],
    current: entry.locale === locale,
  }));
}
