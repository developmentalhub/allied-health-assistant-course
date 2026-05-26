import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import Link from "next/link";

const ACTIVITY_SHEETS = [
  {
    title: "Regulation Before Reading",
    description: "Understand why regulation is the foundation of reading readiness and what you can do at home.",
    category: "School Readiness",
    ageGroup: "3–8 years",
    url: "https://pndihjsqkwbjewlulotg.supabase.co/storage/v1/object/public/public-assets/Regulation%20before%20Reading%20Ebook.pdf",
    free: true,
  },
  {
    title: "Colour Sorting Activity Guide",
    description: "Step-by-step guide for the colour sorting table activity — builds fine motor skills and cognitive development.",
    category: "Hands & Fine Motor",
    ageGroup: "2–5 years",
    url: null,
    free: false,
  },
  {
    title: "Tearing and Cutting Activity Cards",
    description: "Printable activity cards to extend the tearing and cutting video series at home.",
    category: "Hands & Fine Motor",
    ageGroup: "3–6 years",
    url: null,
    free: false,
  },
  {
    title: "Sensory Play Ideas — 30 Activities",
    description: "Thirty sensory play ideas using everyday household items, organised by age and sensory type.",
    category: "Sensory Play",
    ageGroup: "0–6 years",
    url: null,
    free: false,
  },
];

const categoryColors: Record<string, { color: string; bg: string }> = {
  "School Readiness":  { color: "#be185d", bg: "#fdf2f8" },
  "Hands & Fine Motor":{ color: "#1d4ed8", bg: "#eff6ff" },
  "Sensory Play":      { color: "#b45309", bg: "#fffbeb" },
};

export default async function ResourcesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirect=/resources");

  let isSubscriber = false;
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  const isAdmin = ["admin", "superadmin"].includes(profile?.role ?? "");

  if (!isAdmin) {
    const { data: sub } = await supabase.from("subscriptions").select("status").eq("user_id", user.id).single();
    isSubscriber = ["active", "trialing"].includes(sub?.status ?? "");
  } else {
    isSubscriber = true;
  }

  if (!isSubscriber) redirect("/pricing");

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "64px 24px 80px" }}>

        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3730a3", marginBottom: "12px" }}>
          Member resources
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 300, color: "#1e1b2e", margin: "0 0 16px" }}>
          Activity Sheets & Printables
        </h1>
        <p style={{ fontSize: "16px", color: "#6b6880", lineHeight: 1.7, fontWeight: 300, margin: "0 0 48px" }}>
          Download and print these activity sheets to extend the learning from your videos. New resources added every month.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
          {ACTIVITY_SHEETS.map((sheet) => {
            const catStyle = categoryColors[sheet.category] ?? { color: "#6b6880", bg: "#faf8f5" };
            const available = !!sheet.url;

            return (
              <div key={sheet.title} style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "11px", fontWeight: 600, padding: "3px 8px", borderRadius: "6px", backgroundColor: catStyle.bg, color: catStyle.color }}>
                    {sheet.category}
                  </span>
                  <span style={{ fontSize: "11px", color: "#6b6880" }}>{sheet.ageGroup}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: 400, color: "#1e1b2e", margin: 0, lineHeight: 1.4 }}>
                  {sheet.title}
                </h3>
                <p style={{ fontSize: "13px", color: "#6b6880", margin: 0, lineHeight: 1.6, flex: 1 }}>
                  {sheet.description}
                </p>
                {available ? (
                  <a
                    href={sheet.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", backgroundColor: "#3730a3", color: "white", padding: "10px 20px", borderRadius: "999px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Download PDF
                  </a>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", backgroundColor: "#faf8f5", color: "#b0acbf", padding: "10px 20px", borderRadius: "999px", fontSize: "13px", fontWeight: 500 }}>
                    Coming soon
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}