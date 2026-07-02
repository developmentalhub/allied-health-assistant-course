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
    { label: "Academy", href: "/" },
    { label: "Allied Health", href: "/allied-health/foundations/welcome-to-aha-role" },
    { label: "Videos", href: "/videos" },
    { label: "Community", href: "/community" },
    { label: "Live sessions", href: "/sessions" },
    { label: "Access", href: "/subscribe" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-[#e8e4de] bg-[#faf8f5]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="max-w-[220px] text-xl font-bold leading-tight text-[#1e1b2e] transition hover:opacity-90 md:max-w-none md:text-2xl"
        >
          Allied Health & Educator Academy
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-semibold text-[#5f5b73] transition hover:text-[#1e1b2e]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          {!loading && user ? (
            <>
              {(role === "admin" || role === "superadmin") && (
                <Link
                  href="/admin"
                  className="text-base font-semibold text-[#c2410c] transition hover:opacity-80"
                >
                  Admin
                </Link>
              )}

              {(role === "facilitator" || role === "superadmin") && (
                <Link
                  href="/facilitator-hub"
                  className="text-base font-semibold text-[#0f766e] transition hover:opacity-80"
                >
                  Facilitator
                </Link>
              )}

              <Link
                href="/dashboard"
                className="rounded-full bg-[#0f766e] px-5 py-3 text-base font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Dashboard
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="cursor-pointer border-none bg-transparent text-base font-semibold text-[#5f5b73] transition hover:text-[#1e1b2e]"
              >
                Sign out
              </button>
            </>
          ) : !loading ? (
            <>
              <Link
                href="/login"
                className="text-base font-semibold text-[#0f766e] transition hover:opacity-80"
              >
                Sign in
              </Link>

              <Link
                href="/signup"
                className="rounded-full bg-[#0f766e] px-5 py-3 text-base font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Create account
              </Link>
            </>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex cursor-pointer flex-col items-center justify-center gap-1.5 border-none bg-transparent p-3 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-0.5 w-7 bg-[#1e1b2e] transition-all duration-200 ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-7 bg-[#1e1b2e] transition-all duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-7 bg-[#1e1b2e] transition-all duration-200 ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-[#e8e4de] bg-[#faf8f5] px-6 py-5 lg:hidden">
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-[#f0ede8] py-4 text-lg font-semibold text-[#1e1b2e]"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-5 flex flex-col gap-3">
              {!loading && user ? (
                <>
                  {(role === "admin" || role === "superadmin") && (
                    <Link
                      href="/admin"
                      onClick={() => setMenuOpen(false)}
                      className="py-2 text-base font-semibold text-[#c2410c]"
                    >
                      Admin
                    </Link>
                  )}

                  {(role === "facilitator" || role === "superadmin") && (
                    <Link
                      href="/facilitator-hub"
                      onClick={() => setMenuOpen(false)}
                      className="py-2 text-base font-semibold text-[#0f766e]"
                    >
                      Facilitator
                    </Link>
                  )}

                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-full bg-[#0f766e] py-4 text-center text-base font-semibold text-white"
                  >
                    Dashboard
                  </Link>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="cursor-pointer border-none bg-transparent py-3 text-left text-base font-semibold text-[#5f5b73]"
                  >
                    Sign out
                  </button>
                </>
              ) : !loading ? (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="py-3 text-base font-semibold text-[#0f766e]"
                  >
                    Sign in
                  </Link>

                  <Link
                    href="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-full bg-[#0f766e] py-4 text-center text-base font-semibold text-white"
                  >
                    Create account
                  </Link>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}