# SavePinner SEO change report

- Run date: 2026-08-15 (Asia/Shanghai)
- GSC property: `sc-domain:savepinner.com`
- Evidence window: 2026-07-16 to 2026-08-12 (`final`, Web)
- Baseline: 356 impressions, 4 clicks, 1.12% CTR, average position 31.17
- Detailed query-page input: 83 rows, 80 queries, 12 pages, 194 visible impressions
- Deployment: not performed

## Change 1: English image homepage

- Page: `https://savepinner.com/`
- Classification: `IMPROVE`
- GSC evidence: 79 page-level impressions at position 38.19; `pinterest image downloader` had 6 visible impressions at position 57.33, while `download pinterest thumbnail` had 2 at position 9.5.
- Before title: `Free Pinterest Image Downloader — HD, No Watermark`
- After title: unchanged
- Before H1: `Free Pinterest Image Downloader`
- After H1: unchanged
- Canonical/hreflang: unchanged
- Changes: added four original guide sections covering original-versus-thumbnail renditions, actual formats and quality, valid public Pin links, missing-image causes, access limits, and responsible saving.
- Internal links: the existing device FAQ now links naturally to the iPhone and Android guides.
- Last modified: 2026-08-15
- Risk: low; no URL or snippet rewrite, but rankings may remain volatile because the site is new.
- Confidence: medium.

## Change 2: Italian video page

- Page: `https://savepinner.com/it/scaricare-video-pinterest/`
- Classification: `IMPROVE`
- GSC evidence: 55 page-level impressions at position 40.38; 53 visible query-page impressions, led by `scarica/scaricare video Pinterest` and `senza filigrana` variants.
- Before title: `Scaricare Video Pinterest Gratis in Qualità HD`
- After title: unchanged
- Before H1: `Scaricare video Pinterest in HD`
- After H1: unchanged
- Canonical/hreflang/lang: unchanged (`it`).
- Changes: added four Italian-specific guide sections covering no added watermark versus creator-applied marks, real MP4/quality availability, HLS/DASH limits, correct mobile share links, public-access checks, cover-image cases, and failure troubleshooting.
- Last modified: 2026-08-15
- Risk: low; existing intent and routing are preserved.
- Confidence: medium.

## Change 3: iPhone and Android internal links

- Target pages:
  - `https://savepinner.com/pinterest-downloader-android/` — 33 impressions, 1 click, position 14.30.
  - `https://savepinner.com/pinterest-downloader-iphone/` — 30 impressions, position 21.17.
- Classification: target pages remain `PROTECT`; source pages are `IMPROVE`.
- Source changes:
  - English image homepage FAQ links to both device guides.
  - English video FAQ links to the matching device guide from each device question.
  - Generic Pinterest downloader hub includes a visible prose paragraph linking to both guides.
- Anchor treatment: descriptive and natural; no bulk exact-match link pattern.
- Target page title, H1, URL, canonical, content, and sitemap date: unchanged.
- Risk: low.
- Confidence: low-to-medium because page-level query detail is partially hidden by Search Console.

## Build hygiene

- Added `tmp` to TypeScript and ESLint exclusions.
- Reason: `tmp/` has no Git-tracked application files and contains independent untracked package experiments. The root `**/*.ts` include and ESLint CLI previously scanned those assets, causing unrelated missing-dependency and bundled-code failures.
- No file under `tmp/` was changed or removed.

## Verification

- Targeted tests: 40/40 passed.
- Full tests: 108/108 passed.
- ESLint: passed.
- TypeScript: passed.
- Next.js production build: passed; 63 static pages generated.
- Static HTML checks:
  - Home, Italian video, generic hub, and English video pages each contain exactly one H1.
  - Expected new headings and links are present.
  - Existing titles and canonicals match their pre-change values.
  - Italian page retains `<html lang="it">`.
  - Sitemap lastmod is 2026-08-15 for English home, English video, and Italian video.
- `git diff --check`: passed.

## Deferred

- No new pages, locales, redirects, canonical changes, hreflang changes, or bulk metadata rewrites.
- Spanish, Portuguese, and German content expansion remains a later batch after these three changes accumulate 14 days of final GSC data.
- Search Console recrawl requests and deployment were not performed.
