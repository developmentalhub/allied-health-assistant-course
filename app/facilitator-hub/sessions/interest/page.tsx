"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const timeSlotsByAge: Record<string, string> = {
  "0-2": "12pm–3pm AEST",
  "3-5": "9am–12pm AEST",
  "6-8": "4pm–6pm AEST",
};

const topicsByAge: Record<string, string[]> = {
  "0-2": [
    "First Steps and First Words: The Movement Secret Behind Your Baby's Milestones",
    "Settled and Sleeping: Using Your Baby's Natural Rhythm to Build Calm",
    "Your Floor is Their Classroom: Building a Brain for Life Through Play",
  ],
  "3-5": [
    "Tuned In: Helping Your Child Focus, Listen and Follow Through",
    "Playgroup Ready: Raising a Child Who Connects, Cooperates and Belongs",
    "Moving Towards Reading: How Active Play Builds a School-Ready Brain",
  ],
  "6-8": [
    "Game On: Helping Your Child Move with Confidence on the Field and Court",
    "Reset and Regroup: Movement Strategies for Big Feelings and Hard Days",
    "Grit, Persistence and Teamwork: Building the Physical Foundation for Pro-Social Skills",
  ],
};

const ageGroupLabels: Record<string, string> = {
  "0-2": "0–2 years",
  "3-5": "3–5 years",
  "6-8": "6–8 years",
};

function InterestForm() {
  const searchParams = useSearchParams();
  const prefilledAge = searchParams.get("age") || "";
  const prefilledTopic = searchParams.get("topic") || "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    age_group: prefilledAge,
    session_topic: prefilledTopic,
    preferred_days: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Reset topic when age group changes
    if (e.target.name === "age_group") {
      setForm((prev) => ({ ...prev, age_group: e.target.value, session_topic: "" }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const preferredTime = timeSlotsByAge[form.age_group] || "";

    const res = await fetch("/api/session-interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, preferred_time: preferredTime }),
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

  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: "14px", fontWeight: 500,
    color: "#1e1b2e", marginBottom: "6px",
  };

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
            You're registered
          </h1>
          <p style={{ fontSize: "15px", color: "#6b6880", lineHeight: 1.7, margin: "0 0 32px" }}>
            Thank you for registering your interest. We'll be in touch as soon as this session is scheduled and ready to book.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/sessions" style={{ backgroundColor: "#3730a3", color: "white", padding: "12px 24px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
              Browse more topics
            </Link>
            <Link href="/" style={{ backgroundColor: "white", color: "#1e1b2e", padding: "12px 24px", borderRadius: "999px", fontSize: "14px", fontWeight: 500, textDecoration: "none", border: "1px solid #e8e4de" }}>
              Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#faf8f5", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e" }}>
      <div style={{ maxWidth: "560px", margin: "0 auto", padding: "64px 24px 100px" }}>

        <Link href="/sessions" style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "40px" }}>
          ← Back to sessions
        </Link>

        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3730a3", marginBottom: "12px" }}>
          Register your interest
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 12px", lineHeight: 1.2 }}>
          Save your spot before it opens
        </h1>
        <p style={{ fontSize: "16px", color: "#6b6880", lineHeight: 1.7, margin: "0 0 40px", fontWeight: 300 }}>
          Sessions open for booking at the end of June 2026. Register your interest now and you'll be the first to know when dates are confirmed — and first in line to book.
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
                {Object.entries(ageGroupLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              {form.age_group && (
                <p style={{ fontSize: "12px", color: "#3730a3", fontWeight: 500, margin: 0 }}>
                  Sessions for this age group run {timeSlotsByAge[form.age_group]}
                </p>
              )}
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Topic you're interested in</label>
              <select name="session_topic" value={form.session_topic} onChange={handleChange} required style={inputStyle} disabled={!form.age_group}>
                <option value="">Select a topic</option>
                {(topicsByAge[form.age_group] ?? []).map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>
                Preferred day <span style={{ color: "#6b6880", fontWeight: 400 }}>(optional)</span>
              </label>
              <select name="preferred_days" value={form.preferred_days} onChange={handleChange} style={inputStyle}>
                <option value="">No preference</option>
                <option value="Weekday">Weekday</option>
                <option value="Weekend">Weekend</option>
                <option value="Either">Either works</option>
              </select>
            </div>

            {error && (
              <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "12px 16px", fontSize: "14px", color: "#b91c1c" }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={{ width: "100%", backgroundColor: "#3730a3", color: "white", border: "none", borderRadius: "999px", padding: "14px", fontSize: "15px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, fontFamily: "inherit" }}>
              {loading ? "Registering…" : "Register my interest"}
            </button>

          </form>
        </div>

        <p style={{ fontSize: "13px", color: "#6b6880", textAlign: "center", marginTop: "20px", lineHeight: 1.6 }}>
          No payment required. We'll contact you when your session is ready to book.
        </p>
      </div>
    </div>
  );
}

export default function SessionInterestPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }} />}>
      <InterestForm />
    </Suspense>
  );
}