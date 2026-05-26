"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function SubscribePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function check() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login?redirect=/subscribe");
        return;
      }
      setUser(user);

      // Check if already subscribed
      const res = await fetch("/api/subscription-status");
      const data = await res.json();
      if (data.subscribed) {
        router.push("/videos");
        return;
      }
      setChecking(false);
    }
    check();
  }, []);

  async function handleSubscribe() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/subscribe", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#faf8f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#6b6880", fontFamily: "DM Sans, sans-serif" }}>Loading...</p>
      </div>
    );
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e" }}>
      <div style={{ maxWidth: "480px", margin: "0 auto", padding: "80px 24px" }}>

        <Link href="/pricing" style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "40px" }}>
          ← Back to pricing
        </Link>

        <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "20px", padding: "48px 40px", textAlign: "center" }}>
          <div style={{ width: "56px", height: "56px", backgroundColor: "#eef2ff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <svg width="24" height="24" fill="none" stroke="#3730a3" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 8px" }}>
            Start your membership
          </h1>
          <p style={{ fontSize: "15px", color: "#6b6880", margin: "0 0 32px", lineHeight: 1.6 }}>
            You'll be taken to Stripe to complete your payment securely. Then you'll have instant access to the full video library.
          </p>

          <div style={{ backgroundColor: "#faf8f5", borderRadius: "12px", padding: "20px 24px", marginBottom: "32px", textAlign: "left" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "15px", fontWeight: 500, color: "#1e1b2e" }}>Family membership</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 300, color: "#1e1b2e" }}>$39/mo</span>
            </div>
            <p style={{ fontSize: "13px", color: "#6b6880", margin: 0 }}>Unlimited videos · Monthly Q&A · Activity sheets · Cancel anytime</p>
          </div>

          {error && (
            <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "12px 16px", fontSize: "14px", color: "#b91c1c", marginBottom: "20px" }}>
              {error}
            </div>
          )}

          <button
            onClick={handleSubscribe}
            disabled={loading}
            style={{ width: "100%", backgroundColor: "#3730a3", color: "white", border: "none", borderRadius: "999px", padding: "16px", fontSize: "16px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, fontFamily: "inherit" }}
          >
            {loading ? "Redirecting to payment..." : "Continue to payment →"}
          </button>

          <p style={{ fontSize: "12px", color: "#6b6880", margin: "16px 0 0", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
            Secured by Stripe
          </p>
        </div>
      </div>
    </main>
  );
}