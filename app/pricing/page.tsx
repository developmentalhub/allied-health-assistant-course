import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Developmental Hub",
  description: "$39/month for unlimited access to expert child development videos, downloadable activity sheets, and a monthly live Q&A with Robyn Papworth. Cancel anytime.",
};

const ROBYN_PHOTO = "https://pndihjsqkwbjewlulotg.supabase.co/storage/v1/object/public/public-assets/robyn-hero.png";

export default function PricingPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e" }}>

      {/* Hero */}
      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "80px 24px 64px", textAlign: "center" }}>
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3730a3", marginBottom: "12px" }}>
          Simple pricing
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 300, color: "#1e1b2e", margin: "0 0 20px", lineHeight: 1.2 }}>
          Everything your family needs for $39 a month
        </h1>
        <p style={{ fontSize: "17px", color: "#6b6880", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
          One subscription. Unlimited access to expert-led videos, downloadable activity sheets, and a monthly live Q&A with Robyn.
        </p>
      </section>

      {/* Pricing card */}
      <section style={{ maxWidth: "480px", margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ backgroundColor: "white", border: "2px solid #3730a3", borderRadius: "24px", padding: "48px 40px", textAlign: "center", position: "relative" }}>
          <div style={{ position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)", backgroundColor: "#3730a3", color: "white", fontSize: "12px", fontWeight: 600, padding: "4px 16px", borderRadius: "999px", whiteSpace: "nowrap" }}>
            Start today
          </div>

          <p style={{ fontSize: "14px", fontWeight: 600, color: "#3730a3", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 8px" }}>
            Family membership
          </p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "4px", margin: "0 0 8px" }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "64px", fontWeight: 300, color: "#1e1b2e", lineHeight: 1 }}>$39</span>
            <span style={{ fontSize: "16px", color: "#6b6880", marginBottom: "12px" }}>/month AUD</span>
          </div>
          <p style={{ fontSize: "13px", color: "#6b6880", margin: "0 0 36px" }}>Cancel anytime. No lock-in.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "40px", textAlign: "left" }}>
            {[
              "31 videos available right now",
              "New videos added every month",
              "Downloadable activity sheets and printables",
              "Monthly live Q&A with Robyn Papworth",
              "Currently covering ages 5–8 — more age groups coming soon",
              "Watch on any device, any time",
              "Cancel anytime — no questions asked",
            ].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ width: "20px", height: "20px", backgroundColor: "#eef2ff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                  <svg width="10" height="10" fill="none" stroke="#3730a3" strokeWidth="2.5">
                    <path d="M1.5 5l2.5 2.5L8.5 2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p style={{ fontSize: "15px", color: "#1e1b2e", margin: 0, lineHeight: 1.5 }}>{item}</p>
              </div>
            ))}
          </div>

          <Link href="/subscribe" style={{ display: "block", width: "100%", backgroundColor: "#3730a3", color: "white", padding: "16px", borderRadius: "999px", fontSize: "16px", fontWeight: 600, textDecoration: "none", textAlign: "center", boxSizing: "border-box" }}>
            Start your membership
          </Link>
          <p style={{ fontSize: "12px", color: "#6b6880", margin: "12px 0 0" }}>
            Secure payment via Stripe
          </p>
        </div>

        {/* Free taster */}
        <div style={{ backgroundColor: "#f5f3ff", border: "1px solid #e0e7ff", borderRadius: "16px", padding: "28px 32px", marginTop: "24px", textAlign: "center" }}>
          <p style={{ fontSize: "15px", fontWeight: 600, color: "#3730a3", margin: "0 0 8px" }}>Not ready to subscribe yet?</p>
          <p style={{ fontSize: "14px", color: "#6b6880", margin: "0 0 16px", lineHeight: 1.6 }}>
            Watch 8 free videos with your child — no account needed.
          </p>
          <Link href="/videos/free" style={{ fontSize: "14px", fontWeight: 600, color: "#3730a3", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
            Watch free videos
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Robyn section */}
      <section style={{ backgroundColor: "#1e1b2e", padding: "80px 24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "48px", alignItems: "center" }}>
          <div style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "4/3" }}>
            <img src={ROBYN_PHOTO} alt="Robyn Papworth" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
          </div>
          <div>
            <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#a5b4fc", marginBottom: "16px" }}>
              From Robyn
            </p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 300, color: "white", lineHeight: 1.7, margin: "0 0 20px", fontStyle: "italic" }}>
              "I made these videos for busy families who want practical, expert support that meets their child exactly where they are — without the waitlists, the appointments, or the travel."
            </p>
            <p style={{ fontSize: "14px", color: "#9ca3af", margin: 0 }}>
              Robyn Papworth · Founder, Play Move Improve<br />
              Masters-qualified Developmental Educator & Exercise Physiologist
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: "640px", margin: "0 auto", padding: "80px 24px" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 40px", textAlign: "center" }}>
          Common questions
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {[
            { q: "How many videos are included?", a: "31 videos are available right now, with new ones added every month. Your subscription price stays the same as the library grows." },
            { q: "What age groups are covered?", a: "The current program is designed for children aged 5–8. Content for younger age groups is in development and will be added soon." },
            { q: "What is the monthly live Q&A?", a: "Once a month, Robyn hosts a live video session where subscribers can ask questions about their child's development. Replays are available if you can't attend live." },
            { q: "Can I cancel anytime?", a: "Yes — cancel anytime from your account settings. You keep access until the end of your billing period. No cancellation fees, no questions asked." },
            { q: "Is this the same as Play Move Improve?", a: "Developmental Hub is Robyn's online platform, built from her work at Play Move Improve. The videos bring her expertise directly into your home." },
            { q: "Is my payment secure?", a: "All payments are processed by Stripe, the same technology used by Netflix, Amazon, and millions of other services. We never store your card details." },
            { q: "What if I want more personalised support?", a: "The membership covers our video library and monthly Q&A. For live group sessions or one-to-one support with Robyn, join the waitlist and she will be in touch when those sessions are ready." },
          ].map((item, i, arr) => (
            <div key={item.q} style={{ padding: "24px 0", borderBottom: i < arr.length - 1 ? "1px solid #e8e4de" : "none" }}>
              <p style={{ fontSize: "16px", fontWeight: 600, color: "#1e1b2e", margin: "0 0 8px" }}>{item.q}</p>
              <p style={{ fontSize: "15px", color: "#6b6880", lineHeight: 1.7, margin: 0 }}>{item.a}</p>
            </div>
          ))}
        </div>

        {/* Waitlist nudge */}
        <div style={{ backgroundColor: "#f5f3ff", border: "1px solid #e0e7ff", borderRadius: "14px", padding: "24px 28px", marginTop: "40px", textAlign: "center" }}>
          <p style={{ fontSize: "15px", fontWeight: 600, color: "#3730a3", margin: "0 0 6px" }}>Looking for live sessions with Robyn?</p>
          <p style={{ fontSize: "14px", color: "#6b6880", margin: "0 0 16px", lineHeight: 1.6 }}>Small group and 1:1 sessions are coming. Join the waitlist and Robyn will contact you personally when they're ready.</p>
          <Link href="/waitlist" style={{ fontSize: "14px", fontWeight: 600, color: "#3730a3", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
            Join the waitlist
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

      </section>

    </main>
  );
}