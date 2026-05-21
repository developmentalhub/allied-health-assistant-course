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

  // Fetch all bookings with session and family info
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
        scheduled_at,
        session_type
      ),
      profiles!bookings_family_id_fkey (
        full_name,
        email
      )
    `)
    .order("created_at", { ascending: false });

  // ─── Computed values ──────────────────────────────────────────────────────

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

  const innerStyle: React.CSSProperties = {
    maxWidth: "1100px",
    margin: "0 auto",
  };

  const headingStyle: React.CSSProperties = {
    fontFamily: "var(--font-display), Fraunces, Georgia, serif",
    fontSize: "32px",
    fontWeight: 300,
    color: "#1e1b2e",
    margin: "0 0 8px",
  };

  const subStyle: React.CSSProperties = {
    fontSize: "15px",
    color: "#6b6880",
    margin: "0 0 40px",
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
  };

  const tableCardStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    border: "1px solid #e8e4de",
    borderRadius: "16px",
    overflow: "hidden",
  };

  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
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

  const emptyStyle: React.CSSProperties = {
    textAlign: "center",
    padding: "60px 24px",
    color: "#6b6880",
    fontSize: "15px",
  };

  function statusBadge(status: string) {
    const bg =
      status === "confirmed" ? "#f0fdf4" :
      status === "cancelled" ? "#fef2f2" :
      "#fffbeb";
    const color =
      status === "confirmed" ? "#166534" :
      status === "cancelled" ? "#b91c1c" :
      "#92400e";

    return (
      <span style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: 600,
        backgroundColor: bg,
        color,
        textTransform: "capitalize",
      }}>
        {status}
      </span>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={innerStyle}>

        {/* Header */}
        <Link href="/admin" style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "24px" }}>
          ← Back to admin
        </Link>
        <h1 style={headingStyle}>Bookings</h1>
        <p style={subStyle}>All bookings across every session</p>

        {/* Stats */}
        <div style={statsRowStyle}>
          <div style={statCardStyle}>
            <p style={statLabelStyle}>Total bookings</p>
            <p style={statValueStyle}>{total}</p>
          </div>
          <div style={statCardStyle}>
            <p style={statLabelStyle}>Confirmed</p>
            <p style={{ ...statValueStyle, color: "#166534" }}>{confirmed}</p>
          </div>
          <div style={statCardStyle}>
            <p style={statLabelStyle}>Pending</p>
            <p style={{ ...statValueStyle, color: "#92400e" }}>{pending}</p>
          </div>
          <div style={statCardStyle}>
            <p style={statLabelStyle}>Cancelled</p>
            <p style={{ ...statValueStyle, color: "#b91c1c" }}>{cancelled}</p>
          </div>
          <div style={statCardStyle}>
            <p style={statLabelStyle}>Revenue captured</p>
            <p style={{ ...statValueStyle, color: "#3730a3" }}>
              ${(totalRevenue / 100).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Table */}
        <div style={tableCardStyle}>
          {!bookings || bookings.length === 0 ? (
            <div style={emptyStyle}>No bookings yet.</div>
          ) : (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Session</th>
                  <th style={thStyle}>Family</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Amount</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Date booked</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => {
                  const session = booking.sessions as { title: string; scheduled_at: string; session_type: string } | null;
                  const family = booking.profiles as { full_name: string; email: string } | null;
                  const bookedAt = booking.created_at
                    ? new Date(booking.created_at).toLocaleDateString("en-AU", {
                        day: "numeric", month: "short", year: "numeric",
                      })
                    : "—";

                  return (
                    <tr key={booking.id} style={{ transition: "background 0.1s" }}>
                      <td style={tdStyle}>
                        <span style={{ fontWeight: 500 }}>{session?.title ?? "—"}</span>
                        {session?.scheduled_at && (
                          <span style={{ display: "block", fontSize: "12px", color: "#6b6880", marginTop: "2px" }}>
                            {new Date(session.scheduled_at).toLocaleDateString("en-AU", {
                              day: "numeric", month: "short", year: "numeric",
                            })}
                          </span>
                        )}
                      </td>
                      <td style={tdStyle}>{family?.full_name ?? "—"}</td>
                      <td style={tdStyle}>
                        <a href={`mailto:${family?.email}`} style={{ color: "#3730a3", textDecoration: "none" }}>
                          {family?.email ?? "—"}
                        </a>
                      </td>
                      <td style={tdStyle}>
                        ${((booking.amount_cents ?? 0) / 100).toFixed(2)}
                      </td>
                      <td style={tdStyle}>{statusBadge(booking.status ?? "pending")}</td>
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