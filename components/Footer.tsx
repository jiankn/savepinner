import Link from "next/link";
import Logo from "./Logo";
import type { Locale, UiMessages } from "@/lib/i18n";
import { languageLinks, legalLinks, toolLinks } from "@/lib/navigation";
import type { LocalePageKey } from "@/lib/locale-content";

export default function Footer({
  locale,
  t,
  pageKey = "other",
}: {
  locale: Locale;
  t: UiMessages;
  pageKey?: LocalePageKey | "other";
}) {
  const tools = toolLinks(locale, t);
  const legal = legalLinks(t);
  const languages = languageLinks(locale, pageKey);

  return (
    <footer className="aurora-footer px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-7xl rounded-2xl bg-white p-6 text-brand-ink sm:p-10 lg:p-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-7 text-gray-700">{t.footer.tagline}</p>
          </div>
          <nav aria-label={t.footer.tools}>
            <p className="font-semibold">{t.footer.tools}</p>
            <div className="mt-4 flex flex-col gap-3">
              {tools.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-gray-700 transition-colors hover:text-brand">
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
          <nav aria-label={t.footer.legal}>
            <p className="font-semibold">{t.footer.legal}</p>
            <div className="mt-4 flex flex-col gap-3">
              {legal.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-gray-700 transition-colors hover:text-brand">
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
          <nav aria-label={t.footer.languages}>
            <p className="font-semibold">{t.footer.languages}</p>
            <div className="mt-4 flex flex-col gap-3">
              {languages.map((language) =>
                language.current ? (
                  <span key={language.locale} aria-current="true" className="text-sm font-semibold text-brand">
                    {language.label}
                  </span>
                ) : (
                  <Link
                    key={language.locale}
                    href={language.href}
                    hrefLang={language.locale === "pt" ? "pt-BR" : language.locale}
                    className="text-sm text-gray-700 transition-colors hover:text-brand"
                  >
                    {language.label}
                  </Link>
                ),
              )}
            </div>
          </nav>
        </div>
        <p className="mt-12 border-t border-gray-200 pt-6 text-xs leading-relaxed text-gray-600">
          {t.footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}
