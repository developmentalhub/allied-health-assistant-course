"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

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
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <PaymentElement />

      {error && (
        <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", fontSize: "14px", padding: "12px 16px", borderRadius: "12px" }}>
          {error}
        </div>
      )}

      <div style={{ backgroundColor: "#fffbeb", border: "1px solid #fcd34d", borderRadius: "12px", padding: "16px" }}>
        <p style={{ fontSize: "13px", fontWeight: 600, color: "#92400e", margin: "0 0 8px 0" }}>
          Important — how this works
        </p>
        <p style={{ fontSize: "12px", color: "#92400e", margin: 0, lineHeight: 1.6 }}>
          Your card will be authorised but not charged today. Payment is only captured once the session reaches its minimum number of families, 24 hours before it starts. If the session does not run, you will never be charged.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading || !stripe}
        style={{ width: "100%", backgroundColor: "#3730a3", color: "white", padding: "14px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading || !stripe ? 0.6 : 1 }}
      >
        {loading ? "Processing..." : `Authorise $${(price / 100).toFixed(0)} AUD`}
      </button>

      <p style={{ fontSize: "12px", color: "#6b6880", textAlign: "center" }}>
        Secured by Stripe. Your card details are never stored on our servers.
      </p>
    </form>
  );
}

export default function BookingPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [session, setSession] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [alreadyBooked, setAlreadyBooked] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function setup() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push(`/login?redirect=/sessions/${id}/book`);
        return;
      }

      const { data: sessionData } = await supabase
        .from("sessions")
        .select("*")
        .eq("id", id)
        .single();

      if (!sessionData) {
        setError("Session not found.");
        setLoading(false);
        return;
      }

      setSession(sessionData);

      const { data: existingBooking } = await supabase
        .from("bookings")
        .select("id")
        .eq("session_id", id)
        .eq("family_id", user.id)
        .single();

      if (existingBooking) {
        setAlreadyBooked(true);
        setLoading(false);
        return;
      }

      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: id }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      setClientSecret(data.clientSecret);
      setLoading(false);
    }

    setup();
  }, [id]);

  if (loading) {
    return (
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <p style={{ color: "#6b6880" }}>Setting up your booking...</p>
      </div>
    );
  }

  if (alreadyBooked) {
    return (
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <div style={{ width: "48px", height: "48px", backgroundColor: "#f0fdf4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <svg width="24" height="24" fill="none" stroke="#166534" strokeWidth="2">
            <path d="M4 12l6 6L20 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 300, color: "#1e1b2e", marginBottom: "12px" }}>
          You are already booked
        </h1>
        <p style={{ color: "#6b6880", marginBottom: "24px" }}>
          You have already reserved a spot in this session.
        </p>
        <Link href="/dashboard" style={{ backgroundColor: "#3730a3", color: "white", padding: "12px 28px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
          Go to dashboard
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <p style={{ color: "#b91c1c", marginBottom: "16px" }}>{error}</p>
        <Link href="/sessions" style={{ color: "#3730a3", fontWeight: 500, textDecoration: "none" }}>
          Back to sessions
        </Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#faf8f5", minHeight: "100vh" }}>
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "40px 24px 80px" }}>

        <Link
          href={`/sessions/${id}`}
          style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "32px" }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to session
        </Link>

        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 300, color: "#1e1b2e", marginBottom: "8px" }}>
          Reserve your spot
        </h1>
        <p style={{ fontSize: "15px", color: "#6b6880", marginBottom: "32px" }}>
          {session?.title}
        </p>

        <div style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e8e4de", padding: "32px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          {clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: "stripe",
                  variables: {
                    colorPrimary: "#3730a3",
                    borderRadius: "12px",
                    fontFamily: "DM Sans, system-ui, sans-serif",
                  },
                },
              }}
            >
              <CheckoutForm
                sessionId={id}
                price={session?.price_cents}
              />
            </Elements>
          )}
        </div>

      </div>
    </div>
  );
}