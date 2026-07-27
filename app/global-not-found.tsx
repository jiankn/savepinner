import type { Metadata } from "next";
import Link from "next/link";
import { inter } from "@/lib/site-font";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Page Not Found — SavePinner",
  description: "The requested SavePinner page does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col items-center justify-center bg-white px-4 text-center font-sans text-gray-900">
        <main>
          <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
          <p className="mt-3 max-w-md text-sm text-gray-600">
            The page you are looking for does not exist.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-brand px-6 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Back to SavePinner
          </Link>
        </main>
      </body>
    </html>
  );
}
