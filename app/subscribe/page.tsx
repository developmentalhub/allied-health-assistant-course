"use client";

import { useRouter } from "next/navigation";

export default function GroupBookingPayment() {
  const router = useRouter();

  return (
    <div style={{ backgroundColor: "#faf8f5", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", fontFamily: "var(--font-sans)" }}>
      <div style={{ backgroundColor: "white", maxWidth: "600px", width: "100%", padding: "50px", borderRadius: "30px", boxShadow: "0 20px 50px rgba(0,0,0,0.05)", textAlign: "center", border: "1px solid #f1f5f9" }}>
        
        <header style={{ marginBottom: "40px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "20px" }}>🎟️</div>
          <h1 style={{ fontFamily: "var(--font-display)", color: "#1e1b2e", fontSize: "2.2rem", marginBottom: "15px" }}>Secure Your Spot</h1>
          <p style={{ color: "#64748b", fontSize: "1.1rem", lineHeight: "1.6" }}>
            To maintain our high-quality developmental support, our groups are strictly limited to 8 families. 
          </p>
        </header>

        <div style={{ backgroundColor: "#f8fafc", borderRadius: "20px", padding: "30px", marginBottom: "40px", textAlign: "left" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
            <span style={{ fontWeight: "bold", color: "#475569" }}>Term 3 Small Group Booking</span>
            <span style={{ fontWeight: "bold", color: "#1e1b2e" }}>$299.00</span>
          </div>
          <ul style={{ padding: 0, listStyle: "none", fontSize: "0.9rem", color: "#64748b" }}>
            <li style={{ marginBottom: "10px" }}>• 8 x Weekly interactive video sessions</li>
            <li style={{ marginBottom: "10px" }}>• Individualised Action Items after each session</li>
            <li>• Professional tracking of motor skill milestones</li>
          </ul>
        </div>

        <button 
          onClick={() => router.push("/team")}
          style={{ 
            backgroundColor: "#3730a3", 
            color: "white", 
            width: "100%", 
            padding: "20px", 
            borderRadius: "15px", 
            fontSize: "1.1rem", 
            fontWeight: "bold", 
            border: "none", 
            cursor: "pointer",
            boxShadow: "0 10px 20px rgba(55, 48, 163, 0.2)"
          }}
        >
          Proceed to Payment
        </button>

        <p style={{ marginTop: "25px", fontSize: "0.85rem", color: "#94a3b8" }}>
          Secure checkout powered by Stripe. Australian GST included.
        </p>
      </div>
    </div>
  );
}