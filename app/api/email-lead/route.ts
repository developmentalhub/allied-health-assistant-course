import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { email, first_name, source } = await request.json();

  if (!email) return NextResponse.json({ error: "Email is required." }, { status: 400 });

  const { error } = await supabase.from("email_leads").upsert({
    email: email.toLowerCase().trim(),
    first_name: first_name?.trim() || null,
    source: source || "ebook_popup",
  }, { onConflict: "email" });

  if (error && !error.message.includes("unique")) {
    return NextResponse.json({ error: "Failed to save. Please try again." }, { status: 500 });
  }

  // Send ebook via Resend
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const FROM = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Your free guide: Regulation Before Reading",
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:40px 24px;">
          <p style="font-size:18px;font-weight:700;color:#1e1b2e;margin:0 0 24px;">Developmental Hub</p>
          <h1 style="font-size:24px;font-weight:300;color:#1e1b2e;margin:0 0 16px;">Here's your free guide</h1>
          <p style="font-size:15px;color:#4a4660;line-height:1.7;margin:0 0 24px;">
            Hi ${first_name ? first_name : "there"}, thank you for your interest in Developmental Hub. Here is your free copy of <strong>Regulation Before Reading</strong>.
          </p>
          <a href="https://pndihjsqkwbjewlulotg.supabase.co/storage/v1/object/public/public-assets/Regulation%20before%20Reading%20Ebook.pdf"
             style="display:inline-block;padding:14px 28px;background:#3730a3;color:#fff;border-radius:999px;font-size:14px;font-weight:600;text-decoration:none;margin-bottom:24px;">
            Download your free guide
          </a>
          <p style="font-size:14px;color:#6b6880;line-height:1.7;margin:0 0 16px;">
            This guide explains why regulation — not phonics drills — is the foundation of reading readiness, and what you can do at home to support it.
          </p>
          <p style="font-size:14px;color:#6b6880;line-height:1.7;margin:0 0 24px;">
            When you're ready to go deeper, our video library has follow-along activities for children aged 0–8 across seven developmental categories — all for $39/month.
          </p>
          <a href="https://developmental-hub.vercel.app/pricing"
             style="display:inline-block;padding:12px 24px;background:#f5f3ff;color:#3730a3;border-radius:999px;font-size:14px;font-weight:600;text-decoration:none;">
            See what's included →
          </a>
          <p style="font-size:12px;color:#9ca3af;margin-top:32px;">Developmental Hub · Play Move Improve Pty Ltd · Victoria, Australia</p>
        </div>
      `,
    });
  } catch (e) {
    console.error("Ebook email failed:", e);
  }

  return NextResponse.json({ success: true });
}