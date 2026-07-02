"use client";

import React from "react";
import Script from "next/script";

// ── CONFIGURATION ─────────────────────────────────────────────────
const SB_URL = "https://vfflpjpvbazvzxbuxwme.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmZmxwanB2YmF6dnp4YnV4d21lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NTAxODIsImV4cCI6MjA5NTIyNjE4Mn0.x_U8pHlAcdgnbsMIYV8eigPLtiBp2rYAx6ljt4pIkkw";
const LEAD_TABLE = "email_signups";
const GUIDE_URL = "https://vfflpjpvbazvzxbuxwme.supabase.co/storage/v1/object/public/resources/reflex-ebook.pdf";

const HUB_ASSETS = "https://pndihjsqkwbjewlulotg.supabase.co/storage/v1/object/public/public-assets/";
const EDU_ASSETS = "https://vfflpjpvbazvzxbuxwme.supabase.co/storage/v1/object/public/website-images/";

// ── CSS STYLES ────────────────────────────────────────────────────
const css = `
  .pmi-hub {
    --purple: #6B4E9E;
    --purple-deep: #3D2C5F;
    --purple-soft: #EFE9F6;
    --accent: #E89A6C;
    --accent-deep: #C06B3A;
    --ink: #2A2435;
    --body: #4A4458;
    --muted: #6E6878;
    --line: #E7E0EE;
    --radius: 20px;
    --shadow: 0 18px 40px -22px rgba(61,44,95,.45);
    font-family: 'DM Sans', sans-serif;
    color: var(--body);
    line-height: 1.7;
    font-size: 1.06rem;
    background-color: #faf8f5;
  }
  .pmi-hub * { box-sizing: border-box; }
  .pmi-hub h1, .pmi-hub h2, .pmi-hub h3 {
    font-family: 'Fraunces', Georgia, serif;
    color: var(--purple-deep);
    line-height: 1.2;
    margin: 0;
  }
  .pmi-container { max-width: 1100px; margin: 0 auto; padding: 40px 20px; }
  .pmi-banner {
    background-color: #3730a3;
    color: #ffffff;
    padding: 12px 20px;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
  }
  .pmi-banner a { color: #ffffff; text-decoration: underline; margin-left: 6px; }
  
  .pmi-hero {
    background: #ffffff;
    padding: 80px 20px;
    border-bottom: 1px solid #e8e4de;
  }
  .pmi-hero-grid {
    display: grid;
    grid-template-columns: 1.1fr .9fr;
    gap: 40px;
    align-items: center;
  }
  .pmi-hero h1 { font-size: 44px; margin-bottom: 20px; font-weight: 700; }
  .pmi-hero p { font-size: 18px; color: #6b6880; margin-bottom: 32px; }
  
  .pmi-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 14px 28px;
    border-radius: 10px;
    background: var(--purple);
    color: #fff !important;
    font-weight: 600;
    font-size: 16px;
    text-decoration: none;
    border: 0;
    cursor: pointer;
    transition: background .15s ease;
  }
  .pmi-btn:hover { background: #5d4189; }
  .pmi-btn-accent { background: var(--accent); }
  .pmi-btn-accent:hover { background: var(--accent-deep); }
  .pmi-btn-ghost { background: transparent; color: var(--purple-deep) !important; border: 2px solid var(--line); }
  
  .pmi-quiz-bar {
    background-color: #f5f3ff;
    border-bottom: 1px solid #e0e7ff;
    padding: 20px 24px;
  }
  .pmi-quiz-flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }
  .pmi-quiz-info { display: flex; align-items: center; gap: 14px; }
  .pmi-quiz-icon {
    width: 40px;
    height: 40px;
    background-color: #eef2ff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .pmi-checklist-box {
    background: #ffffff;
    border: 1px solid var(--line);
    border-radius: var(--radius);
    padding: 30px;
    margin: 20px 0 40px;
    box-shadow: var(--shadow);
  }
  .pmi-checklist-box h3 { font-size: 22px; margin-bottom: 15px; color: var(--purple-deep); }
  .pmi-checklist-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
  .pmi-checklist-item { display: flex; align-items: flex-start; gap: 10px; font-size: 15px; color: #4A4458; }
  .pmi-checklist-item span { color: var(--accent-deep); font-weight: bold; }

  .pmi-free {
    background: #fff;
    border: 1px solid var(--line);
    border-left: 5px solid var(--accent);
    border-radius: var(--radius);
    padding: 40px;
    margin: 40px 0;
    box-shadow: var(--shadow);
    display: grid;
    grid-template-columns: .85fr 1.15fr;
    gap: 40px;
    align-items: center;
  }
  .pmi-free img { width: 100%; border-radius: 14px; object-fit: cover; aspect-ratio: 4/3; background: var(--purple-soft); }
  .pmi-eyebrow {
    color: var(--accent-deep);
    font-weight: 800;
    letter-spacing: .08em;
    text-transform: uppercase;
    font-size: .82rem;
    margin-bottom: 8px;
  }
  .pmi-free h2 { font-size: 32px; margin-bottom: 12px; }
  .pmi-free p { margin: 0 0 20px; color: #6b6880; }
  .pmi-free form { display: flex; gap: 12px; flex-wrap: wrap; }
  .pmi-free input {
    flex: 1;
    min-width: 200px;
    padding: 14px 16px;
    border: 1px solid var(--line);
    border-radius: 12px;
    font-inherit;
    font-size: 1rem;
    background-color: #faf8f5;
    outline: none;
  }
  .pmi-free input:focus { border-color: var(--purple); background-color: #fff; }
  .pmi-msg { font-size: .98rem; margin: 15px 0 0; font-weight: 700; }
  .pmi-hint { font-size: .9rem; color: var(--muted); margin: 12px 0 0; font-style: italic; }

  .pmi-section-title { text-align: center; margin-bottom: 40px; }
  .pmi-section-title h2 { font-size: 36px; margin-bottom: 10px; }
  .pmi-section-title p { color: #6b6880; font-size: 18px; margin: 0; }

  .pmi-video-section { margin-bottom: 60px; }
  .pmi-video-container { background: #000; border-radius: 16px; overflow: hidden; position: relative; aspect-ratio: 16/9; box-shadow: var(--shadow); }
  .pmi-video-placeholder { width: 100%; height: 100%; object-fit: cover; display: block; }
  .pmi-video-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; }
  .pmi-play-circle { width: 80px; height: 80px; background: #ffffff; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3); transition: transform 0.2s ease; cursor: pointer; }
  .pmi-play-circle:hover { transform: scale(1.08); }
  .pmi-play-icon { width: 0; height: 0; border-top: 14px solid transparent; border-bottom: 14px solid transparent; border-left: 24px solid var(--purple-deep); margin-left: 6px; }

  .pmi-pricing-panel { background: var(--purple-soft); border-radius: var(--radius); padding: 40px; text-align: center; margin-bottom: 40px; }
  .pmi-pricing-panel h2 { font-size: 32px; margin-bottom: 12px; }
  .pmi-pricing-panel p { max-width: 700px; margin: 0 auto 24px; color: var(--purple-deep); }

  .image-cluster { position: relative; width: 100%; max-width: 420px; height: 340px; margin: 0 auto; }
  .img-main { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-4deg); z-index: 5; width: 180px; height: 180px; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08); border: 4px solid #ffffff; }
  .img-sub1 { position: absolute; top: 10px; left: 10px; width: 130px; height: 130px; border-radius: 16px; overflow: hidden; box-shadow: 0 6px 16px rgba(0,0,0,0.05); transform: rotate(-12deg); }
  .img-sub2 { position: absolute; bottom: 10px; right: 10px; width: 140px; height: 140px; border-radius: 16px; overflow: hidden; box-shadow: 0 6px 16px rgba(0,0,0,0.05); transform: rotate(10deg); }

  @media (max-width: 820px) {
    .pmi-hero-grid, .pmi-free { grid-template-columns: 1fr; }
    .pmi-hero h1 { font-size: 32px; }
    .pmi-checklist-grid { grid-template-columns: 1fr; }
  }
`;

const freeJs = `
  (function(){
    var f = document.getElementById("freeForm");
    if(!f) return;
    f.addEventListener("submit", function(e){
      e.preventDefault();
      var name = (document.getElementById("lead_name").value || "").trim();
      var email = (document.getElementById("lead_email").value || "").trim();
      var msg = document.getElementById("freeMsg");
      var btn = f.querySelector("button");
      if(!email) return;
      
      btn.disabled = true; 
      msg.style.display = "block"; 
      msg.style.color = "#6E6878"; 
      msg.textContent = "Sending...";
      
      fetch("${SB_URL}/rest/v1/${LEAD_TABLE}", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": "${SB_KEY}",
          "Authorization": "Bearer ${SB_KEY}",
          "Prefer": "return=minimal"
        },
        body: JSON.stringify({
          first_name: name,
          email: email,
          source: "aha-academy-clinical-framework-guide"
        })
      })
      .then(function(r){ 
        if(!r.ok){ throw new Error("Network response error"); }
        msg.style.color = "#3D2C5F"; 
        msg.textContent = "Thank you — your clinical implementation guide is opening in a new tab!";
        f.reset(); 
        btn.disabled = false;
        if("${GUIDE_URL}") window.open("${GUIDE_URL}", "_blank", "noopener");
      })
      .catch(function(){ 
        btn.disabled = false; 
        msg.style.color = "#C0392B";
        msg.textContent = "Hmm, that did not send. Please email robyn@playmoveimprove.com.au and we will provide access straight away."; 
      });
    });
  })();
`;

export default function HomePage() {
  return (
    <main className="pmi-hub">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* 1. Co-Branded Announcement Banner */}
      <div className="pmi-banner">
        Play Move Improve and Spectrum Village · Scalable workforce training templates for paediatric clinics. 
        <a href="/videos/free">Explore free onboarding paths →</a>
      </div>

      {/* 2. B2B / Clinic Director Focused Hero Section */}
      <section className="pmi-hero">
        <div className="pmi-container pmi-hero-grid">
          <div>
            <h1>Your AHAs understand the clinical intent. But do they know how to prompt a child?</h1>
            <p>
              Hiring and onboarding passionate Allied Health Assistants is the single best way to scale your clinic billable hours, 
              but senior clinicians waste non-billable time teaching raw staff how to pace and run a pediatric session. 
              I am Robyn Papworth, a Masters-qualified Developmental Educator, Exercise Physiologist, and clinic partner. 
              We built this academy to solve workforce onboarding. Our multi-module layout frames short, structured lessons with 
              real-world, child-facing video modeling assets, teaching your assistants exactly how to guide, regulate, and connect with young clients.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a href="/videos/free" className="pmi-btn">
                Preview Training Tracks
              </a>
              <a href="#free-ebook" className="pmi-btn pmi-btn-ghost">
                Download Clinical Framework
              </a>
            </div>
          </div>

          {/* Decorative Image Cluster */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "380px" }}>
            <div className="image-cluster">
              <div className="img-main">
                <img src={`${HUB_ASSETS}colour-sorting-table-activity.png`} alt="Ocular tracking task" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div className="img-sub1">
                <img src={`${HUB_ASSETS}floor-based-tearing-paper-activity.png`} alt="Proprioceptive base play" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div className="img-sub2">
                <img src={`${HUB_ASSETS}cup-colour-sort-activity.png`} alt="Midline crossing exercise" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. B2B Competency Check Banner */}
      <section className="pmi-quiz-bar">
        <div className="pmi-container pmi-quiz-flex">
          <div className="pmi-quiz-info">
            <div className="pmi-quiz-icon">
              <svg width="20" height="20" fill="none" stroke="#3730a3" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p style={{ fontSize: "15px", fontWeight: 600, color: "#1e1b2e", margin: "0 0 2px" }}>Are your therapy assistants ready for solo pediatric caseloads?</p>
              <p style={{ fontSize: "13px", color: "#6b6880", margin: 0 }}>Take our free two-minute clinical onboarding audit to assess your team's tracking, core, and regulation delivery skills.</p>
            </div>
          </div>
          <a href="/quiz" className="pmi-btn pmi-btn-accent" style={{ fontSize: "14px", padding: "10px 20px" }}>Run Team Audit</a>
        </div>
      </section>

      {/* 4. Clinical Pain Point Checklist */}
      <section className="pmi-container">
        <div className="pmi-checklist-box">
          <h3>Is your senior clinical team experiencing onboarding fatigue?</h3>
          <p style={{ color: "#6b6880", fontSize: "15px", margin: "0 0 20px" }}>
            When private practices attempt to manage internal training pipelines from scratch, senior Occupational Therapists 
            and Speech Pathologists spend precious billable time reviewing fundamental session boundaries rather than advanced care.
          </p>
          <div className="pmi-checklist-grid">
            <div className="pmi-checklist-item">
              <span>✓</span> Assistants struggle to adapt motor activities when a pediatric client experiences sensory meltdowns.
            </div>
            <div className="pmi-checklist-item">
              <span>✓</span> Non-billable onboarding hours skyrocketing due to highly manual, repetitive training protocols.
            </div>
            <div className="pmi-checklist-item">
              <span>✓</span> Inconsistent documentation and session data logging across new integration support staff.
            </div>
            <div className="pmi-checklist-item">
              <span>✓</span> Difficulties translating advanced theory into practical child-level engagement strategies.
            </div>
          </div>
        </div>
      </section>

      {/* 5. Functional Supabase Lead Capture Form */}
      <section className="pmi-container" id="free-ebook">
        <div className="pmi-free">
          <img src={`${EDU_ASSETS}cup-stacking-tummy-time-activity.png`} alt="Reflex Integration Framework" />
          <div>
            <p className="pmi-eyebrow">Director Implementation Manual</p>
            <h2>Aligning AHA session structure to clinic outcomes</h2>
            <p>
              Download our complete Reflex Integration Guide. Learn how primitive reflex gaps mimic behavioral avoidance, 
              and explore the structural modeling workflows that help therapy assistants maintain high engagement during clinical sessions.
            </p>
            <form id="freeForm">
              <input id="lead_name" type="text" placeholder="Your name" required />
              <input id="lead_email" type="email" placeholder="Practice email address" required />
              <button className="pmi-btn pmi-btn-accent" type="submit">Access Technical Guide</button>
            </form>
            <p className="pmi-msg" id="freeMsg" style={{ display: "none" }}></p>
            <p className="pmi-hint">
              The PDF training documentation opens immediately in a new window upon submission for direct team review.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Video Section (Reframing existing video asset as modeling tool) */}
      <section className="pmi-container">
        <div className="pmi-section-title">
          <h2>Clinical Modeling: Watch our session pacing in practice</h2>
          <p>Our initial training track provides raw assistants with exact language models and child-facing tone strategies.</p>
        </div>
        <div className="pmi-video-section">
          <div className="pmi-video-container">
            <img src={`${HUB_ASSETS}colour-sorting-table-activity.png`} alt="Session modeling sample video" className="pmi-video-placeholder" />
            <a href="/videos/free" className="pmi-video-overlay">
              <div className="pmi-play-circle">
                <div className="pmi-play-icon"></div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 7. Tier Explanation Section (Explaining the B2B Academy model) */}
      <section className="pmi-container">
        <div className="pmi-pricing-panel">
          <h2>Standardized workforce structures for modern practices</h2>
          <p>
            Our core mission is to remove training bottlenecks within the allied health workforce ecosystem. 
            The foundational framework guides and primary child-facing interactive modeling clips are completely open access, 
            allowing practice managers to quickly verify value. For clinics requiring complete multi-week onboarding tracks, 
            progressive motor sequence variations, and standardized template download hubs, flexible enterprise team memberships 
            provide complete coverage.
          </p>
          <a href="/videos/free" className="pmi-btn">Review Open Training Content</a>
        </div>
      </section>

      <Script id="pmi-free-form-script" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: freeJs }} />
    </main>
  );
}
export const dynamic = 'force-dynamic';