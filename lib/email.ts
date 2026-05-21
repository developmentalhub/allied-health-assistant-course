import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BookingConfirmationProps {
  to: string;
  familyName: string;
  sessionTitle: string;
  sessionDate: string;
  sessionTime: string;
  sessionType: string;
  amount: string;
}

interface SessionReminderProps {
  to: string;
  familyName: string;
  sessionTitle: string;
  sessionDate: string;
  sessionTime: string;
}

interface ApplicationDecisionProps {
  to: string;
  applicantName: string;
}

// ─── Shared styles ────────────────────────────────────────────────────────────

const base = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0;padding:0;background:#faf8f5;font-family:'DM Sans',Helvetica,Arial,sans-serif;color:#1e1b2e;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf8f5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Logo -->
          <tr>
            <td style="padding-bottom:32px;">
              <p style="margin:0;font-size:18px;font-weight:700;color:#1e1b2e;">Developmental Hub</p>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#ffffff;border-radius:16px;border:1px solid #e8e4de;padding:40px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:24px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#6b6880;">
                Developmental Hub · Expert group support for families<br/>
                <a href="https://developmental-hub.vercel.app" style="color:#3730a3;">developmental-hub.vercel.app</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const h1 = (text: string) =>
  `<h1 style="margin:0 0 8px;font-size:26px;font-weight:300;color:#1e1b2e;line-height:1.2;">${text}</h1>`;

const p = (text: string) =>
  `<p style="margin:0 0 16px;font-size:15px;color:#4a4660;line-height:1.7;">${text}</p>`;

const detail = (label: string, value: string) => `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #f0ede8;">
      <span style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#6b6880;">${label}</span>
      <br/>
      <span style="font-size:15px;color:#1e1b2e;font-weight:500;">${value}</span>
    </td>
  </tr>
`;

const btn = (href: string, text: string) => `
  <a href="${href}" style="display:inline-block;margin-top:24px;padding:12px 28px;background:#3730a3;color:#ffffff;border-radius:999px;font-size:14px;font-weight:600;text-decoration:none;">
    ${text}
  </a>
`;

const detailTable = (rows: string) => `
  <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
    ${rows}
  </table>
`;

// ─── Email functions ──────────────────────────────────────────────────────────

export async function sendBookingConfirmation(props: BookingConfirmationProps) {
  const { to, familyName, sessionTitle, sessionDate, sessionTime, sessionType, amount } = props;

  const html = base(`
    ${h1("You're booked in! 🎉")}
    ${p(`Hi ${familyName}, your spot has been confirmed. We look forward to seeing you at the session.`)}
    ${detailTable(
      detail("Session", sessionTitle) +
      detail("Type", sessionType) +
      detail("Date", sessionDate) +
      detail("Time", sessionTime) +
      detail("Amount paid", amount)
    )}
    ${p("If the session doesn't reach the minimum number of families 24 hours before it starts, it will be cancelled and you'll receive a full automatic refund.")}
    ${btn("https://developmental-hub.vercel.app/dashboard", "View my bookings")}
  `);

  return resend.emails.send({
    from: FROM,
    to,
    subject: `Booking confirmed: ${sessionTitle}`,
    html,
  });
}

export async function sendSessionReminder(props: SessionReminderProps) {
  const { to, familyName, sessionTitle, sessionDate, sessionTime } = props;

  const html = base(`
    ${h1("Your session is tomorrow")}
    ${p(`Hi ${familyName}, just a reminder that your session is coming up soon.`)}
    ${detailTable(
      detail("Session", sessionTitle) +
      detail("Date", sessionDate) +
      detail("Time", sessionTime)
    )}
    ${p("Make sure you have a stable internet connection and a quiet space. Your session link will be available in your dashboard.")}
    ${btn("https://developmental-hub.vercel.app/dashboard", "Go to my dashboard")}
  `);

  return resend.emails.send({
    from: FROM,
    to,
    subject: `Reminder: ${sessionTitle} is tomorrow`,
    html,
  });
}

export async function sendApplicationApproved(props: ApplicationDecisionProps) {
  const { to, applicantName } = props;

  const html = base(`
    ${h1("You've been approved! 🎉")}
    ${p(`Hi ${applicantName}, congratulations — your application to become a facilitator on Developmental Hub has been approved.`)}
    ${p("Your next step is to complete your facilitator profile. This includes adding your insurance details, Working with Children Check, professional registration, a photo, and a short bio. Once complete, you'll appear in our practitioner directory.")}
    ${btn("https://developmental-hub.vercel.app/facilitator/profile/complete", "Complete my profile")}
  `);

  return resend.emails.send({
    from: FROM,
    to,
    subject: "Your Developmental Hub application has been approved",
    html,
  });
}

export async function sendApplicationDeclined(props: ApplicationDecisionProps) {
  const { to, applicantName } = props;

  const html = base(`
    ${h1("Application update")}
    ${p(`Hi ${applicantName}, thank you for taking the time to apply to become a facilitator on Developmental Hub.`)}
    ${p("After reviewing your application, we're unable to move forward at this time. This may be due to our current capacity or the specific areas we're looking to fill.")}
    ${p("We appreciate your interest and encourage you to apply again in the future as our platform grows.")}
  `);

  return resend.emails.send({
    from: FROM,
    to,
    subject: "Your Developmental Hub application",
    html,
  });
}