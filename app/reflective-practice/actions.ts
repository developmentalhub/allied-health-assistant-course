"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

function cleanText(value: FormDataEntryValue | null) {
  const text = String(value || "").trim();
  return text.length > 0 ? text : null;
}

export async function submitReflectivePracticeRequest(formData: FormData) {
  const name = String(formData.get("fullName") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();

  const role = cleanText(formData.get("role"));
  const organisation = cleanText(formData.get("organisation"));
  const preferredProvider = cleanText(formData.get("preferredProvider"));
  const sessionGoal = cleanText(formData.get("supportFocus"));
  const currentContext = cleanText(formData.get("notes"));

  if (!name || !email) {
    throw new Error("Please add your name and email.");
  }

  if (!preferredProvider) {
    throw new Error("Please choose a preferred session provider.");
  }

  if (!sessionGoal) {
    throw new Error("Please choose the type of support you are looking for.");
  }

  const supabase = await createClient();

  const { error } = await supabase.from("reflective_practice_requests").insert({
    name,
    email,
    role,
    organisation,
    preferred_provider: preferredProvider,
    session_goal: sessionGoal,
    current_context: currentContext,
    understands_not_supervision: true,
    status: "reflection_received",
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/reflective-practice?success=true");
}