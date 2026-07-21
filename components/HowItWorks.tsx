/**
 * How it works — PRD §8.2: three real steps.
 */

const STEPS = [
  {
    title: "Copy the Pin link",
    body: "On Pinterest, open the Pin and copy its link (Share → Copy link, or the address bar).",
  },
  {
    title: "Paste it above",
    body: "Drop the link into the input — the Paste button fills it from your clipboard in one tap.",
  },
  {
    title: "Pick a version & save",
    body: "We show the verified image, GIF or video versions with format and size. Tap Download.",
  },
];

export default function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works" className="mx-auto w-full max-w-5xl px-4 py-12">
      <h2 id="how-it-works" className="text-center text-2xl font-bold tracking-tight">
        How it works
      </h2>
      <ol className="mt-8 grid gap-4 sm:grid-cols-3">
        {STEPS.map((step, index) => (
          <li key={step.title} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-sm font-bold text-brand">
              {index + 1}
            </div>
            <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-gray-600">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
