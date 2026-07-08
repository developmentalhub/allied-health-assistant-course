import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  LinkIcon,
  LockKeyhole,
  Tag,
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
      "id, title, description, category, file_url, access_type, is_published, created_at"
    )
    .order("created_at", { ascending: false });

  const typedResources = (resources || []) as ResourceItem[];

  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-14 text-[#1e1b2e] md:py-20">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Link
            href="/admin"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e] transition hover:text-[#0d6962]"
          >
            <ArrowLeft size={16} />
            Back to admin dashboard
          </Link>

          <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Admin resources
          </p>

          <h1 className="mb-5 text-4xl font-bold leading-tight md:text-6xl">
            PDF resource library.
          </h1>

          <p className="max-w-3xl text-xl leading-relaxed text-[#5f5b73]">
            Use this page to check which PDF resources have been added for the
            monthly AHA Professional Development membership.
          </p>
        </div>

        {error ? (
          <div className="mb-8 rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
            <h2 className="mb-2 text-xl font-bold">
              Could not load resources
            </h2>
            <p className="text-sm leading-relaxed">{error.message}</p>
          </div>
        ) : null}

        <section className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-8 shadow-sm md:p-10">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
            <FileText size={24} />
          </div>

          <h2 className="mb-4 text-3xl font-bold">Quick admin note</h2>

          <p className="max-w-3xl text-base leading-relaxed text-[#3f5f5a]">
            This first version is view-only. Add PDF rows in Supabase for now.
            Next, we can add a simple upload/edit form so you and Jess can add
            PDF links directly from the admin portal.
          </p>
        </section>

        {typedResources.length > 0 ? (
          <section className="grid gap-5">
            {typedResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </section>
        ) : (
          <EmptyState message="No PDF resources have been added yet." />
        )}
      </section>
    </main>
  );
}

function ResourceCard({ resource }: { resource: ResourceItem }) {
  const createdDate = new Intl.DateTimeFormat("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Australia/Melbourne",
  }).format(new Date(resource.created_at));

  return (
    <article className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-[#f0fdfa] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
              {resource.access_type === "free" ? "Free" : "Members"}
            </span>

            <span className="inline-flex items-center rounded-full bg-[#faf8f5] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#6b6880]">
              {resource.is_published ? "Published" : "Draft"}
            </span>

            {resource.category ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#faf8f5] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#6b6880]">
                <Tag size={12} />
                {resource.category}
              </span>
            ) : null}
          </div>

          <h2 className="mb-3 text-2xl font-bold">{resource.title}</h2>

          <p className="text-base leading-relaxed text-[#6b6880]">
            {resource.description || "No description added yet."}
          </p>
        </div>

        <div className="rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-4 md:min-w-60">
          <p className="mb-1 text-sm font-semibold text-[#0f766e]">
            Added
          </p>
          <p className="text-sm leading-relaxed text-[#1e1b2e]">
            {createdDate}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
          <FileText size={18} />
          PDF/resource link
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
          <p className="text-sm text-[#6b6880]">No file link added yet.</p>
        )}
      </div>
    </article>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-[#e8e4de] bg-white p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
        <LockKeyhole size={24} />
      </div>

      <p className="text-base leading-relaxed text-[#6b6880]">{message}</p>
    </div>
  );
}