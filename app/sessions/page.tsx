import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

const BOOKINGS_OPEN = process.env.BOOKINGS_OPEN === "true";

export default async function SessionsPage({
  searchParams,
}: {
  searchParams: Promise<{ age?: string; category?: string; type?: string }>;
}) {
  const resolvedParams = await searchParams;
  const currentAge = resolvedParams?.age || "";
  const currentCategory = resolvedParams?.category || "";
  const currentType = resolvedParams?.type || "";

  const supabase = await createClient();

  let query = supabase
    .from("sessions")
    .select("*")
    .eq("status", "scheduled")
    .order("scheduled_at", { ascending: true });

  if (currentAge) query = query.eq("age_group", currentAge);
  if (currentCategory) query = query.eq("category", currentCategory);
  if (currentType) query = query.eq("session_type", currentType);

  const { data: sessions } = await query;

  const { data: bookingCounts } = await supabase
    .from("session_booking_counts")
    .select("*");

  const countMap: Record<string, number> = {};
  (bookingCounts || []).forEach((c: any) => {
    countMap[c.session_id] = parseInt(c.booking_count);
  });

  function filterUrl(params: { age?: string; category?: string; type?: string }) {
    const p = new URLSearchParams();
    const age = params.age !== undefined ? params.age : currentAge;
    const category = params.category !== undefined ? params.category : currentCategory;
    const type = params.type !== undefined ? params.type : currentType;
    if (age) p.set("age", age);
    if (category) p.set("category", category);
    if (type) p.set("type", type);
    const str = p.toString();
    return str ? `/sessions?${str}` : "/sessions";
  }

  const ageGroups = [
    { value: "", label: "All ages" },
    { value: "0-2", label: "0–2 years" },
    { value: "3-5", label: "3–5 years" },
    { value: "6-8", label: "6–8 years" },
  ];

  const allCategories = [
    { value: "", label: "All categories" },
    { value: "gross-motor", label: "Gross Motor" },
    { value: "fine-motor", label: "Fine Motor" },
    { value: "sensory", label: "Sensory" },
    { value: "literacy", label: "Literacy" },
    { value: "play", label: "Play" },
    { value: "regulation", label: "Regulation" },
    { value: "social-skills", label: "Social Skills" },
  ];

  const categoriesFor02 = ["", "gross-motor", "sensory", "play"];
  const visibleCategories = currentAge === "0-2"
    ? allCategories.filter((c) => categoriesFor02.includes(c.value))
    : allCategories;

  const sessionTypes = [
    { value: "", label: "All types" },
    { value: "group", label: "Small Group" },
    { value: "webinar-owner", label: "Webinar" },
    { value: "webinar-facilitator", label: "Specialist Webinar" },
  ];

  function getSessionStyle(sessionType: string) {
    switch (sessionType) {
      case "group": return { tag: "Small Group", tagBg: "#c2410c", tagText: "#ffffff", cardBackground: "#fff7ed", borderColor: "#ea580c" };
      case "webinar-owner": return { tag: "Webinar", tagBg: "#3730a3", tagText: "#ffffff", cardBackground: "#eef2ff", borderColor: "#3730a3" };
      case "webinar-facilitator": return { tag: "Specialist Webinar", tagBg: "#166534", tagText: "#ffffff", cardBackground: "#f0fdf4", borderColor: "#16a34a" };
      default: return { tag: sessionType, tagBg: "#6b6880", tagText: "#ffffff", cardBackground: "#faf8f5", borderColor: "#e8e4de" };
    }
  }

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

  function formatAgeGroup(ag: string) {
    if (ag === "0-2") return "0–2 yrs";
    if (ag === "3-5") return "3–5 yrs";
    if (ag === "6-8") return "6–8 yrs";
    return ag;
  }

  function formatCategory(cat: string) {
    return cat.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  }

  const tabStyle = (active: boolean): React.CSSProperties => ({
    fontSize: "13px", fontWeight: 500, padding: "8px 16px", borderRadius: "999px",
    border: active ? "1.5px solid #3730a3" : "1px solid #e8e4de",
    color: active ? "#3730a3" : "#6b6880", textDecoration: "none",
    backgroundColor: active ? "#eef2ff" : "white", whiteSpace: "nowrap",
  });

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }}>

      {/* Hero */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "60px 24px 32px" }}>
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b6880", marginBottom: "12px" }}>
          Upcoming sessions
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "40px", fontWeight: 300, color: "#1e1b2e", marginBottom: "16px" }}>
          Find your session
        </h1>
        {!BOOKINGS_OPEN && (
          <div style={{ backgroundColor: "#fffbeb", border: "1px solid #fcd34d", borderRadius: "12px", padding: "16px 20px", marginBottom: "16px", display: "inline-flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#f59e0b", flexShrink: 0 }} />
            <p style={{ fontSize: "14px", color: "#92400e", margin: 0, fontWeight: 500 }}>
              Sessions open for booking at the end of June 2026. Register your interest now to be first in line.
            </p>
          </div>
        )}
        <p style={{ fontSize: "16px", color: "#6b6880", maxWidth: "520px", lineHeight: 1.7, fontWeight: 300 }}>
          Browse upcoming small group sessions and webinars. All sessions are live, online, and led by vetted specialists.
        </p>
      </section>

      {/* Age group filter */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px 16px" }}>
        <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b6880", marginBottom: "10px" }}>Age group</p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {ageGroups.map((ag) => (
            <Link key={ag.value} href={filterUrl({ age: ag.value, category: "" })} style={tabStyle(currentAge === ag.value)}>
              {ag.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Category filter */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px 16px" }}>
        <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b6880", marginBottom: "10px" }}>Category</p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {visibleCategories.map((cat) => (
            <Link key={cat.value} href={filterUrl({ category: cat.value })} style={tabStyle(currentCategory === cat.value)}>
              {cat.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Session type filter */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px 32px" }}>
        <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b6880", marginBottom: "10px" }}>Session type</p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {sessionTypes.map((st) => (
            <Link key={st.value} href={filterUrl({ type: st.value })} style={tabStyle(currentType === st.value)}>
              {st.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Sessions grid */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px 80px" }}>
        {!sessions || sessions.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 24px", backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de" }}>
            <p style={{ fontSize: "16px", color: "#6b6880", marginBottom: "8px" }}>No sessions found.</p>
            <p style={{ fontSize: "14px", color: "#b0acbf" }}>Try a different filter or check back soon.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
            {sessions.map((session: any) => {
              const style = getSessionStyle(session.session_type);
              const booked = countMap[session.id] || 0;
              const spotsLeft = session.capacity - booked;
              const isFull = spotsLeft <= 0;

              // Build interest registration URL with prefilled params
              const interestUrl = `/register-interest?age=${session.age_group}&topic=${encodeURIComponent(session.title)}`;

              return (
                <div key={session.id} style={{ backgroundColor: style.cardBackground, borderRadius: "16px", border: `1.5px solid ${style.borderColor}`, padding: "24px", display: "flex", flexDirection: "column", gap: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>

                  {/* Tags */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "6px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 700, padding: "4px 12px", borderRadius: "8px", backgroundColor: style.tagBg, color: style.tagText, textTransform: "uppercase" }}>
                      {style.tag}
                    </span>
                    <div style={{ display: "flex", gap: "6px" }}>
                      {session.age_group && (
                        <span style={{ fontSize: "11px", fontWeight: 600, padding: "3px 8px", borderRadius: "6px", backgroundColor: "#f5f3ff", color: "#7c3aed" }}>
                          {formatAgeGroup(session.age_group)}
                        </span>
                      )}
                      {session.category && (
                        <span style={{ fontSize: "11px", fontWeight: 600, padding: "3px 8px", borderRadius: "6px", backgroundColor: "#f0fdf4", color: "#166534" }}>
                          {formatCategory(session.category)}
                        </span>
                      )}
                    </div>
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
                    {BOOKINGS_OPEN && session.scheduled_at && (
                      <>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#1e1b2e" }}>
                          <svg width="14" height="14" fill="none" stroke="#6b6880" strokeWidth="1.8"><rect x="1" y="2" width="12" height="11" rx="2"/><path d="M1 6h12M5 1v2M9 1v2" strokeLinecap="round"/></svg>
                          {formatSessionDate(session.scheduled_at)}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#6b6880" }}>
                          <svg width="14" height="14" fill="none" stroke="#6b6880" strokeWidth="1.8"><circle cx="7" cy="7" r="5.5"/><path d="M7 4.5V7l1.5 1.5" strokeLinecap="round"/></svg>
                          {formatSessionTime(session.scheduled_at)} · {session.duration_minutes} min
                        </div>
                      </>
                    )}
                    {!BOOKINGS_OPEN && (
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#92400e", fontWeight: 500 }}>
                        <svg width="14" height="14" fill="none" stroke="#92400e" strokeWidth="1.8"><rect x="1" y="2" width="12" height="11" rx="2"/><path d="M1 6h12M5 1v2M9 1v2" strokeLinecap="round"/></svg>
                        Dates confirmed end of June 2026
                      </div>
                    )}
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#6b6880" }}>
                      Min {session.minimum_families} families to run
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "12px", borderTop: `1px solid ${style.borderColor}40`, marginTop: "auto" }}>
                    <div>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 300, color: "#1e1b2e" }}>
                        ${(session.price_cents / 100).toFixed(0)}
                      </span>
                      <span style={{ fontSize: "11px", color: "#6b6880", marginLeft: "4px" }}>per family</span>
                    </div>

                    {BOOKINGS_OPEN ? (
                      <Link
                        href={isFull ? "#" : `/sessions/${session.id}`}
                        style={{ backgroundColor: isFull ? "#e8e4de" : style.tagBg, color: isFull ? "#6b6880" : "white", padding: "8px 18px", borderRadius: "999px", fontSize: "13px", fontWeight: 500, textDecoration: "none", pointerEvents: (isFull ? "none" : "auto") as React.CSSProperties["pointerEvents"] }}
                      >
                        {isFull ? "Full" : "Book now"}
                      </Link>
                    ) : (
                      <Link
                        href={interestUrl}
                        style={{ backgroundColor: style.tagBg, color: "white", padding: "8px 18px", borderRadius: "999px", fontSize: "13px", fontWeight: 500, textDecoration: "none" }}
                      >
                        Register interest
                      </Link>
                    )}
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