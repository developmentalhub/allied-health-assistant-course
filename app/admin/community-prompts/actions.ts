"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase-server";

async function requireAdmin() {
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

  return {
    supabase,
    user,
    role: profile.role,
  };
}

export async function createCommunityPrompt(formData: FormData) {
  const { supabase, user } = await requireAdmin();

  const title = String(formData.get("title") || "").trim();
  const prompt = String(formData.get("prompt") || "").trim();

  if (!title) {
    redirect(
      "/admin/community-prompts?error=" +
        encodeURIComponent("Please add a title."),
    );
  }

  if (!prompt) {
    redirect(
      "/admin/community-prompts?error=" +
        encodeURIComponent("Please add the discussion prompt."),
    );
  }

  if (title.length > 200) {
    redirect(
      "/admin/community-prompts?error=" +
        encodeURIComponent(
          "Please keep the title under 200 characters.",
        ),
    );
  }

  if (prompt.length > 5000) {
    redirect(
      "/admin/community-prompts?error=" +
        encodeURIComponent(
          "Please keep the discussion prompt under 5,000 characters.",
        ),
    );
  }

  const { error } = await supabase
    .from("community_prompts")
    .insert({
      title,
      prompt,
      status: "draft",
      created_by: user.id,
    });

  if (error) {
    redirect(
      "/admin/community-prompts?error=" +
        encodeURIComponent(error.message),
    );
  }

  revalidatePath("/admin/community-prompts");

  redirect("/admin/community-prompts?created=true");
}

export async function publishCommunityPrompt(formData: FormData) {
  const { supabase } = await requireAdmin();

  const id = String(formData.get("id") || "").trim();

  if (!id) {
    redirect(
      "/admin/community-prompts?error=" +
        encodeURIComponent("Prompt ID is missing."),
    );
  }

  const { error: archiveError } = await supabase
    .from("community_prompts")
    .update({
      status: "archived",
      updated_at: new Date().toISOString(),
    })
    .eq("status", "published")
    .neq("id", id);

  if (archiveError) {
    redirect(
      "/admin/community-prompts?error=" +
        encodeURIComponent(archiveError.message),
    );
  }

  const now = new Date().toISOString();

  const { error } = await supabase
    .from("community_prompts")
    .update({
      status: "published",
      published_at: now,
      updated_at: now,
    })
    .eq("id", id);

  if (error) {
    redirect(
      "/admin/community-prompts?error=" +
        encodeURIComponent(error.message),
    );
  }

  revalidatePath("/admin/community-prompts");
  revalidatePath("/community");

  redirect("/admin/community-prompts?published=true");
}

export async function archiveCommunityPrompt(formData: FormData) {
  const { supabase } = await requireAdmin();

  const id = String(formData.get("id") || "").trim();

  if (!id) {
    redirect(
      "/admin/community-prompts?error=" +
        encodeURIComponent("Prompt ID is missing."),
    );
  }

  const { error } = await supabase
    .from("community_prompts")
    .update({
      status: "archived",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    redirect(
      "/admin/community-prompts?error=" +
        encodeURIComponent(error.message),
    );
  }

  revalidatePath("/admin/community-prompts");
  revalidatePath("/community");

  redirect("/admin/community-prompts?archived=true");
}

export async function restoreCommunityPromptToDraft(
  formData: FormData,
) {
  const { supabase } = await requireAdmin();

  const id = String(formData.get("id") || "").trim();

  if (!id) {
    redirect(
      "/admin/community-prompts?error=" +
        encodeURIComponent("Prompt ID is missing."),
    );
  }

  const { error } = await supabase
    .from("community_prompts")
    .update({
      status: "draft",
      published_at: null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    redirect(
      "/admin/community-prompts?error=" +
        encodeURIComponent(error.message),
    );
  }

  revalidatePath("/admin/community-prompts");

  redirect("/admin/community-prompts?restored=true");
}

export async function deleteCommunityPrompt(formData: FormData) {
  const { supabase, role } = await requireAdmin();

  if (role !== "superadmin") {
    redirect(
      "/admin/community-prompts?error=" +
        encodeURIComponent(
          "Only the superadmin can permanently delete a prompt.",
        ),
    );
  }

  const id = String(formData.get("id") || "").trim();

  if (!id) {
    redirect(
      "/admin/community-prompts?error=" +
        encodeURIComponent("Prompt ID is missing."),
    );
  }

  const { error } = await supabase
    .from("community_prompts")
    .delete()
    .eq("id", id);

  if (error) {
    redirect(
      "/admin/community-prompts?error=" +
        encodeURIComponent(error.message),
    );
  }

  revalidatePath("/admin/community-prompts");
  revalidatePath("/community");

  redirect("/admin/community-prompts?deleted=true");
}