"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const MENU_ID = "mobile-navigation-menu";

type NavigationItem = {
  href: string;
  label: string;
};

function normalizePath(path: string) {
  return path === "/" ? path : path.replace(/\/+$/, "");
}

export default function MobileMenu({ items }: { items: readonly NavigationItem[] }) {
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const desktopQuery = window.matchMedia("(min-width: 640px)");
    const closeOnDesktop = () => {
      if (desktopQuery.matches) closeMenu();
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    desktopQuery.addEventListener("change", closeOnDesktop);
    document.addEventListener("keydown", closeOnEscape);
    document.documentElement.classList.add("mobile-menu-open");

    return () => {
      desktopQuery.removeEventListener("change", closeOnDesktop);
      document.removeEventListener("keydown", closeOnEscape);
      document.documentElement.classList.remove("mobile-menu-open");
    };
  }, [closeMenu, isOpen]);

  return (
    <div className="sm:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-controls={MENU_ID}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-gray-800 transition-colors hover:bg-gray-50"
      >
        <span className="sr-only">Open navigation menu</span>
        <Image src="/icons/menu.png" alt="" width={24} height={24} aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          id={MENU_ID}
          className="mobile-nav-overlay fixed inset-0 z-50 h-dvh w-screen overflow-hidden sm:hidden"
        >
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={closeMenu}
            className="mobile-nav-backdrop absolute inset-0 h-full w-full cursor-default border-0 p-0"
          />

          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-heading"
            className="mobile-nav-panel absolute top-[4.25rem] right-3 max-h-[calc(100dvh-5rem)] w-[calc(100vw-1.5rem)] max-w-md overflow-y-auto rounded-2xl bg-white p-3 shadow-[0_8px_24px_rgb(24_24_27/0.16)]"
          >
            <div className="flex min-h-12 items-center justify-between px-2">
              <h2 id="mobile-menu-heading" className="text-lg font-bold tracking-[-0.02em] text-brand-ink">
                Menu
              </h2>
              <button
                type="button"
                onClick={closeMenu}
                className="flex h-11 w-11 items-center justify-center rounded-lg text-3xl leading-none text-brand-ink transition-colors hover:bg-brand-blush hover:text-brand"
              >
                <span aria-hidden="true">×</span>
                <span className="sr-only">Close navigation menu</span>
              </button>
            </div>

            <nav aria-labelledby="mobile-menu-heading" className="mt-2 flex flex-col gap-1">
              {items.map((item) => {
                const isCurrent = normalizePath(pathname) === normalizePath(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isCurrent ? "page" : undefined}
                    onClick={closeMenu}
                    className={`flex min-h-13 items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                      isCurrent
                        ? "bg-brand-blush text-brand"
                        : "text-brand-ink hover:bg-gray-50 hover:text-brand"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isCurrent && <span className="h-2 w-2 rounded-full bg-brand" aria-hidden="true" />}
                  </Link>
                );
              })}
            </nav>
          </section>
        </div>
      )}
    </div>
  );
}
