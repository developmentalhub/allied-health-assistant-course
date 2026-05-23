"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const topicsByAgeGroup: Record<string, { label: string; category: string }[]> = {
  "0-2": [
    { label: "Tummy Time to Talking: Building the Brain for Life", category: "gross-motor" },
    { label: "Beyond the White Noise: Using Movement to Regulate Your Baby", category: "sensory" },
    { label: "The Smart Play Environment: Building Intelligence from the Floor Up", category: "play" },
  ],
  "3-5": [
    { label: "The First-Time Listener: Improving Auditory Processing Through Play", category: "sensory" },
    { label: "Confident Socials: How Motor Coordination Builds Social Skills", category: "social-skills" },
    { label: "Movement is Brain Fuel: Preparing for Kindergarten Reading & Writing", category: "literacy" },
  ],
  "6-8": [
    { label: "Sporting Confidence: Enhancing Coordination for the Field and Court", category: "gross-motor" },
    { label: "The Resilient Learner: Using Movement Breaks to Manage Big Emotions", category: "regulation" },
    { label: "Building a Physical Backbone for Social Confidence", category: "social-skills" },
  ],
};

const categoriesByAgeGroup: Record<string, { value: string; label: string }[]> = {
  "0-2": [
    { value: "gross-motor", label: "Gross Motor" },
    { value: "sensory", label: "Sensory" },
    { value: "play", label: "Play" },
  ],
  "3-5": [
    { value: "gross-motor", label: "Gross Motor" },
    { value: "fine-motor", label: "Fine Motor" },
    { value: "sensory", label: "Sensory" },
    { value: "literacy", label: "Literacy" },
    { value: "play", label: "Play" },
    { value: "regulation", label: "Regulation" },
    { value: "social-skills", label: "Social Skills" },
  ],
  "6-8": [
    { value: "gross-motor", label: "Gross Motor" },
    { value: "fine-motor", label: "Fine Motor" },
    { value: "sensory", label: "Sensory" },
    { value: "literacy", label: "Literacy" },
    { value: "play", label: "Play" },
    { value: "regulation", label: "Regulation" },
    { value: "social-skills", label: "Social Skills" },
  ],
};

const suggestedTimes: Record<string, string> = {
  "0-2": "Mon/Wed/Fri 1:00pm–2:00pm AEST",
  "3-5": "Mon–Fri 5:30pm–6:30pm AEST",
  "6-8": "Mon–Fri 10:00am–11:00am or 7:00pm–8:00pm AEST",
};

export default function NewSessionPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [facilitators, setFacilitators] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sessionType, setSessionType] = useState("group");
  const [scheduledAt, setScheduledAt] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [capacity, setCapacity] = useState(10);
  const [minimumFamilies, setMinimumFamilies] = useState(6);
  const [priceCents, setPriceCents] = useState(3900);
  const [facilitatorId, setFacilitatorId] = useState("");
  const [facilitatorFeeCents, setFacilitatorFeeCents] = useState(12500);
  const [isOwnerWebinar, setIsOwnerWebinar] = useState(false);
  const [ageGroup, setAgeGroup] = useState("0-2");
  const [category, setCategory] = useState("gross-motor");
  const [blockNumber, setBlockNumber] = useState(1);

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
    const available = categoriesByAgeGroup[ageGroup];
    if (!available.find((c) => c.value === category)) {
      setCategory(available[0].value);
    }
  }, [ageGroup]);

  function handleTopicSelect(topicLabel: string, topicCategory: string) {
    setTitle(topicLabel);
    setCategory(topicCategory);
  }

  useEffect(() => {
    if (sessionType === "group") {
      setCapacity(10); setMinimumFamilies(6); setPriceCents(3900); setDurationMinutes(60); setFacilitatorFeeCents(17500); setIsOwnerWebinar(false);
    } else if (sessionType === "webinar-owner") {
      setCapacity(100); setMinimumFamilies(25); setPriceCents(2500); setDurationMinutes(60); setFacilitatorFeeCents(0); setIsOwnerWebinar(true);
    } else if (sessionType === "webinar-facilitator") {
      setCapacity(100); setMinimumFamilies(25); setPriceCents(7900); setDurationMinutes(60); setFacilitatorFeeCents(17500); setIsOwnerWebinar(false);
    }
  }, [sessionType]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

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
      age_group: ageGroup,
      category,
      block_number: blockNumber,
      status: "scheduled",
    });

    if (insertError) { setError(insertError.message); setSaving(false); return; }
    router.push("/admin");
  }

  const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box", fontFamily: "inherit", backgroundColor: "white" };
  const labelStyle: React.CSSProperties = { fontSize: "14px", fontWeight: 500, color: "#1e1b2e" };
  const fieldStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "6px" };
  const hintStyle: React.CSSProperties = { fontSize: "12px", color: "#6b6880", marginTop: "2px" };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "40px 24px 80px" }}>

        <Link href="/admin" style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "32px" }}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Admin
        </Link>

        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 300, color: "#1e1b2e", marginBottom: "8px" }}>Create New Session</h1>
        <p style={{ fontSize: "15px", color: "#6b6880", marginBottom: "40px" }}>Prices and capacities are pre-filled based on session type.</p>

        <div style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "40px 48px" }}>
          <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

            {/* Age group */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Age group</label>
              <div style={{ display: "flex", gap: "10px" }}>
                {["0-2", "3-5", "6-8"].map((ag) => (
                  <button key={ag} type="button" onClick={() => setAgeGroup(ag)} style={{ flex: 1, padding: "10px", borderRadius: "10px", border: ageGroup === ag ? "2px solid #3730a3" : "1.5px solid #e8e4de", backgroundColor: ageGroup === ag ? "#eef2ff" : "white", color: ageGroup === ag ? "#3730a3" : "#6b6880", fontWeight: ageGroup === ag ? 600 : 400, fontSize: "14px", cursor: "pointer", fontFamily: "inherit" }}>
                    {ag} yrs
                  </button>
                ))}
              </div>
              <p style={hintStyle}>Suggested times: {suggestedTimes[ageGroup]}</p>
            </div>

            {/* Session type */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Session type</label>
              <select value={sessionType} onChange={(e) => setSessionType(e.target.value)} style={inputStyle}>
                <option value="group">Small Group (6–10 families)</option>
                <option value="webinar-owner">Webinar — Run by me (25–100 families)</option>
                <option value="webinar-facilitator">Webinar — External facilitator (25–100 families)</option>
              </select>
            </div>

            {/* Quick topic picker */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Quick topic picker</label>
              <p style={hintStyle}>Select a topic to auto-fill the title and category</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "4px" }}>
                {topicsByAgeGroup[ageGroup].map((topic) => (
                  <button key={topic.label} type="button" onClick={() => handleTopicSelect(topic.label, topic.category)} style={{ textAlign: "left", padding: "12px 16px", borderRadius: "10px", border: title === topic.label ? "2px solid #3730a3" : "1.5px solid #e8e4de", backgroundColor: title === topic.label ? "#eef2ff" : "#faf8f5", color: title === topic.label ? "#3730a3" : "#1e1b2e", fontSize: "13px", cursor: "pointer", fontFamily: "inherit", lineHeight: 1.4 }}>
                    {topic.label}
                    <span style={{ display: "block", fontSize: "11px", color: "#6b6880", marginTop: "2px", textTransform: "capitalize" }}>{topic.category.replace("-", " ")}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Session title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Tummy Time to Talking" required style={inputStyle} />
            </div>

            {/* Category */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
                {categoriesByAgeGroup[ageGroup].map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            {/* Block number */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Block number</label>
              <input type="number" min={1} value={blockNumber} onChange={(e) => setBlockNumber(parseInt(e.target.value))} style={inputStyle} />
              <p style={hintStyle}>Which 8-week block is this? Block 1 = first run of this topic.</p>
            </div>

            {/* Description */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe what families will learn..." rows={4} style={{ ...inputStyle, resize: "vertical" }} />
            </div>

            {/* Date and time */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Date and time (Melbourne time)</label>
              <input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} required style={inputStyle} />
              <p style={hintStyle}>Enter in Melbourne local time (AEST/AEDT)</p>
            </div>

            {/* Facilitator */}
            {!isOwnerWebinar && (
              <div style={fieldStyle}>
                <label style={labelStyle}>Facilitator <span style={{ color: "#6b6880", fontWeight: 400 }}>(optional)</span></label>
                <select value={facilitatorId} onChange={(e) => setFacilitatorId(e.target.value)} style={inputStyle}>
                  <option value="">Select a facilitator</option>
                  {facilitators.map((f) => (
                    <option key={f.id} value={f.id}>{f.full_name || f.email}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Session details */}
            <div style={{ backgroundColor: "#faf8f5", borderRadius: "12px", padding: "20px", border: "1px solid #e8e4de" }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#1e1b2e", margin: "0 0 16px" }}>Session details (auto-filled — edit if needed)</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div style={fieldStyle}>
                  <label style={{ fontSize: "12px", color: "#6b6880" }}>Price per family ($)</label>
                  <input type="number" value={priceCents / 100} onChange={(e) => setPriceCents(Math.round(parseFloat(e.target.value) * 100))} style={{ ...inputStyle, padding: "8px 12px" }} />
                </div>
                <div style={fieldStyle}>
                  <label style={{ fontSize: "12px", color: "#6b6880" }}>Duration (minutes)</label>
                  <input type="number" value={durationMinutes} onChange={(e) => setDurationMinutes(parseInt(e.target.value))} style={{ ...inputStyle, padding: "8px 12px" }} />
                </div>
                <div style={fieldStyle}>
                  <label style={{ fontSize: "12px", color: "#6b6880" }}>Max capacity</label>
                  <input type="number" value={capacity} onChange={(e) => setCapacity(parseInt(e.target.value))} style={{ ...inputStyle, padding: "8px 12px" }} />
                </div>
                <div style={fieldStyle}>
                  <label style={{ fontSize: "12px", color: "#6b6880" }}>Minimum families to run</label>
                  <input type="number" value={minimumFamilies} onChange={(e) => setMinimumFamilies(parseInt(e.target.value))} style={{ ...inputStyle, padding: "8px 12px" }} />
                </div>
                {!isOwnerWebinar && (
                  <div style={fieldStyle}>
                    <label style={{ fontSize: "12px", color: "#6b6880" }}>Facilitator fee ($)</label>
                    <input type="number" value={facilitatorFeeCents / 100} onChange={(e) => setFacilitatorFeeCents(Math.round(parseFloat(e.target.value) * 100))} style={{ ...inputStyle, padding: "8px 12px" }} />
                  </div>
                )}
              </div>
            </div>

            {error && <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", fontSize: "14px", padding: "12px 16px", borderRadius: "12px" }}>{error}</div>}

            <button type="submit" disabled={saving} style={{ width: "100%", backgroundColor: "#3730a3", color: "white", padding: "14px", borderRadius: "999px", fontSize: "15px", fontWeight: 500, border: "none", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.6 : 1, fontFamily: "inherit" }}>
              {saving ? "Creating session..." : "Create session"}
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}