/**
 * SavePinner logo — original SVG mark (map-pin shape with a download cue).
 * Deliberately NOT the Pinterest "P": no brand affiliation may be implied
 * (PRD §8.3.3 / §13).
 */
export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        role="img"
        aria-label="SavePinner logo"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="32" height="32" rx="8" fill="#e60023" />
        <path
          d="M16 5.5a7 7 0 0 0-7 7c0 5.25 5.1 10.7 6.4 11.9a.9.9 0 0 0 1.2 0c1.3-1.2 6.4-6.65 6.4-11.9a7 7 0 0 0-7-7Z"
          fill="#ffffff"
        />
        <path
          d="M16 8.5v6.2m0 0-2.4-2.4M16 14.7l2.4-2.4"
          stroke="#e60023"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span className="text-lg font-bold tracking-tight text-gray-900">
        Save<span className="text-brand">Pinner</span>
      </span>
    </span>
  );
}
