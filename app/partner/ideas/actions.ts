"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase-server";

const ALLOWED_IDEA_TYPES = [
  "webinar",
  "blog",
  "community",
  "resource",
  "other",
];

export async function submitPartnerIdea(formData: FormData) {
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

  const ideaType = String(formData.get("ideaType") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const notes = String(formData.get("notes") || "").trim();

  if (!ALLOWED_IDEA_TYPES.includes(ideaType)) {
    redirect(
      "/partner/ideas?error=" +
        encodeURIComponent("Please choose an idea type."),
    );
  }

  if (!title) {
    redirect(
      "/partner/ideas?error=" +
        encodeURIComponent("Please add a title for your idea."),
    );
  }

  if (title.length > 200) {
    redirect(
      "/partner/ideas?error=" +
        encodeURIComponent(
          "Please keep the idea title under 200 characters.",
        ),
    );
  }

  if (notes.length > 5000) {
    redirect(
      "/partner/ideas?error=" +
        encodeURIComponent(
          "Please keep the notes under 5,000 characters.",
        ),
    );
  }

  const submittedByName =
    profile.full_name ||
    user.user_metadata?.full_name ||
    "Hive team member";

  const { error } = await supabase
    .from("partner_ideas")
    .insert({
      submitted_by: user.id,
      submitted_by_name: submittedByName,
      idea_type: ideaType,
      title,
      notes: notes || null,
    });

  if (error) {
    redirect(
      "/partner/ideas?error=" +
        encodeURIComponent(error.message),
    );
  }

  revalidatePath("/partner/ideas");

  redirect("/partner/ideas?submitted=true");
}