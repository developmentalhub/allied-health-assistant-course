"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Updated with parent-friendly language, a separate sleep category, and explicit toddler language.
const categoriesByAge: Record<string, { value: string; label: string; description: string }[]> = {
  "0-2": [
    { value: "gross-motor", label: "Movement & Coordination", description: "Muscle strength, balance, and physical confidence for active play." },
    { value: "play", label: "Play & Exploration", description: "Creative thinking, sharing, and building confidence through play." },
    { value: "sensory-baby", label: "Sensory Tracking & Reactions", description: "How your baby responds to sounds, textures, visual objects, and tracking." },
    { value: "regulation-baby", label: "Baby & Toddler Big Feelings", description: "Supporting emotional shifts, gentle soothing, and early toddler tantrums." },
    { value: "sleep", label: "Sleep & Routines", description: "Supporting natural sleep rhythms and gentle transitions throughout the day." },
  ],
  "3-5": [
    { value: "gross-motor", label: "Movement & Coordination", description: "Muscle strength, balance, and physical confidence for active play." },
    { value: "fine-motor", label: "Handwriting & Independence", description: "Hand strength, pencil grip, scissor skills, and everyday coordination." },
    { value: "sensory", label: "Sensory Preferences & Environment", description: "Understanding how your child reacts to noise, textures, and their surroundings." },
    { value: "regulation", label: "Big Feelings & Regulation", description: "Navigating meltdowns, emotional shifts, and calming daily routines." },
    { value: "play", label: "Play & Exploration", description: "Creative thinking, sharing, and building confidence through play." },
    { value: "literacy", label: "Literacy & Language", description: "Rhymes, talking habits, and rhythm patterns that prepare for reading." },
  ],
  "6-8": [
    { value: "gross-motor", label: "Movement & Coordination", description: "Muscle strength, balance, and physical confidence for active play." },
    { value: "fine-motor", label: "Handwriting & Independence", description: "Hand strength, pencil grip, scissor skills, and everyday coordination." },
    { value: "sensory", label: "Sensory Preferences & Environment", description: "Understanding how your child reacts to noise, textures, and their surroundings." },
    { value: "regulation", label: "Big Feelings & Regulation", description: "Navigating meltdowns, emotional shifts, and calming daily routines." },
    { value: "play", label: "Play & Exploration", description: "Creative thinking, sharing, and building confidence through play." },
    { value: "literacy", label: "Literacy & Language", description: "Rhymes, talking habits, and rhythm patterns that prepare for reading." },
    { value: "social-skills", label: "Social Skills & Resilience", description: "Making friends, reading social situations, and playground confidence." },
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
    preferred_time: "",
    other_details: "",
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    prefilledCategory ? [prefilledCategory] : []
  );
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const showOtherTime = form.preferred_time === "Other — I'll specify below";

  function handleAgeChange(age: string) {
    setForm((prev) => ({ ...prev, age_group: age, preferred_time: "" }));
    setSelectedCategories([]);
  }

  function toggleCategory(cat: string) {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // Maps parent-friendly UI selection keys seamlessly back to core database categories
  function mapFormCategoryToDb(formCategoryId: string): string {
    if (formCategoryId === "sensory-baby") return "sensory";
    if (formCategoryId === "regulation-baby" || formCategoryId === "sleep") return "regulation";
    return formCategoryId;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Submit one record per selected category
    for (const cat of selectedCategories) {
      const dbCategory = mapFormCategoryToDb(cat);
      
      const res = await fetch("/api/session-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          age_group: form.age_group,
          session_topic: dbCategory,
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
          &larr; Back to home
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
              <p style={{ fontSize: "13px", color: "#6b6880", margin: "0 0 14px" }}>Select all that apply — you can choose more than one.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "10px" }}>
                {categoriesByAge[form.age_group].map((cat) => {
                  const selected = selectedCategories.includes(cat.value);
                  return (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => toggleCategory(cat.value)}
                      style={{ padding: "14px 16px", borderRadius: "12px", border: selected ? "2px solid #3730a3" : "1.5px solid #e8e4de", backgroundColor: selected ? "#eef2ff" : "white", textAlign: "left", cursor: "pointer", fontFamily: "inherit", position: "relative" }}
                    >
                      {selected && (
                        <div style={{ position: "absolute", top: "10px", right: "10px", width: "18px", height: "18px", backgroundColor: "#3730a3", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="10" height="10" fill="none" stroke="white" strokeWidth="2.5"><path d="M1.5 5l2.5 2.5L8.5 2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                      )}
                      <p style={{ fontSize: "14px", fontWeight: 600, color: selected ? "#3730a3" : "#1e1b2e", margin: "0 0 4px", paddingRight: selected ? "24px" : "0" }}>{cat.label}</p>
                      <p style={{ fontSize: "12px", color: "#6b6880", margin: 0, lineHeight: 1.5 }}>{cat.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Question 3 — Time slot */}
          {selectedCategories.length > 0 && (
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
          {form.preferred_time && selectedCategories.length > 0 && !showOtherTime && (
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

          {form.name && form.email && form.age_group && selectedCategories.length > 0 && form.preferred_time && (
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