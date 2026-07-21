/**
 * Supported / not supported link types — PRD §8.2 (Supported URLs section).
 */

const SUPPORTED = [
  "Standard Pin links — https://www.pinterest.com/pin/123456789/",
  "Regional Pinterest domains (e.g. pinterest.co.uk, pinterest.de) /pin/{id}/ links",
  "Short links — https://pin.it/abc123 (followed safely, up to 3 redirects)",
];

const NOT_SUPPORTED = [
  "Private Pins and private Boards (sign-in-only content)",
  "Whole-board or profile batch downloads",
  "Feed, search result and profile pages",
  "Anything that is not a direct Pin link",
];

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 shrink-0 text-brand">
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 shrink-0 text-gray-400">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export default function SupportedUrls() {
  return (
    <section aria-labelledby="supported-urls" className="mx-auto w-full max-w-5xl px-4 py-12">
      <h2 id="supported-urls" className="text-center text-2xl font-bold tracking-tight">
        Supported links
      </h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Supported</h3>
          <ul className="mt-3 space-y-2.5">
            {SUPPORTED.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-gray-700">
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Not supported</h3>
          <ul className="mt-3 space-y-2.5">
            {NOT_SUPPORTED.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-gray-700">
                <CrossIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
