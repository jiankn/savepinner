import Link from "next/link";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import type { Locale, UiMessages } from "@/lib/i18n";
import { homePath, navItems } from "@/lib/navigation";

export default function Header({ locale, t }: { locale: Locale; t: UiMessages }) {
  const items = navItems(locale, t);
  const home = homePath(locale);

  return (
    <header className="sticky top-0 z-40 border-b border-rose-100/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href={home} aria-label="SavePinner home" className="flex shrink-0 items-center rounded-lg">
          <Logo />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center sm:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-brand-blush hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <MobileMenu items={items} />
      </div>
    </header>
  );
}
