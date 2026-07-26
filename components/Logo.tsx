import Image from "next/image";

/**
 * SavePinner logo — the selected D "Aurora Ribbon S" identity.
 * The painted mark is intentionally distinct from Pinterest's letterform logo.
 */
export default function Logo({ size = 46 }: { size?: number }) {
  const width = Math.round(size * (670 / 160));

  return (
    <span className="inline-flex items-center">
      <Image
        src="/brand/savepinner-logo.png"
        alt="SavePinner"
        width={width}
        height={size}
        className="h-auto object-contain"
      />
    </span>
  );
}
