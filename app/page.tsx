"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-16 text-center md:py-20">
        <p className="mb-5 text-base font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
          Welcome to the academy
        </p>

        <h1 className="mx-auto mb-8 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
          The Allied Health & Educator Resource Academy
        </h1>

        <p className="mx-auto max-w-3xl text-xl leading-relaxed text-[#5f5b73] md:text-2xl">
          One platform with an Allied Health pathway and an Educator pathway.
        </p>
      </section>

      {/* Pathway selection */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Allied Health */}
          <div className="rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
            <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Allied Health pathway
            </p>

            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Allied Health
            </h2>

            <div className="space-y-4 text-lg leading-relaxed text-[#5f5b73]">
              <p>Foundations module</p>
              <p>Developmental milestones series</p>
              <p>Specialty tracks</p>
              <p>Business partnership module</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/allied-health/foundations/welcome-to-aha-role"
                className="rounded-full bg-[#0f766e] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
              >
                View first topic layout
              </Link>

              <Link
                href="/community"
                className="rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-7 py-4 text-base font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
              >
                View membership hub
              </Link>
            </div>
          </div>

          {/* Educator */}
          <div className="rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
            <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#3730a3]">
              Educator pathway
            </p>

            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Educator
            </h2>

            <div className="space-y-4 text-lg leading-relaxed text-[#5f5b73]">
              <p>Educator pathway</p>
              <p>Joyful Educator tools</p>
              <p>Movement and regulation resources</p>
              <p>Future educator modules</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/educator"
                className="rounded-full bg-[#3730a3] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#2e288a]"
              >
                View educator pathway
              </Link>

              <a
                href="https://pmi-joyful-educator.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[#c7d2fe] bg-[#eef2ff] px-7 py-4 text-base font-semibold text-[#3730a3] transition hover:bg-[#e0e7ff]"
              >
                Open current educator site
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Learning structure */}
      <section className="border-y border-[#e8e4de] bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center">
            <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#6b6880]">
              Learning page structure
            </p>

            <h2 className="text-3xl font-bold md:text-5xl">
              A clear structure for every topic
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
              <p className="mb-3 text-base font-semibold text-[#0f766e]">
                Step 1
              </p>
              <h3 className="mb-3 text-2xl font-bold">Watch</h3>
              <p className="text-base leading-relaxed text-[#5f5b73]">
                Start with the video or audio lesson for the topic.
              </p>
            </div>

            <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
              <p className="mb-3 text-base font-semibold text-[#0f766e]">
                Step 2
              </p>
              <h3 className="mb-3 text-2xl font-bold">Practice</h3>
              <p className="text-base leading-relaxed text-[#5f5b73]">
                Use the practice tool, worksheet, or scenario activity provided for that topic.
              </p>
            </div>

            <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
              <p className="mb-3 text-base font-semibold text-[#0f766e]">
                Step 3
              </p>
              <h3 className="mb-3 text-2xl font-bold">Do</h3>
              <p className="text-base leading-relaxed text-[#5f5b73]">
                Complete the hands-on activity shown on the topic page.
              </p>
            </div>

            <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
              <p className="mb-3 text-base font-semibold text-[#0f766e]">
                Step 4
              </p>
              <h3 className="mb-3 text-2xl font-bold">Reflect</h3>
              <p className="text-base leading-relaxed text-[#5f5b73]">
                Finish with the reflection or self-check before moving on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-3xl bg-[#1e1b2e] p-8 text-white md:p-12">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#99f6e4]">
                Monthly membership
              </p>

              <h2 className="mb-6 text-3xl font-bold md:text-5xl">
                AHA Community Hub
              </h2>

              <div className="space-y-4 text-lg leading-relaxed text-[#d9d7e5]">
                <p>A private space for AHAs to connect.</p>
                <p>Monthly live Zooms.</p>
                <p>Saved recordings.</p>
                <p>A simple member feed for posts, photos, questions and updates.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
              <p className="mb-4 text-lg font-semibold text-white">
                Demo links
              </p>

              <div className="flex flex-col gap-3">
                <Link
                  href="/community"
                  className="rounded-full bg-white px-5 py-4 text-center text-base font-semibold text-[#1e1b2e] transition hover:bg-[#f5f3ff]"
                >
                  View community hub
                </Link>

                <Link
                  href="/signup"
                  className="rounded-full border border-white/25 px-5 py-4 text-center text-base font-semibold text-white transition hover:bg-white/10"
                >
                  Create learner account
                </Link>

                <Link
                  href="/subscribe"
                  className="rounded-full border border-white/25 px-5 py-4 text-center text-base font-semibold text-white transition hover:bg-white/10"
                >
                  View membership options
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}