import DownloaderForm from "./DownloaderForm";
import Faq from "./Faq";
import Footer from "./Footer";
import Header from "./Header";
import HowTo from "./HowTo";
import RelatedTools from "./RelatedTools";
import TrustBadges from "./TrustBadges";
import WhyChoose from "./WhyChoose";
import type { ToolPageContent } from "@/lib/page-content";
import { getPageJsonLd } from "@/lib/seo";

export default function ToolLandingPage({ content }: { content: ToolPageContent }) {
  const jsonLd = getPageJsonLd(content);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main id="main-content" className="flex-1">
        <section className="aurora-hero">
          <div className="mx-auto w-full max-w-5xl px-4 pb-24 pt-16 text-center sm:px-6 sm:pb-32 sm:pt-24 lg:pb-36 lg:pt-28">
            <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-[-0.035em] text-brand-ink text-balance sm:text-5xl lg:text-6xl">
              {content.h1}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-red-950/80 text-pretty sm:text-xl sm:leading-8">
              {content.subtitle}
            </p>
            <div className="mx-auto mt-9 max-w-3xl sm:mt-12">
              <DownloaderForm placeholder={content.placeholder} />
            </div>
          </div>
        </section>
        <section aria-label="Why users trust SavePinner" className="bg-white">
          <div className="mx-auto w-full max-w-6xl border-b border-rose-100 px-4 py-8 sm:px-6 sm:py-10">
            <TrustBadges />
          </div>
        </section>
        <HowTo content={content} />
        {content.slug === "home" && <WhyChoose />}
        <Faq items={content.faq} />
        <RelatedTools tools={content.related} />
      </main>
      <Footer />
    </>
  );
}
