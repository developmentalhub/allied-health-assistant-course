"use client";

import { useState } from "react";

import Link from "next/link";

export default function BankingDetailsPage() {
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const [accountName, setAccountName] = useState("");
  const [bsb, setBsb] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }}>
      

      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "40px 24px 80px" }}>

        <Link
          href="/facilitator-hub"
          style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "32px" }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Facilitator Hub
        </Link>

        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 300, color: "#1e1b2e", marginBottom: "8px" }}>
          Banking Details
        </h1>
        <p style={{ fontSize: "15px", color: "#6b6880", marginBottom: "32px" }}>
          Your payment details are used to transfer your session fees automatically after each session.
        </p>

        {/* Security notice */}
        <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "16px", padding: "20px 24px", marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <svg width="20" height="20" fill="none" stroke="#166534" strokeWidth="2" style={{ flexShrink: 0, marginTop: "1px" }}>
              <path d="M12 2L3 7v5c0 4.4 3.8 8.5 9 9.5 5.2-1 9-5.1 9-9.5V7l-9-5z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#166534", margin: "0 0 6px 0" }}>
                Your banking details are secure
              </p>
              <p style={{ fontSize: "13px", color: "#166534", lineHeight: 1.7, margin: 0 }}>
                Your details are encrypted and stored securely. They are only used to process your session payments and are never shared with families or third parties. Payments are processed automatically via Stripe Connect.
              </p>
            </div>
          </div>
        </div>

        {/* Stripe Connect notice */}
        <div style={{ backgroundColor: "#fffbeb", border: "1px solid #fcd34d", borderRadius: "16px", padding: "20px 24px", marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <svg width="20" height="20" fill="none" stroke="#92400e" strokeWidth="2" style={{ flexShrink: 0, marginTop: "1px" }}>
              <circle cx="10" cy="10" r="8"/>
              <path d="M10 6v4M10 14h.01" strokeLinecap="round"/>
            </svg>
            <div>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#92400e", margin: "0 0 6px 0" }}>
                Stripe Connect setup coming soon
              </p>
              <p style={{ fontSize: "13px", color: "#92400e", lineHeight: 1.7, margin: 0 }}>
                We are currently setting up Stripe Connect for automatic payments. Once activated, you will complete a short onboarding with Stripe to verify your identity and connect your bank account. In the meantime, please enter your details below so we have them ready.
              </p>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "40px 48px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "32px" }}>

            {/* Australian bank account */}
            <div>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#b0acbf", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "20px" }}>
                Australian bank account
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>
                    Account name
                  </label>
                  <input
                    type="text"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    placeholder="e.g. Jane Smith"
                    style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box" }}
                  />
                </div>

                <div style={{ display: "flex", gap: "16px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
                    <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>BSB</label>
                    <input
                      type="text"
                      value={bsb}
                      onChange={(e) => setBsb(e.target.value)}
                      placeholder="000-000"
                      maxLength={7}
                      style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 2 }}>
                    <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>Account number</label>
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="000000000"
                      style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* International */}
            <div>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#b0acbf", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
                International payments
              </p>
              <p style={{ fontSize: "13px", color: "#6b6880", marginBottom: "16px", lineHeight: 1.6 }}>
                If you are based outside Australia, you can receive payments via PayPal while Stripe Connect is being set up.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>
                  PayPal email <span style={{ color: "#6b6880", fontWeight: 400 }}>(optional)</span>
                </label>
                <input
                  type="email"
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  placeholder="your@paypal.com"
                  style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box" }}
                />
              </div>
            </div>

            {/* Pay rate info */}
            <div style={{ backgroundColor: "#faf8f5", borderRadius: "12px", padding: "16px 20px", border: "1px solid #e8e4de" }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#1e1b2e", margin: "0 0 8px 0" }}>
                Your pay rates
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "#6b6880" }}>Small group session (up to 8 families)</span>
                  <span style={{ color: "#1e1b2e", fontWeight: 600 }}>$65 flat</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "#6b6880" }}>Specialist webinar (up to 100 families)</span>
                  <span style={{ color: "#1e1b2e", fontWeight: 600 }}>$175 flat</span>
                </div>
                <p style={{ fontSize: "12px", color: "#b0acbf", margin: "8px 0 0 0" }}>
                  Paid automatically within 2 business days of your session running.
                </p>
              </div>
            </div>

            {saved && (
              <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", color: "#166534", fontSize: "14px", padding: "12px 16px", borderRadius: "12px" }}>
                Details saved successfully!
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              style={{ width: "100%", backgroundColor: "#3730a3", color: "white", padding: "14px", borderRadius: "999px", fontSize: "15px", fontWeight: 500, border: "none", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.6 : 1 }}
            >
              {saving ? "Saving..." : "Save banking details"}
            </button>

          </form>
        </div>

      </div>
    </main>
  );
}
