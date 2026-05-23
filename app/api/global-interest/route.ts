import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { name, email, country, timezone, message } = await request.json();

  if (!name || !email || !country) {
    return NextResponse.json({ error: "Name, email and country are required." }, { status: 400 });
  }

  const { error } = await supabase.from("global_interest").insert({
    name,
    email,
    country,
    timezone: timezone || null,
    message: message || null,
  });

  if (error) {
    console.error("Global interest error:", error.message);
    return NextResponse.json({ error: "Failed to submit. Please try again." }, { status: 500 });
  }

  // Also send Robyn an email notification
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const FROM = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
    await resend.emails.send({
      from: FROM,
      to: "robyn@playmoveimprove.com.au",
      subject: `New global interest: ${name} from ${country}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:40px 24px;">
          <h2 style="font-size:20px;color:#1e1b2e;margin:0 0 24px;">New international interest</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>Timezone:</strong> ${timezone || "Not provided"}</p>
          ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
        </div>
      `,
    });
  } catch (e) {
    console.error("Email notification failed:", e);
  }

  return NextResponse.json({ success: true });
}