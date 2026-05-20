"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const sessionTopics = [
  "Sensory Play at Home",
  "Building Early Literacy Skills Through Play",
  "Understanding Sensory Processing",
  "Motor Development — Supporting Physical Growth",
  "Play Skills That Support Social Development",
  "Fine Motor Skills — Building Strength and Coordination",
  "Gross Motor Development",
  "Emotional Regulation for Young Children",
  "Sleep and Routine for Developmental Needs",
  "School Readiness Through Play",
];

export default function NewSessionPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [facilitators, setFacilitators] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sessionType, setSessionType] = useState("group");
  const [scheduledAt, setScheduledAt] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [capacity, setCapacity] = useState(8);
  const [minimumFamilies, setMinimumFamilies] = useState(6);
  const [priceCents, setPriceCents] = useState(3900);
  const [facilitatorId, setFacilitatorId] = useState("");
  const [facilitatorFeeCents, setFacilitatorFeeCents] = useState(6500);
  const [topic, setTopic] = useState("");
  const [isOwnerWebinar, setIsOwnerWebinar] = useState(false);

  useEffect(() => {
    async function loadFacilitators() {
      const { data } = await supabase
        .from("profiles")
        .select("id, full_name, email")
        .eq("role", "facilitator");
      setFacilitators(data || []);
    }
    loadFacilitators();
  }, []);

  useEffect(() => {
    if (sessionType === "group") {
      setCapacity(8);
      setMinimumFamilies(6);
      setPriceCents(3900);
      setDurationMinutes(45);
      setFacilitatorFeeCents(6500);
      setIsOwnerWebinar(false);
    } else if (sessionType === "webinar-owner") {
      setCapacity(100);
      setMinimumFamilies(30);
      setPriceCents(2500);
      setDurationMinutes(60);
      setFacilitatorFeeCents(0);
      setIsOwnerWebinar(true);
    } else if (sessionType === "webinar-facilitator") {
      setCapacity(100);
      setMinimumFamilies(30);
      setPriceCents(7900);
      setDurationMinutes(60);
      setFacilitatorFeeCents(17500);
      setIsOwnerWebinar(false);
    }
  }, [sessionType]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    const { error: insertError } = await supabase.from("sessions").insert({
      title,
      description,
      session_type: sessionType,
      scheduled_at: new Date(scheduledAt).toISOString(),
      duration_minutes: durationMinutes,
      capacity,
      minimum_families: minimumFamilies,
      price_cents: priceCents,
      facilitator_id: isOwnerWebinar ? user.id : (facilitatorId || null),
      facilitator_fee_cents: facilitatorFeeCents,
      topic,
      status: "scheduled",
    });

    if (insertError) {
      setError(insertError.message);
      setSaving(false);
      return;
    }

    router.push("/admin");
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }}>
      

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "40px 24px 80px" }}>

        <Link
          href="/admin"
          style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "32px" }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Admin
        </Link>

        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 300, color: "#1e1b2e", marginBottom: "8px" }}>
          Create New Session
        </h1>
        <p style={{ fontSize: "15px", color: "#6b6880", marginBottom: "40px" }}>
          Fill in the details below. Prices and capacities are pre-filled based on session type.
        </p>

        <div style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "40px 48px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>Session type</label>
              <select
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value)}
                style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", backgroundColor: "white" }}
              >
                <option value="group">Small Group Session</option>
                <option value="webinar-owner">Webinar — Run by me</option>
                <option value="webinar-facilitator">Webinar — External facilitator</option>
              </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>Session title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Sensory Play at Home — Practical Ideas for Everyday Life"
                required
                style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>Topic</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", backgroundColor: "white" }}
              >
                <option value="">Select a topic</option>
                {sessionTopics.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what families will learn and gain from this session..."
                rows={4}
                style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box", resize: "vertical", fontFamily: "inherit" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>Date and time</label>
              <input
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                required
                style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            {!isOwnerWebinar && (
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>
                  Facilitator <span style={{ color: "#6b6880", fontWeight: 400 }}>(optional)</span>
                </label>
                <select
                  value={facilitatorId}
                  onChange={(e) => setFacilitatorId(e.target.value)}
                  style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", backgroundColor: "white" }}
                >
                  <option value="">Select a facilitator</option>
                  {facilitators.map((f) => (
                    <option key={f.id} value={f.id}>{f.full_name || f.email}</option>
                  ))}
                </select>
              </div>
            )}

            <div style={{ backgroundColor: "#faf8f5", borderRadius: "12px", padding: "20px", border: "1px solid #e8e4de" }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#1e1b2e", margin: "0 0 16px 0" }}>
                Session details (auto-filled based on type)
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "12px", color: "#6b6880" }}>Price per family</label>
                  <input
                    type="number"
                    value={priceCents / 100}
                    onChange={(e) => setPriceCents(Math.round(parseFloat(e.target.value) * 100))}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "10px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "12px", color: "#6b6880" }}>Duration (minutes)</label>
                  <input
                    type="number"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(parseInt(e.target.value))}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "10px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "12px", color: "#6b6880" }}>Max capacity</label>
                  <input
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(parseInt(e.target.value))}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "10px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "12px", color: "#6b6880" }}>Minimum families to run</label>
                  <input
                    type="number"
                    value={minimumFamilies}
                    onChange={(e) => setMinimumFamilies(parseInt(e.target.value))}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "10px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                {!isOwnerWebinar && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "12px", color: "#6b6880" }}>Facilitator fee</label>
                    <input
                      type="number"
                      value={facilitatorFeeCents / 100}
                      onChange={(e) => setFacilitatorFeeCents(Math.round(parseFloat(e.target.value) * 100))}
                      style={{ width: "100%", padding: "8px 12px", borderRadius: "10px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", fontSize: "14px", padding: "12px 16px", borderRadius: "12px" }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              style={{ width: "100%", backgroundColor: "#3730a3", color: "white", padding: "14px", borderRadius: "999px", fontSize: "15px", fontWeight: 500, border: "none", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.6 : 1 }}
            >
              {saving ? "Creating session..." : "Create session"}
            </button>

          </form>
        </div>

      </div>
    </main>
  );
}
