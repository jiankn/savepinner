/**
 * Trust badges — PRD §8.3.5. Only badges with verifiable evidence are shown:
 * "Community Trusted" and "Malware Free" stay hidden until there is real,
 * verifiable backing. Wraps on mobile.
 */

const BADGES = [
  {
    label: "SSL Secure",
    icon: (
      <path d="M12 3 5 6v5c0 4.4 3 8.4 7 10 4-1.6 7-5.6 7-10V6l-7-3Zm-2.2 9.6-1.4-1.4-1.1 1.1 2.5 2.5 4.5-4.5-1.1-1.1-3.4 3.4Z" />
    ),
  },
  {
    label: "No Login Required",
    icon: (
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.3 0-8 1.7-8 4v2h16v-2c0-2.3-4.7-4-8-4Z" />
    ),
  },
];

export default function TrustBadges() {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2" aria-label="Trust badges">
      {BADGES.map((badge) => (
        <li key={badge.label} className="flex items-center gap-1.5 text-sm text-gray-600">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="text-brand"
          >
            {badge.icon}
          </svg>
          {badge.label}
        </li>
      ))}
    </ul>
  );
}
