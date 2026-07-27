# SavePinner

SavePinner is a Next.js web utility for resolving public Pinterest Pin URLs.

## Local development

Copy `.env.example` to `.env.local`, set a development `TOKEN_SECRET`, then run:

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

## Production configuration

Set `NEXT_PUBLIC_SITE_URL` and a strong `TOKEN_SECRET` in Vercel. Operational
limits in `.env.example` are optional and have safe defaults in `lib/config.ts`.

### AdSense

AdSense serving is disabled by default. Do not use placeholder publisher
identifiers. The account identifiers can be configured for ownership
verification and `ads.txt` while `ENABLE_ADSENSE=false` prevents ad requests.

Before enabling it:

1. Clear all Google Publisher Policy blockers on the product pages.
2. Move the production deployment to Vercel Pro (or another commercial plan);
   Vercel Hobby does not allow sites that include AdSense.
3. Add `savepinner.com` to AdSense and complete Google's site review.
4. In AdSense **Privacy & messaging**, publish a European regulations message
   using Google's certified CMP, or configure another Google-certified TCF CMP.
5. Copy the exact account values into Vercel:
   - `NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT=ca-pub-0000000000000000`
   - `ADSENSE_PUBLISHER_ID=pub-0000000000000000`
6. Redeploy with `ENABLE_ADSENSE=false`, then verify:
   - the page source contains `google-adsense-account`;
   - `https://savepinner.com/ads.txt` returns HTTP 200 and the exact seller line;
7. Only after the policy and CMP checks pass, set `ENABLE_ADSENSE=true`,
   redeploy, and verify:
   - consent choices appear for EEA, UK and Swiss traffic;
   - ads do not overlap navigation, download controls or result buttons.

When the identifiers are absent or invalid, no verification meta tag is
rendered and `/ads.txt` returns a real HTTP 404. The ad script is rendered only
when both a valid client id and `ENABLE_ADSENSE=true` are present.

Vercel's Acceptable Use Policy separately prohibits scraping, proxying and
media hosting for hot-linking. A paid plan does not itself waive that rule.
Obtain written approval from Vercel or move the resolving/download proxy to a
provider whose terms expressly permit this workload before treating the
hosting layer as production-ready.

## Public trust pages

Privacy and About pages are published in English, Spanish, Indonesian and
Brazilian Portuguese. The footer, canonical URLs, hreflang annotations and
sitemap keep each language cluster connected.
