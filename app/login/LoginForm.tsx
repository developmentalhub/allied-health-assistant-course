"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRoundPlus,
} from "lucide-react";
import { createClient } from "@/lib/supabase";

const SUPPORT_EMAIL = "jess@spectrumvillage.com.au";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirect") || "/member-library";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage("");

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error) {
      setErrorMessage(
        "We could not sign you in with those details. Please check your email and password, then try again.",
      );
      setIsLoading(false);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#fffaf3] px-5 py-12 text-[#1e1b2e] sm:px-6 md:py-20">
      <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <aside className="rounded-4xl border border-[#f4d9a6] bg-linear-to-br from-[#fff7df] via-white to-[#f0fdfa] p-7 shadow-sm md:p-9">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
            Allied Health Hive | Workforce Development
          </p>

          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Sign in to your private learning area.
          </h1>

          <p className="mt-5 text-base leading-relaxed text-[#5f5b73]">
            Accounts are used for private resources, member learning, team
            access and administration areas.
          </p>

          <div className="mt-7 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0f766e]">
              <BookOpen size={21} />
            </div>

            <h2 className="mb-3 text-xl font-bold">
              You do not need an account for everything
            </h2>

            <p className="text-sm leading-relaxed text-[#3f5f5a]">
              Free tools, public learning topics, webinar registration and the
              community entrance can still be accessed without signing in.
            </p>

            <div className="mt-5 grid gap-3">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
              >
                Use the free tools
                <ArrowRight size={15} />
              </Link>

              <Link
                href="/topics"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
              >
                Explore learning topics
                <ArrowRight size={15} />
              </Link>

              <Link
                href="/subscribe"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
              >
                Register for the free webinar
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </aside>

        <section className="rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-9">
          <div className="mb-7">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <LockKeyhole size={24} />
            </div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Account sign in
            </p>

            <h2 className="text-3xl font-bold">
              Welcome back.
            </h2>

            <p className="mt-3 text-base leading-relaxed text-[#6b6880]">
              Enter the email and password connected with your Allied Health
              Hive account.
            </p>
          </div>

          <form onSubmit={handleLogin} className="grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[#1e1b2e]">
                Email address
              </span>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-base outline-none transition focus:border-[#0f766e] focus:bg-white"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[#1e1b2e]">
                Password
              </span>

              <div className="flex rounded-2xl border border-[#e8e4de] bg-[#faf8f5] transition focus-within:border-[#0f766e] focus-within:bg-white">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  autoComplete="current-password"
                  className="min-w-0 flex-1 rounded-l-2xl bg-transparent px-4 py-3 text-base outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="flex items-center justify-center px-4 text-[#6b6880] transition hover:text-[#0f766e]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </label>

            {errorMessage ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-700">
                {errorMessage}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-full bg-[#0f766e] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-6 rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#1e1b2e]">
              <Mail size={18} className="text-[#0f766e]" />
              Forgotten your password?
            </div>

            <p className="text-sm leading-relaxed text-[#6b6880]">
              Contact Allied Health Hive support and include the email address
              connected with your account.
            </p>

            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=Allied Health Hive password help`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
            >
              Request account help
              <ArrowRight size={15} />
            </a>
          </div>

          <div className="mt-5 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
              <UserRoundPlus size={18} />
              New to the Hive?
            </div>

            <p className="mb-4 text-sm leading-relaxed text-[#3f5f5a]">
              Begin with the free public tools, community and webinar. You do not
              need to create a private account to explore these areas.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/join"
                className="inline-flex items-center justify-center rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Explore the free Hive
              </Link>

              <Link
                href="/subscribe"
                className="inline-flex items-center justify-center rounded-full border border-[#0f766e] bg-white px-5 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#faf8f5]"
              >
                Register for webinar
              </Link>
            </div>
          </div>

          <div className="mt-5 border-t border-[#e8e4de] pt-5">
            <p className="mb-3 text-sm font-semibold text-[#1e1b2e]">
              Authorised administration access
            </p>

            <p className="mb-4 text-sm leading-relaxed text-[#6b6880]">
              Only use the administration registration page if you have been
              given an approved invite code.
            </p>

            <Link
              href="/admin/register"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
            >
              Create an authorised admin account
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}