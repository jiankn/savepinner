import Image from "next/image";

const REASONS = [
  {
    icon: "/illustrations/why-fast.png",
    title: "Fast & Simple",
    description: "Download any Pinterest image in under 3 seconds. No complicated steps.",
  },
  {
    icon: "/illustrations/why-hd.png",
    title: "HD Original Quality",
    description: "We fetch the original resolution image, not the compressed thumbnail.",
  },
  {
    icon: "/illustrations/why-no-registration.png",
    title: "No Registration",
    description: "No email, no account, no login. Just paste and download.",
  },
];

export default function WhyChoose() {
  return (
    <section aria-labelledby="why-choose-heading" className="bg-brand-blush/60">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <h2 id="why-choose-heading" className="max-w-4xl text-3xl font-bold tracking-[-0.03em] text-brand-ink text-balance sm:text-4xl lg:text-5xl">
          Why Choose Our Pinterest Image Downloader?
        </h2>
        <div className="mt-12 grid border-y border-rose-200 md:grid-cols-3 md:divide-x md:divide-rose-200">
          {REASONS.map((reason) => (
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
