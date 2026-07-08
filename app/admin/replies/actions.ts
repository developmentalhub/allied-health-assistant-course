"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

async function setStatus(id: string, status: "approved" | "declined") {
  if (!id) return;

  const supabase = adminClient();

  await supabase
    .from("community_replies")
    .update({
      status,
      reviewed_by: "admin",
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", id);

  revalidatePath("/admin/replies");
  revalidatePath("/join");
}

export async function approveReply(formData: FormData) {
  await setStatus(String(formData.get("id") ?? ""), "approved");
}

export async function declineReply(formData: FormData) {
  await setStatus(String(formData.get("id") ?? ""), "declined");
}