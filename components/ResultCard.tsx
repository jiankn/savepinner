"use client";

import { useEffect, useState } from "react";
import type { DownloadAvailability, ResolvedMedia, ResolvedVariant } from "@/lib/api-types";
import { formatEta } from "@/lib/format";

function safeFilename(title: string, variant: ResolvedVariant): string {
  const base = title
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "savepinner";
  const quality = variant.quality.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return `${base}-${quality}.${variant.ext}`;
}

function buttonLabel(
  type: ResolvedMedia["type"],
  variant: ResolvedVariant,
  verb: "Download" | "Open",
): string {
  if (type === "video") return `${verb} ${variant.quality}`;
  if (variant.quality === "Original" && variant.width) return `${verb} Original (${variant.width}x)`;
  if (variant.quality === "Original") return `${verb} Original`;
  if (variant.quality.startsWith("Thumbnail")) return `${verb} Thumbnail (236x)`;
  return `${verb} ${variant.quality}`;
}

function mediaLabel(type: ResolvedMedia["type"]): string {
  if (type === "gif") return "GIF · Original Quality · Animated";
  if (type === "video") return "Video · HD Quality";
  return "Image · Original Quality";
}

export default function ResultCard({
  result,
  download,
  onReset,
}: {
  result: ResolvedMedia;
  download?: DownloadAvailability;
  onReset: () => void;
}) {
  const capped = download?.capped === true;
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!capped) return;
    const id = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(id);
  }, [capped]);

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
          {capped && download && (
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-left" role="status">
              <p className="text-sm font-semibold text-amber-900">
                Today&apos;s one-click downloads are used up
              </p>
              <p className="mt-1 text-sm text-amber-800">
                SavePinner is busier than our free servers can handle today. One-click downloads
                reset in <strong>{formatEta(download.resetAt - now)}</strong>. You can still save
                your file right now — open it below, then right-click (desktop) or long-press
                (mobile) and choose &ldquo;Save&rdquo;.
              </p>
            </div>
          )}
          <div className="mt-5 flex flex-col gap-2.5">
            {result.variants.map((variant, index) => {
              const query = new URLSearchParams({
                url: variant.url,
                name: safeFilename(result.title, variant),
              });
              return (
                <a
                  key={`${variant.quality}-${variant.url}`}
                  href={capped ? variant.url : `/api/dl/?${query.toString()}`}
                  {...(capped ? { target: "_blank", rel: "nofollow noopener noreferrer" } : {})}
                  className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold ${
                    index === 0
                      ? "bg-brand text-white hover:bg-brand-dark"
                      : "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <span aria-hidden="true">{capped ? "↗" : "↓"}</span>
                  {buttonLabel(result.type, variant, capped ? "Open" : "Download")}
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
