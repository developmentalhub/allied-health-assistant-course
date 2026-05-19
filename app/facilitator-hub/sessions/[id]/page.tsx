import Navbar from "@/components/Navbar";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

export default async function SessionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: session } = await supabase
    .from("sessions")
    .select("*, profiles(full_name)")
    .eq("id", id)
    .single();

  if (!session) {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }}>
        <Navbar />
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 300, color: "#1e1b2e", marginBottom: "16px" }}>
            Session not found
          </h1>
          <p style={{ color: "#6b6880", marginBottom: "32px" }}>
            This session may have been removed or the link is incorrect.
          </p>
          <Link
            href="/sessions"
            style={{ backgroundColor: "#3730a3", color: "white", padding: "12px 28px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}
          >
            Browse all sessions
          </Link>
        </div>
      </main>
    );
  }

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
    const aestDate = new Date(date.getTime() + 10 * 60 * 60 * 1000);
    return aestDate.toLocaleDateString("en-AU", {
      weekday: "long",
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

  const style = getSessionStyle(session.session_type);
  const facilitatorName = session.profiles?.full_name || "Developmental Hub Team";
  const price = (session.price_cents / 100).toFixed(0);

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }}>
      <Navbar />

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "32px 24px 0" }}>
        <Link
          href="/sessions"
          style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to all sessions
        </Link>
      </div>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "32px 24px 80px", display: "grid", gridTemplateColumns: "1fr 340px", gap: "40px", alignItems: "start" }}>

        {/* Left column */}
        <div>
          <span style={{ fontSize: "13px", fontWeight: 700, padding: "6px 14px", borderRadius: "8px", backgroundColor: style.tagColor, color: style.tagText, letterSpacing: "0.03em", textTransform: "uppercase", display: "inline-block", marginBottom: "20px" }}>
            {style.tag}
          </span>

          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 300, color: "#1e1b2e", lineHeight: 1.3, marginBottom: "12px" }}>
            {session.title}
          </h1>

          <p style={{ fontSize: "15px", color: "#6b6880", marginBottom: "32px" }}>
            Led by {facilitatorName}
          </p>

          {session.description && (
            <p style={{ fontSize: "16px", color: "#1e1b2e", lineHeight: 1.8, marginBottom: "40px", fontWeight: 300 }}>
              {session.description}
            </p>
          )}

          {/* Session details */}
          <div style={{ backgroundColor: style.cardBackground, border: `1.5px solid ${style.borderColor}`, borderRadius: "16px", padding: "24px", marginBottom: "32px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 300, color: "#1e1b2e", marginBottom: "16px" }}>
              Session details
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", color: "#1e1b2e" }}>
                <svg width="16" height="16" fill="none" stroke="#6b6880" strokeWidth="1.8">
                  <rect x="1" y="2" width="14" height="13" rx="2"/>
                  <path d="M1 7h14M5 1v2M11 1v2" strokeLinecap="round"/>
                </svg>
                {formatSessionDate(session.scheduled_at)}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", color: "#1e1b2e" }}>
                <svg width="16" height="16" fill="none" stroke="#6b6880" strokeWidth="1.8">
                  <circle cx="8" cy="8" r="6.5"/>
                  <path d="M8 5v3l2 2" strokeLinecap="round"/>
                </svg>
                {formatSessionTime(session.scheduled_at)} · {session.duration_minutes} minutes
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", color: "#1e1b2e" }}>
                <svg width="16" height="16" fill="none" stroke="#6b6880" strokeWidth="1.8">
                  <path d="M13 14v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" strokeLinecap="round"/>
                  <circle cx="8" cy="5" r="3" strokeLinecap="round"/>
                </svg>
                Up to {session.capacity} families
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", color: "#6b6880" }}>
                <svg width="16" height="16" fill="none" stroke="#6b6880" strokeWidth="1.8">
                  <circle cx="8" cy="8" r="6.5"/>
                  <path d="M8 5v3" strokeLinecap="round"/>
                  <circle cx="8" cy="11" r="0.5" fill="#6b6880"/>
                </svg>
                Minimum {session.minimum_families} families to run
              </div>
            </div>
          </div>

          {/* Who is this for */}
          <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "16px", padding: "24px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 300, color: "#1e1b2e", marginBottom: "12px" }}>
              Who is this for?
            </h2>
            <p style={{ fontSize: "15px", color: "#6b6880", lineHeight: 1.7, margin: 0 }}>
              Parents and carers who want expert-led support and practical strategies they can use straight away. All sessions are designed to be accessible, jargon-free, and relevant to everyday family life.
            </p>
          </div>
        </div>

        {/* Right column — booking card */}
        <div style={{ position: "sticky", top: "88px" }}>
          <div style={{ backgroundColor: "white", borderRadius: "20px", border: "1px solid #e8e4de", padding: "28px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>

            <div style={{ marginBottom: "20px" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 300, color: "#1e1b2e" }}>
                ${price}
              </span>
              <span style={{ fontSize: "13px", color: "#6b6880", marginLeft: "6px" }}>per family</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px", paddingBottom: "24px", borderBottom: "1px solid #f0eee9" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#1e1b2e" }}>
                <svg width="16" height="16" fill="none" stroke="#6b6880" strokeWidth="1.8">
                  <rect x="1" y="2" width="14" height="13" rx="2"/>
                  <path d="M1 7h14M5 1v2M11 1v2" strokeLinecap="round"/>
                </svg>
                {formatSessionDate(session.scheduled_at)}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#1e1b2e" }}>
                <svg width="16" height="16" fill="none" stroke="#6b6880" strokeWidth="1.8">
                  <circle cx="8" cy="8" r="6.5"/>
                  <path d="M8 5v3l2 2" strokeLinecap="round"/>
                </svg>
                {formatSessionTime(session.scheduled_at)} ({session.duration_minutes} min)
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#1e1b2e" }}>
                <svg width="16" height="16" fill="none" stroke="#6b6880" strokeWidth="1.8">
                  <path d="M13 14v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" strokeLinecap="round"/>
                  <circle cx="8" cy="5" r="3" strokeLinecap="round"/>
                </svg>
                Up to {session.capacity} families
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#6b6880" }}>
                <svg width="16" height="16" fill="none" stroke="#6b6880" strokeWidth="1.8">
                  <circle cx="8" cy="8" r="6.5"/>
                  <path d="M8 5v3" strokeLinecap="round"/>
                  <circle cx="8" cy="11" r="0.5" fill="#6b6880"/>
                </svg>
                Minimum {session.minimum_families} families to run
              </div>
            </div>

            <Link
              href={`/signup?redirect=/sessions/${id}`}
              style={{ display: "block", width: "100%", backgroundColor: style.tagColor, color: "white", padding: "14px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, textDecoration: "none", textAlign: "center", boxSizing: "border-box" }}
            >
              Book this session
            </Link>

            <p style={{ fontSize: "12px", color: "#6b6880", textAlign: "center", marginTop: "12px" }}>
              You will need an account to complete your booking.
            </p>

            <div style={{ marginTop: "20px", backgroundColor: "#fffbeb", border: "1px solid #fcd34d", borderRadius: "12px", padding: "16px" }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#92400e", margin: "0 0 12px 0" }}>
                How payment works
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  "Your card is authorised when you book. No money is taken yet.",
                  "Once minimum numbers are reached your spot is confirmed.",
                  "Payment is captured 24 hours before the session starts.",
                  "If minimum numbers are not reached you are never charged.",
                ].map((text, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <div style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#fcd34d", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "#92400e" }}>{i + 1}</span>
                    </div>
                    <p style={{ fontSize: "12px", color: "#92400e", margin: 0, lineHeight: 1.5 }}>
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "12px", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "12px 14px", display: "flex", alignItems: "flex-start", gap: "8px" }}>
              <svg width="16" height="16" fill="none" stroke="#166534" strokeWidth="2" style={{ flexShrink: 0, marginTop: "1px" }}>
                <path d="M12 4L6 10l-3-3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p style={{ fontSize: "12px", color: "#166534", margin: 0, lineHeight: 1.6 }}>
                Zero risk. If the session does not run you will never be charged.
              </p>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}