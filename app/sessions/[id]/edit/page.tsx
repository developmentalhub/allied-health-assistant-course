"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";

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

export default function EditSessionPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
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
  const [facilitatorFeeCents, setFacilitatorFeeCents] = useState(17500);
  const [ageGroup, setAgeGroup] = useState("0-2");
  const [category, setCategory] = useState("gross-motor");
  const [blockNumber, setBlockNumber] = useState(1);
  const [status, setStatus] = useState("scheduled");

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
      if (!["admin", "superadmin"].includes(profile?.role ?? "")) { router.push("/dashboard"); return; }

      const { data: session } = await supabase.from("sessions").select("*").eq("id", id).single();
      if (!session) { router.push("/admin"); return; }

      setTitle(session.title ?? "");
      setDescription(session.description ?? "");
      setSessionType(session.session_type ?? "group");
      setScheduledAt(session.scheduled_at ? new Date(session.scheduled_at).toISOString().slice(0, 16) : "");
      setDurationMinutes(session.duration_minutes ?? 60);
      setCapacity(session.capacity ?? 10);
      setMinimumFamilies(session.minimum_families ?? 6);
      setPriceCents(session.price_cents ?? 3900);
      setFacilitatorId(session.facilitator_id ?? "");
      setFacilitatorFeeCents(session.facilitator_fee_cents ?? 17500);
      setAgeGroup(session.age_group ?? "0-2");
      setCategory(session.category ?? "gross-motor");
      setBlockNumber(session.block_number ?? 1);
      setStatus(session.status ?? "scheduled");

      const { data: facs } = await supabase.from("profiles").select("id, full_name, email").eq("role", "facilitator");
      setFacilitators(facs || []);
      setLoading(false);
    }
    load();
  }, [id]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const { error: updateError } = await supabase.from("sessions").update({
      title,
      description,
      session_type: sessionType,
      scheduled_at: new Date(scheduledAt).toISOString(),
      duration_minutes: durationMinutes,
      capacity,
      minimum_families: minimumFamilies,
      price_cents: priceCents,
      facilitator_id: facilitatorId || null,
      facilitator_fee_cents: facilitatorFeeCents,
      age_group: ageGroup,
      category,
      block_number: blockNumber,
      status,
    }).eq("id", id);

    if (updateError) { setError(updateError.message); setSaving(false); return; }
    router.push("/admin");
  }

  const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box", fontFamily: "inherit", backgroundColor: "white" };
  const labelStyle: React.CSSProperties = { fontSize: "14px", fontWeight: 500, color: "#1e1b2e" };
  const fieldStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "6px" };

  if (loading) return <div style={{ minHeight: "100vh", backgroundColor: "#faf8f5", display: "flex", alignItems: "center", justifyContent: "center" }}><p style={{ color: "#6b6880" }}>Loading...</p></div>;

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5", fontFamily: "DM Sans, sans-serif" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "40px 24px 80px" }}>
        <Link href="/admin" style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "32px" }}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Back to Admin
        </Link>

        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 300, color: "#1e1b2e", marginBottom: "8px" }}>Edit Session</h1>
        <p style={{ fontSize: "15px", color: "#6b6880", marginBottom: "40px" }}>Update the details below.</p>

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
            </div>

            {/* Status */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} style={inputStyle}>
                <option value="scheduled">Scheduled</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Session type */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Session type</label>
              <select value={sessionType} onChange={(e) => setSessionType(e.target.value)} style={inputStyle}>
                <option value="group">Small Group (6–10 families)</option>
                <option value="webinar-owner">Webinar — Run by me</option>
                <option value="webinar-facilitator">Webinar — External facilitator</option>
              </select>
            </div>

            {/* Title */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Session title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={inputStyle} />
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
            </div>

            {/* Description */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} style={{ ...inputStyle, resize: "vertical" }} />
            </div>

            {/* Date and time */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Date and time (Melbourne time)</label>
              <input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} required style={inputStyle} />
            </div>

            {/* Facilitator */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Facilitator <span style={{ color: "#6b6880", fontWeight: 400 }}>(optional)</span></label>
              <select value={facilitatorId} onChange={(e) => setFacilitatorId(e.target.value)} style={inputStyle}>
                <option value="">No facilitator assigned</option>
                {facilitators.map((f) => <option key={f.id} value={f.id}>{f.full_name || f.email}</option>)}
              </select>
            </div>

            {/* Session details */}
            <div style={{ backgroundColor: "#faf8f5", borderRadius: "12px", padding: "20px", border: "1px solid #e8e4de" }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#1e1b2e", margin: "0 0 16px" }}>Session details</p>
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
                <div style={fieldStyle}>
                  <label style={{ fontSize: "12px", color: "#6b6880" }}>Facilitator fee ($)</label>
                  <input type="number" value={facilitatorFeeCents / 100} onChange={(e) => setFacilitatorFeeCents(Math.round(parseFloat(e.target.value) * 100))} style={{ ...inputStyle, padding: "8px 12px" }} />
                </div>
              </div>
            </div>

            {error && <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", fontSize: "14px", padding: "12px 16px", borderRadius: "12px" }}>{error}</div>}

            <div style={{ display: "flex", gap: "12px" }}>
              <button type="submit" disabled={saving} style={{ flex: 1, backgroundColor: "#3730a3", color: "white", padding: "14px", borderRadius: "999px", fontSize: "15px", fontWeight: 500, border: "none", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.6 : 1, fontFamily: "inherit" }}>
                {saving ? "Saving..." : "Save changes"}
              </button>
              <Link href="/admin" style={{ flex: 1, backgroundColor: "white", color: "#6b6880", padding: "14px", borderRadius: "999px", fontSize: "15px", fontWeight: 500, border: "1px solid #e8e4de", textDecoration: "none", textAlign: "center" }}>
                Cancel
              </Link>
            </div>

          </form>
        </div>
      </div>
    </main>
  );
}