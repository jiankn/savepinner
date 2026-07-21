/**
 * FAQ — PRD §8.2: based on real user questions, no keyword stuffing.
 * Rendered with native <details> so it works without JS and is readable by
 * search engines and assistive tech. The same Q&As are exposed as FAQPage
 * structured data on the home page.
 */

export const FAQ_ITEMS = [
  {
    question: "Is SavePinner free?",
    answer:
      "Yes. SavePinner is free to use and requires no account, sign-up or software installation.",
  },
  {
    question: "Do I need to log in to Pinterest?",
    answer:
      "No. SavePinner only works with public Pins and never asks for your Pinterest credentials. Private or sign-in-only content cannot be accessed.",
  },
  {
    question: "Why did my link fail to resolve?",
    answer:
      "The most common reasons: the link is not a direct Pin URL, the Pin was deleted or is private, the short link redirects somewhere unsupported, or the service is temporarily busy. The error message tells you which case applies and what to do next.",
  },
  {
    question: "Can I download videos and GIFs?",
    answer:
      "When a Pin contains a downloadable video or a real GIF, SavePinner shows the verified versions with format, resolution and file size. If only a static cover image is available, it is clearly shown as an image — never mislabeled as a GIF.",
  },
  {
    question: "Do you store my links or downloads?",
    answer:
      "No. Submitted links are used only to complete that request, files are streamed through without being stored, and IPs are retained only briefly for rate limiting. See the Privacy Policy for details.",
  },
  {
    question: "Is it legal to download Pinterest content?",
    answer:
      "Only download content you own or have permission to use. Saving other people's content may infringe their rights — when in doubt, ask the creator. SavePinner does not host any Pinterest content and is not affiliated with Pinterest.",
  },
] as const;

export default function Faq() {
  return (
    <section aria-labelledby="faq" id="faq" className="mx-auto w-full max-w-3xl px-4 py-12">
      <h2 id="faq" className="text-center text-2xl font-bold tracking-tight">
        Frequently asked questions
      </h2>
      <div className="mt-8 space-y-3">
        {FAQ_ITEMS.map((item) => (
          <details
            key={item.question}
            className="group rounded-xl border border-gray-200 bg-white px-4 py-3 open:pb-4"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
              {item.question}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="shrink-0 text-gray-400 transition-transform group-open:rotate-180"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
