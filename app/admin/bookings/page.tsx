import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminBookingsPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!["admin", "superadmin"].includes(profile?.role ?? "")) redirect("/dashboard");

  const { data: bookings } = await supabase
    .from("bookings")
    .select(`
      id,
      status,
      amount_cents,
      created_at,
      session_id,
      family_id,
      sessions (
        title,
        scheduled_at
      ),
      profiles!bookings_family_id_fkey (
        full_name,
        email
      )
    `)
    .order("created_at", { ascending: false });

  // ─── Computed stats ───────────────────────────────────────────────────────
  const total = bookings?.length ?? 0;
  const confirmed = bookings?.filter((b) => b.status === "confirmed").length ?? 0;
  const pending = bookings?.filter((b) => b.status === "pending").length ?? 0;
  const cancelled = bookings?.filter((b) => b.status === "cancelled").length ?? 0;
  const totalRevenue = bookings
    ?.filter((b) => b.status === "confirmed")
    .reduce((sum, b) => sum + (b.amount_cents ?? 0), 0) ?? 0;

  // ─── Styles ───────────────────────────────────────────────────────────────
  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    backgroundColor: "#faf8f5",
    padding: "40px 24px 80px",
    fontFamily: "DM Sans, sans-serif",
    color: "#1e1b2e",
  };

  const innerStyle: React.CSSProperties = { maxWidth: "1100px", margin: "0 auto" };

  const headingStyle: React.CSSProperties = {
    fontFamily: "var(--font-display), Fraunces, Georgia, serif",
    fontSize: "32px",
    fontWeight: 300,
    color: "#1e1b2e",
    margin: "0 0 8px",
  };

  const statsRowStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "16px",
    marginBottom: "40px",
  };

  const statCardStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    border: "1px solid #e8e4de",
    borderRadius: "12px",
    padding: "20px 24px",
  };

  const statLabelStyle: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#6b6880",
    marginBottom: "6px",
  };

  const statValueStyle: React.CSSProperties = {
    fontSize: "28px",
    fontWeight: 600,
    color: "#1e1b2e",
    lineHeight: 1,
    margin: 0,
  };

  const tableCardStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    border: "1px solid #e8e4de",
    borderRadius: "16px",
    overflow: "hidden",
  };

  const thStyle: React.CSSProperties = {
    padding: "12px 16px",
    textAlign: "left",
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#6b6880",
    backgroundColor: "#faf8f5",
    borderBottom: "1px solid #e8e4de",
  };

  const tdStyle: React.CSSProperties = {
    padding: "14px 16px",
    fontSize: "14px",
    color: "#1e1b2e",
    borderBottom: "1px solid #f0ede8",
    verticalAlign: "middle",
  };

  return (
    <div style={pageStyle}>
      <div style={innerStyle}>

        <Link href="/admin" style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "24px" }}>
          ← Back to admin
        </Link>

        <h1 style={headingStyle}>Bookings</h1>
        <p style={{ fontSize: "15px", color: "#6b6880", margin: "0 0 40px" }}>
          All bookings across every session
        </p>

        {/* Stats */}
        <div style={statsRowStyle}>
          {[
            { label: "Total bookings", value: total, color: "#1e1b2e" },
            { label: "Confirmed", value: confirmed, color: "#166534" },
            { label: "Pending", value: pending, color: "#92400e" },
            { label: "Cancelled", value: cancelled, color: "#b91c1c" },
            { label: "Revenue captured", value: `$${(totalRevenue / 100).toFixed(2)}`, color: "#3730a3" },
          ].map((stat) => (
            <div key={stat.label} style={statCardStyle}>
              <p style={statLabelStyle}>{stat.label}</p>
              <p style={{ ...statValueStyle, color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={tableCardStyle}>
          {!bookings || bookings.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 24px", color: "#6b6880", fontSize: "15px" }}>
              No bookings yet.
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Session", "Family", "Email", "Amount", "Status", "Date booked"].map((h) => (
                    <th key={h} style={thStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => {
                  // Supabase returns joins as arrays — take first element
                  const sessionData = Array.isArray(booking.sessions)
                    ? booking.sessions[0]
                    : booking.sessions;
                  const familyData = Array.isArray(booking.profiles)
                    ? booking.profiles[0]
                    : booking.profiles;

                  const sessionTitle = (sessionData as { title?: string } | null)?.title ?? "—";
                  const sessionDate = (sessionData as { scheduled_at?: string } | null)?.scheduled_at;
                  const familyName = (familyData as { full_name?: string } | null)?.full_name ?? "—";
                  const familyEmail = (familyData as { email?: string } | null)?.email ?? "—";

                  const bookedAt = booking.created_at
                    ? new Date(booking.created_at).toLocaleDateString("en-AU", {
                        day: "numeric", month: "short", year: "numeric",
                      })
                    : "—";

                  const statusBg =
                    booking.status === "confirmed" ? "#f0fdf4" :
                    booking.status === "cancelled" ? "#fef2f2" :
                    "#fffbeb";
                  const statusColor =
                    booking.status === "confirmed" ? "#166534" :
                    booking.status === "cancelled" ? "#b91c1c" :
                    "#92400e";

                  return (
                    <tr key={booking.id}>
                      <td style={tdStyle}>
                        <span style={{ fontWeight: 500 }}>{sessionTitle}</span>
                        {sessionDate && (
                          <span style={{ display: "block", fontSize: "12px", color: "#6b6880", marginTop: "2px" }}>
                            {new Date(sessionDate).toLocaleDateString("en-AU", {
                              day: "numeric", month: "short", year: "numeric",
                            })}
                          </span>
                        )}
                      </td>
                      <td style={tdStyle}>{familyName}</td>
                      <td style={tdStyle}>
                        <a href={`mailto:${familyEmail}`} style={{ color: "#3730a3", textDecoration: "none" }}>
                          {familyEmail}
                        </a>
                      </td>
                      <td style={tdStyle}>${((booking.amount_cents ?? 0) / 100).toFixed(2)}</td>
                      <td style={tdStyle}>
                        <span style={{
                          display: "inline-block",
                          padding: "3px 10px",
                          borderRadius: "999px",
                          fontSize: "12px",
                          fontWeight: 600,
                          backgroundColor: statusBg,
                          color: statusColor,
                          textTransform: "capitalize",
                        }}>
                          {booking.status ?? "pending"}
                        </span>
                      </td>
                      <td style={tdStyle}>{bookedAt}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}