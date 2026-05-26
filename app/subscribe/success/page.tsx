import Link from "next/link";

export default function SubscribeSuccessPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", fontFamily: "DM Sans, sans-serif" }}>
      <div style={{ maxWidth: "480px", textAlign: "center" }}>
        <div style={{ width: "64px", height: "64px", backgroundColor: "#f0fdf4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <svg width="28" height="28" fill="none" stroke="#166534" strokeWidth="2">
            <path d="M4 12l6 6L20 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 16px" }}>
          Welcome to Developmental Hub
        </h1>
        <p style={{ fontSize: "16px", color: "#6b6880", lineHeight: 1.7, margin: "0 0 40px" }}>
          Your membership is active. You now have unlimited access to the full video library, downloadable activity sheets, and our monthly live Q&A with Robyn.
        </p>
        <Link href="/videos" style={{ display: "inline-block", backgroundColor: "#3730a3", color: "white", padding: "16px 36px", borderRadius: "999px", fontSize: "16px", fontWeight: 600, textDecoration: "none" }}>
          Start watching →
        </Link>
      </div>
    </main>
  );
}