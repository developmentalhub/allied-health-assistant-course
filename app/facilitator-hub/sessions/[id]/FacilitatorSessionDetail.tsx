"use client"

import Link from "next/link"
import { useState } from "react"
import { createClient } from "@/lib/supabase"

interface Child {
  id: string
  full_name: string
  date_of_birth: string | null
  diagnosis: string | null
}

interface Booking {
  id: string
  family_id: string
  status: string
  children: Child | null
}

interface SessionNote {
  id: string
  child_id: string | null
  note: string
  created_at: string
}

interface ActionItem {
  id: string
  child_id: string | null
  title: string
  description: string | null
  is_complete: boolean
}

interface Session {
  id: string
  title: string
  scheduled_at: string
  session_type: string
  duration_minutes: number | null
}

interface Props {
  session: Session
  bookings: Booking[]
  notes: SessionNote[]
  actionItems: ActionItem[]
  facilitatorId: string
}

export default function FacilitatorSessionDetail({
  session,
  bookings,
  notes: initialNotes,
  actionItems: initialActionItems,
  facilitatorId,
}: Props) {
  const supabase = createClient()

  const [notes, setNotes] = useState<SessionNote[]>(initialNotes)
  const [actionItems, setActionItems] = useState<ActionItem[]>(initialActionItems)
  const [activeTab, setActiveTab] = useState<"bookings" | "notes" | "actions">("bookings")

  // Note form state
  const [noteText, setNoteText] = useState("")
  const [noteChildId, setNoteChildId] = useState("")
  const [savingNote, setSavingNote] = useState(false)
  const [noteSaved, setNoteSaved] = useState(false)

  // Action item form state
  const [actionTitle, setActionTitle] = useState("")
  const [actionDescription, setActionDescription] = useState("")
  const [actionChildId, setActionChildId] = useState("")
  const [savingAction, setSavingAction] = useState(false)
  const [actionSaved, setActionSaved] = useState(false)

  const children = bookings
    .map(b => b.children)
    .filter((c): c is Child => c !== null)

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-AU", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    })
  }

  function getChildName(childId: string | null) {
    if (!childId) return "General (all families)"
    const child = children.find(c => c.id === childId)
    return child?.full_name ?? "Unknown child"
  }

  async function saveNote() {
    if (!noteText.trim()) return
    setSavingNote(true)
    const { data, error } = await supabase
      .from("session_notes")
      .insert({
        session_id: session.id,
        facilitator_id: facilitatorId,
        child_id: noteChildId || null,
        note: noteText.trim(),
      })
      .select()
      .single()

    if (!error && data) {
      setNotes([data, ...notes])
      setNoteText("")
      setNoteChildId("")
      setNoteSaved(true)
      setTimeout(() => setNoteSaved(false), 3000)
    }
    setSavingNote(false)
  }

  async function saveActionItem() {
    if (!actionTitle.trim() || !actionChildId) return
    setSavingAction(true)
    const { data, error } = await supabase
      .from("action_items")
      .insert({
        session_id: session.id,
        facilitator_id: facilitatorId,
        child_id: actionChildId,
        title: actionTitle.trim(),
        description: actionDescription.trim() || null,
        is_complete: false,
      })
      .select()
      .single()

    if (!error && data) {
      setActionItems([data, ...actionItems])
      setActionTitle("")
      setActionDescription("")
      setActionChildId("")
      setActionSaved(true)
      setTimeout(() => setActionSaved(false), 3000)
    }
    setSavingAction(false)
  }

  const tabStyle = (tab: string) => ({
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
    background: activeTab === tab ? "#1e1b2e" : "transparent",
    color: activeTab === tab ? "#fff" : "#6b6880",
  } as const)

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px 80px" }}>

      <Link
        href="/facilitator-hub/sessions"
        style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "32px" }}
      >
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to My Sessions
      </Link>

      {/* Session header */}
      <div style={{ marginBottom: "32px" }}>
        <span style={{ fontSize: "12px", fontWeight: 700, padding: "4px 10px", borderRadius: "6px", backgroundColor: "#eef2ff", color: "#3730a3", textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>
          {session.session_type}
        </span>
        <h1 style={{ fontSize: "28px", fontWeight: 300, color: "#1e1b2e", margin: "12px 0 4px", fontFamily: "var(--font-display)" }}>
          {session.title}
        </h1>
        <p style={{ fontSize: "15px", color: "#6b6880" }}>
          {formatDate(session.scheduled_at)}
          {session.duration_minutes && ` · ${session.duration_minutes} minutes`}
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "4px", background: "#f0ede8", borderRadius: "10px", padding: "4px", marginBottom: "32px", width: "fit-content" }}>
        <button style={tabStyle("bookings")} onClick={() => setActiveTab("bookings")}>
          Bookings ({bookings.length})
        </button>
        <button style={tabStyle("notes")} onClick={() => setActiveTab("notes")}>
          Session Notes ({notes.length})
        </button>
        <button style={tabStyle("actions")} onClick={() => setActiveTab("actions")}>
          Action Items ({actionItems.length})
        </button>
      </div>

      {/* BOOKINGS TAB */}
      {activeTab === "bookings" && (
        <div>
          {bookings.length === 0 ? (
            <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "40px 24px", textAlign: "center" as const }}>
              <p style={{ color: "#6b6880" }}>No bookings yet for this session.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "12px" }}>
              {bookings.map(booking => (
                <div key={booking.id} style={{ background: "white", borderRadius: "12px", border: "1px solid #e8e4de", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 600, color: "#1e1b2e", marginBottom: "4px" }}>
                      {booking.children?.full_name ?? "Family"}
                    </div>
                    {booking.children?.diagnosis && (
                      <div style={{ fontSize: "13px", color: "#6b6880" }}>
                        {booking.children.diagnosis}
                      </div>
                    )}
                  </div>
                  <span style={{
                    fontSize: "12px", fontWeight: 600, padding: "4px 10px", borderRadius: "6px",
                    backgroundColor: booking.status === "confirmed" ? "#f0fdf4" : "#fef9c3",
                    color: booking.status === "confirmed" ? "#166534" : "#854d0e",
                  }}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* NOTES TAB */}
      {activeTab === "notes" && (
        <div>
          {/* Add note form */}
          <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "24px", marginBottom: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1e1b2e", marginBottom: "16px" }}>
              Add session note
            </h3>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ fontSize: "13px", color: "#6b6880", display: "block", marginBottom: "6px" }}>
                For which child? (optional)
              </label>
              <select
                value={noteChildId}
                onChange={e => setNoteChildId(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", background: "white" }}
              >
                <option value="">General note (all families)</option>
                {children.map(child => (
                  <option key={child.id} value={child.id}>{child.full_name}</option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "13px", color: "#6b6880", display: "block", marginBottom: "6px" }}>
                Note
              </label>
              <textarea
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                placeholder="Write your session notes here..."
                rows={4}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", resize: "vertical" as const, fontFamily: "inherit", boxSizing: "border-box" as const }}
              />
            </div>
            <button
              onClick={saveNote}
              disabled={savingNote || !noteText.trim()}
              style={{ background: savingNote || !noteText.trim() ? "#c4b5fd" : "#7c3aed", color: "white", border: "none", borderRadius: "8px", padding: "10px 24px", fontSize: "14px", fontWeight: 600, cursor: savingNote || !noteText.trim() ? "not-allowed" : "pointer" }}
            >
              {savingNote ? "Saving..." : noteSaved ? "Saved ✓" : "Save note"}
            </button>
          </div>

          {/* Existing notes */}
          {notes.length === 0 ? (
            <p style={{ color: "#6b6880", fontSize: "14px" }}>No notes yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "12px" }}>
              {notes.map(note => (
                <div key={note.id} style={{ background: "white", borderRadius: "12px", border: "1px solid #e8e4de", padding: "20px 24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#6d28d9", background: "#f5f3ff", padding: "2px 8px", borderRadius: "4px" }}>
                      {getChildName(note.child_id)}
                    </span>
                    <span style={{ fontSize: "12px", color: "#9ca3af" }}>
                      {new Date(note.created_at).toLocaleDateString("en-AU")}
                    </span>
                  </div>
                  <p style={{ fontSize: "14px", color: "#1e1b2e", margin: 0, whiteSpace: "pre-wrap" as const }}>
                    {note.note}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ACTION ITEMS TAB */}
      {activeTab === "actions" && (
        <div>
          {/* Add action item form */}
          <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "24px", marginBottom: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1e1b2e", marginBottom: "16px" }}>
              Send action item to a family
            </h3>
            <p style={{ fontSize: "13px", color: "#6b6880", marginBottom: "16px" }}>
              Action items will appear on the parent's dashboard so they can follow up at home.
            </p>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ fontSize: "13px", color: "#6b6880", display: "block", marginBottom: "6px" }}>
                Which child? <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <select
                value={actionChildId}
                onChange={e => setActionChildId(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", background: "white" }}
              >
                <option value="">Select a child...</option>
                {children.map(child => (
                  <option key={child.id} value={child.id}>{child.full_name}</option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ fontSize: "13px", color: "#6b6880", display: "block", marginBottom: "6px" }}>
                Title <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="text"
                value={actionTitle}
                onChange={e => setActionTitle(e.target.value)}
                placeholder="e.g. Practise deep breathing daily"
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", boxSizing: "border-box" as const }}
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "13px", color: "#6b6880", display: "block", marginBottom: "6px" }}>
                Description (optional)
              </label>
              <textarea
                value={actionDescription}
                onChange={e => setActionDescription(e.target.value)}
                placeholder="Any extra detail or instructions for the family..."
                rows={3}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", resize: "vertical" as const, fontFamily: "inherit", boxSizing: "border-box" as const }}
              />
            </div>
            <button
              onClick={saveActionItem}
              disabled={savingAction || !actionTitle.trim() || !actionChildId}
              style={{ background: savingAction || !actionTitle.trim() || !actionChildId ? "#c4b5fd" : "#7c3aed", color: "white", border: "none", borderRadius: "8px", padding: "10px 24px", fontSize: "14px", fontWeight: 600, cursor: savingAction || !actionTitle.trim() || !actionChildId ? "not-allowed" : "pointer" }}
            >
              {savingAction ? "Sending..." : actionSaved ? "Sent ✓" : "Send to parent dashboard"}
            </button>
          </div>

          {/* Existing action items */}
          {actionItems.length === 0 ? (
            <p style={{ color: "#6b6880", fontSize: "14px" }}>No action items sent yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "12px" }}>
              {actionItems.map(item => (
                <div key={item.id} style={{ background: "white", borderRadius: "12px", border: "1px solid #e8e4de", padding: "20px 24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                    <div>
                      <span style={{ fontSize: "12px", fontWeight: 600, color: "#6d28d9", background: "#f5f3ff", padding: "2px 8px", borderRadius: "4px", marginRight: "8px" }}>
                        {getChildName(item.child_id)}
                      </span>
                      <span style={{ fontWeight: 600, fontSize: "15px", color: "#1e1b2e" }}>
                        {item.title}
                      </span>
                    </div>
                    <span style={{
                      fontSize: "12px", fontWeight: 600, padding: "2px 8px", borderRadius: "4px",
                      background: item.is_complete ? "#f0fdf4" : "#fef9c3",
                      color: item.is_complete ? "#166534" : "#854d0e",
                    }}>
                      {item.is_complete ? "Complete" : "Pending"}
                    </span>
                  </div>
                  {item.description && (
                    <p style={{ fontSize: "13px", color: "#6b6880", margin: "6px 0 0" }}>
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
