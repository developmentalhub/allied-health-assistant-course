"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase-server";

const ALLOWED_ROLES = [
  "partner",
  "admin",
  "superadmin",
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function requireContributor() {
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

  if (
    !profile?.role ||
    !ALLOWED_ROLES.includes(profile.role)
  ) {
    redirect("/dashboard");
  }

  return {
    supabase,
    user,
    profile,
  };
}

async function uploadAudio(
  supabase: Awaited<
    ReturnType<typeof createClient>
  >,
  userId: string,
  file: File,
) {
  if (!file || file.size === 0) {
    return null;
  }

  if (!file.type.startsWith("audio/")) {
    throw new Error("Please upload an audio file.");
  }

  const extension =
    file.name.split(".").pop()?.toLowerCase() || "mp3";

  const fileName = `${Date.now()}-${crypto.randomUUID()}.${extension}`;

  const path = `${userId}/${fileName}`;

  const { error } = await supabase.storage
    .from("blog-audio")
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage
    .from("blog-audio")
    .getPublicUrl(path);

  return data.publicUrl;
}

export async function createBlogDraft(
  formData: FormData,
) {
  const { supabase, user, profile } =
    await requireContributor();

  const title = String(
    formData.get("title") || "",
  ).trim();

  const excerpt = String(
    formData.get("excerpt") || "",
  ).trim();

  const tag = String(
    formData.get("tag") || "",
  ).trim();

  const body = String(
    formData.get("body") || "",
  ).trim();

  const audioTitle = String(
    formData.get("audioTitle") || "",
  ).trim();

  const seoTitle = String(
    formData.get("seoTitle") || "",
  ).trim();

  const seoDescription = String(
    formData.get("seoDescription") || "",
  ).trim();

  if (!title) {
    redirect(
      "/partner/blog/new?error=Please%20add%20a%20title",
    );
  }

  if (!body) {
    redirect(
      "/partner/blog/new?error=Please%20add%20the%20article",
    );
  }

  let audioUrl: string | null = null;

  const audioFile = formData.get("audioFile");

  if (
    audioFile instanceof File &&
    audioFile.size > 0
  ) {
    try {
      audioUrl = await uploadAudio(
        supabase,
        user.id,
        audioFile,
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Audio upload failed.";

      redirect(
        `/partner/blog/new?error=${encodeURIComponent(
          message,
        )}`,
      );
    }
  }

  const baseSlug =
    slugify(title) || "hive-article";

  const slug = `${baseSlug}-${Date.now()
    .toString()
    .slice(-6)}`;

  const { data: draft, error } = await supabase
    .from("blog_drafts")
    .insert({
      author_id: user.id,
      author_name:
        profile.full_name ||
        user.email ||
        "Hive contributor",

      title,
      slug,
      excerpt: excerpt || null,
      tag: tag || null,
      body,

      audio_url: audioUrl,
      audio_title:
        audioTitle ||
        (audioUrl
          ? "Listen to this article"
          : null),

      seo_title: seoTitle || null,
      seo_description:
        seoDescription || null,

      status: "draft",
      updated_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (error || !draft) {
    redirect(
      `/partner/blog/new?error=${encodeURIComponent(
        error?.message ||
          "The draft could not be created.",
      )}`,
    );
  }

  revalidatePath("/partner/blog");

  redirect(
    `/partner/blog/${draft.id}/edit?created=true`,
  );
}

export async function updateBlogDraft(
  draftId: string,
  formData: FormData,
) {
  const { supabase, user, profile } =
    await requireContributor();

  const { data: existing } = await supabase
    .from("blog_drafts")
    .select(
      "id, author_id, status, audio_url",
    )
    .eq("id", draftId)
    .maybeSingle();

  if (!existing) {
    redirect("/partner/blog");
  }

  const isAdmin =
    profile.role === "admin" ||
    profile.role === "superadmin";

  if (
    existing.author_id !== user.id &&
    !isAdmin
  ) {
    redirect("/partner/blog");
  }

  if (
    existing.status !== "draft" &&
    existing.status !== "changes_requested"
  ) {
    redirect(
      `/partner/blog/${draftId}/edit?error=This%20draft%20is%20currently%20locked`,
    );
  }

  const title = String(
    formData.get("title") || "",
  ).trim();

  const excerpt = String(
    formData.get("excerpt") || "",
  ).trim();

  const tag = String(
    formData.get("tag") || "",
  ).trim();

  const body = String(
    formData.get("body") || "",
  ).trim();

  const audioTitle = String(
    formData.get("audioTitle") || "",
  ).trim();

  const seoTitle = String(
    formData.get("seoTitle") || "",
  ).trim();

  const seoDescription = String(
    formData.get("seoDescription") || "",
  ).trim();

  if (!title || !body) {
    redirect(
      `/partner/blog/${draftId}/edit?error=Please%20include%20a%20title%20and%20article`,
    );
  }

  let audioUrl =
    existing.audio_url || null;

  const audioFile = formData.get("audioFile");

  if (
    audioFile instanceof File &&
    audioFile.size > 0
  ) {
    try {
      audioUrl = await uploadAudio(
        supabase,
        user.id,
        audioFile,
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Audio upload failed.";

      redirect(
        `/partner/blog/${draftId}/edit?error=${encodeURIComponent(
          message,
        )}`,
      );
    }
  }

  const { error } = await supabase
    .from("blog_drafts")
    .update({
      title,
      excerpt: excerpt || null,
      tag: tag || null,
      body,

      audio_url: audioUrl,
      audio_title:
        audioTitle ||
        (audioUrl
          ? "Listen to this article"
          : null),

      seo_title: seoTitle || null,
      seo_description:
        seoDescription || null,

      updated_at: new Date().toISOString(),
    })
    .eq("id", draftId);

  if (error) {
    redirect(
      `/partner/blog/${draftId}/edit?error=${encodeURIComponent(
        error.message,
      )}`,
    );
  }

  revalidatePath("/partner/blog");
  revalidatePath(
    `/partner/blog/${draftId}/edit`,
  );

  redirect(
    `/partner/blog/${draftId}/edit?saved=true`,
  );
}

export async function submitBlogForReview(
  draftId: string,
) {
  const { supabase, user } =
    await requireContributor();

  const { data: draft } = await supabase
    .from("blog_drafts")
    .select(
      "id, author_id, title, body, status",
    )
    .eq("id", draftId)
    .maybeSingle();

  if (!draft) {
    redirect("/partner/blog");
  }

  if (draft.author_id !== user.id) {
    redirect("/partner/blog");
  }

  if (
    draft.status !== "draft" &&
    draft.status !== "changes_requested"
  ) {
    redirect("/partner/blog");
  }

  if (
    !draft.title?.trim() ||
    !draft.body?.trim()
  ) {
    redirect(
      `/partner/blog/${draftId}/edit?error=Please%20finish%20the%20title%20and%20article%20before%20submitting`,
    );
  }

  const { error } = await supabase
    .from("blog_drafts")
    .update({
      status: "review",
      submitted_at:
        new Date().toISOString(),
      review_notes: null,
      updated_at:
        new Date().toISOString(),
    })
    .eq("id", draftId)
    .eq("author_id", user.id);

  if (error) {
    redirect(
      `/partner/blog/${draftId}/edit?error=${encodeURIComponent(
        error.message,
      )}`,
    );
  }

  revalidatePath("/partner/blog");

  redirect(
    "/partner/blog?submitted=true",
  );
}