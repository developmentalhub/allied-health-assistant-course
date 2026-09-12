import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  FileAudio,
  PenLine,
  Save,
} from "lucide-react";

import { createClient } from "@/lib/supabase-server";
import { createBlogDraft } from "../actions";

export default async function NewBlogPage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
  }>;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      "/login?redirect=/partner/blog/new",
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (
    !profile?.role ||
    ![
      "partner",
      "admin",
      "superadmin",
    ].includes(profile.role)
  ) {
    redirect("/dashboard");
  }

  const { error } = await searchParams;

  return (
    <main className="min-h-screen bg-[#fffaf3] px-5 py-10 text-[#1e1b2e] sm:px-6 md:py-16">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/partner/blog"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
        >
          <ArrowLeft size={16} />
          Back to blog drafts
        </Link>

        <section className="rounded-4xl border border-[#f4d9a6] bg-linear-to-br from-[#fff7df] via-white to-[#f0fdfa] p-7 md:p-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0f766e] text-white">
            <PenLine size={26} />
          </div>

          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Allied Health Hive
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Start a blog draft
          </h1>

          <p className="mt-4 max-w-3xl leading-relaxed text-[#5f5b73]">
            Add your ideas in your own words and build the article
            gradually. Saving this page creates a private draft only.
            It will not appear publicly until Robyn has reviewed and
            approved it.
          </p>
        </section>

        {error ? (
          <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <form
          action={createBlogDraft}
          className="mt-8 rounded-4xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-9"
        >
          <div className="grid gap-6">
            <Field
              label="Article title"
              name="title"
              required
              placeholder="What do AHAs need to hear about this?"
            />

            <Field
              label="Short introduction"
              name="excerpt"
              placeholder="A couple of sentences explaining what this article is about."
            />

            <Field
              label="Topic"
              name="tag"
              placeholder="For example: Communication, Autism, Supervision"
            />

            <div>
              <label
                htmlFor="body"
                className="text-sm font-semibold text-[#1e1b2e]"
              >
                Article
              </label>

              <p className="mt-1 text-xs leading-relaxed text-[#6b6880]">
                Write naturally. It does not have to sound polished yet.
                Robyn will review the article before anything is published.
              </p>

              <textarea
                id="body"
                name="body"
                required
                rows={18}
                className="mt-3 w-full rounded-3xl border border-[#e8e4de] bg-[#fffdf9] px-4 py-4 text-sm leading-relaxed outline-none transition focus:border-[#0f766e]"
                placeholder="Write your article here..."
              />
            </div>

            <section className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
              <div className="flex items-start gap-3">
                <FileAudio
                  size={22}
                  className="mt-1 shrink-0 text-[#0f766e]"
                />

                <div className="flex-1">
                  <h2 className="font-bold">
                    Add audio if you have recorded it
                  </h2>

                  <p className="mt-1 text-sm leading-relaxed text-[#3f5f5a]">
                    This is optional. You can also save the article now
                    and add your audio later.
                  </p>

                  <input
                    type="file"
                    name="audioFile"
                    accept="audio/*,.mp3,.m4a,.wav"
                    className="mt-4 block w-full text-sm"
                  />

                  <div className="mt-4">
                    <label
                      htmlFor="audioTitle"
                      className="text-sm font-semibold"
                    >
                      Audio title
                    </label>

                    <input
                      id="audioTitle"
                      name="audioTitle"
                      placeholder="Listen to this article"
                      className="mt-2 w-full rounded-2xl border border-[#99f6e4] bg-white px-4 py-3 text-sm outline-none focus:border-[#0f766e]"
                    />
                  </div>
                </div>
              </div>
            </section>

            <details className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
              <summary className="cursor-pointer font-semibold">
                Optional search details
              </summary>

              <div className="mt-5 grid gap-5">
                <Field
                  label="SEO title"
                  name="seoTitle"
                  placeholder="Leave blank if the article title is fine"
                />

                <div>
                  <label
                    htmlFor="seoDescription"
                    className="text-sm font-semibold"
                  >
                    SEO description
                  </label>

                  <textarea
                    id="seoDescription"
                    name="seoDescription"
                    rows={3}
                    className="mt-2 w-full rounded-2xl border border-[#e8e4de] bg-white px-4 py-3 text-sm outline-none focus:border-[#0f766e]"
                  />
                </div>
              </div>
            </details>

            <div className="flex flex-wrap items-center gap-3 border-t border-[#eee9e2] pt-6">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                <Save size={16} />
                Save draft
              </button>

              <p className="text-xs text-[#6b6880]">
                This does not publish the article.
              </p>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

function Field({
  label,
  name,
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-sm font-semibold text-[#1e1b2e]"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-[#e8e4de] bg-[#fffdf9] px-4 py-3 text-sm outline-none transition focus:border-[#0f766e]"
      />
    </div>
  );
}