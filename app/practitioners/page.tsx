import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function PractitionersPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "80px 24px 60px", textAlign: "center" }}>
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b6880", marginBottom: "16px" }}>
          For practitioners
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "42px", fontWeight: 300, color: "#1e1b2e", lineHeight: 1.2, marginBottom: "24px" }}>
          Share your expertise with families who need it
        </h1>
        <p style={{ fontSize: "17px", color: "#6b6880", lineHeight: 1.7, fontWeight: 300, marginBottom: "40px" }}>
          Developmental Hub connects vetted specialists with families navigating childhood developmental challenges. Run group sessions and webinars on your own schedule. We handle the bookings, payments, and technology.
        </p>
        <Link
          href="/practitioners/apply"
          style={{ backgroundColor: "#3730a3", color: "white", padding: "14px 32px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, textDecoration: "none", display: "inline-block" }}
        >
          Apply to become a facilitator
        </Link>
      </section>

      {/* Benefits */}
      <section style={{ backgroundColor: "white", borderTop: "1px solid #e8e4de", borderBottom: "1px solid #e8e4de" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "64px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "40px" }}>
          {[
            {
              title: "Flexible scheduling",
              body: "Run sessions when it suits you. You set the topic, date and time and we fill the spots."
            },
            {
              title: "Guaranteed flat fee",
              body: "Earn a flat fee per session regardless of attendance. No chasing invoices. Payments are automatic via Stripe."
            },
            {
              title: "No admin burden",
              body: "We handle bookings, refunds, reminders, and the video platform. You just show up and deliver."
            },
            {
              title: "Reach more families",
              body: "Access a growing community of families actively seeking expert support, without the overhead of running your own platform."
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
          How it works for facilitators
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {[
            {
              step: "01",
              title: "Apply and get approved",
              body: "Submit your application with your qualifications and areas of expertise. Our team reviews every application before you go live."
            },
            {
              step: "02",
              title: "Propose your sessions",
              body: "Choose a topic from our approved list, set your preferred date and time, and submit it for scheduling."
            },
            {
              step: "03",
              title: "We fill the room",
              body: "Families browse and book your session. If the minimum attendance is not reached 24 hours before, the session is cancelled and rescheduled so your time is never wasted."
            },
            {
              step: "04",
              title: "Deliver and get paid",
              body: "Run your session via our built-in video platform. Your flat fee is automatically transferred to your account after the session."
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

      {/* What we look for */}
      <section style={{ backgroundColor: "#f5f3ff", borderTop: "1px solid #e0e7ff", borderBottom: "1px solid #e0e7ff" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "64px 24px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 300, color: "#1e1b2e", marginBottom: "16px", textAlign: "center" }}>
            What we look for
          </h2>
          <p style={{ fontSize: "16px", color: "#6b6880", textAlign: "center", marginBottom: "40px", lineHeight: 1.7 }}>
            We accept applications from qualified professionals working in areas relevant to childhood development.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
            {[
              "Speech pathologists",
              "Occupational therapists",
              "Psychologists",
              "Physiotherapists",
              "Early intervention specialists",
              "Developmental educators",
              "Play therapists",
              "Behaviour support practitioners",
            ].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "white", padding: "12px 16px", borderRadius: "10px", border: "1px solid #e0e7ff" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#3730a3", flexShrink: 0 }} />
                <span style={{ fontSize: "14px", color: "#1e1b2e" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#3730a3", padding: "64px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 300, color: "white", marginBottom: "16px" }}>
          Ready to get started?
        </h2>
        <p style={{ fontSize: "16px", color: "#c7d2fe", marginBottom: "32px", fontWeight: 300 }}>
          Apply today and our team will be in touch within 48 hours.
        </p>
        <Link
          href="/practitioners/apply"
          style={{ backgroundColor: "white", color: "#3730a3", padding: "14px 32px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none", display: "inline-block" }}
        >
          Apply to become a facilitator
        </Link>
      </section>

    </main>
  );
}