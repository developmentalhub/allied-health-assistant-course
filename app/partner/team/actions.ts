"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase-server";

async function requirePartner() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/partner/team");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (
    !profile?.role ||
    !["partner", "admin", "superadmin"].includes(
      profile.role,
    )
  ) {
    redirect("/dashboard");
  }

  return {
    supabase,
    user,
  };
}

export async function addTeamMember(
  formData: FormData,
) {
  const { supabase, user } =
    await requirePartner();

  const fullName = String(
    formData.get("fullName") || "",
  ).trim();

  const email = String(
    formData.get("email") || "",
  )
    .trim()
    .toLowerCase();

  if (!email || !email.includes("@")) {
    redirect(
      "/partner/team?error=Please%20enter%20a%20valid%20email",
    );
  }

  const { error } = await supabase
    .from("partner_team_members")
    .upsert(
      {
        partner_id: user.id,
        email,
        full_name: fullName || null,
        status: "active",
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "partner_id,email",
      },
    );

  if (error) {
    redirect(
      `/partner/team?error=${encodeURIComponent(
        error.message,
      )}`,
    );
  }

  revalidatePath("/partner/team");

  redirect("/partner/team?added=true");
}

export async function removeTeamMember(
  memberId: string,
) {
  const { supabase, user } =
    await requirePartner();

  const { error } = await supabase
    .from("partner_team_members")
    .update({
      status: "removed",
      updated_at: new Date().toISOString(),
    })
    .eq("id", memberId)
    .eq("partner_id", user.id);

  if (error) {
    redirect(
      `/partner/team?error=${encodeURIComponent(
        error.message,
      )}`,
    );
  }

  revalidatePath("/partner/team");

  redirect("/partner/team?removed=true");
}