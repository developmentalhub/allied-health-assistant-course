"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  ClipboardList,
  ExternalLink,
  FileText,
  MessageCircle,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
} from "lucide-react";

const FOUNDATION_TOPICS = [
  "Understanding the AHA role and boundaries",
  "Working under allied health direction",
  "Reflective practice and communication with therapists",
  "Preparing for sessions and asking better questions",
  "Knowing when to seek clarification",
  "Thriving Kids and what may change for support roles",
];

const PMI_SPECIALIST_AREAS = [
  "Developmental movement and play-based intervention",
  "Regulation, sensory and nervous system support",
  "Screen dependency and developmental readiness",
  "Reflexes, balance, coordination and core strength",
  "Detailed child development strategies and resources",
  "Play Move Improve specialist training and programs",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-14 text-center md:py-18">
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#0f766e]">
          AHA Professional Development
        </p>

        <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
          Foundation reflective professional development for Allied Health
          Assistants.
        </h1>

        <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-[#6b6880] md:text-xl">
          A warm place for AHAs and the people working alongside them to access
          foundation learning, reflective tools, role clarity support and
          optional 1:1 reflective practice.
        </p>

        <div className="mx-auto mb-8 max-w-3xl rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5 text-left">
          <div className="flex gap-3">
            <ShieldCheck
              size={22}
              className="mt-0.5 shrink-0 text-[#0f766e]"
            />
            <div>
              <p className="mb-1 text-sm font-semibold text-[#0f766e]">
                Clear content boundary
              </p>
              <p className="text-sm leading-relaxed text-[#3f5f5a]">
                This AHA platform focuses on foundation reflective PD. Robyn’s
                deeper movement, regulation, play and child development training
                remains within Play Move Improve.
              </p>
            </div>
          </div>
        </div>

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
            View AHA Reflective PD Options
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Offer pathways */}
      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Free community */}
          <div className="rounded-3xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <MessageCircle size={24} />
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
              Free front door
            </p>

            <h2 className="mb-4 text-2xl font-bold">Free AHA Community</h2>

            <p className="mb-6 text-base leading-relaxed text-[#6b6880]">
              Join quietly, browse the feed, introduce yourself if you want, and
              stay connected with others in the AHA space.
            </p>

            <ul className="mb-7 space-y-3 text-sm leading-relaxed text-[#6b6880]">
              <li className="flex gap-2">
                <Check size={17} className="mt-0.5 shrink-0 text-[#0f766e]" />
                Browse quietly without needing to post
              </li>
              <li className="flex gap-2">
                <Check size={17} className="mt-0.5 shrink-0 text-[#0f766e]" />
                Introduce yourself if you feel comfortable
              </li>
              <li className="flex gap-2">
                <Check size={17} className="mt-0.5 shrink-0 text-[#0f766e]" />
                Read updates and connect with others
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

          {/* PD library */}
          <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-7 shadow-sm md:p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
              <BookOpen size={24} />
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
              2026 foundation library
            </p>

            <h2 className="mb-4 text-2xl font-bold">
              Foundation AHA PD Library
            </h2>

            <p className="mb-6 text-base leading-relaxed text-[#3f5f5a]">
              A growing 2026 library of foundation AHA professional development
              videos, reflection prompts, printable PDFs and topic-based tools.
            </p>

            <div className="mb-6 rounded-2xl border border-[#99f6e4] bg-white p-4">
              <p className="text-sm font-semibold text-[#0f766e]">
                Full foundation library: $279 AUD
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[#6b6880]">
                12 months access from the day of purchase. Individual foundation
                topic videos may also be available from $7–$19 depending on
                length and included resources.
              </p>
            </div>

            <Link
              href="/subscribe"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
            >
              View library options
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Reflective practice */}
          <div className="rounded-3xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <UserRoundCheck size={24} />
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
              1:1 support
            </p>

            <h2 className="mb-4 text-2xl font-bold">1:1 Reflective Practice</h2>

            <p className="mb-6 text-base leading-relaxed text-[#6b6880]">
              Reflective, practical and personal sessions for AHAs, students,
              educators, team leaders or professionals wanting to reflect on
              practice, role clarity, communication, confidence or next steps.
            </p>

            <div className="mb-6 rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-4">
              <p className="text-sm font-semibold text-[#1e1b2e]">
                $193 AUD per session
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[#6b6880]">
                Reflection questions must be submitted first. Booking and
                payment details are only sent once the reflection has been
                reviewed.
              </p>
            </div>

            <Link
              href="/subscribe"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-6 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
            >
              Register interest
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Topic structure */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#0f766e]">
              Built for practical reflection
            </p>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Each foundation topic will combine video, reflection and practical
              prompts.
            </h2>

            <p className="text-base leading-relaxed text-[#6b6880]">
              The 2026 foundation library will be built around real AHA
              questions, with unlisted YouTube videos embedded into the site
              alongside printable reflection resources and simple tools.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <PlayCircle size={21} />
              </div>

              <h3 className="mb-2 text-lg font-bold">Embedded video lessons</h3>

              <p className="text-sm leading-relaxed text-[#6b6880]">
                Foundation topic videos hosted as unlisted YouTube videos and
                embedded inside the learning pages.
              </p>
            </div>

            <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <FileText size={21} />
              </div>

              <h3 className="mb-2 text-lg font-bold">Printable PDFs</h3>

              <p className="text-sm leading-relaxed text-[#6b6880]">
                Downloadable reflection prompts, checklists, summaries and
                discussion sheets for foundation AHA professional development.
              </p>
            </div>

            <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <ClipboardList size={21} />
              </div>

              <h3 className="mb-2 text-lg font-bold">Reflective tools</h3>

              <p className="text-sm leading-relaxed text-[#6b6880]">
                Embedded tools and reflection forms to help AHAs prepare,
                notice, think and apply learning thoughtfully.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content boundary */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-8 shadow-sm md:p-10">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#0f766e]">
              What belongs where
            </p>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Foundation AHA PD sits here. Deeper specialist training stays with
              Play Move Improve.
            </h2>

            <p className="text-base leading-relaxed text-[#3f5f5a]">
              This keeps the AHA platform useful and clear without giving away
              Robyn’s full Play Move Improve specialist frameworks, resources or
              course content.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-[#99f6e4] bg-white p-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
                Foundation AHA PD may include
              </p>

              <ul className="space-y-3 text-sm leading-relaxed text-[#6b6880]">
                {FOUNDATION_TOPICS.map((topic) => (
                  <li key={topic} className="flex gap-2">
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0 text-[#0f766e]"
                    />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-[#99f6e4] bg-white p-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
                Play Move Improve specialist pathway
              </p>

              <ul className="mb-6 space-y-3 text-sm leading-relaxed text-[#6b6880]">
                {PMI_SPECIALIST_AREAS.map((area) => (
                  <li key={area} className="flex gap-2">
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0 text-[#0f766e]"
                    />
                    {area}
                  </li>
                ))}
              </ul>

              <a
                href="https://www.playmoveimprove.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Visit Play Move Improve
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Reflective practice process */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-3xl bg-[#1e1b2e] p-8 text-white shadow-sm md:p-12">
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#99f6e4]">
                1:1 Reflective Practice
              </p>

              <h2 className="mb-6 text-3xl font-bold md:text-5xl">
                Prepared sessions, not rushed bookings.
              </h2>

              <p className="mb-6 text-base leading-relaxed text-[#d9d7e5] md:text-lg">
                Before someone can book a 1:1 reflective practice session, they
                will need to complete reflection questions first. This helps make
                the session purposeful, prepared and focused on the outcome they
                are hoping for.
              </p>

              <div className="space-y-3 text-sm leading-relaxed text-[#d9d7e5] md:text-base">
                <p>Step 1: Complete the reflection form.</p>
                <p>Step 2: Robyn or the team reviews the reflection.</p>
                <p>Step 3: If appropriate, booking and payment details are sent.</p>
                <p>Step 4: Attend the reflective practice session.</p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
              <p className="mb-3 text-lg font-semibold text-white">
                Who may offer sessions?
              </p>

              <p className="mb-5 text-sm leading-relaxed text-[#d9d7e5]">
                Sessions may be offered by Robyn as a Developmental Educator, or
                by an allied health professional such as an OT or Psych where
                appropriate.
              </p>

              <Link
                href="/subscribe"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-4 text-center text-base font-semibold text-[#1e1b2e] transition hover:bg-[#f5f3ff]"
              >
                Register interest
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Honest note */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-7">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
            Important professional note
          </p>

          <p className="text-sm leading-relaxed text-[#6b6880]">
            This platform provides reflective professional development and
            reflective practice support. It does not replace the supervision,
            direction, delegation, clinical oversight or workplace
            responsibilities provided by the allied health professional,
            employer or service the AHA works under.
          </p>
        </div>
      </section>
    </main>
  );
}