import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
        <p className="mt-3 max-w-md text-sm text-gray-600">
          The page you are looking for does not exist. Head back home to download a Pin instead.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-brand px-6 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Back to SavePinner
        </Link>
      </main>
      <Footer />
    </>
  );
}
