"use client";

import Link from "next/link";
import { AlertCircle, ArrowRight, Home, Mail, RefreshCw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center px-6 py-16">
        <div className="w-full rounded-3xl border border-[#e8e4de] bg-white p-8 text-center shadow-sm md:p-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#fef2f2] text-[#b91c1c]">
            <AlertCircle size={32} />
          </div>

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
            Something went wrong
          </p>

          <h1 className="mx-auto mb-5 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            This AHA Professional Development page could not load properly.
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-[#6b6880] md:text-lg">
            This may be temporary. You can try loading the page again, return to
            the homepage, or contact Play Move Improve if the issue continues.
          </p>

          <div className="mx-auto mb-8 max-w-2xl rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5 text-left">
            <p className="mb-2 text-sm font-semibold text-[#1e1b2e]">
              Error details
            </p>

            <p className="text-sm leading-relaxed text-[#6b6880]">
              {error?.message
                ? error.message
                : "No additional error details were provided."}
            </p>

            {error?.digest ? (
              <p className="mt-3 text-xs leading-relaxed text-[#6b6880]">
                Error reference: {error.digest}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
            >
              Try again
              <RefreshCw size={15} />
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-6 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
            >
              Back to homepage
              <Home size={15} />
            </Link>

            <a
              href="mailto:playmoveimprove@gmail.com?subject=AHA Professional Development website issue"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#e8e4de] bg-white px-6 py-3 text-sm font-semibold text-[#6b6880] transition hover:border-[#99f6e4] hover:bg-[#f0fdfa] hover:text-[#0f766e]"
            >
              Contact Robyn
              <Mail size={15} />
            </a>
          </div>

          <div className="mt-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5 text-left">
            <p className="mb-1 text-sm font-semibold text-[#0f766e]">
              Professional boundary
            </p>

            <p className="text-sm leading-relaxed text-[#3f5f5a]">
              AHA Professional Development provides foundation reflective
              professional development and reflective practice support. It does
              not replace workplace supervision, clinical supervision,
              delegation, direction, clinical oversight or workplace
              responsibilities.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}