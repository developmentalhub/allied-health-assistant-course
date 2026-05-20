import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function capturePayment(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId);
    return { success: true, paymentIntent };
  } catch (error) {
    console.error("Capture failed:", error);
    return { success: false, error };
  }
}