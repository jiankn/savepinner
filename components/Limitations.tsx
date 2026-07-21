/**
 * Limitations — PRD §8.2: honest boundaries on availability, permissions,
 * formats and quality. No "Original quality" or "no watermark" promises.
 */

const LIMITS = [
  "Availability depends on Pinterest: if a Pin is deleted, private or region-locked, we cannot fetch it.",
  "We show the highest resolution we can verify — we do not claim unverifiable “original” files.",
  "Download links are valid for 5 minutes; resolve the Pin again if a link expires.",
  "One Pin at a time — boards, profiles and batch downloads are not supported.",
  "No editing, transcoding or watermark removal — files are delivered as published.",
  "Large videos (over 250 MB) and images (over 25 MB) are rejected to keep the service reliable.",
];

export default function Limitations() {
  return (
    <section aria-labelledby="limitations" className="mx-auto w-full max-w-5xl px-4 py-12">
      <h2 id="limitations" className="text-center text-2xl font-bold tracking-tight">
        Honest limitations
      </h2>
      <ul className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
        {LIMITS.map((item) => (
          <li key={item} className="flex gap-2 rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 shrink-0 text-gray-400">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4m0 4h.01" />
            </svg>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
