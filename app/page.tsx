import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

export default async function HomePage() {
  const supabase = await createClient();

  // Fetch a sample of upcoming sessions grouped by age group
  const { data: sessions } = await supabase
    .from("sessions")
    .select("id, title, age_group, category, session_type, price_cents, scheduled_at, minimum_families")
    .eq("status", "scheduled")
    .order("scheduled_at", { ascending: true })
    .limit(6);

  function formatCategory(cat: string) {
    return cat?.split("-").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") ?? "";
  }

  function formatAgeGroup(ag: string) {
    if (ag === "0-2") return "0–2 years";
    if (ag === "3-5") return "3–5 years";
    if (ag === "6-8") return "6–8 years";
    return ag;
  }

  const ageGroups = [
    {
      value: "0-2",
      label: "0–2 years",
      headline: "The Foundation Years",
      description: "Your baby's brain is building at a pace it will never match again. These sessions give you the movement and play strategies that support your child's neurological development — and help you feel confident in what you're already doing.",
      color: "#7c3aed",
      bg: "#f5f3ff",
      border: "#e0e7ff",
    },
    {
      value: "3-5",
      label: "3–5 years",
      headline: "The Independence Years",
      description: "Preschool brings new challenges — listening, cooperating, managing big feelings. These sessions help you understand what's driving your child's behaviour and give you practical tools to support their growing independence.",
      color: "#0f766e",
      bg: "#f0fdfa",
      border: "#99f6e4",
    },
    {
      value: "6-8",
      label: "6–8 years",
      headline: "The Complexity Years",
      description: "School life, friendships, sport, and homework — your child is navigating a lot. These sessions explore the physical and neurological foundations that underpin confidence, resilience, and social success.",
      color: "#c2410c",
      bg: "#fff7ed",
      border: "#fed7aa",
    },
  ];

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e" }}>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section style={{ maxWidth: "800px", margin: "0 auto", padding: "80px 24px 72px", textAlign: "center" }}>
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3730a3", marginBottom: "20px" }}>
          Expert-led group support for families
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 300, color: "#1e1b2e", lineHeight: 1.1, margin: "0 0 24px" }}>
          You don't have to figure this out alone
        </h1>
        <p style={{ fontSize: "18px", color: "#6b6880", lineHeight: 1.7, fontWeight: 300, maxWidth: "580px", margin: "0 auto 40px" }}>
          Developmental Hub connects families with vetted specialists through affordable, live group sessions. Real expertise. Real community. Designed around your life.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/sessions" style={{ backgroundColor: "#3730a3", color: "white", padding: "14px 32px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
            Browse upcoming sessions
          </Link>
          <Link href="/about" style={{ backgroundColor: "white", color: "#1e1b2e", padding: "14px 32px", borderRadius: "999px", fontSize: "15px", fontWeight: 500, textDecoration: "none", display: "inline-block", border: "1px solid #e8e4de" }}>
            How it works
          </Link>
        </div>
      </section>

      {/* ── Trust bar ─────────────────────────────────────────────────────── */}
      <section style={{ borderTop: "1px solid #e8e4de", borderBottom: "1px solid #e8e4de", backgroundColor: "white" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "32px" }}>
          {[
            { label: "Vetted specialists", sub: "Every practitioner is screened and approved" },
            { label: "Live and interactive", sub: "Real sessions, not pre-recorded videos" },
            { label: "No lock-in", sub: "Book session by session, no subscription" },
            { label: "Stripe-secured", sub: "Your payment is held until the session runs" },
          ].map((item) => (
            <div key={item.label} style={{ textAlign: "center", minWidth: "160px" }}>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#1e1b2e", margin: "0 0 4px" }}>{item.label}</p>
              <p style={{ fontSize: "12px", color: "#6b6880", margin: 0, lineHeight: 1.5 }}>{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Age groups ────────────────────────────────────────────────────── */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b6880", marginBottom: "12px" }}>
            Sessions for every stage
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 300, color: "#1e1b2e", margin: "0 0 16px" }}>
            Where is your child right now?
          </h2>
          <p style={{ fontSize: "16px", color: "#6b6880", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7, fontWeight: 300 }}>
            Every session is designed for a specific developmental stage. Find the sessions that speak to exactly where your family is.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          {ageGroups.map((ag) => {
            const agSessions = sessions?.filter((s) => s.age_group === ag.value) ?? [];
            return (
              <div key={ag.value} style={{ backgroundColor: ag.bg, border: `1.5px solid ${ag.border}`, borderRadius: "20px", padding: "36px 32px" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: ag.color, marginBottom: "8px" }}>
                  {ag.label}
                </p>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 16px", lineHeight: 1.3 }}>
                  {ag.headline}
                </h3>
                <p style={{ fontSize: "14px", color: "#4a4660", lineHeight: 1.7, margin: "0 0 28px" }}>
                  {ag.description}
                </p>

                {agSessions.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
                    {agSessions.slice(0, 2).map((s) => (
                      <Link key={s.id} href={`/sessions/${s.id}`} style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "10px", padding: "12px 14px", textDecoration: "none", display: "block" }}>
                        <p style={{ fontSize: "13px", fontWeight: 500, color: "#1e1b2e", margin: "0 0 4px", lineHeight: 1.4 }}>{s.title}</p>
                        <p style={{ fontSize: "12px", color: "#6b6880", margin: 0 }}>
                          {formatCategory(s.category)} · ${(s.price_cents / 100).toFixed(0)} per family
                        </p>
                      </Link>
                    ))}
                  </div>
                )}

                <Link href={`/sessions?age=${ag.value}`} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: 600, color: ag.color, textDecoration: "none" }}>
                  See all {ag.label} sessions
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "white", borderTop: "1px solid #e8e4de", borderBottom: "1px solid #e8e4de" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "80px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b6880", marginBottom: "12px" }}>
              How it works
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 300, color: "#1e1b2e", margin: 0 }}>
              Simple, affordable, and built for busy families
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {[
              {
                step: "01",
                title: "Browse sessions by your child's age",
                body: "Every session is designed for a specific developmental stage. Filter by age group and topic to find what's right for your family right now.",
              },
              {
                step: "02",
                title: "Reserve your spot — no upfront charge",
                body: "Your card is authorised but never charged until the session reaches its minimum number of families. If the session doesn't run, you're never charged. No risk.",
              },
              {
                step: "03",
                title: "Join live from anywhere",
                body: "Sessions run online via video. No travel, no waiting rooms, no awkward 1:1 appointments. Just you, other families, and a specialist who knows what they're talking about.",
              },
              {
                step: "04",
                title: "Walk away with real strategies",
                body: "Every session is practical. You'll leave with specific techniques you can use with your child that week — not just theory.",
              },
            ].map((item) => (
              <div key={item.step} style={{ display: "flex", gap: "28px", alignItems: "flex-start" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 300, color: "#e0e7ff", lineHeight: 1, minWidth: "52px", flexShrink: 0 }}>
                  {item.step}
                </span>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 8px" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "15px", color: "#6b6880", lineHeight: 1.7, margin: 0 }}>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Session types ─────────────────────────────────────────────────── */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b6880", marginBottom: "12px" }}>
            Three ways to get support
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 300, color: "#1e1b2e", margin: "0 0 16px" }}>
            Find the right fit for your family
          </h2>
          <p style={{ fontSize: "16px", color: "#6b6880", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7, fontWeight: 300 }}>
            All sessions are live, online, and designed around busy family life. No 1:1 appointments — just meaningful group learning.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          {[
            {
              tag: "Small Group",
              tagColor: "#c2410c",
              tagBg: "#fff7ed",
              border: "1px solid #fed7aa",
              title: "Small Group Sessions",
              description: "Intimate sessions of 6–10 families, led by a vetted specialist. Structured conversation, peer connection, and practical strategies in 60 minutes.",
              price: "$45",
              details: ["6–10 families", "60 minutes", "Minimum 6 families to run"],
              href: "/sessions?type=group",
              highlight: null,
            },
            {
              tag: "Webinar",
              tagColor: "#3730a3",
              tagBg: "#eef2ff",
              border: "1px solid #c7d2fe",
              title: "Webinars by Our Team",
              description: "Live webinars run by the Developmental Hub team. Deep-dive presentations on key topics with live Q&A. Accessible and affordable for any family.",
              price: "$25",
              details: ["Up to 100 families", "45 minutes", "Minimum 25 families to run"],
              href: "/sessions?type=webinar-owner",
              highlight: "Best value",
            },
            {
              tag: "Specialist Webinar",
              tagColor: "#166534",
              tagBg: "#f0fdf4",
              border: "1px solid #bbf7d0",
              title: "Specialist Webinars",
              description: "Webinars hosted by vetted external specialists and therapists. Expert voices on the topics your family needs most.",
              price: "$35",
              details: ["Up to 100 families", "60 minutes", "Minimum 25 families to run"],
              href: "/sessions?type=webinar-facilitator",
              highlight: null,
            },
          ].map((type) => (
            <div key={type.title} style={{ position: "relative", backgroundColor: "white", border: type.border, borderRadius: "16px", padding: "32px", display: "flex", flexDirection: "column" }}>
              {type.highlight && (
                <span style={{ position: "absolute", top: "-12px", left: "24px", backgroundColor: "#3730a3", color: "white", fontSize: "11px", fontWeight: 600, padding: "4px 12px", borderRadius: "999px" }}>
                  {type.highlight}
                </span>
              )}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <span style={{ fontSize: "12px", fontWeight: 600, padding: "4px 12px", borderRadius: "999px", backgroundColor: type.tagBg, color: type.tagColor }}>
                  {type.tag}
                </span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 300, color: "#1e1b2e" }}>
                  {type.price} <span style={{ fontSize: "13px", color: "#6b6880", fontFamily: "DM Sans, sans-serif" }}>/ family</span>
                </span>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 12px" }}>
                {type.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#6b6880", lineHeight: 1.7, margin: "0 0 24px", flex: 1 }}>
                {type.description}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "24px" }}>
                {type.details.map((d) => (
                  <div key={d} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#6b6880" }}>
                    <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: type.tagColor, flexShrink: 0 }} />
                    {d}
                  </div>
                ))}
              </div>
              <Link href={type.href} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: 600, color: type.tagColor, textDecoration: "none" }}>
                Browse sessions
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", fontSize: "13px", color: "#6b6880", marginTop: "32px", lineHeight: 1.6 }}>
          If the minimum number of families is not reached 24 hours before the session, it will be cancelled and every family receives a full automatic refund.
        </p>
      </section>

      {/* ── Waitlist CTA ──────────────────────────────────────────────────── */}
<section style={{ backgroundColor: "#1e1b2e", padding: "80px 24px" }}>
  <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
    <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#a5b4fc", marginBottom: "16px" }}>
      Play Move Improve — now online
    </p>
    <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 300, color: "white", margin: "0 0 20px", lineHeight: 1.2 }}>
      Bringing expert support to families wherever they are
    </h2>
    <p style={{ fontSize: "16px", color: "#c7d2fe", lineHeight: 1.8, fontWeight: 300, margin: "0 0 16px" }}>
      Developmental Hub is the telehealth platform from Play Move Improve — built for busy families and those in rural and regional areas who have always found it hard to access the support their child needs.
    </p>
    <p style={{ fontSize: "16px", color: "#a5b4fc", lineHeight: 1.8, fontWeight: 300, margin: "0 0 36px" }}>
      We're still building out our session library and we want to hear from you. Tell us what your family needs — when enough families express interest in a topic, we bring in a specialist and make it happen.
    </p>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
      <Link href="/waitlist" style={{ backgroundColor: "white", color: "#1e1b2e", padding: "14px 36px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
        Tell us what you need
      </Link>
      <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>
        No commitment. No charge. Just your voice helping us build something better.
      </p>
    </div>
  </div>
</section>

      {/* ── Practitioners CTA ─────────────────────────────────────────────── */}
      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "80px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
        <div style={{ backgroundColor: "#f5f3ff", border: "1px solid #e0e7ff", borderRadius: "20px", padding: "40px 36px" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#3730a3", marginBottom: "12px" }}>For families</p>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 12px", lineHeight: 1.3 }}>
            Browse our upcoming sessions
          </h3>
          <p style={{ fontSize: "14px", color: "#6b6880", lineHeight: 1.7, margin: "0 0 28px" }}>
            Filter by your child's age group and the topics that matter most to your family right now.
          </p>
          <Link href="/sessions" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: 600, color: "#3730a3", textDecoration: "none" }}>
            See all sessions
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div style={{ backgroundColor: "#faf8f5", border: "1px solid #e8e4de", borderRadius: "20px", padding: "40px 36px" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b6880", marginBottom: "12px" }}>For practitioners</p>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 12px", lineHeight: 1.3 }}>
            Share your expertise with families who need it
          </h3>
          <p style={{ fontSize: "14px", color: "#6b6880", lineHeight: 1.7, margin: "0 0 28px" }}>
            Run sessions on your schedule. We handle the bookings, payments, and technology.
          </p>
          <Link href="/practitioners" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: 600, color: "#1e1b2e", textDecoration: "none" }}>
            Learn more
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>

    </main>
  );
}