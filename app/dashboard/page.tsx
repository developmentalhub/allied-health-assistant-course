import Navbar from "@/components/Navbar";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function ParentDashboard() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirect=/dashboard");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const { data: children } = await supabase
    .from("children")
    .select("*")
    .eq("parent_id", user.id);

  const childIds = (children || []).map((c: any) => c.id);

  const { data: actionItems } = childIds.length > 0
    ? await supabase
        .from("action_items")
        .select("*, children(full_name)")
        .in("child_id", childIds)
        .eq("is_completed", false)
        .order("created_at", { ascending: false })
    : { data: [] };

  const { data: sessionNotes } = childIds.length > 0
    ? await supabase
        .from("session_notes")
        .select("*, children(full_name)")
        .in("child_id", childIds)
        .order("created_at", { ascending: false })
        .limit(5)
    : { data: [] };

  const { data: bookings } = await supabase
    .from("bookings")
    .select("*, sessions(id, title, scheduled_at, session_type, duration_minutes, daily_room_url, status)")
    .eq("family_id", user.id)
    .order("created_at", { ascending: false });

  const now = new Date();

  const upcomingBookings = (bookings || []).filter((b: any) => {
    if (!b.sessions?.scheduled_at) return false;
    return new Date(b.sessions.scheduled_at) >= now;
  });

  function formatSessionDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-AU", {
      weekday: "short", day: "numeric", month: "long", year: "numeric",
      timeZone: "Australia/Melbourne",
    });
  }

  function formatSessionTime(dateString: string) {
    return new Date(dateString).toLocaleTimeString("en-AU", {
      hour: "2-digit", minute: "2-digit", hour12: true,
      timeZone: "Australia/Melbourne",
    }) + " AEST";
  }

  function getSessionTypeStyle(sessionType: string) {
    switch (sessionType) {
      case "group": return { label: "Small Group", color: "#c2410c", bg: "#fff7ed" };
      case "webinar-owner": return { label: "Webinar", color: "#3730a3", bg: "#eef2ff" };
      case "webinar-facilitator": return { label: "Specialist Webinar", color: "#166534", bg: "#f0fdf4" };
      default: return { label: sessionType, color: "#6b6880", bg: "#faf8f5" };
    }
  }

  function isJoinable(booking: any): boolean {
    if (!booking.sessions?.scheduled_at) return false;
    if (!booking.sessions?.daily_room_url) return false;
    if (!["confirmed", "pending"].includes(booking.status)) return false;
    const sessionStart = new Date(booking.sessions.scheduled_at);
    const sessionEnd = new Date(sessionStart.getTime() + (booking.sessions.duration_minutes ?? 60) * 60 * 1000);
    const thirtyMinsBefore = new Date(sessionStart.getTime() - 30 * 60 * 1000);
    return now >= thirtyMinsBefore && now <= sessionEnd;
  }

  const displayName = profile?.full_name || user.email || "Family";

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }}>
      <Navbar />
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 24px 80px" }}>

        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 300, color: "#1e1b2e", marginBottom: "8px" }}>
            Welcome back, {displayName}
          </h1>
          <p style={{ fontSize: "15px", color: "#6b6880" }}>Here is what is happening for your family.</p>
        </div>

        {/* Upcoming bookings */}
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 300, color: "#1e1b2e", marginBottom: "20px" }}>
            Upcoming Sessions
          </h2>
          {upcomingBookings.length === 0 ? (
            <div style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "40px 24px", textAlign: "center" }}>
              <p style={{ fontSize: "15px", color: "#6b6880", marginBottom: "16px" }}>You have no upcoming sessions booked.</p>
              <Link href="/sessions" style={{ backgroundColor: "#3730a3", color: "white", padding: "10px 24px", borderRadius: "999px", fontSize: "14px", fontWeight: 500, textDecoration: "none" }}>
                Browse sessions
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {upcomingBookings.map((booking: any) => {
                const typeStyle = getSessionTypeStyle(booking.sessions?.session_type);
                const joinable = isJoinable(booking);
                return (
                  <div key={booking.id} style={{ backgroundColor: "white", borderRadius: "16px", border: joinable ? "1.5px solid #3730a3" : "1px solid #e8e4de", padding: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "6px", backgroundColor: typeStyle.bg, color: typeStyle.color, textTransform: "uppercase" }}>
                          {typeStyle.label}
                        </span>
                        <span style={{ fontSize: "12px", padding: "4px 10px", borderRadius: "6px", backgroundColor: booking.status === "confirmed" ? "#f0fdf4" : "#fffbeb", color: booking.status === "confirmed" ? "#166534" : "#92400e", fontWeight: 500 }}>
                          {booking.status === "confirmed" ? "Confirmed" : "Pending — awaiting minimum numbers"}
                        </span>
                        {joinable && (
                          <span style={{ fontSize: "12px", padding: "4px 10px", borderRadius: "6px", backgroundColor: "#eef2ff", color: "#3730a3", fontWeight: 600 }}>
                            Starting soon
                          </span>
                        )}
                      </div>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 6px" }}>
                        {booking.sessions?.title}
                      </h3>
                      <p style={{ fontSize: "13px", color: "#6b6880", margin: 0 }}>
                        {formatSessionDate(booking.sessions?.scheduled_at)} · {formatSessionTime(booking.sessions?.scheduled_at)}
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      {joinable ? (
                        <Link href={`/sessions/${booking.sessions?.id}/live`} style={{ fontSize: "14px", fontWeight: 600, color: "white", textDecoration: "none", padding: "10px 20px", borderRadius: "999px", backgroundColor: "#3730a3", whiteSpace: "nowrap" }}>
                          Join session
                        </Link>
                      ) : (
                        <Link href={`/sessions/${booking.sessions?.id}`} style={{ fontSize: "13px", fontWeight: 500, color: "#3730a3", textDecoration: "none", padding: "8px 16px", borderRadius: "999px", border: "1px solid #c7d2fe", whiteSpace: "nowrap" }}>
                          View session
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginBottom: "40px" }}>
          {/* Action items */}
          <div style={{ backgroundColor: "white", borderRadius: "20px", border: "1px solid #e8e4de", padding: "28px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 400, color: "#3730a3", marginBottom: "20px" }}>Action Items</h2>
            {!actionItems || actionItems.length === 0 ? (
              <p style={{ fontSize: "14px", color: "#6b6880", fontStyle: "italic" }}>No action items yet. These will appear here after your sessions.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {(actionItems as any[]).map((item: any) => (
                  <div key={item.id} style={{ backgroundColor: "#f5f3ff", borderRadius: "12px", padding: "14px 16px", borderLeft: "4px solid #3730a3" }}>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#1e1b2e", margin: "0 0 4px" }}>{item.title}</p>
                    {item.description && <p style={{ fontSize: "13px", color: "#6b6880", margin: "0 0 6px", lineHeight: 1.6 }}>{item.description}</p>}
                    <p style={{ fontSize: "12px", color: "#b0acbf", margin: 0 }}>For {item.children?.full_name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Children profiles */}
          <div style={{ backgroundColor: "white", borderRadius: "20px", border: "1px solid #e8e4de", padding: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 400, color: "#0f766e", margin: 0 }}>My Children</h2>
              <Link href="/dashboard/children/add" style={{ fontSize: "13px", fontWeight: 500, color: "#0f766e", textDecoration: "none" }}>+ Add child</Link>
            </div>
            {!children || children.length === 0 ? (
              <div>
                <p style={{ fontSize: "14px", color: "#6b6880", marginBottom: "16px" }}>Add your child's profile so practitioners can personalise your sessions.</p>
                <Link href="/dashboard/children/add" style={{ display: "inline-block", backgroundColor: "#0f766e", color: "white", padding: "10px 20px", borderRadius: "999px", fontSize: "13px", fontWeight: 500, textDecoration: "none" }}>
                  Add your first child
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {(children as any[]).map((child: any) => (
                  <div key={child.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#f0fdfa", borderRadius: "12px", padding: "14px 16px", border: "1px solid #99f6e4" }}>
                    <div>
                      <p style={{ fontSize: "15px", fontWeight: 500, color: "#1e1b2e", margin: "0 0 2px" }}>{child.full_name}</p>
                      {child.date_of_birth && <p style={{ fontSize: "12px", color: "#6b6880", margin: 0 }}>DOB: {new Date(child.date_of_birth).toLocaleDateString("en-AU")}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent session notes */}
        {sessionNotes && (sessionNotes as any[]).length > 0 && (
          <div style={{ marginBottom: "40px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 300, color: "#1e1b2e", marginBottom: "20px" }}>Recent Session Notes</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {(sessionNotes as any[]).map((note: any) => (
                <div key={note.id} style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "20px 24px" }}>
                  <p style={{ fontSize: "14px", color: "#1e1b2e", lineHeight: 1.7, margin: "0 0 8px" }}>{note.note}</p>
                  <p style={{ fontSize: "12px", color: "#b0acbf", margin: 0 }}>
                    {note.children?.full_name} · {new Date(note.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resource library */}
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 300, color: "#1e1b2e", marginBottom: "20px" }}>Resource Library</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px" }}>
            {["Gross Motor", "Sensory", "Literacy"].map(cat => (
              <div key={cat} style={{ backgroundColor: "white", padding: "20px", borderRadius: "16px", border: "1px solid #e8e4de", textAlign: "center" }}>
                <span style={{ fontWeight: 600, fontSize: "13px", color: "#475569" }}>{cat} Packs</span>
              </div>
            ))}
          </div>
        </div>

        {/* Browse sessions CTA */}
        <div style={{ backgroundColor: "#3730a3", borderRadius: "24px", padding: "32px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 300, color: "white", marginBottom: "12px" }}>
            Ready to book your next session?
          </h2>
          <p style={{ fontSize: "15px", color: "#c7d2fe", marginBottom: "24px", fontWeight: 300 }}>Browse upcoming small group sessions and webinars.</p>
          <Link href="/sessions" style={{ backgroundColor: "white", color: "#3730a3", padding: "12px 28px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
            Browse sessions
          </Link>
        </div>

      </div>
    </main>
  );
}