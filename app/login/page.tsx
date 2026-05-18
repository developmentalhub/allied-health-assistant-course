"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.refresh();
    router.push("/dashboard");
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#faf8f5", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 16px" }}>
      <div style={{ width: "100%", maxWidth: "480px", paddingTop: "48px", paddingBottom: "48px" }}>

        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill="#3730a3" />
              <path
                d="M10 9h6.5C20.09 9 23 11.91 23 16s-2.91 7-6.5 7H10V9z"
                fill="white"
                opacity="0.9"
              />
              <circle cx="16" cy="16" r="3" fill="#3730a3" />
            </svg>
            <span style={{ fontFamily: "var(--font-display)", color: "#1e1b2e", fontWeight: 600, fontSize: "18px" }}>
              Developmental Hub
            </span>
          </Link>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "30px", fontWeight: 300, color: "#1e1b2e", marginBottom: "8px" }}>
            Welcome back
          </h1>
          <p style={{ fontSize: "14px", color: "#6b6880" }}>
            Sign in to your Developmental Hub account
          </p>
        </div>

        <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "40px 48px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                required
                style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>
                  Password
                </label>
                <Link href="/forgot-password" style={{ fontSize: "12px", color: "#3730a3" }}>
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
                style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            {error && (
              <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", fontSize: "14px", padding: "12px 16px", borderRadius: "12px" }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ marginTop: "8px", width: "100%", backgroundColor: "#3730a3", color: "white", padding: "12px", borderRadius: "999px", fontSize: "14px", fontWeight: 500, border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1 }}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

          </form>

          <p style={{ textAlign: "center", fontSize: "14px", color: "#6b6880", marginTop: "24px" }}>
            Don't have an account?{" "}
            <Link href="/signup" style={{ color: "#3730a3", fontWeight: 500 }}>
              Join free
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}