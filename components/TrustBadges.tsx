import Image from "next/image";
import type { UiMessages } from "@/lib/i18n";

const BADGE_ICONS = [
  "/icons/ssl.png",
  "/icons/no-login.png",
  "/icons/no-watermark.png",
  "/icons/free.png",
] as const;

export default function TrustBadges({ t }: { t: UiMessages }) {
  const badges = [
    { label: t.badges.ssl, icon: BADGE_ICONS[0] },
    { label: t.badges.noLogin, icon: BADGE_ICONS[1] },
    { label: t.badges.noWatermark, icon: BADGE_ICONS[2] },
    { label: t.badges.free, icon: BADGE_ICONS[3] },
  ];

  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4">
      {badges.map((badge) => (
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
