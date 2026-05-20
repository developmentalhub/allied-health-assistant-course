"use client";

import { useState } from "react";

import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AddChildPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [goalOne, setGoalOne] = useState("");
  const [goalTwo, setGoalTwo] = useState("");
  const [activityOne, setActivityOne] = useState("");
  const [activityTwo, setActivityTwo] = useState("");
  const [activityThree, setActivityThree] = useState("");
  const [healthHistory, setHealthHistory] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    const notes = [
      goalOne && `Goal 1: ${goalOne}`,
      goalTwo && `Goal 2: ${goalTwo}`,
      activityOne && `Favourite activity 1: ${activityOne}`,
      activityTwo && `Favourite activity 2: ${activityTwo}`,
      activityThree && `Favourite activity 3: ${activityThree}`,
      healthHistory && `Health and development history: ${healthHistory}`,
      additionalNotes && `Additional notes: ${additionalNotes}`,
    ].filter(Boolean).join("\n\n");

    const { error: insertError } = await supabase.from("children").insert({
      parent_id: user.id,
      full_name: fullName,
      date_of_birth: dateOfBirth || null,
      gender: gender || null,
      notes: notes || null,
    });

    if (insertError) {
      setError(insertError.message);
      setSaving(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }}>
      

      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "40px 24px 80px" }}>

        <Link
          href="/dashboard"
          style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "32px" }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to dashboard
        </Link>

        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 300, color: "#1e1b2e", marginBottom: "8px" }}>
          Add a child
        </h1>
        <p style={{ fontSize: "15px", color: "#6b6880", marginBottom: "32px" }}>
          Tell us a little about your child so our team can support you well.
        </p>

        {/* Confidentiality notice */}
        <div style={{ backgroundColor: "#eef2ff", border: "1px solid #c7d2fe", borderRadius: "16px", padding: "20px 24px", marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <svg width="20" height="20" fill="none" stroke="#3730a3" strokeWidth="2" style={{ flexShrink: 0, marginTop: "1px" }}>
              <circle cx="10" cy="10" r="8"/>
              <path d="M10 6v4M10 14h.01" strokeLinecap="round"/>
            </svg>
            <div>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#3730a3", margin: "0 0 6px 0" }}>
                Your information is completely confidential
              </p>
              <p style={{ fontSize: "13px", color: "#4338ca", lineHeight: 1.7, margin: 0 }}>
                Everything you share here is private and secure. It is only visible to the Developmental Hub team and the practitioners who run your sessions. We use this information solely to understand your child better and tailor our support to your family's needs. It is never shared with anyone outside our platform.
              </p>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "40px 48px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "32px" }}>

            {/* Basic details */}
            <div>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#b0acbf", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "20px" }}>
                About your child
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>
                    Child's full name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Leo Smith"
                    required
                    style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box" }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>
                    Date of birth <span style={{ color: "#6b6880", fontWeight: 400 }}>(optional)</span>
                  </label>
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box" }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>
                    Gender <span style={{ color: "#6b6880", fontWeight: 400 }}>(optional)</span>
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box", backgroundColor: "white" }}
                  >
                    <option value="">Prefer not to say</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

              </div>
            </div>

            {/* Goals */}
            <div>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#b0acbf", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
                Your goals
              </p>
              <p style={{ fontSize: "13px", color: "#6b6880", marginBottom: "20px", lineHeight: 1.6 }}>
                What are the two most important things you hope your child will gain from working with our team? These help us understand what matters most to your family right now.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>
                    Goal 1 <span style={{ color: "#6b6880", fontWeight: 400 }}>(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={goalOne}
                    onChange={(e) => setGoalOne(e.target.value)}
                    placeholder="e.g. I want my child to feel more confident at school"
                    style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>
                    Goal 2 <span style={{ color: "#6b6880", fontWeight: 400 }}>(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={goalTwo}
                    onChange={(e) => setGoalTwo(e.target.value)}
                    placeholder="e.g. I want to understand how to support their sensory needs at home"
                    style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>
            </div>

            {/* Favourite activities */}
            <div>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#b0acbf", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
                Favourite activities at home
              </p>
              <p style={{ fontSize: "13px", color: "#6b6880", marginBottom: "20px", lineHeight: 1.6 }}>
                What does your child love to do at home right now? This could be anything — playing outside, building blocks, drawing, watching TV, dancing, cooking together. There are no right or wrong answers.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  { label: "Activity 1", value: activityOne, setter: setActivityOne, placeholder: "e.g. Riding their bike" },
                  { label: "Activity 2", value: activityTwo, setter: setActivityTwo, placeholder: "e.g. Drawing and colouring" },
                  { label: "Activity 3", value: activityThree, setter: setActivityThree, placeholder: "e.g. Building with LEGO" },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>
                      {item.label} <span style={{ color: "#6b6880", fontWeight: 400 }}>(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) => item.setter(e.target.value)}
                      placeholder={item.placeholder}
                      style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Health and development history */}
            <div>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#b0acbf", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
                Health and development history
              </p>
              <p style={{ fontSize: "13px", color: "#6b6880", marginBottom: "16px", lineHeight: 1.6 }}>
                Is there anything in your child's health or development history that would be helpful for our team to know? This might include birth history, previous therapies, medical conditions, or anything that has felt significant to you as a parent. You only need to share what you are comfortable with.
              </p>
              <textarea
                value={healthHistory}
                onChange={(e) => setHealthHistory(e.target.value)}
                placeholder="Share as much or as little as you like..."
                rows={4}
                style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box", resize: "vertical", fontFamily: "inherit" }}
              />
            </div>

            {/* Anything else */}
            <div>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#b0acbf", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
                Anything else
              </p>
              <p style={{ fontSize: "13px", color: "#6b6880", marginBottom: "16px", lineHeight: 1.6 }}>
                Is there anything else you would like our team to know before your first session?
              </p>
              <textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Any other context that would help us support your family..."
                rows={3}
                style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box", resize: "vertical", fontFamily: "inherit" }}
              />
            </div>

            {error && (
              <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", fontSize: "14px", padding: "12px 16px", borderRadius: "12px" }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              style={{ width: "100%", backgroundColor: "#0f766e", color: "white", padding: "14px", borderRadius: "999px", fontSize: "15px", fontWeight: 500, border: "none", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.6 : 1 }}
            >
              {saving ? "Saving..." : "Save child profile"}
            </button>

          </form>
        </div>

      </div>
    </main>
  );
}
