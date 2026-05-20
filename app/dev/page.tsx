"use client";

import Link from "next/link";

export default function DevMenu() {
  const pages = [
    { name: "Parent Dashboard", path: "/dashboard", status: "Active" },
    { name: "Parent Profile (with Checklist)", path: "/profile", status: "Active" },
    { name: "Movement Library", path: "/resources", status: "Active" },
    { name: "Team Selection (8 Spots)", path: "/team", status: "Active" },
    { name: "Facilitator Portal", path: "/facilitator", status: "Active" },
  ];

  return (
    <div style={{ padding: "50px", backgroundColor: "#faf8f5", minHeight: "100vh", fontFamily: "var(--font-sans)" }}>
      <h1 style={{ color: "#3730a3", marginBottom: "30px" }}>Development Testing Menu</h1>
      <div style={{ display: "grid", gap: "15px", maxWidth: "500px" }}>
        {pages.map(page => (
          <Link key={page.path} href={page.path} style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "12px",
            textDecoration: "none",
            color: "#1e1b2e",
            boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
            border: "1px solid #e2e8f0"
          }}>
            <span style={{ fontWeight: "bold" }}>{page.name}</span>
            <span style={{ color: "#64748b" }}>{page.path} →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
