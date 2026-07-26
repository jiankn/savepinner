"use client";

import Image from "next/image";

/**
 * Error state — PRD §6.4 (FR-008): specific message per error code plus an
 * actionable next step ("try again" / "check the link").
 */

const HINTS: Record<string, string> = {
  INVALID_URL: "Make sure the link looks like https://www.pinterest.com/pin/123456789/ or https://pin.it/abc123.",
  UNSUPPORTED_URL: "Only single public Pins are supported — profiles, boards and search pages are not.",
  REDIRECT_REJECTED: "The short link did not lead to a public Pinterest Pin.",
  PIN_NOT_PUBLIC: "Sign-in-only, private or deleted Pins cannot be accessed.",
  MEDIA_NOT_FOUND: "The Pin may be deleted, or it has no downloadable image or video.",
  UNSUPPORTED_MEDIA: "This media format is not supported yet.",
  RATE_LIMITED: "Please wait a few seconds before trying again.",
  UPSTREAM_BLOCKED: "Pinterest may be temporarily unreachable — retry in a moment.",
  RESOLVE_TIMEOUT: "The request took too long — retry in a moment.",
  NETWORK: "Check your internet connection.",
};

export default function ErrorState({
  code,
  message,
  onRetry,
  onReset,
}: {
  code: string;
  message: string;
  onRetry: () => void;
  onReset: () => void;
}) {
  const hint = HINTS[code];
  return (
    <section
      role="alert"
      aria-live="assertive"
      className="rounded-xl border border-red-200 bg-red-50 p-4 sm:p-5"
    >
      <div className="flex items-start gap-3">
        <Image
          src="/icons/error.png"
          alt=""
          width={22}
          height={22}
          aria-hidden="true"
          className="mt-0.5 shrink-0"
        />
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-gray-900">{message}</h2>
          {hint && <p className="mt-1 text-sm text-gray-600">{hint}</p>}
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex min-h-11 items-center rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              Try again
            </button>
            <button
              type="button"
              onClick={onReset}
              className="inline-flex min-h-11 items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Check another link
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
