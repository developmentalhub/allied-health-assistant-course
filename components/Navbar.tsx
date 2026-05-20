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

  // Diagnostic: Remove this console log once we confirm the role
  if (user) console.log("Navbar detecting role:", role);

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "#faf8f5", borderBottom: "1px solid #e8e4de" }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
        
        <Link href="/" style={{ textDecoration: "none", color: "#1e1b2e", fontWeight: 600, fontSize: "18px" }}>
          Developmental Hub
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {!loading && user ? (
            <>
              {/* ADMIN ACCESS - Failsafe: check for 'admin' */}
              {(role === "admin") && (
                <Link href="/admin" style={{ color: "#c2410c", fontWeight: 600 }}>Admin</Link>
              )}
              
              {/* HUB ACCESS - Failsafe: check for 'facilitator' or 'admin' */}
              {(role === "facilitator" || role === "admin") && (
                <Link href="/facilitator-hub" style={{ color: "#0f766e", fontWeight: 500 }}>Hub</Link>
              )}
              
              {/* DASHBOARD ACCESS - Everyone logged in should see this */}
              <Link href="/dashboard" style={{ color: "#3730a3", fontWeight: 500 }}>Dashboard</Link>
              
              <button onClick={handleSignOut} style={{ cursor: "pointer", border: "none", background: "none", color: "#6b6880" }}>
                Sign out
              </button>
            </>
          ) : !loading ? (
            <>
              <Link href="/login" style={{ color: "#3730a3" }}>Sign in</Link>
              <Link href="/signup" style={{ background: "#3730a3", color: "white", padding: "8px 16px", borderRadius: "999px" }}>Join free</Link>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
}