"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Free community",
    href: "/join",
  },
  {
    label: "AHA PD options",
    href: "/subscribe",
  },
  {
    label: "Topics",
    href: "/topics",
  },
  {
    label: "Manager pathway",
    href: "/manager-pathway",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e8e4de] bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group" onClick={closeMenu}>
          <div>
            <p className="text-lg font-bold leading-tight text-[#1e1b2e]">
              AHA Professional Development
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
              Foundation reflective PD
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-[#6b6880] transition hover:text-[#0f766e]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/join"
            className="rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-4 py-2 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
          >
            Join free
          </Link>

          <Link
            href="/subscribe"
            className="rounded-full bg-[#0f766e] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
          >
            View PD options
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e8e4de] text-[#1e1b2e] lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {menuOpen ? (
        <div className="border-t border-[#e8e4de] bg-white px-6 py-4 lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-2xl px-3 py-2 text-sm font-semibold text-[#6b6880] transition hover:bg-[#f0fdfa] hover:text-[#0f766e]"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-2 grid gap-2">
              <Link
                href="/join"
                onClick={closeMenu}
                className="rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-4 py-3 text-center text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
              >
                Join free community
              </Link>

              <Link
                href="/subscribe"
                onClick={closeMenu}
                className="rounded-full bg-[#0f766e] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                View AHA PD options
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}