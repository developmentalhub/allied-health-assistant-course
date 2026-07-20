import Link from "next/link";
import { LogIn } from "lucide-react";
import { siteConfig } from "@/lib/site";

const navLinks = [
  { href: "/subscribe", label: "Free Webinar" },
  { href: "/community", label: "Free Community" },
  { href: "/tools", label: "AHA Tools" },
  { href: "/resource-shop", label: "Resource Shop" },
  { href: "/reflective-practice", label: "Reflective Practice" },
  { href: "/manager-pathway", label: "For Managers" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e8e4de] bg-[#faf8f5]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex shrink-0 items-center">
          <img
            src={siteConfig.logoUrl}
            alt="Allied Health Hive"
            className="h-14 w-auto object-contain"
          />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#5f5b73] transition hover:bg-[#f0fdfa] hover:text-[#0f766e]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/login"
          className="hidden items-center gap-2 rounded-full bg-[#0f766e] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d6962] sm:inline-flex"
        >
          <LogIn size={16} />
          Sign In
        </Link>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/subscribe"
            className="rounded-full bg-[#0f766e] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
          >
            Free Webinar
          </Link>

          <Link
            href="/login"
            className="rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-4 py-2 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
          >
            Sign In
          </Link>
        </div>
      </nav>

      <div className="border-t border-[#e8e4de] bg-white/70 px-6 py-3 lg:hidden">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 rounded-full border border-[#e8e4de] bg-white px-4 py-2 text-sm font-semibold text-[#5f5b73]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}