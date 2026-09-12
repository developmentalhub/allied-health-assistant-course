import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Archive,
  ArrowLeft,
  CheckCircle2,
  CirclePlus,
  MessageCircleQuestion,
  RotateCcw,
  ShieldCheck,
  Trash2,
} from "lucide-react";

import { createClient } from "@/lib/supabase-server";
import {
  archiveCommunityPrompt,
  createCommunityPrompt,
  deleteCommunityPrompt,
  publishCommunityPrompt,
  restoreCommunityPromptToDraft,
} from "./actions";

type CommunityPrompt = {
  id: string;
  title: string;
  prompt: string;
  status: "draft" | "published" | "archived";
  published_at: string | null;
  created_at: string;
};

type CommunityPromptsAdminPageProps = {
  searchParams?: Promise<{
    created?: string;
    published?: string;
    archived?: string;
    restored?: string;
    deleted?: string;
    error?: string;
  }>;
};

function formatDate(value: string | null) {
  if (!value) return "Not published";

  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Australia/Melbourne",
  }).format(new Date(value));
}

export default async function CommunityPromptsAdminPage({
  searchParams,
}: CommunityPromptsAdminPageProps) {
  const params = await searchParams;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/admin/community-prompts");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (
    profile?.role !== "admin" &&
    profile?.role !== "superadmin"
  ) {
    redirect("/dashboard");
  }

  const { data, error } = await supabase
    .from("community_prompts")
    .select(
      "id, title, prompt, status, published_at, created_at",
    )
    .order("created_at", { ascending: false });

  const prompts = (data || []) as CommunityPrompt[];

  const published = prompts.filter(
    (item) => item.status === "published",
  );

  const drafts = prompts.filter(
    (item) => item.status === "draft",
  );

  const archived = prompts.filter(
    (item) => item.status === "archived",
  );

  const isSuperadmin = profile.role === "superadmin";

  return (
    <main className="min-h-screen bg-[#fffaf3] px-5 py-10 text-[#1e1b2e] sm:px-6 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
          >
            <ArrowLeft size={16} />
            Back to admin dashboard
          </Link>
        </div>

        <section className="rounded-4xl border border-[#f4d9a6] bg-linear-to-br from-[#fff7df] via-white to-[#f0fdfa] p-7 shadow-sm md:p-10">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              <ShieldCheck size={18} />
              Allied Health Hive Admin
            </div>

            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Community discussion prompts
            </h1>

            <p className="mt-5 text-base leading-relaxed text-[#5f5b73] md:text-lg">
              Create questions that help start useful conversations inside the
              Hive. Jess can suggest ideas through the Ideas Board, while the
              live community prompt stays under admin control.
            </p>
          </div>
        </section>

        {params?.error ? (
          <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-5 text-sm leading-relaxed text-red-700">
            {decodeURIComponent(params.error)}
          </div>
        ) : null}

        {params?.created === "true" ? (
          <SuccessMessage text="Your new discussion prompt has been saved as a draft." />
        ) : null}

        {params?.published === "true" ? (
          <SuccessMessage text="The discussion prompt is now live in the Hive." />
        ) : null}

        {params?.archived === "true" ? (
          <SuccessMessage text="The discussion prompt has been archived." />
        ) : null}

        {params?.restored === "true" ? (
          <SuccessMessage text="The discussion prompt has been returned to drafts." />
        ) : null}

        {params?.deleted === "true" ? (
          <SuccessMessage text="The discussion prompt has been permanently deleted." />
        ) : null}

        {error ? (
          <section className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-6">
            <h2 className="text-lg font-bold text-red-800">
              Prompts could not be loaded
            </h2>

            <p className="mt-2 text-sm text-red-700">
              {error.message}
            </p>
          </section>
        ) : null}

        <section className="mt-8 grid gap-5 sm:grid-cols-3">
          <SummaryCard
            label="Published"
            value={published.length}
          />

          <SummaryCard
            label="Drafts"
            value={drafts.length}
          />

          <SummaryCard
            label="Archived"
            value={archived.length}
          />
        </section>

        <section className="mt-10 rounded-4xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
          <div className="mb-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <CirclePlus size={24} />
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Create
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Add a discussion prompt
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#6b6880]">
              Save the idea as a draft first. It will not appear in the
              community until you choose to publish it.
            </p>
          </div>

          <form
            action={createCommunityPrompt}
            className="grid gap-5"
          >
            <label className="grid gap-2">
              <span className="text-sm font-semibold">
                Short title
              </span>

              <input
                type="text"
                name="title"
                required
                maxLength={200}
                placeholder="e.g. What makes a session feel successful?"
                className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-base outline-none transition focus:border-[#0f766e] focus:bg-white"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold">
                Discussion question
              </span>

              <textarea
                name="prompt"
                required
                rows={5}
                maxLength={5000}
                placeholder="Write the question or reflection you would like the community to respond to..."
                className="w-full resize-y rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-base leading-relaxed outline-none transition focus:border-[#0f766e] focus:bg-white"
              />
            </label>

            <button
              type="submit"
              className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
            >
              <CirclePlus size={17} />
              Save as draft
            </button>
          </form>
        </section>

        <section className="mt-10">
          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Live now
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Published discussion prompt
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#6b6880]">
              Publishing another prompt will automatically archive the current
              live prompt so there is only one main conversation starter at a
              time.
            </p>
          </div>

          {published.length > 0 ? (
            <div className="grid gap-5">
              {published.map((item) => (
                <PromptCard
                  key={item.id}
                  prompt={item}
                  isSuperadmin={isSuperadmin}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No published prompt"
              text="Choose one of your draft questions and publish it when you are ready to start the next community conversation."
            />
          )}
        </section>

        <section className="mt-10">
          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Planning
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Draft prompts
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#6b6880]">
              These ideas are private until you choose to publish them.
            </p>
          </div>

          {drafts.length > 0 ? (
            <div className="grid gap-5">
              {drafts.map((item) => (
                <PromptCard
                  key={item.id}
                  prompt={item}
                  isSuperadmin={isSuperadmin}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No draft prompts yet"
              text="Add a discussion question above or use something Jess has suggested on the Ideas Board."
            />
          )}
        </section>

        {archived.length > 0 ? (
          <section className="mt-10">
            <div className="mb-5">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Previous
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Archived prompts
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#6b6880]">
                Keep useful old questions here rather than deleting them. You
                can return one to drafts if you want to use it again later.
              </p>
            </div>

            <div className="grid gap-5">
              {archived.map((item) => (
                <PromptCard
                  key={item.id}
                  prompt={item}
                  isSuperadmin={isSuperadmin}
                />
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-10 rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-7 md:p-9">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#0f766e]">
              <MessageCircleQuestion size={21} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Keep the community conversational
              </h2>

              <p className="mt-2 max-w-4xl text-sm leading-relaxed text-[#3f5f5a]">
                These prompts do not need to be teaching posts. A simple,
                specific question that makes someone think “yes, I have dealt
                with that too” will usually create a more useful community than
                another piece of formal content.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function PromptCard({
  prompt,
  isSuperadmin,
}: {
  prompt: CommunityPrompt;
  isSuperadmin: boolean;
}) {
  return (
    <article className="rounded-4xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-7">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-4xl">
          <div className="mb-3 flex flex-wrap gap-2">
            <span
              className={
                prompt.status === "published"
                  ? "rounded-full bg-[#f0fdfa] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#0f766e]"
                  : prompt.status === "archived"
                    ? "rounded-full bg-[#faf8f5] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#6b6880]"
                    : "rounded-full bg-[#fff7df] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#6b5b45]"
              }
            >
              {prompt.status}
            </span>
          </div>

          <h3 className="text-2xl font-bold">
            {prompt.title}
          </h3>

          <p className="mt-3 whitespace-pre-wrap text-base leading-relaxed text-[#5f5b73]">
            {prompt.prompt}
          </p>

          <p className="mt-4 text-xs text-[#6b6880]">
            {prompt.status === "published"
              ? `Published ${formatDate(prompt.published_at)}`
              : `Created ${formatDate(prompt.created_at)}`}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2 lg:max-w-72 lg:justify-end">
          {prompt.status !== "published" ? (
            <form action={publishCommunityPrompt}>
              <input
                type="hidden"
                name="id"
                value={prompt.id}
              />

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-[#0f766e] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                <CheckCircle2 size={16} />
                Publish
              </button>
            </form>
          ) : null}

          {prompt.status === "published" ? (
            <form action={archiveCommunityPrompt}>
              <input
                type="hidden"
                name="id"
                value={prompt.id}
              />

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full border border-[#e8e4de] bg-white px-4 py-2.5 text-sm font-semibold text-[#5f5b73] transition hover:border-[#0f766e] hover:text-[#0f766e]"
              >
                <Archive size={16} />
                Archive
              </button>
            </form>
          ) : null}

          {prompt.status === "archived" ? (
            <form action={restoreCommunityPromptToDraft}>
              <input
                type="hidden"
                name="id"
                value={prompt.id}
              />

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-4 py-2.5 text-sm font-semibold text-[#0f766e] transition hover:bg-white"
              >
                <RotateCcw size={16} />
                Return to draft
              </button>
            </form>
          ) : null}

          {isSuperadmin ? (
            <form action={deleteCommunityPrompt}>
              <input
                type="hidden"
                name="id"
                value={prompt.id}
              />

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-50"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <article className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
        {label}
      </p>

      <p className="mt-3 text-4xl font-bold">
        {value}
      </p>
    </article>
  );
}

function SuccessMessage({
  text,
}: {
  text: string;
}) {
  return (
    <div className="mt-6 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
      <p className="text-sm font-semibold text-[#0f766e]">
        {text}
      </p>
    </div>
  );
}

function EmptyState({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-4xl border border-dashed border-[#e8e4de] bg-white p-8 text-center">
      <CheckCircle2
        size={28}
        className="mx-auto text-[#0f766e]"
      />

      <h3 className="mt-4 text-xl font-bold">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-[#6b6880]">
        {text}
      </p>
    </div>
  );
}