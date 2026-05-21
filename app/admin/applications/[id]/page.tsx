import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!["admin", "superadmin"].includes(profile?.role)) redirect("/dashboard");

  const { data: app } = await supabase
    .from("facilitator_applications")
    .select("*")
    .eq("id", id)
    .single();

  if (!app) redirect("/admin/applications");

  function Field({ label, value }: { label: string; value: string | null }) {
    if (!value) return null;
    return (
      <div style={{ marginBottom: "24px" }}>
        <p style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6b6880", marginBottom: "6px" }}>
          {label}
        </p>
        <p style={{ fontSize: "15px", color: "#1e1b2e", lineHeight: 1.7, margin: 0 }}>
          {value}
        </p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px 80px" }}>

        <Link href="/admin/applications" style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "32px" }}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to applications
        </Link>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 300, color: "#1e1b2e", marginBottom: "4px" }}>
              {app.full_name}
            </h1>
            <p style={{ fontSize: "15px", color: "#6b6880", margin: 0 }}>
              {app.profession} · Applied {new Date(app.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
          <span style={{
            fontSize: "13px", fontWeight: 600, padding: "6px 16px", borderRadius: "999px",
            backgroundColor: app.status === "pending" ? "#fffbeb" : app.status === "approved" ? "#f0fdf4" : "#fef2f2",
            color: app.status === "pending" ? "#92400e" : app.status === "approved" ? "#166534" : "#b91c1c",
          }}>
            {app.status}
          </span>
        </div>

        <div style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "32px", marginBottom: "24px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 300, color: "#1e1b2e", marginBottom: "24px" }}>
            Contact details
          </h2>
          <Field label="Email" value={app.email} />
          <Field label="Phone" value={app.phone} />
          <Field label="Location" value={app.location} />
        </div>

        <div style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "32px", marginBottom: "24px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 300, color: "#1e1b2e", marginBottom: "24px" }}>
            Professional background
          </h2>
          <Field label="Profession" value={app.profession} />
          <Field label="Qualifications" value={app.qualifications} />
          <Field label="Areas of expertise" value={app.areas_of_expertise} />
          <Field label="Years of experience" value={app.years_experience} />
        </div>

        <div style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "32px", marginBottom: "24px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 300, color: "#1e1b2e", marginBottom: "24px" }}>
            Application questions
          </h2>
          <Field label="What do you enjoy most about working with children and families?" value={app.why_enjoy_families} />
          <Field label="Hobbies and interests outside of work" value={app.hobbies} />
          <Field label="What would you like to learn more about in your profession?" value={app.professional_development} />
        </div>

        {app.video_link && (
          <div style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "32px", marginBottom: "24px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 300, color: "#1e1b2e", marginBottom: "16px" }}>
              Video introduction
            </h2>
            
              href={app.video_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "15px", color: "#3730a3", fontWeight: 500 }}
            >
              Watch video →
            </a>
          </div>
        )}

        {app.status === "pending" && (
          <div style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "32px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 300, color: "#1e1b2e", marginBottom: "8px" }}>
              Decision
            </h2>
            <p style={{ fontSize: "14px", color: "#6b6880", marginBottom: "24px" }}>
              Approving this application will send them an email and allow them to complete their facilitator profile.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <form action={`/api/applications/${id}/approve`} method="POST">
                <button
                  type="submit"
                  style={{ backgroundColor: "#166534", color: "white", padding: "12px 28px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, border: "none", cursor: "pointer" }}
                >
                  Approve application
                </button>
              </form>
              <form action={`/api/applications/${id}/decline`} method="POST">
                <button
                  type="submit"
                  style={{ backgroundColor: "white", color: "#b91c1c", padding: "12px 28px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, border: "1px solid #fecaca", cursor: "pointer" }}
                >
                  Decline
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}