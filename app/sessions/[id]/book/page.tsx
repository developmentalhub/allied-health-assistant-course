"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import MainLayout from "@/components/MainLayout";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutForm({ sessionId, price }: { sessionId: string, price: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // Debugging step
    console.log("Stripe state:", { stripe: !!stripe, elements: !!elements });

    if (!stripe || !elements) {
      setError("Payment system is still loading. Please wait a moment.");
      return;
    }

    setLoading(true);
    setError("");

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || "Payment failed.");
      setLoading(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/sessions/${sessionId}/booking-confirmed` },
    });

    if (confirmError) {
      setError(confirmError.message || "Payment failed.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border rounded-lg bg-white shadow-sm">
        <PaymentElement />
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button 
        type="submit" 
        disabled={loading || !stripe} 
        className="w-full py-3 px-4 bg-indigo-700 text-white rounded-full font-semibold hover:bg-indigo-800 disabled:opacity-50"
      >
        {loading ? "Processing..." : `Authorise $${(price / 100).toFixed(0)} AUD`}
      </button>
    </form>
  );
}

export default function BookingPage() {
  const { id } = useParams();
  const [session, setSession] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    async function init() {
      const { data, error: err } = await supabase
        .from("sessions")
        .select("*")
        .eq("id", id)
        .single();

      if (err || !data) {
        setError("Session not found.");
        setLoading(false);
        return;
      }

      setSession(data);

      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: id }),
      });

      const paymentData = await res.json();
      if (paymentData.clientSecret) {
        setClientSecret(paymentData.clientSecret);
      } else {
        setError("Failed to start payment.");
      }
      setLoading(false);
    }
    init();
  }, [id]);

  if (loading) return <MainLayout><div className="p-10 text-center">Loading...</div></MainLayout>;
  if (error) return <MainLayout><div className="p-10 text-center text-red-600">{error}</div></MainLayout>;

  return (
    <MainLayout>
      <main className="max-w-xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold mb-6">{session?.title}</h1>
        {clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm sessionId={id as string} price={session?.price_cents} />
          </Elements>
        ) : (
          <p>Loading payment options...</p>
        )}
      </main>
    </MainLayout>
  );
}