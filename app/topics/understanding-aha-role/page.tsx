"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ClipboardList,
  Download,
  ExternalLink,
  FileText,
  Lock,
  PlayCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const REFLECTION_QUESTIONS = [
  "What parts of the AHA role feel clear to you at the moment?",
  "What parts of the AHA role still feel confusing or uncomfortable?",
  "Who provides your direction, delegation or supervision in your current role?",
  "What is one situation where you have wondered, “Is this my role to do?”",
  "What would help you feel more confident working within your role boundaries?",
];

const TOPIC_INCLUDES = [
  "A general AHA professional development video",
  "Reflective practice questions",
  "A printable worksheet or prompt sheet",
  "A practical role clarity activity",
  "Next-step prompts for discussion with a supervising professional",
];

const SPECIALIST_PMI_AREAS = [
  "Developmental movement and play-based intervention",
  "Regulation, nervous system and sensory support",
  "Screen dependency and developmental readiness",
  "Reflexes, core strength, balance and coordination",
  "Practical child development strategies and resources",
];

export default function UnderstandingAhaRolePage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-6xl px-6 py-8 md:py-12">
        <div className="mb-6">
          <Link
            href="/subscribe"
            className="inline-flex items-center gap-2 rounded-full border border-[#e8e4de] bg-white px-4 py-2 text-sm font-semibold text-[#6b6880] transition hover:border-[#99f6e4] hover:bg-[#f0fdfa] hover:text-[#0f766e]"
          >
            <ArrowLeft size={15} />
            Back to AHA Reflective PD Options
          </Link>
        </div>

        {/* Hero */}
        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
                Foundation AHA Professional Development
              </p>

              <h1 className="mb-5 text-4xl font-bold leading-tight md:text-6xl">
                Understanding the AHA role and boundaries
              </h1>

              <p className="mb-6 max-w-3xl text-base leading-relaxed text-[#6b6880] md:text-lg">
                A reflective professional development topic for Allied Health
                Assistants, therapy assistants, students, managers and allied
                health professionals who want clearer language around role
                boundaries, delegation, direction and reflective practice.
              </p>

              <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
                <div className="mb-3 flex items-start gap-3">
                  <ShieldCheck
                    size={22}
                    className="mt-0.5 shrink-0 text-[#0f766e]"
                  />

                  <div>
                    <p className="mb-1 text-sm font-semibold text-[#0f766e]">
                      This is foundation-level AHA PD.
                    </p>

                    <p className="text-sm leading-relaxed text-[#3f5f5a]">
                      This topic is designed to support role clarity, reflection
                      and professional confidence. Deeper child development,
                      movement, regulation and play-based intervention training
                      sits separately within Robyn&apos;s Play Move Improve
                      specialist training pathway.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#video"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
                >
                  View topic structure
                  <PlayCircle size={16} />
                </a>

                <a
                  href="#pmi-pathway"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-6 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
                >
                  Deeper PMI training
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <Sparkles size={24} />
              </div>

              <h2 className="mb-3 text-2xl font-bold">
                AHA PD topic template
              </h2>

              <p className="mb-5 text-sm leading-relaxed text-[#3f5f5a]">
                This page is designed as a repeatable template for future AHA
                Professional Development topics without giving away Robyn&apos;s
                full specialist Play Move Improve course content.
              </p>

              <ul className="space-y-3 text-sm leading-relaxed text-[#3f5f5a]">
                {TOPIC_INCLUDES.map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0 text-[#0f766e]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Professional note */}
        <section className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-6 shadow-sm">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
            Important professional note
          </p>

          <p className="text-sm leading-relaxed text-[#3f5f5a]">
            This topic provides reflective professional development and
            reflective practice support. It does not replace the supervision,
            direction, delegation, clinical oversight or workplace
            responsibilities provided by the allied health professional,
            employer or service the AHA works under.
          </p>
        </section>

        {/* Content boundary */}
        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
                Protecting the learning pathway
              </p>

              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                This topic gives clarity, not the whole specialist method.
              </h2>

              <p className="text-base leading-relaxed text-[#6b6880]">
                The AHA Professional Development platform gives foundation
                support around reflective practice, role clarity and working
                well under direction. It is not designed to give away the full
                Play Move Improve specialist training framework.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
                <p className="mb-2 text-sm font-semibold text-[#0f766e]">
                  Included here
                </p>

                <p className="text-sm leading-relaxed text-[#3f5f5a]">
                  General AHA role clarity, boundaries, communication,
                  reflective practice and preparation prompts.
                </p>
              </div>

              <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
                <p className="mb-2 text-sm font-semibold text-[#1e1b2e]">
                  Kept within Play Move Improve
                </p>

                <p className="text-sm leading-relaxed text-[#6b6880]">
                  Robyn&apos;s deeper specialist content, frameworks,
                  developmental strategies, movement sequences, regulation
                  resources and premium intervention training.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Video placeholder */}
        <section
          id="video"
          className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10"
        >
          <div className="mb-6 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Step 1
            </p>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Watch the foundation video lesson
            </h2>

            <p className="text-base leading-relaxed text-[#6b6880]">
              Later, this section will contain an embedded unlisted YouTube
              video. This video should stay focused on foundation AHA
              professional development rather than detailed Play Move Improve
              specialist methods.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[#e8e4de] bg-[#1e1b2e]">
            <div className="flex aspect-video items-center justify-center p-8 text-center">
              <div>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white">
                  <PlayCircle size={34} />
                </div>

                <h3 className="mb-2 text-2xl font-bold text-white">
                  Foundation video coming soon
                </h3>

                <p className="mx-auto max-w-md text-sm leading-relaxed text-[#d9d7e5]">
                  Replace this placeholder with the embedded unlisted YouTube
                  video once the topic has been recorded.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-4">
            <p className="text-sm font-semibold text-[#1e1b2e]">
              Future embed note
            </p>

            <p className="mt-1 text-sm leading-relaxed text-[#6b6880]">
              When the video is ready, we can replace the placeholder with an
              iframe using your unlisted YouTube embed link.
            </p>
          </div>
        </section>

        {/* Printable resources */}
        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <div className="mb-6 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Step 2
            </p>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Download the foundation resources
            </h2>

            <p className="text-base leading-relaxed text-[#6b6880]">
              This section will hold the PDFs that sit beside the video lesson.
              Keep these focused on reflection, role clarity and communication
              rather than full PMI intervention content.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <FileText size={22} />
              </div>

              <h3 className="mb-2 text-lg font-bold">
                Role clarity worksheet
              </h3>

              <p className="mb-4 text-sm leading-relaxed text-[#6b6880]">
                A printable worksheet to help AHAs reflect on what is clear,
                unclear and worth discussing with their supervising
                professional.
              </p>

              <button
                type="button"
                disabled
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-[#e8e4de] px-4 py-2 text-sm font-semibold text-[#6b6880]"
              >
                <Lock size={14} />
                Coming soon
              </button>
            </article>

            <article className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <Download size={22} />
              </div>

              <h3 className="mb-2 text-lg font-bold">
                Boundaries checklist
              </h3>

              <p className="mb-4 text-sm leading-relaxed text-[#6b6880]">
                A practical checklist for noticing when a task may need
                clarification, direction or follow-up with a workplace
                supervisor.
              </p>

              <button
                type="button"
                disabled
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-[#e8e4de] px-4 py-2 text-sm font-semibold text-[#6b6880]"
              >
                <Lock size={14} />
                Coming soon
              </button>
            </article>

            <article className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <BookOpen size={22} />
              </div>

              <h3 className="mb-2 text-lg font-bold">Discussion prompts</h3>

              <p className="mb-4 text-sm leading-relaxed text-[#6b6880]">
                Prompts to support reflective conversations with a supervising
                therapist, employer, manager or placement supervisor.
              </p>

              <button
                type="button"
                disabled
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-[#e8e4de] px-4 py-2 text-sm font-semibold text-[#6b6880]"
              >
                <Lock size={14} />
                Coming soon
              </button>
            </article>
          </div>
        </section>

        {/* Reflection questions */}
        <section
          id="reflection"
          className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-8 shadow-sm md:p-10"
        >
          <div className="mb-6 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Step 3
            </p>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Complete the reflection questions
            </h2>

            <p className="text-base leading-relaxed text-[#3f5f5a]">
              These questions help turn the topic into reflective professional
              development instead of passive watching.
            </p>
          </div>

          <div className="space-y-3">
            {REFLECTION_QUESTIONS.map((question, index) => (
              <div
                key={question}
                className="flex gap-4 rounded-2xl border border-[#99f6e4] bg-white p-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0f766e] text-sm font-bold text-white">
                  {index + 1}
                </div>

                <p className="pt-1 text-sm font-semibold leading-relaxed text-[#1e1b2e]">
                  {question}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Embedded Netlify tool placeholder */}
        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <div className="mb-6 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Step 4
            </p>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Use the reflective practice tool
            </h2>

            <p className="text-base leading-relaxed text-[#6b6880]">
              This section will eventually embed a Netlify tool for the topic.
              The tool should support reflection and preparation, not replace
              workplace supervision or provide full intervention programming.
            </p>
          </div>

          <div className="rounded-3xl border border-dashed border-[#d8d3cb] bg-[#faf8f5] p-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <ClipboardList size={28} />
            </div>

            <h3 className="mb-2 text-2xl font-bold">
              Netlify reflection tool placeholder
            </h3>

            <p className="mx-auto mb-5 max-w-xl text-sm leading-relaxed text-[#6b6880]">
              Later we can embed a topic-specific Netlify tool here, such as a
              role clarity reflection form, decision-making prompt or session
              preparation tool.
            </p>

            <button
              type="button"
              disabled
              className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-[#e8e4de] px-5 py-3 text-sm font-semibold text-[#6b6880]"
            >
              <Lock size={15} />
              Tool coming soon
            </button>
          </div>
        </section>

        {/* PMI specialist pathway */}
        <section
          id="pmi-pathway"
          className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
                Deeper specialist training
              </p>

              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Looking for deeper movement, regulation or play-based learning?
              </h2>

              <p className="mb-5 text-base leading-relaxed text-[#6b6880]">
                Those topics sit within Robyn&apos;s Play Move Improve training
                pathway rather than inside this foundation AHA Professional
                Development topic.
              </p>

              <p className="text-base leading-relaxed text-[#6b6880]">
                This protects the difference between general AHA reflective PD
                and Robyn&apos;s specialist Play Move Improve content.
              </p>
            </div>

            <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-6">
              <p className="mb-4 text-sm font-semibold text-[#0f766e]">
                Play Move Improve specialist areas may include:
              </p>

              <ul className="mb-6 space-y-3 text-sm leading-relaxed text-[#3f5f5a]">
                {SPECIALIST_PMI_AREAS.map((area) => (
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
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Visit Play Move Improve
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </section>

        {/* Next steps */}
        <section className="rounded-3xl bg-[#1e1b2e] p-8 text-white shadow-sm md:p-12">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#99f6e4]">
                Next step
              </p>

              <h2 className="mb-5 text-3xl font-bold md:text-5xl">
                Want access when the AHA PD options open?
              </h2>

              <p className="text-base leading-relaxed text-[#d9d7e5] md:text-lg">
                Register interest in the AHA Professional Development options
                so you can hear when foundation topic videos, reflection tools
                and 1:1 reflective practice sessions become available.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
              <p className="mb-4 text-sm leading-relaxed text-[#d9d7e5]">
                Individual foundation topic videos may be available from $7–$19
                depending on length and included resources. Full 2026 AHA PD
                Library access will be $279 AUD for 12 months from the day of
                purchase.
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
        </section>
      </section>
    </main>
  );
}