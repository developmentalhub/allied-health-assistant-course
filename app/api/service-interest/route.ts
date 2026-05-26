import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { name, email, service_type, child_age, message } = await request.json();

  if (!name || !email || !service_type) {
    return NextResponse.json({ error: "Name, email and service type are required." }, { status: 400 });
  }

  const { error } = await supabase.from("service_interest").insert({
    name, email, service_type, child_age: child_age || null, message: message || null,
  });

  if (error) return NextResponse.json({ error: "Failed to submit. Please try again." }, { status: 500 });

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const FROM = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
    await resend.emails.send({
      from: FROM,
      to: "robyn@playmoveimprove.com.au",
      subject: `New ${service_type} interest: ${name}`,
      html: `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:40px 24px;">
        <h2 style="color:#1e1b2e;">New service interest</h2>
        <p><strong>Service:</strong> ${service_type}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Child age:</strong> ${child_age || "Not specified"}</p>
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
      </div>`,
    });
  } catch (e) { console.error("Service interest email failed:", e); }

  return NextResponse.json({ success: true });
}