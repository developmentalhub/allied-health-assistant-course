"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError("Please enter your email address.");
      setLoading(false);
      return;
    }

    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/auth/reset-password`
        : undefined;

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      cleanEmail,
      {
        redirectTo,
      }
    );

    if (resetError) {
      setError("We couldn't send the reset email. Please try again.");
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <main className="min-h-screen bg-[#faf8f5] px-6 py-14 text-[#1e1b2e] md:py-20">
        <section className="mx-auto max-w-2xl rounded-3xl border border-[#e8e4de] bg-white p-8 text-center shadow-sm md:p-12">
          <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Check your email
          </p>

          <h1 className="mb-5 text-4xl font-bold leading-tight md:text-5xl">
            Password reset link sent
          </h1>

          <p className="mb-8 text-xl leading-relaxed text-[#5f5b73]">
            We’ve sent a password reset link to your email address. Open the
            link to create a new password for your academy account.
          </p>

          <Link
            href="/login"
            className="inline-flex rounded-full bg-[#0f766e] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
          >
            Back to login
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-14 text-[#1e1b2e] md:py-20">
      <section className="mx-auto max-w-2xl">
        <div className="mb-8">
          <Link
            href="/login"
            className="text-base font-semibold text-[#0f766e] hover:underline"
          >
            Back to login
          </Link>
        </div>

        <div className="rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-12">
          <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Reset password
          </p>

          <h1 className="mb-5 text-4xl font-bold leading-tight md:text-5xl">
            Get back into your academy account
          </h1>

          <p className="mb-8 text-xl leading-relaxed text-[#5f5b73]">
            Enter your email address and we’ll send you a secure link to reset
            your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-lg font-semibold text-[#1e1b2e]"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-4 text-lg text-[#1e1b2e] outline-none transition focus:border-[#0f766e]"
              />
            </div>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-base text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#0f766e] px-7 py-4 text-lg font-semibold text-white transition hover:bg-[#0d6962] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}