import { createClient } from "@/lib/supabase-server";
import Link from "next/link";

export default async function ForumPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Check if subscriber or admin
  let isSubscriber = false;
  let isAdmin = false;

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    isAdmin = ["admin", "superadmin"].includes(profile?.role ?? "");

    if (!isAdmin) {
      const { data: sub } = await supabase
        .from("subscriptions")
        .select("status")
        .eq("user_id", user.id)
        .single();
      isSubscriber = ["active", "trialing"].includes(sub?.status ?? "");
    } else {
      isSubscriber = true;
    }
  }

  // Fetch posts — free posts for everyone, all posts for subscribers/admins
  const { data: posts } = await supabase
    .from("forum_posts")
    .select("id, title, content, is_free, pinned, created_at")
    .order("pinned", { ascending: false })
    .order("created_at", { ascending: false });

  // Get comment counts
  const { data: commentCounts } = await supabase
    .from("forum_comments")
    .select("post_id");

  const countMap: Record<string, number> = {};
  (commentCounts ?? []).forEach((c: any) => {
    countMap[c.post_id] = (countMap[c.post_id] ?? 0) + 1;
  });

  function timeAgo(dateString: string) {
    const diff = Date.now() - new Date(dateString).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "64px 24px 80px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "40px", gap: "16px", flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3730a3", marginBottom: "8px" }}>Community</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 8px" }}>
              Resources & Discussion
            </h1>
            <p style={{ fontSize: "15px", color: "#6b6880", margin: 0 }}>
              Free resources, activity ideas, and community discussion from Robyn and the Developmental Hub family.
            </p>
          </div>
          {isAdmin && (
            <Link href="/admin/forum" style={{ backgroundColor: "#3730a3", color: "white", padding: "10px 20px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" as const, flexShrink: 0 }}>
              + New post
            </Link>
          )}
        </div>

        {/* Subscriber prompt */}
        {!isSubscriber && !isAdmin && (
          <div style={{ backgroundColor: "#f5f3ff", border: "1px solid #e0e7ff", borderRadius: "14px", padding: "20px 24px", marginBottom: "32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
            <div>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#3730a3", margin: "0 0 4px" }}>Subscribe to join the conversation</p>
              <p style={{ fontSize: "13px", color: "#6b6880", margin: 0 }}>Members can comment on all posts and access subscriber-only resources.</p>
            </div>
            <Link href="/pricing" style={{ backgroundColor: "#3730a3", color: "white", padding: "8px 18px", borderRadius: "999px", fontSize: "13px", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" as const, flexShrink: 0 }}>
              Start membership
            </Link>
          </div>
        )}

        {/* Posts */}
        {!posts || posts.length === 0 ? (
          <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "16px", padding: "60px 24px", textAlign: "center" }}>
            <p style={{ fontSize: "16px", color: "#6b6880", marginBottom: "8px" }}>No posts yet.</p>
            <p style={{ fontSize: "14px", color: "#b0acbf" }}>Check back soon — Robyn will be posting resources and activities here.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {(posts as any[]).map((post) => {
              const isLocked = !post.is_free && !isSubscriber;
              const comments = countMap[post.id] ?? 0;

              return (
                <Link
                  key={post.id}
                  href={isLocked ? "/pricing" : `/forum/${post.id}`}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "14px", padding: "20px 24px", display: "flex", alignItems: "center", gap: "16px", opacity: isLocked ? 0.85 : 1 }}>

                    {/* Lock or free icon */}
                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: isLocked ? "#faf8f5" : post.is_free ? "#f0fdf4" : "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {isLocked ? (
                        <svg width="16" height="16" fill="none" stroke="#6b6880" strokeWidth="2" viewBox="0 0 24 24">
                          <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                        </svg>
                      ) : post.is_free ? (
                        <svg width="16" height="16" fill="none" stroke="#166534" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/><path d="M12 8v4l3 3" strokeLinecap="round"/>
                        </svg>
                      ) : (
                        <svg width="16" height="16" fill="none" stroke="#3730a3" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      )}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
                        {post.pinned && (
                          <span style={{ fontSize: "10px", fontWeight: 700, color: "#c2410c", backgroundColor: "#fff7ed", padding: "2px 8px", borderRadius: "999px", textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>
                            Pinned
                          </span>
                        )}
                        {!post.is_free && (
                          <span style={{ fontSize: "10px", fontWeight: 700, color: "#3730a3", backgroundColor: "#eef2ff", padding: "2px 8px", borderRadius: "999px", textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>
                            Members only
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: "15px", fontWeight: 600, color: isLocked ? "#6b6880" : "#1e1b2e", margin: "0 0 4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>
                        {post.title}
                      </p>
                      <p style={{ fontSize: "13px", color: "#6b6880", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>
                        {isLocked ? "Subscribe to read this post" : post.content.substring(0, 100) + (post.content.length > 100 ? "..." : "")}
                      </p>
                    </div>

                    {/* Meta */}
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <p style={{ fontSize: "12px", color: "#6b6880", margin: "0 0 4px" }}>{timeAgo(post.created_at)}</p>
                      <p style={{ fontSize: "12px", color: "#b0acbf", margin: 0 }}>{comments} {comments === 1 ? "comment" : "comments"}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}