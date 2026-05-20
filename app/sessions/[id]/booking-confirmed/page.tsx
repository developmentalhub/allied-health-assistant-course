"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function BookingConfirmedPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div style={{ backgroundColor: "#faf8f5", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ maxWidth: "560px", width: "100%", textAlign: "center" }}>

        <div style={{ width: "72px", height: "72px", backgroundColor: "#f0fdf4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <svg width="36" height="36" fill="none" stroke="#166534" strokeWidth="2">
            <path d="M6 18l9 9L30 9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 300, color: "#1e1b2e", marginBottom: "16px" }}>
          Spot reserved!
        </h1>

        <p style={{ fontSize: "16px", color: "#6b6880", lineHeight: 1.7, marginBottom: "12px" }}>
          Your spot is reserved and your card has been authorised. No money has been taken yet.
        </p>

        <p style={{ fontSize: "15px", color: "#6b6880", lineHeight: 1.7, marginBottom: "32px" }}>
          Once the session reaches its minimum number of families, your payment will be captured 24 hours before it starts. If the session does not run, your authorisation will be cancelled and you will not be charged.
        </p>

        <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "16px", padding: "20px 24px", marginBottom: "32px", textAlign: "left" }}>
          <p style={{ fontSize: "14px", fontWeight: 600, color: "#166534", margin: "0 0 8px 0" }}>
            What happens next
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              "We will email you when the session is confirmed.",
              "Payment will be captured 24 hours before the session starts.",
              "You will receive joining instructions before the session.",
              "If the session is cancelled you will never be charged.",
            ].map((text, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <div style={{ width: "18px", height: "18px", borderRadius: "50%", backgroundColor: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                  <svg width="10" height="10" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M2 5l2.5 2.5L8 2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p style={{ fontSize: "13px", color: "#166534", margin: 0, lineHeight: 1.5 }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/dashboard"
            style={{ backgroundColor: "#3730a3", color: "white", padding: "12px 28px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}
          >
            Go to my dashboard
          </Link>
          <Link
            href="/sessions"
            style={{ backgroundColor: "white", color: "#3730a3", padding: "12px 28px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none", border: "1px solid #e8e4de" }}
          >
            Browse more sessions
          </Link>
        </div>

      </div>
    </div>
  );
}