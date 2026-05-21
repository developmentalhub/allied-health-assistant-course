"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, role, loading, signOut } = useAuth();
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "#faf8f5", borderBottom: "1px solid #e8e4de" }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", color: "#1e1b2e", fontWeight: 600, fontSize: "18px" }}>
          Developmental Hub
        </Link>

        {/* Navigation Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {[
            { label: "Sessions", href: "/sessions" },
            { label: "Our specialists", href: "/practitioners/directory" },
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

        {/* Auth Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {!loading && user ? (
            <>
              {(role === "admin" || role === "superadmin") && (
                <Link href="/admin" style={{ color: "#c2410c", fontWeight: 600, fontSize: "14px" }}>Admin</Link>
              )}
              {(role === "facilitator" || role === "superadmin") && (
                <Link href="/facilitator-hub" style={{ color: "#0f766e", fontWeight: 500, fontSize: "14px" }}>Facilitator Hub</Link>
              )}
              {(role === "parent" || role === "superadmin") && (
                <Link href="/dashboard" style={{ color: "#3730a3", fontWeight: 500, fontSize: "14px" }}>My dashboard</Link>
              )}
              <button
                onClick={handleSignOut}
                style={{ cursor: "pointer", border: "none", background: "none", color: "#6b6880", fontSize: "14px" }}
              >
                Sign out
              </button>
            </>
          ) : !loading ? (
            <>
              <Link href="/login" style={{ color: "#3730a3", fontSize: "14px", fontWeight: 500 }}>Sign in</Link>
              <Link href="/signup" style={{ background: "#3730a3", color: "white", padding: "8px 16px", borderRadius: "999px", fontSize: "14px", fontWeight: 500, textDecoration: "none" }}>Join free</Link>
            </>
          ) : null}
        </div>

      </div>
    </nav>
  );
}