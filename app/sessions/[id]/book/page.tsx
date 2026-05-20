"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutForm({ sessionId, price }: { sessionId: string, price: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
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
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <PaymentElement />
      {error && <div style={{ color: "red", fontSize: "14px" }}>{error}</div>}
      <button type="submit" disabled={loading || !stripe} style={{ padding: "14px", borderRadius: "999px", backgroundColor: "#3730a3", color: "white", border: "none", cursor: "pointer" }}>
        {loading ? "Processing..." : `Authorise $${(price / 100).toFixed(0)} AUD`}
      </button>
    </form>
  );
}

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  // Properly resolving params as a Promise
  const { id } = use(params);
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    async function setup() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push(`/login?redirect=/sessions/${id}/book`); return; }

      const { data: sessionData, error: sessionError } = await supabase
        .from("sessions")
        .select("*")
        .eq("id", id)
        .single();

      if (sessionError || !sessionData) {
        setError("Could not find this session. Please check the URL.");
        setLoading(false);
        return;
      }
      setSession(sessionData);

      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: id }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setClientSecret(data.clientSecret);
      }
      setLoading(false);
    }
    setup();
  }, [id, router]);

  if (loading) return <div>Loading booking details...</div>;
  if (error) return <div style={{ padding: "40px", textAlign: "center" }}>{error}</div>;

  return (
    <main style={{ padding: "40px 24px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px" }}>{session?.title}</h1>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm sessionId={id} price={session?.price_cents} />
        </Elements>
      )}
    </main>
  );
}