import Link from "next/link";
import Logo from "./Logo";

const TOOL_LINKS = [
  { href: "/pinterest-video-downloader/", label: "Video Downloader" },
  { href: "/pinterest-gif-downloader/", label: "GIF Downloader" },
  { href: "/pinterest-story-downloader/", label: "Story Downloader" },
];

const LEGAL_LINKS = [
  { href: "/privacy/", label: "Privacy Policy" },
  { href: "/terms/", label: "Terms of Service" },
  { href: "/dmca/", label: "DMCA" },
  { href: "/contact/", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="aurora-footer px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-7xl rounded-2xl bg-white p-6 text-brand-ink sm:p-10 lg:p-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-7 text-gray-700">
              A free tool for downloading Pinterest images, videos, GIFs and thumbnails in HD quality.
            </p>
          </div>
          <nav aria-label="Pinterest tools">
            <p className="font-semibold">Tools</p>
            <div className="mt-4 flex flex-col gap-3">
              {TOOL_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-gray-700 transition-colors hover:text-brand">
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
          <nav aria-label="Legal pages">
            <p className="font-semibold">Legal</p>
            <div className="mt-4 flex flex-col gap-3">
              {LEGAL_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-gray-700 transition-colors hover:text-brand">
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
          <div>
            <p className="font-semibold">Languages</p>
            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-3 text-sm text-gray-700" aria-label="Languages planned for month two">
              <span>English</span>
              <span title="Coming in month two">Español</span>
              <span title="Coming in month two">Português</span>
              <span title="Coming in month two">Bahasa Indonesia</span>
            </div>
          </div>
        </div>
        <p className="mt-12 border-t border-gray-200 pt-6 text-xs leading-relaxed text-gray-600">
          SavePinner © 2026. SavePinner is independent and is not affiliated with or endorsed by Pinterest. Only download content you own or have permission to use.
        </p>
      </div>
    </footer>
  );
}
