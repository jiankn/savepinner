import DownloaderForm from "./DownloaderForm";
import Faq from "./Faq";
import Footer from "./Footer";
import Header from "./Header";
import HowTo from "./HowTo";
import RelatedTools from "./RelatedTools";
import TrustBadges from "./TrustBadges";
import WhyChoose from "./WhyChoose";
import { getMessages, HREFLANG } from "@/lib/i18n";
import type { ToolPageContent } from "@/lib/page-content";
import { getPageJsonLd } from "@/lib/seo";

export default function ToolLandingPage({ content }: { content: ToolPageContent }) {
  const jsonLd = getPageJsonLd(content);
  const t = getMessages(content.locale);
  const isTranslated = content.locale !== "en";
  const pageKey = content.slug === "home" || content.slug === "video" ? content.slug : "other";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Header locale={content.locale} t={t} />
      {/* The document element stays lang="en"; this wrapper gives assistive
          tech the right pronunciation for translated pages. */}
      <main id="main-content" className="flex-1" lang={isTranslated ? HREFLANG[content.locale] : undefined}>
        <section className="aurora-hero">
          <div className="mx-auto w-full max-w-5xl px-4 pb-24 pt-16 text-center sm:px-6 sm:pb-32 sm:pt-24 lg:pb-36 lg:pt-28">
            <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-[-0.035em] text-brand-ink text-balance sm:text-5xl lg:text-6xl">
              {content.h1}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-red-950/80 text-pretty sm:text-xl sm:leading-8">
              {content.subtitle}
            </p>
            <div className="mx-auto mt-9 max-w-3xl sm:mt-12">
              <DownloaderForm placeholder={content.placeholder} t={t} />
            </div>
          </div>
        </section>
        <section className="bg-white">
          <div className="mx-auto w-full max-w-6xl border-b border-rose-100 px-4 py-8 sm:px-6 sm:py-10">
            <TrustBadges t={t} />
          </div>
        </section>
        <HowTo content={content} t={t} />
        {content.slug === "home" && <WhyChoose t={t} />}
        <Faq items={content.faq} heading={t.faqHeading} />
        <RelatedTools tools={content.related} heading={t.relatedHeading} />
      </main>
      <Footer locale={content.locale} t={t} pageKey={pageKey} />
    </>
  );
}
