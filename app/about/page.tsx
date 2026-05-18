import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "80px 24px 60px", textAlign: "center" }}>
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b6880", marginBottom: "16px" }}>
          About us
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "42px", fontWeight: 300, color: "#1e1b2e", lineHeight: 1.2, marginBottom: "24px" }}>
          Expert support, built around how families actually live
        </h1>
        <p style={{ fontSize: "17px", color: "#6b6880", lineHeight: 1.7, fontWeight: 300 }}>
          Developmental Hub was created because families navigating childhood developmental challenges deserve more than a waitlist. We bring together vetted specialists and the families who need them — in affordable, accessible group sessions that fit real life.
        </p>
      </section>

      {/* Why we exist */}
      <section style={{ backgroundColor: "white", borderTop: "1px solid #e8e4de", borderBottom: "1px solid #e8e4de" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "64px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "48px" }}>
          {[
            {
              title: "Affordable by design",
              body: "By bringing families together in small groups, we make specialist knowledge accessible at a fraction of the cost of 1:1 therapy — without sacrificing quality."
            },
            {
              title: "Vetted practitioners",
              body: "Every facilitator on our platform is reviewed and approved before going live. You can trust that whoever leads your session has the credentials to back it up."
            },
            {
              title: "Community over isolation",
              body: "Parenting a child with developmental needs can feel lonely. Our group format means you're learning alongside other families who truly understand."
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
              title: "Browse upcoming sessions",
              body: "Find a small group session or webinar on a topic that's relevant to your family right now — from sensory play to literacy support to motor development."
            },
            {
              step: "02",
              title: "Book and pay securely",
              body: "Reserve your spot with a simple, secure payment via Stripe. If the session doesn't reach its minimum attendance, you receive a full automatic refund."
            },
            {
              step: "03",
              title: "Join your session",
              body: "At the scheduled time, join your live video session from any device. No downloads required — just show up and connect."
            },
            {
              step: "04",
              title: "Keep the learning going",
              body: "Walk away with practical strategies you can use straight away, plus the option to book future sessions as your family's needs evolve."
            },
          ].map((item) => (
            <div key={item.step} style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 300, color: "#e0e7ff", lineHeight: 1, minWidth: "48px" }}>
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
          Meet the team
        </h2>
        <p style={{ fontSize: "16px", color: "#6b6880", marginBottom: "32px", fontWeight: 300 }}>
          Get to know the people behind Developmental Hub.
        </p>
        <Link
          href="/team"
          style={{ backgroundColor: "#3730a3", color: "white", padding: "14px 32px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none", display: "inline-block" }}
        >
          Meet our team
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