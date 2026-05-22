import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminSessionInterestPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!["admin", "superadmin"].includes(profile?.role ?? "")) redirect("/dashboard");

  const { data: entries } = await supabase
    .from("session_interest")
    .select("*")
    .order("created_at", { ascending: false });

  // Group by topic for demand overview
  const topicCounts: Record<string, { count: number; age: string }> = {};
  const ageCounts: Record<string, number> = {};

  entries?.forEach((e) => {
    if (!topicCounts[e.session_topic]) {
      topicCounts[e.session_topic] = { count: 0, age: e.age_group };
    }
    topicCounts[e.session_topic].count++;
    ageCounts[e.age_group] = (ageCounts[e.age_group] || 0) + 1;
  });

  const sortedTopics = Object.entries(topicCounts).sort((a, b) => b[1].count - a[1].count);

  const ageLabels: Record<string, string> = { "0-2": "0–2 years", "3-5": "3–5 years", "6-8": "6–8 years" };
  const ageColors: Record<string, string> = { "0-2": "#7c3aed", "3-5": "#0f766e", "6-8": "#c2410c" };

  const thStyle: React.CSSProperties = { padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b6880", backgroundColor: "#faf8f5", borderBottom: "1px solid #e8e4de" };
  const tdStyle: React.CSSProperties = { padding: "14px 16px", fontSize: "14px", color: "#1e1b2e", borderBottom: "1px solid #f0ede8", verticalAlign: "top" };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#faf8f5", padding: "40px 24px 80px", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        <Link href="/admin" style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "24px" }}>
          ← Back to admin
        </Link>

        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 8px" }}>Session Interest</h1>
        <p style={{ fontSize: "15px", color: "#6b6880", margin: "0 0 40px" }}>
          {entries?.length ?? 0} families have registered interest · Use this to plan which sessions to schedule first.
        </p>

        {/* Age group summary */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px", marginBottom: "32px" }}>
          {Object.entries(ageCounts).sort().map(([age, count]) => (
            <div key={age} style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "12px", padding: "20px 24px" }}>
              <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: ageColors[age] ?? "#6b6880", margin: "0 0 6px" }}>
                {ageLabels[age] ?? age}
              </p>
              <p style={{ fontSize: "28px", fontWeight: 600, color: "#1e1b2e", margin: 0 }}>{count}</p>
            </div>
          ))}
          <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "12px", padding: "20px 24px" }}>
            <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b6880", margin: "0 0 6px" }}>Total</p>
            <p style={{ fontSize: "28px", fontWeight: 600, color: "#1e1b2e", margin: 0 }}>{entries?.length ?? 0}</p>
          </div>
        </div>

        {/* Demand by topic */}
        {sortedTopics.length > 0 && (
          <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "16px", padding: "32px", marginBottom: "32px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 24px" }}>
              Demand by topic
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {sortedTopics.map(([topic, { count, age }]) => {
                const max = sortedTopics[0][1].count;
                const pct = Math.round((count / max) * 100);
                return (
                  <div key={topic}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px", gap: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1, minWidth: 0 }}>
                        <span style={{ fontSize: "11px", fontWeight: 600, padding: "2px 8px", borderRadius: "999px", backgroundColor: "#f5f3ff", color: ageColors[age] ?? "#6b6880", whiteSpace: "nowrap", flexShrink: 0 }}>
                          {ageLabels[age] ?? age}
                        </span>
                        <span style={{ fontSize: "14px", color: "#1e1b2e", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{topic}</span>
                      </div>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#3730a3", whiteSpace: "nowrap", flexShrink: 0 }}>{count} {count === 1 ? "family" : "families"}</span>
                    </div>
                    <div style={{ height: "6px", backgroundColor: "#f0ede8", borderRadius: "999px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, backgroundColor: "#3730a3", borderRadius: "999px" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Full list */}
        <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "16px", overflow: "hidden" }}>
          {!entries || entries.length === 0 ? (
            <div style={{ padding: "60px 24px", textAlign: "center", color: "#6b6880" }}>No registrations yet.</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Name", "Email", "Age group", "Topic", "Time slot", "Day preference", "Date"].map((h) => (
                    <th key={h} style={thStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id}>
                    <td style={tdStyle}>{entry.name}</td>
                    <td style={tdStyle}>
                      <a href={`mailto:${entry.email}`} style={{ color: "#3730a3", textDecoration: "none" }}>{entry.email}</a>
                    </td>
                    <td style={tdStyle}>{ageLabels[entry.age_group] ?? entry.age_group}</td>
                    <td style={{ ...tdStyle, maxWidth: "240px", fontSize: "13px" }}>{entry.session_topic}</td>
                    <td style={tdStyle}>{entry.preferred_time}</td>
                    <td style={tdStyle}>{entry.preferred_days || "—"}</td>
                    <td style={{ ...tdStyle, whiteSpace: "nowrap", fontSize: "13px", color: "#6b6880" }}>
                      {new Date(entry.created_at).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}