import Image from "next/image";
import Link from "next/link";
import type { UiMessages } from "@/lib/i18n";
import type { ToolPageContent } from "@/lib/page-content";

const HOW_TO_ILLUSTRATIONS = [
  "/illustrations/how-find.webp",
  "/illustrations/how-paste.webp",
  "/illustrations/how-download.webp",
] as const;

const HOW_TO_ICONS = [
  "/illustrations/how-find-icon.png",
  "/illustrations/how-paste-icon.png",
  "/illustrations/how-download-icon.png",
] as const;

export default function HowTo({ content, t }: { content: ToolPageContent; t: UiMessages }) {
  return (
    <section className="bg-white" aria-labelledby="how-to-heading">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <h2 id="how-to-heading" className="max-w-4xl text-3xl font-bold tracking-[-0.03em] text-brand-ink text-balance sm:text-4xl lg:text-5xl">
          {content.howToTitle}
        </h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-3 lg:mt-16">
          {content.steps.map((step, index) => (
            <li key={step.title}>
              <div className="flex min-h-80 items-center justify-center overflow-hidden rounded-2xl bg-[#faf7f8] px-6 py-4" aria-hidden="true">
                <Image
                  src={HOW_TO_ILLUSTRATIONS[index]}
                  alt=""
                  width={720}
                  height={1280}
                  sizes="(min-width: 768px) 22vw, 70vw"
                  className="h-72 w-auto object-contain"
                />
              </div>
              <div className="mt-6 flex items-center gap-2">
                <Image
                  src={HOW_TO_ICONS[index]}
                  alt=""
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain"
                  aria-hidden="true"
                />
                <span className="text-sm font-semibold text-brand">{t.howTo.step} {index + 1}</span>
              </div>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-brand-ink">{step.title}</h3>
              <p className="mt-2 max-w-sm text-base leading-7 text-gray-700">{step.description}</p>
            </li>
          ))}
        </ol>
        {content.slug === "home" && (
          <p className="mt-12 text-sm text-gray-700">
            {t.howTo.videoCrossLinkPrefix}
            <Link href={content.videoPath} className="font-semibold text-brand hover:underline">
              {t.howTo.videoCrossLinkText}
            </Link>.
          </p>
        )}
      </div>
    </section>
  );
}
