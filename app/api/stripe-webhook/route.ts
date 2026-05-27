import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// 1. Updated API version to match your local requirement
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia", 
});

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing configuration" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    console.error("Webhook signature failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.supabase_user_id;
        if (!userId || !session.subscription) break;

        // 2. Properly retrieve the subscription
        const sub = await stripe.subscriptions.retrieve(session.subscription as string);

        await supabase.from("subscriptions").upsert({
          user_id: userId,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: sub.id,
          stripe_price_id: sub.items.data[0].price.id,
          status: sub.status,
          // 3. Access current_period_end correctly from the Subscription object
          current_period_end: new Date((sub as any).current_period_end * 1000).toISOString(),
          updated_at: new Date().toISOString(),
          referral_code: session.metadata?.referral_code || null,
        }, { onConflict: "stripe_subscription_id" });

        const affiliateCodeId = session.metadata?.affiliate_code_id;
        const commissionPct = session.metadata?.commission_percentage;
        
        if (affiliateCodeId && commissionPct) {
          await supabase.from("affiliate_referrals").insert({
            affiliate_code_id: affiliateCodeId,
            subscriber_user_id: userId,
            stripe_subscription_id: sub.id,
            status: "active",
            commission_percentage: parseInt(commissionPct),
          });
        }
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await supabase.from("subscriptions")
          .update({
            status: sub.status,
            current_period_end: new Date((sub as any).current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", sub.id);

        if (sub.status === "canceled") {
          await supabase.from("affiliate_referrals")
            .update({ status: "cancelled" })
            .eq("stripe_subscription_id", sub.id);
        }
        break;
      }
    }
  } catch (err) {
    console.error("Webhook processing error:", err);
    return NextResponse.json({ error: "Internal processing error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}