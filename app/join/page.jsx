"use client";

import { useEffect, useMemo, useState } from "react";
import { MapPin, Check, Loader2, Pin, Send, AlertCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

// Free, welcoming community front door.
// Left: introduce yourself (email captured privately). Right: a live members feed + who's here.
// No login required.

const ROLES = [
  "Allied Health Assistant",
  "Occupational Therapist",
  "Speech Pathologist",
  "Physiotherapist",
  "Developmental Educator",
  "Exercise Physiologist",
  "Early Childhood Educator",
  "Psychologist",
  "Student",
  "Other",
];

const STATES = ["VIC", "NSW", "QLD", "SA", "WA", "TAS", "ACT", "NT"];

const initials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

const timeAgo = (iso) => {
  if (!iso) return "";

  const seconds = Math.floor((Date.now() - new Date(iso)) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;

  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
  });
};

const PUBLIC_MEMBER_COLUMNS = "id, name, role, state, intro, created_at";
const PUBLIC_POST_COLUMNS = "id, author, body, created_at";

export default function JoinCommunity() {
  const supabase = useMemo(() => createClient(), []);

  const [members, setMembers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: ROLES[0],
    state: STATES[0],
    intro: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [joined, setJoined] = useState(false);

  const [post, setPost] = useState({
    author: "",
    body: "",
  });

  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState("");
  const [joinError, setJoinError] = useState("");

  const set = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const setP = (key, value) => {
    setPost((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const validEmail = /\S+@\S+\.\S+/.test(form.email);
  const canJoin = Boolean(form.name.trim() && validEmail);
  const canPost = Boolean(post.author.trim() && post.body.trim());

  useEffect(() => {
    const loadCommunity = async () => {
      setLoading(true);

      const [{ data: memberData, error: memberError }, { data: postData, error: postLoadError }] =
        await Promise.all([
          supabase
            .from("community_members")
            .select(PUBLIC_MEMBER_COLUMNS)
            .order("created_at", { ascending: false }),

          supabase
            .from("community_posts")
            .select(PUBLIC_POST_COLUMNS)
            .order("created_at", { ascending: false }),
        ]);

      if (memberError) {
        console.error("COMMUNITY MEMBERS LOAD ERROR:", memberError);
      }

      if (postLoadError) {
        console.error("COMMUNITY POSTS LOAD ERROR:", postLoadError);
        setPostError(postLoadError.message || "Posts could not be loaded.");
      }

      if (memberData) setMembers(memberData);
      if (postData) setPosts(postData);

      setLoading(false);
    };

    loadCommunity();
  }, [supabase]);

  const join = async () => {
    setJoinError("");

    if (!canJoin) return;

    setSubmitting(true);

    const cleanForm = {
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role,
      state: form.state,
      intro: form.intro.trim(),
    };

    const { data, error } = await supabase
      .from("community_members")
      .insert(cleanForm)
      .select(PUBLIC_MEMBER_COLUMNS)
      .single();

    setSubmitting(false);

    if (error) {
      console.error("COMMUNITY MEMBER INSERT ERROR:", error);
      setJoinError(error.message || "Something went wrong while joining.");
      return;
    }

    if (data) {
      setMembers((prev) => [data, ...prev]);
      setPost((current) => ({
        ...current,
        author: cleanForm.name,
      }));
      setJoined(true);
    }
  };

  const submitPost = async () => {
    console.log("POST BUTTON CLICKED");
    console.log("canPost:", canPost);
    console.log("post before insert:", post);

    setPostError("");

    if (!canPost) {
      console.log("POST BLOCKED: author or body is empty");
      setPostError("Please add your name and a message before posting.");
      return;
    }

    setPosting(true);

    const cleanPost = {
      author: post.author.trim(),
      body: post.body.trim(),
    };

    const { data, error } = await supabase
      .from("community_posts")
      .insert(cleanPost)
      .select(PUBLIC_POST_COLUMNS)
      .single();

    console.log("SUPABASE INSERT DATA:", data);
    console.log("SUPABASE INSERT ERROR:", error);

    setPosting(false);

    if (error) {
      setPostError(error.message || "Your post could not be saved.");
      return;
    }

    if (data) {
      setPosts((prev) => [data, ...prev]);
      setPost((current) => ({
        ...current,
        body: "",
      }));
    }
  };

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-6xl px-6 py-14">
        {/* Header */}
        <div className="mb-10 rounded-3xl border border-[#e8e4de] bg-white p-8 md:p-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
            Free to join · everyone welcome
          </p>

          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Come on in</h1>

          <p className="max-w-2xl text-base leading-relaxed text-[#6b6880]">
            A warm, free space for allied health assistants and the people around them — to
            connect, share the real everyday stuff, and get ready for what&apos;s coming, together.
            Introduce yourself, then jump into the feed.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          {/* Introduce yourself */}
          <aside>
            <div className="sticky top-8 rounded-3xl border border-[#e8e4de] bg-white p-6">
              {joined ? (
                <div className="py-6 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#0f766e] text-white">
                    <Check size={26} />
                  </div>

                  <h2 className="mb-2 text-xl font-bold">You&apos;re in.</h2>

                  <p className="text-sm leading-relaxed text-[#6b6880]">
                    Welcome — you&apos;re on the wall. Say something in the feed to get chatting.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="mb-1 text-xl font-bold">Say hello</h2>

                  <p className="mb-5 text-sm text-[#6b6880]">Tell us who you are.</p>

                  {joinError ? (
                    <div className="mb-4 flex gap-2 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                      <AlertCircle size={17} className="mt-0.5 shrink-0" />
                      <p>{joinError}</p>
                    </div>
                  ) : null}

                  <label className="mb-1.5 block text-xs font-semibold">Your name</label>
                  <input
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="First name is fine"
                    className="mb-4 w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-3 text-sm outline-none focus:border-[#0f766e]"
                  />

                  <label className="mb-1.5 block text-xs font-semibold">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="you@example.com"
                    className="mb-1.5 w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-3 text-sm outline-none focus:border-[#0f766e]"
                  />

                  <p className="mb-4 text-xs text-[#9a97a8]">
                    Just so we can keep you posted — never shown to anyone else.
                  </p>

                  <div className="mb-4 grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold">Current role</label>
                      <select
                        value={form.role}
                        onChange={(e) => set("role", e.target.value)}
                        className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-3 text-sm outline-none focus:border-[#0f766e]"
                      >
                        {ROLES.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold">State</label>
                      <select
                        value={form.state}
                        onChange={(e) => set("state", e.target.value)}
                        className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-3 text-sm outline-none focus:border-[#0f766e]"
                      >
                        {STATES.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <label className="mb-1.5 block text-xs font-semibold">Say hi</label>
                  <textarea
                    rows={3}
                    value={form.intro}
                    onChange={(e) => set("intro", e.target.value)}
                    placeholder="A line about you and what you're hoping for here."
                    className="mb-5 w-full resize-none rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-3 text-sm outline-none focus:border-[#0f766e]"
                  />

                  <button
                    type="button"
                    onClick={join}
                    disabled={submitting || !canJoin}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0c5f58] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
                    {submitting ? "Joining…" : "Join the community"}
                  </button>
                </>
              )}
            </div>
          </aside>

          {/* Feed + who's here */}
          <div className="space-y-10">
            {/* Feed */}
            <section>
              <h2 className="mb-4 text-xl font-bold">Community feed</h2>

              {/* Compose */}
              <div className="mb-5 rounded-3xl border border-[#e8e4de] bg-white p-5">
                {postError ? (
                  <div className="mb-4 flex gap-2 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    <AlertCircle size={17} className="mt-0.5 shrink-0" />
                    <p>{postError}</p>
                  </div>
                ) : null}

                <div className="mb-3 grid gap-3 sm:grid-cols-[1fr_2fr]">
                  <input
                    value={post.author}
                    onChange={(e) => setP("author", e.target.value)}
                    placeholder="Your name"
                    className="rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-3 text-sm outline-none focus:border-[#0f766e]"
                  />
                </div>

                <textarea
                  rows={3}
                  value={post.body}
                  onChange={(e) => setP("body", e.target.value)}
                  placeholder="Share a question, an update, a small win, or something you're chewing on."
                  className="mb-3 w-full resize-none rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-3 text-sm outline-none focus:border-[#0f766e]"
                />

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={submitPost}
                    disabled={posting || !canPost}
                    className="flex items-center gap-2 rounded-full bg-[#0f766e] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0c5f58] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {posting ? (
                      <Loader2 size={15} className="animate-spin" />
                    ) : (
                      <Send size={15} />
                    )}
                    {posting ? "Posting…" : "Post"}
                  </button>
                </div>
              </div>

              {/* Pinned welcome */}
              <article className="mb-4 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0f766e] text-sm font-semibold text-white">
                    RP
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-bold">Robyn</p>
                    <p className="truncate text-xs font-semibold text-[#0f766e]">Host</p>
                  </div>

                  <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-[#0f766e]">
                    <Pin size={11} /> Welcome
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-[#3f5f5a]">
                  I&apos;m so glad you found us. This is a space to swap the real, everyday
                  stuff of the work — the wins, the hard days, the questions — and to get ready
                  for what&apos;s coming together. Pull up a chair and say hello. I can&apos;t wait
                  to meet you.
                </p>
              </article>

              {/* Posts */}
              {loading ? (
                <div className="flex justify-center py-10 text-[#0f766e]">
                  <Loader2 className="animate-spin" />
                </div>
              ) : posts.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-[#d8d3cb] bg-white/50 py-12 text-center text-sm text-[#6b6880]">
                  No posts yet. Be the first to say something.
                </div>
              ) : (
                <div className="space-y-4">
                  {posts.map((currentPost) => (
                    <article
                      key={currentPost.id}
                      className="rounded-3xl border border-[#e8e4de] bg-white p-5 shadow-sm"
                    >
                      <div className="mb-2 flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0f766e] text-xs font-semibold text-white">
                          {initials(currentPost.author)}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-bold leading-tight">{currentPost.author}</p>
                          <p className="text-xs text-[#9a97a8]">
                            {timeAgo(currentPost.created_at)}
                          </p>
                        </div>
                      </div>

                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#4b4860]">
                        {currentPost.body}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </section>

            {/* Who's here */}
            <section>
              <div className="mb-5 flex items-baseline justify-between">
                <h2 className="text-xl font-bold">Who&apos;s here</h2>

                <span className="text-sm font-semibold text-[#6b6880]">
                  {loading
                    ? "…"
                    : `${members.length} ${members.length === 1 ? "member" : "members"}`}
                </span>
              </div>

              {loading ? (
                <div className="flex justify-center py-10 text-[#0f766e]">
                  <Loader2 className="animate-spin" />
                </div>
              ) : members.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-[#d8d3cb] bg-white/50 py-12 text-center text-sm text-[#6b6880]">
                  Be the first to introduce yourself.
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {members.map((member) => (
                    <article
                      key={member.id}
                      className="rounded-3xl border border-[#e8e4de] bg-white p-5 shadow-sm"
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0f766e] text-sm font-semibold text-white">
                          {initials(member.name)}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-bold">{member.name}</p>
                          <p className="truncate text-xs font-semibold text-[#0f766e]">
                            {member.role}
                          </p>
                        </div>

                        {member.state ? (
                          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#f0fdfa] px-2.5 py-1 text-xs font-semibold text-[#0f766e]">
                            <MapPin size={11} /> {member.state}
                          </span>
                        ) : null}
                      </div>

                      {member.intro ? (
                        <p className="text-sm leading-relaxed text-[#6b6880]">{member.intro}</p>
                      ) : null}
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}