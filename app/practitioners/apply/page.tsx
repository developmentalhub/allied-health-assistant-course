"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [profession, setProfession] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [areasOfExpertise, setAreasOfExpertise] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [whyEnjoyFamilies, setWhyEnjoyFamilies] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [professionalDevelopment, setProfessionalDevelopment] = useState("");
  const [videoLink, setVideoLink] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: insertError } = await supabase
      .from("facilitator_applications")
      .insert({
        full_name: fullName,
        email,
        phone,
        location,
        profession,
        qualifications,
        areas_of_expertise: areasOfExpertise,
        years_experience: yearsExperience,
        why_enjoy_families: whyEnjoyFamilies,
        hobbies,
        professional_development: professionalDevelopment,
        video_link: videoLink,
        status: "pending",
      });

    if (insertError) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
          <div style={{ width: "72px", height: "72px", backgroundColor: "#f0fdf4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <svg width="36" height="36" fill="none" stroke="#166534" strokeWidth="2">
              <path d="M6 18l9 9L30 9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 300, color: "#1e1b2e", marginBottom: "16px" }}>
            Application received!
          </h1>
          <p style={{ fontSize: "16px", color: "#6b6880", lineHeight: 1.7, marginBottom: "32px" }}>
            Thank you for applying to join the Developmental Hub practitioner network. We will review your application and be in touch soon.
          </p>
          <Link
            href="/"
            style={{ backgroundColor: "#3730a3", color: "white", padding: "12px 28px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}
          >
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  const inputStyle = {
    width: "100%",
    padding: "10px 16px",
    borderRadius: "12px",
    border: "1px solid #e8e4de",
    fontSize: "14px",
    color: "#1e1b2e",
    outline: "none",
    boxSizing: "border-box" as const,
    fontFamily: "inherit",
    backgroundColor: "white",
  };

  const labelStyle = {
    fontSize: "14px",
    fontWeight: 500 as const,
    color: "#1e1b2e",
  };

  const fieldStyle = {
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: "6px",
  };

  const hintStyle = {
    fontSize: "12px",
    color: "#6b6880",
  };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }}>

      <section style={{ maxWidth: "640px", margin: "0 auto", padding: "60px 24px 40px", textAlign: "center" }}>
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b6880", marginBottom: "16px" }}>
          Apply to facilitate
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "40px", fontWeight: 300, color: "#1e1b2e", lineHeight: 1.2, marginBottom: "16px" }}>
          Join our practitioner network
        </h1>
        <p style={{ fontSize: "16px", color: "#6b6880", lineHeight: 1.7, fontWeight: 300 }}>
          Fill in the form below and our team will review your application within 48 hours.
        </p>
      </section>

      <section style={{ maxWidth: "640px", margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "40px 48px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

            {/* Section: Basic info */}
            <div>
              <p style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#3730a3", marginBottom: "20px" }}>
                About you
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                <div style={fieldStyle}>
                  <label style={labelStyle}>Full name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Dr. Jane Smith"
                    required
                    style={inputStyle}
                  />
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    required
                    style={inputStyle}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Phone number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="04xx xxx xxx"
                      style={inputStyle}
                    />
                  </div>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Melbourne, VIC"
                      style={inputStyle}
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Section: Professional details */}
            <div style={{ borderTop: "1px solid #f0eee9", paddingTop: "28px" }}>
              <p style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#3730a3", marginBottom: "20px" }}>
                Professional background
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                <div style={fieldStyle}>
                  <label style={labelStyle}>Profession</label>
                  <input
                    type="text"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    placeholder="e.g. Occupational Therapist, Speech Pathologist"
                    required
                    style={inputStyle}
                  />
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>Qualifications</label>
                  <input
                    type="text"
                    value={qualifications}
                    onChange={(e) => setQualifications(e.target.value)}
                    placeholder="e.g. Masters of Occupational Therapy, University of Melbourne"
                    required
                    style={inputStyle}
                  />
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>Areas of expertise</label>
                  <input
                    type="text"
                    value={areasOfExpertise}
                    onChange={(e) => setAreasOfExpertise(e.target.value)}
                    placeholder="e.g. Sensory processing, fine motor skills, autism support"
                    required
                    style={inputStyle}
                  />
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>Years of experience working with children and families</label>
                  <select
                    value={yearsExperience}
                    onChange={(e) => setYearsExperience(e.target.value)}
                    required
                    style={{ ...inputStyle, backgroundColor: "white" }}
                  >
                    <option value="">Select...</option>
                    <option value="1-2">1–2 years</option>
                    <option value="3-5">3–5 years</option>
                    <option value="6-10">6–10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>

              </div>
            </div>

            {/* Section: Three questions */}
            <div style={{ borderTop: "1px solid #f0eee9", paddingTop: "28px" }}>
              <p style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#3730a3", marginBottom: "4px" }}>
                Tell us more
              </p>
              <p style={{ fontSize: "13px", color: "#6b6880", marginBottom: "20px" }}>
                These questions help us understand who you are beyond your qualifications.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                <div style={fieldStyle}>
                  <label style={labelStyle}>What do you enjoy most about working with children and families?</label>
                  <p style={hintStyle}>Tell us what drives you and what moments you find most rewarding.</p>
                  <textarea
                    value={whyEnjoyFamilies}
                    onChange={(e) => setWhyEnjoyFamilies(e.target.value)}
                    placeholder="Share what lights you up about this work..."
                    rows={4}
                    required
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>What are your hobbies and interests outside of work?</label>
                  <p style={hintStyle}>We want to know the whole you — our families love connecting with real humans!</p>
                  <textarea
                    value={hobbies}
                    onChange={(e) => setHobbies(e.target.value)}
                    placeholder="e.g. I love hiking, I'm learning to make sourdough, I have two dogs..."
                    rows={3}
                    required
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>What would you like to learn more about in your profession?</label>
                  <p style={hintStyle}>We value practitioners who are curious and always growing.</p>
                  <textarea
                    value={professionalDevelopment}
                    onChange={(e) => setProfessionalDevelopment(e.target.value)}
                    placeholder="e.g. I'm really interested in learning more about..."
                    rows={3}
                    required
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>

              </div>
            </div>

            {/* Section: Video */}
            <div style={{ borderTop: "1px solid #f0eee9", paddingTop: "28px" }}>
              <p style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#3730a3", marginBottom: "4px" }}>
                Video introduction
              </p>
              <p style={{ fontSize: "13px", color: "#6b6880", marginBottom: "20px" }}>
                We'd love to see how you present on camera. Record a 1–2 minute video introducing yourself and paste the link below. You can use Loom (free at loom.com), YouTube, or any video sharing platform.
              </p>
              <div style={fieldStyle}>
                <label style={labelStyle}>Video link</label>
                <input
                  type="url"
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                  placeholder="https://www.loom.com/share/..."
                  style={inputStyle}
                />
              </div>
            </div>

            {error && (
              <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", fontSize: "14px", padding: "12px 16px", borderRadius: "12px" }}>
                {error}
              </div>
            )}

            <div style={{ backgroundColor: "#f5f3ff", borderRadius: "12px", padding: "16px 20px", border: "1px solid #ddd6fe" }}>
              <p style={{ fontSize: "13px", color: "#4c1d95", margin: 0, lineHeight: 1.6 }}>
                By submitting this application you confirm that all information provided is accurate. If approved, you will be asked to provide insurance certificates, professional registration details, and a Working With Children check before facilitating any sessions.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", backgroundColor: "#3730a3", color: "white", padding: "14px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1 }}
            >
              {loading ? "Submitting..." : "Submit application"}
            </button>

          </form>

          <p style={{ textAlign: "center", fontSize: "13px", color: "#6b6880", marginTop: "24px" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#3730a3", fontWeight: 500 }}>
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}