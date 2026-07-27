import { getAdsTxtRecord } from "@/lib/adsense";

export const dynamic = "force-dynamic";

const headers = {
  "Content-Type": "text/plain; charset=utf-8",
  "Cache-Control": "public, max-age=3600",
};

export function GET() {
  const record = getAdsTxtRecord();

  if (!record) {
    // A real 404 is safer than publishing a fake seller id that Google may
    // crawl and cache. Configure the account id, then redeploy.
    return new Response("AdSense publisher ID is not configured.\n", {
      status: 404,
      headers,
    });
  }

  return new Response(`${record}\n`, { status: 200, headers });
}
