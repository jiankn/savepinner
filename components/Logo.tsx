import Image from "next/image";

/**
 * SavePinner logo — the selected B motion-link identity.
 */
export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5" role="img" aria-label="SavePinner">
      <Image
        src="/brand/savepinner-mark.svg"
        alt=""
        width={size}
        height={size}
        className="shrink-0"
      />
      <span
        aria-hidden="true"
        className="font-bold tracking-[-0.045em] text-brand-ink"
        style={{ fontSize: Math.round(size * 0.68), lineHeight: 1 }}
      >
        Save<span className="text-brand">Pinner</span>
      </span>
    </span>
  );
}
