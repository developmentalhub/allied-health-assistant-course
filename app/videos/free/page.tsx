"use client";

import { useState } from "react";
import Link from "next/link";

const FREE_VIDEOS = [
  {
    id: "developmental-milestones",
    title: "Developmental Milestones — Every Child is Different",
    description: "An introduction to developmental milestones and why every child's journey is unique.",
    category: "Follow Along Activities",
    duration: "12 min",
    url: "https://developmental-hub-videos.b-cdn.net/Free%20Videos/Family%20-%20Developmental%20Milestones%20-%20Every%20Child%20is%20Different.mp4",
  },
  {
    id: "separation-anxiety",
    title: "Separation Anxiety at Kindergarten",
    description: "Practical strategies for helping your child manage separation anxiety at kindy or daycare.",
    category: "School Readiness",
    duration: "10 min",
    url: "https://developmental-hub-videos.b-cdn.net/Free%20Videos/Family%20-%20Free%20-%20Separation%20Anxiety%20at%20Kindergarten.mp4",
  },
  {
    id: "pre-reading-skills",
    title: "Pre-Reading Skills — VOR Dice Activities",
    description: "Movement-based activities that build the visual tracking skills children need for reading.",
    category: "School Readiness",
    duration: "8 min",
    url: "https://developmental-hub-videos.b-cdn.net/Free%20Videos/Family%20-%20Pre-Reading%20Skills%20-%20VOR%20Dice%20Activities.mp4",
  },
  {
    id: "cerebral-palsy-goals",
    title: "Inclusion — Supporting a Child with Cerebral Palsy",
    description: "Goal-setting and inclusion strategies for families and educators supporting children with cerebral palsy.",
    category: "Follow Along Activities",
    duration: "15 min",
    url: "https://developmental-hub-videos.b-cdn.net/Free%20Videos/Inclusion%20-%20Teenage%20Boy%20with%20Cerebral%20Palsy%20Goals.mp4",
  },
];

const categoryColors: Record<string, { color: string; bg: string }> = {
  "Follow Along Activities": { color: "#7c3aed", bg: "#f5f3ff" },
  "School Readiness":        { color: "#be185d", bg: "#fdf2f8" },
};

export default function FreeVideosPage() {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "64px 24px 80px" }}>

        <div style={{ marginBottom: "48px" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3730a3", marginBottom: "12px" }}>
            Free videos
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: "#1e1b2e", margin: "0 0 16px" }}>
            Get a taste of what's inside
          </h1>
          <p style={{ fontSize: "16px", color: "#6b6880", maxWidth: "540px", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
            These videos are free for everyone — no account needed. Subscribe to unlock the full library.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px", marginBottom: "64px" }}>
          {FREE_VIDEOS.map((video) => {
            const catStyle = categoryColors[video.category] ?? { color: "#6b6880", bg: "#faf8f5" };
            const isPlaying = playing === video.id;

            return (
              <div key={video.id} style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "16px", overflow: "hidden" }}>
                {/* Video player */}
                <div style={{ aspectRatio: "16/9", backgroundColor: "#1e1b2e", position: "relative" }}>
                  {isPlaying ? (
                    <video
                      src={video.url}
                      controls
                      autoPlay
                      style={{ width: "100%", height: "100%", display: "block" }}
                    />
                  ) : (
                    <button
                      onClick={() => setPlaying(video.id)}
                      style={{ width: "100%", height: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}
                    >
                      <div style={{ width: "56px", height: "56px", backgroundColor: "rgba(255,255,255,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}>
                        <svg width="22" height="22" fill="white" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                      <span style={{ position: "absolute", bottom: "10px", right: "10px", backgroundColor: "rgba(0,0,0,0.7)", color: "white", fontSize: "12px", padding: "2px 8px", borderRadius: "4px" }}>
                        {video.duration}
                      </span>
                      <span style={{ position: "absolute", top: "10px", left: "10px", backgroundColor: "#3730a3", color: "white", fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "999px" }}>
                        Free
                      </span>
                    </button>
                  )}
                </div>

                {/* Info */}
                <div style={{ padding: "18px 20px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 600, padding: "3px 8px", borderRadius: "6px", backgroundColor: catStyle.bg, color: catStyle.color, display: "inline-block", marginBottom: "10px" }}>
                    {video.category}
                  </span>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 8px", lineHeight: 1.4 }}>
                    {video.title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "#6b6880", margin: 0, lineHeight: 1.5 }}>{video.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Subscribe CTA */}
        <div style={{ backgroundColor: "#3730a3", borderRadius: "20px", padding: "48px 40px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 300, color: "white", margin: "0 0 12px" }}>
            Ready for the full library?
          </h2>
          <p style={{ fontSize: "16px", color: "#c7d2fe", margin: "0 0 32px", lineHeight: 1.7 }}>
            Subscribe for $39/month and get unlimited access to every video, downloadable activity sheets, and a monthly live Q&A with Robyn.
          </p>
          <Link href="/pricing" style={{ backgroundColor: "white", color: "#3730a3", padding: "14px 36px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
            See what's included
          </Link>
        </div>

      </div>
    </main>
  );
}