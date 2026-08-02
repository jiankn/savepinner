import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import {
  HREFLANG,
  PREFIXED_LOCALES,
  type Locale,
} from "@/lib/i18n";
import { SITE_METADATA } from "@/lib/site-document";
import { inter } from "@/lib/site-font";
import "@/app/globals.css";

export const metadata: Metadata = SITE_METADATA;
export const dynamicParams = false;

const SKIP_LABELS: Record<Exclude<Locale, "en">, string> = {
  es: "Saltar al contenido",
  id: "Langsung ke konten",
  pt: "Ir para o conteúdo",
  fr: "Aller au contenu",
  de: "Zum Inhalt springen",
  it: "Vai al contenuto",
  nl: "Ga naar de inhoud",
  ja: "メインコンテンツへ移動",
  tr: "İçeriğe geç",
  pl: "Przejdź do treści",
};

export function generateStaticParams() {
  return PREFIXED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocalizedRootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!PREFIXED_LOCALES.includes(locale as Exclude<Locale, "en">)) {
    notFound();
  }

  const typedLocale = locale as Exclude<Locale, "en">;

  return (
    <html
      lang={HREFLANG[typedLocale]}
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-gray-900">
        <SiteShell skipLabel={SKIP_LABELS[typedLocale]}>
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
