"use client";

import { useState, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";

interface FacilitatorProfile {
  id: string;
  user_id: string;
  email: string;
  bio: string | null;
  photo_url: string | null;
  wwc_number: string | null;
  wwc_expiry: string | null;
  insurance_provider: string | null;
  insurance_expiry: string | null;
  registration_number: string | null;
  registration_expiry: string | null;
  profile_complete: boolean;
}

interface Props {
  existing: FacilitatorProfile | null;
}

export default function EditProfileForm({ existing }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(existing?.photo_url ?? null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    bio: existing?.bio ?? "",
    wwc_number: existing?.wwc_number ?? "",
    wwc_expiry: existing?.wwc_expiry ?? "",
    insurance_provider: existing?.insurance_provider ?? "",
    insurance_expiry: existing?.insurance_expiry ?? "",
    registration_number: existing?.registration_number ?? "",
    registration_expiry: existing?.registration_expiry ?? "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    if (photoFile) data.append("photo", photoFile);

    startTransition(async () => {
      try {
        const res = await fetch("/api/facilitator/complete-profile", {
          method: "POST",
          body: data,
        });
        const json = await res.json();
        if (!res.ok) {
          setError(json.error ?? "Something went wrong. Please try again.");
          return;
        }
        setSuccess(true);
        setTimeout(() => router.push("/facilitator-hub"), 1500);
      } catch {
        setError("Network error. Please try again.");
      }
    });
  }

  // ─── Styles ───────────────────────────────────────────────────────────────

  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    backgroundColor: "#faf8f5",
    padding: "48px 24px 100px",
    fontFamily: "DM Sans, sans-serif",
    color: "#1e1b2e",
  };

  const innerStyle: React.CSSProperties = {
    maxWidth: "680px",
    margin: "0 auto",
  };

  const backStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "14px",
    color: "#6b6880",
    textDecoration: "none",
    marginBottom: "32px",
  };

  const h1Style: React.CSSProperties = {
    fontFamily: "var(--font-display), Fraunces, Georgia, serif",
    fontSize: "32px",
    fontWeight: 300,
    color: "#1e1b2e",
    margin: "0 0 8px",
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: "15px",
    color: "#6b6880",
    margin: "0 0 40px",
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    border: "1px solid #e8e4de",
    borderRadius: "16px",
    padding: "32px",
    marginBottom: "24px",
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontFamily: "var(--font-display), Fraunces, Georgia, serif",
    fontSize: "18px",
    fontWeight: 400,
    color: "#1e1b2e",
    margin: "0 0 4px",
  };

  const sectionSubStyle: React.CSSProperties = {
    fontSize: "13px",
    color: "#6b6880",
    margin: "0 0 24px",
  };

  const dividerStyle: React.CSSProperties = {
    border: "none",
    borderTop: "1px solid #f0ede8",
    margin: "0 0 24px",
  };

  const fieldStyle: React.CSSProperties = { marginBottom: "20px" };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "13px",
    fontWeight: 600,
    color: "#1e1b2e",
    marginBottom: "6px",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    fontSize: "15px",
    border: "1.5px solid #e8e4de",
    borderRadius: "10px",
    backgroundColor: "#faf8f5",
    color: "#1e1b2e",
    fontFamily: "inherit",
    boxSizing: "border-box",
    outline: "none",
  };

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    resize: "vertical",
    minHeight: "120px",
    lineHeight: 1.6,
  };

  const rowStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  };

  const submitBtnStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px",
    backgroundColor: "#3730a3",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: 600,
    cursor: isPending ? "not-allowed" : "pointer",
    opacity: isPending ? 0.7 : 1,
    fontFamily: "inherit",
  };

  const errorStyle: React.CSSProperties = {
    backgroundColor: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: "10px",
    padding: "12px 16px",
    fontSize: "14px",
    color: "#b91c1c",
    marginBottom: "20px",
  };

  const successStyle: React.CSSProperties = {
    backgroundColor: "#f0fdf4",
    border: "1px solid #bbf7d0",
    borderRadius: "10px",
    padding: "16px 20px",
    fontSize: "15px",
    color: "#166534",
    fontWeight: 500,
    textAlign: "center",
    marginBottom: "20px",
  };

  const requiredStyle: React.CSSProperties = { color: "#b91c1c", marginLeft: "2px" };

  if (success) {
    return (
      <div style={pageStyle}>
        <div style={innerStyle}>
          <div style={successStyle}>✓ Profile updated! Redirecting…</div>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={innerStyle}>
        <a href="/facilitator-hub" style={backStyle}>← Back to Facilitator Hub</a>
        <h1 style={h1Style}>Edit your profile</h1>
        <p style={subtitleStyle}>Changes are saved immediately and visible on the directory.</p>

        <form onSubmit={handleSubmit}>

          {/* Photo & Bio */}
          <div style={cardStyle}>
            <h2 style={sectionTitleStyle}>About you</h2>
            <p style={sectionSubStyle}>Families will see this on the directory.</p>
            <hr style={dividerStyle} />

            {/* Photo */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Profile photo</label>
              <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                <div
                  style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "#f0ede8", border: "2px solid #e8e4de", overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <svg width="28" height="28" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  )}
                </div>
                <div>
                  <button
                    type="button"
                    style={{ display: "inline-block", padding: "9px 20px", backgroundColor: "#ffffff", border: "1.5px solid #e8e4de", borderRadius: "999px", fontSize: "13px", fontWeight: 600, color: "#1e1b2e", cursor: "pointer", fontFamily: "inherit" }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {photoPreview ? "Change photo" : "Upload photo"}
                  </button>
                  <p style={{ fontSize: "12px", color: "#6b6880", marginTop: "6px" }}>JPG or PNG, max 5MB.</p>
                </div>
              </div>
              <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" style={{ display: "none" }} onChange={handlePhotoChange} />
            </div>

            {/* Bio */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Bio <span style={requiredStyle}>*</span></label>
              <textarea name="bio" value={form.bio} onChange={handleChange} required placeholder="Tell families about your background and approach…" style={textareaStyle} />
            </div>
          </div>

          {/* WWC */}
          <div style={cardStyle}>
            <h2 style={sectionTitleStyle}>Working with Children Check</h2>
            <p style={sectionSubStyle}>Required for all facilitators.</p>
            <hr style={dividerStyle} />
            <div style={rowStyle}>
              <div style={fieldStyle}>
                <label style={labelStyle}>WWC number <span style={requiredStyle}>*</span></label>
                <input name="wwc_number" value={form.wwc_number} onChange={handleChange} required placeholder="e.g. WWC0123456" style={inputStyle} />
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Expiry date <span style={requiredStyle}>*</span></label>
                <input name="wwc_expiry" type="date" value={form.wwc_expiry} onChange={handleChange} required style={inputStyle} />
              </div>
            </div>
          </div>

          {/* Insurance */}
          <div style={cardStyle}>
            <h2 style={sectionTitleStyle}>Professional indemnity insurance</h2>
            <p style={sectionSubStyle}>Must be current to host sessions.</p>
            <hr style={dividerStyle} />
            <div style={rowStyle}>
              <div style={fieldStyle}>
                <label style={labelStyle}>Insurance provider <span style={requiredStyle}>*</span></label>
                <input name="insurance_provider" value={form.insurance_provider} onChange={handleChange} required placeholder="e.g. Aon, Guild Insurance" style={inputStyle} />
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Expiry date <span style={requiredStyle}>*</span></label>
                <input name="insurance_expiry" type="date" value={form.insurance_expiry} onChange={handleChange} required style={inputStyle} />
              </div>
            </div>
          </div>

          {/* Registration */}
          <div style={cardStyle}>
            <h2 style={sectionTitleStyle}>Professional registration</h2>
            <p style={sectionSubStyle}>AHPRA, Speech Pathology Australia, or equivalent.</p>
            <hr style={dividerStyle} />
            <div style={rowStyle}>
              <div style={fieldStyle}>
                <label style={labelStyle}>Registration number <span style={requiredStyle}>*</span></label>
                <input name="registration_number" value={form.registration_number} onChange={handleChange} required placeholder="e.g. PSY0001234" style={inputStyle} />
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Expiry date <span style={requiredStyle}>*</span></label>
                <input name="registration_expiry" type="date" value={form.registration_expiry} onChange={handleChange} required style={inputStyle} />
              </div>
            </div>
          </div>

          {error && <div style={errorStyle}>{error}</div>}

          <button type="submit" style={submitBtnStyle} disabled={isPending}>
            {isPending ? "Saving…" : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
}