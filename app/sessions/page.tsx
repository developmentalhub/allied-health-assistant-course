import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

export default async function SessionsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const resolvedParams = await searchParams;
  const currentType = resolvedParams?.type || "";
  const supabase = await createClient();

  let query = supabase
    .from("sessions")
    .select("*")
    .eq("status", "scheduled")
    .order("scheduled_at", { ascending: true });

  // Map the URL filter parameters to database strings
  if (currentType) {
    if (currentType === "group") {
      query = query.eq("session_type", "Small Group");
    } else if (currentType === "webinar-owner") {
      query = query.eq("session_type", "Webinar");
    } else if (currentType === "webinar-facilitator") {
      query = query.eq("session_type", "Specialist Webinar");
    } else if (currentType === "parent-support") {
      query = query.eq("session_type", "Child Development");
    }
  }

  const { data: sessions } = await query;

  const { data: bookingCounts } = await supabase
    .from("session_booking_counts")
    .select("*");

  const countMap: Record<string, number> = {};
  (bookingCounts || []).forEach((c: any) => {
    countMap[c.session_id] = parseInt(c.booking_count);
  });

  function getSessionStyle(sessionType: string) {
    switch (sessionType) {
      case "Small Group":
        return { 
          tag: "Small Group", 
          tagBg: "#fff7ed", 
          tagText: "#c2410c", 
          cardBackground: "#ffffff", 
          borderColor: "#ea580c",
          capacityFallback: 8
        };
      case "Webinar":
        return { 
          tag: "Webinar", 
          tagBg: "#eef2ff", 
          tagText: "#3730a3", 
          cardBackground: "#ffffff", 
          borderColor: "#3730a3",
          capacityFallback: 100
        };
      case "Specialist Webinar":
        return { 
          tag: "Specialist Webinar", 
          tagBg: "#f0fdf4", 
          tagText: "#166534", 
          cardBackground: "#ffffff", 
          borderColor: "#16a34a",
          capacityFallback: 100
        };
      case "Child Development":
        return { 
          tag: "Parent Support", 
          tagBg: "#fdf2f8", 
          tagText: "#9d174d", 
          cardBackground: "#ffffff", 
          borderColor: "#db2777",
          capacityFallback: 15
        };
      default:
        return { 
          tag: sessionType, 
          tagBg: "#faf8f5", 
          tagText: "#6b6880", 
          cardBackground: "#ffffff", 
          borderColor: "#e8e4de",
          capacityFallback: 100
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
    { label: "All sessions", type: "" },
    { label: "Small groups", type: "group" },
    { label: "Webinars", type: "webinar-owner" },
    { label: "Specialist webinars", type: "webinar-facilitator" },
    { label: "Parent support", type: "parent-support" },
  ];

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }}>
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "60px 24px 40px" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "40px", fontWeight: 300, color: "#1e1b2e", marginBottom: "16px" }}>
          Find your session
        </h1>
      </section>

      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px 24px" }}>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {[
            { label: "Small Group", tagColor: "#c2410c", background: "#fff7ed", borderColor: "#ea580c" },
            { label: "Webinar", tagColor: "#3730a3", background: "#eef2ff", borderColor: "#3730a3" },
            { label: "Specialist Webinar", tagColor: "#166534", background: "#f0fdf4", borderColor: "#16a34a" },
            { label: "Parent Support", tagColor: "#9d174d", background: "#fdf2f8", borderColor: "#db2777" },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: item.background, border: `1.5px solid ${item.borderColor}`, padding: "6px 14px", borderRadius: "8px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "2px", backgroundColor: item.tagColor }} />
              <span style={{ fontSize: "13px", color: item.tagColor, fontWeight: 600 }}>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px 32px" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {tabs.map((tab) => {
            const isActive = currentType === tab.type;
            return (
              <Link
                key={tab.label}
                href={tab.type ? `/sessions?type=${tab.type}` : "/sessions"}
                style={{
                  fontSize: "13px", fontWeight: 500, padding: "8px 16px", borderRadius: "999px",
                  border: isActive ? "1.5px solid #3730a3" : "1px solid #e8e4de",
                  color: isActive ? "#3730a3" : "#6b6880", textDecoration: "none",
                  backgroundColor: isActive ? "#eef2ff" : "white",
                }}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </section>

      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px 80px" }}>
        {!sessions || sessions.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 24px", backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de" }}>
            <p style={{ fontSize: "16px", color: "#6b6880" }}>No upcoming sessions found.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
            {sessions.map((session: any) => {
              const style = getSessionStyle(session.session_type);
              const booked = countMap[session.id] || 0;
              const totalCapacity = session.capacity || style.capacityFallback;
              const spotsLeft = totalCapacity - booked;
              const isFull = spotsLeft <= 0;

              return (
                <div key={session.id} style={{ backgroundColor: style.cardBackground, borderRadius: "16px", border: `1.5px solid ${style.borderColor}`, padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "8px", backgroundColor: style.tagBg, color: style.tagText, textTransform: "uppercase" }}>
                      {style.tag}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "17px", margin: 0 }}>{session.title}</h3>
                  <Link href={`/sessions/${session.id}`} style={{ backgroundColor: isFull ? "#e8e4de" : "#3730a3", color: isFull ? "#6b6880" : "white", padding: "8px 18px", borderRadius: "999px", textDecoration: "none", textAlign: "center" }}>
                    {isFull ? "Full" : "Book now"}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}