export default function SubscribeSuccessPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", fontFamily: "DM Sans, sans-serif" }}>
      <div style={{ maxWidth: "520px", textAlign: "center" }}>
        <div style={{ width: "64px", height: "64px", backgroundColor: "#f0fdf4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <svg width="28" height="28" fill="none" stroke="#166534" strokeWidth="2">
            <path d="M4 12l6 6L20 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 16px" }}>
          Welcome to Developmental Hub!
        </h1>
        <p style={{ fontSize: "16px", color: "#6b6880", lineHeight: 1.7, margin: "0 0 12px" }}>
          Your 7-day free trial has started.
        </p>
        <p style={{ fontSize: "16px", color: "#6b6880", lineHeight: 1.7, margin: "0 0 32px" }}>
          We've sent you an email with a link to set your password and access your videos. Check your inbox — it should arrive within a minute.
        </p>
        <div style={{ backgroundColor: "#f5f3ff", border: "1px solid #e0e7ff", borderRadius: "14px", padding: "20px 24px", marginBottom: "32px" }}>
          <p style={{ fontSize: "14px", color: "#3730a3", margin: 0, lineHeight: 1.6 }}>
            <strong>Can't see the email?</strong> Check your spam folder. The email comes from Developmental Hub and has subject "Welcome to Developmental Hub — set your password to get started".
          </p>
        </div>
        <a href="/login" style={{ display: "inline-block", backgroundColor: "#3730a3", color: "white", padding: "14px 32px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, textDecoration: "none" }}>
          Already set my password — sign in
        </a>
      </div>
    </main>
  );
}