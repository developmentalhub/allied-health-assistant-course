"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ForumPostPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isSubscriber, setIsSubscriber] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        const admin = ["admin", "superadmin"].includes(profile?.role ?? "");
        setIsAdmin(admin);

        if (!admin) {
          const { data: sub } = await supabase
            .from("subscriptions")
            .select("status")
            .eq("user_id", user.id)
            .single();
          setIsSubscriber(["active", "trialing"].includes(sub?.status ?? ""));
        } else {
          setIsSubscriber(true);
        }
      }

      const { data: postData } = await supabase
        .from("forum_posts")
        .select("*")
        .eq("id", id)
        .single();

      if (!postData) { router.push("/forum"); return; }
      setPost(postData);

      const { data: commentData } = await supabase
        .from("forum_comments")
        .select("id, content, created_at, author_id")
        .eq("post_id", id)
        .order("created_at", { ascending: true });

      // Get author names
      if (commentData && commentData.length > 0) {
        const authorIds = [...new Set(commentData.map((c: any) => c.author_id))];
        const { data: profiles } = await supabase
          .from("profiles")
          .select("id, full_name, role")
          .in("id", authorIds);

        const profileMap: Record<string, any> = {};
        (profiles ?? []).forEach((p: any) => { profileMap[p.id] = p; });

        setComments(commentData.map((c: any) => ({
          ...c,
          author: profileMap[c.author_id] ?? { full_name: "Member", role: "parent" },
        })));
      }

      setLoading(false);
    }
    load();
  }, [id]);

  async function handleComment(e: React.FormEvent) {
    e.preventDefault();
    if (!newComment.trim()) return;
    setSubmitting(true);
    setError("");

    const res = await fetch("/api/forum/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post_id: id, content: newComment.trim() }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Something went wrong.");
      setSubmitting(false);
      return;
    }

    setComments((prev) => [...prev, {
      ...data.comment,
      author: { full_name: user?.user_metadata?.full_name ?? "You", role: isAdmin ? "admin" : "parent" },
    }]);
    setNewComment("");
    setSubmitting(false);
  }

  function timeAgo(dateString: string) {
    const diff = Date.now() - new Date(dateString).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#faf8f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#6b6880", fontFamily: "DM Sans, sans-serif" }}>Loading...</p>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 16px", borderRadius: "12px",
    border: "1.5px solid #e8e4de", fontSize: "15px", color: "#1e1b2e",
    outline: "none", boxSizing: "border-box", fontFamily: "inherit",
    backgroundColor: "#faf8f5",
  };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "64px 24px 80px" }}>

        <Link href="/forum" style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "32px" }}>
          ← Back to community
        </Link>

        {/* Post */}
        <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "16px", padding: "36px 40px", marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
            {post.pinned && (
              <span style={{ fontSize: "10px", fontWeight: 700, color: "#c2410c", backgroundColor: "#fff7ed", padding: "2px 8px", borderRadius: "999px", textTransform: "uppercase" as const }}>Pinned</span>
            )}
            {!post.is_free && (
              <span style={{ fontSize: "10px", fontWeight: 700, color: "#3730a3", backgroundColor: "#eef2ff", padding: "2px 8px", borderRadius: "999px", textTransform: "uppercase" as const }}>Members only</span>
            )}
            <span style={{ fontSize: "12px", color: "#6b6880" }}>{timeAgo(post.created_at)}</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 20px", lineHeight: 1.3 }}>
            {post.title}
          </h1>
          <div style={{ fontSize: "15px", color: "#4a4660", lineHeight: 1.8, whiteSpace: "pre-wrap" as const }}>
            {post.content}
          </div>
          <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #f0ede8", display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "28px", height: "28px", backgroundColor: "#3730a3", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "12px", color: "white", fontWeight: 600 }}>R</span>
            </div>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#3730a3" }}>Robyn Papworth</span>
            <span style={{ fontSize: "12px", color: "#6b6880" }}>· Developmental Hub</span>
          </div>
        </div>

        {/* Comments */}
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 20px" }}>
          {comments.length} {comments.length === 1 ? "comment" : "comments"}
        </h2>

        {comments.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
            {comments.map((comment) => {
              const isRobyn = ["admin", "superadmin"].includes(comment.author?.role);
              return (
                <div key={comment.id} style={{ backgroundColor: isRobyn ? "#f5f3ff" : "white", border: `1px solid ${isRobyn ? "#e0e7ff" : "#e8e4de"}`, borderRadius: "12px", padding: "16px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                    <div style={{ width: "28px", height: "28px", backgroundColor: isRobyn ? "#3730a3" : "#e8e4de", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: "12px", color: isRobyn ? "white" : "#6b6880", fontWeight: 600 }}>
                        {(comment.author?.full_name ?? "M")[0].toUpperCase()}
                      </span>
                    </div>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: isRobyn ? "#3730a3" : "#1e1b2e" }}>
                      {isRobyn ? "Robyn Papworth" : (comment.author?.full_name ?? "Member")}
                    </span>
                    {isRobyn && <span style={{ fontSize: "11px", color: "#3730a3", backgroundColor: "#eef2ff", padding: "2px 8px", borderRadius: "999px", fontWeight: 600 }}>Admin</span>}
                    <span style={{ fontSize: "12px", color: "#6b6880", marginLeft: "auto" }}>{timeAgo(comment.created_at)}</span>
                  </div>
                  <p style={{ fontSize: "14px", color: "#4a4660", margin: 0, lineHeight: 1.7, whiteSpace: "pre-wrap" as const }}>
                    {comment.content}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Comment form */}
        {isSubscriber ? (
          <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "16px", padding: "24px" }}>
            <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#1e1b2e", margin: "0 0 16px" }}>Add a comment</h3>
            <form onSubmit={handleComment} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={4}
                placeholder="Share your thoughts, questions, or experiences..."
                style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
              />
              {error && <p style={{ fontSize: "13px", color: "#b91c1c", margin: 0 }}>{error}</p>}
              <button
                type="submit"
                disabled={submitting || !newComment.trim()}
                style={{ alignSelf: "flex-end", backgroundColor: "#3730a3", color: "white", border: "none", borderRadius: "999px", padding: "10px 24px", fontSize: "14px", fontWeight: 600, cursor: submitting || !newComment.trim() ? "not-allowed" : "pointer", opacity: submitting || !newComment.trim() ? 0.6 : 1, fontFamily: "inherit" }}
              >
                {submitting ? "Posting..." : "Post comment"}
              </button>
            </form>
          </div>
        ) : user ? (
          <div style={{ backgroundColor: "#f5f3ff", border: "1px solid #e0e7ff", borderRadius: "14px", padding: "24px", textAlign: "center" }}>
            <p style={{ fontSize: "15px", fontWeight: 600, color: "#3730a3", margin: "0 0 8px" }}>Subscribe to join the conversation</p>
            <p style={{ fontSize: "14px", color: "#6b6880", margin: "0 0 16px" }}>Members can comment on all posts.</p>
            <Link href="/pricing" style={{ backgroundColor: "#3730a3", color: "white", padding: "10px 24px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
              Start membership — $39/month
            </Link>
          </div>
        ) : (
          <div style={{ backgroundColor: "#f5f3ff", border: "1px solid #e0e7ff", borderRadius: "14px", padding: "24px", textAlign: "center" }}>
            <p style={{ fontSize: "15px", fontWeight: 600, color: "#3730a3", margin: "0 0 8px" }}>Sign in to join the conversation</p>
            <p style={{ fontSize: "14px", color: "#6b6880", margin: "0 0 16px" }}>Already a member? Sign in to comment.</p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <Link href="/login" style={{ backgroundColor: "#3730a3", color: "white", padding: "10px 24px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>Sign in</Link>
              <Link href="/pricing" style={{ backgroundColor: "white", color: "#3730a3", padding: "10px 24px", borderRadius: "999px", fontSize: "14px", fontWeight: 500, textDecoration: "none", border: "1px solid #c7d2fe" }}>Start membership</Link>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}