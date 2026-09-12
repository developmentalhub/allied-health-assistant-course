import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Lightbulb,
  MessageCircle,
  PlusCircle,
  ShieldCheck,
} from "lucide-react";

import { createClient } from "@/lib/supabase-server";
import { submitPartnerIdea } from "./actions";

type PartnerIdea = {
  id: string;
  submitted_by_name: string;
  idea_type: string;
  title: string;
  notes: string | null;
  created_at: string;
};

type PartnerIdeasPageProps = {
  searchParams?: Promise<{
    submitted?: string;
    error?: string;
  }>;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function getIdeaLabel(type: string) {
  if (type === "webinar") return "Webinar";
  if (type === "blog") return "Blog";
  if (type === "community") return "Community";
  if (type === "resource") return "Resource";
  return "Other";
}

function getIdeaIcon(type: string) {
  if (type === "webinar") return <CalendarDays size={17} />;
  if (type === "blog") return <BookOpen size={17} />;
  if (type === "community") return <MessageCircle size={17} />;
  return <Lightbulb size={17} />;
}

export default async function PartnerIdeasPage({
  searchParams,
}: PartnerIdeasPageProps) {
  const params = await searchParams;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/partner/ideas");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .maybeSingle();

  const allowedRoles = ["partner", "admin", "superadmin"];

  if (!profile?.role || !allowedRoles.includes(profile.role)) {
    redirect("/dashboard");
  }

  const { data, error } = await supabase
    .from("partner_ideas")
    .select(
      "id, submitted_by_name, idea_type, title, notes, created_at",
    )
    .order("created_at", { ascending: false });

  const ideas = (data || []) as PartnerIdea[];

  return (
    <main className="min-h-screen bg-[#fffaf3] px-5 py-10 text-[#1e1b2e] sm:px-6 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <Link
            href="/partner"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
          >
            <ArrowLeft size={16} />
            Back to Hive Management
          </Link>
        </div>

        <section className="rounded-4xl border border-[#f4d9a6] bg-linear-to-br from-[#fff7df] via-white to-[#f0fdfa] p-7 shadow-sm md:p-10">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              <ShieldCheck size={18} />
              Allied Health Hive Management
            </div>

            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Ideas board
            </h1>

            <p className="mt-5 text-base leading-relaxed text-[#5f5b73] md:text-lg">
              Capture ideas as they come up so they do not disappear between
              conversations. Add webinar topics, blog ideas, community prompts,
              resource ideas or anything else worth exploring together.
            </p>
          </div>
        </section>

        {params?.submitted === "true" ? (
          <div className="mt-6 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5 text-sm font-semibold text-[#0f766e]">
            Your idea has been added to the Hive ideas board.
          </div>
        ) : null}

        {params?.error ? (
          <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {decodeURIComponent(params.error)}
          </div>
        ) : null}

        <section className="mt-8 grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="rounded-4xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <PlusCircle size={24} />
              </div>

              <h2 className="text-2xl font-bold">
                Add an idea
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-[#6b6880]">
                This adds your suggestion to the planning board. It does not
                publish anything to the website.
              </p>
            </div>

            <form action={submitPartnerIdea} className="grid gap-5">
              <label className="grid gap-2">
                <span className="text-sm font-semibold">
                  What kind of idea is it?
                </span>

                <select
                  name="ideaType"
                  required
                  defaultValue="webinar"
                  className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-base outline-none transition focus:border-[#0f766e] focus:bg-white"
                >
                  <option value="webinar">
                    Webinar idea
                  </option>
                  <option value="blog">
                    Blog idea
                  </option>
                  <option value="community">
                    Community question or discussion
                  </option>
                  <option value="resource">
                    Resource idea
                  </option>
                  <option value="other">
                    Something else
                  </option>
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold">
                  Idea title
                </span>

                <input
                  type="text"
                  name="title"
                  required
                  maxLength={200}
                  placeholder="e.g. What AHAs wish their supervisors understood"
                  className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-base outline-none transition focus:border-[#0f766e] focus:bg-white"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold">
                  Notes
                </span>

                <textarea
                  name="notes"
                  rows={7}
                  maxLength={5000}
                  placeholder="Add any thoughts, examples, questions or reasons this could be useful..."
                  className="w-full resize-y rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-base leading-relaxed outline-none transition focus:border-[#0f766e] focus:bg-white"
                />
              </label>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Add to ideas board
                <PlusCircle size={18} />
              </button>
            </form>
          </div>

          <div>
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                  Shared planning
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Ideas from the Hive team
                </h2>
              </div>

              <p className="text-sm text-[#6b6880]">
                {ideas.length}{" "}
                {ideas.length === 1 ? "idea" : "ideas"}
              </p>
            </div>

            {error ? (
              <div className="rounded-3xl border border-red-200 bg-red-50 p-5">
                <p className="font-semibold text-red-800">
                  Ideas could not be loaded
                </p>

                <p className="mt-2 text-sm text-red-700">
                  {error.message}
                </p>
              </div>
            ) : null}

            {!error && ideas.length === 0 ? (
              <div className="rounded-4xl border border-[#e8e4de] bg-white p-8 text-center shadow-sm">
                <Lightbulb
                  size={34}
                  className="mx-auto text-[#0f766e]"
                />

                <h3 className="mt-4 text-xl font-bold">
                  No ideas added yet
                </h3>

                <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#6b6880]">
                  Add the first idea using the form. This board can become the
                  place where Robyn and Jess collect thoughts before deciding
                  what is actually developed or published.
                </p>
              </div>
            ) : null}

            {!error && ideas.length > 0 ? (
              <div className="grid gap-4">
                {ideas.map((idea) => (
                  <article
                    key={idea.id}
                    className="rounded-4xl border border-[#e8e4de] bg-white p-6 shadow-sm"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-2 rounded-full bg-[#f0fdfa] px-3 py-1 text-xs font-semibold text-[#0f766e]">
                            {getIdeaIcon(idea.idea_type)}
                            {getIdeaLabel(idea.idea_type)}
                          </span>
                        </div>

                        <h3 className="mt-4 text-xl font-bold leading-snug">
                          {idea.title}
                        </h3>

                        {idea.notes ? (
                          <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-[#5f5b73]">
                            {idea.notes}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-5 border-t border-[#e8e4de] pt-4 text-xs text-[#6b6880]">
                      Suggested by{" "}
                      <span className="font-semibold text-[#1e1b2e]">
                        {idea.submitted_by_name}
                      </span>{" "}
                      on {formatDate(idea.created_at)}
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
          <div className="flex gap-3">
            <Lightbulb
              size={20}
              className="mt-0.5 shrink-0 text-[#0f766e]"
            />

            <p className="text-sm leading-relaxed text-[#3f5f5a]">
              Ideas added here are suggestions only. They do not automatically
              become webinars, blogs, community posts or live resources, which
              means you can capture thoughts freely without worrying about
              changing the public website.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}