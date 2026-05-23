import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

const BOOKINGS_OPEN = process.env.BOOKINGS_OPEN === "true";

const categoryMeta: Record<string, { label: string; description: string; color: string; bg: string; border: string }> = {
  "gross-motor":  { label: "Movement & Coordination", description: "Building the physical foundations for confidence, learning, and life.", color: "#c2410c", bg: "#fff7ed", border: "#fed7aa" },
  "fine-motor":   { label: "Fine Motor & Hands",       description: "Hand strength, pencil grip, and the skills schools expect.", color: "#0f766e", bg: "#f0fdfa", border: "#99f6e4" },
  "sensory":      { label: "Sensory Processing",        description: "When the world feels too loud, too bright, or too much.", color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe" },
  "regulation":   { label: "Big Feelings & Regulation", description: "Meltdowns, transitions, and building a settled nervous system.", color: "#b45309", bg: "#fffbeb", border: "#fde68a" },
  "play":         { label: "Play & Learning",            description: "Why play is the most powerful developmental tool you have.", color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" },
  "literacy":     { label: "Literacy & Language",        description: "From first words to reading fluency — the foundations matter.", color: "#166534", bg: "#f0fdf4", border: "#bbf7d0" },
  "social-skills":{ label: "Friendships & Social Skills","description": "Belonging, connection, and navigating the social world.", color: "#be185d", bg: "#fdf2f8", border: "#f9a8d4" },
};

const ageGroups = [
  { value: "0-2", label: "0–2 years", timeSlot: "12pm–2pm AEST", categories: ["gross-motor", "sensory", "regulation", "play", "literacy", "social-skills"] },
  { value: "3-5", label: "3–5 years", timeSlot: "9am–12pm AEST", categories: ["gross-motor", "fine-motor", "sensory", "regulation", "play", "literacy", "social-skills"] },
  { value: "6-8", label: "6–8 years", timeSlot: "4pm–6pm AEST",  categories: ["gross-motor", "fine-motor", "sensory", "regulation", "play", "literacy", "social-skills"] },
];

export default async function SessionsPage({
  searchParams,
}: {
  searchParams: Promise<{ age?: string; category?: string }>;
}) {
  const resolvedParams = await searchParams;
  const currentAge = resolvedParams?.age || "";
  const currentCategory = resolvedParams?.category || "";

  const supabase = await createClient();

  let query = supabase
    .from("sessions")
    .select("id, title, description, age_group, category, session_type, price_cents, minimum_families, capacity, scheduled_at, duration_minutes")
    .eq("status", "scheduled")
    .order("age_group", { ascending: true })
    .order("category", { ascending: true });

  if (currentAge) query = query.eq("age_group", currentAge);
  if (currentCategory) query = query.eq("category", currentCategory);

  const { data: sessions } = await query;

  const filteredAgeGroups = currentAge ? ageGroups.filter((ag) => ag.value === currentAge) : ageGroups;

  function formatCategory(cat: string) {
    return categoryMeta[cat]?.label ?? cat.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  }

  function formatAgeGroup(ag: string) {
    if (ag === "0-2") return "0–2 yrs";
    if (ag === "3-5") return "3–5 yrs";
    if (ag === "6-8") return "6–8 yrs";
    return ag;
  }

  function formatSessionDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-AU", {
      weekday: "short", day: "numeric", month: "long", year: "numeric",
      timeZone: "Australia/Melbourne",
    });
  }

  function formatSessionTime(dateString: string) {
    return new Date(dateString).toLocaleTimeString("en-AU", {
      hour: "2-digit", minute: "2-digit", hour12: true,
      timeZone: "Australia/Melbourne",
    }) + " AEST";
  }

  const tabStyle = (active: boolean): React.CSSProperties => ({
    fontSize: "13px", fontWeight: 500, padding: "8px 16px", borderRadius: "999px",
    border: active ? "1.5px solid #3730a3" : "1px solid #e8e4de",
    color: active ? "#3730a3" : "#6b6880", textDecoration: "none",
    backgroundColor: active ? "#eef2ff" : "white", whiteSpace: "nowrap" as const,
  });

  function filterUrl(params: { age?: string; category?: string }) {
    const p = new URLSearchParams();
    const age = params.age !== undefined ? params.age : currentAge;
    const category = params.category !== undefined ? params.category : currentCategory;
    if (age) p.set("age", age);
    if (category) p.set("category", category);
    const str = p.toString();
    return str ? `/sessions?${str}` : "/sessions";
  }

  // Group sessions by age group then category
  const sessionsByAgeAndCategory: Record<string, Record<string, any[]>> = {};
  (sessions ?? []).forEach((s) => {
    if (!sessionsByAgeAndCategory[s.age_group]) sessionsByAgeAndCategory[s.age_group] = {};
    if (!sessionsByAgeAndCategory[s.age_group][s.category]) sessionsByAgeAndCategory[s.age_group][s.category] = [];
    sessionsByAgeAndCategory[s.age_group][s.category].push(s);
  });

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e" }}>

      {/* Hero */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "60px 24px 32px" }}>
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b6880", marginBottom: "12px" }}>
          Sessions
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "40px", fontWeight: 300, color: "#1e1b2e", marginBottom: "16px" }}>
          Find support for your family
        </h1>
        <p style={{ fontSize: "16px", color: "#6b6880", maxWidth: "540px", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
          Browse sessions by your child's age and the topics that matter most to your family right now. All sessions are live, online, and led by vetted specialists.
        </p>
      </section>

      {/* Register interest banner */}
      {!BOOKINGS_OPEN && (
        <section style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px 32px" }}>
          <div style={{ backgroundColor: "#3730a3", borderRadius: "16px", padding: "24px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
            <div>
              <p style={{ fontSize: "16px", fontWeight: 600, color: "white", margin: "0 0 4px" }}>
                Sessions open for booking end of June 2026
              </p>
              <p style={{ fontSize: "14px", color: "#c7d2fe", margin: 0 }}>
                Tell us what your family needs — we use this to hire the right practitioners and schedule the right sessions.
              </p>
            </div>
            <Link href="/register-interest" style={{ backgroundColor: "white", color: "#3730a3", padding: "12px 24px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" as const, flexShrink: 0 }}>
              Tell us what you need
            </Link>
          </div>
        </section>
      )}

      {/* Age group filter */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px 16px" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <Link href={filterUrl({ age: "", category: "" })} style={tabStyle(currentAge === "")}>All ages</Link>
          {ageGroups.map((ag) => (
            <Link key={ag.value} href={filterUrl({ age: ag.value, category: "" })} style={tabStyle(currentAge === ag.value)}>
              {ag.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Category filter */}
      {currentAge && (
        <section style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px 32px" }}>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Link href={filterUrl({ category: "" })} style={tabStyle(currentCategory === "")}>All categories</Link>
            {ageGroups.find((ag) => ag.value === currentAge)?.categories.map((cat) => (
              <Link key={cat} href={filterUrl({ category: cat })} style={tabStyle(currentCategory === cat)}>
                {categoryMeta[cat]?.label ?? cat}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Sessions content */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px 80px" }}>

        {filteredAgeGroups.map((ag) => {
          const ageSessions = sessionsByAgeAndCategory[ag.value] ?? {};
          const visibleCategories = currentCategory ? [currentCategory] : ag.categories;

          return (
            <div key={ag.value} style={{ marginBottom: "64px" }}>

              {/* Age group header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 4px" }}>
                    {ag.label}
                  </h2>
                  <p style={{ fontSize: "13px", color: "#6b6880", margin: 0 }}>
                    Sessions run {ag.timeSlot}
                  </p>
                </div>
                {!BOOKINGS_OPEN && (
                  <Link href={`/register-interest?age=${ag.value}`} style={{ backgroundColor: "#eef2ff", color: "#3730a3", padding: "8px 18px", borderRadius: "999px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
                    Register interest →
                  </Link>
                )}
              </div>

              {/* Category sections */}
              {visibleCategories.map((cat) => {
                const catSessions = ageSessions[cat] ?? [];
                const meta = categoryMeta[cat];
                if (!meta) return null;

                return (
                  <div key={cat} style={{ marginBottom: "32px" }}>
                    {/* Category header */}
                    <div style={{ backgroundColor: meta.bg, border: `1px solid ${meta.border}`, borderRadius: "12px", padding: "16px 20px", marginBottom: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
                      <div>
                        <p style={{ fontSize: "14px", fontWeight: 600, color: meta.color, margin: "0 0 2px" }}>{meta.label}</p>
                        <p style={{ fontSize: "13px", color: "#6b6880", margin: 0 }}>{meta.description}</p>
                      </div>
                      {!BOOKINGS_OPEN && (
                        <Link href={`/register-interest?age=${ag.value}&category=${cat}`} style={{ fontSize: "13px", fontWeight: 500, color: meta.color, textDecoration: "none", border: `1px solid ${meta.border}`, borderRadius: "999px", padding: "6px 14px", backgroundColor: "white", whiteSpace: "nowrap" as const }}>
                          Register interest
                        </Link>
                      )}
                    </div>

                    {/* Session cards */}
                    {catSessions.length > 0 ? (
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px" }}>
                        {catSessions.map((session) => (
                          <div key={session.id} style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid #e8e4de", padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                              <span style={{ fontSize: "11px", fontWeight: 600, padding: "3px 8px", borderRadius: "6px", backgroundColor: meta.bg, color: meta.color }}>
                                {formatAgeGroup(session.age_group)}
                              </span>
                            </div>
                            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 400, color: "#1e1b2e", margin: 0, lineHeight: 1.4 }}>
                              {session.title}
                            </h3>
                            {session.description && (
                              <p style={{ fontSize: "13px", color: "#6b6880", margin: 0, lineHeight: 1.6 }}>
                                {session.description.length > 120 ? session.description.substring(0, 120) + "..." : session.description}
                              </p>
                            )}
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid #f0ede8", marginTop: "auto" }}>
                              <div>
                                <span style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 300, color: "#1e1b2e" }}>
                                  ${(session.price_cents / 100).toFixed(0)}
                                </span>
                                <span style={{ fontSize: "11px", color: "#6b6880", marginLeft: "4px" }}>per family</span>
                              </div>
                              {BOOKINGS_OPEN ? (
                                <Link href={`/sessions/${session.id}`} style={{ backgroundColor: meta.color, color: "white", padding: "7px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: 500, textDecoration: "none" }}>
                                  Book now
                                </Link>
                              ) : (
                                <Link href={`/register-interest?age=${session.age_group}&category=${session.category}`} style={{ backgroundColor: meta.bg, color: meta.color, padding: "7px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: 500, textDecoration: "none", border: `1px solid ${meta.border}` }}>
                                  Register interest
                                </Link>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ backgroundColor: "white", border: "1px dashed #e8e4de", borderRadius: "12px", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
                        <p style={{ fontSize: "14px", color: "#b0acbf", margin: 0, fontStyle: "italic" }}>
                          Sessions coming soon — register your interest to be notified first
                        </p>
                        {!BOOKINGS_OPEN && (
                          <Link href={`/register-interest?age=${ag.value}&category=${cat}`} style={{ fontSize: "13px", fontWeight: 500, color: "#3730a3", textDecoration: "none", border: "1px solid #c7d2fe", borderRadius: "999px", padding: "6px 14px", backgroundColor: "#eef2ff", whiteSpace: "nowrap" as const }}>
                            Notify me
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}

      </section>
    </main>
  );
}