import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  const { name, email, subject, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All required fields must be filled." }, { status: 400 });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const FROM = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

    await resend.emails.send({
      from: FROM,
      to: "robyn@playmoveimprove.com.au",
      reply_to: email,
      subject: `New contact message: ${subject || "No subject"}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:40px 24px;">
          <h2 style="font-size:20px;font-weight:600;color:#1e1b2e;margin:0 0 24px;">New message from Developmental Hub</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0ede8;font-size:12px;font-weight:600;color:#6b6880;text-transform:uppercase;letter-spacing:0.08em;">Name</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0ede8;font-size:15px;color:#1e1b2e;">${name}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0ede8;font-size:12px;font-weight:600;color:#6b6880;text-transform:uppercase;letter-spacing:0.08em;">Email</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0ede8;font-size:15px;color:#1e1b2e;"><a href="mailto:${email}" style="color:#3730a3;">${email}</a></td></tr>
            ${subject ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f0ede8;font-size:12px;font-weight:600;color:#6b6880;text-transform:uppercase;letter-spacing:0.08em;">Subject</td></tr><tr><td style="padding:10px 0;border-bottom:1px solid #f0ede8;font-size:15px;color:#1e1b2e;">${subject}</td></tr>` : ""}
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0ede8;font-size:12px;font-weight:600;color:#6b6880;text-transform:uppercase;letter-spacing:0.08em;">Message</td></tr>
            <tr><td style="padding:10px 0;font-size:15px;color:#1e1b2e;line-height:1.7;white-space:pre-wrap;">${message}</td></tr>
          </table>
          <p style="font-size:13px;color:#6b6880;margin-top:24px;">Reply directly to this email to respond to ${name}.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}