import Link from "next/link";
import Image from "next/image";
import Logo from "./Logo";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/pinterest-video-downloader/", label: "Video Downloader" },
  { href: "/pinterest-gif-downloader/", label: "GIF Downloader" },
] as const;

function NavigationLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <>
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={
            mobile
              ? "rounded-lg px-3 py-2.5 text-sm font-medium text-gray-800 transition-colors hover:bg-brand-blush hover:text-brand"
              : "rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-brand-blush hover:text-brand"
          }
        >
          {item.label}
        </Link>
      ))}
      <span
        aria-disabled="true"
        title="Blog launches in month two"
        className={mobile ? "px-3 py-2.5 text-sm text-gray-400" : "px-3 py-2 text-sm text-gray-400"}
      >
        Blog
      </span>
    </>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-rose-100/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="SavePinner home" className="rounded-lg">
          <Logo />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center sm:flex">
          <NavigationLinks />
        </nav>

        <details className="group relative sm:hidden">
          <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-lg text-gray-800 hover:bg-gray-50 [&::-webkit-details-marker]:hidden">
            <span className="sr-only">Open navigation menu</span>
            <Image src="/icons/menu.png" alt="" width={22} height={22} aria-hidden="true" />
          </summary>
          <nav
            aria-label="Mobile navigation"
            className="absolute right-0 mt-2 flex w-56 flex-col rounded-xl bg-white p-2 shadow-xl"
          >
            <NavigationLinks mobile />
          </nav>
        </details>
      </div>
    </header>
  );
}
