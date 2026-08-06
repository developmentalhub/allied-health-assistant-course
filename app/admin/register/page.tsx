import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRoundPlus,
} from "lucide-react";
import { createAdminAccount } from "./actions";

export const metadata: Metadata = {
  title: "Authorised Admin Registration | Allied Health Hive",
  description:
    "Create an approved Allied Health Hive administration account using a valid invitation code.",
};

type AdminRegisterPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

const SUPPORT_EMAIL = "jess@spectrumvillage.com.au";

export default async function AdminRegisterPage({
  searchParams,
}: AdminRegisterPageProps) {
  const params = await searchParams;
  const error = params?.error;

  return (
    <main className="min-h-screen bg-[#fffaf3] px-5 py-12 text-[#1e1b2e] sm:px-6 md:py-20">
      <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <aside className="rounded-4xl border border-[#f4d9a6] bg-linear-to-br from-[#fff7df] via-white to-[#f0fdfa] p-7 shadow-sm md:p-9">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
            Allied Health Hive | Workforce Development
          </p>

          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#0f766e] text-white">
            <ShieldCheck size={28} />
          </div>

          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Authorised administration registration.
          </h1>

          <p className="mt-5 text-base leading-relaxed text-[#5f5b73]">
            This page is only for Robyn, Jess and approved team members who have
            been given a private administration invitation code.
          </p>

          <div className="mt-7 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
            <h2 className="mb-4 text-xl font-bold">
              Administration access may include:
            </h2>

            <div className="grid gap-3">
              <Feature text="Managing webinar details and resources" />
              <Feature text="Reviewing approved platform content" />
              <Feature text="Managing private learning areas" />
              <Feature text="Supporting user access and administration" />
            </div>
          </div>

          <div className="mt-5 rounded-3xl border border-[#e8e4de] bg-white p-5">
            <h2 className="mb-3 text-lg font-bold">
              Are you creating a regular learner account?
            </h2>

            <p className="text-sm leading-relaxed text-[#6b6880]">
              Allied Health Assistants and ordinary learners should use the
              learner registration page instead. They do not need an admin
              invitation code.
            </p>

            <Link
              href="/signup"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
            >
              Create learner account
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
              Approved team members only
            </p>

            <h2 className="text-3xl font-bold">
              Create your admin account
            </h2>

            <p className="mt-3 text-base leading-relaxed text-[#6b6880]">
              Enter the private invitation code you were given, then create your
              own secure login.
            </p>
          </div>

          <div className="mb-6 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
            <p className="mb-3 text-sm font-semibold text-[#0f766e]">
              Already registered?
            </p>

            <Link
              href="/login?redirect=/admin"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0f766e] shadow-sm transition hover:bg-[#faf8f5]"
            >
              Sign in to administration
              <ArrowRight size={15} />
            </Link>
          </div>

          {error ? (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-700">
              {decodeURIComponent(error)}
            </div>
          ) : null}

          <form action={createAdminAccount} className="grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-semibold">
                Admin invitation code
              </span>

              <div className="relative">
                <LockKeyhole
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6b6880]"
                  size={18}
                />

                <input
                  id="inviteCode"
                  name="inviteCode"
                  type="text"
                  required
                  autoComplete="off"
                  className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] py-3 pl-11 pr-4 text-base uppercase outline-none transition focus:border-[#0f766e] focus:bg-white"
                  placeholder="Enter approved code"
                />
              </div>

              <span className="text-xs leading-relaxed text-[#6b6880]">
                This code is private and should not be shared with general
                learners or website visitors.
              </span>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold">
                Full name
              </span>

              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                autoComplete="name"
                className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-base outline-none transition focus:border-[#0f766e] focus:bg-white"
                placeholder="Jess Foster"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold">
                Email address
              </span>

              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-base outline-none transition focus:border-[#0f766e] focus:bg-white"
                placeholder="name@example.com"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold">
                Create password
              </span>

              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-base outline-none transition focus:border-[#0f766e] focus:bg-white"
                placeholder="At least 8 characters"
              />

              <span className="text-xs leading-relaxed text-[#6b6880]">
                Use a unique password that is not used for another service.
              </span>
            </label>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
            >
              Create authorised admin account
              <ArrowRight size={17} />
            </button>
          </form>

          <div className="mt-6 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
              <Mail size={18} />
              What happens next?
            </div>

            <p className="text-sm leading-relaxed text-[#3f5f5a]">
              After successful registration, you may need to confirm your email
              before signing in. Your approved role and administration access
              should then be available through the admin area.
            </p>
          </div>

          <div className="mt-5 rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
            <h3 className="mb-3 text-sm font-semibold">
              Invitation code not working?
            </h3>

            <p className="text-sm leading-relaxed text-[#6b6880]">
              Check that the code has been entered exactly as provided. If it is
              still not accepted, contact Allied Health Hive support rather than
              creating a learner account first.
            </p>

            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=Allied Health Hive admin invitation help`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
            >
              Contact admin support
              <ArrowRight size={15} />
            </a>
          </div>

          <div className="mt-6 border-t border-[#e8e4de] pt-5 text-center">
            <p className="text-sm text-[#6b6880]">
              Need ordinary learner access instead?{" "}
              <Link
                href="/signup"
                className="font-semibold text-[#0f766e] hover:underline"
              >
                Go to learner registration
              </Link>
            </p>
          </div>
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