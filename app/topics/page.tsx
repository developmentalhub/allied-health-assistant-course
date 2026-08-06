"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  FileText,
  HeartHandshake,
  Lightbulb,
  MessageCircleHeart,
  PlayCircle,
  Sparkles,
} from "lucide-react";

const TOPICS = [
  {
    title: "Feel clearer about your AHA role",
    description:
      "Build confidence in your role, understand where guidance comes from and recognise when it is time to pause and ask.",
    href: "/topics/understanding-aha-role",
    tag: "Role confidence",
  },
  {
    title: "Working well with supervising professionals",
    description:
      "Strengthen communication, understand direction and build a supportive working relationship with the professionals guiding your work.",
    href: "/topics/working-under-allied-health-direction",
    tag: "Teamwork",
  },
  {
    title: "Reflective practice and communication",
    description:
      "Reflect without judgement, organise what you noticed and communicate more clearly after sessions.",
    href: "/topics/reflective-practice-and-communication",
    tag: "Reflection",
  },
  {
    title: "Preparing for sessions and asking better questions",
    description:
      "Feel more prepared before sessions and develop useful questions when the plan, purpose or next step feels unclear.",
    href: "/topics/preparing-for-sessions-and-asking-better-questions",
    tag: "Preparation",
  },
  {
    title: "Knowing when to ask for clarification",
    description:
      "Recognise when you have enough information to continue and when you need clearer direction or workplace support.",
    href: "/topics/knowing-when-to-seek-clarification",
    tag: "Confidence",
  },
  {
    title: "Thriving Kids and changing support roles",
    description:
      "Reflect on changing expectations, service pathways and the important contribution AHAs make within evolving teams.",
    href: "/topics/thriving-kids-and-changing-support-roles",
    tag: "Workforce change",
  },
];

const PRACTICAL_THEMES = [
  {
    title: "Simple activity ideas",
    text: "Use everyday equipment such as masking tape, cups, balls and paper to create engaging session activities.",
    icon: Lightbulb,
  },
  {
    title: "When Plan A does not work",
    text: "Explore compassionate ways to change the activity, pace, instructions or environment.",
    icon: Sparkles,
  },
  {
    title: "Clearer conversations",
    text: "Prepare useful observations and questions for supervising allied health professionals.",
    icon: MessageCircleHeart,
  },
  {
    title: "Reflection without judgement",
    text: "Use difficult moments as opportunities to learn, ask for support and build confidence.",
    icon: HeartHandshake,
  },
];

export default function TopicsPage() {
  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#1e1b2e]">
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 md:py-16">
        <section className="mb-8 overflow-hidden rounded-4xl border border-[#f4d9a6] bg-white shadow-sm">
          <div className="grid gap-9 bg-linear-to-br from-[#fff7df] via-white to-[#f0fdfa] p-7 md:p-12 lg:grid-cols-[1fr_0.72fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
                Allied Health Hive | Workforce Development
              </p>

              <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
                Practical learning that helps AHAs feel more confident and supported.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#5f5b73]">
                Explore topics designed around real AHA experiences, including
                preparing for sessions, communicating clearly, reflecting after
                difficult moments and knowing when to ask for guidance.
              </p>

              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#5f5b73]">
                You are not expected to know everything. These topics are here to
                help you learn, reflect and feel clearer about your next step.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#topic-library"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
                >
                  Explore the topics
                  <ArrowRight size={18} />
                </a>

                <Link
                  href="/tools"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0f766e] bg-white px-7 py-4 text-base font-semibold text-[#0f766e] transition hover:bg-[#f0fdfa]"
                >
                  Use practical tools
                  <ClipboardList size={18} />
                </Link>
              </div>
            </div>

            <aside className="rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-6 md:p-8">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <BookOpen size={27} />
              </div>

              <h2 className="mb-4 text-2xl font-bold">
                Learning that connects with real work
              </h2>

              <div className="grid gap-3">
                <CheckItem text="Short topic previews you can explore now" />
                <CheckItem text="Practical reflection questions" />
                <CheckItem text="Preparation and communication prompts" />
                <CheckItem text="Supportive language for asking questions" />
                <CheckItem text="More practical resources as the Hive grows" />
              </div>
            </aside>
          </div>
        </section>

        <section className="mb-8 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-10">
          <div className="mb-8 max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#f0fdfa] px-4 py-2 text-sm font-semibold text-[#0f766e]">
              <Sparkles size={16} />
              Practical learning themes
            </div>

            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              Learning should help in your next session, not just give you more to read.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#6b6880] md:text-lg">
              The Allied Health Hive combines professional reflection with
              practical ideas AHAs can use in real workplace settings.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {PRACTICAL_THEMES.map((theme) => {
              const Icon = theme.icon;

              return (
                <article
                  key={theme.title}
                  className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0f766e]">
                    <Icon size={23} />
                  </div>

                  <h3 className="mb-3 text-xl font-bold">{theme.title}</h3>

                  <p className="text-sm leading-relaxed text-[#6b6880]">
                    {theme.text}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section
          id="topic-library"
          className="mb-8 scroll-mt-24 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-10"
        >
          <div className="mb-8 max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Topic library
            </p>

            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              Choose the topic that feels most useful right now.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#6b6880]">
              Start anywhere. You do not need to complete the topics in order.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TOPICS.map((topic) => (
              <article
                key={topic.title}
                className="flex flex-col rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6"
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                    <PlayCircle size={23} />
                  </div>

                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0f766e]">
                    {topic.tag}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-bold leading-tight">
                  {topic.title}
                </h3>

                <p className="mb-6 flex-1 text-sm leading-relaxed text-[#6b6880]">
                  {topic.description}
                </p>

                <Link
                  href={topic.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
                >
                  Explore this topic
                  <ArrowRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-7 shadow-sm md:p-10">
          <div className="mb-7 max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              How each topic supports learning
            </p>

            <h2 className="text-3xl font-bold leading-tight md:text-4xl">
              Watch, reflect and use what feels relevant.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <LearningCard
              icon={<PlayCircle size={24} />}
              title="Explore"
              text="Read or watch a short topic lesson connected to real AHA experiences."
            />

            <LearningCard
              icon={<FileText size={24} />}
              title="Reflect"
              text="Consider what the topic means for your role, workplace and current confidence."
            />

            <LearningCard
              icon={<ClipboardList size={24} />}
              title="Use"
              text="Take practical prompts, questions or tools into your next workplace conversation."
            />
          </div>
        </section>

        <section className="mb-8 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-10">
          <div className="grid gap-7 md:grid-cols-[auto_1fr] md:items-start">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <HeartHandshake size={27} />
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Professional support
              </p>

              <h2 className="text-3xl font-bold">
                Reflection is part of learning, not a sign that you have failed.
              </h2>

              <p className="mt-4 max-w-4xl text-base leading-relaxed text-[#6b6880]">
                These topics support workforce development and reflective
                learning. They do not replace workplace supervision, clinical
                supervision, delegation, direction, incident reporting or
                employer responsibilities.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-4xl bg-[#1e1b2e] p-8 text-white shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.58fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#99f6e4]">
                Keep learning with the Hive
              </p>

              <h2 className="text-3xl font-bold leading-tight md:text-5xl">
                Practical ideas, supportive conversations and tools you can return to.
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#d9d7e5] md:text-lg">
                Join the community, use the practical tools or attend a live
                webinar when you are ready.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
              <Link
                href="/community"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Visit the AHA community
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/webinars"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-4 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Explore webinars
                <ArrowRight size={16} />
              </Link>

              <a
                href="https://www.playmoveimprove.com"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-4 text-base font-semibold text-white transition hover:bg-white/10"
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

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3">
      <CheckCircle2
        size={18}
        className="mt-0.5 shrink-0 text-[#0f766e]"
      />

      <p className="text-sm leading-relaxed text-[#3f5f5a]">{text}</p>
    </div>
  );
}

function LearningCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-[#99f6e4] bg-white p-6">
      <div className="mb-4 text-[#0f766e]">{icon}</div>

      <h3 className="mb-2 text-xl font-bold">{title}</h3>

      <p className="text-sm leading-relaxed text-[#6b6880]">{text}</p>
    </article>
  );
}