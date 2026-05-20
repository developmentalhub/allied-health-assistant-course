"use client";

import { useState } from "react";
import Link from "next/link";

export default function ParentProfile() {
  const [parentDetails] = useState({
    name: "Sarah Miller",
    email: "sarah.miller@example.com",
    location: "Melbourne, VIC",
    memberSince: "February 2026"
  });

  const [children] = useState([
    { id: 1, name: "Leo", age: "4 years", focus: "Bilateral Coordination & Tracking" }
  ]);

  // This state tracks if the baseline checklist is finished
  const [checklistComplete, setChecklistComplete] = useState(false);

  return (
    <div style={{ backgroundColor: "#faf8f5", minHeight: "100vh", padding: "40px 20px", fontFamily: "var(--font-sans)", color: "#1e1b2e" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        <header style={{ marginBottom: "30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <Link href="/dashboard" style={{ color: "#3730a3", textDecoration: "none", fontSize: "0.9rem", fontWeight: "600" }}>
              ← Back to Dashboard
            </Link>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", color: "#3730a3", marginTop: "10px" }}>
              My Profile
            </h1>
          </div>
        </header>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* Developmental Baseline Section - Only shows if not complete */}
          {!checklistComplete && (
            <section style={{ 
              backgroundColor: "#ffffff", 
              borderRadius: "16px", 
              overflow: "hidden", 
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              border: "1px solid #e2e8f0"
            }}>
              <div style={{ backgroundColor: "#d97706", padding: "12px 20px", color: "white", fontSize: "0.85rem", fontWeight: "bold" }}>
                ACTION REQUIRED
              </div>
              <div style={{ padding: "24px", display: "flex", gap: "24px", alignItems: "center" }}>
                <div style={{ 
                  flex: "0 0 150px", 
                  height: "100px", 
                  backgroundColor: "#fef3c7", 
                  borderRadius: "8px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  border: "1px solid #fcd34d",
                  textAlign: "center",
                  fontSize: "0.8rem",
                  padding: "10px",
                  color: "#92400e",
                  fontWeight: "bold"
                }}>
                  School Readiness Checklist Thumbnail
                </div>
                <div style={{ flex: "1" }}>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: "8px", color: "#1e1b2e" }}>What can my child do at home?</h3>
                  <p style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: "16px" }}>
                    Help us create a baseline for Leo. This tool gives us a snapshot of current skills so we can tailor your sessions.
                  </p>
                  <a 
                    href="https://school-readiness-parent-checklist.netlify.app/" 
                    target="_blank"
                    style={{ 
                      display: "inline-block",
                      backgroundColor: "#d97706", 
                      color: "white", 
                      padding: "10px 20px", 
                      borderRadius: "8px", 
                      textDecoration: "none",
                      fontWeight: "bold",
                      fontSize: "0.9rem"
                    }}
                  >
                    Start the Free Home Checklist
                  </a>
                </div>
              </div>
            </section>
          )}

          {/* Account Information */}
          <section style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <h2 style={{ fontSize: "1.1rem", marginBottom: "16px", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px" }}>Account Details</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Parent Name</label>
                <p style={{ fontWeight: "500" }}>{parentDetails.name}</p>
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Email</label>
                <p style={{ fontWeight: "500" }}>{parentDetails.email}</p>
              </div>
            </div>
          </section>

          {/* Children Profiles */}
          <section style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <h2 style={{ fontSize: "1.1rem", marginBottom: "16px", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px" }}>Children</h2>
            {children.map(child => (
              <div key={child.id} style={{ padding: "16px", backgroundColor: "#faf8f5", borderRadius: "8px", borderLeft: "4px solid #3730a3" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: "bold" }}>{child.name}</span>
                  <span style={{ fontSize: "0.85rem", color: "#64748b" }}>{child.age}</span>
                </div>
                <p style={{ marginTop: "8px", fontSize: "0.85rem" }}>
                  <strong>Current Focus:</strong> {child.focus}
                </p>
              </div>
            ))}
          </section>

        </div>
      </div>
    </div>
  );
}
