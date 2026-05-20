"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const { user, role, signOut } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "rgba(250,248,245,0.9)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e8e4de" }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>

        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#3730a3" />
            <path d="M10 9h6.5C20.09 9 23 11.91 23 16s-2.91 7-6.5 7H10V9z" fill="white" opacity="0.9" />
            <circle cx="16" cy="16" r="3" fill="#3730a3" />
          </svg>
          <span style={{ fontFamily: "var(--font-display)", color: "#1e1b2e", fontWeight: 600, fontSize: "18px" }}>
            Developmental Hub
          </span>
        </Link>

        {/* Desktop nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {[
            { label: "Sessions", href: "/sessions" },
            { label: "About", href: "/about" },
            { label: "For Practitioners", href: "/practitioners" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", fontWeight: 500 }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop auth buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {user ? (
            <>
              {role === "admin" && (
                <Link
                  href="/admin"
                  style={{ fontSize: "14px", fontWeight: 600, color: "#c2410c", textDecoration: "none", backgroundColor: "#fff7ed", padding: "6px 14px", borderRadius: "999px", border: "1px solid #fed7aa" }}
                >
                  Admin
                </Link>
              )}
              {(role === "facilitator" || role === "admin") && (
                <Link
                  href="/facilitator-hub"
                  style={{ fontSize: "14px", fontWeight: 500, color: "#0f766e", textDecoration: "none" }}
                >
                  Facilitator Hub
                </Link>
              )}
              {role === "parent" && (
                <Link
                  href="/dashboard"
                  style={{ fontSize: "14px", fontWeight: 500, color: "#3730a3", textDecoration: "none" }}
                >
                  My dashboard
                </Link>
              )}
              <button
                onClick={handleSignOut}
                style={{ fontSize: "14px", fontWeight: 500, backgroundColor: "#3730a3", color: "white", padding: "8px 16px", borderRadius: "999px", border: "none", cursor: "pointer" }}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                style={{ fontSize: "14px", fontWeight: 500, color: "#3730a3", textDecoration: "none" }}
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                style={{ fontSize: "14px", fontWeight: 500, backgroundColor: "#3730a3", color: "white", padding: "8px 16px", borderRadius: "999px", textDecoration: "none" }}
              >
                Join free
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}