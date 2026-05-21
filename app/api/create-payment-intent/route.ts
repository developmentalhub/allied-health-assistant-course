import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase-server";
import { sendBookingAlert } from "@/lib/resend";
import { sendBookingConfirmation } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const FACILITATOR_FEE_CENTS = 17500; // $175 flat fee

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }

    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { data: session, error: sessionError } = await supabase
      .from("sessions")
      .select("*")
      .eq("id", sessionId)
      .single();

    if (sessionError || !session) {
      return NextResponse.json({
        error: `Session not found. ID: ${sessionId}. Error: ${JSON.stringify(sessionError)}`
      }, { status: 404 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("referred_by, email, full_name")
      .eq("id", user.id)
      .single();

    const referralCode = profile?.referred_by ?? null;

    // ── Revenue split calculation ─────────────────────────────────────────
    let platformOwnerShareCents = session.price_cents;
    let partnerShareCents = 0;

    if (referralCode) {
      const { data: codeData } = await supabase
        .from("referral_codes")
        .select("partner_share_percentage, owner_share_percentage, active")
        .eq("code", referralCode)
        .eq("active", true)
        .single();

      if (codeData) {
        const profitAfterFee = Math.max(0, session.price_cents - FACILITATOR_FEE_CENTS);
        partnerShareCents = Math.round(profitAfterFee * (codeData.partner_share_percentage / 100));
        platformOwnerShareCents = session.price_cents - partnerShareCents;
      }
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: session.price_cents,
      currency: "aud",
      capture_method: "manual",
      metadata: {
        session_id: sessionId,
        family_id: user.id,
        referred_by: referralCode || "",
        family_email: profile?.email || user.email || "",
        family_name: profile?.full_name || "",
        platform_owner_share_cents: platformOwnerShareCents.toString(),
        partner_share_cents: partnerShareCents.toString(),
      },
    });

    await supabase.from("bookings").insert({
      session_id: sessionId,
      family_id: user.id,
      status: "pending",
      amount_cents: session.price_cents,
      stripe_payment_intent_id: paymentIntent.id,
      attributed_to: referralCode || null,
      platform_owner_share_cents: platformOwnerShareCents,
      partner_share_cents: partnerShareCents,
    });

    const { count } = await supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .eq("session_id", sessionId);

    await sendBookingAlert(session.title, count || 0, session.minimum_families);

    // ── Send booking confirmation email ───────────────────────────────────
    try {
      const familyEmail = profile?.email ?? user.email;
      if (familyEmail) {
        const scheduledAt = new Date(session.scheduled_at);
        await sendBookingConfirmation({
          to: familyEmail,
          familyName: profile?.full_name ?? "there",
          sessionTitle: session.title,
          sessionDate: scheduledAt.toLocaleDateString("en-AU", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            timeZone: "Australia/Melbourne",
          }),
          sessionTime: scheduledAt.toLocaleTimeString("en-AU", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "Australia/Melbourne",
          }) + " AEST",
          sessionType: session.session_type ?? "session",
          amount: `$${(session.price_cents / 100).toFixed(2)} AUD`,
        });
      }
    } catch (emailError) {
      // Non-fatal — booking is confirmed even if email fails
      console.error("Failed to send booking confirmation email:", emailError);
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });

  } catch (error: any) {
    console.error("Payment intent error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}