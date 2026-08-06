import Link from "next/link";
import { redirect } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Eye,
  FileText,
  LinkIcon,
  LockKeyhole,
  Tag,
  UsersRound,
} from "lucide-react";
import { createClient } from "@/lib/supabase-server";

type ResourceItem = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  file_url: string | null;
  access_type: "free" | "members";
  is_published: boolean;
  created_at: string;
};

export default async function AdminResourcesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/admin/resources");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin" && profile?.role !== "superadmin") {
    redirect("/dashboard");
  }

  const { data: resources, error } = await supabase
    .from("resource_library_items")
    .select(
      "id, title, description, category, file_url, access_type, is_published, created_at",
    )
    .order("created_at", { ascending: false });

  const typedResources = (resources || []) as ResourceItem[];

  const publishedResources = typedResources.filter(
    (resource) => resource.is_published,
  );

  const draftResources = typedResources.filter(
    (resource) => !resource.is_published,
  );

  const incompleteResources = typedResources.filter(
    (resource) =>
      !resource.title.trim() ||
      !resource.description?.trim() ||
      !resource.category?.trim() ||
      !resource.file_url,
  );

  const freeResources = typedResources.filter(
    (resource) => resource.access_type === "free",
  );

  const memberResources = typedResources.filter(
    (resource) => resource.access_type === "members",
  );

  return (
    <main className="min-h-screen bg-[#fffaf3] px-5 py-12 text-[#1e1b2e] sm:px-6 md:py-20">
      <section className="mx-auto max-w-7xl">
        <Link
          href="/admin"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e] transition hover:text-[#0d6962]"
        >
          <ArrowLeft size={16} />
          Back to admin dashboard
        </Link>

        <section className="mb-8 overflow-hidden rounded-4xl border border-[#f4d9a6] bg-white shadow-sm">
          <div className="grid gap-8 bg-linear-to-br from-[#fff7df] via-white to-[#f0fdfa] p-7 md:p-12 lg:grid-cols-[1fr_0.7fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
                Allied Health Hive | Resource Administration
              </p>

              <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
                Review published resources, drafts and missing links.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#5f5b73] md:text-xl">
                Check what members can access and identify resources that still
                need a description, category, file or publication decision.
              </p>
            </div>

            <aside className="rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-6 md:p-8">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <FileText size={27} />
              </div>

              <h2 className="mb-4 text-2xl font-bold">
                Current administration stage
              </h2>

              <p className="text-sm leading-relaxed text-[#3f5f5a]">
                This page currently audits resources already stored in
                Supabase. A connected create, edit and archive form still needs
                to be added before resources can be changed from this page.
              </p>
            </aside>
          </div>
        </section>

        {error ? (
          <div className="mb-8 rounded-4xl border border-red-200 bg-red-50 p-6 text-red-700">
            <h2 className="mb-2 text-xl font-bold">
              Could not load resources
            </h2>

            <p className="text-sm leading-relaxed">{error.message}</p>
          </div>
        ) : null}

        <section className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          <SummaryCard
            label="Total"
            value={typedResources.length}
            text="All resource records"
          />

          <SummaryCard
            label="Published"
            value={publishedResources.length}
            text="Visible resources"
          />

          <SummaryCard
            label="Drafts"
            value={draftResources.length}
            text="Not currently published"
          />

          <SummaryCard
            label="Needs attention"
            value={incompleteResources.length}
            text="Missing key information"
            warning
          />

          <SummaryCard
            label="Members only"
            value={memberResources.length}
            text="Private resources"
          />
        </section>

        <section className="mb-8 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-10">
          <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Access overview
              </p>

              <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                Check who can see each resource.
              </h2>

              <p className="mt-4 text-base leading-relaxed text-[#6b6880]">
                Free resources may be suitable for public pathways. Member
                resources should only appear inside protected learning areas.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <AccessCard
                icon={<Eye size={22} />}
                title="Free resources"
                value={freeResources.length}
                text="Available for public or open-access pathways."
              />

              <AccessCard
                icon={<LockKeyhole size={22} />}
                title="Member resources"
                value={memberResources.length}
                text="Intended for signed-in or approved member access."
              />
            </div>
          </div>
        </section>

        {incompleteResources.length > 0 ? (
          <ResourceSection
            eyebrow="Action required"
            title="Resources needing attention"
            text="These records are missing information that helps users understand or open the resource."
            resources={incompleteResources}
            warning
          />
        ) : (
          <section className="mb-10 rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-6">
            <div className="flex gap-3">
              <CheckCircle2
                size={22}
                className="mt-0.5 shrink-0 text-[#0f766e]"
              />

              <div>
                <h2 className="font-bold">
                  All resource records contain the main information.
                </h2>

                <p className="mt-1 text-sm leading-relaxed text-[#3f5f5a]">
                  No missing titles, descriptions, categories or file links
                  were detected.
                </p>
              </div>
            </div>
          </section>
        )}

        <ResourceSection
          eyebrow="Visible resources"
          title="Published resources"
          text="These resources are marked as published and may be visible in their intended learning areas."
          resources={publishedResources}
          emptyTitle="No resources are published"
          emptyText="Published resources will appear here once their status is updated."
        />

        <ResourceSection
          eyebrow="Work in progress"
          title="Draft resources"
          text="These records are not currently marked as published."
          resources={draftResources}
          emptyTitle="No draft resources"
          emptyText="All current resource records are marked as published."
        />

        <section className="mb-8 rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-7 shadow-sm md:p-10">
          <div className="grid gap-7 md:grid-cols-[auto_1fr_auto] md:items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#0f766e]">
              <BookOpen size={27} />
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Member experience
              </p>

              <h2 className="text-2xl font-bold">
                Preview the private member library.
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-[#3f5f5a]">
                Check whether published links, labels and resources appear as
                expected for signed-in members.
              </p>
            </div>

            <Link
              href="/member-library"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
            >
              Preview member library
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section className="rounded-4xl bg-[#1e1b2e] p-8 text-white shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.65fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#99f6e4]">
                Next development step
              </p>

              <h2 className="text-3xl font-bold leading-tight md:text-5xl">
                Add resource creation and editing inside the admin portal.
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#d9d7e5] md:text-lg">
                The next step is a protected resource form and server actions
                for creating, updating, publishing and archiving resource
                records without opening Supabase.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
              <div className="flex gap-3">
                <UsersRound
                  size={22}
                  className="mt-0.5 shrink-0 text-[#99f6e4]"
                />

                <p className="text-sm leading-relaxed text-[#d9d7e5]">
                  Archive is generally safer than permanent deletion because it
                  preserves the record and reduces the chance of accidentally
                  removing a resource still linked elsewhere.
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function ResourceSection({
  eyebrow,
  title,
  text,
  resources,
  warning = false,
  emptyTitle,
  emptyText,
}: {
  eyebrow: string;
  title: string;
  text: string;
  resources: ResourceItem[];
  warning?: boolean;
  emptyTitle?: string;
  emptyText?: string;
}) {
  return (
    <section className="mb-10">
      <div className="mb-6">
        <p
          className={`mb-3 text-sm font-semibold uppercase tracking-[0.14em] ${
            warning ? "text-amber-700" : "text-[#0f766e]"
          }`}
        >
          {eyebrow}
        </p>

        <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>

        <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#6b6880]">
          {text}
        </p>
      </div>

      {resources.length > 0 ? (
        <div className="grid gap-5">
          {resources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              showAttention={warning}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title={emptyTitle || "No resources in this section"}
          message={emptyText || "There are no resource records to display."}
        />
      )}
    </section>
  );
}

function ResourceCard({
  resource,
  showAttention = false,
}: {
  resource: ResourceItem;
  showAttention?: boolean;
}) {
  const createdDate = new Intl.DateTimeFormat("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Australia/Melbourne",
  }).format(new Date(resource.created_at));

  const issues = getResourceIssues(resource);

  return (
    <article
      className={`rounded-4xl border bg-white p-6 shadow-sm md:p-8 ${
        showAttention
          ? "border-amber-200"
          : "border-[#e8e4de]"
      }`}
    >
      <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="max-w-3xl">
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="inline-flex rounded-full bg-[#f0fdfa] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
              {resource.access_type === "free"
                ? "Free access"
                : "Member access"}
            </span>

            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${
                resource.is_published
                  ? "bg-[#eefbf5] text-[#047857]"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {resource.is_published ? "Published" : "Draft"}
            </span>

            {resource.category ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#faf8f5] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#6b6880]">
                <Tag size={12} />
                {resource.category}
              </span>
            ) : (
              <span className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-amber-700">
                No category
              </span>
            )}
          </div>

          <h3 className="mb-3 text-2xl font-bold">
            {resource.title || "Untitled resource"}
          </h3>

          <p className="text-base leading-relaxed text-[#6b6880]">
            {resource.description || "No description has been added yet."}
          </p>
        </div>

        <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5 md:min-w-64">
          <p className="mb-1 text-sm font-semibold text-[#0f766e]">
            Added
          </p>

          <p className="text-sm leading-relaxed">{createdDate}</p>
        </div>
      </div>

      {showAttention && issues.length > 0 ? (
        <div className="mb-5 rounded-3xl border border-amber-200 bg-amber-50 p-5">
          <div className="mb-3 flex items-center gap-2 font-semibold text-amber-800">
            <AlertTriangle size={18} />
            Attention needed
          </div>

          <div className="grid gap-2">
            {issues.map((issue) => (
              <p
                key={issue}
                className="text-sm leading-relaxed text-amber-800"
              >
                {issue}
              </p>
            ))}
          </div>
        </div>
      ) : null}

      <div
        className={`rounded-3xl border p-5 ${
          resource.file_url
            ? "border-[#99f6e4] bg-[#f0fdfa]"
            : "border-amber-200 bg-amber-50"
        }`}
      >
        <div
          className={`mb-3 flex items-center gap-2 text-sm font-semibold ${
            resource.file_url ? "text-[#0f766e]" : "text-amber-800"
          }`}
        >
          <FileText size={18} />
          Resource file or link
        </div>

        {resource.file_url ? (
          <a
            href={resource.file_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 break-all text-sm font-semibold text-[#1e1b2e] underline decoration-[#99f6e4] underline-offset-4"
          >
            Open resource
            <LinkIcon size={14} />
          </a>
        ) : (
          <p className="text-sm text-amber-800">
            No file or resource link has been added.
          </p>
        )}
      </div>

      <div className="mt-5 rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
        <p className="text-sm leading-relaxed text-[#6b6880]">
          Resource ID:{" "}
          <span className="font-mono text-xs text-[#1e1b2e]">
            {resource.id}
          </span>
        </p>

        <p className="mt-2 text-sm leading-relaxed text-[#6b6880]">
          Editing and archiving controls will be added after the protected
          resource form and server actions are connected.
        </p>
      </div>
    </article>
  );
}

function SummaryCard({
  label,
  value,
  text,
  warning = false,
}: {
  label: string;
  value: number;
  text: string;
  warning?: boolean;
}) {
  return (
    <article
      className={`rounded-3xl border p-6 shadow-sm ${
        warning
          ? "border-amber-200 bg-amber-50"
          : "border-[#e8e4de] bg-white"
      }`}
    >
      <p
        className={`text-sm font-semibold uppercase tracking-[0.12em] ${
          warning ? "text-amber-700" : "text-[#0f766e]"
        }`}
      >
        {label}
      </p>

      <p className="mt-3 text-4xl font-bold">{value}</p>

      <p className="mt-2 text-sm leading-relaxed text-[#6b6880]">
        {text}
      </p>
    </article>
  );
}

function AccessCard({
  icon,
  title,
  value,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
      <div className="mb-3 text-[#0f766e]">{icon}</div>

      <p className="text-3xl font-bold">{value}</p>

      <h3 className="mt-2 text-lg font-bold">{title}</h3>

      <p className="mt-2 text-sm leading-relaxed text-[#6b6880]">
        {text}
      </p>
    </article>
  );
}

function EmptyState({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="rounded-4xl border border-dashed border-[#e8e4de] bg-white p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
        <LockKeyhole size={24} />
      </div>

      <h3 className="mb-2 text-xl font-bold">{title}</h3>

      <p className="text-base leading-relaxed text-[#6b6880]">
        {message}
      </p>
    </div>
  );
}

function getResourceIssues(resource: ResourceItem) {
  const issues: string[] = [];

  if (!resource.title.trim()) {
    issues.push("Add a clear resource title.");
  }

  if (!resource.description?.trim()) {
    issues.push("Add a description explaining how the resource is used.");
  }

  if (!resource.category?.trim()) {
    issues.push(
      "Add a category such as webinar handout, practical tool, learning topic or family resource.",
    );
  }

  if (!resource.file_url) {
    issues.push("Add the PDF, file or resource URL.");
  }

  return issues;
}