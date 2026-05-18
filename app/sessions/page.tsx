import Navbar from "@/components/Navbar";
import Link from "next/link";

const placeholderSessions = [
  {
    id: "1",
    type: "group",
    title: "Sensory Play at Home — Practical Ideas for Everyday Life",
    facilitator: "Dr. Sarah Mitchell",
    date: "Saturday 7 June 2025",
    time: "10:00am AEST",
    price: 39,
    spots: 8,
    spotsLeft: 4,
    duration: "45 min",
    tag: "Small Group",
    tagColor: "#c2410c",
    tagText: "#ffffff",
    cardBackground: "#fff7ed",
    borderColor: "#ea580c",
  },
  {
    id: "2",
    type: "group",
    title: "Building Early Literacy Skills Through Play",
    facilitator: "Dr. James Okafor",
    date: "Wednesday 11 June 2025",
    time: "7:30pm AEST",
    price: 39,
    spots: 8,
    spotsLeft: 6,
    duration: "45 min",
    tag: "Small Group",
    tagColor: "#c2410c",
    tagText: "#ffffff",
    cardBackground: "#fff7ed",
    borderColor: "#ea580c",
  },
  {
    id: "3",
    type: "webinar-owner",
    title: "Understanding Sensory Processing in Young Children",
    facilitator: "Developmental Hub Team",
    date: "Tuesday 17 June 2025",
    time: "12:00pm AEST",
    price: 25,
    spots: 100,
    spotsLeft: 67,
    duration: "60 min",
    tag: "Webinar",
    tagColor: "#3730a3",
    tagText: "#ffffff",
    cardBackground: "#eef2ff",
    borderColor: "#3730a3",
  },
  {
    id: "4",
    type: "group",
    title: "Motor Development — Supporting Your Child's Physical Growth",
    facilitator: "Dr. Priya Sharma",
    date: "Thursday 19 June 2025",
    time: "7:00pm AEST",
    price: 39,
    spots: 8,
    spotsLeft: 3,
    duration: "45 min",
    tag: "Small Group",
    tagColor: "#c2410c",
    tagText: "#ffffff",
    cardBackground: "#fff7ed",
    borderColor: "#ea580c",
  },
  {
    id: "5",
    type: "webinar-facilitator",
    title: "Play Skills That Support Social Development",
    facilitator: "Dr. Lena Kovacs",
    date: "Monday 23 June 2025",
    time: "11:00am AEST",
    price: 79,
    spots: 100,
    spotsLeft: 44,
    duration: "60 min",
    tag: "Specialist Webinar",
    tagColor: "#166534",
    tagText: "#ffffff",
    cardBackground: "#f0fdf4",
    borderColor: "#16a34a",
  },
  {
    id: "6",
    type: "webinar-facilitator",
    title: "Fine Motor Skills — Activities to Build Strength and Coordination",
    facilitator: "Dr. Marcus Webb",
    date: "Saturday 28 June 2025",
    time: "9:00am AEST",
    price: 79,
    spots: 100,
    spotsLeft: 81,
    duration: "60 min",
    tag: "Specialist Webinar",
    tagColor: "#166534",
    tagText: "#ffffff",
    cardBackground: "#f0fdf4",
    borderColor: "#16a34a",
  },
];

export default function SessionsPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }}>
      <Navbar />

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
          {[
            { label: "All sessions", href: "/sessions" },
            { label: "Small groups", href: "/sessions?type=group" },
            { label: "Webinars", href: "/sessions?type=webinar-owner" },
            { label: "Specialist webinars", href: "/sessions?type=webinar-facilitator" },
          ].map((tab) => (
            <Link
              key={tab.label}
              href={tab.href}
              style={{ fontSize: "13px", fontWeight: 500, padding: "8px 16px", borderRadius: "999px", border: "1px solid #e8e4de", color: "#6b6880", textDecoration: "none", backgroundColor: "white" }}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Sessions grid */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
          {placeholderSessions.map((session) => (
            <div
              key={session.id}
              style={{ backgroundColor: session.cardBackground, borderRadius: "16px", border: `1.5px solid ${session.borderColor}`, padding: "24px", display: "flex", flexDirection: "column", gap: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
            >
              {/* Tag + spots */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "13px", fontWeight: 700, padding: "6px 14px", borderRadius: "8px", backgroundColor: session.tagColor, color: session.tagText, letterSpacing: "0.03em", textTransform: "uppercase" }}>
                  {session.tag}
                </span>
                <span style={{ fontSize: "11px", color: session.spotsLeft <= 3 ? "#dc2626" : "#6b6880", fontWeight: session.spotsLeft <= 3 ? 600 : 400 }}>
                  {session.spotsLeft} spot{session.spotsLeft !== 1 ? "s" : ""} left
                </span>
              </div>

              {/* Title */}
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: 400, color: "#1e1b2e", lineHeight: 1.4, margin: 0 }}>
                {session.title}
              </h3>

              {/* Facilitator */}
              <p style={{ fontSize: "13px", color: "#6b6880", margin: 0 }}>
                {session.facilitator}
              </p>

              {/* Date/time/duration */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#1e1b2e" }}>
                  <svg width="14" height="14" fill="none" stroke="#6b6880" strokeWidth="1.8">
                    <rect x="1" y="2" width="12" height="11" rx="2"/>
                    <path d="M1 6h12M5 1v2M9 1v2" strokeLinecap="round"/>
                  </svg>
                  {session.date} · {session.time}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#6b6880" }}>
                  <svg width="14" height="14" fill="none" stroke="#6b6880" strokeWidth="1.8">
                    <circle cx="7" cy="7" r="5.5"/>
                    <path d="M7 4.5V7l1.5 1.5" strokeLinecap="round"/>
                  </svg>
                  {session.duration}
                </div>
              </div>

              {/* Price + CTA */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "12px", borderTop: `1px solid ${session.borderColor}40`, marginTop: "auto" }}>
                <div>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 300, color: "#1e1b2e" }}>
                    ${session.price}
                  </span>
                  <span style={{ fontSize: "11px", color: "#6b6880", marginLeft: "4px" }}>per family</span>
                </div>
                <Link
                  href={`/sessions/${session.id}`}
                  style={{ backgroundColor: session.tagColor, color: "white", padding: "8px 18px", borderRadius: "999px", fontSize: "13px", fontWeight: 500, textDecoration: "none" }}
                >
                  Book now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}