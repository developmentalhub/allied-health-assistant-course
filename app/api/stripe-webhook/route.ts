import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    console.error("Webhook signature failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (!session.subscription) break;

        const supabase = getSupabaseAdmin();
        const customerEmail = session.customer_details?.email ?? session.customer_email ?? "";
        const customerName = session.customer_details?.name ?? "";

        if (!customerEmail) break;

        // Find or create Supabase user
        let userId: string | null = null;

        // Check if user already exists
        const { data: { users } } = await supabase.auth.admin.listUsers();
        const existingUser = users?.find(u => u.email === customerEmail.toLowerCase());

        if (existingUser) {
          userId = existingUser.id;
        } else {
          // Create new user with a magic link password reset flow
          const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
            email: customerEmail,
            email_confirm: true,
            user_metadata: { full_name: customerName },
          });
          if (createError) {
            console.error("Failed to create user:", createError.message);
            break;
          }
          userId = newUser.user?.id ?? null;

          // Create profile
          if (userId) {
            await supabase.from("profiles").upsert({
              id: userId,
              email: customerEmail,
              full_name: customerName,
              role: "parent",
            });
          }
        }

        if (!userId) break;

        const sub = await stripe.subscriptions.retrieve(session.subscription as string);

        // Upsert subscription
        await supabase.from("subscriptions").upsert({
          user_id: userId,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: sub.id,
          stripe_price_id: sub.items.data[0].price.id,
          status: sub.status,
          current_period_end: new Date((sub as any).current_period_end * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        }, { onConflict: "stripe_subscription_id" });

        // Record affiliate referral if code was used
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

        // Send welcome email with password setup link
        try {
          const { data: linkData } = await supabase.auth.admin.generateLink({
            type: "recovery",
            email: customerEmail,
            options: {
              redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://developmental-hub.vercel.app"}/videos`,
            },
          });

          const { Resend } = await import("resend");
          const resend = new Resend(process.env.RESEND_API_KEY);
          const FROM = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

          await resend.emails.send({
            from: FROM,
            to: customerEmail,
            subject: "Welcome to Developmental Hub — set your password to get started",
            html: `
              <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:40px 24px;">
                <p style="font-size:18px;font-weight:700;color:#1e1b2e;margin:0 0 24px;">Developmental Hub</p>
                <h1 style="font-size:24px;font-weight:300;color:#1e1b2e;margin:0 0 16px;">Welcome${customerName ? `, ${customerName.split(" ")[0]}` : ""}!</h1>
                <p style="font-size:15px;color:#4a4660;line-height:1.7;margin:0 0 16px;">
                  Your 7-day free trial has started. You now have full access to the Developmental Hub video library.
                </p>
                <p style="font-size:15px;color:#4a4660;line-height:1.7;margin:0 0 24px;">
                  Click the button below to set your password and start watching:
                </p>
                <a href="${linkData?.properties?.action_link ?? `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://developmental-hub.vercel.app"}/videos`}"
                   style="display:inline-block;padding:14px 28px;background:#3730a3;color:#fff;border-radius:999px;font-size:15px;font-weight:600;text-decoration:none;margin-bottom:24px;">
                  Set my password and watch videos →
                </a>
                <p style="font-size:13px;color:#6b6880;line-height:1.7;margin:0 0 8px;">
                  Your trial runs for 7 days. After that, your membership continues at $39/month AUD. Cancel anytime — no questions asked.
                </p>
                <p style="font-size:12px;color:#9ca3af;margin-top:32px;">Developmental Hub · Play Move Improve Pty Ltd · Victoria, Australia</p>
              </div>
            `,
          });
        } catch (emailErr) {
          console.error("Welcome email failed:", emailErr);
        }

        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const supabase = getSupabaseAdmin();
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
  }

  return NextResponse.json({ received: true });
}