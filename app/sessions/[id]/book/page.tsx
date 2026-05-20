"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type Session = {
  id: string;
  title: string;
  price_cents: number;
};

function CheckoutForm({
  sessionId,
  price,
}: {
  sessionId: string;
  price: number;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!stripe || !elements) {
      setError("Payment system is still loading. Please try again.");
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
      confirmParams: {
        return_url: `${window.location.origin}/sessions/${sessionId}/booking-confirmed`,
      },
    });

    if (confirmError) {
      setError(confirmError.message || "Payment failed.");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        marginTop: "24px",
      }}
    >
      <PaymentElement />

      {error && (
        <div
          style={{
            color: "#b91c1c",
            backgroundColor: "#fee2e2",
            padding: "12px",
            borderRadius: "8px",
          }}
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !stripe}
        style={{
          padding: "14px 20px",
          borderRadius: "999px",
          backgroundColor: loading ? "#9ca3af" : "#3730a3",
          color: "white",
          border: "none",
          fontSize: "16px",
          fontWeight: 600,
          cursor: loading || !stripe ? "not-allowed" : "pointer",
        }}
      >
        {loading
          ? "Processing..."
          : `Authorise $${((price || 0) / 100).toFixed(0)} AUD`}
      </button>
    </form>
  );
}

export default function BookingPage() {
  const params = useParams();

  const sessionId = params.id as string;

  const [session, setSession] = useState<Session | null>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBookingData() {
      setLoading(true);
      setError("");

      if (!sessionId || sessionId === "undefined") {
        setError("Could not detect a valid session ID in the URL.");
        setLoading(false);
        return;
      }

      const { data, error: sessionError } = await supabase
        .from("sessions")
        .select("id, title, price_cents")
        .eq("id", sessionId)
        .single();

      if (sessionError || !data) {
        console.error("Supabase session error:", sessionError);
        setError("Session not found. This session may have been removed or the link is incorrect.");
        setLoading(false);
        return;
      }

      setSession(data);

      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId: data.id,
          }),
        });

        const paymentData = await response.json();

        if (!response.ok) {
          throw new Error(paymentData.error || "Could not create payment intent.");
        }

        if (!paymentData.clientSecret) {
          throw new Error("No client secret was returned from the payment API.");
        }

        setClientSecret(paymentData.clientSecret);
      } catch (paymentError: any) {
        console.error("Payment intent error:", paymentError);
        setError(paymentError.message || "Could not initiate payment.");
      }

      setLoading(false);
    }

    fetchBookingData();
  }, [sessionId]);

  if (loading) {
    return (
      <main
        style={{
          padding: "40px 24px",
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <p>Loading booking...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main
        style={{
          padding: "40px 24px",
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1>Session not found</h1>
        <p>{error}</p>

        <a
          href="/sessions"
          style={{
            display: "inline-block",
            marginTop: "20px",
            padding: "12px 20px",
            borderRadius: "999px",
            backgroundColor: "#3730a3",
            color: "white",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Browse all sessions
        </a>
      </main>
    );
  }

  if (!session || !clientSecret) {
    return (
      <main
        style={{
          padding: "40px 24px",
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1>Booking unavailable</h1>
        <p>We could not prepare the payment form for this session.</p>
      </main>
    );
  }

  return (
    <main
      style={{
        padding: "40px 24px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          marginBottom: "8px",
        }}
      >
        {session.title}
      </h1>

      <p
        style={{
          fontSize: "18px",
          marginBottom: "24px",
        }}
      >
        Total: ${(session.price_cents / 100).toFixed(0)} AUD
      </p>

      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm sessionId={session.id} price={session.price_cents} />
      </Elements>
    </main>
  );
}