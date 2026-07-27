import Script from "next/script";
import {
  getAdSenseClient,
  isAdSenseServingEnabled,
} from "@/lib/adsense";

/**
 * Disabled unless a valid public client id and the explicit serving switch are
 * configured. Google Privacy & Messaging (or another Google-certified CMP)
 * must be live before the switch is enabled in production.
 */
export default function AdSenseScript() {
  const client = getAdSenseClient();
  if (!client || !isAdSenseServingEnabled()) return null;

  return (
    <Script
      id="google-adsense"
      async
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      strategy="afterInteractive"
    />
  );
}
