"use client";
import { useEffect, useState } from "react";

const STRIPE_LINK = "https://buy.stripe.com/5kQ4gs7DI7XqeMp5yy9fW0a";

const HEROES = [
  { url: "https://pndihjsqkwbjewlulotg.supabase.co/storage/v1/object/public/public-assets/move-to-read-hero.jpg", level: 1, color: "#4a8b6d" },
  { url: "https://pndihjsqkwbjewlulotg.supabase.co/storage/v1/object/public/public-assets/move-to-read-hero-2.jpg", level: 2, color: "#7B4FA6" },
  { url: "https://pndihjsqkwbjewlulotg.supabase.co/storage/v1/object/public/public-assets/move-to-read-hero-3.jpg", level: 3, color: "#3730a3" },
];

const LEVELS = [
  { n: 1, name: "Foundations", color: "#4a8b6d",
    desc: "Crossing the midline, core gross-motor control and visual tracking — the groundwork everything else sits on." },
  { n: 2, name: "Building", color: "#7B4FA6",
    desc: "Hand-eye coordination, spatial awareness and body-awareness games that sharpen control." },
  { n: 3, name: "Linking", color: "#3730a3",
    desc: "Movement tied to phonological awareness and visual discrimination — where it meets reading and writing." },
];

export default function MoveToReadPage() {
  const [state, setState] = useState<"loading" | "owned" | "buy">("loading");
  const [files, setFiles] = useState<{ label: string; url: string }[]>([]);

  useEffect(() => {
    fetch("/api/deck-download")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => { setFiles(d.files ?? []); setState("owned"); })
      .catch(() => setState("buy"));
  }, []);

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e" }}>
      <style>{`
        @keyframes mtrIn { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: none } }
        .mtr-rise { animation: mtrIn .6s ease both }
        .mtr-btn { transition: transform .15s ease, box-shadow .15s ease }
        .mtr-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(55,48,163,.22) }
        .mtr-btn:focus-visible { outline: 2px solid #3730a3; outline-offset: 3px }
        .mtr-hero-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 0 0 28px }
        @media (max-width: 560px) { .mtr-hero-grid { grid-template-columns: 1fr } }
        @media (prefers-reduced-motion: reduce) { .mtr-rise { animation: none } .mtr-btn { transition: none } }
      `}</style>

      <div className="mtr-rise" style={{ maxWidth: "720px", margin: "0 auto", padding: "72px 24px 96px" }}>

        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#3730a3", margin: "0 0 14px" }}>
          Move to Read
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px, 5vw, 46px)", fontWeight: 300, margin: "0 0 18px", lineHeight: 1.12, letterSpacing: "-0.01em" }}>
          Reading starts on the floor,<br />not at a desk
        </h1>
        <p style={{ fontSize: "17px", color: "#6b6880", lineHeight: 1.7, fontWeight: 300, margin: "0 0 28px", maxWidth: "560px" }}>
          The professional toolkit for building the foundations of reading and writing — through movement, adapted for home in minutes a day.
        </p>

        <div className="mtr-hero-grid">
          {HEROES.map((h) => (
            <div key={h.level} style={{ position: "relative", aspectRatio: "4 / 5", borderRadius: "14px", overflow: "hidden", border: "1px solid #e8e4de", borderTop: `3px solid ${h.color}`, backgroundColor: "#f1ede7" }}>
              <img
                src={h.url}
                alt={`Level ${h.level} movement activity`}
                onError={(e) => { const p = e.currentTarget.parentElement; if (p) p.style.display = "none"; }}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
              />
              <span style={{ position: "absolute", bottom: "8px", left: "8px", fontSize: "11px", fontWeight: 600, color: "white", backgroundColor: h.color, padding: "2px 8px", borderRadius: "6px" }}>
                Level {h.level}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", fontSize: "13px", color: "#9591a6", margin: "0 0 56px" }}>
          {["111 activities", "3 stages", "5 minutes a day"].map((m, i) => (
            <span key={m} style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              {i > 0 && <span style={{ color: "#d8d3cb" }}>·</span>}{m}
            </span>
          ))}
        </div>

        {/* Signature: the three-stage path */}
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#b0acbf", margin: "0 0 24px" }}>
          The path
        </p>
        <div style={{ position: "relative", margin: "0 0 48px" }}>
          <div style={{ position: "absolute", left: "18px", top: "24px", bottom: "24px", width: "2px", background: "linear-gradient(#4a8b6d, #7B4FA6, #3730a3)" }} />
          {LEVELS.map((lv) => (
            <div key={lv.n} style={{ position: "relative", zIndex: 1, display: "flex", gap: "18px", alignItems: "flex-start", marginBottom: lv.n < 3 ? "28px" : 0 }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "999px", backgroundColor: lv.color, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: 600, flexShrink: 0, border: "3px solid #faf8f5", boxShadow: "0 2px 6px rgba(0,0,0,.08)" }}>
                {lv.n}
              </div>
              <div style={{ paddingTop: "3px" }}>
                <p style={{ fontSize: "15px", fontWeight: 600, margin: "0 0 4px" }}>
                  Level {lv.n} · {lv.name}
                </p>
                <p style={{ fontSize: "13px", color: "#6b6880", margin: 0, lineHeight: 1.65, maxWidth: "480px" }}>
                  {lv.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Why it takes time */}
        <div style={{ borderLeft: "3px solid #3730a3", backgroundColor: "#f5f4fb", borderRadius: "0 12px 12px 0", padding: "18px 22px", margin: "0 0 48px" }}>
          <p style={{ fontSize: "14px", color: "#3a3650", lineHeight: 1.7, margin: 0, fontWeight: 300 }}>
            Lasting change takes about eight weeks of steady practice — like learning to juggle or knit. A few minutes most days beats an hour once a week.
          </p>
        </div>

        {/* Action */}
        {state === "loading" && (
          <div style={{ height: "56px", borderRadius: "999px", backgroundColor: "#f1ede7" }} />
        )}

        {state === "owned" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <p style={{ fontSize: "13px", color: "#4a8b6d", fontWeight: 600, margin: "0 0 4px", letterSpacing: "0.02em" }}>
              ✓ You have full access
            </p>
            {files.map((f) => (
              <a key={f.label} className="mtr-btn" href={f.url} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "white", border: "1px solid #e8e4de", color: "#1e1b2e", padding: "16px 22px", borderRadius: "14px", fontSize: "15px", fontWeight: 600, textDecoration: "none" }}>
                <span>Download {f.label}</span>
                <svg width="18" height="18" fill="none" stroke="#3730a3" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
          </div>
        )}

        {state === "buy" && (
          <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "20px", padding: "32px", textAlign: "center" }}>
            <p style={{ fontSize: "34px", fontWeight: 300, fontFamily: "var(--font-display)", margin: "0 0 2px", color: "#1e1b2e" }}>
              $24 <span style={{ fontSize: "15px", color: "#9591a6", fontWeight: 400 }}>AUD · one-off</span>
            </p>
            <p style={{ fontSize: "13px", color: "#6b6880", margin: "0 0 22px" }}>
              All three levels, yours to keep. Free for Developmental Hub members.
            </p>
            <a className="mtr-btn" href={STRIPE_LINK}
              style={{ display: "inline-block", backgroundColor: "#3730a3", color: "white", padding: "16px 44px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, textDecoration: "none" }}>
              Get the bundle
            </a>
            <p style={{ fontSize: "13px", color: "#9591a6", margin: "18px 0 0" }}>
              Already a member or bought it? <a href="/login?redirect=/move-to-read" style={{ color: "#3730a3", fontWeight: 600 }}>Sign in</a>
            </p>
          </div>
        )}

      </div>
    </main>
  );
}