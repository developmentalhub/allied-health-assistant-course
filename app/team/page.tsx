"use client";

import { useState } from "react";


export default function TeamPage() {
  const [team] = useState([
    {
      name: "Robyn Papworth",
      role: "Founder & Lead Educator",
      credentials: ["Masters of Developmental Education", "Exercise Physiologist"],
      bio: "Robyn Papworth is a confident professional working as an educator, specialising in neurodevelopmental coaching.",
      specialties: ["Literacy", "Vagus Nerve", "Regulation"],
      color: "#3730a3",
      image: "/team/robyn.jpg"
    },
    {
      name: "Suzy",
      role: "Professional Facilitator",
      credentials: ["Specialised Movement Coach"],
      bio: "Suzy is an energetic essential member of the team, known for her approachable and supportive coaching style.",
      specialties: ["Gross Motor Skills", "Fine Motor Skills", "Sensory"],
      color: "#0f766e",
      image: "/team/suzy.jpg"
    },
    {
      name: "Jess",
      role: "Professional Facilitator",
      credentials: ["Early Childhood Specialist"],
      bio: "Jess is a dedicated guide for finding and embracing learning opportunities worldwide, focusing on play skills.",
      specialties: ["Play Skills", "Regulation", "Literacy"],
      color: "#c2410c",
      image: "/team/jess.jpg"
    }
  ]);

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }}>
      

      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "80px 24px 48px", textAlign: "center" }}>
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b6880", marginBottom: "16px" }}>
          Our team
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "42px", fontWeight: 300, color: "#1e1b2e", lineHeight: 1.2, marginBottom: "16px" }}>
          The people behind Developmental Hub
        </h1>
        <p style={{ fontSize: "17px", color: "#6b6880", lineHeight: 1.7, fontWeight: 300 }}>
          Our team brings together expertise in developmental education, movement coaching, and early childhood — all united by a passion for supporting families.
        </p>
      </section>

      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px" }}>
          {team.map((member) => (
            <div key={member.name} style={{ backgroundColor: "white", borderRadius: "20px", padding: "36px 32px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderTop: `6px solid ${member.color}`, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>

              {/* Photo */}
              <div style={{ width: "120px", height: "120px", borderRadius: "50%", overflow: "hidden", marginBottom: "20px", border: "3px solid #f0eee9" }}>
                <img
                  src={member.image}
                  alt={member.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${member.name}&background=e0e7ff&color=3730a3&size=120`;
                  }}
                />
              </div>

              {/* Name + role */}
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, color: "#1e1b2e", marginBottom: "4px" }}>
                {member.name}
              </h2>
              <p style={{ fontSize: "14px", color: "#6b6880", marginBottom: "16px" }}>
                {member.role}
              </p>

              {/* Bio */}
              <p style={{ fontSize: "14px", color: "#6b6880", lineHeight: 1.7, marginBottom: "20px" }}>
                {member.bio}
              </p>

              {/* Credentials */}
              <div style={{ marginBottom: "16px", width: "100%" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#b0acbf", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
                  Credentials
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center" }}>
                  {member.credentials.map(cred => (
                    <span key={cred} style={{ fontSize: "12px", backgroundColor: "#f5f3ff", color: "#3730a3", padding: "4px 10px", borderRadius: "6px", fontWeight: 600 }}>
                      {cred}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specialties */}
              <div style={{ width: "100%" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#b0acbf", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
                  Specialties
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center" }}>
                  {member.specialties.map(s => (
                    <span key={s} style={{ fontSize: "12px", backgroundColor: "#faf8f5", color: "#6b6880", padding: "4px 10px", borderRadius: "6px", border: "1px solid #e8e4de" }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
