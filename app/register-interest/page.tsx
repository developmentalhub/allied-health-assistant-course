"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function mapFormCategoryToDb(formCategoryId: string): string {
    if (formCategoryId === "sensory-baby") return "sensory";
    if (formCategoryId === "regulation-baby" || formCategoryId === "sleep") return "regulation";
    return formCategoryId;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
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
            other_details: form.other_details || null,
          }),
        });

        if (!res.ok) throw new Error("Submission failed");
      }
      setSuccess(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#faf8f5", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", fontFamily: "DM Sans, sans-serif" }}>
        <div style={{ maxWidth: "480px", textAlign: "center" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 12px" }}>
            Thank you — we heard you
          </h1>
          <p style={{ fontSize: "15px", color: "#6b6880", lineHeight: 1.7, margin: "0 0 32px" }}>
            Your response helps us decide which sessions to schedule first. We will be in touch as soon as your session is ready to book.
          </p>
          <Link href="/sessions" style={{ backgroundColor: "#3730a3", color: "white", padding: "12px 24px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            Browse all topics
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#faf8f5", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e", padding: "64px 24px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 12px" }}>
          Help us build the right sessions for your family
        </h1>
        <p style={{ fontSize: "15px", color: "#6b6880", margin: "0 0 40px" }}>
          Three quick questions. Your answers directly shape which sessions we schedule first.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" style={{ padding: "12px", borderRadius: "8px", border: "1px solid #e8e4de" }} />
          <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email address" style={{ padding: "12px", borderRadius: "8px", border: "1px solid #e8e4de" }} />

          {/* Age Selection */}
          <div>
            <p style={{ fontWeight: 600, marginBottom: "10px" }}>1. How old is your child?</p>
            {Object.entries(ageGroupLabels).map(([value, label]) => (
              <button key={value} type="button" onClick={() => handleAgeChange(value)} style={{ padding: "8px 16px", margin: "4px", borderRadius: "999px", border: form.age_group === value ? "2px solid #3730a3" : "1px solid #e8e4de", backgroundColor: form.age_group === value ? "#eef2ff" : "white" }}>
                {label}
              </button>
            ))}
          </div>

          {/* Categories */}
          {form.age_group && (
            <div>
              <p style={{ fontWeight: 600, marginBottom: "10px" }}>2. What does your family need most right now?</p>
              {categoriesByAge[form.age_group].map((cat) => (
                <button key={cat.value} type="button" onClick={() => toggleCategory(cat.value)} style={{ display: "block", width: "100%", padding: "12px", margin: "4px 0", textAlign: "left", borderRadius: "8px", border: selectedCategories.includes(cat.value) ? "2px solid #3730a3" : "1px solid #e8e4de", backgroundColor: selectedCategories.includes(cat.value) ? "#eef2ff" : "white" }}>
                  <strong>{cat.label}</strong>
                  <div style={{ fontSize: "12px", color: "#6b6880" }}>{cat.description}</div>
                </button>
              ))}
            </div>
          )}

          {/* Time Slot */}
          {selectedCategories.length > 0 && (
            <div>
              <p style={{ fontWeight: 600, marginBottom: "10px" }}>3. What time works best for you?</p>
              {timeSlotsByAge[form.age_group].map((slot) => (
                <button key={slot} type="button" onClick={() => setForm(prev => ({ ...prev, preferred_time: slot }))} style={{ padding: "8px 16px", margin: "4px", borderRadius: "999px", border: form.preferred_time === slot ? "2px solid #3730a3" : "1px solid #e8e4de", backgroundColor: form.preferred_time === slot ? "#eef2ff" : "white" }}>
                  {slot}
                </button>
              ))}
              {showOtherTime && <textarea name="other_details" value={form.other_details} onChange={handleChange} placeholder="Specify preferred time..." style={{ width: "100%", marginTop: "10px", padding: "10px" }} />}
            </div>
          )}

          <button type="submit" disabled={loading} style={{ padding: "16px", borderRadius: "999px", backgroundColor: "#3730a3", color: "white", border: "none", cursor: "pointer" }}>
            {loading ? "Submitting..." : "Share what my family needs"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function RegisterInterestPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InterestForm />
    </Suspense>
  );
}