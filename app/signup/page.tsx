"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

const PROFILE_ROLE = "learner";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [pathway, setPathway] = useState("allied-health");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const cleanEmail = email.trim().toLowerCase();
    const cleanFullName = fullName.trim();
    const cleanReferralCode = referralCode.trim().toUpperCase();

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: {
          full_name: cleanFullName,
          referred_by: cleanReferralCode || null,
          pathway,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        email: cleanEmail,
        full_name: cleanFullName,
        role: PROFILE_ROLE,
        referred_by: cleanReferralCode || null,
        pathway,
      });

      if (profileError) {
        setError(profileError.message);
        setLoading(false);
        return;
      }
    }

    router.push(`/signup/confirm?redirect=${encodeURIComponent(redirectTo)}`);
  }

  return (
    <main className="min-h-screen bg-[#faf8f5] px-4 py-12 text-[#1e1b2e]">
      <section className="mx-auto flex min-h-[calc(100vh-96px)] max-w-6xl items-center justify-center">
        <div className="w-full max-w-xl">
          <div className="mb-8 text-center">
            <Link
              href="/"
              className="mb-6 inline-flex items-center justify-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0f766e] text-lg text-white">
                ✦
              </div>

              <span className="text-lg font-bold text-[#1e1b2e]">
                Allied Health & Educator Resource Academy
              </span>
            </Link>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Create learner account
            </p>

            <h1 className="mb-3 text-4xl font-bold">
              Join the academy
            </h1>

            <p className="mx-auto max-w-md text-sm leading-relaxed text-[#6b6880]">
              Create your account first. You can choose or change your pathway from the dashboard.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label
                  htmlFor="full-name"
                  className="mb-2 block text-sm font-semibold text-[#1e1b2e]"
                >
                  Full name
                </label>
                <input
                  id="full-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jane Smith"
                  required
                  className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-sm text-[#1e1b2e] outline-none transition focus:border-[#0f766e]"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#1e1b2e]"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  required
                  className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-sm text-[#1e1b2e] outline-none transition focus:border-[#0f766e]"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-[#1e1b2e]"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  required
                  minLength={8}
                  className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-sm text-[#1e1b2e] outline-none transition focus:border-[#0f766e]"
                />
              </div>

              <div>
                <label
                  htmlFor="pathway"
                  className="mb-2 block text-sm font-semibold text-[#1e1b2e]"
                >
                  Starting pathway
                </label>
                <select
                  id="pathway"
                  value={pathway}
                  onChange={(e) => setPathway(e.target.value)}
                  className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-sm text-[#1e1b2e] outline-none transition focus:border-[#0f766e]"
                >
                  <option value="allied-health">Allied Health</option>
                  <option value="educator">Educator</option>
                  <option value="not-sure">Not sure yet</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="referral-code"
                  className="mb-2 block text-sm font-semibold text-[#1e1b2e]"
                >
                  Referral code{" "}
                  <span className="font-normal text-[#6b6880]">
                    optional
                  </span>
                </label>
                <input
                  id="referral-code"
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  placeholder="e.g. SARAH2025"
                  className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-sm uppercase text-[#1e1b2e] outline-none transition focus:border-[#0f766e]"
                />
              </div>

              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating your account..." : "Create account"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[#6b6880]">
              Already have an account?{" "}
              <Link
                href={`/login?redirect=${encodeURIComponent(redirectTo)}`}
                className="font-semibold text-[#0f766e] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#faf8f5]" />
      }
    >
      <SignupForm />
    </Suspense>
  );
}