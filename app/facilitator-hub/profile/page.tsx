"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function FacilitatorProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [qualifications, setQualifications] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login?redirect=/facilitator-hub/profile");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();

      const { data: facilitatorProfile } = await supabase
        .from("facilitator_profiles")
        .select("*")
        .eq("profile_id", user.id)
        .single();

      if (profile) setFullName(profile.full_name || "");
      if (facilitatorProfile) {
        setBio(facilitatorProfile.bio || "");
        setSpeciality(facilitatorProfile.speciality || "");
        setQualifications(facilitatorProfile.qualifications || "");
      }

      setLoading(false);
    }

    loadProfile();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from("profiles")
      .update({ full_name: fullName })
      .eq("id", user.id);

    const { error: upsertError } = await supabase
      .from("facilitator_profiles")
      .upsert({
        profile_id: user.id,
        bio,
        speciality,
      }, { onConflict: "profile_id" });

    if (upsertError) {
      setError("Something went wrong saving your profile. Please try again.");
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }

    setSaving(false);
  }

  if (loading) {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }}>
        <Navbar />
        <div style={{ maxWidth: "640px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
          <p style={{ color: "#6b6880" }}>Loading your profile...</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }}>
      <Navbar />

      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Back link */}
        <Link
          href="/facilitator-hub"
          style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "32px" }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Facilitator Hub
        </Link>

        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 300, color: "#1e1b2e", marginBottom: "8px" }}>
          My Profile
        </h1>
        <p style={{ fontSize: "15px", color: "#6b6880", marginBottom: "40px" }}>
          This information is shown to families when you run sessions.
        </p>

        <div style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "40px 48px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>Full name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Dr. Jane Smith"
                style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>Speciality</label>
              <input
                type="text"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                placeholder="e.g. Occupational Therapy, Sensory Processing"
                style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell families about your background and approach..."
                rows={5}
                style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box", resize: "vertical", fontFamily: "inherit" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>
                Qualifications
              </label>
              <textarea
                value={qualifications}
                onChange={(e) => setQualifications(e.target.value)}
                placeholder="List your qualifications, registrations, and credentials..."
                rows={3}
                style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box", resize: "vertical", fontFamily: "inherit" }}
              />
            </div>

            {error && (
              <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", fontSize: "14px", padding: "12px 16px", borderRadius: "12px" }}>
                {error}
              </div>
            )}

            {saved && (
              <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", color: "#166534", fontSize: "14px", padding: "12px 16px", borderRadius: "12px" }}>
                Profile saved successfully!
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              style={{ marginTop: "8px", width: "100%", backgroundColor: "#3730a3", color: "white", padding: "12px", borderRadius: "999px", fontSize: "14px", fontWeight: 500, border: "none", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.6 : 1 }}
            >
              {saving ? "Saving..." : "Save profile"}
            </button>

          </form>
        </div>

      </div>
    </main>
  );
}