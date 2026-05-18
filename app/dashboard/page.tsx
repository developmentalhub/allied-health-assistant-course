"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function ParentDashboard() {
  const [childName] = useState("Leo");

  return (
    <div style={{ backgroundColor: "#faf8f5", minHeight: "100vh", fontFamily: "var(--font-sans)" }}>
      <Navbar />

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>

        <header style={{ marginBottom: "40px" }}>
          <h1 style={{ color: "#1e1b2e", fontSize: "2.2rem", fontFamily: "var(--font-display)", fontWeight: 300 }}>
            Welcome back, {childName}'s Family
          </h1>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "25px" }}>

          {/* Current Action Items */}
          <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "24px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", border: "1px solid #e2e8f0" }}>
            <h2 style={{ fontSize: "1.2rem", color: "#3730a3", marginBottom: "20px" }}>Current Action Items</h2>
            <div style={{ backgroundColor: "#f5f3ff", padding: "20px", borderRadius: "12px", borderLeft: "4px solid #3730a3" }}>
              <p style={{ fontWeight: "bold", color: "#1e1b2e", marginBottom: "8px" }}>This week's focus:</p>
              <p style={{ fontSize: "0.95rem", color: "#4b5563", lineHeight: "1.5" }}>
                Practice "Bear Crawls" to the letterbox and back once a day to support core stability and shoulder girdle strength.
              </p>
            </div>
          </div>

          {/* Developmental Checklist */}
          <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "24px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", border: "1px solid #e2e8f0" }}>
            <h2 style={{ fontSize: "1.2rem", color: "#16a34a", marginBottom: "20px" }}>Developmental Checklist</h2>
            <p style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: "20px" }}>
              Keep your child's profile updated to help Robyn and the team tailor your sessions.
            </p>
            <Link href="/profile" style={{ display: "block", textAlign: "center", backgroundColor: "#16a34a", color: "white", padding: "12px", borderRadius: "10px", textDecoration: "none", fontWeight: "bold" }}>
              Update Checklist
            </Link>
          </div>

        </div>

        {/* Resource Library */}
        <div style={{ marginTop: "40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "1.3rem", color: "#1e1b2e" }}>Resource Library</h2>
            <Link href="/resources" style={{ color: "#3730a3", fontWeight: "bold", textDecoration: "none", fontSize: "0.9rem" }}>
              View All Resources
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
            {["Gross Motor", "Sensory", "Literacy"].map(cat => (
              <div key={cat} style={{ backgroundColor: "white", padding: "20px", borderRadius: "16px", border: "1px solid #f1f5f9", textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "10px" }}>📄</div>
                <span style={{ fontWeight: "bold", fontSize: "0.85rem", color: "#475569" }}>{cat} Packs</span>
              </div>
            ))}
          </div>
        </div>

        {/* Browse Sessions */}
        <div style={{ marginTop: "40px", backgroundColor: "#3730a3", borderRadius: "24px", padding: "32px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 300, color: "white", marginBottom: "12px" }}>
            Ready to book your next session?
          </h2>
          <p style={{ fontSize: "15px", color: "#c7d2fe", marginBottom: "24px", fontWeight: 300 }}>
            Browse upcoming small group sessions and webinars.
          </p>
          <Link
            href="/sessions"
            style={{ backgroundColor: "white", color: "#3730a3", padding: "12px 28px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none", display: "inline-block" }}
          >
            Browse sessions
          </Link>
        </div>

      </div>
    </div>
  );
}