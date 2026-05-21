import { createClient } from "@/lib/supabase-server";

export const revalidate = 3600;

export default async function PractitionerDirectoryPage() {
  const supabase = await createClient();

  const { data: profiles } = await supabase
    .from("facilitator_profiles")
    .select("id, user_id, email, bio, photo_url, profile_complete")
    .eq("profile_complete", true);

  const enriched = await Promise.all(
    (profiles ?? []).map(async (profile) => {
      const { data: app } = await supabase
        .from("facilitator_applications")
        .select("full_name, profession, areas_of_expertise")
        .eq("email", profile.email)
        .eq("status", "approved")
        .single();

      return {
        ...profile,
        full_name: app?.full_name ?? profile.email,
        profession: app?.profession ?? null,
        areas_of_expertise: app?.areas_of_expertise ?? null,
      };
    })
  );

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e" }}>

      {/* Hero */}
      <section style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e8e4de", padding: "64px 24px 56px", textAlign: "center" }}>
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#3730a3", marginBottom: "12px" }}>
          Our specialists
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 300, color: "#1e1b2e", margin: "0 0 16px", lineHeight: 1.15 }}>
          Meet the people behind your sessions
        </h1>
        <p style={{ fontSize: "17px", color: "#6b6880", maxWidth: "520px", margin: "0 auto", lineHeight: 1.6, fontWeight: 300 }}>
          Every practitioner on Developmental Hub is vetted, qualified, and passionate about supporting children and families.
        </p>
      </section>

      {/* Directory */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "56px 24px 100px" }}>
        {enriched.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 24px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 300, color: "#1e1b2e", marginBottom: "8px" }}>
              Practitioners coming soon
            </h2>
            <p style={{ fontSize: "15px", color: "#6b6880", margin: 0 }}>
              We&apos;re onboarding our first cohort of specialists right now. Check back soon.
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "28px" }}>
            {enriched.map((p) => {
              const tags = p.areas_of_expertise
                ? p.areas_of_expertise.split(/[,\n]+/).map((t: string) => t.trim()).filter(Boolean).slice(0, 5)
                : [];

              return (
                <div key={p.id} style={{ backgroundColor: "#ffffff", border: "1px solid #e8e4de", borderRadius: "20px", padding: "32px", display: "flex", flexDirection: "column" }}>

                  {/* Avatar */}
                  <div style={{ width: "72px", height: "72px", borderRadius: "50%", backgroundColor: "#f0ede8", border: "2px solid #e8e4de", overflow: "hidden", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {p.photo_url ? (
                      <img src={p.photo_url} alt={p.full_name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <svg width="28" height="28" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    )}
                  </div>

                  {/* Name & profession */}
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 4px" }}>
                    {p.full_name}
                  </h2>
                  {p.profession && (
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#3730a3", margin: "0 0 16px", letterSpacing: "0.02em" }}>
                      {p.profession}
                    </p>
                  )}

                  <hr style={{ border: "none", borderTop: "1px solid #f0ede8", margin: "0 0 16px" }} />

                  {/* Bio */}
                  {p.bio && (
                    <p style={{ fontSize: "14px", color: "#4a4660", lineHeight: 1.7, margin: "0 0 16px", display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {p.bio}
                    </p>
                  )}

                  {/* Expertise tags */}
                  {tags.length > 0 && (
                    <div style={{ marginTop: "auto" }}>
                      <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b6880", marginBottom: "8px" }}>
                        Areas of expertise
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {tags.map((tag: string) => (
                          <span key={tag} style={{ fontSize: "12px", fontWeight: 500, color: "#3730a3", backgroundColor: "#eef2ff", borderRadius: "999px", padding: "4px 12px" }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

    </main>
  );
}