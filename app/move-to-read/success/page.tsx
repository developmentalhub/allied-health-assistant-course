export const metadata = { title: "Payment received — Move to Read" };

export default function DeckSuccessPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ maxWidth: "480px", textAlign: "center" }}>
        <div style={{ width: "56px", height: "56px", borderRadius: "999px", backgroundColor: "#4a8b6d", color: "white", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: "26px" }}>✓</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 300, margin: "0 0 16px" }}>Payment received — thank you!</h1>
        <p style={{ fontSize: "15px", color: "#6b6880", lineHeight: 1.7, margin: "0 0 12px" }}>
          We&apos;ve just emailed you a link to set your password. Click it, choose a password, and you&apos;ll land straight on your download page with all three Move to Read decks.
        </p>
        <p style={{ fontSize: "13px", color: "#9591a6", lineHeight: 1.7, margin: "0 0 28px" }}>
          Can&apos;t see it? Check your spam or promotions folder — it arrives within a couple of minutes.
        </p>
        <a href="/login?redirect=/move-to-read" style={{ display: "inline-block", backgroundColor: "#3730a3", color: "white", padding: "14px 32px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
          Already set your password? Sign in
        </a>
      </div>
    </main>
  );
}