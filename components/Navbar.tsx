"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase";

export default function Navbar() {
  const supabase = createClient();
  const [signedIn, setSignedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (mounted) {
        setSignedIn(!!user);
        setChecking(false);
      }
    }

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setSignedIn(!!session?.user);
        setChecking(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <header className="sticky top-0 z-40 border-b border-[#e8e4de] bg-[#faf8f5]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 text-[#1e1b2e]">
        <Link href="/" className="min-w-0">
          <p className="text-lg font-bold leading-tight md:text-xl">
            AHA Learning Community
          </p>
          <p className="hidden text-sm leading-tight text-[#5f5b73] sm:block">
            Monthly coaching for Allied Health Assistants
          </p>
        </Link>

        <div className="hidden items-center gap-6 text-base font-semibold md:flex">
          <Link href="/" className="hover:text-[#0f766e]">
            Home
          </Link>

          <Link href="/sessions" className="hover:text-[#0f766e]">
            Onboarding webinar
          </Link>

          <Link href="/community" className="hover:text-[#0f766e]">
            Community
          </Link>

          <Link href="/waitlist" className="hover:text-[#0f766e]">
            Join interest list
          </Link>

          <Link href="/contact" className="hover:text-[#0f766e]">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {!checking && signedIn && (
            <Link
              href="/dashboard"
              className="hidden rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-5 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1] sm:inline-flex"
            >
              Dashboard
            </Link>
          )}

          {!checking && !signedIn && (
            <Link
              href="/login"
              className="hidden rounded-full border border-[#e8e4de] bg-white px-5 py-3 text-sm font-semibold text-[#1e1b2e] transition hover:bg-[#f5f1eb] sm:inline-flex"
            >
              Login
            </Link>
          )}

          <Link
            href="/waitlist"
            className="rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
          >
            Join
          </Link>
        </div>
      </nav>

      <div className="border-t border-[#e8e4de] px-6 py-3 md:hidden">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-4 text-sm font-semibold text-[#1e1b2e]">
          <Link href="/sessions" className="hover:text-[#0f766e]">
            Webinar
          </Link>

          <Link href="/community" className="hover:text-[#0f766e]">
            Community
          </Link>

          <Link href="/waitlist" className="hover:text-[#0f766e]">
            Join
          </Link>

          {!checking && signedIn && (
            <Link href="/dashboard" className="hover:text-[#0f766e]">
              Dashboard
            </Link>
          )}

          {!checking && !signedIn && (
            <Link href="/login" className="hover:text-[#0f766e]">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}