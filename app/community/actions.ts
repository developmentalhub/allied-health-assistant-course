"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

const ROBYN_EMAIL = "robyn@playmoveimprove.com.au";
const JESS_EMAIL = "jess@spectrumvillage.com.au";

function cleanText(value: FormDataEntryValue | null) {
  const text = String(value || "").trim();
  return text.length > 0 ? text : null;
}

export async function submitPrivateHiveQuestion(formData: FormData) {
  const fullName = String(formData.get("fullName") || "").trim();

  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();

  const role = cleanText(formData.get("role"));
  const question = String(formData.get("question") || "").trim();

  const canShare = formData.get("canShare") === "on";

  if (!fullName) {
    redirect(
      "/community?questionError=" +
        encodeURIComponent("Please add your name.") +
        "#ask-the-hive",
    );
  }

  if (!email) {
    redirect(
      "/community?questionError=" +
        encodeURIComponent("Please add your email address.") +
        "#ask-the-hive",
    );
  }

  if (!question) {
    redirect(
      "/community?questionError=" +
        encodeURIComponent("Please add your question.") +
        "#ask-the-hive",
    );
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("webinar_questions")
    .insert({
      full_name: fullName,
      email,
      role,
      question,
      can_share: canShare,
    });

  if (error) {
    redirect(
      "/community?questionError=" +
        encodeURIComponent(error.message) +
        "#ask-the-hive",
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;

  const fromEmail =
    process.env.RESEND_FROM_EMAIL ||
    "Allied Health Hive <onboarding@resend.dev>";

  if (resendApiKey) {
    try {
      const emailResponse = await fetch(
        "https://api.resend.com/emails",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [JESS_EMAIL, ROBYN_EMAIL],
            reply_to: email,
            subject: `New private Hive question from ${fullName}`,
            text: [
              "A new private question has been submitted through Ask the Hive.",
              "",
              `Name: ${fullName}`,
              `Email: ${email}`,
              `Role: ${role || "Not provided"}`,
              "",
              `Permission to share: ${
                canShare
                  ? "Yes. The question may be discussed without identifying details."
                  : "No. Keep this question private."
              }`,
              "",
              "Question:",
              question,
              "",
              "The question is also available inside Hive Management.",
            ].join("\n"),
          }),
        },
      );

      if (!emailResponse.ok) {
        const responseText = await emailResponse.text();

        console.error(
          "Private Hive question email was not accepted by Resend:",
          responseText,
        );
      }
    } catch (emailError) {
      console.error(
        "Private Hive question notification email failed:",
        emailError,
      );
    }
  }

  redirect("/community?questionReceived=true#ask-the-hive");
}