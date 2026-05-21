import { createClient } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sendSessionReminder } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const supabase = await createClient();

  const now = new Date();
  const in24hrs = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const in25hrs = new Date(now.getTime() + 25 * 60 * 60 * 1000);

  const { data: sessions, error: sessionsError } = await supabase
    .from("sessions")
    .select("*")
    .eq("status", "scheduled")
    .gte("scheduled_at", in24hrs.toISOString())
    .lte("scheduled_at", in25hrs.toISOString());

  if (sessionsError) {
    return NextResponse.json({ error: sessionsError.message }, { status: 500 });
  }

  if (!sessions || sessions.length === 0) {
    return NextResponse.json({ message: "No sessions to process", processed: 0 });
  }

  const results = [];

  for (const session of sessions) {
    const bookingCount = session.booking_count ?? 0;
    const minimumFamilies = session.minimum_families ?? 1;
    const meetsMinimum = bookingCount >= minimumFamilies;

    const { data: bookings } = await supabase
      .from("bookings")
      .select("id, stripe_payment_intent_id, family_id, amount_cents")
      .eq("session_id", session.id)
      .eq("status", "pending");

    if (meetsMinimum) {
      let captureErrors = 0;

      for (const booking of bookings ?? []) {
        if (!booking.stripe_payment_intent_id) continue;
        try {
          await stripe.paymentIntents.capture(booking.stripe_payment_intent_id);
          await supabase.from("bookings").update({ status: "confirmed" }).eq("id", booking.id);
        } catch (err) {
          console.error(`Failed to capture payment for booking ${booking.id}:`, err);
          captureErrors++;
        }
      }

      await supabase.from("sessions").update({ status: "confirmed" }).eq("id", session.id);

      // ── Auto-create Daily.co room ────────────────────────────────────────
      if (!session.daily_room_url) {
        try {
          const roomName = `dh-${session.id.slice(0, 8)}`;
          const scheduledAt = new Date(session.scheduled_at);
          const durationMs = (session.duration_minutes ?? 60) * 60 * 1000;
          const expiryTime = new Date(scheduledAt.getTime() + durationMs + 30 * 60 * 1000);

          const dailyRes = await fetch("https://api.daily.co/v1/rooms", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
            },
            body: JSON.stringify({
              name: roomName,
              privacy: "private",
              properties: {
                exp: Math.floor(expiryTime.getTime() / 1000),
                max_participants: 110,
                enable_chat: true,
                enable_screenshare: true,
                start_video_off: true,
                start_audio_off: true,
              },
            }),
          });

          if (dailyRes.ok) {
            const room = await dailyRes.json();
            await supabase
              .from("sessions")
              .update({ daily_room_url: room.url, daily_room_name: roomName })
              .eq("id", session.id);
          }
        } catch (roomErr) {
          console.error(`Failed to create Daily.co room for session ${session.id}:`, roomErr);
        }
      }

      // ── Send reminder emails ─────────────────────────────────────────────
      for (const booking of bookings ?? []) {
        try {
          const { data: profile } = await supabase
            .from("profiles")
            .select("email, full_name")
            .eq("id", booking.family_id)
            .single();

          if (profile?.email) {
            const scheduledAt = new Date(session.scheduled_at);
            await sendSessionReminder({
              to: profile.email,
              familyName: profile.full_name ?? "there",
              sessionTitle: session.title,
              sessionDate: scheduledAt.toLocaleDateString("en-AU", {
                weekday: "long", day: "numeric", month: "long", year: "numeric",
                timeZone: "Australia/Melbourne",
              }),
              sessionTime: scheduledAt.toLocaleTimeString("en-AU", {
                hour: "2-digit", minute: "2-digit", hour12: true,
                timeZone: "Australia/Melbourne",
              }) + " AEST",
            });
          }
        } catch (emailErr) {
          console.error(`Failed to send reminder for booking ${booking.id}:`, emailErr);
        }
      }

      results.push({ sessionId: session.id, title: session.title, action: "confirmed", bookings: bookings?.length ?? 0, captureErrors });

    } else {
      let cancelErrors = 0;

      for (const booking of bookings ?? []) {
        if (!booking.stripe_payment_intent_id) continue;
        try {
          await stripe.paymentIntents.cancel(booking.stripe_payment_intent_id);
          await supabase.from("bookings").update({ status: "cancelled" }).eq("id", booking.id);
        } catch (err) {
          console.error(`Failed to cancel payment for booking ${booking.id}:`, err);
          cancelErrors++;
        }
      }

      await supabase.from("sessions").update({ status: "cancelled" }).eq("id", session.id);

      for (const booking of bookings ?? []) {
        try {
          const { data: profile } = await supabase
            .from("profiles")
            .select("email, full_name")
            .eq("id", booking.family_id)
            .single();

          if (profile?.email) {
            const { Resend } = await import("resend");
            const resend = new Resend(process.env.RESEND_API_KEY);
            const FROM = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
            const scheduledAt = new Date(session.scheduled_at);
            const formattedDate = scheduledAt.toLocaleDateString("en-AU", {
              weekday: "long", day: "numeric", month: "long",
              timeZone: "Australia/Melbourne",
            });

            await resend.emails.send({
              from: FROM,
              to: profile.email,
              subject: `Session cancelled: ${session.title}`,
              html: `
                <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:40px 24px;">
                  <h1 style="font-size:24px;font-weight:300;color:#1e1b2e;">Session cancelled</h1>
                  <p style="color:#4a4660;line-height:1.7;">Hi ${profile.full_name ?? "there"},</p>
                  <p style="color:#4a4660;line-height:1.7;">Unfortunately <strong>${session.title}</strong> scheduled for ${formattedDate} has been cancelled due to insufficient bookings.</p>
                  <p style="color:#4a4660;line-height:1.7;">Your payment of <strong>$${((booking.amount_cents ?? 0) / 100).toFixed(2)}</strong> has been automatically refunded and should appear in your account within 5–10 business days.</p>
                  <p style="color:#4a4660;line-height:1.7;">We're sorry for the inconvenience. Please browse our other upcoming sessions.</p>
                  <a href="https://developmental-hub.vercel.app/sessions" style="display:inline-block;margin-top:16px;padding:12px 28px;background:#3730a3;color:#fff;border-radius:999px;font-size:14px;font-weight:600;text-decoration:none;">Browse sessions</a>
                </div>
              `,
            });
          }
        } catch (emailErr) {
          console.error(`Failed to send cancellation email for booking ${booking.id}:`, emailErr);
        }
      }

      results.push({ sessionId: session.id, title: session.title, action: "cancelled", bookings: bookings?.length ?? 0, refunded: (bookings?.length ?? 0) - cancelErrors, cancelErrors });
    }
  }

  return NextResponse.json({ message: "Done", processed: results.length, results });
}