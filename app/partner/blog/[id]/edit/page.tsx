import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  FileAudio,
  Save,
  Send,
} from "lucide-react";

import { createClient } from "@/lib/supabase-server";

import {
  submitBlogForReview,
  updateBlogDraft,
} from "../../actions";

export default async function EditBlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    saved?: string;
    created?: string;
    error?: string;
  }>;
}) {
  const { id } = await params;
  const messages = await searchParams;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      `/login?redirect=/partner/blog/${id}/edit`,
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

  const { data: draft } = await supabase
    .from("blog_drafts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!draft) {
    redirect("/partner/blog");
  }

  const canEdit =
    draft.status === "draft" ||
    draft.status === "changes_requested";

  const updateAction =
    updateBlogDraft.bind(null, id);

  const submitAction =
    submitBlogForReview.bind(null, id);

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
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Blog contributor
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            {draft.title}
          </h1>

          <p className="mt-4 leading-relaxed text-[#5f5b73]">
            Keep working until you are happy with the article, then send
            it to Robyn for review. Submitting it does not publish it.
          </p>
        </section>

        {messages.created ? (
          <Notice>
            Your draft has been created. You can keep working on it now
            or return to it later.
          </Notice>
        ) : null}

        {messages.saved ? (
          <Notice>
            Your changes have been saved.
          </Notice>
        ) : null}

        {messages.error ? (
          <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {messages.error}
          </div>
        ) : null}

        {draft.review_notes ? (
          <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm font-semibold text-amber-900">
              Notes from Robyn
            </p>

            <p className="mt-2 text-sm leading-relaxed text-amber-900">
              {draft.review_notes}
            </p>
          </div>
        ) : null}

        {canEdit ? (
          <form
            action={updateAction}
            className="mt-8 rounded-4xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-9"
          >
            <div className="grid gap-6">
              <Field
                label="Article title"
                name="title"
                defaultValue={draft.title || ""}
                required
              />

              <Field
                label="Short introduction"
                name="excerpt"
                defaultValue={draft.excerpt || ""}
              />

              <Field
                label="Topic"
                name="tag"
                defaultValue={draft.tag || ""}
              />

              <div>
                <label
                  htmlFor="body"
                  className="text-sm font-semibold"
                >
                  Article
                </label>

                <textarea
                  id="body"
                  name="body"
                  required
                  rows={20}
                  defaultValue={draft.body || ""}
                  className="mt-2 w-full rounded-3xl border border-[#e8e4de] bg-[#fffdf9] px-4 py-4 text-sm leading-relaxed outline-none focus:border-[#0f766e]"
                />
              </div>

              <section className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
                <div className="flex gap-3">
                  <FileAudio
                    size={22}
                    className="mt-1 shrink-0 text-[#0f766e]"
                  />

                  <div className="flex-1">
                    <h2 className="font-bold">
                      Audio
                    </h2>

                    {draft.audio_url ? (
                      <audio
                        controls
                        preload="metadata"
                        className="mt-4 w-full"
                      >
                        <source src={draft.audio_url} />
                      </audio>
                    ) : (
                      <p className="mt-2 text-sm text-[#3f5f5a]">
                        No audio has been added yet.
                      </p>
                    )}

                    <p className="mt-4 text-sm text-[#3f5f5a]">
                      Uploading a new file will replace the audio attached
                      to this draft.
                    </p>

                    <input
                      type="file"
                      name="audioFile"
                      accept="audio/*,.mp3,.m4a,.wav"
                      className="mt-3 block w-full text-sm"
                    />

                    <Field
                      label="Audio title"
                      name="audioTitle"
                      defaultValue={
                        draft.audio_title || ""
                      }
                    />
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
                    defaultValue={
                      draft.seo_title || ""
                    }
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
                      defaultValue={
                        draft.seo_description || ""
                      }
                      className="mt-2 w-full rounded-2xl border border-[#e8e4de] bg-white px-4 py-3 text-sm outline-none focus:border-[#0f766e]"
                    />
                  </div>
                </div>
              </details>

              <div className="border-t border-[#eee9e2] pt-6">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white"
                >
                  <Save size={16} />
                  Save changes
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="mt-8 rounded-4xl border border-[#f4d9a6] bg-[#fff7df] p-7">
            <h2 className="text-xl font-bold">
              This article has been submitted.
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-[#6b5b45]">
              It is locked while Robyn reviews it. If changes are needed,
              it will return to your draft area with notes.
            </p>
          </div>
        )}

        {canEdit ? (
          <section className="mt-6 rounded-4xl bg-[#1e1b2e] p-6 text-white md:p-8">
            <h2 className="text-2xl font-bold">
              Ready for Robyn to review it?
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#d9d7e5]">
              Save your latest changes first. When you submit the article,
              it will be locked while Robyn reviews it. It still will not
              be public.
            </p>

            <form
              action={submitAction}
              className="mt-5"
            >
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white"
              >
                <Send size={16} />
                Submit for Robyn's review
              </button>
            </form>
          </section>
        ) : null}
      </div>
    </main>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required = false,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <div className="mt-4 first:mt-0">
      <label
        htmlFor={name}
        className="text-sm font-semibold"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="mt-2 w-full rounded-2xl border border-[#e8e4de] bg-[#fffdf9] px-4 py-3 text-sm outline-none focus:border-[#0f766e]"
      />
    </div>
  );
}

function Notice({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5 text-sm text-[#0f766e]">
      {children}
    </div>
  );
}