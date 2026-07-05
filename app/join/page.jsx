"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  Loader2,
  MapPin,
  MessageCircle,
  Pin,
  Send,
  Sparkles,
  UserRoundCheck,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

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
  "Manager / Team Leader",
  "Other",
];

const STATES = ["VIC", "NSW", "QLD", "SA", "WA", "TAS", "ACT", "NT"];

const PUBLIC_MEMBER_COLUMNS = "id, name, role, state, intro, created_at";
const PUBLIC_POST_COLUMNS = "id, author, body, created_at";

const initials = (name = "") =>
  name
    .split(" ")
    .map((part) => part[0])
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
  const [joinError, setJoinError] = useState("");

  const [post, setPost] = useState({
    author: "",
    body: "",
  });

  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState("");

  const validEmail = /\S+@\S+\.\S+/.test(form.email);
  const canJoin = Boolean(form.name.trim() && validEmail);
  const canPost = Boolean(post.author.trim() && post.body.trim());

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

    if (!canJoin) {
      setJoinError("Please add your name and a valid email address.");
      return;
    }

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
    setPostError("");

    if (!canPost) {
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

    setPosting(false);

    if (error) {
      console.error("COMMUNITY POST INSERT ERROR:", error);
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
      <section className="mx-auto max-w-6xl px-6 py-8 md:py-10">
        {/* Smaller hero */}
        <div className="mb-6 rounded-3xl border border-[#e8e4de] bg-white p-5 shadow-sm md:p-7">
          <div className="grid gap-5 lg:grid-cols-[1fr_360px] lg:items-center">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#0f766e]">
                Free AHA Community
              </p>

              <h1 className="mb-3 text-3xl font-bold leading-tight md:text-4xl">
                Come on in.
              </h1>

              <p className="max-w-2xl text-sm leading-relaxed text-[#6b6880] md:text-base">
                Say hi if you&apos;d like — or just settle in and have a look
                around. You can browse the feed and see who&apos;s here without
                needing to post first.
              </p>
            </div>

            <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0f766e] text-white">
                  <Sparkles size={20} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
                    AHA Professional Development
                  </p>
                  <h2 className="text-lg font-bold">Want deeper learning?</h2>
                </div>
              </div>

              <p className="mb-4 text-sm leading-relaxed text-[#3f5f5a]">
                Explore individual topic videos, the 2026 AHA PD Library, or
                register interest in 1:1 reflective practice.
              </p>

              <div className="mb-4 grid gap-3">
                <div className="rounded-2xl border border-[#99f6e4] bg-white p-3">
                  <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
                    <BookOpen size={14} />
                    2026 PD Library — $279 AUD
                  </div>
                  <p className="text-xs leading-relaxed text-[#6b6880]">
                    12 months access from the day of purchase.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#99f6e4] bg-white p-3">
                  <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
                    <UserRoundCheck size={14} />
                    1:1 Reflective Practice — $193 AUD
                  </div>
                  <p className="text-xs leading-relaxed text-[#6b6880]">
                    Reflection form reviewed before booking details are sent.
                  </p>
                </div>
              </div>

              <Link
                href="/subscribe"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0f766e] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                View reflective PD options
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        {joined ? (
          <div className="mb-6 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5 shadow-sm">
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0f766e] text-white">
                    <Check size={21} />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold">You&apos;re in.</h2>
                    <p className="text-sm text-[#3f5f5a]">
                      Welcome — you can now post if you&apos;d like, or simply
                      read along.
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/subscribe"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                View PD options
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ) : null}

        <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
          <aside>
            <div className="sticky top-8 rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm">
              {joined ? (
                <div className="py-6 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#0f766e] text-white">
                    <Check size={26} />
                  </div>

                  <h2 className="mb-2 text-xl font-bold">You&apos;re in.</h2>

                  <p className="mb-5 text-sm leading-relaxed text-[#6b6880]">
                    Welcome — you&apos;re on the wall. Say something in the feed
                    if you&apos;d like, or simply have a look around.
                  </p>

                  <Link
                    href="/subscribe"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-5 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
                  >
                    AHA PD options
                    <ArrowRight size={15} />
                  </Link>
                </div>
              ) : (
                <>
                  <h2 className="mb-1 text-xl font-bold">
                    Introduce yourself if you&apos;d like
                  </h2>

                  <p className="mb-5 text-sm leading-relaxed text-[#6b6880]">
                    This is optional. You can browse the community first and
                    come back to this later. Say hi if you&apos;d like — or just
                    settle in and have a look around.
                  </p>

                  {joinError ? (
                    <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                      {joinError}
                    </div>
                  ) : null}

                  <label className="mb-1.5 block text-xs font-semibold">
                    Your name
                  </label>
                  <input
                    value={form.name}
                    onChange={(event) => set("name", event.target.value)}
                    placeholder="First name is fine"
                    className="mb-4 w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-3 text-sm outline-none focus:border-[#0f766e]"
                  />

                  <label className="mb-1.5 block text-xs font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => set("email", event.target.value)}
                    placeholder="you@example.com"
                    className="mb-1.5 w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-3 text-sm outline-none focus:border-[#0f766e]"
                  />

                  <p className="mb-4 text-xs text-[#9a97a8]">
                    Just so we can keep you posted — never shown to anyone else.
                  </p>

                  <div className="mb-4 grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold">
                        Current role
                      </label>

                      <select
                        value={form.role}
                        onChange={(event) => set("role", event.target.value)}
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
                      <label className="mb-1.5 block text-xs font-semibold">
                        State
                      </label>

                      <select
                        value={form.state}
                        onChange={(event) => set("state", event.target.value)}
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

                  <label className="mb-1.5 block text-xs font-semibold">
                    Say hi
                  </label>

                  <textarea
                    rows={3}
                    value={form.intro}
                    onChange={(event) => set("intro", event.target.value)}
                    placeholder="A line about you and what you're hoping for here — if you'd like to add one."
                    className="mb-5 w-full resize-none rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-3 text-sm outline-none focus:border-[#0f766e]"
                  />

                  <button
                    type="button"
                    onClick={join}
                    disabled={submitting || !canJoin}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : null}
                    {submitting ? "Saving…" : "Add your intro"}
                  </button>

                  <p className="mt-3 text-xs leading-relaxed text-[#9a97a8]">
                    Prefer to stay quiet for now? That&apos;s completely fine —
                    you can scroll, read and come back later.
                  </p>
                </>
              )}
            </div>
          </aside>

          <div className="space-y-10">
            <section>
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold">Community feed</h2>
                  <p className="mt-1 text-sm text-[#6b6880]">
                    Read along quietly, or post if and when you feel ready.
                  </p>
                </div>

                <Link
                  href="/subscribe"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-4 py-2.5 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
                >
                  View AHA PD options
                  <ArrowRight size={15} />
                </Link>
              </div>

              <div className="mb-5 rounded-3xl border border-[#e8e4de] bg-white p-5 shadow-sm">
                <div className="mb-4 rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-4">
                  <p className="text-sm leading-relaxed text-[#6b6880]">
                    You do not need to post to belong here. If you&apos;d like
                    to introduce yourself or ask something, you can use the
                    boxes below. If not, you&apos;re welcome to just browse.
                  </p>
                </div>

                {postError ? (
                  <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {postError}
                  </div>
                ) : null}

                <div className="mb-3 grid gap-3 sm:grid-cols-[1fr_2fr]">
                  <input
                    value={post.author}
                    onChange={(event) => setP("author", event.target.value)}
                    placeholder="Your name"
                    className="rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-3 text-sm outline-none focus:border-[#0f766e]"
                  />
                </div>

                <textarea
                  rows={3}
                  value={post.body}
                  onChange={(event) => setP("body", event.target.value)}
                  placeholder="Share a question, an update, a small win, or something you're chewing on."
                  className="mb-3 w-full resize-none rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-3 text-sm outline-none focus:border-[#0f766e]"
                />

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={submitPost}
                    disabled={posting || !canPost}
                    className="flex items-center gap-2 rounded-full bg-[#0f766e] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d6962] disabled:cursor-not-allowed disabled:opacity-50"
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

              <article className="mb-4 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0f766e] text-sm font-semibold text-white">
                    RP
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-bold">Robyn</p>
                    <p className="truncate text-xs font-semibold text-[#0f766e]">
                      Host
                    </p>
                  </div>

                  <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-[#0f766e]">
                    <Pin size={11} /> Welcome
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-[#3f5f5a]">
                  I&apos;m so glad you found us. This is a free front door into
                  the AHA Professional Development space. Say hello if
                  you&apos;d like, ask a question if you want to, or simply read
                  along quietly. You are still welcome here.
                </p>
              </article>

              <article className="mb-4 rounded-3xl border border-[#e8e4de] bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                    <MessageCircle size={22} />
                  </div>

                  <div>
                    <p className="font-bold">Free community. Paid PD options.</p>
                    <p className="text-xs font-semibold text-[#0f766e]">
                      Choose the level that fits you
                    </p>
                  </div>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-[#6b6880]">
                  The free community is open now. The AHA Professional
                  Development options will include individual topic videos,
                  the 2026 PD Library, and 1:1 reflective practice sessions once
                  reflection forms have been reviewed.
                </p>

                <Link
                  href="/subscribe"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
                >
                  View reflective PD options
                  <ArrowRight size={15} />
                </Link>
              </article>

              {loading ? (
                <div className="flex justify-center py-10 text-[#0f766e]">
                  <Loader2 className="animate-spin" />
                </div>
              ) : posts.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-[#d8d3cb] bg-white/50 py-12 text-center text-sm text-[#6b6880]">
                  No posts yet. Be the first to say something — or simply have
                  a look around.
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
                          <p className="truncate font-bold leading-tight">
                            {currentPost.author}
                          </p>
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

            <section>
              <div className="mb-5 flex items-baseline justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">Who&apos;s here</h2>
                  <p className="mt-1 text-sm text-[#6b6880]">
                    A glimpse of the people who have chosen to introduce
                    themselves so far.
                  </p>
                </div>

                <span className="shrink-0 text-sm font-semibold text-[#6b6880]">
                  {loading
                    ? "…"
                    : `${members.length} ${
                        members.length === 1 ? "member" : "members"
                      }`}
                </span>
              </div>

              {loading ? (
                <div className="flex justify-center py-10 text-[#0f766e]">
                  <Loader2 className="animate-spin" />
                </div>
              ) : members.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-[#d8d3cb] bg-white/50 py-12 text-center text-sm text-[#6b6880]">
                  No one has introduced themselves yet. You&apos;re welcome to
                  be the first — or just browse for now.
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
                        <p className="text-sm leading-relaxed text-[#6b6880]">
                          {member.intro}
                        </p>
                      ) : (
                        <p className="text-sm leading-relaxed text-[#9a97a8]">
                          No intro added yet.
                        </p>
                      )}
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