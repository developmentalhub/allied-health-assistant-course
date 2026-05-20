
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function FacilitatorHubPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/facilitator-hub");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  const { data: facilitatorProfile } = await supabase
    .from("facilitator_profiles")
    .select("*")
    .eq("profile_id", user.id)
    .single();

  const { data: sessions } = await supabase
    .from("sessions")
    .select("*")
    .eq("facilitator_id", user.id)
    .gte("scheduled_at", new Date().toISOString())
    .order("scheduled_at", { ascending: true });

  const displayName = profile?.full_name || user.email || "Facilitator";

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }}>
      

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b6880", marginBottom: "8px" }}>
            Facilitator Hub
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 300, color: "#1e1b2e", marginBottom: "8px" }}>
            Welcome, {displayName}
          </h1>
          <p style={{ fontSize: "15px", color: "#6b6880" }}>
            Manage your sessions, notes, and profile from here.
          </p>
        </div>

        {/* Quick links */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "48px" }}>
          {[
            { label: "My Profile", description: "Update your bio and qualifications", href: "/facilitator-hub/profile", color: "#3730a3", bg: "#eef2ff" },
            { label: "My Sessions", description: "View upcoming and past sessions", href: "/facilitator-hub/sessions", color: "#0f766e", bg: "#f0fdfa" },
            { label: "Banking Details", description: "Set up your payment information", href: "/facilitator-hub/banking", color: "#c2410c", bg: "#fff7ed" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{ backgroundColor: item.bg, border: `1.5px solid ${item.color}20`, borderRadius: "16px", padding: "24px", textDecoration: "none", display: "block" }}
            >
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 400, color: item.color, marginBottom: "6px" }}>
                {item.label}
              </h3>
              <p style={{ fontSize: "13px", color: "#6b6880", margin: 0 }}>
                {item.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Upcoming sessions */}
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "26px", fontWeight: 300, color: "#1e1b2e", marginBottom: "24px" }}>
            Upcoming Sessions
          </h2>

          {!sessions || sessions.length === 0 ? (
            <div style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "48px 24px", textAlign: "center" }}>
              <p style={{ fontSize: "15px", color: "#6b6880", marginBottom: "8px" }}>
                You have no upcoming sessions scheduled.
              </p>
              <p style={{ fontSize: "13px", color: "#b0acbf" }}>
                Sessions you are assigned to will appear here.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {sessions.map((session: any) => (
                <Link
                  key={session.id}
                  href={`/facilitator-hub/sessions/${session.id}`}
                  style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "24px", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}
                >
                  <div>
                    <span style={{ fontSize: "12px", fontWeight: 700, padding: "4px 10px", borderRadius: "6px", backgroundColor: "#eef2ff", color: "#3730a3", textTransform: "uppercase", letterSpacing: "0.05em", display: "inline-block", marginBottom: "10px" }}>
                      {session.session_type}
                    </span>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 400, color: "#1e1b2e", marginBottom: "6px" }}>
                      {session.title}
                    </h3>
                    <p style={{ fontSize: "13px", color: "#6b6880", margin: 0 }}>
                      {new Date(session.scheduled_at).toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#3730a3", flexShrink: 0 }}>
                    <span style={{ fontSize: "13px", fontWeight: 500 }}>View session</span>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 8h8M8 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
