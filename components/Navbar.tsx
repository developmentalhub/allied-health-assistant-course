"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const { user, role, loading, signOut } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleSignOut() {
    await signOut();
    setMenuOpen(false);
    router.push("/");
  }

  const navLinks = [
    { label: "Videos", href: "/videos/free" },
    { label: "Community", href: "/forum" },
    { label: "Q&A", href: "/qanda" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
  ];

  const waitlistLink = { label: "Join the waitlist", href: "/waitlist" };

  return (
    <nav className="sticky top-0 z-50 bg-[#faf8f5] border-b border-[#e8e4de]">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">

        {/* Brand Link */}
        <Link 
          href="/" 
          className="text-[#1e1b2e] font-semibold text-lg shrink-0 hover:opacity-90 transition"
        >
          Developmental Hub
        </Link>

        {/* Desktop Links Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="text-sm text-[#6b6880] font-medium hover:text-[#1e1b2e] transition"
            >
              {link.label}
            </Link>
          ))}
          <Link 
            href={waitlistLink.href} 
            className="text-sm text-[#3730a3] font-semibold border-b-2 border-[#3730a3] pb-0.5 hover:opacity-80 transition"
          >
            {waitlistLink.label}
          </Link>
        </div>

        {/* Desktop Auth Actions */}
        <div className="hidden md:flex items-center gap-4">
          {!loading && user ? (
            <>
              {(role === "admin" || role === "superadmin") && (
                <Link href="/admin" className="text-[#c2410c] font-semibold text-sm hover:opacity-80 transition">
                  Admin
                </Link>
              )}
              {(role === "facilitator" || role === "superadmin") && (
                <Link href="/facilitator-hub" className="text-[#0f766e] font-medium text-sm hover:opacity-80 transition">
                  Facilitator Hub
                </Link>
              )}
              <Link 
                href="/videos" 
                className="bg-[#3730a3] text-white px-[18px] py-2 rounded-full text-sm font-medium hover:bg-[#2e288a] transition"
              >
                My videos
              </Link>
              <button 
                onClick={handleSignOut} 
                className="cursor-pointer border-none bg-none text-[#6b6880] text-sm font-inherit hover:text-[#1e1b2e] transition"
              >
                Sign out
              </button>
            </>
          ) : !loading ? (
            <>
              <Link href="/login" className="text-[#3730a3] text-sm font-medium hover:opacity-80 transition">
                Sign in
              </Link>
              <Link 
                href="/pricing" 
                className="bg-[#3730a3] text-white px-[18px] py-2 rounded-full text-sm font-medium hover:bg-[#2e288a] transition"
              >
                Start membership
              </Link>
            </>
          ) : null}
        </div>

        {/* Mobile Menu Action Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden bg-none border-none cursor-pointer p-2 flex flex-col gap-1 items-center justify-center"
          aria-label="Toggle menu"
        >
          <span className={`block w-[22px] height-[2px] bg-[#1e1b2e] transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`block w-[22px] height-[2px] bg-[#1e1b2e] transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-[22px] height-[2px] bg-[#1e1b2e] transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      {menuOpen && (
        <div className="md:hidden bg-[#faf8f5] border-t border-[#e8e4de] px-6 py-4 flex flex-col">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              onClick={() => setMenuOpen(false)} 
              className="text-base text-[#1e1b2e] font-medium py-3 border-b border-[#f0ede8] block"
            >
              {link.label}
            </Link>
          ))}
          <Link 
            href={waitlistLink.href} 
            onClick={() => setMenuOpen(false)} 
            className="text-base text-[#3730a3] font-semibold py-3 border-b border-[#f0ede8] block"
          >
            {waitlistLink.label}
          </Link>
          
          <div className="mt-4 flex flex-col gap-2">
            {!loading && user ? (
              <>
                {(role === "admin" || role === "superadmin") && (
                  <Link href="/admin" onClick={() => setMenuOpen(false)} className="text-sm text-[#c2410c] font-semibold py-2">
                    Admin
                  </Link>
                )}
                {(role === "facilitator" || role === "superadmin") && (
                  <Link href="/facilitator-hub" onClick={() => setMenuOpen(false)} className="text-sm text-[#0f766e] font-medium py-2">
                    Facilitator Hub
                  </Link>
                )}
                <Link 
                  href="/videos" 
                  onClick={() => setMenuOpen(false)} 
                  className="bg-[#3730a3] text-white py-3 rounded-full text-sm font-medium text-center mt-2 shadow-xs"
                >
                  My videos
                </Link>
                <button 
                  onClick={handleSignOut} 
                  className="cursor-pointer border-none bg-none text-[#6b6880] text-sm text-left py-2 font-inherit"
                >
                  Sign out
                </button>
              </>
            ) : !loading ? (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)} className="text-sm text-[#3730a3] font-medium py-2精确">
                  Sign in
                </Link>
                <Link 
                  href="/pricing" 
                  onClick={() => setMenuOpen(false)} 
                  className="bg-[#3730a3] text-white py-3 rounded-full text-sm font-medium text-center mt-2 shadow-xs"
                >
                  Start membership
                </Link>
              </>
            ) : null}
          </div>
        </div>
      )}
    </nav>
  );
}