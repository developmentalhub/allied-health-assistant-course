import Navbar from "@/components/Navbar";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirect=/admin");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") redirect("/dashboard");

  const { data: sessions } = await supabase
    .from("sessions")
    .select("*")
    .order("scheduled_at", { ascending: true });

  const { data: facilitators } = await supabase
    .from("profiles")
    .select("id, full_name, email")
    .eq("role", "facilitator");

  const { data: pendingFacilitators } = await supabase
    .from("facilitator_profiles")
    .select("*, profiles(full_name, email)")
    .eq("is_approved", false);

  const { data: bookings } = await supabase
    .from("bookings")
    .select("id, status, amount_cents")
    .eq("status", "confirmed");

  const totalRevenue = (bookings || []).reduce((sum: number, b: any) => sum + (b.amount_cents || 0), 0) / 100;

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }}>
      <Navbar />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px 80px" }}>

        <div style={{ marginBottom: "40px" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b6880", marginBottom: "8px" }}>
            Admin Dashboard
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 300, color: "#1e1b2e", marginBottom: "8px" }}>
            Developmental Hub
          </h1>
          <p style={{ fontSize: "15px", color: "#6b6880" }}>
            Manage sessions, facilitators, and platform settings.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "48px" }}>
          {[
            { label: "Total sessions", value: sessions?.length || 0, color: "#3730a3", bg: "#eef2ff" },
            { label: "Active facilitators", value: facilitators?.length || 0, color: "#0f766e", bg: "#f0fdfa" },
            { label: "Pending approvals", value: pendingFacilitators?.length || 0, color: "#c2410c", bg: "#fff7ed" },
            { label: "Total revenue", value: `$${totalRevenue.toFixed(2)}`, color: "#166534", bg: "#f0fdf4" },
          ].map((stat) => (
            <div key={stat.label} style={{ backgroundColor: stat.bg, borderRadius: "16px", padding: "24px", border: `1px solid ${stat.color}20` }}>
              <p style={{ fontSize: "13px", color: "#6b6880", margin: "0 0 8px 0" }}>{stat.label}</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 300, color: stat.color, margin: 0 }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "48px" }}>
          {[
            { label: "Create new session", href: "/admin/sessions/new", bg: "#3730a3" },
            { label: "Manage facilitators", href: "/admin/facilitators", bg: "#0f766e" },
            { label: "View all bookings", href: "/admin/bookings", bg: "#c2410c" },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              style={{ backgroundColor: action.bg, borderRadius: "16px", padding: "20px 24px", textDecoration: "none", display: "block" }}
            >
              <p style={{ fontSize: "15px", fontWeight: 600, color: "white", margin: "0 0 4px 0" }}>
                {action.label}
              </p>
              <svg width="16" height="16" fill="none" stroke="white" strokeWidth="2" style={{ opacity: 0.7 }}>
                <path d="M4 8h8M8 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ))}
        </div>

        <div style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 300, color: "#1e1b2e", margin: 0 }}>
              All Sessions
            </h2>
            <Link
              href="/admin/sessions/new"
              style={{ backgroundColor: "#3730a3", color: "white", padding: "8px 20px", borderRadius: "999px", fontSize: "13px", fontWeight: 500, textDecoration: "none" }}
            >
              + New session
            </Link>
          </div>

          {!sessions || sessions.length === 0 ? (
            <div style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "48px 24px", textAlign: "center" }}>
              <p style={{ fontSize: "15px", color: "#6b6880", marginBottom: "8px" }}>No sessions created yet.</p>
              <Link
                href="/admin/sessions/new"
                style={{ fontSize: "14px", color: "#3730a3", fontWeight: 500, textDecoration: "none" }}
              >
                Create your first session
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {sessions.map((session: any) => (
                <div
                  key={session.id}
                  style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, padding: "3px 8px", borderRadius: "6px", backgroundColor: "#eef2ff", color: "#3730a3", textTransform: "uppercase" }}>
                        {session.session_type}
                      </span>
                      <span style={{ fontSize: "11px", padding: "3px 8px", borderRadius: "6px", backgroundColor: session.status === "scheduled" ? "#f0fdf4" : "#faf8f5", color: session.status === "scheduled" ? "#166534" : "#6b6880", fontWeight: 500 }}>
                        {session.status}
                      </span>
                    </div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 4px 0" }}>
                      {session.title}
                    </h3>
                    <p style={{ fontSize: "13px", color: "#6b6880", margin: 0 }}>
                      {new Date(session.scheduled_at).toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <Link
                      href={`/admin/sessions/${session.id}/edit`}
                      style={{ fontSize: "13px", fontWeight: 500, color: "#3730a3", textDecoration: "none", padding: "6px 14px", borderRadius: "999px", border: "1px solid #c7d2fe" }}
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {pendingFacilitators && pendingFacilitators.length > 0 && (
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 300, color: "#1e1b2e", marginBottom: "20px" }}>
              Pending Facilitator Approvals
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {pendingFacilitators.map((f: any) => (
                <div
                  key={f.id}
                  style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #fcd34d", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
                >
                  <div>
                    <p style={{ fontSize: "15px", fontWeight: 500, color: "#1e1b2e", margin: "0 0 4px 0" }}>
                      {f.profiles?.full_name || "Unknown"}
                    </p>
                    <p style={{ fontSize: "13px", color: "#6b6880", margin: 0 }}>
                      {f.profiles?.email}
                    </p>
                  </div>
                  <Link
                    href={`/admin/facilitators/${f.id}/approve`}
                    style={{ fontSize: "13px", fontWeight: 500, color: "white", backgroundColor: "#0f766e", textDecoration: "none", padding: "8px 16px", borderRadius: "999px" }}
                  >
                    Review
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}