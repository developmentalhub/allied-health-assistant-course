"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Send } from "lucide-react";

type Reply = {
  id: string;
  body?: string | null;
  content?: string | null;
  message?: string | null;
  author_name?: string | null;
  name?: string | null;
  created_at?: string | null;
};

type Post = {
  id: string;
  title?: string | null;
  body?: string | null;
  content?: string | null;
  message?: string | null;
  author_name?: string | null;
  name?: string | null;
  created_at?: string | null;
  replies?: Reply[];
  comments?: Reply[];
};

function getText(item: Post | Reply) {
  return item.body || item.content || item.message || "";
}

function getName(item: Post | Reply) {
  return item.author_name || item.name || "AHA community member";
}

export default function CommunityFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [authorName, setAuthorName] = useState("");
  const [newPost, setNewPost] = useState("");
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [openReplies, setOpenReplies] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadPosts() {
    setLoading(true);

    try {
      const response = await fetch("/api/forum/posts", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Could not load community posts.");
      }

      const data = await response.json();
      const possiblePosts = data.posts || data.data || data || [];

      setPosts(Array.isArray(possiblePosts) ? possiblePosts : []);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function submitPost(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!newPost.trim()) {
      return;
    }

    setSaving(true);

    try {
      await fetch("/api/forum/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: newPost.trim(),
          content: newPost.trim(),
          message: newPost.trim(),
          authorName: authorName.trim() || "AHA community member",
          author_name: authorName.trim() || "AHA community member",
          name: authorName.trim() || "AHA community member",
        }),
      });

      setNewPost("");
      await loadPosts();
    } finally {
      setSaving(false);
    }
  }

  async function submitReply(postId: string) {
    const text = replyText[postId]?.trim();

    if (!text) {
      return;
    }

    setSaving(true);

    try {
      await fetch("/api/forum/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          post_id: postId,
          body: text,
          content: text,
          message: text,
          authorName: authorName.trim() || "AHA community member",
          author_name: authorName.trim() || "AHA community member",
          name: authorName.trim() || "AHA community member",
        }),
      });

      setReplyText((current) => ({
        ...current,
        [postId]: "",
      }));

      setOpenReplies((current) => ({
        ...current,
        [postId]: true,
      }));

      await loadPosts();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-6">
      <form
        onSubmit={submitPost}
        className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5"
      >
        <p className="mb-3 text-sm font-semibold text-[#0f766e]">
          Share something with the community
        </p>

        <div className="mb-3 grid gap-3 md:grid-cols-[0.45fr_1fr]">
          <input
            value={authorName}
            onChange={(event) => setAuthorName(event.target.value)}
            placeholder="Your name, or leave blank"
            className="rounded-2xl border border-[#e8e4de] bg-white px-4 py-3 text-sm outline-none focus:border-[#0f766e]"
          />

          <input
            value={newPost}
            onChange={(event) => setNewPost(event.target.value)}
            placeholder="Write a question, reflection or useful idea..."
            className="rounded-2xl border border-[#e8e4de] bg-white px-4 py-3 text-sm outline-none focus:border-[#0f766e]"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962] disabled:opacity-60"
        >
          Post to community
          <Send size={15} />
        </button>
      </form>

      {loading ? (
        <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
          <p className="text-sm text-[#6b6880]">Loading community posts...</p>
        </div>
      ) : null}

      {!loading && posts.length === 0 ? (
        <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
          <p className="mb-2 text-lg font-bold">No posts yet.</p>
          <p className="text-sm leading-relaxed text-[#6b6880]">
            This community is still being built. You can be the first to add a
            question, reflection or useful idea.
          </p>
        </div>
      ) : null}

      {posts.map((post) => {
        const replies = post.replies || post.comments || [];
        const isReplyOpen = openReplies[post.id] || false;

        return (
          <article
            key={post.id}
            className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5"
          >
            <div className="mb-3">
              <p className="text-sm font-semibold text-[#0f766e]">
                {getName(post)}
              </p>

              {post.created_at ? (
                <p className="text-xs text-[#8a8798]">
                  {new Date(post.created_at).toLocaleString("en-AU")}
                </p>
              ) : null}
            </div>

            {post.title ? (
              <h3 className="mb-2 text-xl font-bold">{post.title}</h3>
            ) : null}

            <p className="whitespace-pre-wrap text-base leading-relaxed text-[#5f5b73]">
              {getText(post)}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() =>
                  setOpenReplies((current) => ({
                    ...current,
                    [post.id]: !isReplyOpen,
                  }))
                }
                className="inline-flex items-center gap-2 rounded-full border border-[#99f6e4] bg-white px-4 py-2 text-sm font-semibold text-[#0f766e]"
              >
                <MessageCircle size={15} />
                {isReplyOpen ? "Hide replies" : "Reply"}
              </button>
            </div>

            {isReplyOpen ? (
              <div className="mt-5 grid gap-4">
                {replies.length > 0 ? (
                  <div className="grid gap-3">
                    {replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="rounded-2xl border border-[#e8e4de] bg-white p-4"
                      >
                        <p className="mb-1 text-sm font-semibold text-[#0f766e]">
                          {getName(reply)}
                        </p>

                        <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#5f5b73]">
                          {getText(reply)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#6b6880]">
                    No replies yet. You can start the conversation.
                  </p>
                )}

                <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                  <input
                    value={replyText[post.id] || ""}
                    onChange={(event) =>
                      setReplyText((current) => ({
                        ...current,
                        [post.id]: event.target.value,
                      }))
                    }
                    placeholder="Write a reply..."
                    className="rounded-2xl border border-[#e8e4de] bg-white px-4 py-3 text-sm outline-none focus:border-[#0f766e]"
                  />

                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => submitReply(post.id)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962] disabled:opacity-60"
                  >
                    Send reply
                    <Send size={15} />
                  </button>
                </div>
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}