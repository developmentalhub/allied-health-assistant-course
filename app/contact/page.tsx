import Link from "next/link";

export default function ContactPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "64px 24px 100px" }}>

        <Link href="/" style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "40px" }}>
          ← Back to home
        </Link>

        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3730a3", marginBottom: "12px" }}>
          Get in touch
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "40px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 16px" }}>
          Contact us
        </h1>
        <p style={{ fontSize: "16px", color: "#6b6880", lineHeight: 1.7, margin: "0 0 48px", fontWeight: 300 }}>
          We'd love to hear from you — whether you're a family looking for support, a practitioner interested in facilitating, or just curious about what we're building.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "48px" }}>

          {/* Email */}
          <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "16px", padding: "32px" }}>
            <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b6880", margin: "0 0 12px" }}>Email us</p>
            <a href="mailto:robyn@playmoveimprove.com.au" style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 400, color: "#3730a3", textDecoration: "none", display: "block", marginBottom: "8px" }}>
              robyn@playmoveimprove.com.au
            </a>
            <p style={{ fontSize: "13px", color: "#6b6880", margin: 0, lineHeight: 1.6 }}>
              We aim to respond within 1–2 business days.
            </p>
          </div>

          {/* Social */}
          <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "16px", padding: "32px" }}>
            <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b6880", margin: "0 0 20px" }}>Follow us</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <a href="https://www.instagram.com/playmoveimprove" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#faf8f5", border: "1px solid #e8e4de", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e1b2e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="#1e1b2e"/>
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e", margin: 0 }}>Instagram</p>
                  <p style={{ fontSize: "13px", color: "#6b6880", margin: 0 }}>@playmoveimprove</p>
                </div>
              </a>
              <a href="https://www.facebook.com/playmoveimprove" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#faf8f5", border: "1px solid #e8e4de", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e1b2e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e", margin: 0 }}>Facebook</p>
                  <p style={{ fontSize: "13px", color: "#6b6880", margin: 0 }}>@playmoveimprove</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "16px", padding: "32px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 24px" }}>
            Common questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {[
              {
                q: "When do sessions open for booking?",
                a: "We're opening bookings at the end of June 2026. Register your interest on the sessions page to be first in line.",
              },
              {
                q: "I'm a practitioner — how do I apply?",
                a: "Visit our For Practitioners page to learn more and submit an application. We review every application personally.",
              },
              {
                q: "Is Developmental Hub part of Play Move Improve?",
                a: "Yes — Developmental Hub is the telehealth platform built by Play Move Improve Pty Ltd, bringing our expertise online for families everywhere.",
              },
              {
                q: "How do I know if a session is right for my child?",
                a: "Every session is designed for a specific age group and developmental area. Browse by your child's age and the topics that matter most to your family right now.",
              },
            ].map((item, i, arr) => (
              <div key={item.q} style={{ paddingBottom: i < arr.length - 1 ? "24px" : "0", borderBottom: i < arr.length - 1 ? "1px solid #f0ede8" : "none" }}>
                <p style={{ fontSize: "15px", fontWeight: 600, color: "#1e1b2e", margin: "0 0 8px" }}>{item.q}</p>
                <p style={{ fontSize: "14px", color: "#6b6880", lineHeight: 1.7, margin: 0 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}