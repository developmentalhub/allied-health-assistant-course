import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Headphones,
  PenLine,
  Send,
} from "lucide-react";

import { createClient } from "@/lib/supabase-server";

type BlogDraft = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  tag: string | null;
  audio_url: string | null;
  status:
    | "draft"
    | "review"
    | "changes_requested"
    | "published";
  review_notes: string | null;
  submitted_at: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

function formatDate(value: string | null) {
  if (!value) return "";

  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function statusLabel(status: BlogDraft["status"]) {
  if (status === "draft") return "Draft";
  if (status === "review") return "Waiting for review";
  if (status === "changes_requested") return "Changes requested";
  return "Published";
}

export default async function PartnerBlogPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/partner/blog");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .maybeSingle();

  const allowedRoles = ["partner", "admin", "superadmin"];

  if (
    !profile?.role ||
    !allowedRoles.includes(profile.role)
  ) {
    redirect("/dashboard");
  }

  const { data, error } = await supabase
    .from("blog_drafts")
    .select(
      `
      id,
      title,
      slug,
      excerpt,
      tag,
      audio_url,
      status,
      review_notes,
      submitted_at,
      published_at,
      created_at,
      updated_at
      `,
    )
    .order("updated_at", { ascending: false });

  const drafts = (data || []) as BlogDraft[];

  const waitingForReview = drafts.filter(
    (item) => item.status === "review",
  );

  const editable = drafts.filter(
    (item) =>
      item.status === "draft" ||
      item.status === "changes_requested",
  );

  const published = drafts.filter(
    (item) => item.status === "published",
  );

  return (
    <main className="min-h-screen bg-[#fffaf3] px-5 py-10 text-[#1e1b2e] sm:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/partner"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
        >
          <ArrowLeft size={16} />
          Back to Hive Management
        </Link>

        <section className="rounded-4xl border border-[#f4d9a6] bg-linear-to-br from-[#fff7df] via-white to-[#f0fdfa] p-7 shadow-sm md:p-10">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <PenLine size={26} />
              </div>

              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Contributor area
              </p>

              <h1 className="mt-2 text-4xl font-bold leading-tight md:text-5xl">
                Blog drafts
              </h1>

              <p className="mt-5 text-base leading-relaxed text-[#5f5b73] md:text-lg">
                Write articles, add audio and prepare content for the
                Allied Health Hive. Nothing goes live until it has been
                reviewed and approved.
              </p>
            </div>

            <Link
              href="/partner/blog/new"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
            >
              <PenLine size={17} />
              Create blog draft
            </Link>
          </div>
        </section>

        {error ? (
          <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error.message}
          </div>
        ) : null}

        <section className="mt-8 grid gap-5 sm:grid-cols-3">
          <SummaryCard
            label="Working drafts"
            value={editable.length}
          />

          <SummaryCard
            label="Waiting for review"
            value={waitingForReview.length}
          />

          <SummaryCard
            label="Published"
            value={published.length}
          />
        </section>

        <section className="mt-10">
          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Keep working
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Drafts you can edit
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#6b6880]">
              These have not been submitted yet, or have been returned
              with feedback.
            </p>
          </div>

          {editable.length > 0 ? (
            <div className="grid gap-5">
              {editable.map((draft) => (
                <DraftCard
                  key={draft.id}
                  draft={draft}
                  editable
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No working drafts yet"
              text="Create your first draft and build it gradually before sending it for review."
            />
          )}
        </section>

        <section className="mt-10">
          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              With Robyn
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Waiting for review
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#6b6880]">
              Once submitted, the draft is locked from editing while it
              is being reviewed.
            </p>
          </div>

          {waitingForReview.length > 0 ? (
            <div className="grid gap-5">
              {waitingForReview.map((draft) => (
                <DraftCard
                  key={draft.id}
                  draft={draft}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Nothing waiting for review"
              text="Submitted articles will appear here until they are approved or returned for changes."
            />
          )}
        </section>

        {published.length > 0 ? (
          <section className="mt-10">
            <div className="mb-5">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Live in the Hive
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Published articles
              </h2>
            </div>

            <div className="grid gap-5">
              {published.map((draft) => (
                <DraftCard
                  key={draft.id}
                  draft={draft}
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}

function DraftCard({
  draft,
  editable = false,
}: {
  draft: BlogDraft;
  editable?: boolean;
}) {
  return (
    <article className="rounded-4xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-7">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={
                draft.status === "changes_requested"
                  ? "rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800"
                  : draft.status === "review"
                    ? "rounded-full bg-[#fff7df] px-3 py-1 text-xs font-semibold text-[#6b5b45]"
                    : draft.status === "published"
                      ? "rounded-full bg-[#f0fdfa] px-3 py-1 text-xs font-semibold text-[#0f766e]"
                      : "rounded-full bg-[#faf8f5] px-3 py-1 text-xs font-semibold text-[#6b6880]"
              }
            >
              {statusLabel(draft.status)}
            </span>

            {draft.audio_url ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#f0fdfa] px-3 py-1 text-xs font-semibold text-[#0f766e]">
                <Headphones size={12} />
                Audio added
              </span>
            ) : null}
          </div>

          <h3 className="mt-4 text-2xl font-bold">
            {draft.title}
          </h3>

          {draft.tag ? (
            <p className="mt-2 text-sm font-semibold text-[#0f766e]">
              {draft.tag}
            </p>
          ) : null}

          {draft.excerpt ? (
            <p className="mt-3 text-sm leading-relaxed text-[#5f5b73]">
              {draft.excerpt}
            </p>
          ) : null}

          {draft.review_notes ? (
            <div className="mt-5 rounded-3xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-800">
                Review notes
              </p>

              <p className="mt-2 text-sm leading-relaxed text-amber-900">
                {draft.review_notes}
              </p>
            </div>
          ) : null}

          <p className="mt-4 text-xs text-[#8a8798]">
            Updated {formatDate(draft.updated_at)}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          {editable ? (
            <Link
              href={`/partner/blog/${draft.id}/edit`}
              className="inline-flex items-center gap-2 rounded-full bg-[#0f766e] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
            >
              <PenLine size={15} />
              Edit draft
            </Link>
          ) : null}

          {draft.status === "review" ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-[#f4d9a6] bg-[#fff7df] px-4 py-2.5 text-sm font-semibold text-[#6b5b45]">
              <Send size={15} />
              Submitted
            </span>
          ) : null}

          {draft.status === "published" ? (
            <Link
              href={`/blog/${draft.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-4 py-2.5 text-sm font-semibold text-[#0f766e]"
            >
              View article
              <ArrowRight size={15} />
            </Link>
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

function EmptyState({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-4xl border border-dashed border-[#e8e4de] bg-white p-8 text-center">
      <FileText
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