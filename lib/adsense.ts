const ADSENSE_CLIENT_PATTERN = /^ca-pub-\d{16}$/;
const ADSENSE_PUBLISHER_PATTERN = /^pub-\d{16}$/;

/**
 * AdSense identifiers are public values, but validating them prevents a typo
 * from shipping a broken verification tag or ads.txt record.
 */
export function getAdSenseClient(
  value = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT,
): string | undefined {
  const client = value?.trim();
  return client && ADSENSE_CLIENT_PATTERN.test(client) ? client : undefined;
}

export function isAdSenseServingEnabled(
  value = process.env.ENABLE_ADSENSE,
): boolean {
  return value?.trim().toLowerCase() === "true";
}

export function getAdSensePublisherId(
  value = process.env.ADSENSE_PUBLISHER_ID,
  client = getAdSenseClient(),
): string | undefined {
  const publisher = value?.trim() || client?.replace(/^ca-/, "");
  return publisher && ADSENSE_PUBLISHER_PATTERN.test(publisher)
    ? publisher
    : undefined;
}

export function getAdsTxtRecord(): string | undefined {
  const publisher = getAdSensePublisherId();
  return publisher
    ? `google.com, ${publisher}, DIRECT, f08c47fec0942fa0`
    : undefined;
}
