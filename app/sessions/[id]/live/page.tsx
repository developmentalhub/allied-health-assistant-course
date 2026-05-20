"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function VideoSessionPage() {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [callJoined, setCallJoined] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ROOM_URL = "https://developmental-hub.daily.co/developmental-small-group-session"; 

    let callFrame: any;

    const loadDaily = async () => {
      const DailyIframe = (await import("@daily-co/daily-js")).default;
      
      if (videoContainerRef.current) {
        videoContainerRef.current.innerHTML = "";
        
        callFrame = DailyIframe.createFrame(videoContainerRef.current, {
          iframeStyle: {
            width: "100%",
            height: "100%",
            border: "0",
            borderRadius: "12px",
          },
          showLeaveButton: true,
        });

        await callFrame.join({ url: ROOM_URL });
        setCallJoined(true);
      }
    };

    loadDaily();

    return () => {
      if (callFrame) {
        callFrame.destroy();
      }
    };
  }, []);

  return (
    <div style={{ backgroundColor: "#1e1b2e", minHeight: "100vh", padding: "20px", fontFamily: "var(--font-sans)", color: "white" }}>
      <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
        
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <Link href="/facilitator" style={{ color: "#faf8f5", textDecoration: "none", fontSize: "0.9rem" }}>
              ← Back to Facilitator Portal
            </Link>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", marginTop: "10px" }}>
              Live Session: Observation & Coaching
            </h1>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ backgroundColor: "#16a34a", padding: "6px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "bold", display: "inline-block" }}>
              FACILITATOR VIEW
            </div>
          </div>
        </header>

        {/* Two-Column Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px", height: "75vh" }}>
          
          {/* Column 1: Video Call */}
          <div 
            ref={videoContainerRef}
            style={{ 
              backgroundColor: "#000000", 
              borderRadius: "12px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              overflow: "hidden"
            }}
          >
            {!callJoined && (
              <p style={{ color: "#6b6880" }}>Connecting to session...</p>
            )}
          </div>

          {/* Column 2: Session Notes */}
          <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column" }}>
            <h2 style={{ color: "#1e1b2e", fontSize: "1.2rem", marginBottom: "15px", fontWeight: "bold" }}>
              Clinical Observations
            </h2>
            
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Type your notes here... e.g. Left side neglect observed during floor play, tracking issues with eyes..."
              style={{ 
                flex: "1", 
                width: "100%", 
                padding: "15px", 
                borderRadius: "8px", 
                border: "1px solid #e2e8f0", 
                fontSize: "1rem", 
                fontFamily: "inherit", 
                resize: "none",
                color: "#1e1b2e"
              }}
            />
            
            <button 
              onClick={() => alert("Notes saved to profile!")}
              style={{ 
                marginTop: "15px", 
                backgroundColor: "#3730a3", 
                color: "white", 
                padding: "12px", 
                borderRadius: "8px", 
                border: "none", 
                fontWeight: "bold", 
                cursor: "pointer" 
              }}
            >
              Save Session Summary
            </button>
          </div>
        </div>

        <footer style={{ marginTop: "20px", display: "flex", gap: "20px", color: "#6b6880", fontSize: "0.9rem" }}>
          <span><strong>Facilitator:</strong> Robyn Papworth</span>
          <span><strong>Participant:</strong> Leo (Age 4)</span>
        </footer>
      </div>
    </div>
  );
}
