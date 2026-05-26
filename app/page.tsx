"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const ROBYN_PHOTO = "https://pndihjsqkwbjewlulotg.supabase.co/storage/v1/object/public/public-assets/robyn-hero.png";

const ACTIVITY_IMAGES = [
  { url: "https://pndihjsqkwbjewlulotg.supabase.co/storage/v1/object/public/public-assets/colour-sorting-table-activity.png", alt: "Colour sorting table activity" },
  { url: "https://pndihjsqkwbjewlulotg.supabase.co/storage/v1/object/public/public-assets/cup-colour-sort-activity.png", alt: "Cup colour sorting activity" },
  { url: "https://pndihjsqkwbjewlulotg.supabase.co/storage/v1/object/public/public-assets/floor-based-tearing-paper-activity.png", alt: "Floor based tearing paper activity" },
  { url: "https://pndihjsqkwbjewlulotg.supabase.co/storage/v1/object/public/public-assets/sensory-tracing-activity-2.png", alt: "Sensory tracing activity" },
  { url: "https://pndihjsqkwbjewlulotg.supabase.co/storage/v1/object/public/public-assets/size-sorting-activity.png", alt: "Size sorting activity" },
];

const CATEGORIES = [
  { label: "Follow Along Activities", description: "Copy Robyn's movements — activities your child does alongside the video.", color: "#7c3aed", bg: "#f5f3ff", border: "#e0e7ff" },
  { label: "Baby & Tummy Time",       description: "Floor play, tummy time, and the foundations of movement from birth.", color: "#0f766e", bg: "#f0fdfa", border: "#99f6e4" },
  { label: "Movement & Balance",      description: "Coordination, core strength, and building physically confident children.", color: "#c2410c", bg: "#fff7ed", border: "#fed7aa" },
  { label: "Hands & Fine Motor",      description: "Hand strength, pencil grip, cutting, threading and independence skills.", color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" },
  { label: "Sensory Play",            description: "Nature play, messy play, and understanding your child's sensory needs.", color: "#b45309", bg: "#fffbeb", border: "#fde68a" },
  { label: "Speech & Language",       description: "Early language, babble, books, songs, and communication development.", color: "#166534", bg: "#f0fdf4", border: "#bbf7d0" },
  { label: "School Readiness",        description: "The physical and neurological foundations behind learning to read and write.", color: "#be185d", bg: "#fdf2f8", border: "#f9a8d4" },
];

function EbookPopup({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ first_name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/email-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, source: "ebook_popup" }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error ?? "Something went wrong."); setLoading(false); return; }
    setSuccess(true);
    setLoading(false);
    setTimeout(onClose, 3000);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 16px", borderRadius: "10px",
    border: "1.5px solid #e8e4de", fontSize: "15px", color: "#1e1b2e",
    outline: "none", boxSizing: "border-box", fontFamily: "inherit", backgroundColor: "#faf8f5",
  };

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ backgroundColor: "white", borderRadius: "20px", padding: "40px", maxWidth: "480px", width: "100%", position: "relative", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
        <button onClick={onClose} style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", cursor: "pointer", color: "#6b6880", fontSize: "20px", lineHeight: 1 }}>×</button>

        {success ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "52px", height: "52px", backgroundColor: "#f0fdf4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <svg width="22" height="22" fill="none" stroke="#166534" strokeWidth="2"><path d="M4 12l6 6L20 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 8px" }}>Check your inbox!</h2>
            <p style={{ fontSize: "14px", color: "#6b6880", margin: 0 }}>Your free guide is on its way.</p>
          </div>
        ) : (
          <>
            <div style={{ backgroundColor: "#f5f3ff", borderRadius: "12px", padding: "16px", marginBottom: "24px", textAlign: "center" }}>
              <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#3730a3", margin: "0 0 4px" }}>Free guide</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 400, color: "#1e1b2e", margin: 0 }}>Regulation Before Reading</p>
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 8px", lineHeight: 1.3 }}>
              Get your free guide
            </h2>
            <p style={{ fontSize: "14px", color: "#6b6880", lineHeight: 1.6, margin: "0 0 24px" }}>
              Why regulation — not phonics — is the foundation of reading readiness. Practical strategies you can use at home today.
            </p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input name="first_name" value={form.first_name} onChange={(e) => setForm(p => ({ ...p, first_name: e.target.value }))} placeholder="First name" style={inputStyle} />
              <input name="email" type="email" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} required placeholder="Email address" style={inputStyle} />
              {error && <p style={{ fontSize: "13px", color: "#b91c1c", margin: 0 }}>{error}</p>}
              <button type="submit" disabled={loading} style={{ backgroundColor: "#3730a3", color: "white", border: "none", borderRadius: "999px", padding: "14px", fontSize: "15px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, fontFamily: "inherit" }}>
                {loading ? "Sending..." : "Send me the free guide"}
              </button>
              <p style={{ fontSize: "12px", color: "#9ca3af", textAlign: "center", margin: 0 }}>No spam. Unsubscribe anytime.</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function ServiceInterestForm({ service, price, onClose }: { service: string; price: string; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", child_age: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/service-interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, service_type: service }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error ?? "Something went wrong."); setLoading(false); return; }
    setSuccess(true);
    setLoading(false);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 16px", borderRadius: "10px",
    border: "1.5px solid #e8e4de", fontSize: "15px", color: "#1e1b2e",
    outline: "none", boxSizing: "border-box", fontFamily: "inherit", backgroundColor: "#faf8f5",
  };

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ backgroundColor: "white", borderRadius: "20px", padding: "40px", maxWidth: "480px", width: "100%", position: "relative", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
        <button onClick={onClose} style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", cursor: "pointer", color: "#6b6880", fontSize: "20px" }}>×</button>

        {success ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "52px", height: "52px", backgroundColor: "#f0fdf4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <svg width="22" height="22" fill="none" stroke="#166534" strokeWidth="2"><path d="M4 12l6 6L20 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 8px" }}>We'll be in touch!</h2>
            <p style={{ fontSize: "14px", color: "#6b6880", margin: "0 0 20px" }}>Robyn will contact you to arrange your {service.toLowerCase()} session.</p>
            <button onClick={onClose} style={{ backgroundColor: "#3730a3", color: "white", border: "none", borderRadius: "999px", padding: "10px 24px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Close</button>
          </div>
        ) : (
          <>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 4px" }}>Register interest</h2>
            <p style={{ fontSize: "14px", color: "#6b6880", margin: "0 0 24px" }}>{service} · {price}</p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} required placeholder="Your name" style={inputStyle} />
              <input type="email" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} required placeholder="Email address" style={inputStyle} />
              <select value={form.child_age} onChange={(e) => setForm(p => ({ ...p, child_age: e.target.value }))} style={inputStyle}>
                <option value="">Child's age group (optional)</option>
                <option>0–2 years</option><option>3–5 years</option><option>6–8 years</option>
              </select>
              <textarea value={form.message} onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))} rows={3} placeholder="What would you like help with?" style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} />
              {error && <p style={{ fontSize: "13px", color: "#b91c1c", margin: 0 }}>{error}</p>}
              <button type="submit" disabled={loading} style={{ backgroundColor: "#3730a3", color: "white", border: "none", borderRadius: "999px", padding: "14px", fontSize: "15px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, fontFamily: "inherit" }}>
                {loading ? "Submitting..." : "Register my interest"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [showPopup, setShowPopup] = useState(false);
  const [serviceModal, setServiceModal] = useState<{ service: string; price: string } | null>(null);

  useEffect(() => {
    const seen = localStorage.getItem("ebook_popup_seen");
    if (!seen) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        localStorage.setItem("ebook_popup_seen", "1");
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e" }}>

      {showPopup && <EbookPopup onClose={() => setShowPopup(false)} />}
      {serviceModal && <ServiceInterestForm service={serviceModal.service} price={serviceModal.price} onClose={() => setServiceModal(null)} />}

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "white", borderBottom: "1px solid #e8e4de" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "64px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "48px", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#f5f3ff", border: "1px solid #e0e7ff", borderRadius: "999px", padding: "6px 14px", marginBottom: "24px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#3730a3", flexShrink: 0 }} />
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#3730a3", margin: 0, letterSpacing: "0.06em" }}>From the team at Play Move Improve</p>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 300, color: "#1e1b2e", lineHeight: 1.15, margin: "0 0 20px" }}>
              Expert support for your child's development — at home, on your schedule
            </h1>
            <p style={{ fontSize: "17px", color: "#6b6880", lineHeight: 1.7, fontWeight: 300, margin: "0 0 16px" }}>
              Follow-along activity videos designed to meet your child where they are developmentally — practical, expert-led, and built around the reality of busy family life.
            </p>
            <p style={{ fontSize: "14px", color: "#6b6880", lineHeight: 1.6, margin: "0 0 32px", fontStyle: "italic", borderLeft: "3px solid #e0e7ff", paddingLeft: "16px" }}>
              "I made these videos for busy families who want practical, expert support that meets their child exactly where they are — without the waitlists, the appointments, or the travel." — Robyn Papworth, Founder
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "420px" }}>
              <Link href="/pricing" style={{ backgroundColor: "#3730a3", color: "white", padding: "16px 28px", borderRadius: "999px", fontSize: "16px", fontWeight: 600, textDecoration: "none", display: "block", textAlign: "center" }}>
                Start your membership — $39/month
              </Link>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
                <Link href="/videos/free" style={{ fontSize: "14px", color: "#3730a3", fontWeight: 500, textDecoration: "none" }}>Watch free videos</Link>
                <span style={{ color: "#e8e4de" }}>·</span>
                <button onClick={() => setShowPopup(true)} style={{ fontSize: "14px", color: "#6b6880", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0 }}>Get free guide</button>
              </div>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ borderRadius: "20px", overflow: "hidden", aspectRatio: "4/3" }}>
              <img src={ROBYN_PHOTO} alt="Robyn Papworth" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
            </div>
            <div style={{ position: "absolute", bottom: "16px", left: "16px", right: "16px", backgroundColor: "white", borderRadius: "12px", padding: "12px 16px", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#1e1b2e", margin: "0 0 2px" }}>Robyn Papworth</p>
              <p style={{ fontSize: "12px", color: "#6b6880", margin: 0 }}>Founder of Play Move Improve · Masters-qualified Developmental Educator & Exercise Physiologist</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What you get ─────────────────────────────────────────────── */}
      <section style={{ borderBottom: "1px solid #e8e4de" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "64px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "32px" }}>
          {[
            { icon: "▶", title: "Follow-along videos", body: "Children copy Robyn's movements directly from the screen — no equipment, no prep, just play." },
            { icon: "📅", title: "Monthly live Q&A", body: "Ask Robyn your questions live each month. Replays included for every subscriber." },
            { icon: "📄", title: "Activity sheets", body: "Downloadable printables to extend the learning between videos." },
            { icon: "🔓", title: "Cancel anytime", body: "No lock-in, no cancellation fees. Your subscription, your terms." },
          ].map((item) => (
            <div key={item.title} style={{ textAlign: "center", padding: "8px" }}>
              <div style={{ fontSize: "28px", marginBottom: "12px" }}>{item.icon}</div>
              <p style={{ fontSize: "15px", fontWeight: 600, color: "#1e1b2e", margin: "0 0 8px" }}>{item.title}</p>
              <p style={{ fontSize: "14px", color: "#6b6880", margin: 0, lineHeight: 1.6 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Activity images ───────────────────────────────────────────── */}
      <section style={{ padding: "48px 0", overflow: "hidden", borderBottom: "1px solid #e8e4de" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b6880", marginBottom: "20px", textAlign: "center" }}>
            Activities you'll find inside
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px" }}>
            {ACTIVITY_IMAGES.map((img) => (
              <div key={img.url} style={{ borderRadius: "12px", overflow: "hidden", aspectRatio: "1/1" }}>
                <img src={img.url} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Three options ─────────────────────────────────────────────── */}
      <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b6880", marginBottom: "12px" }}>
            How we can help
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 300, color: "#1e1b2e", margin: "0 0 16px" }}>
            Choose the support that suits your family
          </h2>
          <p style={{ fontSize: "16px", color: "#6b6880", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7, fontWeight: 300 }}>
            Start with our video membership and add live support whenever you need it.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {/* Subscription — primary */}
          <div style={{ position: "relative", backgroundColor: "#3730a3", borderRadius: "20px", padding: "36px 32px", display: "flex", flexDirection: "column" }}>
            <span style={{ position: "absolute", top: "-12px", left: "24px", backgroundColor: "white", color: "#3730a3", fontSize: "11px", fontWeight: 700, padding: "4px 14px", borderRadius: "999px" }}>
              Most popular
            </span>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#a5b4fc", margin: "0 0 8px" }}>Video membership</p>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", margin: "0 0 16px" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "48px", fontWeight: 300, color: "white", lineHeight: 1 }}>$39</span>
              <span style={{ fontSize: "14px", color: "#c7d2fe", marginBottom: "8px" }}>/month</span>
            </div>
            <p style={{ fontSize: "14px", color: "#c7d2fe", lineHeight: 1.7, margin: "0 0 24px", flex: 1 }}>
              Unlimited access to the full video library, monthly live Q&A with Robyn, and downloadable activity sheets.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "28px" }}>
              {["Full video library", "Monthly live Q&A", "Activity sheets & printables", "Cancel anytime"].map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "16px", height: "16px", backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="8" height="8" fill="none" stroke="white" strokeWidth="2.5"><path d="M1 4l2 2L7 1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span style={{ fontSize: "13px", color: "#e0e7ff" }}>{f}</span>
                </div>
              ))}
            </div>
            <Link href="/pricing" style={{ display: "block", backgroundColor: "white", color: "#3730a3", padding: "14px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, textDecoration: "none", textAlign: "center" }}>
              Start membership
            </Link>
          </div>

          {/* Small group */}
          <div style={{ backgroundColor: "white", border: "1.5px solid #e8e4de", borderRadius: "20px", padding: "36px 32px", display: "flex", flexDirection: "column" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#0f766e", margin: "0 0 8px" }}>Small group session</p>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", margin: "0 0 16px" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "48px", fontWeight: 300, color: "#1e1b2e", lineHeight: 1 }}>$45</span>
              <span style={{ fontSize: "14px", color: "#6b6880", marginBottom: "8px" }}>/session</span>
            </div>
            <p style={{ fontSize: "14px", color: "#6b6880", lineHeight: 1.7, margin: "0 0 24px", flex: 1 }}>
              Join a live group session with Robyn and up to 5 other families. 45 minutes of guided, interactive support on a specific topic.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "28px" }}>
              {["45 minute live session", "Up to 6 families", "Topic-focused", "Via Zoom"].map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "16px", height: "16px", backgroundColor: "#f0fdfa", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="8" height="8" fill="none" stroke="#0f766e" strokeWidth="2.5"><path d="M1 4l2 2L7 1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span style={{ fontSize: "13px", color: "#6b6880" }}>{f}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setServiceModal({ service: "Small group session", price: "$45 per family" })}
              style={{ display: "block", width: "100%", backgroundColor: "#f0fdfa", color: "#0f766e", border: "1.5px solid #99f6e4", padding: "14px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
            >
              Register interest
            </button>
          </div>

          {/* 1:1 */}
          <div style={{ backgroundColor: "white", border: "1.5px solid #e8e4de", borderRadius: "20px", padding: "36px 32px", display: "flex", flexDirection: "column" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#c2410c", margin: "0 0 8px" }}>1:1 telehealth session</p>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", margin: "0 0 16px" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "48px", fontWeight: 300, color: "#1e1b2e", lineHeight: 1 }}>$129</span>
              <span style={{ fontSize: "14px", color: "#6b6880", marginBottom: "8px" }}>/session</span>
            </div>
            <p style={{ fontSize: "14px", color: "#6b6880", lineHeight: 1.7, margin: "0 0 24px", flex: 1 }}>
              A private 45-minute session with Robyn focused entirely on your child's individual needs. Personal, specific, and actionable.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "28px" }}>
              {["45 minute private session", "Just you and Robyn", "Tailored to your child", "Via Zoom"].map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "16px", height: "16px", backgroundColor: "#fff7ed", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="8" height="8" fill="none" stroke="#c2410c" strokeWidth="2.5"><path d="M1 4l2 2L7 1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span style={{ fontSize: "13px", color: "#6b6880" }}>{f}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setServiceModal({ service: "1:1 telehealth session", price: "$129 per session" })}
              style={{ display: "block", width: "100%", backgroundColor: "#fff7ed", color: "#c2410c", border: "1.5px solid #fed7aa", padding: "14px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
            >
              Register interest
            </button>
          </div>
        </div>
      </section>

      {/* ── Content categories ───────────────────────────────────────── */}
      <section style={{ backgroundColor: "white", borderTop: "1px solid #e8e4de", borderBottom: "1px solid #e8e4de" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b6880", marginBottom: "12px" }}>What's inside</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 300, color: "#1e1b2e", margin: "0 0 16px" }}>
              Seven categories covering ages 0–8
            </h2>
            <p style={{ fontSize: "16px", color: "#6b6880", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7, fontWeight: 300 }}>
              Every video is designed by Robyn based on her clinical expertise — practical, evidence-informed, and made for real family life.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
            {CATEGORIES.map((cat) => (
              <div key={cat.label} style={{ backgroundColor: cat.bg, border: `1.5px solid ${cat.border}`, borderRadius: "16px", padding: "28px" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 400, color: cat.color, margin: "0 0 10px" }}>{cat.label}</h3>
                <p style={{ fontSize: "14px", color: "#4a4660", lineHeight: 1.6, margin: 0 }}>{cat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Activity images strip 2 ───────────────────────────────────── */}
      <section style={{ padding: "48px 24px", borderBottom: "1px solid #e8e4de" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", alignItems: "center" }}>
          <div style={{ gridColumn: "span 2" }}>
            <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b6880", marginBottom: "12px" }}>
              Real activities, real results
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 300, color: "#1e1b2e", margin: "0 0 12px", lineHeight: 1.3 }}>
              Simple activities that make a real difference
            </h2>
            <p style={{ fontSize: "15px", color: "#6b6880", lineHeight: 1.7, margin: "0 0 24px" }}>
              No special equipment. No complicated setups. Just purposeful play with things you already have at home.
            </p>
            <Link href="/videos/free" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: 600, color: "#3730a3", textDecoration: "none" }}>
              Watch free videos →
            </Link>
          </div>
          {ACTIVITY_IMAGES.slice(0, 3).map((img) => (
            <div key={img.url} style={{ borderRadius: "12px", overflow: "hidden", aspectRatio: "1/1" }}>
              <img src={img.url} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Request content banner ────────────────────────────────────── */}
      <section style={{ backgroundColor: "white", borderBottom: "1px solid #e8e4de" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "64px 24px", textAlign: "center" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3730a3", marginBottom: "12px" }}>
            Shape what we build next
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 300, color: "#1e1b2e", margin: "0 0 16px", lineHeight: 1.3 }}>
            Tell us what your family needs
          </h2>
          <p style={{ fontSize: "16px", color: "#6b6880", lineHeight: 1.7, fontWeight: 300, margin: "0 0 32px" }}>
            We use your responses to decide which videos to make next, which topics to cover in our monthly Q&A, and when to run live sessions. Takes 2 minutes. No payment required.
          </p>
          <Link href="/register-interest" style={{ backgroundColor: "#3730a3", color: "white", padding: "14px 32px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
            Tell us what your child needs
          </Link>
        </div>
      </section>

      {/* ── Pricing CTA ──────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#1e1b2e", padding: "80px 24px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#a5b4fc", marginBottom: "16px" }}>Simple pricing</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 300, color: "white", margin: "0 0 16px", lineHeight: 1.2 }}>
            Everything for $39 a month
          </h2>
          <p style={{ fontSize: "16px", color: "#c7d2fe", lineHeight: 1.8, fontWeight: 300, margin: "0 0 36px" }}>
            Unlimited videos, monthly live Q&A, and downloadable activity sheets. Cancel anytime.
          </p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            <Link href="/pricing" style={{ backgroundColor: "white", color: "#1e1b2e", padding: "16px 40px", borderRadius: "999px", fontSize: "16px", fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
              See what's included
            </Link>
            <Link href="/videos/free" style={{ fontSize: "14px", color: "#a5b4fc", textDecoration: "none" }}>
              Watch free videos first →
            </Link>
          </div>
        </div>
      </section>

      {/* ── For practitioners ────────────────────────────────────────── */}
      <section style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 24px", textAlign: "center" }}>
        <p style={{ fontSize: "13px", color: "#6b6880", marginBottom: "8px" }}>Are you a developmental specialist, OT, physio, or educator?</p>
        <Link href="/practitioners" style={{ fontSize: "15px", fontWeight: 500, color: "#3730a3", textDecoration: "none" }}>
          Find out how to work with Developmental Hub →
        </Link>
      </section>

    </main>
  );
}