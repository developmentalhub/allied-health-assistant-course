"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CUP_PRINTABLE = "https://pndihjsqkwbjewlulotg.supabase.co/storage/v1/object/public/printables/Cup%20Rhythm%20Activity.pdf";

const CUP_VIDEOS = [
  { order: 1, title: "Introduction to Cup Rhythm Activity — Part 1", url: "https://developmental-hub-videos.b-cdn.net/Rhythm%20and%20Coordination/Cup%20Movement%20Sequence%20Activity/Cup%20Rhythm%20Activity%20-%20Introduction%20-%201.mp4" },
  { order: 2, title: "Introduction to Cup Rhythm Activity — Part 2", url: "https://developmental-hub-videos.b-cdn.net/Rhythm%20and%20Coordination/Cup%20Movement%20Sequence%20Activity/Cup%20Rhythm%20Activity%20-%20Introduction%20-%201b.mp4" },
  { order: 3, title: "First Sequence — Symbols to Tap and Turn", url: "https://developmental-hub-videos.b-cdn.net/Rhythm%20and%20Coordination/Cup%20Movement%20Sequence%20Activity/Cup%20activity%20-%20first%20time%20using%20a%20small%20sequence%20of%20symbols%20to%20tap%20and%20turn.mp4" },
  { order: 4, title: "Tapping Every Beat on the Cup", url: "https://developmental-hub-videos.b-cdn.net/Rhythm%20and%20Coordination/Cup%20Movement%20Sequence%20Activity/Cup%20activity%20-%20tapping%20every%20beat%20on%20the%20cup.mp4" },
  { order: 5, title: "Tapping Cup on Table — After Tapping Top", url: "https://developmental-hub-videos.b-cdn.net/Rhythm%20and%20Coordination/Cup%20Movement%20Sequence%20Activity/Cup%20activity%20-%20tapping%20cup%20on%20table%20-%20after%20tapping%20top%20of%20cup.mp4" },
  { order: 6, title: "Tap Cup on Table and With Fingers — Before Sliding", url: "https://developmental-hub-videos.b-cdn.net/Rhythm%20and%20Coordination/Cup%20Movement%20Sequence%20Activity/Cup%20activity%20-%20tap%20cup%20on%20table%20and%20with%20fingers%20-%20before%20sliding%20cup.mp4" },
  { order: 7, title: "Turning the Cup Over on Beats 1 and 3", url: "https://developmental-hub-videos.b-cdn.net/Rhythm%20and%20Coordination/Cup%20Movement%20Sequence%20Activity/Cup%20activity%20-%20turning%20the%20cup%20over%20on%20beats%201%20and%203.mp4" },
  { order: 8, title: "Turning the Cup Over on Beats 1 and 3 — Version 2", url: "https://developmental-hub-videos.b-cdn.net/Rhythm%20and%20Coordination/Cup%20Movement%20Sequence%20Activity/Cup%20activity%20-%20turning%20the%20cup%20over%20on%20beats%201%20and%203%20-%20version%202.mp4" },
  { order: 9, title: "Turning the Cup Over on 4 Beats", url: "https://developmental-hub-videos.b-cdn.net/Rhythm%20and%20Coordination/Cup%20Movement%20Sequence%20Activity/Cup%20activity%20-%20turning%20the%20cup%20over%20on%204%20beats%20-%20after%20beats%201%20and%203%20activity.mp4" },
  { order: 10, title: "Turning the Cup Over on 4 Beats — Version 2", url: "https://developmental-hub-videos.b-cdn.net/Rhythm%20and%20Coordination/Cup%20Movement%20Sequence%20Activity/Cup%20activity%20-%20turning%20the%20cup%20over%20on%204%20beats%20-%20version%202.mp4" },
  { order: 11, title: "Slide Cup and Slide Then Tap — Final Task", url: "https://developmental-hub-videos.b-cdn.net/Rhythm%20and%20Coordination/Cup%20Movement%20Sequence%20Activity/Cup%20activity%20-%20slide%20cup%20and%20slide%20then%20tap%20cup%20-%20last%20cup%20task.mp4" },
  { order: 12, title: "Sequence Along the Length of the Table", url: "https://developmental-hub-videos.b-cdn.net/Rhythm%20and%20Coordination/Cup%20Movement%20Sequence%20Activity/Cup%20activity%20-%20sequence%20along%20length%20of%20table.mp4" },
];

// Show membership CTA after videos 4, 8, and at the end
const CTA_AFTER = [4, 8];

function MembershipCTA({ onContinue, isLast }: { onContinue: () => void; isLast: boolean }) {
  return (
    <div style={{ textAlign: "center", padding: "40px 24px" }}>
      <div style={{ backgroundColor: "#3730a3", borderRadius: "20px", padding: "40px 32px", maxWidth: "520px", margin: "0 auto" }}>
        <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#a5b4fc", margin: "0 0 12px" }}>
          Enjoying the series?
        </p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "26px", fontWeight: 300, color: "white", margin: "0 0 12px", lineHeight: 1.3 }}>
          Get 31 more videos in the full membership
        </h2>
        <p style={{ fontSize: "15px", color: "#c7d2fe", lineHeight: 1.6, margin: "0 0 28px" }}>
          Pre-reading, pre-writing, gross motor, fine motor and rhythm activities — plus monthly live Q&A with Robyn and downloadable printables. $39/month, cancel anytime.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
          <Link href="/pricing" style={{ backgroundColor: "white", color: "#3730a3", padding: "13px 32px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, textDecoration: "none", display: "inline-block", width: "100%", textAlign: "center", boxSizing: "border-box" as const }}>
            Start membership — $39/month
          </Link>
          {!isLast && (
            <button onClick={onContinue} style={{ background: "none", border: "none", color: "#a5b4fc", fontSize: "14px", cursor: "pointer", fontFamily: "inherit", textDecoration: "underline", padding: "4px" }}>
              Continue watching the free series →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CupSequencePage() {
  const [unlocked, setUnlocked] = useState(false);
  const [form, setForm] = useState({ first_name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCTA, setShowCTA] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cup_sequence_unlocked");
    if (saved) setUnlocked(true);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/cup-sequence", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error ?? "Something went wrong."); setLoading(false); return; }
    localStorage.setItem("cup_sequence_unlocked", "1");
    setUnlocked(true);
    setLoading(false);
  }

  function handleNext() {
    const nextIndex = currentIndex + 1;
    const currentVideoNumber = currentIndex + 1;

    // Check if we should show CTA after this video
    if (CTA_AFTER.includes(currentVideoNumber)) {
      setShowCTA(true);
      return;
    }

    if (nextIndex >= CUP_VIDEOS.length) {
      setFinished(true);
    } else {
      setCurrentIndex(nextIndex);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleContinueFromCTA() {
    setShowCTA(false);
    const nextIndex = currentIndex + 1;
    if (nextIndex >= CUP_VIDEOS.length) {
      setFinished(true);
    } else {
      setCurrentIndex(nextIndex);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px", borderRadius: "12px",
    border: "1.5px solid #e8e4de", fontSize: "15px", color: "#1e1b2e",
    outline: "none", boxSizing: "border-box", fontFamily: "inherit", backgroundColor: "white",
  };

  const currentVideo = CUP_VIDEOS[currentIndex];
  const progress = ((currentIndex + 1) / CUP_VIDEOS.length) * 100;

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e" }}>

      {/* Hero */}
      <section style={{ backgroundColor: "#1e1b2e", padding: "48px 24px 40px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "999px", padding: "6px 16px", marginBottom: "16px" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#a5b4fc", letterSpacing: "0.08em", textTransform: "uppercase" }}>Free 12-part series</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 300, color: "white", margin: "0 0 12px", lineHeight: 1.2 }}>
            Cup Rhythm Activity Series
          </h1>
          <p style={{ fontSize: "15px", color: "#c7d2fe", lineHeight: 1.6, fontWeight: 300, margin: "0 0 20px", maxWidth: "520px", marginLeft: "auto", marginRight: "auto" }}>
            Builds rhythm, coordination, sequencing and school readiness — the physical foundations your child needs before reading and writing click.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}>
            {[["12", "videos"], ["Free", "forever"], ["Ages 5–8", "ideal for"], ["1 cup", "all you need"]].map(([val, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <p style={{ fontSize: "20px", fontWeight: 700, color: "white", margin: "0 0 2px" }}>{val}</p>
                <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: "680px", margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Email capture */}
        {!unlocked ? (
          <div style={{ backgroundColor: "white", border: "2px solid #3730a3", borderRadius: "20px", padding: "40px", textAlign: "center" }}>
            <div style={{ width: "52px", height: "52px", backgroundColor: "#eef2ff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <svg width="22" height="22" fill="none" stroke="#3730a3" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 8px" }}>
              Get instant free access
            </h2>
            <p style={{ fontSize: "15px", color: "#6b6880", lineHeight: 1.6, margin: "0 0 28px" }}>
              Enter your email and all 12 videos unlock immediately.
            </p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px", textAlign: "left" }}>
              <input value={form.first_name} onChange={(e) => setForm(p => ({ ...p, first_name: e.target.value }))} placeholder="First name" style={inputStyle} />
              <input type="email" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} required placeholder="Email address" style={inputStyle} />
              {error && <p style={{ fontSize: "13px", color: "#b91c1c", margin: 0 }}>{error}</p>}
              <button type="submit" disabled={loading} style={{ backgroundColor: "#3730a3", color: "white", border: "none", borderRadius: "999px", padding: "15px", fontSize: "16px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, fontFamily: "inherit" }}>
                {loading ? "Unlocking..." : "Watch all 12 videos free"}
              </button>
              <p style={{ fontSize: "12px", color: "#9ca3af", textAlign: "center", margin: 0 }}>No spam. Unsubscribe anytime.</p>
            </form>
          </div>

        ) : finished ? (
          /* Finished all videos */
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "64px", height: "64px", backgroundColor: "#f0fdf4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <svg width="28" height="28" fill="none" stroke="#166534" strokeWidth="2"><path d="M4 12l6 6L20 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 12px" }}>
              You've completed the series!
            </h2>
            <p style={{ fontSize: "16px", color: "#6b6880", lineHeight: 1.7, margin: "0 0 32px" }}>
              Great work. Your child has been building rhythm, coordination and sequencing skills that directly support reading and writing readiness.
            </p>
            <MembershipCTA onContinue={() => {}} isLast={true} />
          </div>

        ) : showCTA ? (
          /* Mid-series CTA */
          <MembershipCTA onContinue={handleContinueFromCTA} isLast={false} />

        ) : (
          /* Video player */
          <div>
            {/* Progress bar */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#3730a3" }}>Video {currentIndex + 1} of {CUP_VIDEOS.length}</span>
                <a href={CUP_PRINTABLE} target="_blank" rel="noopener noreferrer" style={{ fontSize: "13px", color: "#6b6880", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Download printable
                </a>
              </div>
              <div style={{ height: "6px", backgroundColor: "#e8e4de", borderRadius: "999px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${progress}%`, backgroundColor: "#3730a3", borderRadius: "999px", transition: "width 0.3s ease" }} />
              </div>
              {/* Video dots */}
              <div style={{ display: "flex", gap: "4px", marginTop: "8px", flexWrap: "wrap" }}>
                {CUP_VIDEOS.map((_, i) => (
                  <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: i < currentIndex ? "#3730a3" : i === currentIndex ? "#7c3aed" : "#e8e4de", flexShrink: 0 }} />
                ))}
              </div>
            </div>

            {/* Video */}
            <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "16px", overflow: "hidden", marginBottom: "20px" }}>
              <video
                key={currentVideo.url}
                src={currentVideo.url}
                controls
                autoPlay
                style={{ width: "100%", display: "block", maxHeight: "420px", backgroundColor: "#000" }}
              />
              <div style={{ padding: "20px 24px" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#3730a3", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Video {currentVideo.order} of 12
                </p>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 400, color: "#1e1b2e", margin: 0, lineHeight: 1.4 }}>
                  {currentVideo.title}
                </h2>
              </div>
            </div>

            {/* Navigation */}
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              {currentIndex > 0 && (
                <button
                  onClick={() => { setCurrentIndex(currentIndex - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  style={{ padding: "12px 20px", borderRadius: "999px", border: "1.5px solid #e8e4de", backgroundColor: "white", fontSize: "14px", color: "#6b6880", cursor: "pointer", fontFamily: "inherit" }}
                >
                  ← Previous
                </button>
              )}
              <button
                onClick={handleNext}
                style={{ flex: 1, padding: "14px", borderRadius: "999px", border: "none", backgroundColor: "#3730a3", color: "white", fontSize: "15px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
              >
                {currentIndex === CUP_VIDEOS.length - 1 ? "Finish series" : "Next video →"}
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}