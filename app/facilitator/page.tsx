"use client";

import { useState } from "react";
import Link from "next/link";

export default function FacilitatorDashboard() {
  const [activeStaff, setActiveStaff] = useState("Robyn");

  // Your full list of professional developmental groups
  const SESSION_TYPES = [
    "Gross Motor Skills",
    "Fine Motor Skills",
    "Sensory",
    "Play Skills",
    "Regulation",
    "Vagus Nerve",
    "Literacy"
  ];

  const [staffSchedules, setStaffSchedules] = useState<any>({
    Robyn: [
      { id: "101", parent: "Sarah Miller", child: "Leo", time: "10:00 AM", type: "Gross Motor Skills", roomUrl: "https://playmoveimprove.daily.co/gross-motor" },
      { id: "102", parent: "Mark Thompson", child: "Mia", time: "11:30 AM", type: "Vagus Nerve", roomUrl: "https://playmoveimprove.daily.co/vagus-nerve" },
    ],
    Jess: [
      { id: "201", parent: "Alice Wong", child: "Ethan", time: "09:00 AM", type: "Fine Motor Skills", roomUrl: "https://playmoveimprove.daily.co/fine-motor" },
    ],
    Professional: [
      { id: "301", staff: "Suzy", parent: "David Lane", child: "Sophie", time: "01:00 PM", type: "Regulation", roomUrl: "https://playmoveimprove.daily.co/regulation" },
    ]
  });

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "40px 20px", fontFamily: "var(--font-sans)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        <header style={{ marginBottom: "30px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <h1 style={{ color: "#1e1b2e", fontSize: "2.2rem", fontWeight: "bold", fontFamily: "var(--font-display)" }}>Facilitator Portal</h1>
            <p style={{ color: "#64748b" }}>Manage sessions across your seven developmental pillars.</p>
          </div>
          <Link href="/facilitator/finance" style={{ color: "#3730a3", fontWeight: "bold", textDecoration: "none", borderBottom: "2px solid #3730a3", paddingBottom: "2px" }}>
            Finance & Approvals
          </Link>
        </header>

        {/* Staff Toggle */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "30px" }}>
          {["Robyn", "Jess", "Professional"].map((staff) => (
            <button
              key={staff}
              onClick={() => setActiveStaff(staff)}
              style={{
                padding: "12px 24px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                backgroundColor: activeStaff === staff ? "#3730a3" : "white",
                color: activeStaff === staff ? "white" : "#64748b",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                transition: "all 0.2s ease"
              }}
            >
              {staff === "Professional" ? "Contractors" : staff}
            </button>
          ))}
        </div>

        {/* Session List */}
        <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "2px solid #f1f5f9" }}>
                <th style={{ padding: "16px", color: "#64748b", fontSize: "0.85rem", textTransform: "uppercase" }}>Time & Child</th>
                <th style={{ padding: "16px", color: "#64748b", fontSize: "0.85rem", textTransform: "uppercase" }}>Group Category</th>
                <th style={{ padding: "16px", color: "#64748b", fontSize: "0.85rem", textTransform: "uppercase" }}>Daily.co Room</th>
                <th style={{ padding: "16px", color: "#64748b", fontSize: "0.85rem", textTransform: "uppercase" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {staffSchedules[activeStaff]?.map((session: any) => (
                <tr key={session.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "20px" }}>
                    <div style={{ fontWeight: "bold", color: "#1e1b2e" }}>{session.child}</div>
                    <div style={{ fontSize: "0.85rem", color: "#64748b" }}>{session.time} • {session.parent}</div>
                  </td>
                  <td style={{ padding: "20px" }}>
                    <span style={{ 
                      fontSize: "0.8rem", 
                      backgroundColor: "#f0fdf4", 
                      color: "#166534", 
                      padding: "6px 12px", 
                      borderRadius: "20px",
                      fontWeight: "600"
                    }}>
                      {session.type}
                    </span>
                  </td>
                  <td style={{ padding: "20px" }}>
                    <code style={{ fontSize: "0.8rem", color: "#3730a3", backgroundColor: "#f5f3ff", padding: "4px 8px", borderRadius: "6px" }}>
                      {session.roomUrl.split('/').pop()}
                    </code>
                  </td>
                  <td style={{ padding: "20px" }}>
                    <a 
                      href={session.roomUrl} 
                      target="_blank"
                      style={{ 
                        backgroundColor: "#3730a3", 
                        color: "white", 
                        padding: "10px 18px", 
                        borderRadius: "8px", 
                        textDecoration: "none", 
                        fontSize: "0.9rem", 
                        fontWeight: "bold",
                        display: "inline-block"
                      }}
                    >
                      Enter Room
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
