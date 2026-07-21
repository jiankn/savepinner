"use client";

/**
 * Core tool — PRD §6.1/§6.3 and §8.3.4.
 * Single task bar: URL input + Paste + Download. Staged progress
 * 10 → 35 → 65 → 100 (never 100 before the result is ready), results expand
 * in place below the form, no page navigation, no auto-download.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import type { ResolveSuccess } from "@/lib/api-types";
import ErrorState from "./ErrorState";
import ResultCard from "./ResultCard";

type Phase = "idle" | "loading" | "done" | "error";

interface UiError {
  code: string;
  message: string;
}

const CLIENT_INVALID_MSG = "Please enter a valid Pinterest Pin link.";

function looksLikePinterestUrl(value: string): boolean {
  return /^https:\/\/(pin\.it\/[\w-]+|([\w-]+\.)*pinterest\.[a-z.]+)/i.test(value);
}

export default function DownloaderForm() {
  const [url, setUrl] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ResolveSuccess | null>(null);
  const [error, setError] = useState<UiError | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const timersRef = useRef<number[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const resolve = useCallback(async () => {
    const value = url.trim();
    setNotice(null);
    if (!value) {
      setError({ code: "EMPTY", message: "Please paste a Pinterest link." });
      setPhase("error");
      return;
    }
    if (!looksLikePinterestUrl(value)) {
      setError({ code: "INVALID_URL", message: CLIENT_INVALID_MSG });
      setPhase("error");
      return;
    }

    clearTimers();
    setError(null);
    setResult(null);
    setPhase("loading");
    setProgress(10);
    // Staged feedback only — it never reaches 100 before the real result.
    timersRef.current.push(window.setTimeout(() => setProgress(35), 500));
    timersRef.current.push(window.setTimeout(() => setProgress(65), 1600));

    try {
      const res = await fetch("/api/resolve/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url: value }),
      });
      const data = (await res.json().catch(() => null)) as
        | (ResolveSuccess & { error?: { code: string; message: string } })
        | null;
      clearTimers();
      if (!res.ok || !data || "error" in data) {
        setError({
          code: data?.error?.code ?? "INTERNAL_ERROR",
          message: data?.error?.message ?? "The service is temporarily unavailable.",
        });
        setPhase("error");
        setProgress(0);
        return;
      }
      setProgress(100);
      setResult(data);
      setPhase("done");
    } catch {
      clearTimers();
      setError({
        code: "NETWORK",
        message: "Network error — check your connection and try again.",
      });
      setPhase("error");
      setProgress(0);
    }
  }, [url, clearTimers]);

  const onPaste = useCallback(async () => {
    setNotice(null);
    if (typeof navigator === "undefined" || !navigator.clipboard?.readText) {
      setNotice("Clipboard access is not available in this browser — tap the field and paste manually.");
      return;
    }
    try {
      const text = await navigator.clipboard.readText();
      if (text.trim()) {
        setUrl(text.trim());
        setNotice("Pasted from clipboard.");
        inputRef.current?.focus();
      } else {
        setNotice("Your clipboard is empty — copy a Pin link first.");
      }
    } catch {
      setNotice("Clipboard permission was denied — paste manually (long-press the field or press Ctrl+V).");
    }
  }, []);

  const reset = useCallback(() => {
    clearTimers();
    setUrl("");
    setResult(null);
    setError(null);
    setNotice(null);
    setProgress(0);
    setPhase("idle");
    inputRef.current?.focus();
  }, [clearTimers]);

  const loading = phase === "loading";

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void resolve();
        }}
        className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4"
      >
        <div className="flex flex-col gap-2 sm:flex-row">
          <label htmlFor="pin-url" className="sr-only">
            Pinterest Pin URL
          </label>
          <input
            ref={inputRef}
            id="pin-url"
            name="url"
            type="url"
            inputMode="url"
            autoComplete="off"
            spellCheck={false}
            placeholder="Paste a Pinterest Pin link here…"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading}
            className="h-12 min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 text-base text-gray-900 placeholder:text-gray-400 focus:border-brand disabled:opacity-60"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => void onPaste()}
              disabled={loading}
              aria-label="Paste link from clipboard"
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60 sm:flex-none"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="8" y="2" width="8" height="4" rx="1" />
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              </svg>
              Paste
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-70 sm:flex-none"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
              </svg>
              {loading ? "Resolving…" : "Download"}
            </button>
          </div>
        </div>

        {notice && (
          <p role="status" className="mt-2 text-xs text-gray-500">
            {notice}
          </p>
        )}

        {loading && (
          <div className="mt-3" role="status">
            <div
              className="h-2 w-full overflow-hidden rounded-full bg-red-100"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Resolving progress"
            >
              <div
                className="h-full rounded-full bg-brand transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-gray-500" aria-live="polite">
              Resolving the Pin link… {progress}%
            </p>
          </div>
        )}
      </form>

      <p className="mt-3 text-center text-xs leading-relaxed text-gray-500">
        Only download content you own or have permission to use. SavePinner does not host Pinterest
        content and is not an official Pinterest product.
      </p>

      {phase === "done" && result && (
        <div className="mt-4">
          <ResultCard result={result} onReset={reset} />
        </div>
      )}
      {phase === "error" && error && (
        <div className="mt-4">
          <ErrorState
            code={error.code}
            message={error.message}
            onRetry={() => void resolve()}
            onReset={reset}
          />
        </div>
      )}
    </div>
  );
}
