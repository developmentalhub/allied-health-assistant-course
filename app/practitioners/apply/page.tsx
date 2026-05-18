import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function ApplyPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }}>
      <Navbar />

      <section style={{ maxWidth: "640px", margin: "0 auto", padding: "80px 24px 40px", textAlign: "center" }}>
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
          <form style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>Full name</label>
              <input
                type="text"
                placeholder="Dr. Jane Smith"
                style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>Email address</label>
              <input
                type="email"
                placeholder="jane@example.com"
                style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>Profession</label>
              <input
                type="text"
                placeholder="e.g. Occupational Therapist"
                style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>Qualifications</label>
              <input
                type="text"
                placeholder="e.g. Masters of Occupational Therapy"
                style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>Areas of expertise</label>
              <input
                type="text"
                placeholder="e.g. Sensory processing, fine motor skills"
                style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>Tell us about yourself</label>
              <textarea
                placeholder="A brief overview of your experience working with families and children..."
                rows={4}
                style={{ width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid #e8e4de", fontSize: "14px", color: "#1e1b2e", outline: "none", boxSizing: "border-box", resize: "vertical", fontFamily: "inherit" }}
              />
            </div>

            <button
              type="submit"
              style={{ marginTop: "8px", width: "100%", backgroundColor: "#3730a3", color: "white", padding: "14px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, border: "none", cursor: "pointer" }}
            >
              Submit application
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