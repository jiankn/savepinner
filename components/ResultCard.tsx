"use client";

import type { ResolvedMedia, ResolvedVariant } from "@/lib/api-types";

function safeFilename(title: string, variant: ResolvedVariant): string {
  const base = title
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "savepinner";
  const quality = variant.quality.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return `${base}-${quality}.${variant.ext}`;
}

function buttonLabel(type: ResolvedMedia["type"], variant: ResolvedVariant): string {
  if (type === "video") return `Download ${variant.quality}`;
  if (variant.quality === "Original" && variant.width) return `Download Original (${variant.width}x)`;
  if (variant.quality === "Original") return "Download Original";
  if (variant.quality.startsWith("Thumbnail")) return "Download Thumbnail (236x)";
  return `Download ${variant.quality}`;
}

function mediaLabel(type: ResolvedMedia["type"]): string {
  if (type === "gif") return "GIF · Original Quality · Animated";
  if (type === "video") return "Video · HD Quality";
  return "Image · Original Quality";
}

export default function ResultCard({ result, onReset }: { result: ResolvedMedia; onReset: () => void }) {
  return (
    <section aria-label="Download result" className="bg-white p-4 shadow-md sm:p-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        {result.thumbnail && (
          // eslint-disable-next-line @next/next/no-img-element -- Pinterest CDN URL is returned dynamically by the resolver.
          <img
            src={result.thumbnail}
            alt={result.title ? `Preview of ${result.title}` : "Pinterest media preview"}
            className="mx-auto max-h-[420px] w-full max-w-[400px] rounded-xl object-contain"
          />
        )}
        <div className="min-w-0 flex-1 text-left">
          <p className="text-sm font-semibold text-brand">{mediaLabel(result.type)}</p>
          <h2 className="mt-2 text-xl font-bold text-gray-900 text-balance">{result.title}</h2>
          <div className="mt-5 flex flex-col gap-2.5">
            {result.variants.map((variant, index) => {
              const query = new URLSearchParams({
                url: variant.url,
                name: safeFilename(result.title, variant),
              });
              return (
                <a
                  key={`${variant.quality}-${variant.url}`}
                  href={`/api/dl/?${query.toString()}`}
                  className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold ${
                    index === 0
                      ? "bg-brand text-white hover:bg-brand-dark"
                      : "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <span aria-hidden="true">↓</span>
                  {buttonLabel(result.type, variant)}
                </a>
              );
            })}
          </div>
          <button type="button" onClick={onReset} className="mt-4 text-sm font-medium text-brand hover:underline">
            Download another Pin
          </button>
        </div>
      </div>
    </section>
  );
}
