"use client";

import { useEffect, useState } from "react";
import type {
  DownloadAvailability,
  ResolvedMedia,
  ResolvedPage,
  ResolvedVariant,
} from "@/lib/api-types";
import { formatEta } from "@/lib/format";
import type { UiMessages } from "@/lib/i18n";

function filenameBase(title: string): string {
  return (
    title
      .normalize("NFKD")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "savepinner"
  );
}

function safeFilename(title: string, variant: ResolvedVariant): string {
  const quality = variant.quality.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return `${filenameBase(title)}-${quality}.${variant.ext}`;
}

function pageFilename(title: string, page: ResolvedPage): string {
  return `${filenameBase(title)}-page-${page.index}.${page.ext}`;
}

function downloadHref(url: string, name: string): string {
  return `/api/dl/?${new URLSearchParams({ url, name }).toString()}`;
}

function buttonLabel(
  type: ResolvedMedia["type"],
  variant: ResolvedVariant,
  verb: string,
  t: UiMessages,
): string {
  if (type === "video") return `${verb} ${variant.quality}`;
  if (variant.quality === "Original" && variant.width) return `${verb} ${t.result.original} (${variant.width}x)`;
  if (variant.quality === "Original") return `${verb} ${t.result.original}`;
  if (variant.quality.startsWith("Thumbnail")) return `${verb} ${t.result.thumbnail}`;
  return `${verb} ${variant.quality}`;
}

function mediaLabel(type: ResolvedMedia["type"], t: UiMessages): string {
  if (type === "gif") return t.result.gif;
  if (type === "video") return t.result.video;
  return t.result.image;
}

export default function ResultCard({
  result,
  download,
  t,
  onReset,
}: {
  result: ResolvedMedia;
  download?: DownloadAvailability;
  t: UiMessages;
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
          <p className="text-sm font-semibold text-brand">{mediaLabel(result.type, t)}</p>
          <h2 className="mt-2 text-xl font-bold text-gray-900 text-balance">{result.title}</h2>
          {capped && download && (
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-left" role="status">
              <p className="text-sm font-semibold text-amber-900">{t.result.cappedTitle}</p>
              <p className="mt-1 text-sm text-amber-800">
                {(() => {
                  const [before, after = ""] = t.result.cappedBody.split("{eta}");
                  return (
                    <>
                      {before}
                      <strong>{formatEta(download.resetAt - now)}</strong>
                      {after}
                    </>
                  );
                })()}
              </p>
            </div>
          )}
          <div className="mt-5 flex flex-col gap-2.5">
            {result.variants.map((variant, index) => {
              return (
                <a
                  key={`${variant.quality}-${variant.url}`}
                  href={
                    capped
                      ? variant.url
                      : downloadHref(variant.url, safeFilename(result.title, variant))
                  }
                  {...(capped ? { target: "_blank", rel: "nofollow noopener noreferrer" } : {})}
                  className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold ${
                    index === 0
                      ? "bg-brand text-white hover:bg-brand-dark"
                      : "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <span aria-hidden="true">{capped ? "↗" : "↓"}</span>
                  {buttonLabel(result.type, variant, capped ? t.result.open : t.result.download, t)}
                </a>
              );
            })}
          </div>
          <button type="button" onClick={onReset} className="mt-4 text-sm font-medium text-brand hover:underline">
            {t.result.another}
          </button>
        </div>
      </div>

      {result.pages && result.pages.length > 0 && (
        <div className="mt-8 border-t border-gray-200 pt-6 text-left">
          <h3 className="text-base font-bold text-gray-900">
            {t.result.pagesTitle} ({result.pages.length})
          </h3>
          <p className="mt-1 text-sm text-gray-600">{t.result.pagesHint}</p>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {result.pages.map((page) => {
              const kindLabel = page.kind === "video" ? t.result.pageVideo : t.result.pageImage;
              return (
                <li key={`${page.index}-${page.url}`}>
                  <a
                    href={
                      capped ? page.url : downloadHref(page.url, pageFilename(result.title, page))
                    }
                    {...(capped ? { target: "_blank", rel: "nofollow noopener noreferrer" } : {})}
                    className="flex min-h-14 items-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                  >
                    <span aria-hidden="true" className="text-brand">
                      {capped ? "↗" : "↓"}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate">
                        {t.result.pageLabel.replace("{n}", String(page.index))} · {kindLabel}
                      </span>
                      <span className="block text-xs font-medium text-gray-500">
                        {[page.quality, page.ext.toUpperCase()].filter(Boolean).join(" · ")}
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
