"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#faf8f5]/90 backdrop-blur-sm border-b border-[#e8e4de]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <Link href="/" className="flex items-center gap-2.5">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill="#3730a3" />
              <path
                d="M10 9h6.5C20.09 9 23 11.91 23 16s-2.91 7-6.5 7H10V9z"
                fill="white"
                opacity="0.9"
              />
              <circle cx="16" cy="16" r="3" fill="#3730a3" />
            </svg>
            <span
              className="text-[#1e1b2e] font-semibold text-lg tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Developmental Hub
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Sessions", href: "/sessions" },
              { label: "About", href: "/about" },
              { label: "For Practitioners", href: "/practitioners" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#6b6880] hover:text-[#3730a3] transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-[#3730a3] hover:text-[#312e81] transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium bg-[#3730a3] text-white px-4 py-2 rounded-full hover:bg-[#312e81] transition-colors duration-200"
            >
              Join free
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-[#6b6880] hover:text-[#3730a3]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4l12 12M16 4L4 16" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
              </svg>
            )}
          </button>

        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-[#e8e4de] bg-[#faf8f5] px-4 py-4 flex flex-col gap-4">
          {[
            { label: "Sessions", href: "/sessions" },
            { label: "About", href: "/about" },
            { label: "For Practitioners", href: "/practitioners" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#6b6880] hover:text-[#3730a3] font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-2 border-t border-[#e8e4de]">
            <Link
              href="/login"
              className="text-sm font-medium text-[#3730a3]"
              onClick={() => setMenuOpen(false)}
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium bg-[#3730a3] text-white px-4 py-2 rounded-full"
              onClick={() => setMenuOpen(false)}
            >
              Join free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}