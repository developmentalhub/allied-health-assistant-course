"use server";

import { revalidatePath } from "next/cache";
import { createClient as createSupabaseAdminClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase-server";
import { resend, getResendFromEmail } from "@/lib/resend";

type Webinar = {
  id: string;
  title: string;
  description: string | null;
  starts_at: string;
  ends_at: string;
  zoom_join_url: string | null;
  zoom_url: string | null;
  access_type: string;
};

type Subscription = {
  email: string;
  full_name: string | null;
  status: string;
};

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable.");
  }

  if (!serviceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable.");
  }

  return createSupabaseAdminClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

async function requireAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in as an admin.");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (profile?.role !== "admin" && profile?.role !== "superadmin") {
    throw new Error("You do not have permission to send webinar emails.");
  }
}

function formatWebinarDate(startsAt: string, endsAt: string) {
  const startDate = new Date(startsAt);
  const endDate = new Date(endsAt);

  const dateLabel = new Intl.DateTimeFormat("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Australia/Brisbane",
  }).format(startDate);

  const startTime = new Intl.DateTimeFormat("en-AU", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Australia/Brisbane",
  }).format(startDate);

  const endTime = new Intl.DateTimeFormat("en-AU", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Australia/Brisbane",
  }).format(endDate);

  return `${dateLabel}, ${startTime} to ${endTime} QLD time`;
}

function buildWebinarEmail({
  webinar,
  zoomLink,
  recipientName,
}: {
  webinar: Webinar;
  zoomLink: string;
  recipientName: string | null;
}) {
  const name = recipientName?.trim() || "there";
  const dateTime = formatWebinarDate(webinar.starts_at, webinar.ends_at);

  const subject = `Your AHA webinar Zoom details: ${webinar.title}`;

  const text = `Hi ${name},

Here are the Zoom details for the upcoming AHA Professional Development webinar.

Webinar: ${webinar.title}
When: ${dateTime}
Zoom link: ${zoomLink}

${webinar.description || ""}

This professional development session is designed to support AHAs with practical ideas, reflective practice and confidence in their work.

Warmly,
Robyn and Jess`;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e1b2e;">
      <p>Hi ${name},</p>

      <p>Here are the Zoom details for the upcoming <strong>AHA Professional Development</strong> webinar.</p>

      <div style="border: 1px solid #e8e4de; border-radius: 18px; padding: 18px; background: #faf8f5; margin: 20px 0;">
        <p style="margin: 0 0 8px;"><strong>Webinar:</strong> ${webinar.title}</p>
        <p style="margin: 0 0 8px;"><strong>When:</strong> ${dateTime}</p>
        <p style="margin: 0;"><strong>Zoom link:</strong> <a href="${zoomLink}">${zoomLink}</a></p>
      </div>

      ${
        webinar.description
          ? `<p>${webinar.description}</p>`
          : ""
      }

      <p>This professional development session is designed to support AHAs with practical ideas, reflective practice and confidence in their work.</p>

      <p>Warmly,<br />Robyn and Jess</p>
    </div>
  `;

  return { subject, text, html };
}

export async function sendZoomDetailsToMembers(formData: FormData) {
  await requireAdmin();

  const webinarId = String(formData.get("webinarId") || "");

  if (!webinarId) {
    throw new Error("Missing webinar ID.");
  }

  const supabaseAdmin = getSupabaseAdmin();

  const { data: webinarData, error: webinarError } = await supabaseAdmin
    .from("webinars")
    .select(
      "id, title, description, starts_at, ends_at, zoom_join_url, zoom_url, access_type"
    )
    .eq("id", webinarId)
    .single();

  if (webinarError) {
    throw new Error(webinarError.message);
  }

  const webinar = webinarData as Webinar;
  const zoomLink = webinar.zoom_join_url || webinar.zoom_url;

  if (!zoomLink) {
    throw new Error("This webinar does not have a Zoom join link yet.");
  }

  const { data: subscriptionsData, error: subscriptionsError } =
    await supabaseAdmin
      .from("aha_subscriptions")
      .select("email, full_name, status")
      .in("status", ["active", "trialing"]);

  if (subscriptionsError) {
    throw new Error(subscriptionsError.message);
  }

  const subscriptions = (subscriptionsData || []) as Subscription[];

  const uniqueRecipients = subscriptions
    .filter((subscription) => Boolean(subscription.email))
    .filter(
      (subscription, index, array) =>
        array.findIndex(
          (item) =>
            item.email.toLowerCase() === subscription.email.toLowerCase()
        ) === index
    );

  if (uniqueRecipients.length === 0) {
    throw new Error("There are no active or trialing AHA members to email yet.");
  }

  const from = getResendFromEmail();

  for (const recipient of uniqueRecipients) {
    const email = buildWebinarEmail({
      webinar,
      zoomLink,
      recipientName: recipient.full_name,
    });

    const { error } = await resend.emails.send({
      from,
      to: recipient.email,
      subject: email.subject,
      text: email.text,
      html: email.html,
    });

    if (error) {
      throw new Error(
        `Resend failed for ${recipient.email}: ${error.message}`
      );
    }
  }

  const { error: updateError } = await supabaseAdmin
    .from("webinars")
    .update({
      email_sent_at: new Date().toISOString(),
    })
    .eq("id", webinar.id);

  if (updateError) {
    throw new Error(updateError.message);
  }

  revalidatePath("/admin/webinars");
}