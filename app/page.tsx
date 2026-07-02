"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.25em] text-[#0f766e]">
          Welcome to the academy
        </span>

        <h1 className="mx-auto mb-8 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
          The Allied Health & Educator Resource Academy
        </h1>

        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#6b6880] md:text-xl">
          One platform with two wings: Allied Health and Educator.
        </p>
      </section>

      {/* Platform wings */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Allied Health Wing */}
          <div className="rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0fdfa] text-2xl">
              🧠
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Wing one
            </p>

            <h2 className="mb-5 text-3xl font-bold">
              Allied Health
            </h2>

            <div className="space-y-3 text-sm leading-relaxed text-[#6b6880]">
              <p>
                Foundations module
              </p>
              <p>
                Developmental milestones series
              </p>
              <p>
                Specialty tracks
              </p>
              <p>
                Business partnership module
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/allied-health/foundations/welcome-to-aha-role"
                className="rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                View first topic layout
              </Link>

              <Link
                href="/community"
                className="rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-6 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
              >
                View AHA membership hub
              </Link>
            </div>
          </div>

          {/* Educator Wing */}
          <div className="rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef2ff] text-2xl">
              🌿
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#3730a3]">
              Wing two
            </p>

            <h2 className="mb-5 text-3xl font-bold">
              Educator
            </h2>

            <div className="space-y-3 text-sm leading-relaxed text-[#6b6880]">
              <p>
                Educator pathway
              </p>
              <p>
                Joyful Educator tools
              </p>
              <p>
                Movement and regulation resources
              </p>
              <p>
                Future educator modules
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/educator"
                className="rounded-full bg-[#3730a3] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2e288a]"
              >
                View educator wing
              </Link>

              <a
                href="https://pmi-joyful-educator.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[#c7d2fe] bg-[#eef2ff] px-6 py-3 text-sm font-semibold text-[#3730a3] transition hover:bg-[#e0e7ff]"
              >
                Open current Joyful Educator site
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Shared structure */}
      <section className="border-y border-[#e8e4de] bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#6b6880]">
              Reusable learning structure
            </p>
            <h2 className="text-3xl font-bold md:text-4xl">
              One topic page template
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {["Watch", "Practice", "Do", "Reflect"].map((step, index) => (
              <div
                key={step}
                className="rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-[#0f766e]">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-3xl bg-[#1e1b2e] p-8 text-white md:p-12">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#99f6e4]">
                Monthly membership
              </p>

              <h2 className="mb-5 text-3xl font-bold md:text-4xl">
                AHA Community Hub
              </h2>

              <div className="space-y-3 text-sm leading-relaxed text-[#d9d7e5]">
                <p>
                  A private space for AHAs to connect.
                </p>
                <p>
                  Monthly live Zooms.
                </p>
                <p>
                  Saved recordings.
                </p>
                <p>
                  A simple member feed for posts, photos, questions and updates.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
              <p className="mb-4 text-sm font-semibold text-white">
                Demo links
              </p>

              <div className="flex flex-col gap-3">
                <Link
                  href="/community"
                  className="rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-[#1e1b2e] transition hover:bg-[#f5f3ff]"
                >
                  View community hub
                </Link>

                <Link
                  href="/signup"
                  className="rounded-full border border-white/25 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Signup
                </Link>

                <Link
                  href="/subscribe"
                  className="rounded-full border border-white/25 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Subscribe
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}