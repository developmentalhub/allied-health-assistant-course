import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase-server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const PRICE_ID = "price_1TbByaITxjO0VuwsSVbxVlFo";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { affiliate_code } = await request.json().catch(() => ({}));

    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, email")
      .eq("id", user.id)
      .single();

    const { data: existingSub } = await supabase
      .from("subscriptions")
      .select("stripe_customer_id, status")
      .eq("user_id", user.id)
      .single();

    if (existingSub?.status === "active") {
      return NextResponse.json({ error: "Already subscribed" }, { status: 400 });
    }

    // Validate affiliate code if provided
    let affiliateData = null;
    if (affiliate_code) {
      const { data } = await supabase
        .from("affiliate_codes")
        .select("id, code, commission_percentage")
        .eq("code", affiliate_code.toUpperCase().trim())
        .eq("active", true)
        .single();
      affiliateData = data;
    }

    let customerId = existingSub?.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: profile?.email ?? user.email ?? "",
        name: profile?.full_name ?? "",
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [{ price: PRICE_ID, quantity: 1 }],
      mode: "subscription",
subscription_data: {
    trial_period_days: 7,
  },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://developmental-hub.vercel.app"}/subscribe/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://developmental-hub.vercel.app"}/pricing`,
      metadata: {
        supabase_user_id: user.id,
        affiliate_code_id: affiliateData?.id ?? "",
        commission_percentage: affiliateData?.commission_percentage?.toString() ?? "",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}