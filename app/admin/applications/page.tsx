import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function AdminApplicationsPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!["admin", "superadmin"].includes(profile?.role)) redirect("/dashboard");

  const { data: applications } = await supabase
    .from("facilitator_applications")
    .select("*")
    .order("created_at", { ascending: false });

  const pending = (applications || []).filter((a: any) => a.status === "pending");
  const approved = (applications || []).filter((a: any) => a.status === "approved");
  const declined = (applications || []).filter((a: any) => a.status === "declined");

  function timeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }

  function ApplicationCard({ app }: { app: any }) {
    return (
      <div style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <p style={{ fontSize: "16px", fontWeight: 600, color: "#1e1b2e", margin: 0 }}>
              {app.full_name}
            </p>
            <span style={{
              fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "999px",
              backgroundColor: app.status === "pending" ? "#fffbeb" : app.status === "approved" ? "#f0fdf4" : "#fef2f2",
              color: app.status === "pending" ? "#92400e" : app.status === "approved" ? "#166534" : "#b91c1c",
            }}>
              {app.status}
            </span>
          </div>
          <p style={{ fontSize: "14px", color: "#6b6880", margin: "0 0 4px 0" }}>
            {app.profession} · {app.location}
          </p>
          <p style={{ fontSize: "13px", color: "#b0acbf", margin: 0 }}>
            {app.email} · Applied {timeAgo(app.created_at)}
          </p>
        </div>
        <Link
          href={`/admin/applications/${app.id}`}
          style={{ fontSize: "13px", fontWeight: 500, color: "#3730a3", textDecoration: "none", padding: "8px 16px", borderRadius: "999px", border: "1px solid #c7d2fe", whiteSpace: "nowrap" }}
        >
          Review application
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 24px 80px" }}>

        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "8px" }}>
          <Link href="/admin" style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Admin
          </Link>
        </div>

        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 300, color: "#1e1b2e", marginBottom: "8px" }}>
            Facilitator Applications
          </h1>
          <p style={{ fontSize: "15px", color: "#6b6880" }}>
            {pending.length} pending · {approved.length} approved · {declined.length} declined
          </p>
        </div>

        {pending.length > 0 && (
          <div style={{ marginBottom: "48px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 300, color: "#1e1b2e", marginBottom: "16px" }}>
              Pending review
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {pending.map((app: any) => <ApplicationCard key={app.id} app={app} />)}
            </div>
          </div>
        )}

        {approved.length > 0 && (
          <div style={{ marginBottom: "48px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 300, color: "#1e1b2e", marginBottom: "16px" }}>
              Approved
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {approved.map((app: any) => <ApplicationCard key={app.id} app={app} />)}
            </div>
          </div>
        )}

        {declined.length > 0 && (
          <div style={{ marginBottom: "48px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 300, color: "#1e1b2e", marginBottom: "16px" }}>
              Declined
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {declined.map((app: any) => <ApplicationCard key={app.id} app={app} />)}
            </div>
          </div>
        )}

        {(!applications || applications.length === 0) && (
          <div style={{ textAlign: "center", padding: "60px 24px", backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de" }}>
            <p style={{ fontSize: "16px", color: "#6b6880" }}>No applications yet.</p>
          </div>
        )}

      </div>
    </div>
  );
}