"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [ready, setReady] = useState(false);
  const [checking, setChecking] = useState(true);
  const [saving, setSaving] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const supabase = createClient();

    let mounted = true;

    async function checkRecoverySession() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!mounted) {
        return;
      }

      if (error) {
        console.error("Recovery session error:", error);
      }

      if (session?.user) {
        setReady(true);
        setChecking(false);
        return;
      }

      window.setTimeout(() => {
        if (!mounted) {
          return;
        }

        setChecking(false);
      }, 2000);
    }

    void checkRecoverySession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        if (!mounted) {
          return;
        }

        if (
          event === "PASSWORD_RECOVERY" ||
          event === "SIGNED_IN"
        ) {
          if (session?.user) {
            setReady(true);
            setChecking(false);
            setErrorMessage("");
          }
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (password.length < 8) {
      setErrorMessage(
        "Please choose a password with at least 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("The passwords do not match.");
      return;
    }

    setSaving(true);

    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      console.error("Password update error:", error);

      setErrorMessage(
        "We could not update your password. Your recovery link may have expired. Please request a new password reset email."
      );

      setSaving(false);
      return;
    }

    setSuccessMessage(
      "Your password has been changed successfully."
    );

    setSaving(false);

    window.setTimeout(() => {
      router.push("/login");
      router.refresh();
    }, 1500);
  }

  return (
    <main className="min-h-screen bg-[#fffaf3] px-5 py-12 text-[#1e1b2e] sm:px-6 md:py-20">
      <section className="mx-auto max-w-xl">
        <div className="rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-9">
          <div className="mb-7">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <KeyRound size={24} />
            </div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Allied Health Hive
            </p>

            <h1 className="text-3xl font-bold">
              Choose a new password
            </h1>

            <p className="mt-3 leading-relaxed text-[#6b6880]">
              Enter a new password for your Allied Health Hive
              account.
            </p>
          </div>

          {checking ? (
            <div className="rounded-2xl border border-[#f4d9a6] bg-[#fff7df] p-4 text-sm leading-relaxed text-[#5f5b73]">
              Checking your password recovery link...
            </div>
          ) : null}

          {!checking && !ready ? (
            <div className="grid gap-4">
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-700">
                This password recovery link is no longer valid or has
                expired. Please request a new password reset email.
              </div>

              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full bg-[#0f766e] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Back to sign in
              </Link>
            </div>
          ) : null}

          {ready ? (
            <form onSubmit={handleSubmit} className="grid gap-5">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[#1e1b2e]">
                  New password
                </span>

                <div className="flex rounded-2xl border border-[#e8e4de] bg-[#faf8f5] transition focus-within:border-[#0f766e] focus-within:bg-white">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    required
                    autoComplete="new-password"
                    className="min-w-0 flex-1 rounded-l-2xl bg-transparent px-4 py-3 text-base outline-none"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                    className="flex items-center justify-center px-4 text-[#6b6880] transition hover:text-[#0f766e]"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[#1e1b2e]">
                  Confirm new password
                </span>

                <div className="flex rounded-2xl border border-[#e8e4de] bg-[#faf8f5] transition focus-within:border-[#0f766e] focus-within:bg-white">
                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(event.target.value)
                    }
                    required
                    autoComplete="new-password"
                    className="min-w-0 flex-1 rounded-l-2xl bg-transparent px-4 py-3 text-base outline-none"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (current) => !current
                      )
                    }
                    className="flex items-center justify-center px-4 text-[#6b6880] transition hover:text-[#0f766e]"
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </label>

              {errorMessage ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-700">
                  {errorMessage}
                </div>
              ) : null}

              {successMessage ? (
                <div className="rounded-2xl border border-[#99f6e4] bg-[#f0fdfa] p-4 text-sm leading-relaxed text-[#0f766e]">
                  {successMessage}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center rounded-full bg-[#0f766e] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Saving new password..."
                  : "Save new password"}
              </button>

              <Link
                href="/login"
                className="text-center text-sm font-semibold text-[#0f766e] transition hover:text-[#0d6962]"
              >
                Back to sign in
              </Link>
            </form>
          ) : null}
        </div>
      </section>
    </main>
  );
}