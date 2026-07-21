import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DownloaderForm from "@/components/DownloaderForm";
import TrustBadges from "@/components/TrustBadges";
import SupportedUrls from "@/components/SupportedUrls";
import HowItWorks from "@/components/HowItWorks";
import HowToUseSteps from "@/components/HowToUseSteps";
import Limitations from "@/components/Limitations";
import PrivacyNote from "@/components/PrivacyNote";
import Faq, { FAQ_ITEMS } from "@/components/Faq";

export const metadata: Metadata = {
  title: "SavePinner — Pinterest Image & Video Downloader",
  description:
    "Paste a Pinterest Pin link to preview and download the verified image, GIF or video versions. Free, no sign-up, clear errors — on mobile and desktop.",
  alternates: { canonical: "/" },
};

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://savepinner.com").replace(/\/+$/, "");

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "SavePinner",
      url: siteUrl,
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "Paste a Pinterest Pin link to preview and download the verified image, GIF or video versions. No sign-up required.",
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1">
        {/* Hero + core tool — PRD §8.3.2: bg-red-50, tool usable without scrolling */}
        <section className="bg-red-50">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 pb-12 pt-10 text-center md:pb-16 md:pt-14">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Pinterest Image &amp; Video Downloader
            </h1>
            <p className="mt-3 max-w-xl text-base text-gray-500 md:text-lg">
              Paste a Pin link to preview and save the available image, GIF or video version — free
              and without sign-up.
            </p>
            <div className="mt-6 w-full max-w-2xl">
              <DownloaderForm />
            </div>
            <div className="mt-6">
              <TrustBadges />
            </div>
          </div>
        </section>

        <SupportedUrls />
        <HowItWorks />
        <HowToUseSteps />
        <Limitations />
        <PrivacyNote />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
