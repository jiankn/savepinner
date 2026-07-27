import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { SITE_METADATA } from "@/lib/site-document";
import { inter } from "@/lib/site-font";
import "@/app/globals.css";

export const metadata: Metadata = SITE_METADATA;

export default function EnglishRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-gray-900">
        <SiteShell skipLabel="Skip to content">{children}</SiteShell>
      </body>
    </html>
  );
}
