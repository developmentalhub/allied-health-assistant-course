import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import Link from "next/link";

const BUNNY_LIBRARY_ID = "669194";
const BUNNY_CDN_HOST = "vz-a3bb3c8f-93b.b-cdn.net"; // update with your CDN hostname from Bunny

// Hardcoded videos for now — we'll make this dynamic once you upload more
const VIDEOS = [
  {
    id: "fine-motor-tearing",
    title: "Fine Motor Skills — Tearing Line Strips",
    description: "A follow-along activity helping children develop hand strength and precision through tearing along lines.",
    category: "Hands & Fine Motor",
    ageGroup: "3-5",
    bunnyId: "", // add Bunny video ID here once uploaded
    thumbnail: "",
    duration: "8 min",
  },
  {
    id: "fine-motor-cutting-demo",
    title: "Tearing and Cutting Sorting Activity — Demonstration",
    description: "Watch how to set up and run the tearing and cutting sorting activity with your child.",
    category: "Hands & Fine Motor",
    ageGroup: "3-5",
    bunnyId: "",
    thumbnail: "",
    duration: "12 min",
  },
  {
    id: "fine-motor-cutting-explanation",
    title: "Tearing and Cutting — Explanation After Demonstration",
    description: "Robyn explains the developmental purpose behind the activity and what to look for.",
    category: "Hands & Fine Motor",
    ageGroup: "3-5",
    bunnyId: "",
    thumbnail: "",
    duration: "6 min",
  },
];

const CATEGORIES = [
  "All",
  "Follow Along Activities",
  "Baby & Tummy Time",
  "Movement & Balance",
  "Hands & Fine Motor",
  "Sensory Play",
  "Speech & Language",
  "School Readiness",
];

const categoryColors: Record<string, { color: string; bg: string }> = {
  "Follow Along Activities": { color: "#7c3aed", bg: "#f5f3ff" },
  "Baby & Tummy Time":       { color: "#0f766e", bg: "#f0fdfa" },
  "Movement & Balance":      { color: "#c2410c", bg: "#fff7ed" },
  "Hands & Fine Motor":      { color: "#1d4ed8", bg: "#eff6ff" },
  "Sensory Play":            { color: "#b45309", bg: "#fffbeb" },
  "Speech & Language":       { color: "#166534", bg: "#f0fdf4" },
  "School Readiness":        { color: "#be185d", bg: "#fdf2f8" },
};

export default async function VideosPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirect=/videos");

  // Check subscription
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("user_id", user.id)
    .single();

  const isSubscribed = sub?.status === "active" || sub?.status === "trialing";

  if (!isSubscribed) redirect("/pricing");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const firstName = profile?.full_name?.split(" ")[0] ?? "there";

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 8px" }}>
            Welcome back, {firstName}
          </h1>
          <p style={{ fontSize: "15px", color: "#6b6880", margin: 0 }}>
            Your video library — watch anything, anytime.
          </p>
        </div>

        {/* Category filters */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "40px" }}>
          {CATEGORIES.map((cat) => (
            <span key={cat} style={{ fontSize: "13px", fontWeight: 500, padding: "7px 16px", borderRadius: "999px", border: cat === "All" ? "1.5px solid #3730a3" : "1px solid #e8e4de", color: cat === "All" ? "#3730a3" : "#6b6880", backgroundColor: cat === "All" ? "#eef2ff" : "white", cursor: "pointer" }}>
              {cat}
            </span>
          ))}
        </div>

        {/* Video grid */}
        {VIDEOS.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 24px", backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de" }}>
            <p style={{ fontSize: "16px", color: "#6b6880", marginBottom: "8px" }}>Videos coming very soon.</p>
            <p style={{ fontSize: "14px", color: "#b0acbf" }}>We're uploading your first content now. Check back shortly.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
            {VIDEOS.map((video) => {
              const catStyle = categoryColors[video.category] ?? { color: "#6b6880", bg: "#faf8f5" };
              return (
                <Link key={video.id} href={`/videos/${video.id}`} style={{ textDecoration: "none", display: "block" }}>
                  <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "16px", overflow: "hidden", transition: "box-shadow 0.2s" }}>
                    {/* Thumbnail */}
                    <div style={{ aspectRatio: "16/9", backgroundColor: "#1e1b2e", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                      <div style={{ width: "48px", height: "48px", backgroundColor: "rgba(255,255,255,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                      <span style={{ position: "absolute", bottom: "10px", right: "10px", backgroundColor: "rgba(0,0,0,0.7)", color: "white", fontSize: "12px", padding: "2px 8px", borderRadius: "4px" }}>
                        {video.duration}
                      </span>
                    </div>
                    {/* Info */}
                    <div style={{ padding: "18px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 600, padding: "3px 8px", borderRadius: "6px", backgroundColor: catStyle.bg, color: catStyle.color }}>
                          {video.category}
                        </span>
                        <span style={{ fontSize: "11px", color: "#6b6880" }}>Ages {video.ageGroup}</span>
                      </div>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 8px", lineHeight: 1.4 }}>
                        {video.title}
                      </h3>
                      <p style={{ fontSize: "13px", color: "#6b6880", margin: 0, lineHeight: 1.5 }}>
                        {video.description.length > 90 ? video.description.substring(0, 90) + "..." : video.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Monthly Q&A banner */}
        <div style={{ marginTop: "64px", backgroundColor: "#3730a3", borderRadius: "20px", padding: "40px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#a5b4fc", margin: "0 0 8px" }}>Monthly live session</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 300, color: "white", margin: "0 0 8px" }}>
              Live Q&A with Robyn
            </h2>
            <p style={{ fontSize: "14px", color: "#c7d2fe", margin: 0, lineHeight: 1.6 }}>
              Join Robyn live each month to ask questions about your child's development. Replays available for subscribers.
            </p>
          </div>
          <Link href="/qanda" style={{ backgroundColor: "white", color: "#3730a3", padding: "12px 28px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" as const, flexShrink: 0 }}>
            View schedule
          </Link>
        </div>

      </div>
    </main>
  );
}