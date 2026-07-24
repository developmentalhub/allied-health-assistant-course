import { NextResponse } from "next/server";

const JESS_EMAIL = "jess@spectrumvillage.com.au";

export async function POST(request: Request) {
  const formData = await request.formData();

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const question = String(formData.get("question") || "").trim();

  if (!name || !email) {
    return NextResponse.redirect(
      new URL("/subscribe?webinar=missing-details", request.url),
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
          to: [JESS_EMAIL],
          subject: `New AHA webinar registration from ${name}`,
          reply_to: email,
          text: [
            "New AHA webinar registration",
            "",
            `Name: ${name}`,
            `Email: ${email}`,
            "",
            "Question:",
            question || "No question submitted.",
          ].join("\n"),
        }),
      });
    } catch (error) {
      console.error("Webinar registration email failed:", error);
    }
  } else {
    console.log("New AHA webinar registration:", {
      name,
      email,
      question,
    });
  }

  return NextResponse.redirect(
    new URL("/subscribe?webinar=registered", request.url),
    303
  );
}

export async function GET(request: Request) {
  return NextResponse.redirect(new URL("/subscribe", request.url), 303);
}