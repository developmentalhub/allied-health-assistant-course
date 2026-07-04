"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  GraduationCap,
  MessageCircle,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-14 text-center md:py-18">
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#0f766e]">
          AHA Learning Community
        </p>

        <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
          A free community now, with deeper paid AHA support coming soon.
        </h1>

        <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-[#6b6880] md:text-xl">
          A warm place for Allied Health Assistants and the people working
          alongside them to connect, learn, ask questions and get ready for the
          changing support landscape.
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/join"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
          >
            Join the free community
            <MessageCircle size={18} />
          </Link>

          <Link
            href="/subscribe"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-7 py-4 text-base font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
          >
            Join paid waitlist
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Two pathways */}
      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <MessageCircle size={24} />
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
              Free community open now
            </p>

            <h2 className="mb-4 text-3xl font-bold">
              Join the free AHA community
            </h2>

            <p className="mb-6 text-base leading-relaxed text-[#6b6880]">
              Introduce yourself, see who else is here, and post in the live
              community feed. A warm place to connect with other AHAs, students,
              educators, therapists and people working alongside children.
            </p>

            <ul className="mb-7 space-y-3 text-sm leading-relaxed text-[#6b6880]">
              <li className="flex gap-2">
                <Check size={17} className="mt-0.5 shrink-0 text-[#0f766e]" />
                Introduce yourself to the community
              </li>
              <li className="flex gap-2">
                <Check size={17} className="mt-0.5 shrink-0 text-[#0f766e]" />
                See who else is here
              </li>
              <li className="flex gap-2">
                <Check size={17} className="mt-0.5 shrink-0 text-[#0f766e]" />
                Ask questions and share small wins
              </li>
            </ul>

            <Link
              href="/join"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
            >
              Join free community
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-7 shadow-sm md:p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
              <Sparkles size={24} />
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
              Paid members space coming soon
            </p>

            <h2 className="mb-4 text-3xl font-bold">
              Go deeper with paid AHA support
            </h2>

            <p className="mb-6 text-base leading-relaxed text-[#3f5f5a]">
              Monthly live coaching, the onboarding webinar, recorded sessions,
              practical resources, Thriving Kids updates, a private members feed
              and priority question support.
            </p>

            <div className="mb-6 rounded-2xl border border-[#99f6e4] bg-white p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
                <Star size={15} />
                Founding member offer
              </div>

              <p className="text-sm leading-relaxed text-[#6b6880]">
                Early members will be able to lock in $19/month AUD or $190/year
                AUD before the price rises to $29/month.
              </p>
            </div>

            <Link
              href="/subscribe"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
            >
              Join the waitlist
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why this exists */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#0f766e]">
                Why this community exists
              </p>

              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                AHAs need more than a course page.
              </h2>

              <p className="text-base leading-relaxed text-[#6b6880]">
                Many AHAs are stepping into complex support roles with children,
                therapists, educators and families, but they do not always have a
                clear place to ask questions, build confidence or understand how
                the role fits into the bigger picture.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                  <Users size={21} />
                </div>

                <h3 className="mb-2 text-lg font-bold">
                  Connection first
                </h3>

                <p className="text-sm leading-relaxed text-[#6b6880]">
                  The free community helps people find each other and feel less
                  alone in the AHA space.
                </p>
              </div>

              <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                  <GraduationCap size={21} />
                </div>

                <h3 className="mb-2 text-lg font-bold">
                  Practical learning next
                </h3>

                <p className="text-sm leading-relaxed text-[#6b6880]">
                  The paid space will provide deeper professional development,
                  resources and coaching support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Paid support preview */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-3xl bg-[#1e1b2e] p-8 text-white shadow-sm md:p-12">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#99f6e4]">
                Paid members space
              </p>

              <h2 className="mb-6 text-3xl font-bold md:text-5xl">
                Built around real AHA questions.
              </h2>

              <div className="space-y-4 text-base leading-relaxed text-[#d9d7e5] md:text-lg">
                <p>Monthly live Zoom coaching.</p>
                <p>AHA onboarding webinar included.</p>
                <p>Recorded sessions and practical resource library.</p>
                <p>Thriving Kids reform updates and what they may mean.</p>
                <p>Private members-only feed and priority question support.</p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
              <p className="mb-3 text-lg font-semibold text-white">
                Founding member waitlist
              </p>

              <p className="mb-5 text-sm leading-relaxed text-[#d9d7e5]">
                Join the waitlist now and share what you most want support with.
                Your answers will help shape the first live sessions and
                resources.
              </p>

              <div className="mb-5 rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-sm font-semibold text-[#99f6e4]">
                  $19/month AUD founding rate
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#d9d7e5]">
                  Or $190/year AUD. Later price planned at $29/month.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href="/subscribe"
                  className="rounded-full bg-white px-5 py-4 text-center text-base font-semibold text-[#1e1b2e] transition hover:bg-[#f5f3ff]"
                >
                  Join paid waitlist
                </Link>

                <Link
                  href="/join"
                  className="rounded-full border border-white/25 px-5 py-4 text-center text-base font-semibold text-white transition hover:bg-white/10"
                >
                  Join free community first
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Honest note */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-7">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
            Honest note
          </p>

          <p className="text-sm leading-relaxed text-[#6b6880]">
            The paid members space will provide professional development,
            coaching, resources and community support. It is not an official
            certification pathway, and joining does not guarantee employment,
            contract work or referrals.
          </p>
        </div>
      </section>
    </main>
  );
}