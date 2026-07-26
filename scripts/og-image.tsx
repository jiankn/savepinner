import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * Source that produced app/opengraph-image.png and app/twitter-image.png.
 *
 * The card ships as a committed PNG rather than a generated route on purpose:
 * `trailingSlash: true` redirects extensionless paths, so a generated
 * /opengraph-image route makes every social crawler follow a 308 before it
 * reaches the image. Files with an extension are exempt from that redirect
 * (see the trailingSlash config docs), which is also why app/icon.png and
 * app/apple-icon.png are static files here.
 *
 * To redesign the card: copy this file to app/opengraph-image.tsx, run
 * `npm run build`, save the bytes from /opengraph-image over both PNGs, then
 * delete the route again.
 *
 * The copy is deliberately site-level, not page-level — one card covers all
 * 14 indexable URLs including the /{locale}/ variants.
 *
 * next/og only bundles Geist-Regular, so there is no bold weight available.
 * Hierarchy here comes from size and colour, never from fontWeight.
 */
export const alt = "SavePinner — download Pinterest images, videos and GIFs in HD";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

const BADGES = ["HD Original Quality", "No Watermark", "No Login", "100% Free"];

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/brand/savepinner-logo.png"), "base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // Mirrors the .aurora-hero ramp in app/globals.css.
          backgroundImage:
            "linear-gradient(150deg, #fff8f9 0%, #ffd6e0 32%, #ff718c 64%, #e60023 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 1040,
            height: 486,
            borderRadius: 48,
            backgroundColor: "#ffffff",
            boxShadow: "0 24px 80px rgba(120, 0, 20, 0.28)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders raw <img>; next/image is not available inside ImageResponse. */}
          <img src={`data:image/png;base64,${logo}`} width={440} height={105} alt="" />
          <div
            style={{
              display: "flex",
              // Sized so the headline sets on one line — at 54px it wrapped
              // and orphaned "GIFs".
              maxWidth: 960,
              marginTop: 40,
              fontSize: 44,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              textAlign: "center",
              color: "#18181b",
            }}
          >
            Download Pinterest Images, Videos &amp; GIFs
          </div>
          <div style={{ display: "flex", marginTop: 44 }}>
            {BADGES.map((badge) => (
              <div
                key={badge}
                style={{
                  display: "flex",
                  marginLeft: 10,
                  marginRight: 10,
                  paddingTop: 12,
                  paddingBottom: 12,
                  paddingLeft: 26,
                  paddingRight: 26,
                  borderRadius: 999,
                  backgroundColor: "#fff3f5",
                  border: "2px solid #ffd6e0",
                  fontSize: 25,
                  color: "#b8001c",
                }}
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
