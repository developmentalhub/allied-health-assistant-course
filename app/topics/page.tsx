"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  ClipboardList,
  ExternalLink,
  FileText,
  Lock,
  MessageCircle,
  PlayCircle,
  ShieldCheck,
} from "lucide-react";

const TOPICS = [
  {
    title: "Understanding the AHA role and boundaries",
    description:
      "Foundation reflective PD around role clarity, delegation, direction and knowing when to ask for clarification.",
    href: "/topics/understanding-aha-role",
    status: "Preview available",
    available: true,
  },
  {
    title: "Working under allied health direction",
    description:
      "Reflect on how AHAs work under therapist direction, communicate clearly and stay within role expectations.",
    href: "/topics/working-under-allied-health-direction",
    status: "Preview available",
    available: true,
  },
  {
  title: "Reflective practice and communication",
  description:
    "Build confidence with reflection, observation language, questions for therapists and professional communication.",
  href: "/topics/reflective-practice-and-communication",
  status: "Preview available",
  available: true,
},
  {
  title: "Preparing for sessions and asking better questions",
  description:
    "Learn how to prepare for sessions, identify what feels unclear and ask better questions before and after support activities.",
  href: "/topics/preparing-for-sessions-and-asking-better-questions",
  status: "Preview available",
  available: true,
},
  {
    title: "Knowing when to seek clarification",
    description:
      "Reflect on situations where an AHA may need further direction, clearer instructions or workplace support.",
    href: "#",
    status: "Coming soon",
    available: false,
  },
  {
    title: "Thriving Kids and changing support roles",
    description:
      "A foundation update space for reflecting on how changes in the support landscape may affect AHA roles.",
    href: "#",
    status: "Coming soon",
    available: false,
  },
];

const PAGE_FEATURES = [
  "Foundation AHA professional development videos",
  "Reflection questions and preparation prompts",
  "Printable worksheets and discussion tools",
  "Embedded Netlify reflection tools where relevant",
];

export default function TopicsPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
                Foundation AHA PD Topics
              </p>

              <h1 className="mb-5 text-4xl font-bold leading-tight md:text-6xl">
                Topic-based reflective professional development for AHAs.
              </h1>

              <p className="mb-6 max-w-3xl text-base leading-relaxed text-[#6b6880] md:text-lg">
                This is where foundation AHA Professional Development topics
                will live. Each topic is designed to support role clarity,
                reflection, preparation and professional confidence without
                replacing workplace supervision.
              </p>

              <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
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
                      These foundation topics focus on reflective AHA
                      professional development. Robyn&apos;s deeper specialist
                      Play Move Improve training remains separate on
                      playmoveimprove.com.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/subscribe"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
                >
                  Register interest
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/join"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-6 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
                >
                  Join free community
                  <MessageCircle size={16} />
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <BookOpen size={24} />
              </div>

              <h2 className="mb-3 text-2xl font-bold">
                2026 Foundation AHA PD Library
              </h2>

              <p className="mb-5 text-sm leading-relaxed text-[#3f5f5a]">
                The full foundation library will be $279 AUD for 12 months
                access from the day of purchase. Individual topic videos may be
                available from $7–$19 depending on length and included
                resources.
              </p>

              <ul className="space-y-3 text-sm leading-relaxed text-[#3f5f5a]">
                {PAGE_FEATURES.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0 text-[#0f766e]"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Topic library
            </p>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Start with role clarity, then build reflective confidence.
            </h2>

            <p className="text-base leading-relaxed text-[#6b6880]">
              These topics may shift as the community grows, but the early focus
              is foundation AHA practice: role boundaries, working under
              direction, communication and reflection.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TOPICS.map((topic) => (
              <article
                key={topic.title}
                className="flex flex-col rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                    {topic.available ? (
                      <PlayCircle size={22} />
                    ) : (
                      <Lock size={21} />
                    )}
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      topic.available
                        ? "bg-[#f0fdfa] text-[#0f766e]"
                        : "bg-[#e8e4de] text-[#6b6880]"
                    }`}
                  >
                    {topic.status}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-bold">{topic.title}</h3>

                <p className="mb-5 flex-1 text-sm leading-relaxed text-[#6b6880]">
                  {topic.description}
                </p>

                {topic.available ? (
                  <Link
                    href={topic.href}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
                  >
                    View topic preview
                    <ArrowRight size={15} />
                  </Link>
                ) : (
                  <Link
                    href="/subscribe"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-5 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
                  >
                    Register interest
                    <ArrowRight size={15} />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-8 shadow-sm md:p-10">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Topic page format
            </p>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Each topic will be structured for reflection, not passive watching.
            </h2>

            <p className="text-base leading-relaxed text-[#3f5f5a]">
              The goal is for AHAs to think about their own role, context and
              next steps, not just watch a video and move on.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-[#99f6e4] bg-white p-5">
              <PlayCircle className="mb-3 text-[#0f766e]" size={24} />
              <h3 className="mb-2 font-bold">Video</h3>
              <p className="text-sm leading-relaxed text-[#6b6880]">
                Embedded unlisted YouTube foundation lessons.
              </p>
            </div>

            <div className="rounded-3xl border border-[#99f6e4] bg-white p-5">
              <FileText className="mb-3 text-[#0f766e]" size={24} />
              <h3 className="mb-2 font-bold">PDFs</h3>
              <p className="text-sm leading-relaxed text-[#6b6880]">
                Reflection sheets, checklists and discussion prompts.
              </p>
            </div>

            <div className="rounded-3xl border border-[#99f6e4] bg-white p-5">
              <ClipboardList className="mb-3 text-[#0f766e]" size={24} />
              <h3 className="mb-2 font-bold">Tools</h3>
              <p className="text-sm leading-relaxed text-[#6b6880]">
                Embedded Netlify tools for reflection and preparation.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-[#1e1b2e] p-8 text-white shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#99f6e4]">
                Deeper specialist training
              </p>

              <h2 className="mb-5 text-3xl font-bold md:text-5xl">
                Looking for movement, regulation or play-based intervention?
              </h2>

              <p className="text-base leading-relaxed text-[#d9d7e5] md:text-lg">
                Deeper specialist content sits within Robyn&apos;s Play Move
                Improve pathway. This keeps the AHA PD platform focused on
                foundation reflective practice while protecting Robyn&apos;s
                specialist training and resources.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
              <p className="mb-4 text-sm leading-relaxed text-[#d9d7e5]">
                Once the Allied Health page is finished, we can build a specific
                Play Move Improve landing page for deeper specialist
                professional development.
              </p>

              <a
                href="https://www.playmoveimprove.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-4 text-center text-base font-semibold text-[#1e1b2e] transition hover:bg-[#f5f3ff]"
              >
                Visit Play Move Improve
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}