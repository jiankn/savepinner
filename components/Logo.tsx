import Image from "next/image";

/**
 * SavePinner logo — raster artwork preserves the selected B concept's depth.
 */
export default function Logo({ size = 40 }: { size?: number }) {
  const width = Math.round(size * (1811 / 411));

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
