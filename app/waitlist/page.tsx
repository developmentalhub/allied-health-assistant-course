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

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 16px",
    borderRadius: "12px",
    border: "1.5px solid #e8e4de",
    fontSize: "15px",
    color: "#1e1b2e",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    backgroundColor: "#faf8f5",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "14px",
    fontWeight: 500,
    color: "#1e1b2e",
    marginBottom: "6px",
  };

  const fieldStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  };

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
            Thank you — we heard you
          </h1>
          <p style={{ fontSize: "15px", color: "#6b6880", lineHeight: 1.7, margin: "0 0 32px" }}>
            Your response directly helps us decide which sessions to build next. We'll be in touch as soon as something matching your needs is ready to book.
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
          Help us build what you need
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 20px", lineHeight: 1.2 }}>
          Your voice shapes what we build next
        </h1>
        <p style={{ fontSize: "16px", color: "#4a4660", lineHeight: 1.8, margin: "0 0 16px", fontWeight: 300 }}>
          Developmental Hub is Play Move Improve's new telehealth platform — built so that busy families, and those in rural and regional areas, can finally access the expert support their child needs without the waitlists, the travel, or the cost of private appointments.
        </p>
        <p style={{ fontSize: "16px", color: "#6b6880", lineHeight: 1.8, margin: "0 0 48px", fontWeight: 300 }}>
          We're in the early stages and we want to hear from real families before we hire practitioners and schedule sessions. Tell us your child's age and what you're struggling with most. When enough families need the same thing, we make it happen — and you'll be the first to know.
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
              <label style={labelStyle}>
                Tell us more about what your family is finding hard{" "}
                <span style={{ color: "#6b6880", fontWeight: 400 }}>(optional)</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="e.g. My 4 year old really struggles with transitions and I can't find anyone in our area who can help..."
                style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
              />
              <p style={{ fontSize: "12px", color: "#6b6880", margin: 0, lineHeight: 1.5 }}>
                The more you share, the better we can tailor sessions to what families actually need.
              </p>
            </div>

            {error && (
              <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "12px 16px", fontSize: "14px", color: "#b91c1c" }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", backgroundColor: "#3730a3", color: "white", border: "none", borderRadius: "999px", padding: "14px", fontSize: "15px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, fontFamily: "inherit" }}
            >
              {loading ? "Submitting…" : "Share what your family needs"}
            </button>

          </form>
        </div>

        <p style={{ fontSize: "13px", color: "#6b6880", textAlign: "center", marginTop: "20px", lineHeight: 1.6 }}>
          Your response directly influences which sessions we create. We'll only contact you when a session matching your interest is ready to book.
        </p>

      </div>
    </div>
  );
}