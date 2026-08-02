import { describe, expect, it } from "vitest";
import { HREFLANG, LOCALES, MESSAGES, PREFIXED_LOCALES } from "@/lib/i18n";
import { LOCALE_PAGES, LOCALE_PATHS, LOCALE_VIDEO_SLUGS } from "@/lib/locale-content";
import { languageLinks, navItems } from "@/lib/navigation";
import { TOOL_PAGES } from "@/lib/page-content";
import { getLocalePageSeo, getPageSeo } from "@/lib/seo";
import { getTrustPageSeo } from "@/lib/seo";
import { TRUST_LOCALES, TRUST_PAGES, TRUST_PATHS } from "@/lib/trust-content";

describe("locale registry", () => {
  it("prefixes every locale except English", () => {
    expect(PREFIXED_LOCALES).toEqual(["es", "id", "pt", "fr", "de", "it", "nl", "ja", "tr", "pl"]);
  });

  it("ships a full dictionary for every locale", () => {
    for (const locale of LOCALES) {
      const t = MESSAGES[locale];
      expect(t.faqHeading.length, locale).toBeGreaterThan(0);
      expect(t.form.progress, locale).toHaveLength(3);
      expect(t.whyChoose.items, locale).toHaveLength(3);
      // Every error code the UI can receive needs a localized hint.
      for (const code of ["INVALID_URL", "RATE_LIMITED", "DAILY_CAP_REACHED", "NETWORK"]) {
        expect(t.error.hints[code], `${locale}/${code}`).toBeTruthy();
      }
      // Dictionaries cross into Client Components — they must be JSON-safe,
      // so the countdown copy uses a placeholder instead of a function.
      expect(t.result.cappedBody, locale).toContain("{eta}");
      expect(JSON.parse(JSON.stringify(t)), locale).toEqual(t);
    }
  });
});

describe("locale pages", () => {
  it("uses localized, keyword-carrying slugs", () => {
    expect(LOCALE_PATHS.es.video).toBe("/es/descargar-videos-de-pinterest/");
    expect(LOCALE_PATHS.id.video).toBe("/id/pinterest-video-download/");
    expect(LOCALE_PATHS.pt.video).toBe("/pt/baixar-video-do-pinterest/");
    expect(LOCALE_PATHS.fr.video).toBe("/fr/telecharger-video-pinterest/");
    expect(LOCALE_PATHS.de.video).toBe("/de/pinterest-video-herunterladen/");
    expect(LOCALE_PATHS.it.video).toBe("/it/scaricare-video-pinterest/");
    expect(LOCALE_PATHS.nl.video).toBe("/nl/pinterest-video-downloaden/");
    expect(LOCALE_PATHS.ja.video).toBe("/ja/pinterest-video-download/");
    expect(LOCALE_PATHS.tr.video).toBe("/tr/pinterest-video-indir/");
    expect(LOCALE_PATHS.pl.video).toBe("/pl/pobierz-film-z-pinterest/");
  });

  it("keeps route slugs in sync with the published paths", () => {
    for (const locale of PREFIXED_LOCALES) {
      expect(LOCALE_PATHS[locale].video, locale).toBe(`/${locale}/${LOCALE_VIDEO_SLUGS[locale]}/`);
      expect(LOCALE_PATHS[locale].home, locale).toBe(`/${locale}/`);
    }
  });

  it("gives every locale page its own title, description and FAQ block", () => {
    const titles = new Set<string>();
    for (const locale of PREFIXED_LOCALES) {
      for (const key of ["home", "video"] as const) {
        const page = LOCALE_PAGES[locale][key];
        expect(page.locale, `${locale}/${key}`).toBe(locale);
        expect(page.path, `${locale}/${key}`).toBe(LOCALE_PATHS[locale][key]);
        expect(page.faq.length, `${locale}/${key}`).toBeGreaterThanOrEqual(6);
        expect(page.keywords.length, `${locale}/${key}`).toBeGreaterThan(0);
        titles.add(page.seoTitle);
      }
    }
    expect(titles.size).toBe(PREFIXED_LOCALES.length * 2);
  });

  /**
   * Google truncates around 60 characters of title and 155-160 of description.
   * Six of the ten pages shipped over budget once, so this is checked for every
   * page in every locale rather than spot-checked on the home page.
   */
  it("keeps every title and description inside the SERP snippet budget", () => {
    const pages = [
      ...Object.values(TOOL_PAGES),
      ...PREFIXED_LOCALES.flatMap((locale) => Object.values(LOCALE_PAGES[locale])),
    ];

    expect(pages).toHaveLength(Object.keys(TOOL_PAGES).length + PREFIXED_LOCALES.length * 2);
    for (const page of pages) {
      expect(page.seoTitle.length, `title ${page.path}`).toBeLessThanOrEqual(60);
      expect(page.metaDescription.length, `description ${page.path}`).toBeLessThanOrEqual(155);
    }
  });

  it("points the home cross-link at the same locale's video page", () => {
    for (const locale of PREFIXED_LOCALES) {
      expect(LOCALE_PAGES[locale].home.videoPath, locale).toBe(LOCALE_PATHS[locale].video);
    }
  });
});

describe("hreflang", () => {
  it("cross-links every published locale plus x-default", () => {
    const expected: Record<string, string> = { en: "/" };
    for (const locale of PREFIXED_LOCALES) {
      expected[HREFLANG[locale]] = LOCALE_PATHS[locale].home;
    }
    expected["x-default"] = "/";
    expect(getPageSeo("home").alternates?.languages).toEqual(expected);
    expect(getLocalePageSeo(LOCALE_PAGES.es.home).alternates?.languages).toEqual(expected);
    expect(getLocalePageSeo(LOCALE_PAGES.id.home).alternates?.languages).toEqual(expected);
  });

  it("keeps every alternate self-consistent for the video cluster", () => {
    const languages = getLocalePageSeo(LOCALE_PAGES.id.video).alternates?.languages as Record<string, string>;
    expect(languages[HREFLANG.en]).toBe(TOOL_PAGES.video.path);
    expect(languages[HREFLANG.es]).toBe(LOCALE_PATHS.es.video);
    expect(languages[HREFLANG.pt]).toBe(LOCALE_PATHS.pt.video);
    expect(languages[HREFLANG.fr]).toBe(LOCALE_PATHS.fr.video);
    expect(languages[HREFLANG.ja]).toBe(LOCALE_PATHS.ja.video);
  });

  it("does not advertise translations that do not exist", () => {
    // gif/story are English-only; claiming /es/ versions would be a broken cluster.
    const languages = getPageSeo("gif").alternates?.languages as Record<string, string>;
    expect(Object.keys(languages).sort()).toEqual(["en", "x-default"]);
  });

  it("sets a distinct canonical per locale", () => {
    expect(getLocalePageSeo(LOCALE_PAGES.es.video).alternates?.canonical).toBe(LOCALE_PATHS.es.video);
    expect(getLocalePageSeo(LOCALE_PAGES.pt.home).alternates?.canonical).toBe("/pt/");
  });

  it("cross-links localized Privacy and About pages", () => {
    for (const key of ["privacy", "about"] as const) {
      const expected: Record<string, string> = {};
      for (const locale of TRUST_LOCALES) {
        expected[HREFLANG[locale]] = TRUST_PATHS[locale][key];
      }
      expected["x-default"] = TRUST_PATHS.en[key];

      for (const locale of TRUST_LOCALES) {
        const page = TRUST_PAGES[locale][key];
        expect(page.path, `${locale}/${key}`).toBe(TRUST_PATHS[locale][key]);
        expect(page.sections.length, `${locale}/${key}`).toBeGreaterThanOrEqual(6);
        expect(page.seoTitle.length, `${locale}/${key}/title`).toBeGreaterThan(0);
        expect(page.metaDescription.length, `${locale}/${key}/description`).toBeGreaterThan(0);
        expect(page.seoTitle.length, `${locale}/${key}/title`).toBeLessThanOrEqual(60);
        expect(page.metaDescription.length, `${locale}/${key}/description`).toBeLessThanOrEqual(155);
        expect(getTrustPageSeo(page).alternates?.languages).toEqual(expected);
      }
    }
  });
});

describe("navigation", () => {
  it("keeps locale navs inside their own language", () => {
    for (const locale of PREFIXED_LOCALES) {
      for (const item of navItems(locale, MESSAGES[locale])) {
        expect(item.href.startsWith(`/${locale}/`), `${locale}:${item.href}`).toBe(true);
      }
    }
  });

  it("switches language without leaving the page type", () => {
    const links = languageLinks("es", "video");
    expect(links.find((l) => l.locale === "id")?.href).toBe(LOCALE_PATHS.id.video);
    expect(links.find((l) => l.locale === "en")?.href).toBe(TOOL_PAGES.video.path);
    expect(links.find((l) => l.locale === "es")?.current).toBe(true);
  });

  it("switches trust pages to their localized slugs", () => {
    const links = languageLinks("fr", "privacy");
    expect(links.find((l) => l.locale === "es")?.href).toBe(
      TRUST_PATHS.es.privacy,
    );
    expect(links.find((l) => l.locale === "id")?.href).toBe(
      TRUST_PATHS.id.privacy,
    );
    expect(links.find((l) => l.locale === "fr")?.current).toBe(true);
    expect(links.find((l) => l.locale === "ja")?.href).toBe(
      TRUST_PATHS.ja.privacy,
    );
  });
});
