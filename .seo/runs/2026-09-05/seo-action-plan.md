# SavePinner Google first-page goal

Date: 2026-09-05, Asia/Shanghai. Status: active; first-page outcome not achieved in this run.

## Success criteria

- Primary: `pinterest image downloader`, Google United States / English, natural results on page 1 for `https://savepinner.com/`.
- Secondary: commercially relevant, non-brand queries with matching existing landing pages. Record query, country, language, timestamp, page URL and organic position; report these separately from the primary goal.
- A branded query, `site:` query, search-tool retrieval order, or old GSC average position does not establish current first-page success.

## Current evidence

Five TabAPI `GET /search/google` requests, page 1 only, authorized by the user for an expected total of 5 credits. No traffic, keyword metrics, further result pages or other paid endpoints were called. The API responses do not include a billed-credit field, so actual account debit is not independently confirmed.

| Query | Market | Organic results returned | SavePinner found | Request ID |
| --- | --- | ---: | --- | --- |
| pinterest image downloader | US / en | 8 | No | req_86315654577722165 |
| download pinterest thumbnail | US / en | 9 | No | req_86315661758176524 |
| descargar imágenes de pinterest sin marca de agua | ES / es | 9 | No | req_86315661774528509 |
| baixar video do pinterest | BR / pt | 7 | No | req_86315661864384596 |
| scaricare video da pinterest | IT / it | 10 | No | req_86315661762765377 |

Raw responses: `serp-*.json`. These establish absence from the returned first-page samples, not exact ranks greater than 10. No immediate after-deployment ranking change is claimed.

Latest available GSC export is still 2026-08-22, covering 2026-07-26 through 2026-08-19: 613 property impressions and 5 clicks; English homepage 117 impressions and position 43.26. Query and page tables are separate and do not prove query-page attribution. Earlier automatically generated cluster mappings include local marketing/tmp files and must not be used as public-page mappings. Use actual sitemap URLs instead.

The existing browser connections timed out for both Edge and the in-app browser. Latest Search Console performance and URL inspection could not be read. No Search Console API integration was found in the project scripts. No new sitemap submission or indexing request is claimed.

## Completed diagnosis and implementation

1. Production crawl audit: 52 sitemap pages, all HTTP 200, matching self-canonicals, one H1, unique titles and descriptions, no detected noindex, reciprocal hreflang and incoming internal links. No same-origin links outside the sitemap were found. Missing route returns 404; robots allows public pages and disallows `/api/`. Evidence: `before/indexing-audit.json`.
2. Existing commit `b6f381c` had successfully deployed through Vercel before this run.
3. Product defect: two historical video samples return a targeted Pinterest Relay `PinNotFound` response with HTTP 200. SavePinner nevertheless returned an image using fallback metadata. Reject the missing target with `MEDIA_NOT_FOUND` before fallback extraction; ignore Relay records explicitly belonging to other Pins. Preserve legacy opaque Relay keys. Added four regression cases.
4. Homepage content: give an actionable thumbnail/full-size workflow, explain that Original is conditional on availability, clarify creator watermarks remain, and remove the unsupported promise of a forthcoming board downloader. Title, H1, URLs and language architecture are retained.
5. Live acceptance: replace the deleted regional video sample with a currently public video on the regional host, turn the verified missing Idea Pin into a negative case, and space requests below the existing 10/minute budget. The initial burst's two 429 failures were caused by the test itself, not treated as ranking blockers.

## Next priorities

1. Obtain fresh Search Console exports for the latest 28 days and previous 28 days, plus query/page/country filtering for the homepage and existing acquisition pages. This determines whether August changes gained impressions and which queries are nearest page 1 now.
2. Prioritize existing pages with meaningful impressions and positions 8–20. Historical candidates: Spanish image query (6 impressions at 10), thumbnail query (2 at 9.5), Android page (43 impressions at 24.93). These are low-confidence historical leads, not current wins.
3. Review Italian and Portuguese video pages against query-specific data after the 2026-08-22 changes; keep keyword variants consolidated. Do not keep rewriting pages daily without new evidence.
4. Audit existing relevant backlink assets for actual Google discovery and referral value before expanding the substantial existing portfolio. Every new controllable backlink must retain the exact user-required anchor `Pinterest image downloader` and href `https://savepinner.com`; maintain the portfolio ledger.
5. Recheck rankings after Google has had time to recrawl, using fresh GSC or separately authorized SERP calls. No additional paid calls or recurring purchases are authorized by the five-call selection.

Ranking depends on Google and competing pages. Technical validation and deployment are intermediate work, not the user's completed goal.
