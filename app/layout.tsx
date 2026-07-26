import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import { OG_CARD } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://savepinner.com").replace(/\/+$/, "");

/**
 * Site-level fallback only. Every route sets its own title/description via
 * lib/seo.ts, so this must NOT duplicate the home page's copy — otherwise any
 * future page that forgets its metadata silently ships a duplicate <title>.
 */
const title = "SavePinner — Free Pinterest Downloader";
const description =
  "Free Pinterest downloader for images, videos, GIFs and Story Pins. No login, no watermark, original HD quality.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  robots: { index: true, follow: true },
  // The tool pages replace this whole block via lib/seo.ts. It exists so the
  // legal pages — which only set a title — still ship a valid social card.
  openGraph: { type: "website", siteName: "SavePinner", title, description, images: [OG_CARD] },
  twitter: { card: "summary_large_image", title, description, images: [OG_CARD] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-gray-900">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
