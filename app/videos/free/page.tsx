"use client";

import React from "react";

export default function FreeVideosPage() {
  // Complete list of all 8 videos from your log with cleanly formatted titles
  const freeVideos = [
    {
      order: 1,
      title: "Fine Motor Tearing and Cutting Sorting Activity",
      url: "https://developmental-hub-videos.b-cdn.net/Fine%20Motor%20Skills/Fine%20motor%20tearing%20and%20cutting%20sorting%20activity%20-%20explanation%20after%20demonstration.mp4",
      printable: null,
      description: "A wonderful hand warm up that helps build hand strength, fine motor coordination, and bilateral integration using simple paper."
    },
    {
      order: 2,
      title: "Family Regulation and Emotion Colouring Activity",
      url: "https://developmental-hub-videos.b-cdn.net/Regulation/Family%20-%20Regulation%20-%20Emotion%20colouring%20in%20activity.mp4",
      printable: "https://pndihjsqkwbjewlulotg.supabase.co/storage/v1/object/public/printables/Rhythm%20Literacy%20Program%20-%20I%20spy%20something%20that.pdf",
      description: "An emotional awareness and calming activity designed to help children identify feelings while engaging in a relaxing colouring sequence."
    },
    {
      order: 3,
      title: "Pre-Writing Dice Activity, Introduction",
      url: "https://developmental-hub-videos.b-cdn.net/Pre-Writing%20Skills/Pre-writing%20dice%20activity%20-%20introduction.mp4",
      printable: null,
      description: "An engaging introductory movement routine using game elements to prepare small hand muscles for pencil grip and writing endurance."
    },
    {
      order: 4,
      title: "Letter Recognition Dice Activity for b, d, p, q, a, v",
      url: "https://developmental-hub-videos.b-cdn.net/Reading%20Skills/Dice%20activity%20-%20letters%20b%2C%20d%2C%20p%2C%20q%2C%20a%2C%20v%20-%20explanation.mp4",
      printable: null,
      description: "A deliberate body movement practice to help children stop mixing up tricky letters and lock in spatial orientation naturally."
    },
    {
      order: 5,
      title: "Family Pre-Writing Skills Practice",
      url: "https://developmental-hub-videos.b-cdn.net/Pre-Writing%20Skills/Family%20-%20Pre-Writing%20Skills%20with%20Handout.mp4",
      printable: "https://pndihjsqkwbjewlulotg.supabase.co/storage/v1/object/public/printables/Pre-writing%20activities%20for%20video.pdf",
      description: "Follow along together to build the foundational motor pathways that make daily school writing feel easier and less frustrating."
    },
    {
      order: 6,
      title: "Pre-Reading Skills and VOR Dice Activities",
      url: "https://developmental-hub-videos.b-cdn.net/Free%20Videos/Family%20-%20Pre-Reading%20Skills%20-%20VOR%20Dice%20Activities.mp4",
      printable: null,
      description: "Special tracking exercises that link body rhythm and visual skills, essential foundations for smooth reading and sentence tracking."
    },
    {
      order: 7,
      title: "Pre-Writing Shapes and Coordination Patterns",
      url: "https://developmental-hub-videos.b-cdn.net/Pre-Writing%20Skills/Pre-writing%20shapes%20activity%20-%20explanation%20-%201.mp4",
      printable: "https://pndihjsqkwbjewlulotg.supabase.co/storage/v1/object/public/printables/Rhythm%20Literacy%20Activity%20Circle%20Pre-Writing%20Shape%20Handout.pdf",
      description: "Learn how drawing simple rhythmic shapes in a structured order helps build the core coordination required for standard handwriting."
    },
    {
      order: 8,
      title: "Flexible Thinking Circle Activity",
      url: "https://developmental-hub-videos.b-cdn.net/Regulation/Flexible%20thinking%20circle%20activity.mp4",
      printable: null,
      description: "A compassionate, playful game to build cognitive flexibility, helping children handle unexpected changes or school challenges with calm focus."
    }
  ];

  const buttonStyle: React.CSSProperties = {
    backgroundColor: "#3730a3",
    color: "#ffffff",
    padding: "10px 18px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "14px",
    display: "inline-block",
    border: "none",
    cursor: "pointer",
    textAlign: "center"
  };

  const downloadButtonStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    color: "#3730a3",
    padding: "10px 18px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "14px",
    display: "inline-block",
    border: "1.5px solid #3730a3",
    cursor: "pointer",
    textAlign: "center"
  };

  return (
    <div style={{ fontFamily: "DM Sans, sans-serif", color: "#1e1b2e", backgroundColor: "#faf8f5", margin: 0, padding: 0, minHeight: "100vh" }}>
      
      {/* Top Banner */}
      <div style={{ backgroundColor: "#3730a3", color: "#ffffff", padding: "12px 20px", textAlign: "center", fontSize: "14px", fontWeight: "500" }}>
        Ready for the full experience? 
        <a href="/pricing" style={{ color: "#ffffff", textDecoration: "underline", marginLeft: "6px", fontWeight: "600" }}>
          Unlock all 31+ program videos for $39/month →
        </a>
      </div>

      {/* Main Content Header */}
      <header style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 20px 40px 20px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "38px", color: "#1e1b2e", margin: "0 0 16px 0", fontWeight: "700" }}>
          Your Free Foundational Activity Videos
        </h1>
        <p style={{ fontSize: "17px", color: "#6b6880", maxWidth: "700px", margin: "0 auto", lineHeight: "1.6" }}>
          No passwords required, simply tap play on any video below. Your child can follow along alongside Robyn right on your screen to practice essential rhythm, focus, and motor coordination.
        </p>
      </header>

      {/* 8 Video Responsive Card Layout */}
      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px 80px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "32px" }}>
          {freeVideos.map((video) => (
            <div 
              key={video.order} 
              style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e8e4de", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}
            >
              {/* HTML5 Video Container */}
              <div style={{ width: "100%", aspectRatio: "16/9", backgroundColor: "#000000", position: "relative" }}>
                <video 
                  controls 
                  preload="metadata" 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                >
                  <source src={video.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Text Information Details */}
              <div style={{ padding: "24px", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "12px", fontWeight: "700", color: "#3730a3", backgroundColor: "#f5f3ff", padding: "3px 8px", borderRadius: "4px", textTransform: "uppercase" }}>
                    Activity {video.order}
                  </span>
                </div>
                
                <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1e1b2e", margin: "0 0 10px 0", lineHeight: "1.4" }}>
                  {video.title}
                </h3>
                
                <p style={{ fontSize: "14px", color: "#6b6880", lineHeight: "1.5", margin: "0 0 20px 0", flexGrow: 1 }}>
                  {video.description}
                </p>

                {/* Printable Download Link Button Logic */}
                {video.printable && (
                  <div style={{ marginTop: "auto", paddingTop: "12px", borderTop: "1px solid #e8e4de" }}>
                    <a 
                      href={video.printable} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={downloadButtonStyle}
                    >
                      🖨️ Download Activity Handout
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Reassurance Re-engagement Section */}
        <section style={{ marginTop: "64px", backgroundColor: "#1e1b2e", color: "#ffffff", borderRadius: "20px", padding: "40px 32px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "28px", margin: "0 0 12px 0", fontWeight: "700" }}>
            See a difference in how your child focuses?
          </h2>
          <p style={{ fontSize: "16px", color: "#6b6880", maxWidth: "600px", margin: "0 auto 24px auto", lineHeight: "1.5" }}>
            Our full library includes over thirty targeted movement videos covering gross motor skills, pre reading tracking patterns, and fine motor grip support.
          </p>
          <a href="/pricing" style={{ ...buttonStyle, padding: "14px 28px", fontSize: "16px" }}>
            Explore Full Membership options
          </a>
        </section>
      </main>

    </div>
  );
}