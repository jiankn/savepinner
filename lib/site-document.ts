import type { Metadata } from "next";
import { getAdSenseClient } from "@/lib/adsense";
import { OG_CARD } from "@/lib/seo";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://savepinner.com").replace(/\/+$/, "");
const title = "SavePinner — Free Pinterest Downloader";
const description =
  "Free Pinterest downloader for images, videos, GIFs and Story Pins. No login, no watermark, original HD quality.";
const adsenseClient = getAdSenseClient();

/**
 * Site-level fallback shared by every root layout.
 *
 * Route metadata still owns each page's title, description, canonical and
 * localized social copy. Keeping the fallback in one module prevents the
 * English and localized document layouts from drifting apart.
 */
export const SITE_METADATA: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "SavePinner",
    title,
    description,
    images: [OG_CARD],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [OG_CARD],
  },
  ...(adsenseClient
    ? { other: { "google-adsense-account": adsenseClient } }
    : {}),
};
