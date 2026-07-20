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
  Repeat,
  ShieldCheck,
  Sparkles,
  Video,
} from "lucide-react";

const TOPICS = [
  {
    title: "Simple activities and games",
    description:
      "Practical ways to motivate children in therapy sessions using simple play, movement and connection.",
    href: "/topics/simple-activities-and-games",
    status: "Preview coming soon",
    available: false,
  },
  {
    title: "Therapy sessions on a budget",
    description:
      "Plan flexible sessions with socks, scrap paper, rice, masking tape, beach balls and everyday clinic resources.",
    href: "/topics/therapy-sessions-on-a-budget",
    status: "Preview coming soon",
    available: false,
  },
  {
    title: "When Plan A does not work",
    description:
      "Build a toolkit of ideas so you can adapt with confidence when a child needs something different.",
    href: "/topics/when-plan-a-does-not-work",
    status: "Preview coming soon",
    available: false,
  },
  {
    title: "Supporting children with autism",
    description:
      "Think about the environment, your body position and the way you set children up to feel safe and supported.",
    href: "/topics/supporting-children-with-autism",
    status: "Preview coming soon",
    available: false,
  },
];

const TOOL_PREVIEWS = [
  {
    title: "Session idea builder",
    description:
      "A guided tool to help you turn a simple resource into a therapy activity idea.",
    preview:
      "Preview example: choose a resource such as masking tape, socks or scrap paper, then reflect on how it could support movement, attention, communication or play.",
  },
  {
    title: "Plan B reflection tool",
    description:
      "A reflective tool for moments when the child does not respond to your original plan.",
    preview:
      "Preview example: what did the child show you, what changed in the environment, and what could you try next?",
  },
  {
    title: "Environment setup checklist",
    description:
      "A practical prompt tool for thinking about space, positioning, sensory load and engagement.",
    preview:
      "Preview example: where are you sitting, what can the child see, what is distracting, and how can the setup feel safer?",
  },
];

const PLANNED_FEATURES = [
  "Free launch webinar first",
  "Topic previews as the pathway grows",
  "PDF handouts and reflection prompts when released",
  "Reusable tools shaped by AHA feedback",
  "Resources that can be used across different sessions",
  "More content added as the platform develops",
];

export default function TopicsPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <section className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Built with AHAs, for AHAs
          </p>

          <p className="mt-2 text-base leading-relaxed text-[#3f5f5a]">
            Robyn and Jess are building this platform from scratch with feedback
            from AHAs, managers and clinics. More tools, previews, videos and
            resources are coming soon.
          </p>
        </section>

        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
                AHA topic pathway
              </p>

              <h1 className="mb-5 text-4xl font-bold leading-tight md:text-6xl">
                Practical topics, tools and reflective resources are being built.
              </h1>

              <p className="mb-6 max-w-3xl text-base leading-relaxed text-[#6b6880] md:text-lg">
                These topic pathways are being created to help AHAs feel
                inspired, prepared and supported in real therapy sessions. The
                first step is the free launch webinar, then more topic previews,
                tools and resources will be added as the platform grows.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/subscribe"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
                >
                  Register for the free webinar
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
                Topic pathway coming soon
              </h2>

              <p className="mb-5 text-sm leading-relaxed text-[#3f5f5a]">
                The topic pathway is not being opened as monthly access right
                now. The first priority is the free launch webinar, listening to
                AHAs and building the most useful resources first.
              </p>

              <ul className="space-y-3 text-sm leading-relaxed text-[#3f5f5a]">
                {PLANNED_FEATURES.map((feature) => (
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

        <section className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-6 shadow-sm">
          <div className="flex gap-3">
            <ShieldCheck
              size={22}
              className="mt-0.5 shrink-0 text-[#0f766e]"
            />

            <div>
              <p className="mb-1 text-sm font-semibold text-[#0f766e]">
                Professional boundary
              </p>

              <p className="text-sm leading-relaxed text-[#3f5f5a]">
                Topic resources support reflective professional development.
                They do not replace workplace supervision, clinical supervision,
                delegation, clinical oversight, workplace documentation,
                incident reporting or employer responsibilities.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Tool previews
            </p>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              See the kind of support being built.
            </h2>

            <p className="text-base leading-relaxed text-[#6b6880]">
              These previews show the purpose of each tool. The full interactive
              versions and downloadable resources will be released when the
              pathway is ready.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {TOOL_PREVIEWS.map((tool) => (
              <article
                key={tool.title}
                className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                  <ClipboardList size={22} />
                </div>

                <h3 className="mb-3 text-xl font-bold">{tool.title}</h3>

                <p className="mb-4 text-sm leading-relaxed text-[#6b6880]">
                  {tool.description}
                </p>

                <div className="rounded-2xl border border-[#99f6e4] bg-white p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                    Preview only
                  </p>

                  <p className="text-sm leading-relaxed text-[#6b6880]">
                    {tool.preview}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
                  <Sparkles size={15} />
                  Full tool pathway coming soon
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Planned topic themes
            </p>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Topic previews will connect with real AHA questions.
            </h2>

            <p className="text-base leading-relaxed text-[#6b6880]">
              Each topic is being shaped around practical support for real
              therapy sessions. Tools and resources will grow alongside future
              webinars and feedback from AHAs.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
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
                      <Video size={21} />
                    )}
                  </div>

                  <span className="rounded-full bg-[#f0fdfa] px-3 py-1 text-xs font-semibold text-[#0f766e]">
                    {topic.status}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-bold">{topic.title}</h3>

                <p className="mb-5 flex-1 text-sm leading-relaxed text-[#6b6880]">
                  {topic.description}
                </p>

                <Link
                  href="/subscribe"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
                >
                  Start with free webinar
                  <ArrowRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-8 shadow-sm md:p-10">
          <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-start">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0f766e] text-white">
              <Repeat size={26} />
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
                Use more than once
              </p>

              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                These are not one-time worksheets.
              </h2>

              <p className="max-w-3xl text-base leading-relaxed text-[#3f5f5a]">
                The planned tools are designed to be used repeatedly. An AHA
                might use the same tool before a tricky session, after a session
                that did not go to plan, when preparing questions for a
                therapist, or when reflecting on how to support a different
                child.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Planned pathway
            </p>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              A simple support pathway for each topic.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
              <PlayCircle className="mb-3 text-[#0f766e]" size={24} />

              <h3 className="mb-2 font-bold">Watch</h3>

              <p className="text-sm leading-relaxed text-[#6b6880]">
                Free launch webinar first, then future topic videos or live
                sessions as the pathway grows.
              </p>
            </div>

            <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
              <FileText className="mb-3 text-[#0f766e]" size={24} />

              <h3 className="mb-2 font-bold">Download</h3>

              <p className="text-sm leading-relaxed text-[#6b6880]">
                PDF resources, reflection prompts and session support sheets
                when they are released.
              </p>
            </div>

            <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
              <ClipboardList className="mb-3 text-[#0f766e]" size={24} />

              <h3 className="mb-2 font-bold">Use the tool</h3>

              <p className="text-sm leading-relaxed text-[#6b6880]">
                Interactive tools or resource prompts where they genuinely
                support the topic.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-[#1e1b2e] p-8 text-white shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#99f6e4]">
                AHA Professional Development
              </p>

              <h2 className="mb-5 text-3xl font-bold md:text-5xl">
                Start with the free webinar, then help shape what comes next.
              </h2>

              <p className="text-base leading-relaxed text-[#d9d7e5] md:text-lg">
                The topic pathway will grow around the questions AHAs and
                managers actually bring. The first step is listening, answering
                real questions and building the most useful resources first.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
              <div className="mb-5 flex items-start gap-3">
                <Sparkles className="mt-1 shrink-0 text-[#99f6e4]" size={22} />

                <p className="text-sm leading-relaxed text-[#d9d7e5]">
                  More tools and resources will be added as we learn what AHAs
                  need most from the hive.
                </p>
              </div>

              <Link
                href="/subscribe"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-4 text-center text-base font-semibold text-[#1e1b2e] transition hover:bg-[#f5f3ff]"
              >
                Register for the free webinar
                <ArrowRight size={16} />
              </Link>

              <a
                href="https://www.playmoveimprove.com"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-4 text-center text-base font-semibold text-white transition hover:bg-white/10"
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