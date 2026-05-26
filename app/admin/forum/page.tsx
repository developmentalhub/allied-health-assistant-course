"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminForumPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", content: "", is_free: true, pinned: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/forum/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Something went wrong.");
      setLoading(false);
      return;
    }

    router.push("/forum");
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 16px", borderRadius: "12px",
    border: "1.5px solid #e8e4de", fontSize: "15px", color: "#1e1b2e",
    outline: "none", boxSizing: "border-box", fontFamily: "inherit",
    backgroundColor: "#faf8f5",
  };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "64px 24px 80px" }}>

        <Link href="/forum" style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "32px" }}>
          ← Back to forum
        </Link>

        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 8px" }}>
          New post
        </h1>
        <p style={{ fontSize: "15px", color: "#6b6880", margin: "0 0 40px" }}>
          Share a resource, activity idea, or discussion prompt with the community.
        </p>

        <div style={{ backgroundColor: "white", border: "1px solid #e8e4de", borderRadius: "16px", padding: "40px" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>Title</label>
              <input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. 5 tummy time tips for reluctant babies" style={inputStyle} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e" }}>Content</label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                required
                rows={10}
                placeholder="Write your post here — you can share tips, resources, links, activity ideas..."
                style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }}
              />
            </div>

            {/* Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={form.is_free}
                  onChange={(e) => setForm((prev) => ({ ...prev, is_free: e.target.checked }))}
                  style={{ width: "18px", height: "18px", accentColor: "#3730a3" }}
                />
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e", margin: 0 }}>Free post</p>
                  <p style={{ fontSize: "12px", color: "#6b6880", margin: 0 }}>Visible to everyone — great for attracting new members</p>
                </div>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={form.pinned}
                  onChange={(e) => setForm((prev) => ({ ...prev, pinned: e.target.checked }))}
                  style={{ width: "18px", height: "18px", accentColor: "#3730a3" }}
                />
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 500, color: "#1e1b2e", margin: 0 }}>Pin this post</p>
                  <p style={{ fontSize: "12px", color: "#6b6880", margin: 0 }}>Pinned posts appear at the top of the forum</p>
                </div>
              </label>
            </div>

            {error && (
              <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "12px 16px", fontSize: "14px", color: "#b91c1c" }}>
                {error}
              </div>
            )}

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                type="submit"
                disabled={loading}
                style={{ flex: 1, backgroundColor: "#3730a3", color: "white", border: "none", borderRadius: "999px", padding: "14px", fontSize: "15px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, fontFamily: "inherit" }}
              >
                {loading ? "Publishing..." : "Publish post"}
              </button>
              <Link href="/forum" style={{ padding: "14px 24px", borderRadius: "999px", border: "1px solid #e8e4de", fontSize: "15px", color: "#6b6880", textDecoration: "none", textAlign: "center" }}>
                Cancel
              </Link>
            </div>

          </form>
        </div>
      </div>
    </main>
  );
}