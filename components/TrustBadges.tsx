import Image from "next/image";

const BADGES = [
  {
    label: "SSL Secured",
    icon: "/icons/ssl.png",
  },
  {
    label: "No Login Required",
    icon: "/icons/no-login.png",
  },
  {
    label: "No Watermark",
    icon: "/icons/no-watermark.png",
  },
  {
    label: "100% Free",
    icon: "/icons/free.png",
  },
];

export default function TrustBadges() {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4" aria-label="Trust badges">
      {BADGES.map((badge) => (
        <li key={badge.label} className="flex items-center justify-center gap-3 text-sm font-semibold text-gray-800">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blush">
            <Image src={badge.icon} alt="" width={28} height={28} aria-hidden="true" />
          </span>
          <span>{badge.label}</span>
        </li>
      ))}
    </ul>
  );
}
