import Link from "next/link";
import Logo from "./Logo";

/**
 * Sticky translucent header — PRD §8.3.2: bg-white/85 + backdrop-blur.
 * No Blog/Extension entries until those actually ship (PRD §8.3.2 note).
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4">
        <Link href="/" aria-label="SavePinner home" className="rounded-xl">
          <Logo />
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/how-to-use/"
            className="rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            How to Use
          </Link>
          <Link
            href="/privacy/"
            className="rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            Privacy
          </Link>
        </nav>
      </div>
    </header>
  );
}
