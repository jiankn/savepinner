import Link from "next/link";
import type { RelatedTool } from "@/lib/page-content";

export default function RelatedTools({ tools }: { tools: RelatedTool[] }) {
  return (
    <section aria-labelledby="related-tools-heading" className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <h2 id="related-tools-heading" className="text-3xl font-bold tracking-[-0.03em] text-brand-ink sm:text-4xl lg:text-5xl">
          More Free Pinterest Tools
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {tools.map((tool, index) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group overflow-hidden rounded-2xl bg-[#f8f6f7] transition-transform duration-300 ease-out hover:-translate-y-1"
            >
              <span
                className={`flex h-44 items-center justify-center ${
                  index % 3 === 0
                    ? "bg-gradient-to-br from-rose-100 to-orange-100"
                    : index % 3 === 1
                      ? "bg-gradient-to-br from-brand-blush to-rose-200"
                      : "bg-gradient-to-br from-orange-100 to-brand-blush"
                }`}
                aria-hidden="true"
              >
                <span className="flex h-24 w-36 items-center justify-center rounded-xl bg-white text-4xl shadow-sm">
                  {tool.icon}
                </span>
              </span>
              <span className="block p-5">
                <span className="block text-lg font-semibold text-brand-ink transition-colors group-hover:text-brand">{tool.title}</span>
                <span className="mt-1 block text-sm leading-6 text-gray-700">{tool.description} →</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
