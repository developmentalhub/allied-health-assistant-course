"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase-server";

const ALLOWED_COMMUNITY_ROLES = [
  "Allied Health Assistant",
  "Allied Health Professional",
  "Manager / Supervisor",
  "Student",
  "Educator",
  "Other",
] as const;

function cleanText(
  value: FormDataEntryValue | null,
  maxLength: number,
) {
  const text = String(value || "").trim();

  if (!text) {
    return null;
  }

  return text.slice(0, maxLength);
}

export async function updateCommunityProfile(
  formData: FormData,
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/profile");
  }

  const fullName = String(
    formData.get("fullName") || "",
  ).trim();

  const communityRole = cleanText(
    formData.get("communityRole"),
    100,
  );

  const discipline = cleanText(
    formData.get("discipline"),
    150,
  );

  const locationRegion = cleanText(
    formData.get("locationRegion"),
    150,
  );

  const bio = cleanText(
    formData.get("bio"),
    500,
  );

  const showInCommunity =
    formData.get("showInCommunity") === "on";

  if (!fullName) {
    redirect(
      "/profile?error=" +
        encodeURIComponent("Please add your name."),
    );
  }

  if (fullName.length > 150) {
    redirect(
      "/profile?error=" +
        encodeURIComponent(
          "Please keep your name under 150 characters.",
        ),
    );
  }

  if (
    communityRole &&
    !ALLOWED_COMMUNITY_ROLES.includes(
      communityRole as (typeof ALLOWED_COMMUNITY_ROLES)[number],
    )
  ) {
    redirect(
      "/profile?error=" +
        encodeURIComponent(
          "Please choose a valid community role.",
        ),
    );
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      community_role: communityRole,
      discipline,
      location_region: locationRegion,
      bio,
      show_in_community: showInCommunity,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) {
    redirect(
      "/profile?error=" +
        encodeURIComponent(error.message),
    );
  }

  revalidatePath("/profile");
  revalidatePath("/dashboard");
  revalidatePath("/community");
  revalidatePath("/partner");

  redirect("/profile?saved=true");
}