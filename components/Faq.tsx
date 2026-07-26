import Link from "next/link";
import Image from "next/image";
import type { FaqItem } from "@/lib/page-content";

function LinkedAnswer({ item }: { item: FaqItem }) {
  if (!item.links?.length) return item.answer;

  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  item.links.forEach((link) => {
    const index = item.answer.indexOf(link.text, cursor);
    if (index === -1) return;
    nodes.push(item.answer.slice(cursor, index));
    nodes.push(
      <Link key={`${link.href}-${index}`} href={link.href} className="font-medium text-brand hover:underline">
        {link.text}
      </Link>,
    );
    cursor = index + link.text.length;
  });
  nodes.push(item.answer.slice(cursor));
  return nodes;
}

export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <section aria-labelledby="faq-heading" id="faq" className="bg-[#f8f8f8]">
      <div className="mx-auto w-full max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
        <h2 id="faq-heading" className="text-3xl font-bold tracking-[-0.03em] text-brand-ink text-balance sm:text-4xl lg:text-5xl">
          Frequently Asked Questions
        </h2>
        <div className="mt-10 border-y border-gray-300">
          {items.map((item) => (
            <details key={item.question} className="group border-b border-gray-300 last:border-b-0">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-semibold text-brand-ink transition-colors hover:text-brand [&::-webkit-details-marker]:hidden sm:text-lg">
                {item.question}
                <Image
                  src="/icons/chevron.png"
                  alt=""
                  width="18"
                  height="18"
                  aria-hidden="true"
                  className="shrink-0 text-gray-600 transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <p className="max-w-3xl pb-6 text-base leading-7 text-gray-700"><LinkedAnswer item={item} /></p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
