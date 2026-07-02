"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";

const supabase = createClient();

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const cleanEmail = email.trim().toLowerCase();

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const role = profile?.role || "learner";

    if (redirectTo) {
      router.push(redirectTo);
    } else if (role === "admin") {
      router.push("/admin");
    } else if (role === "facilitator") {
      router.push("/facilitator-hub");
    } else {
      router.push("/dashboard");
    }
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
              Learner login
            </p>

            <h1 className="mb-3 text-4xl font-bold">
              Welcome back
            </h1>

            <p className="mx-auto max-w-md text-sm leading-relaxed text-[#6b6880]">
              Sign in to continue to your academy dashboard.
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8"
          >
            <div className="space-y-5">
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
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-[#1e1b2e]"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-[#0f766e] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                  className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-sm text-[#1e1b2e] outline-none transition focus:border-[#0f766e]"
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
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-[#6b6880]">
              Don&apos;t have an account?{" "}
              <Link
                href={`/signup${redirectTo ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`}
                className="font-semibold text-[#0f766e] hover:underline"
              >
                Create learner account
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#faf8f5]" />}>
      <LoginForm />
    </Suspense>
  );
}