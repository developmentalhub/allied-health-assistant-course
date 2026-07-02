import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About the Allied Health & Educator Resource Academy by Play Move Improve.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-5xl px-6 py-16 text-center md:py-24">
        <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
          About the academy
        </p>

        <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
          Practical support for the people doing the work with children every
          day
        </h1>

        <p className="mx-auto max-w-3xl text-xl leading-relaxed text-[#5f5b73]">
          The Allied Health & Educator Resource Academy is a Play Move Improve
          platform for allied health assistants, educators and support teams who
          want practical, grounded, movement-based resources they can use in
          real settings.
        </p>
      </section>

      <section className="bg-white border-y border-[#e8e4de]">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 md:grid-cols-3 md:py-20">
          <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-7">
            <h2 className="mb-4 text-2xl font-bold">
              Allied Health pathway
            </h2>
            <p className="text-lg leading-relaxed text-[#5f5b73]">
              A growing learning pathway for allied health assistants who need
              support with role clarity, safe implementation, communication,
              observation and everyday confidence.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-7">
            <h2 className="mb-4 text-2xl font-bold">
              Educator pathway
            </h2>
            <p className="text-lg leading-relaxed text-[#5f5b73]">
              A practical resource area for educators and teams supporting
              movement, regulation, play, participation and connection in early
              childhood and school-age settings.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-7">
            <h2 className="mb-4 text-2xl font-bold">
              Community and live support
            </h2>
            <p className="text-lg leading-relaxed text-[#5f5b73]">
              A future home for member discussion, monthly live sessions,
              recordings and shared resources as the academy grows.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-14 md:py-20">
        <div className="rounded-3xl bg-[#1e1b2e] p-8 text-white md:p-12">
          <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#99f6e4]">
            Created by Play Move Improve
          </p>

          <h2 className="mb-6 text-3xl font-bold leading-tight md:text-5xl">
            Built from real-world work across movement, development, regulation
            and play
          </h2>

          <div className="space-y-5 text-lg leading-relaxed text-slate-300">
            <p>
              Play Move Improve works across early childhood, education, allied
              health and community settings, with a focus on helping adults
              understand what children’s bodies and nervous systems may be
              communicating through behaviour, movement and participation.
            </p>

            <p>
              The academy is being built to make that knowledge easier to
              access, easier to apply, and easier to return to when teams need
              practical next steps.
            </p>
          </div>

          <div className="mt-8">
            <p className="text-xl font-bold text-white">
              Robyn Papworth
            </p>
            <p className="mt-2 text-base leading-relaxed text-slate-300">
              Founder, Play Move Improve
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[#e8e4de]">
        <div className="mx-auto max-w-5xl px-6 py-14 text-center md:py-20">
          <h2 className="mb-5 text-3xl font-bold md:text-5xl">
            The academy is still being built
          </h2>

          <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-[#5f5b73]">
            Some areas are live now, and others will be opened as the course
            structure, community space and resource library are developed.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/allied-health/foundations/welcome-to-aha-role"
              className="rounded-full bg-[#0f766e] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
            >
              Start the Allied Health pathway
            </Link>

            <Link
              href="/waitlist"
              className="rounded-full border border-[#0f766e] bg-white px-6 py-4 text-base font-semibold text-[#0f766e] transition hover:bg-[#f0fdfa]"
            >
              Join the waitlist
            </Link>

            <Link
              href="/community"
              className="rounded-full border border-[#e8e4de] bg-[#faf8f5] px-6 py-4 text-base font-semibold text-[#1e1b2e] transition hover:border-[#0f766e]"
            >
              View community hub
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}