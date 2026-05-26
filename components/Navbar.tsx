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
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Request content", href: "/register-interest" },
  ];

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "#faf8f5", borderBottom: "1px solid #e8e4de" }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>

        <Link href="/" style={{ textDecoration: "none", color: "#1e1b2e", fontWeight: 600, fontSize: "18px", flexShrink: 0 }}>
          Developmental Hub
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "32px" }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", fontWeight: 500 }}>
              {link.label}
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }} className="desktop-nav">
          {!loading && user ? (
            <>
              {(role === "admin" || role === "superadmin") && (
                <Link href="/admin" style={{ color: "#c2410c", fontWeight: 600, fontSize: "14px" }}>Admin</Link>
              )}
              {(role === "facilitator" || role === "superadmin") && (
                <Link href="/facilitator-hub" style={{ color: "#0f766e", fontWeight: 500, fontSize: "14px" }}>Facilitator Hub</Link>
              )}
              <Link href="/videos" style={{ backgroundColor: "#3730a3", color: "white", padding: "8px 18px", borderRadius: "999px", fontSize: "14px", fontWeight: 500, textDecoration: "none" }}>
                My videos
              </Link>
              <button onClick={handleSignOut} style={{ cursor: "pointer", border: "none", background: "none", color: "#6b6880", fontSize: "14px", fontFamily: "inherit" }}>
                Sign out
              </button>
            </>
          ) : !loading ? (
            <>
              <Link href="/login" style={{ color: "#3730a3", fontSize: "14px", fontWeight: 500 }}>Sign in</Link>
              <Link href="/pricing" style={{ background: "#3730a3", color: "white", padding: "8px 18px", borderRadius: "999px", fontSize: "14px", fontWeight: 500, textDecoration: "none" }}>
                Start membership
              </Link>
            </>
          ) : null}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", display: "none", flexDirection: "column", gap: "5px", alignItems: "center", justifyContent: "center" }}
          aria-label="Toggle menu"
        >
          <span style={{ display: "block", width: "22px", height: "2px", backgroundColor: menuOpen ? "transparent" : "#1e1b2e", transition: "all 0.2s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ display: "block", width: "22px", height: "2px", backgroundColor: "#1e1b2e", transition: "all 0.2s", transform: menuOpen ? "rotate(-45deg)" : "none", marginTop: menuOpen ? "-7px" : "0" }} />
          {!menuOpen && <span style={{ display: "block", width: "22px", height: "2px", backgroundColor: "#1e1b2e" }} />}
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu" style={{ backgroundColor: "#faf8f5", borderTop: "1px solid #e8e4de", padding: "16px 24px 24px", display: "none", flexDirection: "column", gap: "0" }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{ fontSize: "16px", color: "#1e1b2e", textDecoration: "none", fontWeight: 500, padding: "14px 0", borderBottom: "1px solid #f0ede8", display: "block" }}>
              {link.label}
            </Link>
          ))}
          <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {!loading && user ? (
              <>
                {(role === "admin" || role === "superadmin") && (
                  <Link href="/admin" onClick={() => setMenuOpen(false)} style={{ fontSize: "15px", color: "#c2410c", fontWeight: 600, textDecoration: "none", padding: "10px 0" }}>Admin</Link>
                )}
                {(role === "facilitator" || role === "superadmin") && (
                  <Link href="/facilitator-hub" onClick={() => setMenuOpen(false)} style={{ fontSize: "15px", color: "#0f766e", fontWeight: 500, textDecoration: "none", padding: "10px 0" }}>Facilitator Hub</Link>
                )}
                <Link href="/videos" onClick={() => setMenuOpen(false)} style={{ background: "#3730a3", color: "white", padding: "12px 24px", borderRadius: "999px", fontSize: "15px", fontWeight: 500, textDecoration: "none", textAlign: "center", marginTop: "8px" }}>
                  My videos
                </Link>
                <button onClick={handleSignOut} style={{ cursor: "pointer", border: "none", background: "none", color: "#6b6880", fontSize: "15px", fontFamily: "inherit", textAlign: "left", padding: "10px 0" }}>
                  Sign out
                </button>
              </>
            ) : !loading ? (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)} style={{ fontSize: "15px", color: "#3730a3", fontWeight: 500, textDecoration: "none", padding: "10px 0" }}>Sign in</Link>
                <Link href="/pricing" onClick={() => setMenuOpen(false)} style={{ background: "#3730a3", color: "white", padding: "12px 24px", borderRadius: "999px", fontSize: "15px", fontWeight: 500, textDecoration: "none", textAlign: "center", marginTop: "8px" }}>
                  Start membership
                </Link>
              </>
            ) : null}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .mobile-menu { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}