import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import EditProfileForm from "./EditProfileForm";

export default async function EditProfilePage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!["facilitator", "admin", "superadmin"].includes(profile?.role ?? "")) {
    redirect("/dashboard");
  }

  const { data: facilitatorProfile } = await supabase
    .from("facilitator_profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return <EditProfileForm existing={facilitatorProfile} />;
}