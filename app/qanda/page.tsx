import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

export default async function QandAPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let isSubscriber = false;
  if (user) {
    const { data: sub } = await supabase
      .from("subscriptions")
      .select("status")
      .eq("user_id", user.id)
      .single();
    isSubscriber = ["active", "trialing"].includes(sub?.status ?? "");

    const { data: profile } = await supabase
      .from("profiles").select("role").eq("id", user.id).single();
    if (["admin", "superadmin"].includes(profile?.role ?? "")) isSubscriber = true;
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "64px 24px 80px" }}>

        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3730a3", marginBottom: "12px" }}>
          Live with Robyn
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: "#1e1b2e", margin: "0 0 16px" }}>
          Monthly Q&A
        </h1>
        <p style={{ fontSize: "16px", color: "#6b6880", lineHeight: 1.7, fontWeight: 300, margin: "0 0 48px", maxWidth: "560px" }}>
          Every month, Robyn hosts a live video session where subscribers can ask anything about their child's development. Bring your questions, your wins, and your worries.
        </p>

        {/* Next session */}
        <div style={{ backgroundColor: "#3730a3", borderRadius: "20px", padding: "40px", marginBottom: "40px" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#a5b4fc", margin: "0 0 12px" }}>
            Next session
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 300, color: "white", margin: "0 0 12px" }}>
            Monthly Q&A with Robyn
          </h2>
          <p style={{ fontSize: "16px", color: "#c7d2fe", margin: "0 0 24px", lineHeight: 1.6 }}>
            Date and time to be announced. Subscribe to be notified as soon as the next session is scheduled.
          </p>
          {isSubscriber ? (
            <div style={{ backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "12px", padding: "16px 20px" }}>
              <p style={{ fontSize: "14px", color: "#e0e7ff", margin: 0 }}>
                You'll receive an email with the Zoom link when the next session is scheduled. Keep an eye on your inbox.
              </p>
            </div>
          ) : (
            <Link href="/pricing" style={{ backgroundColor: "white", color: "#3730a3", padding: "12px 28px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
              Subscribe to join — $39/month
            </Link>
          )}
        </div>

        {/* How it works */}
        <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "16px", padding: "32px", marginBottom: "40px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 24px" }}>
            How it works
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {[
              { step: "01", title: "Get the Zoom link", body: "Subscribers receive the Zoom link by email before each session. Save it to your calendar." },
              { step: "02", title: "Join live", body: "Hop on from any device — phone, tablet, or laptop. No special software needed beyond Zoom." },
              { step: "03", title: "Ask your questions", body: "Type your questions in the chat or ask live. Robyn answers as many as possible in the session." },
              { step: "04", title: "Watch the replay", body: "Can't make it live? The replay is posted here within 24 hours for all subscribers." },
            ].map((item) => (
              <div key={item.step} style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 300, color: "#e0e7ff", lineHeight: 1, minWidth: "40px", flexShrink: 0 }}>{item.step}</span>
                <div>
                  <p style={{ fontSize: "15px", fontWeight: 600, color: "#1e1b2e", margin: "0 0 4px" }}>{item.title}</p>
                  <p style={{ fontSize: "14px", color: "#6b6880", margin: 0, lineHeight: 1.6 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Replays */}
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 20px" }}>
            Past replays
          </h2>
          {!isSubscriber ? (
            <div style={{ backgroundColor: "#f5f3ff", border: "1px solid #e0e7ff", borderRadius: "14px", padding: "32px", textAlign: "center" }}>
              <p style={{ fontSize: "15px", fontWeight: 600, color: "#3730a3", margin: "0 0 8px" }}>Replays are available to subscribers</p>
              <p style={{ fontSize: "14px", color: "#6b6880", margin: "0 0 20px" }}>Subscribe to access all past Q&A recordings.</p>
              <Link href="/pricing" style={{ backgroundColor: "#3730a3", color: "white", padding: "10px 24px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
                Start membership — $39/month
              </Link>
            </div>
          ) : (
            <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "14px", padding: "40px", textAlign: "center" }}>
              <p style={{ fontSize: "15px", color: "#6b6880", marginBottom: "8px" }}>No replays yet.</p>
              <p style={{ fontSize: "13px", color: "#b0acbf" }}>Past Q&A recordings will appear here after each session.</p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}