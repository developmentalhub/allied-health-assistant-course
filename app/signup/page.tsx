"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRoundPlus,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const PROFILE_ROLE = "learner";
const PROFILE_PATHWAY = "allied-health";
const SUPPORT_EMAIL = "jess@spectrumvillage.com.au";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

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
          pathway: PROFILE_PATHWAY,
        },
      },
    });

    if (signUpError) {
      setError(
        "We could not create your account. Please check your details and try again.",
      );
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
        pathway: PROFILE_PATHWAY,
      });

      if (profileError) {
        setError(
          "Your sign-in account was created, but we could not finish setting up your profile. Please contact support before trying again.",
        );
        setLoading(false);
        return;
      }
    }

    router.push(
      `/signup/confirm?redirect=${encodeURIComponent(redirectTo)}`,
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf3] px-5 py-12 text-[#1e1b2e] sm:px-6 md:py-20">
      <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <aside className="rounded-4xl border border-[#f4d9a6] bg-linear-to-br from-[#fff7df] via-white to-[#f0fdfa] p-7 shadow-sm md:p-9">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0f766e] text-white">
              <BookOpen size={22} />
            </div>

            <span className="text-lg font-bold">
              Allied Health Hive
            </span>
          </Link>

          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
            Workforce Development
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
            Create your Allied Health Hive account.
          </h1>

          <p className="mt-5 text-base leading-relaxed text-[#5f5b73]">
            Create a learner account to access private learning areas,
            member resources and future workforce development content.
          </p>

          <div className="mt-7 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
            <h2 className="mb-4 text-xl font-bold">
              Your account may include access to:
            </h2>

            <div className="grid gap-3">
              <Feature text="Private webinar recordings and handouts" />
              <Feature text="Member learning resources" />
              <Feature text="Session planning and reflection tools" />
              <Feature text="Future AHA workforce development content" />
            </div>
          </div>

          <div className="mt-5 rounded-3xl border border-[#e8e4de] bg-white p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
              <LockKeyhole size={18} />
              No account needed for free public tools
            </div>

            <p className="text-sm leading-relaxed text-[#6b6880]">
              You can browse public learning topics, register for the free
              webinar and use public tools without creating an account.
            </p>

            <Link
              href="/tools"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
            >
              Explore free tools
              <ArrowRight size={15} />
            </Link>
          </div>
        </aside>

        <section className="rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-9">
          <div className="mb-7">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <UserRoundPlus size={24} />
            </div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Learner registration
            </p>

            <h2 className="text-3xl font-bold">
              Set up your account
            </h2>

            <p className="mt-3 text-base leading-relaxed text-[#6b6880]">
              Use your own email address so your private access and learning
              resources stay connected to you.
            </p>
          </div>

          <form onSubmit={handleSignup} className="grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-semibold">
                Full name
              </span>

              <input
                id="full-name"
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Jane Smith"
                required
                autoComplete="name"
                className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-base outline-none transition focus:border-[#0f766e] focus:bg-white"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold">
                Email address
              </span>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="jane@example.com"
                required
                autoComplete="email"
                className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-base outline-none transition focus:border-[#0f766e] focus:bg-white"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold">
                Password
              </span>

              <div className="flex rounded-2xl border border-[#e8e4de] bg-[#faf8f5] transition focus-within:border-[#0f766e] focus-within:bg-white">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 8 characters"
                  required
                  minLength={8}
                  autoComplete="new-password"
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

              <span className="text-xs leading-relaxed text-[#6b6880]">
                Use at least 8 characters and avoid reusing a password from
                another website.
              </span>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold">
                Referral or invitation code
                <span className="ml-2 font-normal text-[#6b6880]">
                  optional
                </span>
              </span>

              <input
                id="referral-code"
                type="text"
                value={referralCode}
                onChange={(event) => setReferralCode(event.target.value)}
                placeholder="Enter your code"
                autoComplete="off"
                className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-base uppercase outline-none transition focus:border-[#0f766e] focus:bg-white"
              />

              <span className="text-xs leading-relaxed text-[#6b6880]">
                Leave this blank unless your workplace, manager or Allied
                Health Hive has given you a code.
              </span>
            </label>

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-700">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating your account..." : "Create learner account"}
              {!loading ? <ArrowRight size={17} /> : null}
            </button>
          </form>

          <div className="mt-6 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
              <Mail size={18} />
              What happens next?
            </div>

            <p className="text-sm leading-relaxed text-[#3f5f5a]">
              You may be asked to confirm your email address. After confirmation,
              sign in and continue to your dashboard. Some private resources may
              require separate approved access.
            </p>
          </div>

          <div className="mt-5 rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <ShieldCheck size={18} className="text-[#0f766e]" />
              Administration accounts
            </div>

            <p className="text-sm leading-relaxed text-[#6b6880]">
              This page creates a learner account only. Authorised administrators
              must use the separate admin registration page and an approved
              invitation code.
            </p>

            <Link
              href="/admin/register"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
            >
              Authorised admin registration
              <ArrowRight size={15} />
            </Link>
          </div>

          <p className="mt-6 text-center text-sm text-[#6b6880]">
            Already have an account?{" "}
            <Link
              href={`/login?redirect=${encodeURIComponent(redirectTo)}`}
              className="font-semibold text-[#0f766e] hover:underline"
            >
              Sign in
            </Link>
          </p>

          <p className="mt-4 text-center text-sm text-[#6b6880]">
            Invitation or account problem?{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=Allied Health Hive account registration help`}
              className="font-semibold text-[#0f766e] hover:underline"
            >
              Contact support
            </a>
          </p>
        </section>
      </section>
    </main>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex gap-3">
      <CheckCircle2
        size={18}
        className="mt-0.5 shrink-0 text-[#0f766e]"
      />

      <p className="text-sm leading-relaxed text-[#3f5f5a]">{text}</p>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={<main className="min-h-screen bg-[#fffaf3]" />}
    >
      <SignupForm />
    </Suspense>
  );
}