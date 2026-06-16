import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Move the price out of code so test/live mode can be switched via env without redeploying logic.
// Falls back to the previously hardcoded value if STRIPE_PRICE_ID isn't set.
const PRICE_ID = process.env.STRIPE_PRICE_ID ?? "price_1TbByaITxjO0VuwsSVbxVlFo";

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Stripe is not configured (STRIPE_SECRET_KEY is missing in this environment).");
  return new Stripe(key);
}

function getSupabase(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) throw new Error("Supabase is not configured.");
  return createClient(url, serviceKey);
}

export async function POST(request: NextRequest) {
  try {
    const { affiliate_code, email, ref } = await request.json().catch(() => ({}));

    // --- Referral code: entirely optional. A problem here must never block checkout. ---
    let affiliateData: { id: string; commission_percentage: number | null } | null = null;
    const code = affiliate_code || ref;
    if (code && typeof code === "string" && code.trim()) {
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase
          .from("affiliate_codes")
          .select("id, code, commission_percentage")
          .eq("code", code.toUpperCase().trim())
          .eq("active", true)
          .maybeSingle(); // returns null (not an error) when there's no match
        if (error) console.error("Affiliate lookup failed (continuing without code):", error.message);
        affiliateData = data ?? null;
      } catch (e: any) {
        console.error("Affiliate lookup threw (continuing without code):", e.message);
      }
    }

    // --- Optional: short-circuit existing active subscribers (only runs if an email is sent). ---
    if (email && typeof email === "string" && email.trim()) {
      try {
        const supabase = getSupabase();
        const { data: { users } } = await supabase.auth.admin.listUsers();
        const existingUser = users?.find(u => u.email === email.toLowerCase().trim());
        if (existingUser) {
          const { data: existingSub } = await supabase
            .from("subscriptions")
            .select("status")
            .eq("user_id", existingUser.id)
            .maybeSingle();
          if (existingSub?.status === "active" || existingSub?.status === "trialing") {
            return NextResponse.json({ error: "already_subscribed" }, { status: 400 });
          }
        }
      } catch (e: any) {
        // A lookup hiccup must not stop someone from subscribing.
        console.error("Existing-subscriber check failed (continuing):", e.message);
      }
    }

    // --- Create the Stripe Checkout session (this is the step most likely to fail). ---
    const stripe = getStripe();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://developmental-hub.vercel.app";

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      line_items: [{ price: PRICE_ID, quantity: 1 }],
      mode: "subscription",
      subscription_data: { trial_period_days: 7 },
      success_url: `${siteUrl}/subscribe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/pricing`,
      metadata: {
        affiliate_code_id: affiliateData?.id ?? "",
        commission_percentage: affiliateData?.commission_percentage?.toString() ?? "",
      },
    };

    if (email && typeof email === "string" && email.trim()) {
      sessionParams.customer_email = email.toLowerCase().trim();
    }

    const session = await stripe.checkout.sessions.create(sessionParams);
    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Subscribe error:", error);

    // Translate the most common Stripe failure into something actionable.
    const raw = error?.message ?? "";
    const message = raw.includes("No such price")
      ? "Checkout isn't configured correctly: the plan price wasn't found. This is almost always a Stripe test/live mode mismatch — make sure STRIPE_PRICE_ID and STRIPE_SECRET_KEY are from the same mode."
      : raw || "Something went wrong creating your checkout session.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}