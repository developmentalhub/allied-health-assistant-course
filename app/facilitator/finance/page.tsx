"use client";

import { useState } from "react";
import Link from "next/link";

export default function FinanceDashboard() {
  const JESS_REFERRAL_CODE = "JESS-SV";
  
  const PROF_RATES = {
    GROUP: 175,
    WEBINAR: 195
  };

  const [sales] = useState([
    { id: "S1", customer: "The Smith Family", amount: 100, referral: "JESS-SV", facilitator: "Jess" },
    { id: "S2", customer: "Mountain View Kindy", amount: 250, referral: "NONE", facilitator: "Robyn" },
  ]);

  const [profClaims, setProfClaims] = useState([
    { id: "C1", staff: "Suzy", date: "2026-05-15", type: "GROUP", title: "Small Group Motor Skills", status: "Awaiting Approval", sessionNote: "Great engagement, Leo showed progress with bilateral coordination." },
    { id: "C2", staff: "Future Educator", date: "2026-05-17", type: "WEBINAR", title: "Primitive Reflexes 101", status: "Awaiting Approval", sessionNote: "Minor lag at the start, but all content covered." },
  ]);

  const handleApprove = (id: string) => {
    setProfClaims(prev => 
      prev.map(c => c.id === id ? { ...c, status: "Approved" } : c)
    );
  };

  const calculateCommission = (sale: any) => {
    if (sale.referral === JESS_REFERRAL_CODE) {
      return { jess: sale.amount * 0.7, robyn: sale.amount * 0.3 };
    }
    return { jess: 0, robyn: sale.amount * 0.7 };
  };

  const totals = sales.reduce((acc, sale) => {
    const split = calculateCommission(sale);
    acc.jess += split.jess;
    acc.robyn += split.robyn;
    return acc;
  }, { jess: 0, robyn: 0 });

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "40px 20px", fontFamily: "var(--font-sans)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        <header style={{ marginBottom: "30px" }}>
          <Link href="/facilitator" style={{ color: "#3730a3", textDecoration: "none", fontSize: "0.9rem" }}>
            ← Back to Portal
          </Link>
          <h1 style={{ color: "#1e1b2e", fontSize: "2rem", fontWeight: "bold", marginTop: "10px" }}>
            Team Finance & Approvals
          </h1>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", marginBottom: "40px" }}>
          <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", borderTop: "4px solid #3730a3" }}>
            <p style={{ color: "#64748b", fontSize: "0.75rem", fontWeight: "bold" }}>ROBYN (PROFIT)</p>
            <h2 style={{ fontSize: "1.8rem" }}>${totals.robyn.toFixed(2)}</h2>
          </div>
          <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", borderTop: "4px solid #16a34a" }}>
            <p style={{ color: "#64748b", fontSize: "0.75rem", fontWeight: "bold" }}>JESS (COMMISSION)</p>
            <h2 style={{ fontSize: "1.8rem" }}>${totals.jess.toFixed(2)}</h2>
          </div>
          <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", borderTop: "4px solid #f59e0b" }}>
            <p style={{ color: "#64748b", fontSize: "0.75rem", fontWeight: "bold" }}>PROFESSIONAL (PENDING)</p>
            <h2 style={{ fontSize: "1.8rem" }}>
              ${profClaims.filter(c => c.status === "Awaiting Approval")
                .reduce((acc, c) => acc + (c.type === "GROUP" ? PROF_RATES.GROUP : PROF_RATES.WEBINAR), 0)}
            </h2>
          </div>
        </div>

        <section style={{ backgroundColor: "white", borderRadius: "12px", padding: "24px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <h3 style={{ marginBottom: "20px", color: "#1e1b2e" }}>Professional Session Claims</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "2px solid #f1f5f9" }}>
                <th style={{ padding: "12px", color: "#64748b" }}>Educator</th>
                <th style={{ padding: "12px", color: "#64748b" }}>Session Details</th>
                <th style={{ padding: "12px", color: "#64748b" }}>Type</th>
                <th style={{ padding: "12px", color: "#64748b" }}>Facilitator Notes</th>
                <th style={{ padding: "12px", color: "#64748b" }}>Status</th>
                <th style={{ padding: "12px", color: "#64748b" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {profClaims.map((claim) => (
                <tr key={claim.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "16px", fontWeight: "600" }}>{claim.staff}</td>
                  <td style={{ padding: "16px" }}>
                    <div style={{ fontWeight: "500" }}>{claim.title}</div>
                    <div style={{ fontSize: "0.8rem", color: "#64748b" }}>{claim.date}</div>
                  </td>
                  <td style={{ padding: "16px" }}>${claim.type === "GROUP" ? PROF_RATES.GROUP : PROF_RATES.WEBINAR}</td>
                  <td style={{ padding: "16px", maxWidth: "300px", fontSize: "0.85rem", color: "#475569", fontStyle: "italic" }}>
                    {claim.sessionNote}
                  </td>
                  <td style={{ padding: "16px" }}>
                    <span style={{ 
                      fontSize: "0.75rem", 
                      padding: "4px 8px", 
                      borderRadius: "4px", 
                      backgroundColor: claim.status === "Approved" ? "#dcfce7" : "#fef3c7",
                      color: claim.status === "Approved" ? "#166534" : "#92400e"
                    }}>
                      {claim.status}
                    </span>
                  </td>
                  <td style={{ padding: "16px" }}>
                    {claim.status === "Awaiting Approval" && (
                      <button 
                        onClick={() => handleApprove(claim.id)}
                        style={{ backgroundColor: "#3730a3", color: "white", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem" }}
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

      </div>
    </div>
  );
}