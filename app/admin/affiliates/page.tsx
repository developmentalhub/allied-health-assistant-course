"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminAffiliatesPage() {
  const [codes, setCodes] = useState<any[]>([]);
  const [referrals, setReferrals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ code: "", partner_name: "", partner_email: "", commission_percentage: 20 });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    const { data: codesData } = await supabase
      .from("affiliate_codes")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: referralsData } = await supabase
      .from("affiliate_referrals")
      .select("*, affiliate_codes(code, partner_name, partner_email, commission_percentage)")
      .order("created_at", { ascending: false });

    setCodes(codesData ?? []);
    setReferrals(referralsData ?? []);
    setLoading(false);
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const { error } = await supabase.from("affiliate_codes").insert({
      code: form.code.toUpperCase().trim(),
      partner_name: form.partner_name.trim(),
      partner_email: form.partner_email.trim(),
      commission_percentage: form.commission_percentage,
    });

    if (error) {
      setError(error.message.includes("unique") ? "That code already exists." : error.message);
      setSaving(false);
      return;
    }

    setSuccess("Affiliate code created.");
    setForm({ code: "", partner_name: "", partner_email: "", commission_percentage: 20 });
    setTimeout(() => setSuccess(""), 3000);
    setSaving(false);
    loadData();
  }

  async function toggleActive(id: string, current: boolean) {
    await supabase.from("affiliate_codes").update({ active: !current }).eq("id", id);
    loadData();
  }

  // Calculate monthly earnings per partner
  const earningsByPartner: Record<string, { name: string; email: string; activeReferrals: number; monthlyEarnings: number }> = {};
  referrals.filter(r => r.status === "active").forEach((r) => {
    const code = r.affiliate_codes?.code;
    if (!code) return;
    if (!earningsByPartner[code]) {
      earningsByPartner[code] = {
        name: r.affiliate_codes.partner_name,
        email: r.affiliate_codes.partner_email,
        activeReferrals: 0,
        monthlyEarnings: 0,
      };
    }
    earningsByPartner[code].activeReferrals++;
    earningsByPartner[code].monthlyEarnings += (39 * r.commission_percentage) / 100;
  });

  const totalMonthlyOwed = Object.values(earningsByPartner).reduce((sum, p) => sum + p.monthlyEarnings, 0);

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 16px", borderRadius: "10px",
    border: "1.5px solid #e8e4de", fontSize: "14px", color: "#1e1b2e",
    outline: "none", boxSizing: "border-box", fontFamily: "inherit", backgroundColor: "#faf8f5",
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#faf8f5", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e", padding: "40px 24px 80px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        <Link href="/admin" style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "32px" }}>← Back to admin</Link>

        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 8px" }}>Affiliate Program</h1>
        <p style={{ fontSize: "15px", color: "#6b6880", margin: "0 0 40px" }}>Manage practitioner referral codes and track earnings.</p>

        {/* Summary */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px", marginBottom: "40px" }}>
          {[
            { label: "Active codes", value: codes.filter(c => c.active).length },
            { label: "Total referrals", value: referrals.filter(r => r.status === "active").length },
            { label: "Partners owed this month", value: Object.keys(earningsByPartner).length },
            { label: "Total owed this month", value: `$${totalMonthlyOwed.toFixed(2)}` },
          ].map((stat) => (
            <div key={stat.label} style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "12px", padding: "20px 24px" }}>
              <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b6880", margin: "0 0 6px" }}>{stat.label}</p>
              <p style={{ fontSize: "28px", fontWeight: 600, color: "#1e1b2e", margin: 0 }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Monthly payouts */}
        {Object.keys(earningsByPartner).length > 0 && (
          <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "16px", padding: "28px", marginBottom: "32px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 20px" }}>This month's payouts</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {Object.entries(earningsByPartner).map(([code, p]) => (
                <div key={code} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", backgroundColor: "#faf8f5", borderRadius: "10px", gap: "16px", flexWrap: "wrap" }}>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#1e1b2e", margin: "0 0 2px" }}>{p.name}</p>
                    <p style={{ fontSize: "12px", color: "#6b6880", margin: 0 }}>{p.email} · Code: {code} · {p.activeReferrals} active {p.activeReferrals === 1 ? "referral" : "referrals"}</p>
                  </div>
                  <span style={{ fontSize: "20px", fontWeight: 600, color: "#166534" }}>${p.monthlyEarnings.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginBottom: "40px" }}>

          {/* Create code */}
          <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "16px", padding: "28px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 20px" }}>Create affiliate code</h2>
            <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ fontSize: "13px", fontWeight: 500, color: "#1e1b2e", display: "block", marginBottom: "5px" }}>Code</label>
                <input value={form.code} onChange={(e) => setForm(p => ({ ...p, code: e.target.value.toUpperCase() }))} required placeholder="e.g. SARAH-OT" style={inputStyle} />
                <p style={{ fontSize: "11px", color: "#6b6880", margin: "4px 0 0" }}>Uppercase, no spaces. Practitioner shares this with clients.</p>
              </div>
              <div>
                <label style={{ fontSize: "13px", fontWeight: 500, color: "#1e1b2e", display: "block", marginBottom: "5px" }}>Partner name</label>
                <input value={form.partner_name} onChange={(e) => setForm(p => ({ ...p, partner_name: e.target.value }))} required placeholder="Sarah Johnson" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: "13px", fontWeight: 500, color: "#1e1b2e", display: "block", marginBottom: "5px" }}>Partner email</label>
                <input type="email" value={form.partner_email} onChange={(e) => setForm(p => ({ ...p, partner_email: e.target.value }))} required placeholder="sarah@example.com" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: "13px", fontWeight: 500, color: "#1e1b2e", display: "block", marginBottom: "5px" }}>Commission %</label>
                <input type="number" min={1} max={50} value={form.commission_percentage} onChange={(e) => setForm(p => ({ ...p, commission_percentage: parseInt(e.target.value) }))} style={inputStyle} />
              </div>
              {error && <p style={{ fontSize: "13px", color: "#b91c1c", margin: 0 }}>{error}</p>}
              {success && <p style={{ fontSize: "13px", color: "#166534", margin: 0 }}>{success}</p>}
              <button type="submit" disabled={saving} style={{ backgroundColor: "#3730a3", color: "white", border: "none", borderRadius: "999px", padding: "12px", fontSize: "14px", fontWeight: 600, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1, fontFamily: "inherit" }}>
                {saving ? "Creating..." : "Create code"}
              </button>
            </form>
          </div>

          {/* Active codes */}
          <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "16px", padding: "28px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 20px" }}>Active codes</h2>
            {loading ? (
              <p style={{ fontSize: "14px", color: "#6b6880" }}>Loading...</p>
            ) : codes.length === 0 ? (
              <p style={{ fontSize: "14px", color: "#6b6880", fontStyle: "italic" }}>No codes yet.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {codes.map((code) => (
                  <div key={code.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", backgroundColor: code.active ? "#f0fdf4" : "#faf8f5", borderRadius: "10px", border: `1px solid ${code.active ? "#bbf7d0" : "#e8e4de"}`, gap: "12px" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: "14px", fontWeight: 700, color: "#1e1b2e", margin: "0 0 2px", fontFamily: "monospace" }}>{code.code}</p>
                      <p style={{ fontSize: "12px", color: "#6b6880", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{code.partner_name} · {code.commission_percentage}%</p>
                    </div>
                    <button onClick={() => toggleActive(code.id, code.active)} style={{ fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "999px", border: "none", cursor: "pointer", backgroundColor: code.active ? "#fef2f2" : "#f0fdf4", color: code.active ? "#b91c1c" : "#166534", fontFamily: "inherit", whiteSpace: "nowrap" }}>
                      {code.active ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Referral history */}
        {referrals.length > 0 && (
          <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "16px", overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f0ede8" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 400, color: "#1e1b2e", margin: 0 }}>Referral history</h2>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Code", "Partner", "Status", "Commission", "Date"].map((h) => (
                    <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b6880", backgroundColor: "#faf8f5", borderBottom: "1px solid #e8e4de" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {referrals.map((r) => (
                  <tr key={r.id}>
                    <td style={{ padding: "12px 16px", fontSize: "13px", fontFamily: "monospace", color: "#1e1b2e", borderBottom: "1px solid #f0ede8" }}>{r.affiliate_codes?.code}</td>
                    <td style={{ padding: "12px 16px", fontSize: "13px", color: "#1e1b2e", borderBottom: "1px solid #f0ede8" }}>{r.affiliate_codes?.partner_name}</td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f0ede8" }}>
                      <span style={{ fontSize: "12px", fontWeight: 600, padding: "3px 8px", borderRadius: "6px", backgroundColor: r.status === "active" ? "#f0fdf4" : "#faf8f5", color: r.status === "active" ? "#166534" : "#6b6880" }}>{r.status}</span>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: "13px", color: "#166534", fontWeight: 600, borderBottom: "1px solid #f0ede8" }}>${((39 * (r.commission_percentage ?? 20)) / 100).toFixed(2)}/mo</td>
                    <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6b6880", borderBottom: "1px solid #f0ede8" }}>{new Date(r.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}