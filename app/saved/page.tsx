import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  Bookmark,
  ExternalLink,
} from "lucide-react";

import { createClient } from "@/lib/supabase-server";

type SavedItem = {
  id: string;
  content_type:
    | "blog"
    | "tool"
    | "webinar"
    | "resource"
    | "topic"
    | "community";
  content_key: string;
  title: string;
  href: string;
  created_at: string;
};

function formatType(type: SavedItem["content_type"]) {
  if (type === "blog") return "Blog";
  if (type === "tool") return "Tool";
  if (type === "webinar") return "Webinar";
  if (type === "resource") return "Resource";
  if (type === "topic") return "Topic";
  return "Community";
}

export default async function SavedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/saved");
  }

  const { data, error } = await supabase
    .from("saved_content")
    .select(
      "id, content_type, content_key, title, href, created_at",
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const items = (data || []) as SavedItem[];

  return (
    <main className="min-h-screen bg-[#fffaf3] px-5 py-10 text-[#1e1b2e] sm:px-6 md:py-16">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
        >
          <ArrowLeft size={16} />
          Back to dashboard
        </Link>

        <section className="rounded-4xl border border-[#f4d9a6] bg-linear-to-br from-[#fff7df] via-white to-[#f0fdfa] p-7 shadow-sm md:p-10">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#0f766e] text-white">
            <Bookmark size={27} />
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            My Hive
          </p>

          <h1 className="mt-2 text-4xl font-bold md:text-5xl">
            Saved items
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#5f5b73]">
            Keep the articles, tools, webinars and resources you want to
            return to without having to find them again.
          </p>
        </section>

        {error ? (
          <section className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-6">
            <p className="text-sm text-red-700">
              {error.message}
            </p>
          </section>
        ) : null}

        {!error && items.length === 0 ? (
          <section className="mt-8 rounded-4xl border border-dashed border-[#e8e4de] bg-white p-10 text-center">
            <Bookmark
              size={30}
              className="mx-auto text-[#0f766e]"
            />

            <h2 className="mt-4 text-2xl font-bold">
              Nothing saved yet
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#6b6880]">
              When you see something useful around the Hive, use the Save
              button and it will appear here.
            </p>

            <Link
              href="/community"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white"
            >
              Explore the Hive
            </Link>
          </section>
        ) : null}

        {!error && items.length > 0 ? (
          <section className="mt-8 grid gap-4">
            {items.map((item) => (
              <article
                key={item.id}
                className="rounded-3xl border border-[#e8e4de] bg-white p-5 shadow-sm md:p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <span className="inline-flex rounded-full bg-[#f0fdfa] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
                      {formatType(item.content_type)}
                    </span>

                    <h2 className="mt-3 text-xl font-bold">
                      {item.title}
                    </h2>
                  </div>

                  <Link
                    href={item.href}
                    className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#0f766e]"
                  >
                    Open
                    <ExternalLink size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </section>
        ) : null}
      </div>
    </main>
  );
}