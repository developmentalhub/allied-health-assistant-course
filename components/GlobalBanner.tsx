import Link from "next/link";

export default function GlobalBanner() {
  return (
    <div style={{ backgroundColor: "#1e1b2e", padding: "14px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", flexWrap: "wrap", textAlign: "center" }}>
        <p style={{ fontSize: "14px", color: "#c7d2fe", margin: 0, lineHeight: 1.5 }}>
          🌏 <strong style={{ color: "white" }}>Coming globally late 2026</strong> — we're expanding to families worldwide with practitioners in multiple timezones.
        </p>
        <Link href="/global" style={{ backgroundColor: "#3730a3", color: "white", padding: "6px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
          Register your interest
        </Link>
      </div>
    </div>
  );
}