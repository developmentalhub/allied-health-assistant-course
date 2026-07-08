import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function getStripe() {
  if (!stripeSecretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY environment variable.");
  }

  return new Stripe(stripeSecretKey);
}

function getSupabaseAdmin() {
  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable.");
  }

  if (!supabaseServiceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable.");
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function getCustomerEmail(session: Stripe.Checkout.Session) {
  return (
    session.customer_details?.email ||
    session.customer_email ||
    session.metadata?.email ||
    null
  );
}

function getCustomerName(session: Stripe.Checkout.Session) {
  return session.customer_details?.name || session.metadata?.full_name || null;
}

async function upsertSubscriptionFromCheckoutSession(
  session: Stripe.Checkout.Session
) {
  const supabase = getSupabaseAdmin();

  const email = getCustomerEmail(session);
  const fullName = getCustomerName(session);

  if (!email) {
    console.warn("Stripe checkout session completed without customer email.");
    return;
  }

  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id || null;

  const customerId =
    typeof session.customer === "string"
      ? session.customer
      : session.customer?.id || null;

  const product = session.metadata?.product || "";

  if (product !== "aha_monthly_webinar_membership") {
    console.log("Ignoring checkout session for unrelated product:", product);
    return;
  }

  const { error } = await supabase.from("aha_subscriptions").upsert(
    {
      email,
      full_name: fullName,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscriptionId,
      status: "active",
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "email",
    }
  );

  if (error) {
    throw new Error(`Supabase subscription upsert failed: ${error.message}`);
  }
}

async function updateSubscriptionStatus(subscription: Stripe.Subscription) {
  const supabase = getSupabaseAdmin();

  const subscriptionId = subscription.id;
  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer.id;

  const status = subscription.status;

  const currentPeriodEnd =
    subscription.items.data[0]?.current_period_end != null
      ? new Date(subscription.items.data[0].current_period_end * 1000).toISOString()
      : null;

  const product = subscription.metadata?.product || "";

  if (product !== "aha_monthly_webinar_membership") {
    console.log("Ignoring subscription update for unrelated product:", product);
    return;
  }

  const { data: existingBySubscription } = await supabase
    .from("aha_subscriptions")
    .select("email")
    .eq("stripe_subscription_id", subscriptionId)
    .maybeSingle();

  const updatePayload = {
    stripe_customer_id: customerId,
    stripe_subscription_id: subscriptionId,
    status,
    current_period_end: currentPeriodEnd,
    updated_at: new Date().toISOString(),
  };

  if (existingBySubscription?.email) {
    const { error } = await supabase
      .from("aha_subscriptions")
      .update(updatePayload)
      .eq("stripe_subscription_id", subscriptionId);

    if (error) {
      throw new Error(`Supabase subscription update failed: ${error.message}`);
    }

    return;
  }

  const customer = await getStripe().customers.retrieve(customerId);

  if (customer.deleted) {
    console.warn("Stripe customer was deleted:", customerId);
    return;
  }

  const email = customer.email;

  if (!email) {
    console.warn("Stripe subscription update had no customer email.");
    return;
  }

  const { error } = await supabase.from("aha_subscriptions").upsert(
    {
      email,
      full_name: customer.name,
      ...updatePayload,
    },
    {
      onConflict: "email",
    }
  );

  if (error) {
    throw new Error(`Supabase subscription status upsert failed: ${error.message}`);
  }
}

export async function POST(request: Request) {
  if (!stripeWebhookSecret) {
    return NextResponse.json(
      { error: "Missing STRIPE_WEBHOOK_SECRET environment variable." },
      { status: 500 }
    );
  }

  const stripe = getStripe();
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature header." },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      stripeWebhookSecret
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown webhook signature error.";

    console.error("Stripe webhook signature verification failed:", message);

    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await upsertSubscriptionFromCheckoutSession(session);
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await updateSubscriptionStatus(subscription);
        break;
      }

      default:
        console.log(`Unhandled Stripe event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown Stripe webhook error.";

    console.error("Stripe webhook handling failed:", message);

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}