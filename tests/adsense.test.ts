import { afterEach, describe, expect, it } from "vitest";
import { GET } from "@/app/ads.txt/route";
import {
  getAdSenseClient,
  getAdSensePublisherId,
  getAdsTxtRecord,
  isAdSenseServingEnabled,
} from "@/lib/adsense";

const originalClient = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT;
const originalPublisher = process.env.ADSENSE_PUBLISHER_ID;

afterEach(() => {
  if (originalClient === undefined) {
    delete process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT;
  } else {
    process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT = originalClient;
  }

  if (originalPublisher === undefined) {
    delete process.env.ADSENSE_PUBLISHER_ID;
  } else {
    process.env.ADSENSE_PUBLISHER_ID = originalPublisher;
  }
});

describe("AdSense configuration", () => {
  it("accepts only canonical public identifiers", () => {
    expect(getAdSenseClient("ca-pub-1234567890123456")).toBe(
      "ca-pub-1234567890123456",
    );
    expect(getAdSenseClient("pub-1234567890123456")).toBeUndefined();
    expect(getAdSenseClient("ca-pub-placeholder")).toBeUndefined();

    expect(
      getAdSensePublisherId(undefined, "ca-pub-1234567890123456"),
    ).toBe("pub-1234567890123456");
    expect(isAdSenseServingEnabled("true")).toBe(true);
    expect(isAdSenseServingEnabled("TRUE")).toBe(true);
    expect(isAdSenseServingEnabled("1")).toBe(false);
    expect(isAdSenseServingEnabled(undefined)).toBe(false);
  });

  it("does not publish a placeholder ads.txt record", async () => {
    delete process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT;
    delete process.env.ADSENSE_PUBLISHER_ID;

    expect(getAdsTxtRecord()).toBeUndefined();
    expect((await GET()).status).toBe(404);
  });

  it("publishes Google's exact authorized-seller format", async () => {
    process.env.ADSENSE_PUBLISHER_ID = "pub-1234567890123456";

    expect(getAdsTxtRecord()).toBe(
      "google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0",
    );

    const response = await GET();
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/plain");
    expect(await response.text()).toBe(
      "google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0\n",
    );
  });
});
