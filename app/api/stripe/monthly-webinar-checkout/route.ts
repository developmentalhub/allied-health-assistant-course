import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const monthlyPriceId = process.env.STRIPE_AHA_MONTHLY_PRICE_ID;
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "http://localhost:3000";

export async function POST() {
  if (!stripeSecretKey) {
    return NextResponse.json(
      { error: "Missing STRIPE_SECRET_KEY environment variable." },
      { status: 500 }
    );
  }

  if (!monthlyPriceId) {
    return NextResponse.json(
      { error: "Missing STRIPE_AHA_MONTHLY_PRICE_ID environment variable." },
      { status: 500 }
    );
  }

  const stripe = new Stripe(stripeSecretKey);

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: monthlyPriceId,
        quantity: 1,
      },
    ],
    allow_promotion_codes: true,
    billing_address_collection: "auto",
    success_url: `${siteUrl}/subscribe/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/subscribe?checkout=cancelled`,
    metadata: {
      product: "aha_monthly_webinar_membership",
      includes: "monthly_webinars_pdfs_recordings",
    },
    subscription_data: {
      metadata: {
        product: "aha_monthly_webinar_membership",
        includes: "monthly_webinars_pdfs_recordings",
      },
    },
  });

  if (!session.url) {
    return NextResponse.json(
      { error: "Stripe did not return a checkout URL." },
      { status: 500 }
    );
  }

  return NextResponse.redirect(session.url, 303);
}