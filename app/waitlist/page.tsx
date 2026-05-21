"use client";

import { useState } from "react";
import Link from "next/link";

const ageGroups = ["0–2 years", "3–5 years", "6–8 years"];

const topics = [
  "Gross Motor Development",
  "Fine Motor Skills",
  "Sensory Processing",
  "Literacy and School Readiness",
  "Play and Social Skills",
  "Regulation and Big Emotions",
  "Social Skills and Confidence",
  "Sleep and Settling",
  "Other",
];

export default function WaitlistPage() {
  const [form, setForm] = useState({ name: "", email: "", age_group: "", topic: "", message: "" });
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

    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1.5px solid #e8e4de", fontSize: "15px", color: "#1e1b2e", outline: "none", boxSizing: "border-box", fontFamily: "inherit", backgroundColor: "#faf8f5" };
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
            You're on the waitlist
          </h1>
          <p style={{ fontSize: "15px", color: "#6b6880", lineHeight: 1.7, margin: "0 0 32px" }}>
            Thank you for letting us know what your family needs. We'll reach out as soon as a session matching your interest is ready to book.
          </p>
          <Link href="/" style={{ backgroundColor: "#3730a3", color: "white", padding: "12px 28px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#faf8f5", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e" }}>
      <div style={{ maxWidth: "560px", margin: "0 auto", padding: "64px 24px 100px" }}>

        <Link href="/" style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "40px" }}>
          ← Back to home
        </Link>

        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3730a3", marginBottom: "12px" }}>
          Session waitlist
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 12px", lineHeight: 1.2 }}>
          Tell us what your family needs
        </h1>
        <p style={{ fontSize: "16px", color: "#6b6880", lineHeight: 1.7, margin: "0 0 48px", fontWeight: 300 }}>
          We build our session schedule around demand. When enough families are interested in a topic, we bring in a specialist and make it happen. No interest, no session — and no charge until it runs.
        </p>

        <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "16px", padding: "40px" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            <div style={fieldStyle}>
              <label style={labelStyle}>Your name</label>
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Jane Smith" style={inputStyle} />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Email address</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="jane@example.com" style={inputStyle} />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Your child's age group</label>
              <select name="age_group" value={form.age_group} onChange={handleChange} required style={inputStyle}>
                <option value="">Select an age group</option>
                {ageGroups.map((ag) => <option key={ag} value={ag}>{ag}</option>)}
              </select>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Topic you're most interested in</label>
              <select name="topic" value={form.topic} onChange={handleChange} required style={inputStyle}>
                <option value="">Select a topic</option>
                {topics.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Anything else you'd like us to know <span style={{ color: "#6b6880", fontWeight: 400 }}>(optional)</span></label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="e.g. my child is 4 and really struggles with transitions..." style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} />
            </div>

            {error && (
              <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "12px 16px", fontSize: "14px", color: "#b91c1c" }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={{ width: "100%", backgroundColor: "#3730a3", color: "white", border: "none", borderRadius: "999px", padding: "14px", fontSize: "15px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, fontFamily: "inherit" }}>
              {loading ? "Submitting…" : "Join the waitlist"}
            </button>

          </form>
        </div>

        <p style={{ fontSize: "13px", color: "#6b6880", textAlign: "center", marginTop: "20px", lineHeight: 1.6 }}>
          We'll only contact you about sessions matching your interest. No spam, ever.
        </p>
      </div>
    </div>
  );
}