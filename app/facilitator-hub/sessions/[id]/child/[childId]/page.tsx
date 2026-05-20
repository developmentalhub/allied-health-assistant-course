"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ChildNotesPage({
  params,
}: {
  params: { id: string; childId: string };
}) {
  const router = useRouter();
  const { id: sessionId, childId } = params;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [child, setChild] = useState<any>(null);
  const [existingNotes, setExistingNotes] = useState<any[]>([]);
  const [existingActions, setExistingActions] = useState<any[]>([]);
  const [note, setNote] = useState("");
  const [actionTitle, setActionTitle] = useState("");
  const [actionDescription, setActionDescription] = useState("");

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data: childData } = await supabase
        .from("children")
        .select("*")
        .eq("id", childId)
        .single();

      const { data: notes } = await supabase
        .from("session_notes")
        .select("*")
        .eq("session_id", sessionId)
        .eq("child_id", childId)
        .order("created_at", { ascending: false });

      const { data: actions } = await supabase
        .from("action_items")
        .select("*")
        .eq("session_id", sessionId)
        .eq("child_id", childId)
        .order("created_at", { ascending: false });

      setChild(childData);
      setExistingNotes(notes || []);
      setExistingActions(actions || []);
      setLoading(false);
    }

    load();
  }, [sessionId, childId]);

  async function handleSaveNote(e: React.FormEvent) {
    e.preventDefault();
    if (!note.trim()) return;
    setSaving(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("session_notes").insert({
      session_id: sessionId,
      child_id: childId,
      facilitator_id: user.id,
      note: note.trim(),
    });

    if (!error) {
      setExistingNotes([{ note: note.trim(), created_at: new Date().toISOString() }, ...existingNotes]);
      setNote("");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }

    setSaving(false);
  }

  async function handleSaveAction(e: React.FormEvent) {
    e.preventDefault();
    if (!actionTitle.trim()) return;
    setSaving(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("action_items").insert({
      session_id: sessionId,
      child_id: childId,
      facilitator_id: user.id,
      title: actionTitle.trim(),
      description: actionDescription.trim(),
    });

    if (!error) {
      setExistingActions([{ title: actionTitle.trim(), description: actionDescription.trim(), created_at: new Date().toISOString(), is_completed: false }, ...existingActions]);
      setActionTitle("");
      setActionDescription("");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }

    setSaving(false);
  }

  if (loading) {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }}>
        
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
          <p style={{ color: "#6b6880" }}>Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }}>
      

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "40px 24px 80px" }}>

        <Link
          href={`/facilitator-hub/sessions/${sessionId}`}
          style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "32px" }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to session
        </Link>

        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 300, color: "#1e1b2e", marginBottom: "4px" }}>
          {child?.full_name}
        </h1>
        <p style={{ fontSize: "15px", color: "#6b6880", marginBottom: "40px" }}>
          Session notes and action items for this child
        </p>

        {saved && (
          <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", color: "#166534", fontSize: "14px", padding: "12px 16px", borderRadius: "12px", marginBottom: "24px" }}>
            Saved successfully!
          </div>
        )}

        {/* Session notes */}
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 300, color: "#1e1b2e", marginBottom: "20px" }}>
            Session Notes
          </h2>

          <div style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "28px", marginBottom: "16px" }}>
            <form onSubmit={handleSaveNote} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write your clinical observations and session notes here..."
                rows={5}
                style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box", resize: "vertical", fontFamily: "inherit" }}
              />
              <button
                type="submit"
                disabled={saving || !note.trim()}
                style={{ backgroundColor: "#3730a3", color: "white", padding: "10px 24px", borderRadius: "999px", fontSize: "14px", fontWeight: 500, border: "none", cursor: saving ? "not-allowed" : "pointer", opacity: saving || !note.trim() ? 0.6 : 1, alignSelf: "flex-start" }}
              >
                {saving ? "Saving..." : "Save note"}
              </button>
            </form>
          </div>

          {existingNotes.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {existingNotes.map((n, i) => (
                <div key={i} style={{ backgroundColor: "#faf8f5", borderRadius: "12px", padding: "16px 20px", border: "1px solid #e8e4de" }}>
                  <p style={{ fontSize: "14px", color: "#1e1b2e", lineHeight: 1.7, margin: "0 0 8px 0" }}>{n.note}</p>
                  <p style={{ fontSize: "12px", color: "#b0acbf", margin: 0 }}>
                    {new Date(n.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action items */}
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 300, color: "#1e1b2e", marginBottom: "20px" }}>
            Action Items for Family
          </h2>
          <p style={{ fontSize: "14px", color: "#6b6880", marginBottom: "20px" }}>
            These will appear on the parent dashboard as tasks to complete at home.
          </p>

          <div style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "28px", marginBottom: "16px" }}>
            <form onSubmit={handleSaveAction} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>Action title</label>
                <input
                  type="text"
                  value={actionTitle}
                  onChange={(e) => setActionTitle(e.target.value)}
                  placeholder="e.g. Bear crawls to the letterbox"
                  style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>Description</label>
                <textarea
                  value={actionDescription}
                  onChange={(e) => setActionDescription(e.target.value)}
                  placeholder="Describe the activity in detail so the family knows exactly what to do..."
                  rows={3}
                  style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box", resize: "vertical", fontFamily: "inherit" }}
                />
              </div>
              <button
                type="submit"
                disabled={saving || !actionTitle.trim()}
                style={{ backgroundColor: "#0f766e", color: "white", padding: "10px 24px", borderRadius: "999px", fontSize: "14px", fontWeight: 500, border: "none", cursor: saving ? "not-allowed" : "pointer", opacity: saving || !actionTitle.trim() ? 0.6 : 1, alignSelf: "flex-start" }}
              >
                {saving ? "Saving..." : "Add action item"}
              </button>
            </form>
          </div>

          {existingActions.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {existingActions.map((action, i) => (
                <div key={i} style={{ backgroundColor: "#f0fdfa", borderRadius: "12px", padding: "16px 20px", border: "1px solid #99f6e4" }}>
                  <p style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e", margin: "0 0 4px 0" }}>{action.title}</p>
                  {action.description && (
                    <p style={{ fontSize: "13px", color: "#6b6880", margin: "0 0 8px 0", lineHeight: 1.6 }}>{action.description}</p>
                  )}
                  <p style={{ fontSize: "12px", color: "#b0acbf", margin: 0 }}>
                    {new Date(action.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
