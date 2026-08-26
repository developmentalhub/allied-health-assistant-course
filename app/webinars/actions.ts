"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

function cleanText(value: FormDataEntryValue | null) {
  const text = String(value || "").trim();
  return text.length > 0 ? text : null;
}

export async function submitWebinarQuestion(formData: FormData) {
  const fullName = String(formData.get("fullName") || "").trim();
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();

  const role = cleanText(formData.get("role"));
  const question = String(formData.get("question") || "").trim();
  const canShare = formData.get("canShare") === "on";

  if (!fullName) {
    throw new Error("Please add your name.");
  }

  if (!email) {
    throw new Error("Please add your email.");
  }

  if (!question) {
    throw new Error("Please add your question.");
  }

  const supabase = await createClient();

  const { error } = await supabase.from("webinar_questions").insert({
    full_name: fullName,
    email,
    role,
    question,
    can_share: canShare,
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/webinars?question=received#webinar-question");
}