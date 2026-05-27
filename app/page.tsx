"use client";

import React, { useState, useEffect } from "react";

export default function HomePage() {
  // State variables for form interactions and modals
  const [showCupPopup, setShowCupPopup] = useState(false);
  const [serviceModal, setServiceModal] = useState<{ service: string; price: string } | null>(null);
  const [cupForm, setCupForm] = useState({ first_name: "", email: "" });
  const [cupLoading, setCupLoading] = useState(false);
  const [cupError, setCupError] = useState("");

  // Service modal form state
  const [serviceForm, setServiceForm] = useState({ name: "", email: "", child_age: "", message: "" });
  const [serviceLoading, setServiceLoading] = useState(false);
  const [serviceSuccess, setServiceSuccess] = useState(false);
  const [serviceError, setServiceError] = useState("");

  // Common consistent input styling for forms
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 16px",
    borderRadius: "10px",
    border: "1.5px solid #e8e4de",
    fontSize: "15px",
    color: "#1e1b2e",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    backgroundColor: "#faf8f5"
  };

  // Scroll popup logic to show the Cup Sequence form at 50% scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const seen = localStorage.getItem("cup_popup_seen");
      if (seen === "1") return;

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;

      const scrollDepth = window.scrollY / totalHeight;
      if (scrollDepth >= 0.5) {
        setShowCupPopup(true);
        localStorage.setItem("cup_popup_seen", "1");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Inject TikTok embed script when the component mounts to load the videos automatically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Form handler for the Cup Sequence lead magnet
  async function handleCupSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCupLoading(true);
    setCupError("");
    try {
      const res = await fetch("/api/cup-sequence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cupForm),
      });
      const data = await res.json();
      if (!res.ok) {
        setCupError(data.error ?? "Something went wrong.");
        setCupLoading(false);
        return;
      }
      localStorage.setItem("cup_sequence_unlocked", "1");
      window.location.href = "/cup-sequence";
    } catch (err) {
      setCupError("An unexpected error occurred. Please try again.");
      setCupLoading(false);
    }
  }

  // Form handler for the Service Interest Modal
  async function handleServiceSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!serviceModal) return;
    setServiceLoading(true);
    setServiceError("");
    try {
      const res = await fetch("/api/service-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...serviceForm,
          service_type: serviceModal.service,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setServiceError(data.error ?? "Something went wrong.");
        setServiceLoading(false);
        return;
      }
      setServiceSuccess(true);
      setServiceLoading(false);
      setTimeout(() => {
        setServiceModal(null);
        setServiceSuccess(false);
        setServiceForm({ name: "", email: "", child_age: "", message: "" });
      }, 2000);
    } catch (err) {
      setServiceError("An unexpected error occurred. Please try again.");
      setServiceLoading(false);
    }
  }

  return (
    <div style={{ fontFamily: "DM Sans, sans-serif", color: "#1e1b2e", backgroundColor: "#faf8f5", margin: 0, padding: 0 }}>
      
      {/* 1. Thin top announcement banner */}
      <div style={{ backgroundColor: "#3730a3", color: "#ffffff", padding: "12px 20px", textAlign: "center", fontSize: "14px", fontWeight: "500" }}>
        Free: 12,part Cup Rhythm Activity Series, builds focus, rhythm and school readiness · 
        <a href="/cup-sequence" style={{ color: "#ffffff", textDecoration: "underline", marginLeft: "6px" }}>
          Watch free →
        </a>
      </div>

      {/* 2. Hero section with custom watercolour layouts */}
      <section style={{ backgroundColor: "#ffffff", padding: "80px 20px", borderBottom: "1px solid #e8e4de" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "40px" }}>
          
          {/* Left side content */}
          <div style={{ flex: "1 1 500px" }}>
            <h1 style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "44px", color: "#1e1b2e", lineHeight: "1.2", margin: "0 0 20px 0", fontWeight: "700" }}>
              Your child is not behind. They just need the right activities.
            </h1>
            <p style={{ fontSize: "18px", color: "#6b6880", lineHeight: "1.6", margin: "0 0 32px 0" }}>
              Follow,along videos with Robyn, your child moves, taps and plays alongside her on screen. No appointments. No waitlists. No equipment. Just press play.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              <a href="/pricing" style={{ backgroundColor: "#3730a3", color: "#ffffff", padding: "14px 28px", borderRadius: "10px", textDecoration: "none", fontWeight: "600", fontSize: "16px", display: "inline-block", border: "none", cursor: "pointer" }}>
                Start membership — $39/month
              </a>
              <a href="/videos/free" style={{ backgroundColor: "transparent", color: "#3730a3", padding: "12px 26px", borderRadius: "10px", textDecoration: "none", fontWeight: "600", fontSize: "16px", display: "inline-block", border: "2px solid #3730a3", cursor: "pointer" }}>
                Watch 8 free videos first
              </a>
            </div>
          </div>

          {/* Right side custom image cluster layout — highlighting watercolour illustrations */}
          <div style={{ flex: "1 1 400px", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "380px", position: "relative" }}>
            <div style={{ position: "relative", width: "100%", maxWidth: "420px", height: "340px" }}>
              
              {/* Central watercolour activity image 1 */}
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%) rotate(-4deg)", zIndex: 5, width: "180px", height: "180px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 10px 25px rgba(0,0,0,0.08)", border: "4px solid #ffffff" }}>
                <img 
                  src="https://pndihjsqkwbjewlulotg.supabase.co/storage/v1/object/public/public-assets/colour-sorting-table-activity.png" 
                  alt="Colour sorting activity" 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Scattered watercolour activity image 2 — Top Left */}
              <div style={{ position: "absolute", top: "10px", left: "10px", width: "130px", height: "130px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 6px 16px rgba(0,0,0,0.05)", transform: "rotate(-12deg)" }}>
                <img 
                  src="https://pndihjsqkwbjewlulotg.supabase.co/storage/v1/object/public/public-assets/floor-based-tearing-paper-activity.png" 
                  alt="Floor based paper activity" 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Scattered watercolour activity image 3 — Bottom Right */}
              <div style={{ position: "absolute", bottom: "10px", right: "10px", width: "140px", height: "140px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 6px 16px rgba(0,0,0,0.05)", transform: "rotate(10deg)" }}>
                <img 
                  src="https://pndihjsqkwbjewlulotg.supabase.co/storage/v1/object/public/public-assets/cup-colour-sort-activity.png" 
                  alt="Cup sorting activity" 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. TikTok reels section — Brought to the top so parents immediately see your face and work */}
      <section style={{ backgroundColor: "#faf8f5", padding: "60px 20px", borderBottom: "1px solid #e8e4de" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "32px", margin: "0 0 8px 0", fontWeight: "700" }}>
            See Robyn in action
          </h2>
          <p style={{ fontSize: "16px", color: "#6b6880", margin: "0 0 40px 0" }}>
            Follow @playmoveimprove on TikTok for sensory and physical play strategies
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "center" }}>
            
            {/* TikTok Video 1 */}
            <div style={{ flex: "1 1 300px", maxWidth: "325px", minHeight: "580px" }}>
              <blockquote className="tiktok-embed" data-video-id="7608865997918899476" style={{ maxWidth: "325px", minWidth: "325px", margin: "0 auto" }}>
                <section>
                  <a target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/@playmoveimprove/video/7608865997918899476">Loading Video...</a>
                </section>
              </blockquote>
            </div>

            {/* TikTok Video 2 */}
            <div style={{ flex: "1 1 300px", maxWidth: "325px", minHeight: "580px" }}>
              <blockquote className="tiktok-embed" data-video-id="7329735221685914898" style={{ maxWidth: "325px", minWidth: "325px", margin: "0 auto" }}>
                <section>
                  <a target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/@playmoveimprove/video/7329735221685914898">Loading Video...</a>
                </section>
              </blockquote>
            </div>

            {/* TikTok Video 3 */}
            <div style={{ flex: "1 1 300px", maxWidth: "325px", minHeight: "580px" }}>
              <blockquote className="tiktok-embed" data-video-id="7309319533162990866" style={{ maxWidth: "325px", minWidth: "325px", margin: "0 auto" }}>
                <section>
                  <a target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/@playmoveimprove/video/7309319533162990866">Loading Video...</a>
                </section>
              </blockquote>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Pain points strip */}
      <section style={{ backgroundColor: "#ffffff", padding: "60px 20px", borderBottom: "1px solid #e8e4de" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "32px" }}>
            
            {/* Column 1 */}
            <div style={{ flex: "1 1 300px", backgroundColor: "#faf8f5", padding: "28px", borderRadius: "12px", border: "1px solid #e8e4de" }}>
              <p style={{ fontWeight: "700", fontSize: "16px", color: "#1e1b2e", margin: "0 0 12px 0", fontStyle: "italic" }}>
                My child can't sit still long enough to learn
              </p>
              <p style={{ fontSize: "15px", color: "#6b6880", lineHeight: "1.5", margin: 0 }}>
                Movement IS the learning. Robyn's activities use the body to build the brain.
              </p>
            </div>

            {/* Column 2 */}
            <div style={{ flex: "1 1 300px", backgroundColor: "#faf8f5", padding: "28px", borderRadius: "12px", border: "1px solid #e8e4de" }}>
              <p style={{ fontWeight: "700", fontSize: "16px", color: "#1e1b2e", margin: "0 0 12px 0", fontStyle: "italic" }}>
                They mix up b, d, p and q constantly
              </p>
              <p style={{ fontSize: "15px", color: "#6b6880", lineHeight: "1.5", margin: 0 }}>
                Rhythm and body movement lock in letter recognition better than flashcards ever will.
              </p>
            </div>

            {/* Column 3 */}
            <div style={{ flex: "1 1 300px", backgroundColor: "#faf8f5", padding: "28px", borderRadius: "12px", border: "1px solid #e8e4de" }}>
              <p style={{ fontWeight: "700", fontSize: "16px", color: "#1e1b2e", margin: "0 0 12px 0", fontStyle: "italic" }}>
                Writing is a battle every single day
              </p>
              <p style={{ fontSize: "15px", color: "#6b6880", lineHeight: "1.5", margin: 0 }}>
                Hand warm,ups and pre,writing sequences that actually work — done in minutes.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Cup Sequence lead magnet section */}
      <section style={{ backgroundColor: "#1e1b2e", color: "#ffffff", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "36px", margin: "0 0 16px 0", fontWeight: "700" }}>
              Start here — it's completely free
            </h2>
            <p style={{ fontSize: "17px", color: "#6b6880", maxWidth: "700px", margin: "0 auto", lineHeight: "1.6" }}>
              The Cup Rhythm Activity Series is a free 12,part program. Your child follows along with Robyn using just a cup. Builds rhythm, sequencing and focus.
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "40px", alignItems: "center", justifyContent: "center" }}>
            
            {/* Replaced video player with a uniform image preview configuration */}
            <div style={{ flex: "1 1 450px", maxWidth: "480px", width: "100%" }}>
              <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: "12px", overflow: "hidden", backgroundColor: "#000000", boxShadow: "0 12px 32px rgba(0,0,0,0.2)" }}>
                <img 
                  src="https://pndihjsqkwbjewlulotg.supabase.co/storage/v1/object/public/public-assets/20220203_092213_01.jpg"
                  alt="Robyn demonstrating Cup Rhythm Activity"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>

            {/* Email capture form connected with your Resend integration configuration */}
            <div style={{ flex: "1 1 400px", maxWidth: "450px", backgroundColor: "#ffffff", padding: "32px", borderRadius: "16px", color: "#1e1b2e" }}>
              <form onSubmit={handleCupSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px", color: "#1e1b2e" }}>First Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter your first name"
                    style={inputStyle}
                    value={cupForm.first_name}
                    onChange={(e) => setCupForm({ ...cupForm, first_name: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px", color: "#1e1b2e" }}>Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="Enter your email"
                    style={inputStyle}
                    value={cupForm.email}
                    onChange={(e) => setCupForm({ ...cupForm, email: e.target.value })}
                  />
                </div>

                {cupError && (
                  <p style={{ color: "#b91c1c", fontSize: "14px", margin: "0" }}>{cupError}</p>
                )}

                <button 
                  type="submit" 
                  disabled={cupLoading}
                  style={{ backgroundColor: "#3730a3", color: "#ffffff", padding: "12px 24px", borderRadius: "10px", fontWeight: "600", border: "none", cursor: "pointer", fontSize: "15px", marginTop: "8px", transition: "opacity 0.2s" }}
                >
                  {cupLoading ? "Unlocking access..." : "Watch all 12 videos free"}
                </button>
              </form>

              <div style={{ textAlign: "center", marginTop: "20px", borderTop: "1px solid #e8e4de", paddingTop: "16px" }}>
                <a href="/cup-sequence" style={{ color: "#3730a3", fontSize: "14px", fontWeight: "600", textDecoration: "none" }}>
                  Already have access? Watch now →
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. What's in the membership section */}
      <section style={{ backgroundColor: "#ffffff", padding: "80px 20px", borderBottom: "1px solid #e8e4de", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 5 }}>
          
          <h2 style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "32px", margin: "0 0 32px 0", fontWeight: "700" }}>
            31 videos available now. More added every month.
          </h2>

          {/* Pill badges flowing in a wrap layout */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginBottom: "40px" }}>
            <span style={{ padding: "8px 18px", borderRadius: "50px", fontSize: "14px", fontWeight: "600", color: "#7c3aed", backgroundColor: "#f5f3ff", border: "1px solid rgba(124,58,237,0.15)" }}>Pre,Reading Skills</span>
            <span style={{ padding: "8px 18px", borderRadius: "50px", fontSize: "14px", fontWeight: "600", color: "#1d4ed8", backgroundColor: "#eff6ff", border: "1px solid rgba(29,78,216,0.15)" }}>Pre,Writing Skills</span>
            <span style={{ padding: "8px 18px", borderRadius: "50px", fontSize: "14px", fontWeight: "600", color: "#c2410c", backgroundColor: "#fff7ed", border: "1px solid rgba(194,65,12,0.15)" }}>Gross Motor Skills</span>
            <span style={{ padding: "8px 18px", borderRadius: "50px", fontSize: "14px", fontWeight: "600", color: "#0f766e", backgroundColor: "#f0fdfa", border: "1px solid rgba(15,118,110,0.15)" }}>Fine Motor Skills</span>
            <span style={{ padding: "8px 18px", borderRadius: "50px", fontSize: "14px", fontWeight: "600", color: "#be185d", backgroundColor: "#fdf2f8", border: "1px solid rgba(190,24,93,0.15)" }}>Reading Skills</span>
            <span style={{ padding: "8px 18px", borderRadius: "50px", fontSize: "14px", fontWeight: "600", color: "#b45309", backgroundColor: "#fffbeb", border: "1px solid rgba(180,83,9,0.15)" }}>Rhythm & Coordination</span>
            <span style={{ padding: "8px 18px", borderRadius: "50px", fontSize: "14px", fontWeight: "600", color: "#166534", backgroundColor: "#f0fdf4", border: "1px solid rgba(22,101,52,0.15)" }}>Cup Sequence Program</span>
          </div>

          {/* Amber coming soon banner layout */}
          <div style={{ backgroundColor: "#fffbeb", border: "1px solid #fef3c7", borderRadius: "12px", padding: "16px 24px", display: "inline-block", maxWidth: "720px" }}>
            <p style={{ margin: 0, color: "#b45309", fontSize: "14px", fontWeight: "600", lineHeight: "1.5" }}>
              Sensory, baby & toddler, speech and language coming soon — subscribe now, price stays $39 as library grows
            </p>
          </div>

        </div>

        {/* Scattered background watercolor images requested as layout decorations */}
        <div style={{ position: "absolute", bottom: "-20px", left: "40px", width: "100px", height: "100px", opacity: 0.4, transform: "rotate(-15deg)", pointerEvents: "none" }}>
          <img src="https://pndihjsqkwbjewlulotg.supabase.co/storage/v1/object/public/public-assets/colour-sorting-table-activity.png" alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        <div style={{ position: "absolute", top: "20px", right: "40px", width: "110px", height: "110px", opacity: 0.4, transform: "rotate(20deg)", pointerEvents: "none" }}>
          <img src="https://pndihjsqkwbjewlulotg.supabase.co/storage/v1/object/public/public-assets/floor-based-tearing-paper-activity.png" alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
      </section>

      {/* 7. Pricing section */}
      <section style={{ backgroundColor: "#faf8f5", padding: "80px 20px", borderBottom: "1px solid #e8e4de" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          
          <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "center", alignItems: "stretch" }}>
            
            {/* Card 1: Small Group */}
            <div style={{ flex: "1 1 300px", maxWidth: "350px", border: "1px solid #e8e4de", borderRadius: "16px", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "between", backgroundColor: "#ffffff" }}>
              <div>
                <h3 style={{ fontSize: "20px", margin: "0 0 8px 0", fontWeight: "700" }}>Small Group Coaching</h3>
                <p style={{ fontSize: "14px", color: "#6b6880", margin: "0 0 24px 0" }}>Tailored peer groups for interactive foundation building.</p>
                <div style={{ fontSize: "36px", fontWeight: "700", color: "#1e1b2e", margin: "0 0 24px 0" }}>
                  $45<span style={{ fontSize: "14px", fontWeight: "normal", color: "#6b6880" }}> / session</span>
                </div>
              </div>
              <button 
                onClick={() => setServiceModal({ service: "Small Group Coaching", price: "$45 / session" })}
                style={{ width: "100%", padding: "12px", border: "1.5px solid #3730a3", borderRadius: "10px", backgroundColor: "transparent", color: "#3730a3", fontWeight: "600", cursor: "pointer", fontSize: "15px", marginTop: "auto" }}
              >
                Register Interest
              </button>
            </div>

            {/* Card 2: Main Subscription (Purple Primary Card) */}
            <div style={{ flex: "1 1 300px", maxWidth: "360px", border: "2px solid #3730a3", borderRadius: "16px", padding: "36px 32px", display: "flex", flexDirection: "column", backgroundColor: "#faf8f5", boxShadow: "0 10px 25px rgba(55,48,163,0.08)", position: "relative" }}>
              <div style={{ position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)", backgroundColor: "#3730a3", color: "#ffffff", padding: "4px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Most Popular
              </div>
              <div>
                <h3 style={{ fontSize: "22px", margin: "0 0 8px 0", fontWeight: "700", color: "#3730a3" }}>Video Library Membership</h3>
                <p style={{ fontSize: "14px", color: "#6b6880", margin: "0 0 24px 0" }}>Complete instant access to all developmental follow,along programs.</p>
                <div style={{ fontSize: "42px", fontWeight: "700", color: "#1e1b2e", margin: "0 0 24px 0" }}>
                  $39<span style={{ fontSize: "14px", fontWeight: "normal", color: "#6b6880" }}> / month</span>
                </div>
              </div>
              <a 
                href="/pricing"
                style={{ width: "100%", padding: "14px", border: "none", borderRadius: "10px", backgroundColor: "#3730a3", color: "#ffffff", fontWeight: "600", cursor: "pointer", fontSize: "15px", textDecoration: "none", textAlign: "center", display: "block", boxSizing: "border-box", marginTop: "auto" }}
              >
                Get Instant Access
              </a>
            </div>

            {/* Card 3: 1:1 Clinical Consults */}
            <div style={{ flex: "1 1 300px", maxWidth: "350px", border: "1px solid #e8e4de", borderRadius: "16px", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "between", backgroundColor: "#ffffff" }}>
              <div>
                <h3 style={{ fontSize: "20px", margin: "0 0 8px 0", fontWeight: "700" }}>1:1 Clinical Assessment</h3>
                <p style={{ fontSize: "14px", color: "#6b6880", margin: "0 0 24px 0" }}>Individual targeted consultation and specific milestone roadmap.</p>
                <div style={{ fontSize: "36px", fontWeight: "700", color: "#1e1b2e", margin: "0 0 24px 0" }}>
                  $129<span style={{ fontSize: "14px", fontWeight: "normal", color: "#6b6880" }}> / session</span>
                </div>
              </div>
              <button 
                onClick={() => setServiceModal({ service: "1:1 Clinical Consultation", price: "$129 / session" })}
                style={{ width: "100%", padding: "12px", border: "1.5px solid #3730a3", borderRadius: "10px", backgroundColor: "transparent", color: "#3730a3", fontWeight: "600", cursor: "pointer", fontSize: "15px", marginTop: "auto" }}
              >
                Register Interest
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 8. Final Call to action */}
      <section style={{ backgroundColor: "#1e1b2e", color: "#ffffff", padding: "80px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "36px", margin: "0 0 32px 0", fontWeight: "700" }}>
            Still not sure? Start with the free videos.
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
            <a href="/videos/free" style={{ backgroundColor: "#ffffff", color: "#1e1b2e", padding: "14px 28px", borderRadius: "10px", textDecoration: "none", fontWeight: "600", fontSize: "16px", display: "inline-block" }}>
              Watch 8 free videos
            </a>
            <a href="/pricing" style={{ backgroundColor: "#3730a3", color: "#ffffff", padding: "14px 28px", borderRadius: "10px", textDecoration: "none", fontWeight: "600", fontSize: "16px", display: "inline-block" }}>
              Start membership
            </a>
          </div>
        </div>
      </section>


      {/* --- SCROLL LEAD MAGNET POPUP MODAL --- */}
      {showCupPopup && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(30,27,46,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "20px", boxSizing: "border-box" }}>
          <div style={{ backgroundColor: "#ffffff", maxWidth: "460px", width: "100%", borderRadius: "16px", padding: "32px", position: "relative", boxShadow: "0 20px 50px rgba(0,0,0,0.15)" }}>
            
            <button 
              onClick={() => setShowCupPopup(false)}
              style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#6b6880" }}
            >
              ✕
            </button>

            <h3 style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "24px", margin: "0 0 12px 0", color: "#1e1b2e", fontWeight: "700" }}>
              Get the Free Cup Rhythm Series
            </h3>
            <p style={{ fontSize: "15px", color: "#6b6880", lineHeight: "1.5", margin: "0 0 24px 0" }}>
              Help your child build focus, sequencing and school readiness with Robyn's 12,part follow,along sequence.
            </p>

            <form onSubmit={handleCupSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px", color: "#1e1b2e" }}>First Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter your first name"
                  style={inputStyle}
                  value={cupForm.first_name}
                  onChange={(e) => setCupForm({ ...cupForm, first_name: e.target.value })}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px", color: "#1e1b2e" }}>Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="Enter your email"
                  style={inputStyle}
                  value={cupForm.email}
                  onChange={(e) => setCupForm({ ...cupForm, email: e.target.value })}
                />
              </div>

              {cupError && (
                <p style={{ color: "#b91c1c", fontSize: "14px", margin: "0" }}>{cupError}</p>
              )}

              <button 
                type="submit" 
                disabled={cupLoading}
                style={{ backgroundColor: "#3730a3", color: "#ffffff", padding: "12px 24px", borderRadius: "10px", fontWeight: "600", border: "none", cursor: "pointer", fontSize: "15px", marginTop: "8px" }}
              >
                {cupLoading ? "Unlocking..." : "Watch all 12 videos free"}
              </button>
            </form>
          </div>
        </div>
      )}


      {/* --- SERVICE INTEREST MODAL --- */}
      {serviceModal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(30,27,46,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 110, padding: "20px", boxSizing: "border-box" }}>
          <div style={{ backgroundColor: "#ffffff", maxWidth: "500px", width: "100%", borderRadius: "16px", padding: "32px", position: "relative", boxShadow: "0 20px 50px rgba(0,0,0,0.15)" }}>
            
            <button 
              onClick={() => setServiceModal(null)}
              style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#6b6880" }}
            >
              ✕
            </button>

            <h3 style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "24px", margin: "0 0 4px 0", color: "#1e1b2e", fontWeight: "700" }}>
              Register Interest
            </h3>
            <p style={{ fontSize: "15px", color: "#3730a3", fontWeight: "600", margin: "0 0 20px 0" }}>
              {serviceModal.service} ({serviceModal.price})
            </p>

            {serviceSuccess ? (
              <div style={{ padding: "20px", backgroundColor: "#f0fdf4", color: "#166534", borderRadius: "10px", textAlign: "center", fontWeight: "600" }}>
                Thank you! Your interest has been submitted successfully.
              </div>
            ) : (
              <form onSubmit={handleServiceSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px", color: "#1e1b2e" }}>Your Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter your full name"
                    style={inputStyle}
                    value={serviceForm.name}
                    onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px", color: "#1e1b2e" }}>Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="Enter your email"
                    style={inputStyle}
                    value={serviceForm.email}
                    onChange={(e) => setServiceForm({ ...serviceForm, email: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px", color: "#1e1b2e" }}>Child's Age</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 5 years old"
                    style={inputStyle}
                    value={serviceForm.child_age}
                    onChange={(e) => setServiceForm({ ...serviceForm, child_age: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px", color: "#1e1b2e" }}>Message / Specific Concerns</label>
                  <textarea 
                    rows={4}
                    placeholder="Tell us a little bit about what your child is experiencing..."
                    style={{ ...inputStyle, height: "auto", resize: "none" }}
                    value={serviceForm.message}
                    onChange={(e) => setServiceForm({ ...serviceForm, message: e.target.value })}
                  />
                </div>

                {serviceError && (
                  <p style={{ color: "#b91c1c", fontSize: "14px", margin: "0" }}>{serviceError}</p>
                )}

                <button 
                  type="submit" 
                  disabled={serviceLoading}
                  style={{ backgroundColor: "#3730a3", color: "#ffffff", padding: "12px 24px", borderRadius: "10px", fontWeight: "600", border: "none", cursor: "pointer", fontSize: "15px", marginTop: "8px" }}
                >
                  {serviceLoading ? "Submitting..." : "Submit Registration"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}