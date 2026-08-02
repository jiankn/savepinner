import Image from "next/image";

/**
 * SavePinner logo — raster artwork preserves the selected B concept's depth.
 */
export default function Logo({ size = 30 }: { size?: number }) {
  const wordmarkHeight = 21;
  const wordmarkWidth = Math.round(wordmarkHeight * (1312 / 218));

  return (
    <span className="inline-flex items-center gap-[7px]">
      <Image
        src="/brand/savepinner-mark.png"
        alt=""
        width={size}
        height={size}
        className="shrink-0"
      />
      <Image
        src="/brand/savepinner-wordmark.png"
        alt="SavePinner"
        width={wordmarkWidth}
        height={wordmarkHeight}
        className="h-auto object-contain"
      />
    </span>
  );
}
