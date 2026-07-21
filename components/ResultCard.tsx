"use client";

/**
 * Result card — PRD §6.3 (FR-006). Preview + media info + verified versions,
 * each download button labelled with format and dimensions. No auto-download;
 * links expire in 5 minutes (PRD §11.3).
 */

import type { ResolveSuccess } from "@/lib/api-types";
import { formatBytes } from "@/lib/format";

const TYPE_LABEL: Record<ResolveSuccess["type"], string> = {
  image: "Image",
  gif: "GIF",
  video: "Video",
};

export default function ResultCard({
  result,
  onReset,
}: {
  result: ResolveSuccess;
  onReset: () => void;
}) {
  return (
    <section
      aria-label="Resolved media"
      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        {result.previewUrl && (
          // eslint-disable-next-line @next/next/no-img-element -- token-guarded dynamic proxy URL; next/image cannot know its dimensions
          <img
            src={result.previewUrl}
            alt={result.title ? `Preview of ${result.title}` : "Pin media preview"}
            className="h-40 w-full rounded-xl border border-gray-100 object-cover sm:w-40"
            loading="lazy"
          />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-brand">
              {TYPE_LABEL[result.type]}
            </span>
            <span className="text-xs text-gray-400">
              {result.variants.length} verified version{result.variants.length === 1 ? "" : "s"}
            </span>
          </div>
          <h2 className="mt-1 truncate text-base font-semibold text-gray-900">
            {result.title ?? "Pinterest media"}
          </h2>

          <ul className="mt-3 space-y-2">
            {result.variants.map((variant, index) => (
              <li
                key={variant.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-gray-50 px-3 py-2"
              >
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="font-medium">{variant.label}</span>
                  <span className="rounded-md bg-white px-1.5 py-0.5 text-xs font-semibold uppercase text-gray-500">
                    {variant.format || "file"}
                  </span>
                  <span className="text-xs text-gray-400">{formatBytes(variant.bytes)}</span>
                  {index === 0 && (
                    <span className="rounded-md bg-red-50 px-1.5 py-0.5 text-xs font-medium text-brand">
                      Highest available
                    </span>
                  )}
                </div>
                <a
                  href={`/api/download/${variant.downloadToken}`}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
                  aria-label={`Download ${TYPE_LABEL[result.type]} version ${variant.label}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
                    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                  </svg>
                  Download
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-3 text-xs text-gray-400">
            Download links expire in 5 minutes. Only save content you own or have permission to use.
          </p>
        </div>
      </div>

      <div className="mt-4 border-t border-gray-100 pt-3 text-center">
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-medium text-brand hover:underline"
        >
          Download another link →
        </button>
      </div>
    </section>
  );
}
