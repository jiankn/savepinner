import Link from "next/link";

const LINKS = [
  { href: "/how-to-use/", label: "How to Use" },
  { href: "/privacy/", label: "Privacy" },
  { href: "/terms/", label: "Terms" },
  { href: "/copyright/", label: "Copyright" },
  { href: "/contact/", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-10">
        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg text-sm text-gray-600 hover:text-gray-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-gray-500">
          SavePinner is an independent tool and is not affiliated with, sponsored, or endorsed by
          Pinterest, Inc. &quot;Pinterest&quot; is a registered trademark of Pinterest, Inc. Only
          download content you own or have permission to use.
        </p>
        <p className="mt-4 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} SavePinner. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
