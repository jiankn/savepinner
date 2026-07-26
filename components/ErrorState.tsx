"use client";

import Image from "next/image";
import type { UiMessages } from "@/lib/i18n";

/**
 * Error state — PRD §6.4 (FR-008): specific message per error code plus an
 * actionable next step ("try again" / "check the link").
 */

export default function ErrorState({
  code,
  message,
  t,
  onRetry,
  onReset,
}: {
  code: string;
  message: string;
  t: UiMessages;
  onRetry: () => void;
  onReset: () => void;
}) {
  const hint = t.error.hints[code];
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
              {t.error.tryAgain}
            </button>
            <button
              type="button"
              onClick={onReset}
              className="inline-flex min-h-11 items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              {t.error.checkAnother}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
