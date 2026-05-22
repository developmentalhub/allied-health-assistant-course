import Link from "next/link";

export default function AboutPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e" }}>

      {/* Hero */}
      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "80px 24px 60px", textAlign: "center" }}>
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b6880", marginBottom: "16px" }}>
          About us
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 300, color: "#1e1b2e", lineHeight: 1.2, marginBottom: "24px" }}>
          Expert support, built around how families actually live
        </h1>
        <p style={{ fontSize: "17px", color: "#6b6880", lineHeight: 1.7, fontWeight: 300 }}>
          Developmental Hub is the telehealth platform from Play Move Improve — built so that busy families, and those in rural and regional areas, can access the specialist support their child needs without the waitlists, the travel, or the cost of private appointments.
        </p>
      </section>

      {/* Founder's note */}
      <section style={{ backgroundColor: "#3730a3", padding: "64px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#c7d2fe", marginBottom: "24px", textAlign: "center" }}>
            A note from our founder
          </p>
          <blockquote style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 300, color: "white", lineHeight: 1.7, textAlign: "center", margin: "0 0 32px 0", fontStyle: "italic" }}>
            "I have seen firsthand what it means for a family to finally get the support they have been waiting for. And I have seen what happens when they cannot access it at all."
          </blockquote>
          <p style={{ fontSize: "16px", color: "#c7d2fe", lineHeight: 1.8, marginBottom: "20px", textAlign: "center", fontWeight: 300 }}>
            I am Robyn, a Masters-qualified Developmental Educator and Exercise Physiologist based in Victoria, Australia. For years I have worked with families who live far from the allied health services their children need — rural families, isolated families, families who are doing everything right but simply cannot access the right support.
          </p>
          <p style={{ fontSize: "16px", color: "#c7d2fe", lineHeight: 1.8, marginBottom: "20px", textAlign: "center", fontWeight: 300 }}>
            That is what drove me to build Developmental Hub. Together with a team of occupational therapists, early childhood and primary education teachers, and specialist practitioners, we have created something I am deeply proud of.
          </p>
          <p style={{ fontSize: "16px", color: "#c7d2fe", lineHeight: 1.8, textAlign: "center", fontWeight: 300 }}>
            Today we support families across Australia and around the world — including a family I have had the privilege of working with from my home in Victoria, all the way to India. Distance is no longer a reason a child misses out.
          </p>
          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "20px", color: "white", fontStyle: "italic", margin: "0 0 4px" }}>
              Robyn Papworth
            </p>
            <p style={{ fontSize: "13px", color: "#c7d2fe", margin: 0 }}>
              Founder, Developmental Hub · Play Move Improve Pty Ltd
            </p>
          </div>
        </div>
      </section>

      {/* Why we exist */}
      <section style={{ backgroundColor: "white", borderTop: "1px solid #e8e4de", borderBottom: "1px solid #e8e4de" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "64px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "48px" }}>
          {[
            {
              title: "Affordable by design",
              body: "By bringing families together in small groups, we make specialist knowledge accessible at a fraction of the cost of individual therapy — without sacrificing quality or personal connection.",
            },
            {
              title: "Vetted practitioners",
              body: "Every facilitator on our platform is reviewed and approved before going live. You can trust that whoever leads your session holds the credentials, insurance, and registrations to back it up.",
            },
            {
              title: "Community over isolation",
              body: "Parenting a child with developmental needs can feel lonely. Our group format means you are learning alongside other families who truly understand what you are going through.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 400, color: "#1e1b2e", marginBottom: "12px" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "15px", color: "#6b6880", lineHeight: 1.7 }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "64px 24px" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 300, color: "#1e1b2e", marginBottom: "40px", textAlign: "center" }}>
          How it works
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {[
            {
              step: "01",
              title: "Browse sessions for your child's age",
              body: "Every session is designed for a specific developmental stage — 0 to 2, 3 to 5, or 6 to 8 years. Filter by topic to find what is most relevant to your family right now.",
            },
            {
              step: "02",
              title: "Book and pay securely",
              body: "Reserve your spot with a simple, secure payment via Stripe. Your card is authorised but not charged until the session reaches its minimum number of families. If it does not run, you are never charged.",
            },
            {
              step: "03",
              title: "Join your session live",
              body: "At the scheduled time, join your live video session from any device. No downloads required. Just show up and connect with your facilitator and fellow families.",
            },
            {
              step: "04",
              title: "Walk away with real strategies",
              body: "Every session is practical. You will leave with specific techniques you can use with your child that week — not just theory. And you can book future sessions as your family's needs evolve.",
            },
          ].map((item) => (
            <div key={item.step} style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 300, color: "#e0e7ff", lineHeight: 1, minWidth: "48px", flexShrink: 0 }}>
                {item.step}
              </span>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 400, color: "#1e1b2e", marginBottom: "8px" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "15px", color: "#6b6880", lineHeight: 1.7 }}>
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the team */}
      <section style={{ backgroundColor: "#f5f3ff", borderTop: "1px solid #e0e7ff", borderBottom: "1px solid #e0e7ff", padding: "64px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 300, color: "#1e1b2e", marginBottom: "16px" }}>
          Meet our specialists
        </h2>
        <p style={{ fontSize: "16px", color: "#6b6880", marginBottom: "32px", fontWeight: 300, maxWidth: "480px", margin: "0 auto 32px" }}>
          Every practitioner on Developmental Hub is vetted, qualified, and passionate about supporting families.
        </p>
        <Link
          href="/practitioners/directory"
          style={{ backgroundColor: "#3730a3", color: "white", padding: "14px 32px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none", display: "inline-block" }}
        >
          Meet our specialists
        </Link>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#3730a3", padding: "64px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 300, color: "white", marginBottom: "16px" }}>
          Ready to find your session?
        </h2>
        <p style={{ fontSize: "16px", color: "#c7d2fe", marginBottom: "32px", fontWeight: 300 }}>
          Browse upcoming sessions and book your spot today.
        </p>
        <Link
          href="/sessions"
          style={{ backgroundColor: "white", color: "#3730a3", padding: "14px 32px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none", display: "inline-block" }}
        >
          Browse sessions
        </Link>
      </section>

    </main>
  );
}