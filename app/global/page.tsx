"use client";

import { useState } from "react";
import Link from "next/link";

const countries = [
  "Australia", "New Zealand", "United Kingdom", "United States", "Canada",
  "India", "Singapore", "South Africa", "Zimbabwe", "Kenya", "Nigeria",
  "United Arab Emirates", "Ireland", "Germany", "France", "Netherlands",
  "Sweden", "Denmark", "Norway", "Japan", "South Korea", "Philippines",
  "Malaysia", "Hong Kong", "Other"
];

export default function GlobalPage() {
  const [form, setForm] = useState({ name: "", email: "", country: "", timezone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/global-interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Something went wrong.");
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 16px", borderRadius: "12px",
    border: "1.5px solid #e8e4de", fontSize: "15px", color: "#1e1b2e",
    outline: "none", boxSizing: "border-box", fontFamily: "inherit",
    backgroundColor: "#faf8f5",
  };
  const labelStyle: React.CSSProperties = { display: "block", fontSize: "14px", fontWeight: 500, color: "#1e1b2e", marginBottom: "6px" };
  const fieldStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "6px" };

  if (success) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#faf8f5", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", fontFamily: "DM Sans, sans-serif" }}>
        <div style={{ maxWidth: "480px", textAlign: "center" }}>
          <div style={{ width: "56px", height: "56px", backgroundColor: "#f0fdf4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <svg width="24" height="24" fill="none" stroke="#166534" strokeWidth="2">
              <path d="M4 12l6 6L20 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 12px" }}>
            Thank you — we'll be in touch
          </h1>
          <p style={{ fontSize: "15px", color: "#6b6880", lineHeight: 1.7, margin: "0 0 32px" }}>
            We're excited to bring Developmental Hub to families around the world. We'll contact you as soon as sessions are available in your timezone.
          </p>
          <Link href="/" style={{ backgroundColor: "#3730a3", color: "white", padding: "12px 28px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "64px 24px 100px" }}>

        <Link href="/" style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "40px" }}>
          ← Back to home
        </Link>

        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#f5f3ff", border: "1px solid #e0e7ff", borderRadius: "999px", padding: "6px 14px", marginBottom: "20px" }}>
          <span style={{ fontSize: "16px" }}>🌏</span>
          <p style={{ fontSize: "12px", fontWeight: 600, color: "#3730a3", margin: 0, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Coming globally — late 2026
          </p>
        </div>

        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 300, color: "#1e1b2e", margin: "0 0 20px", lineHeight: 1.2 }}>
          Developmental Hub is coming to families worldwide
        </h1>
        <p style={{ fontSize: "16px", color: "#6b6880", lineHeight: 1.8, margin: "0 0 16px", fontWeight: 300 }}>
          Every child deserves access to expert developmental support — not just those lucky enough to live near a specialist. We're building a global platform so that families in rural Zimbabwe, suburban New York, or regional Australia can all access the same quality of care.
        </p>
        <p style={{ fontSize: "16px", color: "#6b6880", lineHeight: 1.8, margin: "0 0 40px", fontWeight: 300 }}>
          We're launching internationally later in 2026 with practitioners based in multiple timezones. Tell us where you are and we'll be in touch as soon as sessions are available for your region.
        </p>

        <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "16px", padding: "40px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 24px" }}>
            Register your interest
          </h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div style={fieldStyle}>
                <label style={labelStyle}>Your name</label>
                <input name="name" value={form.name} onChange={handleChange} required placeholder="Jane Smith" style={inputStyle} />
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Email address</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="jane@example.com" style={inputStyle} />
              </div>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Your country</label>
              <select name="country" value={form.country} onChange={handleChange} required style={inputStyle}>
                <option value="">Select your country</option>
                {countries.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>
                Your timezone <span style={{ color: "#6b6880", fontWeight: 400 }}>(optional)</span>
              </label>
              <input
                name="timezone"
                value={form.timezone}
                onChange={handleChange}
                placeholder="e.g. EST, GMT+2, SAST, JST"
                style={inputStyle}
              />
              <p style={{ fontSize: "12px", color: "#6b6880", margin: 0 }}>
                This helps us schedule sessions at times that work for your region.
              </p>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>
                Anything you'd like us to know? <span style={{ color: "#6b6880", fontWeight: 400 }}>(optional)</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={3}
                placeholder="e.g. I'm a parent of a 4 year old in New York and I'm really interested in your sensory sessions..."
                style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
              />
            </div>

            {error && (
              <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "12px 16px", fontSize: "14px", color: "#b91c1c" }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={{ width: "100%", backgroundColor: "#3730a3", color: "white", border: "none", borderRadius: "999px", padding: "14px", fontSize: "15px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, fontFamily: "inherit" }}>
              {loading ? "Submitting…" : "Register my interest"}
            </button>

          </form>
        </div>

        <p style={{ fontSize: "13px", color: "#6b6880", textAlign: "center", marginTop: "20px", lineHeight: 1.6 }}>
          No commitment. No payment. We'll only contact you when sessions are available for your region.
        </p>
      </div>
    </main>
  );
}