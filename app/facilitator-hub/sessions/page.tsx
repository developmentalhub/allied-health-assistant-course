import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function FacilitatorSessionsPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirect=/facilitator-hub/sessions");

  const { data: upcomingSessions } = await supabase
    .from("sessions")
    .select("*")
    .eq("facilitator_id", user.id)
    .gte("scheduled_at", new Date().toISOString())
    .order("scheduled_at", { ascending: true });

  const { data: pastSessions } = await supabase
    .from("sessions")
    .select("*")
    .eq("facilitator_id", user.id)
    .lt("scheduled_at", new Date().toISOString())
    .order("scheduled_at", { ascending: false });

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-AU", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
      timeZone: "Australia/Melbourne",
    }) + " · " + new Date(dateString).toLocaleTimeString("en-AU", {
      hour: "2-digit", minute: "2-digit", hour12: true,
      timeZone: "Australia/Melbourne",
    }) + " AEST";
  }

  function SessionCard({ session, upcoming }: { session: any; upcoming: boolean }) {
    return (
      <Link
        href={`/facilitator-hub/sessions/${session.id}`}
        style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "24px", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, padding: "4px 10px", borderRadius: "6px", backgroundColor: upcoming ? "#eef2ff" : "#f5f3ff", color: upcoming ? "#3730a3" : "#6b6880", textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>
              {session.session_type === "group" ? "Small Group" : session.session_type === "webinar-owner" ? "Webinar" : "Specialist Webinar"}
            </span>
            <span style={{ fontSize: "12px", padding: "4px 10px", borderRadius: "6px", backgroundColor: session.status === "confirmed" ? "#f0fdf4" : "#fffbeb", color: session.status === "confirmed" ? "#166534" : "#92400e", fontWeight: 500 }}>
              {session.status === "confirmed" ? "Confirmed" : upcoming ? "Scheduled" : "Completed"}
            </span>
          </div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 400, color: "#1e1b2e", marginBottom: "6px" }}>
            {session.title}
          </h3>
          <p style={{ fontSize: "13px", color: "#6b6880", margin: 0 }}>
            {formatDate(session.scheduled_at)}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#3730a3", flexShrink: 0 }}>
          <span style={{ fontSize: "13px", fontWeight: 500 }}>{upcoming ? "View session" : "View notes"}</span>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 8h8M8 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </Link>
    );
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5", fontFamily: "DM Sans, sans-serif" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 24px 80px" }}>

        <Link href="/facilitator-hub" style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "32px" }}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Facilitator Hub
        </Link>

        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 300, color: "#1e1b2e", marginBottom: "8px" }}>My Sessions</h1>
        <p style={{ fontSize: "15px", color: "#6b6880", marginBottom: "40px" }}>Click into any session to view bookings and add notes for families.</p>

        {/* Upcoming */}
        <div style={{ marginBottom: "48px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 300, color: "#1e1b2e", marginBottom: "20px" }}>Upcoming</h2>
          {!upcomingSessions || upcomingSessions.length === 0 ? (
            <div style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "40px 24px", textAlign: "center" }}>
              <p style={{ fontSize: "15px", color: "#6b6880" }}>No upcoming sessions scheduled.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {upcomingSessions.map((session: any) => <SessionCard key={session.id} session={session} upcoming={true} />)}
            </div>
          )}
        </div>

        {/* Past */}
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 300, color: "#1e1b2e", marginBottom: "20px" }}>Past Sessions</h2>
          {!pastSessions || pastSessions.length === 0 ? (
            <div style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "40px 24px", textAlign: "center" }}>
              <p style={{ fontSize: "15px", color: "#6b6880" }}>No past sessions yet.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {pastSessions.map((session: any) => <SessionCard key={session.id} session={session} upcoming={false} />)}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}