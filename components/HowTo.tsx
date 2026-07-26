import Link from "next/link";
import type { ToolPageContent } from "@/lib/page-content";

function PhoneMockup({ step }: { step: number }) {
  return (
    <div className="mx-auto w-40 rounded-[1.75rem] border-[6px] border-brand-ink bg-white p-2 shadow-sm" aria-hidden="true">
      <div className="mx-auto h-1.5 w-10 rounded-full bg-brand-ink" />
      <div className="mt-3 flex h-52 flex-col justify-between rounded-2xl bg-brand-blush p-3">
        {step === 0 && (
          <>
            <div className="h-28 rounded-lg bg-gradient-to-br from-rose-100 via-brand-blush to-orange-100" />
            <div className="flex items-center justify-between rounded-lg bg-white px-2 py-2 text-[9px] text-gray-700 shadow-sm">
              <span>Share Pin</span><span className="font-bold text-brand">Copy link</span>
            </div>
          </>
        )}
        {step === 1 && (
          <div className="my-auto space-y-2">
            <div className="truncate rounded-lg bg-white px-2 py-2 text-[9px] text-gray-600 shadow-sm">https://pin.it/...</div>
            <div className="flex gap-1">
              <span className="flex-1 rounded-md bg-gray-200 py-1.5 text-center text-[9px]">Paste</span>
              <span className="flex-1 rounded-md bg-brand py-1.5 text-center text-[9px] font-semibold text-white">Download</span>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="my-auto space-y-2">
            <div className="h-24 rounded-lg bg-gradient-to-br from-brand-blush via-rose-100 to-orange-100" />
            <div className="rounded-md bg-brand py-2 text-center text-[9px] font-semibold text-white">↓ Download HD</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function HowTo({ content }: { content: ToolPageContent }) {
  return (
    <section className="bg-white" aria-labelledby="how-to-heading">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <h2 id="how-to-heading" className="max-w-4xl text-3xl font-bold tracking-[-0.03em] text-brand-ink text-balance sm:text-4xl lg:text-5xl">
          {content.howToTitle}
        </h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-3 lg:mt-16">
          {content.steps.map((step, index) => (
            <li key={step.title}>
              <div className="flex min-h-80 items-center rounded-2xl bg-[#faf7f8] px-6 py-8">
                <PhoneMockup step={index} />
              </div>
              <div className="mt-6 flex items-center gap-2">
                <span className="text-xl" aria-hidden="true">{step.icon}</span>
                <span className="text-sm font-semibold text-brand">Step {index + 1}</span>
              </div>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-brand-ink">{step.title}</h3>
              <p className="mt-2 max-w-sm text-base leading-7 text-gray-700">{step.description}</p>
            </li>
          ))}
        </ol>
        {content.slug === "home" && (
          <p className="mt-12 text-sm text-gray-700">
            Want to download Pinterest videos? Use our{" "}
            <Link href="/pinterest-video-downloader/" className="font-semibold text-brand hover:underline">
              Pinterest video downloader
            </Link>.
          </p>
        )}
      </div>
    </section>
  );
}
