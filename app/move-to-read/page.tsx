"use client";
import { useEffect, useState } from "react";

const STRIPE_LINK = "https://buy.stripe.com/5kQ4gs7DI7XqeMp5yy9fW0a";

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
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "64px 24px 80px" }}>
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3730a3", marginBottom: "12px" }}>
          Move to Read
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 300, margin: "0 0 16px", lineHeight: 1.15 }}>
          Reading starts on the floor, not at a desk
        </h1>
        <p style={{ fontSize: "17px", color: "#6b6880", lineHeight: 1.7, fontWeight: 300, margin: "0 0 32px" }}>
          111 play-based movement activities across three levels — the professional toolkit used to build the
          foundations for reading and writing, adapted for home in minutes a day.
        </p>

        <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "16px", padding: "28px", marginBottom: "28px" }}>
          {[
            { lvl: "Level 1 — Foundations", desc: "Crossing the midline, core gross-motor and visual-tracking activities." },
            { lvl: "Level 2 — Building", desc: "Hand-eye coordination, spatial awareness and body-awareness games." },
            { lvl: "Level 3 — Linking", desc: "Phonological awareness and visual discrimination tied to movement." },
          ].map((r) => (
            <div key={r.lvl} style={{ padding: "12px 0", borderBottom: "1px solid #f1ede7" }}>
              <p style={{ fontSize: "15px", fontWeight: 600, margin: "0 0 4px" }}>{r.lvl}</p>
              <p style={{ fontSize: "13px", color: "#6b6880", margin: 0, lineHeight: 1.6 }}>{r.desc}</p>
            </div>
          ))}
          <p style={{ fontSize: "13px", color: "#4a4660", lineHeight: 1.7, margin: "16px 0 0" }}>
            Lasting change takes about eight weeks of consistent practice — like learning to juggle or knit.
            These decks give you a little to do each day so it adds up.
          </p>
        </div>

        {state === "loading" && <p style={{ color: "#6b6880" }}>Loading…</p>}

        {state === "owned" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <p style={{ fontSize: "14px", color: "#3730a3", fontWeight: 600, margin: 0 }}>You have access — download your decks:</p>
            {files.map((f) => (
              <a key={f.label} href={f.url} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", backgroundColor: "#3730a3", color: "white", padding: "14px 24px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
                Download {f.label}
              </a>
            ))}
          </div>
        )}

        {state === "buy" && (
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "28px", fontWeight: 300, margin: "0 0 4px" }}>$24<span style={{ fontSize: "15px", color: "#6b6880" }}> AUD one-off</span></p>
            <p style={{ fontSize: "13px", color: "#6b6880", margin: "0 0 20px" }}>Free for Developmental Hub members.</p>
            <a href={STRIPE_LINK}
              style={{ display: "inline-block", backgroundColor: "#3730a3", color: "white", padding: "16px 40px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, textDecoration: "none" }}>
              Get the Move to Read bundle
            </a>
          </div>
        )}
      </div>
    </main>
  );
}