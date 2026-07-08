"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, LockKeyhole, UserRoundPlus } from "lucide-react";
import { createClient } from "@/lib/supabase";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirect") || "/member-library";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(true);
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
      setErrorMessage(error.message);
      setIsLoading(false);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm">
      <div className="mb-6">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
          <LockKeyhole size={24} />
        </div>

        <h1 className="mb-3 text-3xl font-bold text-[#1e1b2e]">
          Sign in
        </h1>

        <p className="text-base leading-relaxed text-[#6b6880]">
          Sign in to access your AHA Professional Development member library,
          admin tools or community account.
        </p>
      </div>

      <form onSubmit={handleLogin} className="grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-[#1e1b2e]">
            Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
            className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-base outline-none transition focus:border-[#0f766e] focus:bg-white"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-[#1e1b2e]">
            Password
          </span>

          <div className="flex rounded-2xl border border-[#e8e4de] bg-[#faf8f5] focus-within:border-[#0f766e] focus-within:bg-white">
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
          className="mt-2 inline-flex items-center justify-center rounded-full bg-[#0f766e] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#0d6962] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className="mt-6 rounded-2xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
          <UserRoundPlus size={18} />
          New here?
        </div>

        <p className="mb-4 text-sm leading-relaxed text-[#3f5f5a]">
          Register for the AHA Professional Development membership to access the
          member library, Zoom links, PDFs and recordings.
        </p>

        <Link
          href="/subscribe"
          className="inline-flex w-full items-center justify-center rounded-full border border-[#0f766e] bg-white px-5 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#faf8f5]"
        >
          Register for membership
        </Link>
      </div>

      <div className="mt-4 rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-5">
        <p className="mb-3 text-sm font-semibold text-[#1e1b2e]">
          Admin team?
        </p>

        <p className="mb-4 text-sm leading-relaxed text-[#6b6880]">
          If you have been given an admin invite code, create your admin account
          here.
        </p>

        <Link
          href="/admin/register"
          className="inline-flex w-full items-center justify-center rounded-full border border-[#e8e4de] bg-white px-5 py-3 text-sm font-semibold text-[#1e1b2e] transition hover:border-[#0f766e] hover:text-[#0f766e]"
        >
          Create admin account
        </Link>
      </div>
    </div>
  );
}