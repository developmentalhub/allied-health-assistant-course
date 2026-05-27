import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: NextRequest) {
  try {
    const { email, first_name } = await request.json();

    if (!email) return NextResponse.json({ error: "Email is required." }, { status: 400 });

    const supabase = getSupabase();

    const { error } = await supabase.from("email_leads").upsert({
      email: email.toLowerCase().trim(),
      first_name: first_name?.trim() || null,
      source: "cup_sequence",
    }, { onConflict: "email" });

    if (error) {
      console.error("Supabase error:", error.message);
      // Don't fail on duplicate email — just continue
      if (!error.message.includes("duplicate") && !error.message.includes("unique")) {
        return NextResponse.json({ error: "Failed to save. Please try again." }, { status: 500 });
      }
    }

    // Send welcome email
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const FROM = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

      await resend.emails.send({
        from: FROM,
        to: email,
        subject: "Your free Cup Rhythm Activity Series is ready",
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:40px 24px;">
            <p style="font-size:18px;font-weight:700;color:#1e1b2e;margin:0 0 24px;">Developmental Hub</p>
            <h1 style="font-size:24px;font-weight:300;color:#1e1b2e;margin:0 0 16px;">Your Cup Rhythm Activity Series is unlocked!</h1>
            <p style="font-size:15px;color:#4a4660;line-height:1.7;margin:0 0 24px;">
              Hi ${first_name ? first_name : "there"}, you now have free access to all 12 videos in the Cup Movement Sequencing Activity series.
            </p>
            <a href="https://developmental-hub.vercel.app/cup-sequence"
               style="display:inline-block;padding:14px 28px;background:#3730a3;color:#fff;border-radius:999px;font-size:14px;font-weight:600;text-decoration:none;margin-bottom:24px;">
              Watch all 12 videos now
            </a>
            <p style="font-size:14px;color:#6b6880;line-height:1.7;margin:0 0 24px;">
              When you're ready for more, our full membership includes 31 videos across pre-reading, pre-writing, gross motor, fine motor and rhythm — with new content added every month. All for $39/month.
            </p>
            <a href="https://developmental-hub.vercel.app/pricing"
               style="display:inline-block;padding:12px 24px;background:#f5f3ff;color:#3730a3;border-radius:999px;font-size:14px;font-weight:600;text-decoration:none;">
              See the full membership →
            </a>
            <p style="font-size:12px;color:#9ca3af;margin-top:32px;">Developmental Hub · Play Move Improve Pty Ltd · Victoria, Australia</p>
          </div>
        `,
      });
    } catch (e) {
      console.error("Email send failed:", e);
      // Don't fail the request if email fails
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Cup sequence route error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}