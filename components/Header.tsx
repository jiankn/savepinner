import Link from "next/link";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/pinterest-video-downloader/", label: "Video Downloader" },
  { href: "/pinterest-gif-downloader/", label: "GIF Downloader" },
] as const;

function NavigationLinks() {
  return (
    <>
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-brand-blush hover:text-brand"
        >
          {item.label}
        </Link>
      ))}
      <span
        aria-disabled="true"
        title="Blog launches in month two"
        className="px-3 py-1.5 text-sm text-gray-400"
      >
        Blog
      </span>
    </>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-rose-100/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <Link href="/" aria-label="SavePinner home" className="rounded-lg">
          <Logo size={30} />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center sm:flex">
          <NavigationLinks />
        </nav>

        <MobileMenu items={NAV_ITEMS} />
      </div>
    </header>
  );
}
