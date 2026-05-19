import Navbar from "@/components/Navbar";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function FacilitatorSessionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirect=/facilitator-hub/sessions");

  const { data: session } = await supabase
    .from("sessions")
    .select("*")
    .eq("id", id)
    .single();

  if (!session) redirect("/facilitator-hub/sessions");

  const { data: bookings } = await supabase
    .from("bookings")
    .select(`
      id,
      status,
      family_id,
      profiles (
        id,
        full_name,
        email
      )
    `)
    .eq("session_id", id);

  const { data: children } = await supabase
    .from("children")
    .select("*")
    .in("parent_id", (bookings || []).map((b: any) => b.family_id));

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-AU", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }}>
      <Navbar />

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 24px 80px" }}>

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
        <div style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "32px", marginBottom: "32px" }}>
          <span style={{ fontSize: "12px", fontWeight: 700, padding: "4px 10px", borderRadius: "6px", backgroundColor: "#eef2ff", color: "#3730a3", textTransform: "uppercase", letterSpacing: "0.05em", display: "inline-block", marginBottom: "16px" }}>
            {session.session_type}
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 300, color: "#1e1b2e", marginBottom: "8px" }}>
            {session.title}
          </h1>
          <p style={{ fontSize: "14px", color: "#6b6880" }}>
            {formatDate(session.scheduled_at)}
          </p>
        </div>

        {/* Families booked */}
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 300, color: "#1e1b2e", marginBottom: "20px" }}>
          Families Booked ({bookings?.length || 0})
        </h2>

        {!bookings || bookings.length === 0 ? (
          <div style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "40px 24px", textAlign: "center" }}>
            <p style={{ fontSize: "15px", color: "#6b6880" }}>No families have booked this session yet.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {bookings.map((booking: any) => {
              const familyChildren = (children || []).filter(
                (c: any) => c.parent_id === booking.family_id
              );
              return (
                <div
                  key={booking.id}
                  style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "24px" }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: familyChildren.length > 0 ? "20px" : "0" }}>
                    <div>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 400, color: "#1e1b2e", marginBottom: "4px" }}>
                        {booking.profiles?.full_name || "Unknown family"}
                      </h3>
                      <p style={{ fontSize: "13px", color: "#6b6880", margin: 0 }}>
                        {booking.profiles?.email}
                      </p>
                    </div>
                    <span style={{ fontSize: "12px", padding: "4px 10px", borderRadius: "6px", backgroundColor: booking.status === "confirmed" ? "#f0fdf4" : "#fffbeb", color: booking.status === "confirmed" ? "#166534" : "#92400e", fontWeight: 500 }}>
                      {booking.status}
                    </span>
                  </div>

                  {familyChildren.length > 0 && (
                    <div>
                      <p style={{ fontSize: "12px", fontWeight: 600, color: "#b0acbf", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
                        Children
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {familyChildren.map((child: any) => (
                          <Link
                            key={child.id}
                            href={`/facilitator-hub/sessions/${id}/child/${child.id}`}
                            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#faf8f5", borderRadius: "12px", padding: "14px 16px", textDecoration: "none", border: "1px solid #e8e4de" }}
                          >
                            <div>
                              <p style={{ fontSize: "15px", fontWeight: 500, color: "#1e1b2e", margin: "0 0 2px 0" }}>
                                {child.full_name}
                              </p>
                              {child.date_of_birth && (
                                <p style={{ fontSize: "12px", color: "#6b6880", margin: 0 }}>
                                  DOB: {new Date(child.date_of_birth).toLocaleDateString("en-AU")}
                                </p>
                              )}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#3730a3" }}>
                              <span style={{ fontSize: "13px", fontWeight: 500 }}>Add notes</span>
                              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 7h6M7 4l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {familyChildren.length === 0 && (
                    <p style={{ fontSize: "13px", color: "#b0acbf", fontStyle: "italic", marginTop: "12px" }}>
                      This family has not added any children to their profile yet.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}