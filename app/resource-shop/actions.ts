"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

function cleanText(value: FormDataEntryValue | null) {
  const text = String(value || "").trim();
  return text.length > 0 ? text : null;
}

export async function joinResourceShopWaitlist(formData: FormData) {
  const fullName = String(formData.get("fullName") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();

  if (!fullName || !email) {
    throw new Error("Please add your name and email.");
  }

  const supabase = await createClient();

  const { error } = await supabase.from("resource_shop_waitlist").insert({
    full_name: fullName,
    email,
    organisation: cleanText(formData.get("organisation")),
    role: cleanText(formData.get("role")),
    team_size: cleanText(formData.get("teamSize")),
    interested_in: cleanText(formData.get("interestedIn")),
    message: cleanText(formData.get("message")),
    status: "new",
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/resource-shop?success=true");
}