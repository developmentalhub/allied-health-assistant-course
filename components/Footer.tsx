import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#1e1b2e", padding: "40px 24px", fontFamily: "DM Sans, sans-serif" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <p style={{ fontSize: "14px", fontWeight: 600, color: "white", margin: "0 0 4px" }}>
            Developmental Hub
          </p>
          <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
            A Play Move Improve Pty Ltd platform · Victoria, Australia
          </p>
        </div>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          <Link href="/sessions" style={{ fontSize: "13px", color: "#9ca3af", textDecoration: "none" }}>Sessions</Link>
          <Link href="/practitioners/directory" style={{ fontSize: "13px", color: "#9ca3af", textDecoration: "none" }}>Our specialists</Link>
          <Link href="/waitlist" style={{ fontSize: "13px", color: "#9ca3af", textDecoration: "none" }}>Waitlist</Link>
          <Link href="/practitioners" style={{ fontSize: "13px", color: "#9ca3af", textDecoration: "none" }}>For practitioners</Link>
          <Link href="/terms" style={{ fontSize: "13px", color: "#9ca3af", textDecoration: "none" }}>Terms</Link>
          <Link href="/privacy" style={{ fontSize: "13px", color: "#9ca3af", textDecoration: "none" }}>Privacy</Link>
        </div>
      </div>
    </footer>
  );
}