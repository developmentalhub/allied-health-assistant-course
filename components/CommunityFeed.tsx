"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Send, UserRound } from "lucide-react";

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

const POSTS_API = "/api/community/posts";
const COMMENTS_API = "/api/community/comments";

function getText(item: Post | Reply) {
  return item.body || item.content || item.message || "";
}

function getName(item: Post | Reply) {
  return item.author_name || item.name || "AHA community member";
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function CommunityFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [authorName, setAuthorName] = useState("");
  const [newPost, setNewPost] = useState("");
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [openReplies, setOpenReplies] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadPosts() {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(POSTS_API, {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Could not load community posts.");
      }

      const possiblePosts = data.posts || data.data || data || [];

      if (!Array.isArray(possiblePosts)) {
        throw new Error("The community posts response was not an array.");
      }

      setPosts(possiblePosts);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong loading community posts.";

      setErrorMessage(message);
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
    setErrorMessage("");

    try {
      const name = authorName.trim() || "AHA community member";
      const message = newPost.trim();

      const response = await fetch(POSTS_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: message,
          content: message,
          message,
          authorName: name,
          author_name: name,
          name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Could not save your post.");
      }

      setNewPost("");
      await loadPosts();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong saving your post.";

      setErrorMessage(message);
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
    setErrorMessage("");

    try {
      const name = authorName.trim() || "AHA community member";

      const response = await fetch(COMMENTS_API, {
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
          authorName: name,
          author_name: name,
          name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Could not save your reply.");
      }

      setReplyText((current) => ({
        ...current,
        [postId]: "",
      }));

      setOpenReplies((current) => ({
        ...current,
        [postId]: true,
      }));

      await loadPosts();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong saving your reply.";

      setErrorMessage(message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-6">
      <section className="rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-6 shadow-sm md:p-7">
        <div className="mb-5 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0f766e] text-white">
            <MessageCircle size={23} />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#1e1b2e]">
              Share with the hive
            </h3>

            <p className="mt-1 text-sm leading-relaxed text-[#3f5f5a]">
              Ask a question, share a useful idea, or quietly read along. This
              space is designed to feel low-pressure.
            </p>
          </div>
        </div>

        <form onSubmit={submitPost} className="grid gap-3">
          <input
            value={authorName}
            onChange={(event) => setAuthorName(event.target.value)}
            placeholder="Your name, or leave blank"
            className="rounded-2xl border border-[#99f6e4] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#0f766e]"
          />

          <textarea
            value={newPost}
            onChange={(event) => setNewPost(event.target.value)}
            placeholder="Write a question, reflection or useful idea..."
            rows={4}
            className="rounded-2xl border border-[#99f6e4] bg-white px-4 py-3 text-sm leading-relaxed outline-none transition focus:border-[#0f766e]"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962] disabled:opacity-60"
            >
              {saving ? "Saving..." : "Post to community"}
              <Send size={15} />
            </button>
          </div>
        </form>
      </section>

      {errorMessage ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-5 text-red-800">
          <p className="mb-1 font-semibold">Community feed error</p>
          <p className="text-sm">{errorMessage}</p>
        </div>
      ) : null}

      {loading ? (
        <div className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm">
          <p className="text-sm text-[#6b6880]">Loading community posts...</p>
        </div>
      ) : null}

      {!loading && !errorMessage && posts.length === 0 ? (
        <div className="rounded-3xl border border-[#e8e4de] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
            <MessageCircle size={22} />
          </div>

          <p className="mb-2 text-xl font-bold">No posts yet.</p>

          <p className="mx-auto max-w-xl text-sm leading-relaxed text-[#6b6880]">
            This community is still being built. You can be the first to add a
            question, reflection or useful idea.
          </p>
        </div>
      ) : null}

      <section className="grid gap-4">
        {posts.map((post) => {
          const replies = post.replies || post.comments || [];
          const isReplyOpen = openReplies[post.id] || false;
          const postName = getName(post);
          const postText = getText(post);

          return (
            <article
              key={post.id}
              className="rounded-4xl border border-[#e8e4de] bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f0fdfa] text-sm font-bold text-[#0f766e]">
                  {postName === "AHA community member" ? (
                    <UserRound size={19} />
                  ) : (
                    getInitials(postName)
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-semibold text-[#1e1b2e]">{postName}</p>

                    {post.created_at ? (
                      <p className="text-xs text-[#8a8798]">
                        {new Date(post.created_at).toLocaleString("en-AU")}
                      </p>
                    ) : null}
                  </div>

                  {post.title ? (
                    <h3 className="mt-3 text-xl font-bold text-[#1e1b2e]">
                      {post.title}
                    </h3>
                  ) : null}

                  <p className="mt-3 whitespace-pre-wrap text-base leading-relaxed text-[#5f5b73]">
                    {postText}
                  </p>
                </div>
              </div>

              <div className="ml-0 mt-5 flex flex-wrap gap-3 sm:ml-15">
                <button
                  type="button"
                  onClick={() =>
                    setOpenReplies((current) => ({
                      ...current,
                      [post.id]: !isReplyOpen,
                    }))
                  }
                  className="inline-flex items-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-4 py-2 text-sm font-semibold text-[#0f766e] transition hover:bg-white"
                >
                  <MessageCircle size={15} />
                  {isReplyOpen ? "Hide replies" : "Reply"}
                  {replies.length > 0 ? ` (${replies.length})` : ""}
                </button>
              </div>

              {isReplyOpen ? (
                <div className="mt-5 rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-4 sm:ml-15">
                  {replies.length > 0 ? (
                    <div className="mb-4 grid gap-3">
                      {replies.map((reply) => {
                        const replyName = getName(reply);

                        return (
                          <div
                            key={reply.id}
                            className="rounded-2xl border border-[#e8e4de] bg-white p-4"
                          >
                            <div className="mb-2 flex items-center gap-3">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f0fdfa] text-xs font-bold text-[#0f766e]">
                                {replyName === "AHA community member" ? (
                                  <UserRound size={15} />
                                ) : (
                                  getInitials(replyName)
                                )}
                              </div>

                              <p className="text-sm font-semibold text-[#1e1b2e]">
                                {replyName}
                              </p>
                            </div>

                            <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#5f5b73]">
                              {getText(reply)}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="mb-4 text-sm leading-relaxed text-[#6b6880]">
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
                      className="rounded-2xl border border-[#e8e4de] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#0f766e]"
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
      </section>
    </div>
  );
}