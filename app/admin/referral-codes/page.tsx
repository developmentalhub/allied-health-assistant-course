"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface ReferralCode {
  id: string;
  code: string;
  partner_name: string;
  partner_email: string;
  partner_share_percentage: number;
  owner_share_percentage: number;
  active: boolean;
  created_at: string;
  booking_count?: number;
  total_revenue?: number;
  partner_earnings?: number;
}

export default function ReferralCodesPage() {
  const router = useRouter();
  const [codes, setCodes] = useState<ReferralCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    code: "",
    partner_name: "",
    partner_email: "",
    partner_share_percentage: 70,
  });

  useEffect(() => {
    checkAuthAndLoad();
  }, []);

  async function checkAuthAndLoad() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!["admin", "superadmin"].includes(profile?.role ?? "")) {
      router.push("/dashboard");
      return;
    }

    await loadCodes();
  }

  async function loadCodes() {
    setLoading(true);

    const { data: codesData } = await supabase
      .from("referral_codes")
      .select("*")
      .order("created_at", { ascending: false });

    if (!codesData) { setLoading(false); return; }

    // For each code, count bookings and total revenue attributed to it
    const enriched = await Promise.all(
      codesData.map(async (code: ReferralCode) => {
        const { data: bookings } = await supabase
          .from("bookings")
          .select("amount_cents, partner_share_cents, status")
          .eq("attributed_to", code.code)
          .eq("status", "confirmed");

        const bookingCount = bookings?.length ?? 0;
        const totalRevenue = bookings?.reduce((sum: number, b: { amount_cents: number }) => sum + (b.amount_cents ?? 0), 0) ?? 0;
        const partnerEarnings = bookings?.reduce((sum: number, b: { partner_share_cents: number }) => sum + (b.partner_share_cents ?? 0), 0) ?? 0;

        return { ...code, booking_count: bookingCount, total_revenue: totalRevenue, partner_earnings: partnerEarnings };
      })
    );

    setCodes(enriched);
    setLoading(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.name === "partner_share_percentage"
      ? Math.min(100, Math.max(0, parseInt(e.target.value) || 0))
      : e.target.name === "code"
        ? e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "")
        : e.target.value;
    setForm((prev) => ({ ...prev, [e.target.name]: val }));
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const { error: insertError } = await supabase
      .from("referral_codes")
      .insert({
        code: form.code,
        partner_name: form.partner_name,
        partner_email: form.partner_email,
        partner_share_percentage: form.partner_share_percentage,
        owner_share_percentage: 100 - form.partner_share_percentage,
        active: true,
      });

    if (insertError) {
      setError(insertError.message.includes("unique") ? "That code already exists. Choose a different one." : insertError.message);
      setSaving(false);
      return;
    }

    setSuccess(`Code ${form.code} created successfully.`);
    setForm({ code: "", partner_name: "", partner_email: "", partner_share_percentage: 70 });
    setShowForm(false);
    setSaving(false);
    await loadCodes();
  }

  async function toggleActive(id: string, current: boolean) {
    await supabase.from("referral_codes").update({ active: !current }).eq("id", id);
    await loadCodes();
  }

  // ─── Styles ───────────────────────────────────────────────────────────────
  const pageStyle: React.CSSProperties = { minHeight: "100vh", backgroundColor: "#faf8f5", padding: "40px 24px 80px", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e" };
  const innerStyle: React.CSSProperties = { maxWidth: "1000px", margin: "0 auto" };
  const cardStyle: React.CSSProperties = { backgroundColor: "#ffffff", border: "1px solid #e8e4de", borderRadius: "16px", padding: "32px", marginBottom: "24px" };
  const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 14px", fontSize: "14px", border: "1.5px solid #e8e4de", borderRadius: "10px", backgroundColor: "#faf8f5", color: "#1e1b2e", fontFamily: "inherit", boxSizing: "border-box", outline: "none" };
  const labelStyle: React.CSSProperties = { display: "block", fontSize: "13px", fontWeight: 600, color: "#1e1b2e", marginBottom: "6px" };
  const rowStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" };
  const thStyle: React.CSSProperties = { padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b6880", backgroundColor: "#faf8f5", borderBottom: "1px solid #e8e4de" };
  const tdStyle: React.CSSProperties = { padding: "14px 16px", fontSize: "14px", color: "#1e1b2e", borderBottom: "1px solid #f0ede8", verticalAlign: "middle" };

  return (
    <div style={pageStyle}>
      <div style={innerStyle}>

        <Link href="/admin" style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "24px" }}>
          ← Back to admin
        </Link>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-display), Fraunces, Georgia, serif", fontSize: "32px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 8px" }}>
              Referral codes
            </h1>
            <p style={{ fontSize: "15px", color: "#6b6880", margin: 0 }}>
              Manage partner referral codes and track revenue splits.
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{ backgroundColor: "#3730a3", color: "white", border: "none", borderRadius: "999px", padding: "10px 24px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
          >
            {showForm ? "Cancel" : "+ New code"}
          </button>
        </div>

        {/* How it works */}
        <div style={{ ...cardStyle, backgroundColor: "#f5f3ff", border: "1px solid #e0e7ff", marginBottom: "32px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 600, color: "#3730a3", margin: "0 0 12px" }}>How revenue splits work</h2>
          <p style={{ fontSize: "13px", color: "#4a4660", lineHeight: 1.7, margin: 0 }}>
            When a family books using a referral code, the facilitator&apos;s flat fee ($175) is deducted first.
            The remaining profit is split between the partner and you based on the percentages below.
            If no referral code is used, you keep 100% of the profit after the facilitator fee.
          </p>
        </div>

        {/* Create form */}
        {showForm && (
          <div style={cardStyle}>
            <h2 style={{ fontFamily: "var(--font-display), Fraunces, Georgia, serif", fontSize: "20px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 24px" }}>
              Create new referral code
            </h2>
            <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={rowStyle}>
                <div>
                  <label style={labelStyle}>Code</label>
                  <input name="code" value={form.code} onChange={handleChange} required placeholder="e.g. JESSICASV" style={{ ...inputStyle, fontFamily: "monospace", fontSize: "16px", letterSpacing: "0.05em", fontWeight: 600 }} />
                  <p style={{ fontSize: "11px", color: "#6b6880", marginTop: "4px" }}>Letters and numbers only, auto-uppercased</p>
                </div>
                <div>
                  <label style={labelStyle}>Partner share %</label>
                  <input name="partner_share_percentage" type="number" min={1} max={99} value={form.partner_share_percentage} onChange={handleChange} required style={inputStyle} />
                  <p style={{ fontSize: "11px", color: "#6b6880", marginTop: "4px" }}>
                    You receive {100 - form.partner_share_percentage}% · Partner receives {form.partner_share_percentage}%
                  </p>
                </div>
              </div>
              <div style={rowStyle}>
                <div>
                  <label style={labelStyle}>Partner name</label>
                  <input name="partner_name" value={form.partner_name} onChange={handleChange} required placeholder="e.g. Jessica Smith" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Partner email</label>
                  <input name="partner_email" type="email" value={form.partner_email} onChange={handleChange} required placeholder="e.g. jessica@example.com" style={inputStyle} />
                </div>
              </div>

              {error && <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "12px 16px", fontSize: "14px", color: "#b91c1c" }}>{error}</div>}

              <button type="submit" disabled={saving} style={{ alignSelf: "flex-start", backgroundColor: "#3730a3", color: "white", border: "none", borderRadius: "999px", padding: "10px 28px", fontSize: "14px", fontWeight: 600, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1, fontFamily: "inherit" }}>
                {saving ? "Creating…" : "Create code"}
              </button>
            </form>
          </div>
        )}

        {success && (
          <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "12px 16px", fontSize: "14px", color: "#166534", marginBottom: "24px" }}>
            ✓ {success}
          </div>
        )}

        {/* Codes table */}
        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e8e4de", borderRadius: "16px", overflow: "hidden" }}>
          {loading ? (
            <div style={{ padding: "48px 24px", textAlign: "center", color: "#6b6880" }}>Loading…</div>
          ) : codes.length === 0 ? (
            <div style={{ padding: "48px 24px", textAlign: "center", color: "#6b6880" }}>
              No referral codes yet. Create your first one above.
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Code", "Partner", "Split", "Bookings", "Revenue", "Partner earns", "Status", ""].map((h) => (
                    <th key={h} style={thStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {codes.map((code) => (
                  <tr key={code.id}>
                    <td style={tdStyle}>
                      <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: "15px", letterSpacing: "0.05em", color: "#3730a3" }}>
                        {code.code}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      <span style={{ fontWeight: 500 }}>{code.partner_name}</span>
                      <span style={{ display: "block", fontSize: "12px", color: "#6b6880" }}>{code.partner_email}</span>
                    </td>
                    <td style={tdStyle}>
                      <span style={{ fontSize: "13px" }}>
                        You {code.owner_share_percentage}% · Partner {code.partner_share_percentage}%
                      </span>
                    </td>
                    <td style={tdStyle}>{code.booking_count ?? 0}</td>
                    <td style={tdStyle}>${((code.total_revenue ?? 0) / 100).toFixed(2)}</td>
                    <td style={tdStyle}>${((code.partner_earnings ?? 0) / 100).toFixed(2)}</td>
                    <td style={tdStyle}>
                      <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: "999px", fontSize: "12px", fontWeight: 600, backgroundColor: code.active ? "#f0fdf4" : "#f5f5f5", color: code.active ? "#166534" : "#6b6880" }}>
                        {code.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      <button
                        onClick={() => toggleActive(code.id, code.active)}
                        style={{ fontSize: "12px", color: code.active ? "#b91c1c" : "#166534", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontWeight: 500 }}
                      >
                        {code.active ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}