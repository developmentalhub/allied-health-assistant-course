"use client";

import { useState } from "react";

export default function FinanceDashboard() {
  const [payments] = useState([
    { id: 1, parent: "Sarah Miller", amount: 100, code: "JESS70", date: "2026-05-15" },
    { id: 2, parent: "Mark Thompson", amount: 100, code: "", date: "2026-05-16" }, // 100% to you
    { id: 3, parent: "Alice Wong", amount: 150, code: "JESS70", date: "2026-05-17" },
  ]);

  const calculateSplit = (amount: number, code: string) => {
    if (code === "JESS70") {
      return { partner: amount * 0.7, business: amount * 0.3 };
    }
    return { partner: 0, business: amount };
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#f8fafc", minHeight: "100vh", fontFamily: "var(--font-sans)" }}>
      <h1 style={{ marginBottom: "30px", color: "#1e1b2e" }}>Finance & Partner Splits</h1>
      
      <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "2px solid #f1f5f9" }}>
              <th style={{ padding: "12px" }}>Date</th>
              <th style={{ padding: "12px" }}>Client</th>
              <th style={{ padding: "12px" }}>Total Fee</th>
              <th style={{ padding: "12px" }}>Code Used</th>
              <th style={{ padding: "12px" }}>Jess Share (70%)</th>
              <th style={{ padding: "12px" }}>Your Share (30% or 100%)</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(p => {
              const splits = calculateSplit(p.amount, p.code);
              return (
                <tr key={p.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "16px" }}>{p.date}</td>
                  <td style={{ padding: "16px", fontWeight: "bold" }}>{p.parent}</td>
                  <td style={{ padding: "16px" }}>${p.amount.toFixed(2)}</td>
                  <td style={{ padding: "16px" }}>
                    <span style={{ color: p.code ? "#3730a3" : "#94a3b8", fontWeight: "bold" }}>
                      {p.code || "None"}
                    </span>
                  </td>
                  <td style={{ padding: "16px", color: "#16a34a", fontWeight: "bold" }}>
                    ${splits.partner.toFixed(2)}
                  </td>
                  <td style={{ padding: "16px", fontWeight: "bold", color: "#1e1b2e" }}>
                    ${splits.business.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
