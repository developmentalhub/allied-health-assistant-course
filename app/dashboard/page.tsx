import Navbar from "@/components/Navbar";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function ParentDashboard() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirect=/dashboard");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const { data: children } = await supabase
    .from("children")
    .select("*")
    .eq("parent_id", user.id);

  const childIds = (children || []).map((c: any) => c.id);

  const { data: actionItems } = childIds.length > 0
    ? await supabase
        .from("action_items")
        .select("*, children(full_name)")
        .in("child_id", childIds)
        .eq("is_completed", false)
        .order("created_at", { ascending: false })
    : { data: [] };

  const { data: sessionNotes } = childIds.length > 0
    ? await supabase
        .from("session_notes")
        .select("*, children(full_name)")
        .in("child_id", childIds)
        .order("created_at", { ascending: false })
        .limit(5)
    : { data: [] };

  const displayName = profile?.full_name || user.email || "Family";

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }}>
      <Navbar />

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 300, color: "#1e1b2e", marginBottom: "8px" }}>
            Welcome back, {displayName}
          </h1>
          <p style={{ fontSize: "15px", color: "#6b6880" }}>
            Here is what is happening for your family.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginBottom: "40px" }}>

          {/* Action items */}
          <div style={{ backgroundColor: "white", borderRadius: "20px", border: "1px solid #e8e4de", padding: "28px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 400, color: "#3730a3", marginBottom: "20px" }}>
              Action Items
            </h2>
            {!actionItems || actionItems.length === 0 ? (
              <p style={{ fontSize: "14px", color: "#6b6880", fontStyle: "italic" }}>
                No action items yet. These will appear here after your sessions.
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {actionItems.map((item: any) => (
                  <div key={item.id} style={{ backgroundColor: "#f5f3ff", borderRadius: "12px", padding: "14px 16px", borderLeft: "4px solid #3730a3" }}>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#1e1b2e", margin: "0 0 4px 0" }}>
                      {item.title}
                    </p>
                    {item.description && (
                      <p style={{ fontSize: "13px", color: "#6b6880", margin: "0 0 6px 0", lineHeight: 1.6 }}>
                        {item.description}
                      </p>
                    )}
                    <p style={{ fontSize: "12px", color: "#b0acbf", margin: 0 }}>
                      For {item.children?.full_name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Children profiles */}
          <div style={{ backgroundColor: "white", borderRadius: "20px", border: "1px solid #e8e4de", padding: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 400, color: "#0f766e", margin: 0 }}>
                My Children
              </h2>
              <Link
                href="/dashboard/children/add"
                style={{ fontSize: "13px", fontWeight: 500, color: "#0f766e", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}
              >
                + Add child
              </Link>
            </div>
            {!children || children.length === 0 ? (
              <div>
                <p style={{ fontSize: "14px", color: "#6b6880", marginBottom: "16px" }}>
                  Add your child's profile so practitioners can personalise your sessions.
                </p>
                <Link
                  href="/dashboard/children/add"
                  style={{ display: "inline-block", backgroundColor: "#0f766e", color: "white", padding: "10px 20px", borderRadius: "999px", fontSize: "13px", fontWeight: 500, textDecoration: "none" }}
                >
                  Add your first child
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {children.map((child: any) => (
                  <Link
                    key={child.id}
                    href={`/dashboard/children/${child.id}`}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#f0fdfa", borderRadius: "12px", padding: "14px 16px", textDecoration: "none", border: "1px solid #99f6e4" }}
                  >
                    <div>
                      <p style={{ fontSize: "15px", fontWeight: 500, color: "#1e1b2e", margin: "0 0 2px 0" }}>
                        {child.full_name}
                      </p>
                      {child.date_of_birth && (
                        <p style={{ fontSize: "12px", color: "#6b6880", margin: 0 }}>
                          DOB: {new Date(child.date_of_birth).toLocaleDateString("en-AU")}
                        </p>
                      )}
                    </div>
                    <svg width="14" height="14" fill="none" stroke="#0f766e" strokeWidth="2">
                      <path d="M4 7h6M7 4l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Recent session notes */}
        {sessionNotes && sessionNotes.length > 0 && (
          <div style={{ marginBottom: "40px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 300, color: "#1e1b2e", marginBottom: "20px" }}>
              Recent Session Notes
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {sessionNotes.map((note: any) => (
                <div key={note.id} style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "20px 24px" }}>
                  <p style={{ fontSize: "14px", color: "#1e1b2e", lineHeight: 1.7, margin: "0 0 8px 0" }}>
                    {note.note}
                  </p>
                  <p style={{ fontSize: "12px", color: "#b0acbf", margin: 0 }}>
                    {note.children?.full_name} · {new Date(note.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resource library */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 300, color: "#1e1b2e" }}>
              Resource Library
            </h2>
            <Link href="/resources" style={{ color: "#3730a3", fontWeight: 500, textDecoration: "none", fontSize: "14px" }}>
              View all resources
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px" }}>
            {["Gross Motor", "Sensory", "Literacy"].map(cat => (
              <div key={cat} style={{ backgroundColor: "white", padding: "20px", borderRadius: "16px", border: "1px solid #e8e4de", textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "10px" }}>📄</div>
                <span style={{ fontWeight: 600, fontSize: "13px", color: "#475569" }}>{cat} Packs</span>
              </div>
            ))}
          </div>
        </div>

        {/* Browse sessions CTA */}
        <div style={{ backgroundColor: "#3730a3", borderRadius: "24px", padding: "32px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 300, color: "white", marginBottom: "12px" }}>
            Ready to book your next session?
          </h2>
          <p style={{ fontSize: "15px", color: "#c7d2fe", marginBottom: "24px", fontWeight: 300 }}>
            Browse upcoming small group sessions and webinars.
          </p>
          <Link
            href="/sessions"
            style={{ backgroundColor: "white", color: "#3730a3", padding: "12px 28px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none", display: "inline-block" }}
          >
            Browse sessions
          </Link>
        </div>

      </div>
    </main>
  );
}