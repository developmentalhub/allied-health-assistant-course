"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function SubscribeForm() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [affiliateCode, setAffiliateCode] = useState(searchParams.get("ref") ?? "");
  const [affiliateValid, setAffiliateValid] = useState<boolean | null>(null);
  const [affiliatePartner, setAffiliatePartner] = useState("");

  useEffect(() => {
    if (!affiliateCode.trim()) { setAffiliateValid(null); setAffiliatePartner(""); return; }
    const timer = setTimeout(async () => {
      const res = await fetch(`/api/affiliate?code=${affiliateCode.trim()}`);
      const data = await res.json();
      setAffiliateValid(data.valid);
      setAffiliatePartner(data.valid ? data.partner_name : "");
    }, 500);
    return () => clearTimeout(timer);
  }, [affiliateCode]);

  async function handleSubscribe() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          affiliate_code: affiliateValid ? affiliateCode.trim() : null,
        }),
      });
      const data = await res.json();
      if (data.error === "already_subscribed") {
        window.location.href = "/login?redirect=/videos";
        return;
      }
      if (!res.ok) throw new Error(data.error);
      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      setLoading(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 16px", borderRadius: "12px",
    border: `1.5px solid ${affiliateValid === true ? "#bbf7d0" : affiliateValid === false ? "#fecaca" : "#e8e4de"}`,
    fontSize: "15px", color: "#1e1b2e", outline: "none",
    boxSizing: "border-box", fontFamily: "inherit", backgroundColor: "#faf8f5",
  };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e" }}>
      <div style={{ maxWidth: "480px", margin: "0 auto", padding: "80px 24px" }}>

        <Link href="/pricing" style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "40px" }}>
          ← Back to pricing
        </Link>

        <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "20px", padding: "48px 40px", textAlign: "center" }}>

          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 8px" }}>
            Start your free trial
          </h1>
          <p style={{ fontSize: "15px", color: "#6b6880", margin: "0 0 8px", lineHeight: 1.6 }}>
            7 days free, then $39/month. Cancel anytime.
          </p>
          <p style={{ fontSize: "14px", color: "#6b6880", margin: "0 0 32px", lineHeight: 1.6 }}>
            You'll enter your email and card details on the next screen. We'll create your account automatically — no separate sign-up needed.
          </p>

          <div style={{ backgroundColor: "#faf8f5", borderRadius: "12px", padding: "20px 24px", marginBottom: "24px", textAlign: "left" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "15px", fontWeight: 500, color: "#1e1b2e" }}>Family membership</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 300, color: "#1e1b2e" }}>$39/mo</span>
            </div>
            <p style={{ fontSize: "13px", color: "#6b6880", margin: 0 }}>31 videos · Monthly Q&A · Activity sheets · Cancel anytime</p>
          </div>

          {/* Referral code */}
          <div style={{ marginBottom: "24px", textAlign: "left" }}>
            <label style={{ fontSize: "13px", fontWeight: 500, color: "#1e1b2e", display: "block", marginBottom: "6px" }}>
              Referral code <span style={{ color: "#6b6880", fontWeight: 400 }}>(optional)</span>
            </label>
            <input
              value={affiliateCode}
              onChange={(e) => setAffiliateCode(e.target.value.toUpperCase())}
              placeholder="e.g. SARAH-OT"
              style={inputStyle}
            />
            {affiliateValid === true && (
              <p style={{ fontSize: "12px", color: "#166534", margin: "6px 0 0", fontWeight: 500 }}>
                ✓ Referred by {affiliatePartner}
              </p>
            )}
            {affiliateValid === false && affiliateCode.trim() && (
              <p style={{ fontSize: "12px", color: "#b91c1c", margin: "6px 0 0" }}>
                That code doesn't look right. Leave it blank to continue without one.
              </p>
            )}
          </div>

          {error && (
            <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "12px 16px", fontSize: "14px", color: "#b91c1c", marginBottom: "20px", textAlign: "left" }}>
              {error}
            </div>
          )}

          <button
            onClick={handleSubscribe}
            disabled={loading}
            style={{ width: "100%", backgroundColor: "#3730a3", color: "white", border: "none", borderRadius: "999px", padding: "16px", fontSize: "16px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, fontFamily: "inherit" }}
          >
            {loading ? "Redirecting to Stripe..." : "Start 7-day free trial →"}
          </button>

          <p style={{ fontSize: "12px", color: "#6b6880", margin: "16px 0 0", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
            Secured by Stripe · No charge for 7 days
          </p>

          <p style={{ fontSize: "12px", color: "#6b6880", margin: "12px 0 0" }}>
            Already have an account?{" "}
            <Link href="/login?redirect=/videos" style={{ color: "#3730a3", fontWeight: 600, textDecoration: "none" }}>Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function SubscribePage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }} />}>
      <SubscribeForm />
    </Suspense>
  );
}