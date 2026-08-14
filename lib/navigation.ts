/**
 * Locale-aware link sets for the header, footer and language switcher.
 * Kept separate from lib/i18n.ts so the dictionaries stay dependency-free.
 */

import { LOCALES, LOCALE_LABELS, type Locale, type UiMessages } from "@/lib/i18n";
import { PINTEREST_DOWNLOADER_HUB } from "@/lib/hub-content";
import { LOCALE_PATHS, type LocalePageKey } from "@/lib/locale-content";
import { TOOL_PAGES } from "@/lib/page-content";
import { TRUST_PATHS, type TrustLocale, type TrustPageKey } from "@/lib/trust-content";

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
      { href: PINTEREST_DOWNLOADER_HUB.path, label: "All Downloaders" },
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
      { href: PINTEREST_DOWNLOADER_HUB.path, label: "Pinterest Downloader" },
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

/**
 * Privacy and About are localized trust pages. Terms, DMCA and Contact remain
 * English until their full legal copy is translated and reviewed.
 */
export function legalLinks(locale: Locale, t: UiMessages): NavItem[] {
  return [
    { href: TRUST_PATHS[locale].about, label: t.footer.about },
    { href: TRUST_PATHS[locale].privacy, label: t.footer.privacy },
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
export type LanguagePageKey = LocalePageKey | TrustPageKey | "other";

export function languageLinks(locale: Locale, pageKey: LanguagePageKey): LanguageLink[] {
  if (pageKey === "other") {
    return [];
  }

  if (pageKey === "privacy" || pageKey === "about") {
    return (Object.keys(TRUST_PATHS) as TrustLocale[]).map((targetLocale) => ({
      locale: targetLocale,
      href: TRUST_PATHS[targetLocale][pageKey],
      label: LOCALE_LABELS[targetLocale],
      current: targetLocale === locale,
    }));
  }

  const key: LocalePageKey = pageKey;
  return LOCALES.map((targetLocale) => ({
    locale: targetLocale,
    href: targetLocale === "en" ? TOOL_PAGES[key].path : LOCALE_PATHS[targetLocale][key],
    label: LOCALE_LABELS[targetLocale],
    current: targetLocale === locale,
  }));
}
