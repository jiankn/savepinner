import Image from "next/image";
import type { UiMessages } from "@/lib/i18n";

const REASON_ICONS = [
  "/illustrations/why-fast.png",
  "/illustrations/why-hd.png",
  "/illustrations/why-no-registration.png",
] as const;

export default function WhyChoose({ t }: { t: UiMessages }) {
  const reasons = t.whyChoose.items.map((item, index) => ({ ...item, icon: REASON_ICONS[index] }));

  return (
    <section aria-labelledby="why-choose-heading" className="bg-brand-blush/60">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <h2 id="why-choose-heading" className="max-w-4xl text-3xl font-bold tracking-[-0.03em] text-brand-ink text-balance sm:text-4xl lg:text-5xl">
          {t.whyChoose.heading}
        </h2>
        <div className="mt-12 grid border-y border-rose-200 md:grid-cols-3 md:divide-x md:divide-rose-200">
          {reasons.map((reason) => (
            <article key={reason.title} className="border-b border-rose-200 py-9 last:border-b-0 md:border-b-0 md:px-8 md:first:pl-0 md:last:pr-0">
              <Image
                src={reason.icon}
                alt=""
                width={80}
                height={80}
                className="h-20 w-20 object-contain"
                aria-hidden="true"
              />
              <h3 className="mt-8 text-2xl font-semibold tracking-[-0.02em] text-brand-ink">{reason.title}</h3>
              <p className="mt-3 max-w-sm text-base leading-7 text-gray-700">{reason.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
