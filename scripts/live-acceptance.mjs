const baseUrl = (process.env.ACCEPTANCE_BASE_URL ?? "http://127.0.0.1:3000").replace(/\/+$/, "");

const samples = [
  { label: "image-original", url: "https://www.pinterest.com/pin/424605071126047814/", type: "image" },
  { label: "image-renditions", url: "https://www.pinterest.com/pin/989243874418277815/", type: "image" },
  { label: "image-regional", url: "https://pinterest.de/pin/145804106683758606/", type: "image" },
  { label: "video-1", url: "https://www.pinterest.com/pin/68746366275/", type: "video" },
  { label: "video-2", url: "https://www.pinterest.com/pin/500673683570108768/", type: "video" },
  { label: "video-3", url: "https://www.pinterest.com/pin/773985885988416925/", type: "video" },
  { label: "gif-1", url: "https://www.pinterest.com/pin/441282463488355461/", type: "gif" },
  { label: "gif-2", url: "https://www.pinterest.com/pin/33425222224420969/", type: "gif" },
  { label: "pin.it-short", url: "https://pin.it/55xlJSNm5" },
  {
    label: "slugged-pin",
    url: "https://www.pinterest.com/pin/roasted-pineapple-chicken-video--68746366275/",
    type: "video",
  },
];

const allowedMediaHosts = new Set(["i.pinimg.com", "v.pinimg.com", "v1.pinimg.com"]);
const results = [];

for (const sample of samples) {
  const startedAt = Date.now();
  try {
    const response = await fetch(`${baseUrl}/api/resolve`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ url: sample.url }),
      signal: AbortSignal.timeout(45_000),
    });
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(`${response.status} ${payload?.error?.code ?? "UNKNOWN_ERROR"}`);
    }
    if (!Array.isArray(payload.variants) || payload.variants.length === 0) {
      throw new Error("response has no downloadable variants");
    }
    if (sample.type && payload.type !== sample.type) {
      throw new Error(`expected ${sample.type}, received ${payload.type}`);
    }
    for (const variant of payload.variants) {
      const host = new URL(variant.url).hostname.toLowerCase();
      if (!allowedMediaHosts.has(host)) throw new Error(`unexpected media host ${host}`);
    }
    results.push({
      sample: sample.label,
      status: "PASS",
      type: payload.type,
      variants: payload.variants.length,
      durationMs: Date.now() - startedAt,
    });
  } catch (error) {
    results.push({
      sample: sample.label,
      status: "FAIL",
      type: "-",
      variants: 0,
      durationMs: Date.now() - startedAt,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

console.table(results);

const failures = results.filter((result) => result.status === "FAIL");
if (failures.length > 0) {
  console.error(`${failures.length}/${samples.length} live Pinterest acceptance cases failed.`);
  process.exitCode = 1;
} else {
  console.log(`${samples.length}/${samples.length} live Pinterest acceptance cases passed.`);
}
