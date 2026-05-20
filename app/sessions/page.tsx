
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

export default async function SessionsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("sessions")
    .select("*")
    .eq("status", "scheduled")
    .order("scheduled_at", { ascending: true });

  if (type) {
    query = query.eq("session_type", type);
  }

  const { data: sessions } = await query;

  function getSessionStyle(sessionType: string) {
    switch (sessionType) {
      case "group":
        return { tag: "Small Group", tagColor: "#c2410c", tagText: "#ffffff", cardBackground: "#fff7ed", borderColor: "#ea580c" };
      case "webinar-owner":
        return { tag: "Webinar", tagColor: "#3730a3", tagText: "#ffffff", cardBackground: "#eef2ff", borderColor: "#3730a3" };
      case "webinar-facilitator":
        return { tag: "Specialist Webinar", tagColor: "#166534", tagText: "#ffffff", cardBackground: "#f0fdf4", borderColor: "#16a34a" };
      default:
        return { tag: sessionType, tagColor: "#6b6880", tagText: "#ffffff", cardBackground: "#faf8f5", borderColor: "#e8e4de" };
    }
  }

  function formatSessionDate(dateString: string) {
    const date = new Date(dateString);
    // Add 10 hours to convert UTC to AEST
    const aestDate = new Date(date.getTime() + 10 * 60 * 60 * 1000);
    return aestDate.toLocaleDateString("en-AU", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function formatSessionTime(dateString: string) {
    const date = new Date(dateString);
    // Add 10 hours to convert UTC to AEST
    const aestDate = new Date(date.getTime() + 10 * 60 * 60 * 1000);
    return aestDate.toLocaleTimeString("en-AU", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }) + " AEST";
  }

  const tabs = [
    { label: "All sessions", type: null },
    { label: "Small groups", type: "group" },
    { label: "Webinars", type: "webinar-owner" },
    { label: "Specialist webinars", type: "webinar-facilitator" },
  ];

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }}>
      

      {/* Header */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "60px 24px 40px" }}>
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b6880", marginBottom: "12px" }}>
          Upcoming sessions
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "40px", fontWeight: 300, color: "#1e1b2e", marginBottom: "16px" }}>
          Find your session
        </h1>
        <p style={{ fontSize: "16px", color: "#6b6880", maxWidth: "520px", lineHeight: 1.7, fontWeight: 300 }}>
          Browse upcoming small group sessions and webinars. All sessions are live, online, and led by vetted specialists.
        </p>
      </section>

      {/* Legend */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px 24px" }}>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {[
            { label: "Small Group", tagColor: "#c2410c", background: "#fff7ed", borderColor: "#ea580c" },
            { label: "Webinar", tagColor: "#3730a3", background: "#eef2ff", borderColor: "#3730a3" },
            { label: "Specialist Webinar", tagColor: "#166534", background: "#f0fdf4", borderColor: "#16a34a" },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: item.background, border: `1.5px solid ${item.borderColor}`, padding: "6px 14px", borderRadius: "8px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "2px", backgroundColor: item.tagColor }} />
              <span style={{ fontSize: "13px", color: item.tagColor, fontWeight: 600 }}>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Filter tabs */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px 32px" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {tabs.map((tab) => {
            const isActive = (!type && !tab.type) || tab.type === type;
            return (
              <Link
                key={tab.label}
                href={tab.type ? `/sessions?type=${tab.type}` : "/sessions"}
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  padding: "8px 16px",
                  borderRadius: "999px",
                  border: isActive ? "1.5px solid #3730a3" : "1px solid #e8e4de",
                  color: isActive ? "#3730a3" : "#6b6880",
                  textDecoration: "none",
                  backgroundColor: isActive ? "#eef2ff" : "white",
                }}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Sessions grid */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px 80px" }}>
        {!sessions || sessions.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 24px", backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de" }}>
            <p style={{ fontSize: "16px", color: "#6b6880", marginBottom: "8px" }}>No upcoming sessions found.</p>
            <p style={{ fontSize: "14px", color: "#b0acbf" }}>Check back soon — new sessions are added regularly.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
            {sessions.map((session: any) => {
              const style = getSessionStyle(session.session_type);
              return (
                <div
                  key={session.id}
                  style={{ backgroundColor: style.cardBackground, borderRadius: "16px", border: `1.5px solid ${style.borderColor}`, padding: "24px", display: "flex", flexDirection: "column", gap: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "13px", fontWeight: 700, padding: "6px 14px", borderRadius: "8px", backgroundColor: style.tagColor, color: style.tagText, letterSpacing: "0.03em", textTransform: "uppercase" }}>
                      {style.tag}
                    </span>
                    <span style={{ fontSize: "11px", color: "#6b6880" }}>
                      {session.capacity} spots
                    </span>
                  </div>

                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: 400, color: "#1e1b2e", lineHeight: 1.4, margin: 0 }}>
                    {session.title}
                  </h3>

                  {session.description && (
                    <p style={{ fontSize: "13px", color: "#6b6880", margin: 0, lineHeight: 1.6 }}>
                      {session.description.length > 100 ? session.description.substring(0, 100) + "..." : session.description}
                    </p>
                  )}

                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#1e1b2e" }}>
                      <svg width="14" height="14" fill="none" stroke="#6b6880" strokeWidth="1.8">
                        <rect x="1" y="2" width="12" height="11" rx="2"/>
                        <path d="M1 6h12M5 1v2M9 1v2" strokeLinecap="round"/>
                      </svg>
                      {formatSessionDate(session.scheduled_at)}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#6b6880" }}>
                      <svg width="14" height="14" fill="none" stroke="#6b6880" strokeWidth="1.8">
                        <circle cx="7" cy="7" r="5.5"/>
                        <path d="M7 4.5V7l1.5 1.5" strokeLinecap="round"/>
                      </svg>
                      {formatSessionTime(session.scheduled_at)} · {session.duration_minutes} min
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "12px", borderTop: `1px solid ${style.borderColor}40`, marginTop: "auto" }}>
                    <div>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 300, color: "#1e1b2e" }}>
                        ${(session.price_cents / 100).toFixed(0)}
                      </span>
                      <span style={{ fontSize: "11px", color: "#6b6880", marginLeft: "4px" }}>per family</span>
                    </div>
                    <Link
                      href={`/sessions/${session.id}`}
                      style={{ backgroundColor: style.tagColor, color: "white", padding: "8px 18px", borderRadius: "999px", fontSize: "13px", fontWeight: 500, textDecoration: "none" }}
                    >
                      Book now
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

    </main>
  );
}
