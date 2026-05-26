import Link from "next/link";

const ROBYN_PHOTO = "https://pndihjsqkwbjewlulotg.supabase.co/storage/v1/object/public/public-assets/robyn-hero.png";

const CATEGORIES = [
  { label: "Follow Along Activities", description: "Copy Robyn's movements — activities your child does alongside the video.", color: "#7c3aed", bg: "#f5f3ff", border: "#e0e7ff" },
  { label: "Baby & Tummy Time",       description: "Floor play, tummy time, and the foundations of movement from birth.", color: "#0f766e", bg: "#f0fdfa", border: "#99f6e4" },
  { label: "Movement & Balance",      description: "Coordination, core strength, and building physically confident children.", color: "#c2410c", bg: "#fff7ed", border: "#fed7aa" },
  { label: "Hands & Fine Motor",      description: "Hand strength, pencil grip, cutting, threading and independence skills.", color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" },
  { label: "Sensory Play",            description: "Nature play, messy play, and understanding your child's sensory needs.", color: "#b45309", bg: "#fffbeb", border: "#fde68a" },
  { label: "Speech & Language",       description: "Early language, babble, books, songs, and communication development.", color: "#166534", bg: "#f0fdf4", border: "#bbf7d0" },
  { label: "School Readiness",        description: "The physical and neurological foundations behind learning to read and write.", color: "#be185d", bg: "#fdf2f8", border: "#f9a8d4" },
];

export default function HomePage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e" }}>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "white", borderBottom: "1px solid #e8e4de" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "64px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "48px", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#f5f3ff", border: "1px solid #e0e7ff", borderRadius: "999px", padding: "6px 14px", marginBottom: "24px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#3730a3", flexShrink: 0 }} />
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#3730a3", margin: 0, letterSpacing: "0.06em" }}>
                From the team at Play Move Improve
              </p>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 300, color: "#1e1b2e", lineHeight: 1.15, margin: "0 0 20px" }}>
              Expert support for your child's development — at home, on your schedule
            </h1>
            <p style={{ fontSize: "17px", color: "#6b6880", lineHeight: 1.7, fontWeight: 300, margin: "0 0 16px" }}>
              Follow-along activity videos designed to meet your child where they are developmentally — practical, expert-led, and built around the reality of busy family life.
            </p>
            <p style={{ fontSize: "14px", color: "#6b6880", lineHeight: 1.6, margin: "0 0 32px", fontStyle: "italic", borderLeft: "3px solid #e0e7ff", paddingLeft: "16px" }}>
              "I made these videos for busy families who want practical, expert support that meets their child exactly where they are, without the waitlists, the appointments, or the travel." — Robyn Papworth, Founder
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "420px" }}>
              <Link href="/pricing" style={{ backgroundColor: "#3730a3", color: "white", padding: "16px 28px", borderRadius: "999px", fontSize: "16px", fontWeight: 600, textDecoration: "none", display: "block", textAlign: "center" }}>
                Start your membership — $39/month
              </Link>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
                <Link href="/videos/free" style={{ fontSize: "14px", color: "#3730a3", fontWeight: 500, textDecoration: "none" }}>Watch free videos</Link>
                <span style={{ color: "#e8e4de" }}>·</span>
                <Link href="/about" style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none" }}>Our story</Link>
              </div>
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ borderRadius: "20px", overflow: "hidden", aspectRatio: "4/3" }}>
              <img src={ROBYN_PHOTO} alt="Robyn Papworth" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
            </div>
            <div style={{ position: "absolute", bottom: "16px", left: "16px", right: "16px", backgroundColor: "white", borderRadius: "12px", padding: "12px 16px", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#1e1b2e", margin: "0 0 2px" }}>Robyn Papworth</p>
              <p style={{ fontSize: "12px", color: "#6b6880", margin: 0 }}>Founder of Play Move Improve · Masters-qualified Developmental Educator & Exercise Physiologist</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What you get ─────────────────────────────────────────────── */}
      <section style={{ borderBottom: "1px solid #e8e4de" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "64px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "32px" }}>
          {[
            { icon: "▶", title: "Follow-along videos", body: "Children copy Robyn's movements directly from the screen — no equipment, no prep, just play." },
            { icon: "📅", title: "Monthly live Q&A", body: "Ask Robyn your questions live each month. Replays included for every subscriber." },
            { icon: "📄", title: "Activity sheets", body: "Downloadable printables to extend the learning between videos." },
            { icon: "🔓", title: "Cancel anytime", body: "No lock-in, no cancellation fees. Your subscription, your terms." },
          ].map((item) => (
            <div key={item.title} style={{ textAlign: "center", padding: "8px" }}>
              <div style={{ fontSize: "28px", marginBottom: "12px" }}>{item.icon}</div>
              <p style={{ fontSize: "15px", fontWeight: 600, color: "#1e1b2e", margin: "0 0 8px" }}>{item.title}</p>
              <p style={{ fontSize: "14px", color: "#6b6880", margin: 0, lineHeight: 1.6 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Content categories ───────────────────────────────────────── */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b6880", marginBottom: "12px" }}>
            What's inside
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 300, color: "#1e1b2e", margin: "0 0 16px" }}>
            Seven categories covering ages 0–8
          </h2>
          <p style={{ fontSize: "16px", color: "#6b6880", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7, fontWeight: 300 }}>
            Every video is designed by Robyn based on her clinical expertise, practical, evidence-informed, and made for real family life.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
          {CATEGORIES.map((cat) => (
            <div key={cat.label} style={{ backgroundColor: cat.bg, border: `1.5px solid ${cat.border}`, borderRadius: "16px", padding: "28px" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 400, color: cat.color, margin: "0 0 10px" }}>{cat.label}</h3>
              <p style={{ fontSize: "14px", color: "#4a4660", lineHeight: 1.6, margin: 0 }}>{cat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing CTA ──────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#1e1b2e", padding: "80px 24px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#a5b4fc", marginBottom: "16px" }}>
            Simple pricing
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 300, color: "white", margin: "0 0 16px", lineHeight: 1.2 }}>
            Everything for $39 a month
          </h2>
          <p style={{ fontSize: "16px", color: "#c7d2fe", lineHeight: 1.8, fontWeight: 300, margin: "0 0 36px" }}>
            Unlimited videos, monthly live Q&A, and downloadable activity sheets. Cancel anytime.
          </p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            <Link href="/pricing" style={{ backgroundColor: "white", color: "#1e1b2e", padding: "16px 40px", borderRadius: "999px", fontSize: "16px", fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
              See what's included
            </Link>
            <Link href="/videos/free" style={{ fontSize: "14px", color: "#a5b4fc", textDecoration: "none" }}>
              Watch free videos first →
            </Link>
          </div>
        </div>
      </section>

      {/* ── For practitioners ────────────────────────────────────────── */}
      <section style={{ maxWidth: "680px", margin: "0 auto", padding: "64px 24px", textAlign: "center" }}>
        <p style={{ fontSize: "13px", color: "#6b6880", marginBottom: "8px" }}>Are you a developmental specialist, OT, physio, or educator?</p>
        <Link href="/practitioners" style={{ fontSize: "15px", fontWeight: 500, color: "#3730a3", textDecoration: "none" }}>
          Find out how to work with Developmental Hub →
        </Link>
      </section>

    </main>
  );
}