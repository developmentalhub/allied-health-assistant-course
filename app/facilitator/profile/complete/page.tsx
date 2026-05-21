"use client";

import { useState, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  bio: string;
  wwc_number: string;
  wwc_expiry: string;
  insurance_provider: string;
  insurance_expiry: string;
  registration_number: string;
  registration_expiry: string;
  abn: string;
}

export default function CompleteProfilePage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormData>({
    bio: "",
    wwc_number: "",
    wwc_expiry: "",
    insurance_provider: "",
    insurance_expiry: "",
    registration_number: "",
    registration_expiry: "",
    abn: "",
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
        setTimeout(() => router.push("/dashboard"), 2000);
      } catch {
        setError("Network error. Please try again.");
      }
    });
  }

  const pageStyle: React.CSSProperties = { minHeight: "100vh", backgroundColor: "#faf8f5", padding: "48px 24px 100px", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e" };
  const innerStyle: React.CSSProperties = { maxWidth: "680px", margin: "0 auto" };
  const eyebrowStyle: React.CSSProperties = { fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#3730a3", marginBottom: "12px" };
  const h1Style: React.CSSProperties = { fontFamily: "var(--font-display), Fraunces, Georgia, serif", fontSize: "36px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 8px", lineHeight: 1.2 };
  const subtitleStyle: React.CSSProperties = { fontSize: "16px", color: "#6b6880", margin: "0 0 48px", lineHeight: 1.6 };
  const cardStyle: React.CSSProperties = { backgroundColor: "#ffffff", border: "1px solid #e8e4de", borderRadius: "16px", padding: "32px", marginBottom: "24px" };
  const sectionTitleStyle: React.CSSProperties = { fontFamily: "var(--font-display), Fraunces, Georgia, serif", fontSize: "18px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 4px" };
  const sectionSubStyle: React.CSSProperties = { fontSize: "13px", color: "#6b6880", margin: "0 0 24px" };
  const dividerStyle: React.CSSProperties = { border: "none", borderTop: "1px solid #f0ede8", margin: "0 0 24px" };
  const fieldStyle: React.CSSProperties = { marginBottom: "20px" };
  const labelStyle: React.CSSProperties = { display: "block", fontSize: "13px", fontWeight: 600, color: "#1e1b2e", marginBottom: "6px" };
  const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 14px", fontSize: "15px", border: "1.5px solid #e8e4de", borderRadius: "10px", backgroundColor: "#faf8f5", color: "#1e1b2e", fontFamily: "inherit", boxSizing: "border-box", outline: "none" };
  const textareaStyle: React.CSSProperties = { ...inputStyle, resize: "vertical", minHeight: "120px", lineHeight: 1.6 };
  const rowStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" };
  const submitBtnStyle: React.CSSProperties = { width: "100%", padding: "14px", backgroundColor: "#3730a3", color: "#ffffff", border: "none", borderRadius: "12px", fontSize: "15px", fontWeight: 600, cursor: isPending ? "not-allowed" : "pointer", opacity: isPending ? 0.7 : 1, fontFamily: "inherit" };
  const errorStyle: React.CSSProperties = { backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "12px 16px", fontSize: "14px", color: "#b91c1c", marginBottom: "20px" };
  const successStyle: React.CSSProperties = { backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "16px 20px", fontSize: "15px", color: "#166534", fontWeight: 500, textAlign: "center", marginBottom: "20px" };
  const requiredStyle: React.CSSProperties = { color: "#b91c1c", marginLeft: "2px" };

  if (success) {
    return (
      <div style={pageStyle}>
        <div style={innerStyle}>
          <div style={successStyle}>✓ Profile saved! Redirecting you to your dashboard…</div>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={innerStyle}>
        <p style={eyebrowStyle}>Welcome to Developmental Hub</p>
        <h1 style={h1Style}>Complete your profile</h1>
        <p style={subtitleStyle}>
          Before you can host sessions, we need a few details. This information
          helps families trust you and keeps everyone compliant.
        </p>

        <form onSubmit={handleSubmit}>

          {/* Photo & Bio */}
          <div style={cardStyle}>
            <h2 style={sectionTitleStyle}>About you</h2>
            <p style={sectionSubStyle}>Families will see this on your public profile.</p>
            <hr style={dividerStyle} />
            <div style={fieldStyle}>
              <label style={labelStyle}>Profile photo</label>
              <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                <div style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "#f0ede8", border: "2px solid #e8e4de", overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} onClick={() => fileInputRef.current?.click()}>
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
                  <button type="button" style={{ display: "inline-block", padding: "9px 20px", backgroundColor: "#ffffff", border: "1.5px solid #e8e4de", borderRadius: "999px", fontSize: "13px", fontWeight: 600, color: "#1e1b2e", cursor: "pointer", fontFamily: "inherit" }} onClick={() => fileInputRef.current?.click()}>
                    {photoPreview ? "Change photo" : "Upload photo"}
                  </button>
                  <p style={{ fontSize: "12px", color: "#6b6880", marginTop: "6px" }}>JPG or PNG, max 5MB. Square crop works best.</p>
                </div>
              </div>
              <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" style={{ display: "none" }} onChange={handlePhotoChange} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Bio <span style={requiredStyle}>*</span></label>
              <textarea name="bio" value={form.bio} onChange={handleChange} required placeholder="Tell families a little about yourself — your background, approach, and what you love about working with children…" style={textareaStyle} />
            </div>
          </div>

          {/* WWC */}
          <div style={cardStyle}>
            <h2 style={sectionTitleStyle}>Working with Children Check</h2>
            <p style={sectionSubStyle}>Required for all facilitators on the platform.</p>
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
            <p style={sectionSubStyle}>You must hold current insurance to host sessions.</p>
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

          {/* Professional Registration + ABN */}
          <div style={cardStyle}>
            <h2 style={sectionTitleStyle}>Professional registration</h2>
            <p style={sectionSubStyle}>AHPRA, Speech Pathology Australia, or equivalent body.</p>
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
            <div style={fieldStyle}>
              <label style={labelStyle}>ABN <span style={requiredStyle}>*</span></label>
              <input name="abn" value={form.abn} onChange={handleChange} required placeholder="e.g. 12 345 678 901" style={inputStyle} />
            </div>
          </div>

          {error && <div style={errorStyle}>{error}</div>}
          <button type="submit" style={submitBtnStyle} disabled={isPending}>
            {isPending ? "Saving…" : "Save and continue →"}
          </button>
          <p style={{ fontSize: "13px", color: "#6b6880", textAlign: "center", marginTop: "16px" }}>
            Your compliance details are private and only visible to Developmental Hub admins.
          </p>
        </form>
      </div>
    </div>
  );
}