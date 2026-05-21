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

  const {
    data: { user },
  } = await supabase.auth.getUser();
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

  // ─── Resolve all conditionals BEFORE JSX ────────────────────────────────
  // Never use `>` inside JSX style props — extract to variables first.
  const status: string = app.status ?? "pending";

  const badgeBg =
    status === "approved" ? "#f0fdf4" :
    status === "declined" ? "#fef2f2" :
    "#fffbeb";

  const badgeColor =
    status === "approved" ? "#166534" :
    status === "declined" ? "#b91c1c" :
    "#92400e";

  const isPending = status === "pending";

  // ─── Shared styles ───────────────────────────────────────────────────────
  const fieldLabelStyle: React.CSSProperties = {
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#6b6880",
    margin: "0 0 6px",
  };

  const fieldValueStyle: React.CSSProperties = {
    fontSize: "15px",
    color: "#1e1b2e",
    lineHeight: 1.7,
    margin: 0,
  };

  const sectionStyle: React.CSSProperties = {
    backgroundColor: "white",
    borderRadius: "16px",
    border: "1px solid #e8e4de",
    padding: "32px",
    marginBottom: "24px",
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: "20px",
    fontWeight: 300,
    color: "#1e1b2e",
    margin: "0 0 24px",
  };

  const fieldWrapStyle: React.CSSProperties = { marginBottom: "24px" };

  const badgeStyle: React.CSSProperties = {
    fontSize: "13px",
    fontWeight: 600,
    padding: "6px 16px",
    borderRadius: "999px",
    backgroundColor: badgeBg,
    color: badgeColor,
    textTransform: "capitalize",
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px 80px" }}>

        <Link
          href="/admin/applications"
          style={{
            fontSize: "14px",
            color: "#6b6880",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "32px",
          }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to applications
        </Link>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "32px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "32px",
                fontWeight: 300,
                color: "#1e1b2e",
                margin: "0 0 4px",
              }}
            >
              {app.full_name}
            </h1>
            <p style={{ fontSize: "15px", color: "#6b6880", margin: 0 }}>
              {app.profession} · Applied{" "}
              {new Date(app.created_at).toLocaleDateString("en-AU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Badge — uses pre-resolved variables, no `>` in style prop */}
          <span style={badgeStyle}>{status}</span>
        </div>

        {/* Contact details */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Contact details</h2>
          {app.email && (
            <div style={fieldWrapStyle}>
              <p style={fieldLabelStyle}>Email</p>
              <p style={fieldValueStyle}>{app.email}</p>
            </div>
          )}
          {app.phone && (
            <div style={fieldWrapStyle}>
              <p style={fieldLabelStyle}>Phone</p>
              <p style={fieldValueStyle}>{app.phone}</p>
            </div>
          )}
          {app.location && (
            <div style={fieldWrapStyle}>
              <p style={fieldLabelStyle}>Location</p>
              <p style={fieldValueStyle}>{app.location}</p>
            </div>
          )}
        </div>

        {/* Professional background */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Professional background</h2>
          {app.profession && (
            <div style={fieldWrapStyle}>
              <p style={fieldLabelStyle}>Profession</p>
              <p style={fieldValueStyle}>{app.profession}</p>
            </div>
          )}
          {app.qualifications && (
            <div style={fieldWrapStyle}>
              <p style={fieldLabelStyle}>Qualifications</p>
              <p style={fieldValueStyle}>{app.qualifications}</p>
            </div>
          )}
          {app.areas_of_expertise && (
            <div style={fieldWrapStyle}>
              <p style={fieldLabelStyle}>Areas of expertise</p>
              <p style={fieldValueStyle}>{app.areas_of_expertise}</p>
            </div>
          )}
          {app.years_experience && (
            <div style={fieldWrapStyle}>
              <p style={fieldLabelStyle}>Years of experience</p>
              <p style={fieldValueStyle}>{app.years_experience}</p>
            </div>
          )}
        </div>

        {/* Application questions */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Application questions</h2>
          {app.why_enjoy_families && (
            <div style={fieldWrapStyle}>
              <p style={fieldLabelStyle}>
                What do you enjoy most about working with children and families?
              </p>
              <p style={fieldValueStyle}>{app.why_enjoy_families}</p>
            </div>
          )}
          {app.hobbies && (
            <div style={fieldWrapStyle}>
              <p style={fieldLabelStyle}>Hobbies and interests outside of work</p>
              <p style={fieldValueStyle}>{app.hobbies}</p>
            </div>
          )}
          {app.professional_development && (
            <div style={fieldWrapStyle}>
              <p style={fieldLabelStyle}>
                What would you like to learn more about in your profession?
              </p>
              <p style={fieldValueStyle}>{app.professional_development}</p>
            </div>
          )}
        </div>

        {/* Video */}
        {app.video_link && (
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Video introduction</h2>
            <a
              href={app.video_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "15px", color: "#3730a3", fontWeight: 500 }}
            >
              Watch video
            </a>
          </div>
        )}

        {/* Decision — only shown when pending */}
        {isPending && (
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Decision</h2>
            <p style={{ fontSize: "14px", color: "#6b6880", marginBottom: "24px" }}>
              Approving this application will allow them to complete their facilitator profile.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <a
                href={`/api/applications/${id}/approve`}
                style={{
                  backgroundColor: "#166534",
                  color: "white",
                  padding: "12px 28px",
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Approve application
              </a>
              <a
                href={`/api/applications/${id}/decline`}
                style={{
                  backgroundColor: "white",
                  color: "#b91c1c",
                  padding: "12px 28px",
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: 600,
                  border: "1px solid #fecaca",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Decline
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}