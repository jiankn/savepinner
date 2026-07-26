"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ResolveResponse } from "@/lib/api-types";
import ErrorState from "./ErrorState";
import ResultCard from "./ResultCard";

type Phase = "idle" | "loading" | "done" | "error";

const PROGRESS_STEPS = ["Parsing link...", "Extracting media...", "Preparing download..."];

function looksLikePinterestUrl(value: string): boolean {
  return /^https:\/\/(?:pin\.it\/|(?:[\w-]+\.)*pinterest\.[a-z.]+\/pin\/)/i.test(value);
}

export default function DownloaderForm({
  placeholder = "Paste your Pinterest link here...",
}: {
  placeholder?: string;
}) {
  const [url, setUrl] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [progressStep, setProgressStep] = useState(0);
  const [result, setResult] = useState<ResolveResponse | null>(null);
  const [error, setError] = useState<{ code: string; message: string } | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const timersRef = useRef<number[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
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
      setError({ code: "INVALID_URL", message: "Please enter a valid Pinterest Pin link." });
      setPhase("error");
      return;
    }

    clearTimers();
    setError(null);
    setResult(null);
    setPhase("loading");
    setProgressStep(0);
    timersRef.current.push(window.setTimeout(() => setProgressStep(1), 500));
    timersRef.current.push(window.setTimeout(() => setProgressStep(2), 1_500));

    try {
      const response = await fetch("/api/resolve/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url: value }),
      });
      const data = (await response.json().catch(() => null)) as
        | (ResolveResponse & { error?: { code: string; message: string } })
        | null;
      clearTimers();
      if (!response.ok || !data || data.error) {
        setError({
          code: data?.error?.code ?? "INTERNAL_ERROR",
          message: data?.error?.message ?? "The service is temporarily unavailable.",
        });
        setPhase("error");
        return;
      }
      setProgressStep(2);
      setResult(data);
      setPhase("done");
    } catch {
      clearTimers();
      setError({ code: "NETWORK", message: "Network error — check your connection and try again." });
      setPhase("error");
    }
  }, [clearTimers, url]);

  const onPaste = useCallback(async () => {
    setNotice(null);
    if (!navigator.clipboard?.readText) {
      setNotice("Clipboard access is unavailable — paste the link manually.");
      return;
    }
    try {
      const text = (await navigator.clipboard.readText()).trim();
      if (!text) {
        setNotice("Your clipboard is empty — copy a Pin link first.");
        return;
      }
      setUrl(text);
      setNotice("Pasted from clipboard.");
      inputRef.current?.focus();
    } catch {
      setNotice("Clipboard permission was denied — paste the link manually.");
    }
  }, []);

  const reset = useCallback(() => {
    clearTimers();
    setUrl("");
    setResult(null);
    setError(null);
    setNotice(null);
    setProgressStep(0);
    setPhase("idle");
    inputRef.current?.focus();
  }, [clearTimers]);

  const loading = phase === "loading";

  return (
    <div className="w-full">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void resolve();
        }}
        className="rounded-2xl bg-white p-2.5 shadow-[0_8px_24px_rgba(83,0,17,0.14)] sm:p-3"
      >
        <div className="flex flex-col gap-2 sm:flex-row">
          <label htmlFor="pin-url" className="sr-only">
            Pinterest link
          </label>
          <input
            ref={inputRef}
            id="pin-url"
            name="url"
            type="url"
            inputMode="url"
            autoComplete="off"
            spellCheck={false}
            placeholder={placeholder}
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            disabled={loading}
            className="h-14 w-full min-w-0 rounded-xl border border-rose-100 bg-brand-blush/70 px-4 text-base text-brand-ink placeholder:text-gray-600 focus:border-brand focus:bg-white focus:outline-none disabled:opacity-60 sm:flex-1"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => void onPaste()}
              disabled={loading}
              className="inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-200 disabled:opacity-60 sm:flex-none"
            >
              <Image src="/icons/paste.png" alt="" width={19} height={19} aria-hidden="true" />
              Paste
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-sm font-semibold text-white shadow-[0_4px_8px_rgba(139,0,21,0.22)] transition-colors hover:bg-brand-dark disabled:opacity-70 sm:flex-none"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white" aria-hidden="true">
                <Image src="/icons/download.png" alt="" width={19} height={19} />
              </span>
              {loading ? "Working..." : "Download"}
            </button>
          </div>
        </div>

        {notice && <p className="mt-2 text-left text-xs text-gray-600" role="status">{notice}</p>}
      </form>

      <p className="mt-4 text-center text-xs font-medium text-red-950/75">
        Supports: pinterest.com/pin/ · pin.it short links · All country domains
      </p>

      {loading && (
        <div className="mx-auto mt-5 max-w-xl" role="status" aria-live="polite">
          <div className="flex gap-1.5" aria-hidden="true">
            {PROGRESS_STEPS.map((step, index) => (
              <span
                key={step}
                className={`h-1.5 flex-1 rounded-full ${index <= progressStep ? "bg-brand" : "bg-red-200"}`}
              />
            ))}
          </div>
          <p className="mt-2 text-sm font-medium text-red-950">{PROGRESS_STEPS[progressStep]}</p>
        </div>
      )}

      {phase === "done" && result && (
        <div className="mt-6"><ResultCard result={result} download={result.download} onReset={reset} /></div>
      )}
      {phase === "error" && error && (
        <div className="mt-6">
          <ErrorState code={error.code} message={error.message} onRetry={() => void resolve()} onReset={reset} />
        </div>
      )}
    </div>
  );
}
