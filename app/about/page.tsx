import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Robyn — Developmental Hub",
  description: "Robyn Papworth is a Masters-qualified Developmental Educator, Exercise Physiologist, and mother of twins. This is her story.",
};

export default function AboutPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e" }}>

      {/* Hero */}
      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "80px 24px 60px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 300, color: "#1e1b2e", lineHeight: 1.2, marginBottom: "24px" }}>
          I'm Robyn. And I've been exactly where you are.
        </h1>
        <p style={{ fontSize: "17px", color: "#6b6880", lineHeight: 1.7, fontWeight: 300 }}>
          Not as a professional observing from a distance. As a mum sitting across from her son, watching him try to read, wondering why it wasn't clicking.
        </p>
      </section>

      {/* Founder section */}
      <section style={{ backgroundColor: "#3730a3", padding: "64px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontSize: "16px", color: "#c7d2fe", lineHeight: 1.8, marginBottom: "20px", textAlign: "center", fontWeight: 300 }}>
            My twins didn't get the easiest start. I'm five foot six and they were squashed in there — my son spent most of his time in the womb positioned up under my ribs, which meant he didn't get the typical time upside down that the vestibular system needs to develop. As a vestibular specialist I knew in my heart this might matter. It did.
          </p>
          <p style={{ fontSize: "16px", color: "#c7d2fe", lineHeight: 1.8, marginBottom: "20px", textAlign: "center", fontWeight: 300 }}>
            I would watch him try to read. He knew every word on the page. But as his head moved across the line his eyes kept sliding off it. That's a vestibular problem. The VOR reflex — the system that keeps your eyes stable as your head moves — wasn't developed enough. Reading wasn't a learning problem. It was a movement problem. And nobody had told us.
          </p>
          <p style={{ fontSize: "16px", color: "#c7d2fe", lineHeight: 1.8, marginBottom: "20px", textAlign: "center", fontWeight: 300 }}>
            The boring repetitive exercises didn't work for him. What worked was music. Rhythm. Silly games with a ball. Animal walks down the hallway. Playful, ridiculous, joyful movement that didn't feel like therapy at all. I have ADHD myself. I know what it's like to need movement to focus — rocking on my chair, pushing my toes against the floor, always needing something cold or warm in my hand just to stay present. I built this programme for families like mine.
          </p>
          <p style={{ fontSize: "16px", color: "#c7d2fe", lineHeight: 1.8, textAlign: "center", fontWeight: 300 }}>
            I work with a family in India who do these activities with their son every single day. They found me online, we've never met in person, and watching what has shifted for their child from the other side of the world is one of the things I am most proud of in my career. Distance should never be the reason a child misses out.
          </p>
          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "20px", color: "white", fontStyle: "italic", margin: "0 0 4px" }}>
              Robyn Papworth
            </p>
            <p style={{ fontSize: "13px", color: "#c7d2fe", margin: 0 }}>
              Founder, Play Move Improve · Developmental Educator · Exercise Physiologist · Mum of three
            </p>
          </div>
        </div>
      </section>

      {/* Three column section */}
      <section style={{ backgroundColor: "white", borderTop: "1px solid #e8e4de", borderBottom: "1px solid #e8e4de" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "64px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "48px" }}>
          {[
            {
              title: "Movement comes before reading",
              body: "Before a child can learn to read and write, their body needs certain foundations — crossing the midline, spatial awareness, visual tracking, core strength, rhythm. We build those first. Everything else follows.",
            },
            {
              title: "Three minutes is enough to start",
              body: "Some of Robyn's videos are three minutes long. You don't need equipment, preparation, or a perfectly behaved child. You just need to press play. Your child follows Robyn on screen and their body does the rest.",
            },
            {
              title: "You don't have to figure this out alone",
              body: "Robyn has ADHD. Her son has vestibular challenges. She has lived the dysregulation, the school struggles, the feeling that you're trying everything and nothing is sticking. She built this because she needed it too.",
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

      {/* Contact section */}
      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "64px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 300, color: "#1e1b2e", marginBottom: "12px" }}>
          Want to get in touch?
        </h2>
        <p style={{ fontSize: "16px", color: "#6b6880", lineHeight: 1.7, fontWeight: 300, marginBottom: "32px" }}>
          Whether you have a question about the programme, want to know if it's right for your child, or are interested in live sessions with Robyn — she'd love to hear from you.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="mailto:robyn@playmoveimprove.com.au" style={{ backgroundColor: "#3730a3", color: "white", padding: "12px 28px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
            Email Robyn
          </a>
          <Link href="/waitlist" style={{ backgroundColor: "white", color: "#3730a3", padding: "12px 28px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none", display: "inline-block", border: "1.5px solid #3730a3" }}>
            Join the waitlist
          </Link>
        </div>
        <div style={{ marginTop: "24px", display: "flex", gap: "20px", justifyContent: "center" }}>
          <a href="https://www.instagram.com/playmoveimprove" target="_blank" rel="noopener noreferrer" style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none" }}>Instagram @playmoveimprove</a>
          <span style={{ color: "#e8e4de" }}>·</span>
          <a href="https://www.facebook.com/playmoveimprove" target="_blank" rel="noopener noreferrer" style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none" }}>Facebook @playmoveimprove</a>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ backgroundColor: "#3730a3", padding: "64px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 300, color: "white", marginBottom: "16px" }}>
          Start with the free videos. No account needed.
        </h2>
        <p style={{ fontSize: "16px", color: "#c7d2fe", marginBottom: "32px", fontWeight: 300 }}>
          Watch Robyn in action with your child tonight. Just press play.
        </p>
        <Link href="/videos/free" style={{ backgroundColor: "white", color: "#3730a3", padding: "14px 32px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
          Watch free videos
        </Link>
      </section>

    </main>
  );
}