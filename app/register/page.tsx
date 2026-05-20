"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Registration() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    parentName: "",
    email: "",
    password: "",
    partnerCode: "", // Critical for Jess's 70/30 split
    childName: "",
    childAge: "",
    primaryConcern: "Gross Motor Skills"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // In a real app, we save to the database here
      console.log("Saving User:", formData);
      router.push("/dashboard");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    fontSize: "1rem",
    marginTop: "8px"
  };

  const labelStyle = {
    fontSize: "0.85rem",
    fontWeight: "bold",
    color: "#475569",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px"
  };

  return (
    <div style={{ backgroundColor: "#faf8f5", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", fontFamily: "var(--font-sans)" }}>
      <div style={{ backgroundColor: "white", maxWidth: "500px", width: "100%", padding: "40px", borderRadius: "28px", boxShadow: "0 15px 50px rgba(0,0,0,0.05)", border: "1px solid #f1f5f9" }}>
        
        <header style={{ textAlign: "center", marginBottom: "35px" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "15px" }}>🌱</div>
          <h1 style={{ fontFamily: "var(--font-display)", color: "#1e1b2e", fontSize: "1.8rem", marginBottom: "8px" }}>Create your account</h1>
          <p style={{ color: "#64748b", fontSize: "0.95rem" }}>Step {step} of 2: {step === 1 ? "Your Details" : "Child's Details"}</p>
        </header>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          {step === 1 ? (
            <>
              <div>
                <label style={labelStyle}>Your Full Name</label>
                <input required type="text" style={inputStyle} placeholder="Robyn Papworth"
                  onChange={(e) => setFormData({...formData, parentName: e.target.value})} />
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input required type="email" style={inputStyle} placeholder="hello@example.com"
                  onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              <div>
                <label style={labelStyle}>Referral Code (Optional)</label>
                <input type="text" style={{...inputStyle, textTransform: "uppercase"}} placeholder="e.g. JESS70"
                  onChange={(e) => setFormData({...formData, partnerCode: e.target.value})} />
                <p style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "8px" }}>If you were referred by Jess, enter her code here.</p>
              </div>
              <button type="submit" style={{ backgroundColor: "#3730a3", color: "white", padding: "16px", borderRadius: "14px", border: "none", fontWeight: "bold", cursor: "pointer", fontSize: "1rem" }}>
                Next: Child Details
              </button>
            </>
          ) : (
            <>
              <div>
                <label style={labelStyle}>Child's Name</label>
                <input required type="text" style={inputStyle} placeholder="Name"
                  onChange={(e) => setFormData({...formData, childName: e.target.value})} />
              </div>
              <div>
                <label style={labelStyle}>Child's Age</label>
                <input required type="text" style={inputStyle} placeholder="e.g. 4 years old"
                  onChange={(e) => setFormData({...formData, childAge: e.target.value})} />
              </div>
              <div>
                <label style={labelStyle}>Main Developmental Focus</label>
                <select style={{...inputStyle, backgroundColor: "white"}} onChange={(e) => setFormData({...formData, primaryConcern: e.target.value})}>
                  <option>Gross Motor Skills</option>
                  <option>Fine Motor Skills</option>
                  <option>Sensory & Regulation</option>
                  <option>Literacy Foundations</option>
                  <option>Vagus Nerve Support</option>
                </select>
              </div>
              <button type="submit" style={{ backgroundColor: "#16a34a", color: "white", padding: "16px", borderRadius: "14px", border: "none", fontWeight: "bold", cursor: "pointer", fontSize: "1rem" }}>
                Complete Registration
              </button>
              <button type="button" onClick={() => setStep(1)} style={{ backgroundColor: "transparent", color: "#64748b", border: "none", cursor: "pointer", fontSize: "0.9rem" }}>
                Back to Your Details
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
