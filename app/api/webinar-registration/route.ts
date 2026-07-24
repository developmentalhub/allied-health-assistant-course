import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const ROBYN_EMAIL = "robyn@playmoveimprove.com.au";
const JESS_EMAIL = "jess@spectrumvillage.com.au";

const WEBINAR_TITLE =
  "Free webinar: Meet Robyn and Jess + Your Questions, Answered";

const WEBINAR_DATE = "Tuesday 4 August 2026, 12pm to 1pm QLD time";

export async function POST(request: Request) {
  const formData = await request.formData();

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const question = String(formData.get("question") || "").trim();

  if (!name || !email) {
    return NextResponse.redirect(
      new URL("/subscribe?webinar=missing-details", request.url),
      303
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Missing Supabase service role environment variables");

    return NextResponse.redirect(
      new URL("/subscribe?webinar=save-error", request.url),
      303
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const { error: insertError } = await supabase
    .from("webinar_registrations")
    .insert({
      name,
      email,
      question: question || null,
      webinar_title: WEBINAR_TITLE,
      webinar_date: WEBINAR_DATE,
    });

  if (insertError) {
    console.error("Could not save webinar registration:", insertError);

    if (insertError.code === "23505") {
      return NextResponse.redirect(
        new URL("/webinar-thank-you?status=already-registered", request.url),
        303
      );
    }

    return NextResponse.redirect(
      new URL("/subscribe?webinar=save-error", request.url),
      303
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ||
    "AHA Professional Development <onboarding@resend.dev>";

  if (resendApiKey) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [JESS_EMAIL, ROBYN_EMAIL],
          reply_to: email,
          subject: `New AHA webinar registration from ${name}`,
          text: [
            "New AHA webinar registration",
            "",
            `Webinar: ${WEBINAR_TITLE}`,
            `Date: ${WEBINAR_DATE}`,
            "",
            `Name: ${name}`,
            `Email: ${email}`,
            "",
            "Question:",
            question || "No question submitted.",
            "",
            "This registration has been saved in Supabase.",
          ].join("\n"),
        }),
      });
    } catch (error) {
      console.error("Webinar registration email failed:", error);
    }
  } else {
    console.log("New AHA webinar registration saved without email:", {
      name,
      email,
      question,
    });
  }

  return NextResponse.redirect(
    new URL("/webinar-thank-you?status=registered", request.url),
    303
  );
}

export async function GET(request: Request) {
  return NextResponse.redirect(new URL("/subscribe", request.url), 303);
}