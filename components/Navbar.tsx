import Link from "next/link";
import { LogIn } from "lucide-react";
import { siteConfig } from "@/lib/site";

const navLinks = [
  { href: "/community", label: "For AHAs" },
  { href: "/manager-pathway", label: "For Managers" },
  { href: "/tools", label: "Practical Tools" },
  { href: "/webinars", label: "Webinars" },
  { href: "/resource-shop", label: "Resources" },
  { href: "/reflective-practice", label: "Reflective Support" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e8e4de] bg-[#fffaf3]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <img
            src={siteConfig.logoUrl}
            alt="Allied Health Hive"
            className="h-14 w-auto object-contain"
          />

          <div className="hidden xl:block">
            <p className="text-sm font-bold text-[#1e1b2e]">
              Allied Health Hive
            </p>

            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
              Workforce Development
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-semibold text-[#5f5b73] transition hover:bg-[#f0fdfa] hover:text-[#0f766e]"
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
          Sign in
        </Link>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/community"
            className="rounded-full bg-[#0f766e] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
          >
            For AHAs
          </Link>

          <Link
            href="/login"
            className="rounded-full border border-[#99f6e4] bg-white px-4 py-2 text-sm font-semibold text-[#0f766e] transition hover:bg-[#f0fdfa]"
          >
            Sign in
          </Link>
        </div>
      </nav>

      <div className="border-t border-[#e8e4de] bg-white/80 px-5 py-3 lg:hidden">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 rounded-full border border-[#e8e4de] bg-white px-4 py-2 text-sm font-semibold text-[#5f5b73] transition hover:border-[#99f6e4] hover:text-[#0f766e]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}