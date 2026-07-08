import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, LockKeyhole, UserRoundPlus } from "lucide-react";
import { createAdminAccount } from "./actions";

export const metadata: Metadata = {
  title: "Create Admin Account — AHA Professional Development",
  description: "Create an approved admin account for the AHA platform.",
};

type AdminRegisterPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function AdminRegisterPage({
  searchParams,
}: AdminRegisterPageProps) {
  const params = await searchParams;
  const error = params?.error;

  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-14 text-[#1e1b2e] md:py-20">
      <section className="mx-auto flex min-h-[70vh] max-w-xl items-center">
        <div className="w-full rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
            <UserRoundPlus size={28} />
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
            Admin registration
          </p>

          <h1 className="mb-4 text-3xl font-bold md:text-4xl">
            Create an admin account.
          </h1>

          <p className="mb-6 text-base leading-relaxed text-[#6b6880]">
            This page is only for Robyn, Jess and approved team members. Enter
            the private admin invite code, then create your own login using your
            email and password.
          </p>

          <div className="mb-6 rounded-2xl border border-[#99f6e4] bg-[#f0fdfa] p-4">
            <p className="mb-3 text-sm font-semibold text-[#1e1b2e]">
              Already registered?
            </p>

            <Link
              href="/login?redirect=/admin"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0f766e] shadow-sm transition hover:bg-[#faf8f5]"
            >
              Sign in to admin
              <ArrowRight size={15} />
            </Link>
          </div>

          {error ? (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-700">
              {decodeURIComponent(error)}
            </div>
          ) : null}

          <form action={createAdminAccount} className="space-y-4">
            <div>
              <label
                htmlFor="inviteCode"
                className="mb-2 block text-sm font-semibold text-[#1e1b2e]"
              >
                Admin invite code
              </label>

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
                  className="w-full rounded-2xl border border-[#e8e4de] bg-white py-3 pl-11 pr-4 text-base outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#99f6e4]"
                  placeholder="Enter invite code"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-semibold text-[#1e1b2e]"
              >
                Full name
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                className="w-full rounded-2xl border border-[#e8e4de] bg-white px-4 py-3 text-base outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#99f6e4]"
                placeholder="Jess Foster"
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
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full rounded-2xl border border-[#e8e4de] bg-white px-4 py-3 text-base outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#99f6e4]"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-[#1e1b2e]"
              >
                Create password
              </label>

              <input
                id="password"
                name="password"
                type="text"
                required
                autoComplete="new-password"
                className="w-full rounded-2xl border border-[#e8e4de] bg-white px-4 py-3 text-base outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#99f6e4]"
                placeholder="Minimum 8 characters"
              />

              <p className="mt-2 text-sm leading-relaxed text-[#6b6880]">
                Password is visible so the new admin can check what they are
                typing.
              </p>
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#0f766e] px-5 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
            >
              Create admin account
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}