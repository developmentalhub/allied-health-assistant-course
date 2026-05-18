"use client";

import { useState } from "react";
import Link from "next/link";

export default function TeamSelection() {
  const [team] = useState([
    {
      name: "Robyn Papworth",
      role: "Founder & Lead Educator",
      credentials: ["Masters of Developmental Education", "Exercise Physiologist"],
      bio: "Robyn Papworth is a confident professional working as an educator, specialising in neurodevelopmental coaching.",
      specialties: ["Literacy", "Vagus Nerve", "Regulation"],
      availability: "Tuesday & Wednesday",
      spotsRemaining: 3,
      color: "#6b4a8e", // Soft purple from your screenshot
      image: "/team/robyn.jpg" 
    },
    {
      name: "Suzy",
      role: "Professional Facilitator",
      credentials: ["Specialised Movement Coach"],
      bio: "Suzy is an energetic essential member of the team, known for her approachable and supportive coaching style.",
      specialties: ["Gross Motor Skills", "Fine Motor Skills", "Sensory"],
      availability: "Monday & Thursday",
      spotsRemaining: 8,
      color: "#4a7c59", // Sage green
      image: "/team/suzy.jpg"
    },
    {
      name: "Jess",
      role: "Professional Facilitator",
      credentials: ["Early Childhood Specialist"],
      bio: "Jess is a dedicated guide for finding and embracing learning opportunities worldwide, focusing on play skills.",
      specialties: ["Play Skills", "Regulation", "Literacy"],
      availability: "Tuesday & Friday",
      spotsRemaining: 0,
      color: "#d97706", // Warm orange
      image: "/team/jess.jpg"
    }
  ]);

  return (
    <div style={{ backgroundColor: "#fdfbf7", minHeight: "100vh", padding: "60px 20px", fontFamily: "var(--font-sans)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        <header style={{ textAlign: "center", marginBottom: "60px" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.8rem", color: "#2d1a47", marginBottom: "15px" }}>
            Meet Your Team
          </h1>
          <p style={{ color: "#64748b", fontSize: "1.1rem" }}>
            Select a professional who specialises in the area your child is currently focusing on.
          </p>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "30px" }}>
          {team.map((member) => (
            <div key={member.name} style={{ 
              backgroundColor: "white", 
              borderRadius: "20px", 
              padding: "40px", 
              boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
              borderTop: `8px solid ${member.color}`,
              display: "flex",
              flexDirection: "column",
              textAlign: "center"
            }}>
              
              {/* Real Person Image Container */}
              <div style={{ 
                width: "160px", 
                height: "160px", 
                borderRadius: "50%", 
                margin: "0 auto 25px auto",
                overflow: "hidden",
                border: "4px solid white",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
              }}>
                <img 
                  src={member.image} 
                  alt={member.name} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    // Fallback to a placeholder if the image isn't in the folder yet
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${member.name}&background=f1f5f9&color=64748b`;
                  }}
                />
              </div>

              <h2 style={{ fontSize: "1.6rem", color: "#1e1b2e", marginBottom: "5px", fontWeight: "700" }}>{member.name}</h2>
              <p style={{ color: "#64748b", fontSize: "0.95rem", marginBottom: "15px" }}>{member.role}</p>
              
              <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: "1.6", marginBottom: "20px", height: "60px", overflow: "hidden" }}>
                {member.bio}
              </p>

              <div style={{ marginBottom: "25px", textAlign: "left" }}>
                <p style={{ fontSize: "0.75rem", fontWeight: "bold", color: "#94a3b8", textTransform: "uppercase", marginBottom: "10px" }}>Credentials</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {member.credentials.map(cred => (
                    <span key={cred} style={{ fontSize: "0.7rem", backgroundColor: "#f5f3ff", color: "#5b21b6", padding: "4px 10px", borderRadius: "6px", fontWeight: "600" }}>
                      {cred}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: "auto" }}>
                {member.spotsRemaining > 0 ? (
                  <>
                    <button style={{ 
                      width: "100%", 
                      backgroundColor: member.color, 
                      color: "white", 
                      border: "none", 
                      padding: "16px", 
                      borderRadius: "30px", 
                      fontWeight: "bold", 
                      fontSize: "1rem",
                      cursor: "pointer",
                      marginBottom: "15px"
                    }}>
                      Book Session
                    </button>
                    <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
                      Available: <strong>{member.availability}</strong><br/>
                      Spots remaining: {member.spotsRemaining} spots
                    </p>
                  </>
                ) : (
                  <>
                    <p style={{ color: "#d97706", fontWeight: "bold", marginBottom: "15px" }}>Group Full</p>
                    <button style={{ 
                      width: "100%", 
                      backgroundColor: "#e2e8f0", 
                      color: "#64748b", 
                      border: "none", 
                      padding: "16px", 
                      borderRadius: "30px", 
                      fontWeight: "bold", 
                      fontSize: "1rem",
                      cursor: "not-allowed"
                    }}>
                      Join Waitlist
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}