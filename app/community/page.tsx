"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

type Reply = {
  id: string;
  post_id: string;
  author: string;
  body: string;
  created_at: string;
};

type Post = {
  id: string;
  author: string;
  body: string;
  pinned: boolean;
  created_at: string;
  community_replies: Reply[];
};

export default function CommunityPage() {
  const supabase = createClient();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [postDraft, setPostDraft] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setName(localStorage.getItem("aha_name") || "");
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (name) localStorage.setItem("aha_name", name);
  }, [name]);

  async function fetchPosts() {
    setLoading(true);
    const { data } = await supabase
      .from("community_posts")
      .select("*, community_replies(*)")
      .order("pinned", { ascending: false })
      .order("created_at", { ascending: false });
    const rows = (data || []) as Post[];
    rows.forEach((p) =>
      p.community_replies?.sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
    );
    setPosts(rows);
    setLoading(false);
  }

  async function submitReply(postId: string) {
    const text = (replyDrafts[postId] || "").trim();
    if (!text) return;
    if (!name.trim()) return alert("Add your first name so we know who's replying.");
    setBusy(true);
    await supabase.from("community_replies").insert({
      post_id: postId,
      author: name.trim(),
      body: text,
      status: "approved",
    });
    setReplyDrafts((d) => ({ ...d, [postId]: "" }));
    await fetchPosts();
    setBusy(false);
  }

  async function submitPost() {
    if (!postDraft.trim()) return;
    if (!name.trim()) return alert("Add your first name first.");
    setBusy(true);
    await supabase.from("community_posts").insert({
      author: name.trim(),
      body: postDraft.trim(),
      pinned: false,
    });
    setPostDraft("");
    await fetchPosts();
    setBusy(false);
  }

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8">
          <Link href="/" className="text-sm font-semibold text-[#0f766e] hover:underline">
            ← Back to academy
          </Link>
        </div>

        <div className="mb-10 rounded-3xl border border-[#e8e4de] bg-white p-8 md:p-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
            Community
          </p>
          <h1 className="mb-5 text-4xl font-bold md:text-5xl">AHA Community Hub</h1>
          <p className="max-w-3xl text-base leading-relaxed text-[#6b6880]">
            A space for Allied Health Assistants to connect, ask questions, and steady
            each other through the change.
          </p>
        </div>

        <div className="mb-6 rounded-3xl border border-[#e8e4de] bg-white p-6">
          <label className="mb-2 block text-sm font-semibold">Your first name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Sam"
            className="w-full max-w-sm rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-3 text-sm outline-none focus:border-[#0f766e]"
          />
        </div>

        <div className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-6">
          <label className="mb-3 block text-sm font-semibold">Start a post</label>
          <textarea
            rows={3}
            value={postDraft}
            onChange={(e) => setPostDraft(e.target.value)}
            placeholder="Write a question, update or reflection..."
            className="w-full resize-none rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-4 text-sm outline-none focus:border-[#0f766e]"
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={submitPost}
              disabled={busy || !postDraft.trim()}
              className="rounded-full bg-[#0f766e] px-5 py-2 text-sm font-semibold text-white disabled:opacity-40"
            >
              Post
            </button>
          </div>
        </div>

        {loading && <p className="text-sm text-[#6b6880]">Loading the feed…</p>}

        <div className="space-y-5">
          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold">{post.author}</p>
                  <p className="text-xs text-[#6b6880]">
                    {post.pinned ? "Host" : "Member"}
                  </p>
                </div>
                {post.pinned && (
                  <span className="rounded-full bg-[#f0fdfa] px-3 py-1 text-xs font-semibold text-[#0f766e]">
                    📌 Pinned
                  </span>
                )}
              </div>

              <p className="mb-5 whitespace-pre-wrap text-sm leading-relaxed text-[#6b6880]">
                {post.body}
              </p>

              <div className="space-y-3 border-t border-[#e8e4de] pt-4">
                {post.community_replies?.map((r) => (
                  <div key={r.id} className="rounded-2xl bg-[#faf8f5] px-4 py-3">
                    <p className="text-xs font-bold">{r.author}</p>
                    <p className="whitespace-pre-wrap text-sm text-[#6b6880]">{r.body}</p>
                  </div>
                ))}
                {(!post.community_replies || post.community_replies.length === 0) && (
                  <p className="text-xs text-[#b0acbf]">Be the first to reply.</p>
                )}

                <div className="flex gap-2 pt-1">
                  <input
                    value={replyDrafts[post.id] || ""}
                    onChange={(e) =>
                      setReplyDrafts((d) => ({ ...d, [post.id]: e.target.value }))
                    }
                    placeholder="Write a reply…"
                    className="flex-1 rounded-full border border-[#e8e4de] bg-[#faf8f5] px-4 py-2 text-sm outline-none focus:border-[#0f766e]"
                  />
                  <button
                    onClick={() => submitReply(post.id)}
                    disabled={busy}
                    className="rounded-full bg-[#0f766e] px-4 py-2 text-xs font-semibold text-white disabled:opacity-40"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}