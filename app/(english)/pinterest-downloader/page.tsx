import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getMessages } from "@/lib/i18n";
import {
  HUB_TOOLS,
  PINTEREST_DOWNLOADER_HUB,
} from "@/lib/hub-content";
import { OG_CARD } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: PINTEREST_DOWNLOADER_HUB.seoTitle },
  description: PINTEREST_DOWNLOADER_HUB.metaDescription,
  alternates: {
    canonical: PINTEREST_DOWNLOADER_HUB.path,
    languages: {
      en: PINTEREST_DOWNLOADER_HUB.path,
      "x-default": PINTEREST_DOWNLOADER_HUB.path,
    },
  },
  openGraph: {
    type: "website",
    siteName: "SavePinner",
    title: PINTEREST_DOWNLOADER_HUB.seoTitle,
    description: PINTEREST_DOWNLOADER_HUB.metaDescription,
    url: PINTEREST_DOWNLOADER_HUB.path,
    images: [OG_CARD],
  },
  twitter: {
    card: "summary_large_image",
    title: PINTEREST_DOWNLOADER_HUB.seoTitle,
    description: PINTEREST_DOWNLOADER_HUB.metaDescription,
    images: [OG_CARD],
  },
};

const t = getMessages("en");

export default function PinterestDownloaderHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: PINTEREST_DOWNLOADER_HUB.h1,
    description: PINTEREST_DOWNLOADER_HUB.metaDescription,
    url: `https://savepinner.com${PINTEREST_DOWNLOADER_HUB.path}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: HUB_TOOLS.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tool.title,
        url: `https://savepinner.com${tool.href}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header locale="en" t={t} />
      <main id="main-content" className="flex-1">
        <section className="aurora-hero">
          <div className="mx-auto w-full max-w-4xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pb-24 sm:pt-24">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              All SavePinner tools
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-[-0.035em] text-brand-ink text-balance sm:text-5xl lg:text-6xl">
              {PINTEREST_DOWNLOADER_HUB.h1}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-red-950/80 text-pretty sm:text-xl sm:leading-8">
              Choose the downloader that matches the public Pin you have. Each
              tool uses the same simple workflow, but the available file and
              quality depend on the media Pinterest publishes for that Pin.
            </p>
          </div>
        </section>

        <section aria-labelledby="choose-tool-heading" className="bg-white">
          <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
            <h2
              id="choose-tool-heading"
              className="text-3xl font-bold tracking-[-0.03em] text-brand-ink sm:text-4xl"
            >
              Choose the right Pinterest downloader
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-gray-700">
              Start with what you can see in the Pin. A still photo belongs in
              the image tool, a Pin with a play button belongs in the video
              tool, and older multi-page Pins are best checked with the Story
              Pin tool.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {HUB_TOOLS.map((tool) => (
                <article
                  key={tool.href}
                  className="rounded-2xl border border-rose-100 bg-[#fffafa] p-6"
                >
                  <h3 className="text-xl font-semibold text-brand-ink">
                    {tool.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-gray-700">
                    {tool.description}
                  </p>
                  <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="font-semibold text-gray-900">Best for</dt>
                      <dd className="mt-1 text-gray-700">{tool.bestFor}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-900">
                        Possible output
                      </dt>
                      <dd className="mt-1 text-gray-700">{tool.output}</dd>
                    </div>
                  </dl>
                  <Link
                    href={tool.href}
                    className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-brand px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                  >
                    Open {tool.title}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="compare-heading" className="bg-brand-blush/60">
          <div className="mx-auto w-full max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
            <h2
              id="compare-heading"
              className="text-3xl font-bold tracking-[-0.03em] text-brand-ink sm:text-4xl"
            >
              What SavePinner can return
            </h2>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-rose-100 bg-white">
              <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
                <thead className="bg-rose-50 text-gray-900">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Pin you paste</th>
                    <th className="px-5 py-4 font-semibold">What is checked</th>
                    <th className="px-5 py-4 font-semibold">Result you may see</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rose-100 text-gray-700">
                  <tr>
                    <td className="px-5 py-4">Single image Pin</td>
                    <td className="px-5 py-4">Original and thumbnail image URLs</td>
                    <td className="px-5 py-4">Original, 736x, 564x and 236x choices when available</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4">Video Pin</td>
                    <td className="px-5 py-4">Direct MP4 variants published with the Pin</td>
                    <td className="px-5 py-4">One or more video qualities, never an invented resolution</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4">Animated Pin</td>
                    <td className="px-5 py-4">GIF source, looping MP4 and cover image</td>
                    <td className="px-5 py-4">The real animation format Pinterest exposes</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4">Story or Idea Pin</td>
                    <td className="px-5 py-4">Publicly exposed primary media and available pages</td>
                    <td className="px-5 py-4">Image or video results; multi-page coverage can vary</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section aria-labelledby="limits-heading" className="bg-white">
          <div className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
            <h2
              id="limits-heading"
              className="text-3xl font-bold tracking-[-0.03em] text-brand-ink sm:text-4xl"
            >
              Supported links and practical limits
            </h2>
            <div className="mt-6 space-y-5 text-base leading-7 text-gray-700">
              <p>
                SavePinner accepts public Pinterest Pin URLs, including
                pinterest.com country domains and pin.it short links. Profiles,
                boards, search pages, secret boards, private accounts and
                deleted Pins are not single public Pin pages, so they cannot be
                resolved by these tools.
              </p>
              <p>
                The tools do not manufacture a missing format. A Pin that only
                exposes a cover image will return an image, even if it looked
                animated in a feed preview. Likewise, a video quality only
                appears when Pinterest publishes that direct file for the Pin.
                This is why two visually similar Pins can produce different
                download choices.
              </p>
              <p>
                Download only content you own, have permission to use, or may
                lawfully save. SavePinner does not grant reuse rights and is
                not affiliated with Pinterest.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="en" t={t} pageKey="other" />
    </>
  );
}
