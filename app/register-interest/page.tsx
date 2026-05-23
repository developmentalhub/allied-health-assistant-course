"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const categoriesByAge: Record<string, { value: string; label: string; description: string }[]> = {
  "0-2": [
    { value: "gross-motor", label: "Movement & Milestones", description: "Tummy time, visual tracking, reflexes, core strength and what to expect" },
    { value: "sensory", label: "Sensory Play", description: "Nature play, everyday resources, outings and finding your baby's sensory sweet spot" },
    { value: "play", label: "Play & Attachment", description: "Eye contact games, joint attention, floor play and building secure bonds" },
    { value: "regulation", label: "Settling & Sleep", description: "Gentle strategies for settling, sleep and building calm predictable routines" },
  ],
  "3-5": [
    { value: "gross-motor", label: "Movement & Coordination", description: "Core strength, reflexes, nature play, small spaces and kindy-ready bodies" },
    { value: "fine-motor", label: "Fine Motor & Hands", description: "Core before pencil, palmar reflex, scissors, threading and hand confidence" },
    { value: "sensory", label: "Sensory Processing", description: "Interoception, toileting, rough and tumble, messy play and when to seek help" },
    { value: "regulation", label: "Big Feelings & Regulation", description: "Meltdowns, vagus nerve, movement for calm, transitions and focus" },
    { value: "play", label: "Play & Learning", description: "Imaginative play, resilience, friendships and playgroup readiness" },
    { value: "literacy", label: "Literacy & Language", description: "Movement for school-ready brains, language through play and stories" },
  ],
    "6-8": [
    { value: "gross-motor", label: "Movement & Coordination", description: "Core strength, reflexes, classroom behaviour and movement for learning" },
    { value: "fine-motor", label: "Handwriting & Independence", description: "Handwriting, lunchboxes, scissors and classroom fine motor skills" },
    { value: "sensory", label: "Sensory Processing", description: "Sensory play vs screens, classroom exhaustion, foundations for handwriting" },
    { value: "regulation", label: "Big Feelings & Regulation", description: "After-school crash, homework avoidance, school reluctance, screen transitions" },
    { value: "play", label: "Play & Outdoor Activity", description: "Green time over screens, free play, sport and active play ideas" },
    { value: "literacy", label: "Literacy & Language", description: "Movement for reading, rhythm, visual tracking and executive function" },
    { value: "social-skills", label: "Social Skills & Resilience", description: "Joint attention, board games, losing gracefully and grit through play" },
  ],
};

const timeSlotsByAge: Record<string, string[]> = {
  "0-2": ["12pm–2pm AEST (weekday)", "Other — I'll specify below"],
  "3-5": ["9am–12pm AEST (weekday)", "Other — I'll specify below"],
  "6-8": ["4pm–6pm AEST (weekday)", "7pm–8pm AEST (weekday)", "Weekend morning", "Other — I'll specify below"],
};

const ageGroupLabels: Record<string, string> = {
  "0-2": "0–2 years",
  "3-5": "3–5 years",
  "6-8": "6–8 years",
};

function InterestForm() {
  const searchParams = useSearchParams();
  const prefilledAge = searchParams.get("age") || "";
  const prefilledCategory = searchParams.get("category") || "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    age_group: prefilledAge,
    session_topic: prefilledCategory,
    preferred_time: "",
    other_details: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const showOtherTime = form.preferred_time === "Other — I'll specify below";

  function handleAgeChange(age: string) {
    setForm((prev) => ({ ...prev, age_group: age, session_topic: "", preferred_time: "" }));
  }

  function handleCategoryChange(cat: string) {
    setForm((prev) => ({ ...prev, session_topic: cat }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/session-interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        age_group: form.age_group,
        session_topic: form.session_topic,
        preferred_time: form.preferred_time,
        preferred_days: null,
        other_details: form.other_details || null,
      }),
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
  const labelStyle: React.CSSProperties = { display: "block", fontSize: "14px", fontWeight: 600, color: "#1e1b2e", marginBottom: "12px" };
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
            Thank you — we heard you
          </h1>
          <p style={{ fontSize: "15px", color: "#6b6880", lineHeight: 1.7, margin: "0 0 32px" }}>
            Your response helps us decide which sessions to schedule first. We'll be in touch as soon as your session is ready to book.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/sessions" style={{ backgroundColor: "#3730a3", color: "white", padding: "12px 24px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
              Browse all topics
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
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "64px 24px 100px" }}>

        <Link href="/" style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "40px" }}>
          ← Back to home
        </Link>

        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3730a3", marginBottom: "12px" }}>
          Tell us what you need
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 12px", lineHeight: 1.2 }}>
          Help us build the right sessions for your family
        </h1>
        <p style={{ fontSize: "15px", color: "#6b6880", lineHeight: 1.7, margin: "0 0 40px", fontWeight: 300 }}>
          Three quick questions. No payment, no commitment. Your answers directly shape which sessions we schedule first.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "36px" }}>

          {/* Name + Email */}
          <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "16px", padding: "28px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={fieldStyle}>
              <label style={{ ...labelStyle, marginBottom: "6px" }}>Your name</label>
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Jane Smith" style={inputStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={{ ...labelStyle, marginBottom: "6px" }}>Email address</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="jane@example.com" style={inputStyle} />
            </div>
          </div>

          {/* Question 1 — Age group */}
          <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "16px", padding: "28px" }}>
            <label style={labelStyle}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "24px", height: "24px", backgroundColor: "#3730a3", color: "white", borderRadius: "50%", fontSize: "12px", fontWeight: 700, marginRight: "10px" }}>1</span>
              How old is your child?
            </label>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {Object.entries(ageGroupLabels).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleAgeChange(value)}
                  style={{ padding: "10px 20px", borderRadius: "999px", border: form.age_group === value ? "2px solid #3730a3" : "1.5px solid #e8e4de", backgroundColor: form.age_group === value ? "#eef2ff" : "white", color: form.age_group === value ? "#3730a3" : "#6b6880", fontSize: "14px", fontWeight: form.age_group === value ? 600 : 400, cursor: "pointer", fontFamily: "inherit" }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2 — Category */}
          {form.age_group && (
            <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "16px", padding: "28px" }}>
              <label style={labelStyle}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "24px", height: "24px", backgroundColor: "#3730a3", color: "white", borderRadius: "50%", fontSize: "12px", fontWeight: 700, marginRight: "10px" }}>2</span>
                What does your family need most right now?
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "10px" }}>
                {categoriesByAge[form.age_group].map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => handleCategoryChange(cat.value)}
                    style={{ padding: "14px 16px", borderRadius: "12px", border: form.session_topic === cat.value ? "2px solid #3730a3" : "1.5px solid #e8e4de", backgroundColor: form.session_topic === cat.value ? "#eef2ff" : "white", textAlign: "left", cursor: "pointer", fontFamily: "inherit" }}
                  >
                    <p style={{ fontSize: "14px", fontWeight: 600, color: form.session_topic === cat.value ? "#3730a3" : "#1e1b2e", margin: "0 0 4px" }}>{cat.label}</p>
                    <p style={{ fontSize: "12px", color: "#6b6880", margin: 0, lineHeight: 1.5 }}>{cat.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 3 — Time slot */}
          {form.session_topic && (
            <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "16px", padding: "28px" }}>
              <label style={labelStyle}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "24px", height: "24px", backgroundColor: "#3730a3", color: "white", borderRadius: "50%", fontSize: "12px", fontWeight: 700, marginRight: "10px" }}>3</span>
                What time works best for you?
              </label>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {timeSlotsByAge[form.age_group].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, preferred_time: slot }))}
                    style={{ padding: "10px 16px", borderRadius: "999px", border: form.preferred_time === slot ? "2px solid #3730a3" : "1.5px solid #e8e4de", backgroundColor: form.preferred_time === slot ? "#eef2ff" : "white", color: form.preferred_time === slot ? "#3730a3" : "#6b6880", fontSize: "14px", fontWeight: form.preferred_time === slot ? 600 : 400, cursor: "pointer", fontFamily: "inherit" }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {showOtherTime && (
                <textarea
                  name="other_details"
                  value={form.other_details}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Tell us what time works for you..."
                  style={{ ...inputStyle, marginTop: "12px", resize: "vertical", lineHeight: 1.6 }}
                />
              )}
            </div>
          )}

          {/* Optional extra detail */}
          {form.preferred_time && !showOtherTime && (
            <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "16px", padding: "28px" }}>
              <label style={{ ...labelStyle, marginBottom: "6px" }}>
                Anything specific you'd like help with? <span style={{ color: "#6b6880", fontWeight: 400 }}>(optional)</span>
              </label>
              <textarea
                name="other_details"
                value={form.other_details}
                onChange={handleChange}
                rows={3}
                placeholder="e.g. My 4 year old really struggles with transitions and meltdowns after kindy..."
                style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
              />
            </div>
          )}

          {error && (
            <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "12px 16px", fontSize: "14px", color: "#b91c1c" }}>
              {error}
            </div>
          )}

          {form.name && form.email && form.age_group && form.session_topic && form.preferred_time && (
            <button type="submit" disabled={loading} style={{ width: "100%", backgroundColor: "#3730a3", color: "white", border: "none", borderRadius: "999px", padding: "16px", fontSize: "16px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, fontFamily: "inherit" }}>
              {loading ? "Submitting…" : "Share what my family needs"}
            </button>
          )}

        </form>

        <p style={{ fontSize: "13px", color: "#6b6880", textAlign: "center", marginTop: "20px", lineHeight: 1.6 }}>
          No payment required. We'll contact you when your session is ready to book.
        </p>
      </div>
    </div>
  );
}

export default function RegisterInterestPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }} />}>
      <InterestForm />
    </Suspense>
  );
}