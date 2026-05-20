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

  // Map incoming URL shortnames safely to your official database strings
  if (type) {
    if (type === "group") query = query.eq("session_type", "Small Group");
    else if (type === "webinar-owner") query = query.eq("session_type", "Webinar");
    else if (type === "webinar-facilitator") query = query.eq("session_type", "Specialist Webinar");
  }

  const { data: sessions } = await query;

  // Fully updated branding palette using clean inline style objects
  function getSessionStyle(sessionType: string) {
    switch (sessionType) {
      case "Small Group":
        return { 
          tag: "Small Group", 
          tagColor: "#0369a1", // Deep blue text
          tagBg: "#e0f2fe",    // Soft blue badge
          cardBackground: "#ffffff", 
          borderColor: "#bae6fd" 
        };
      case "Webinar":
        return { 
          tag: "Webinar", 
          tagColor: "#b45309", // Deep amber text
          tagBg: "#fef3c7",    // Soft amber badge
          cardBackground: "#ffffff", 
          borderColor: "#fde68a" 
        };
      case "Specialist Webinar":
        return { 
          tag: "Specialist Webinar", 
          tagColor: "#6b21a8", // Deep purple text
          tagBg: "#f3e8ff",    // Soft purple badge
          cardBackground: "#ffffff", 
          borderColor: "#e9d5ff" 
        };
      default:
        return { 
          tag: sessionType, 
          tagColor: "#4b5563", 
          tagBg: "#f3f4f6", 
          cardBackground: "#ffffff", 
          borderColor: "#e8e4de" 
        };
    }
  }

  function formatSessionDate(dateString: string) {
    const date = new Date(dateString);
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
        <h1 style={{ fontFamily: "var(--font-display), serif", fontSize: "40px", fontWeight: 300, color: "#1e1b2e", marginBottom: "16px" }}>
          Find your session
        </h1>
        <p style={{ fontSize: "16px", color: "#6b6880", maxWidth: "520px", lineHeight: 1.7, fontWeight: 300 }}>
          Browse upcoming small group sessions and webinars. All sessions are live, online, and led by vetted specialists.
        </p>
      </section>

      {/* Legend Block */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px 24px" }}>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {[
            { label: "Small Group", tagColor: "#0369a1", background: "#e0f2fe", borderColor: "#bae6fd" },
            { label: "Webinar", tagColor: "#b45309", background: "#fef3c7", borderColor: "#fde68a" },
            { label: "Specialist Webinar", tagColor: "#6b21a8", background: "#f3e8ff", borderColor: "#e9d5ff" },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: item.background, border: `1px solid ${item.borderColor}`, padding: "6px 14px", borderRadius: "20px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: item.tagColor }} />
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
                  padding: "8px 18px",
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
            {sessions.map((session: any) => {
              const style = getSessionStyle(session.session_type);
              
              // Enforce operational capacities strictly based on type
              const expectedCapacity = session.session_type === "Small Group" ? 8 : 100;

              return (
                <div
                  key={session.id}
                  style={{ backgroundColor: style.cardBackground, borderRadius: "16px", border: `1px solid ${style.borderColor}`, padding: "24px", display: "flex", flexDirection: "column", gap: "16px", boxShadow: "0 4px 12px rgba(30, 27, 46, 0.02)" }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "999px", backgroundColor: style.tagBg, color: style.tagColor, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                      {style.tag}
                    </span>
                    <span style={{ fontSize: "12px", color: "#6b6880" }}>
                      {expectedCapacity} spots available
                    </span>
                  </div>

                  <h3 style={{ fontFamily: "var(--font-display), serif", fontSize: "18px", fontWeight: 500, color: "#1e1b2e", lineHeight: 1.4, margin: 0 }}>
                    {session.title}
                  </h3>

                  {session.description && (
                    <p style={{ fontSize: "13px", color: "#6b6880", margin: 0, lineHeight: 1.6 }}>
                      {session.description.length > 110 ? session.description.substring(0, 110) + "..." : session.description}
                    </p>
                  )}

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "4px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#1e1b2e" }}>
                      <svg width="14" height="14" fill="none" stroke="#6b6880" strokeWidth="1.8" viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="16" rx="2"/>
                        <path d="M3 10h18M9 2v2M15 2v2" strokeLinecap="round"/>
                      </svg>
                      {formatSessionDate(session.scheduled_at)}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#6b6880" }}>
                      <svg width="14" height="14" fill="none" stroke="#6b6880" strokeWidth="1.8" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 6v6l4 2" strokeLinecap="round"/>
                      </svg>
                      {formatSessionTime(session.scheduled_at)} · {session.duration_minutes} min
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "14px", borderTop: "1px solid #f0eee9", marginTop: "auto" }}>
                    <div>
                      <span style={{ fontFamily: "var(--font-display), serif", fontSize: "22px", fontWeight: 300, color: "#1e1b2e" }}>
                        ${(session.price_cents / 100).toFixed(0)}
                      </span>
                      <span style={{ fontSize: "11px", color: "#6b6880", marginLeft: "4px" }}>per family</span>
                    </div>
                    <Link
                      href={`/sessions/${session.id}`}
                      style={{ backgroundColor: "#3730a3", color: "white", padding: "8px 20px", borderRadius: "999px", fontSize: "13px", fontWeight: 500, textDecoration: "none", boxShadow: "0 2px 6px rgba(55, 48, 163, 0.1)" }}
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