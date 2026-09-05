/**
 * Push URLs to IndexNow so Bing, Yandex, Seznam and Naver recrawl them.
 *
 * Google does not consume IndexNow — Search Console's URL Inspection stays the
 * only lever there. Nothing here replaces that step.
 *
 * Usage:
 *   node scripts/indexnow-submit.mjs                 # every URL in the sitemap
 *   node scripts/indexnow-submit.mjs <url> [url...]  # only the URLs given
 *   node scripts/indexnow-submit.mjs --dry-run       # print the payload, send nothing
 */

import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://savepinner.com").replace(/\/+$/, "");
const HOST = new URL(SITE).host;
const ENDPOINT = "https://api.indexnow.org/indexnow";

/**
 * The key lives in public/ as <key>.txt so the deployed site serves it at the
 * document root, which is where IndexNow looks to prove we own the host.
 */
async function readKey() {
  const entries = await readdir(path.join(ROOT, "public"));
  const keyFiles = entries.filter((name) => /^[0-9a-f]{8,128}\.txt$/i.test(name));

  if (keyFiles.length !== 1) {
    throw new Error(
      `expected exactly one IndexNow key file in public/, found ${keyFiles.length}: ${keyFiles.join(", ") || "none"}`,
    );
  }

  const key = path.basename(keyFiles[0], ".txt");
  const contents = (await readFile(path.join(ROOT, "public", keyFiles[0]), "utf8")).trim();

  if (contents !== key) {
    throw new Error(`public/${keyFiles[0]} must contain exactly "${key}", found "${contents}"`);
  }

  return key;
}

async function sitemapUrls() {
  const response = await fetch(`${SITE}/sitemap.xml`);
  if (!response.ok) {
    throw new Error(`sitemap fetch failed: HTTP ${response.status}`);
  }
  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
}

/** A submission containing a foreign host is rejected wholesale with 422. */
function assertSameHost(urls) {
  const foreign = urls.filter((url) => new URL(url).host !== HOST);
  if (foreign.length > 0) {
    throw new Error(`refusing to submit URLs outside ${HOST}: ${foreign.join(", ")}`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const explicit = args.filter((arg) => !arg.startsWith("--"));

  const key = await readKey();
  const keyLocation = `${SITE}/${key}.txt`;

  // Verify the deployed site actually serves the key before spending a submission.
  const keyCheck = await fetch(keyLocation);
  const servedKey = keyCheck.ok ? (await keyCheck.text()).trim() : null;
  if (servedKey !== key) {
    throw new Error(
      `${keyLocation} does not serve the key (HTTP ${keyCheck.status}, body "${servedKey ?? ""}"). Deploy first.`,
    );
  }
  console.log(`key verified at ${keyLocation}`);

  const urlList = explicit.length > 0 ? explicit : await sitemapUrls();
  assertSameHost(urlList);

  const payload = { host: HOST, key, keyLocation, urlList };
  console.log(`submitting ${urlList.length} URL(s) to ${ENDPOINT}`);
  for (const url of urlList) console.log(`  ${url}`);

  if (dryRun) {
    console.log("\n--dry-run: nothing sent");
    return;
  }

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  const body = await response.text();

  // 200 accepted, 202 accepted with the key still being validated.
  console.log(`\nHTTP ${response.status} ${response.statusText}${body ? ` — ${body}` : ""}`);
  if (response.status !== 200 && response.status !== 202) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(`indexnow: ${error.message}`);
  process.exitCode = 1;
});
