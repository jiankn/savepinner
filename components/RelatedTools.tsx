import Image from "next/image";
import Link from "next/link";
import type { RelatedTool } from "@/lib/page-content";

const TOOL_ILLUSTRATIONS: Record<string, string> = {
  "/": "/illustrations/related-image.webp",
  "/pinterest-video-downloader/": "/illustrations/related-video.webp",
  "/pinterest-gif-downloader/": "/illustrations/related-gif.webp",
  "/pinterest-story-downloader/": "/illustrations/related-story.webp",
};

export default function RelatedTools({ tools }: { tools: RelatedTool[] }) {
  return (
    <section aria-labelledby="related-tools-heading" className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <h2 id="related-tools-heading" className="text-3xl font-bold tracking-[-0.03em] text-brand-ink sm:text-4xl lg:text-5xl">
          More Free Pinterest Tools
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group overflow-hidden rounded-2xl bg-[#f8f6f7] transition-transform duration-300 ease-out hover:-translate-y-1"
            >
              <span className="relative block h-44 overflow-hidden bg-[#fff8f2]" aria-hidden="true">
                <Image
                  src={TOOL_ILLUSTRATIONS[tool.href] ?? TOOL_ILLUSTRATIONS["/"]}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                />
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
