import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase-server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { data: session } = await supabase
      .from("sessions")
      .select("*")
      .eq("id", sessionId)
      .single();

    if (!session) {
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

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });

  } catch (error: any) {
    console.error("Payment intent error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}