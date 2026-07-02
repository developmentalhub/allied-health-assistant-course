import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    const cleanName = typeof name === "string" ? name.trim() : "";
    const cleanEmail =
      typeof email === "string" ? email.trim().toLowerCase() : "";
    const cleanSubject = typeof subject === "string" ? subject.trim() : "";
    const cleanMessage = typeof message === "string" ? message.trim() : "";

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return NextResponse.json(
        { error: "Please complete your name, email and message." },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Contact email is not configured yet." },
        { status: 501 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

    await resend.emails.send({
      from: fromEmail,
      to: "robyn@playmoveimprove.com.au",
      replyTo: cleanEmail,
      subject: `Academy contact message: ${cleanSubject || "No subject"}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;padding:40px 24px;color:#1e1b2e;">
          <h1 style="font-size:24px;line-height:1.3;margin:0 0 24px;">
            New message from the Allied Health & Educator Resource Academy
          </h1>

          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #f0ede8;font-size:12px;font-weight:700;color:#6b6880;text-transform:uppercase;letter-spacing:0.08em;">
                Name
              </td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #f0ede8;font-size:16px;color:#1e1b2e;">
                ${escapeHtml(cleanName)}
              </td>
            </tr>

            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #f0ede8;font-size:12px;font-weight:700;color:#6b6880;text-transform:uppercase;letter-spacing:0.08em;">
                Email
              </td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #f0ede8;font-size:16px;color:#1e1b2e;">
                <a href="mailto:${escapeHtml(cleanEmail)}" style="color:#0f766e;">
                  ${escapeHtml(cleanEmail)}
                </a>
              </td>
            </tr>

            ${
              cleanSubject
                ? `<tr>
                    <td style="padding:12px 0;border-bottom:1px solid #f0ede8;font-size:12px;font-weight:700;color:#6b6880;text-transform:uppercase;letter-spacing:0.08em;">
                      Subject
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;border-bottom:1px solid #f0ede8;font-size:16px;color:#1e1b2e;">
                      ${escapeHtml(cleanSubject)}
                    </td>
                  </tr>`
                : ""
            }

            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #f0ede8;font-size:12px;font-weight:700;color:#6b6880;text-transform:uppercase;letter-spacing:0.08em;">
                Message
              </td>
            </tr>
            <tr>
              <td style="padding:12px 0;font-size:16px;color:#1e1b2e;line-height:1.7;white-space:pre-wrap;">
                ${escapeHtml(cleanMessage)}
              </td>
            </tr>
          </table>

          <p style="font-size:14px;color:#6b6880;margin-top:28px;line-height:1.6;">
            Reply directly to this email to respond to ${escapeHtml(cleanName)}.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Academy contact form error:", err);

    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}