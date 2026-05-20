import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase-server";
import { sendBookingAlert } from "@/lib/resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    // Log the received ID to check if it is being passed from the frontend
    console.log("API received sessionId:", sessionId);

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is missing" }, { status: 400 });
    }

    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Attempt to fetch the session
    const { data: session, error: sessionError } = await supabase
      .from("sessions")
      .select("*")
      .eq("id", sessionId)
      .single();

    // If there is an error or no data, log the error for debugging
    if (sessionError || !session) {
      console.error("Database lookup failed for ID:", sessionId, "Error:", sessionError);
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("referred_by, email, full_name")
      .eq("id", user.id)
      .single();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: session.price_cents,
      currency: "aud",
      capture_method: "manual",
      metadata: {
        session_id: sessionId,
        family_id: user.id,
        referred_by: profile?.referred_by || "",
        family_email: profile?.email || user.email || "",
        family_name: profile?.full_name || "",
      },
    });

    await supabase.from("bookings").insert({
      session_id: sessionId,
      family_id: user.id,
      status: "pending",
      amount_cents: session.price_cents,
      stripe_payment_intent_id: paymentIntent.id,
      attributed_to: profile?.referred_by || null,
    });

    const { count } = await supabase
      .from("bookings")
      .select("*", { count: 'exact', head: true })
      .eq("session_id", sessionId);

    await sendBookingAlert(session.title, count || 0, session.min_participants);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });

  } catch (error: any) {
    console.error("Payment intent error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}