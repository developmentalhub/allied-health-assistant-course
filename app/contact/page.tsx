"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/contact", {
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
    width: "100%", padding: "10px 16px", borderRadius: "12px",
    border: "1.5px solid #e8e4de", fontSize: "15px", color: "#1e1b2e",
    outline: "none", boxSizing: "border-box", fontFamily: "inherit",
    backgroundColor: "#faf8f5",
  };
  const labelStyle: React.CSSProperties = { display: "block", fontSize: "14px", fontWeight: 500, color: "#1e1b2e", marginBottom: "6px" };
  const fieldStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "6px" };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "64px 24px 100px" }}>

        <Link href="/" style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "40px" }}>
          ← Back to home
        </Link>

        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3730a3", marginBottom: "12px" }}>
          Get in touch
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "40px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 16px" }}>
          Contact us
        </h1>
        <p style={{ fontSize: "16px", color: "#6b6880", lineHeight: 1.7, margin: "0 0 48px", fontWeight: 300 }}>
          We'd love to hear from you — whether you have a question about your membership, want to know more about our videos, or are a practitioner interested in working with us.
        </p>

        {/* Contact details */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "40px" }}>
          <a href="mailto:robyn@playmoveimprove.com.au" style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "14px", padding: "20px 24px", textDecoration: "none", display: "block" }}>
            <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b6880", margin: "0 0 8px" }}>Email</p>
            <p style={{ fontSize: "14px", fontWeight: 500, color: "#3730a3", margin: 0 }}>robyn@playmoveimprove.com.au</p>
          </a>
          <a href="https://www.instagram.com/playmoveimprove" target="_blank" rel="noopener noreferrer" style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "14px", padding: "20px 24px", textDecoration: "none", display: "block" }}>
            <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b6880", margin: "0 0 8px" }}>Instagram</p>
            <p style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e", margin: 0 }}>@playmoveimprove</p>
          </a>
          <a href="https://www.facebook.com/playmoveimprove" target="_blank" rel="noopener noreferrer" style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "14px", padding: "20px 24px", textDecoration: "none", display: "block" }}>
            <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b6880", margin: "0 0 8px" }}>Facebook</p>
            <p style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e", margin: 0 }}>@playmoveimprove</p>
          </a>
        </div>

        {/* Contact form */}
        {success ? (
          <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "16px", padding: "40px", textAlign: "center" }}>
            <div style={{ width: "48px", height: "48px", backgroundColor: "#dcfce7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <svg width="22" height="22" fill="none" stroke="#166534" strokeWidth="2">
                <path d="M4 12l6 6L20 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 300, color: "#166534", margin: "0 0 8px" }}>Message sent</h2>
            <p style={{ fontSize: "15px", color: "#166534", margin: 0 }}>Thank you — we'll be in touch within 1–2 business days.</p>
          </div>
        ) : (
          <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "16px", padding: "40px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 24px" }}>Send us a message</h2>
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
                <label style={labelStyle}>What is this about? <span style={{ color: "#6b6880", fontWeight: 400 }}>(optional)</span></label>
                <select name="subject" value={form.subject} onChange={handleChange} style={inputStyle}>
                  <option value="">Select a topic</option>
                 <option value="Question about membership">Question about membership</option>
<option value="Question about videos">Question about videos</option>
<option value="Technical issue">Technical issue</option>
<option value="Practitioner enquiry">Practitioner enquiry</option>
<option value="Something else">Something else</option>
                </select>
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Your message</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell us what's on your mind..." style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} />
              </div>

              {error && (
                <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "12px 16px", fontSize: "14px", color: "#b91c1c" }}>
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading} style={{ width: "100%", backgroundColor: "#3730a3", color: "white", border: "none", borderRadius: "999px", padding: "14px", fontSize: "15px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, fontFamily: "inherit" }}>
                {loading ? "Sending…" : "Send message"}
              </button>

            </form>
          </div>
        )}

      </div>
    </main>
  );
}