import Link from "next/link";

/**
 * Short privacy statement — PRD §8.2 (Privacy section) and §10.4.
 */
export default function PrivacyNote() {
  return (
    <section aria-labelledby="privacy-note" className="bg-gray-50">
      <div className="mx-auto w-full max-w-3xl px-4 py-12 text-center">
        <h2 id="privacy-note" className="text-2xl font-bold tracking-tight">
          Your privacy, in short
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-gray-600">
          No accounts, no sign-up. The links you paste are used only to resolve that request and are
          not stored long-term. Downloaded files are streamed through and never kept on our servers.
          IP addresses are used briefly for rate limiting and abuse prevention only.
        </p>
        <Link
          href="/privacy/"
          className="mt-4 inline-block text-sm font-medium text-brand hover:underline"
        >
          Read the full Privacy Policy →
        </Link>
      </div>
    </section>
  );
}
