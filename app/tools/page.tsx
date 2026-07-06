import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  ClipboardList,
  FileText,
  HelpCircle,
  Lock,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
} from "lucide-react";

const tools = [
  {
    title: "Clinic Session Feedback Tool",
    description:
      "Reflect after a clinic session, organise observations and prepare clearer feedback for the supervising professional.",
    icon: ClipboardList,
  },
  {
    title: "AHA Session Preparation Tool",
    description:
      "Clarify the session goal, materials, environment, safety considerations and what needs to be checked before starting.",
    icon: ClipboardCheck,
  },
  {
    title: "Supervisor Question Builder",
    description:
      "Turn uncertainty into respectful, clear questions to take back to the supervising allied health professional.",
    icon: HelpCircle,
  },
  {
    title: "AHA Role Boundary Reflection Tool",
    description:
      "Reflect on whether a task feels within your role, unclear or outside your role, and identify when to seek clarification.",
    icon: ShieldCheck,
  },
  {
    title: "Feedback to Therapist Tool",
    description:
      "Organise session feedback into clear professional language without stepping into clinical reasoning or interpretation.",
    icon: MessageSquareText,
  },
  {
    title: "Confidence and Clarification Tracker",
    description:
      "Track what you feel confident with, what keeps feeling unclear and what may need more professional development.",
    icon: UserRoundCheck,
  },
  {
    title: "Session Debrief Reflection Tool",
    description:
      "Reflect after a challenging session without blame, focusing on what happened, what helped and what needs discussion.",
    icon: FileText,
  },
  {
    title: "AHA Communication Reflection Tool",
    description:
      "Reflect on communication with clients, families, educators, team members and supervising professionals while staying within role.",
    icon: MessageSquareText,
  },
];

export default function ToolsComingSoonPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-start">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
                Coming soon for members
              </p>

              <h1 className="mb-5 text-4xl font-bold leading-tight md:text-6xl">
                AHA-specific tools are being built for the paid membership.
              </h1>

              <p className="mb-6 max-w-3xl text-base leading-relaxed text-[#6b6880] md:text-lg">
                The Foundation AHA PD Library will include practical reflective
                tools to help Allied Health Assistants prepare, reflect,
                communicate clearly and know when to seek clarification.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/subscribe"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
                >
                  View membership options
                  <ArrowRight size={15} />
                </Link>

                <Link
                  href="/join"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-6 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
                >
                  Join free community
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <Lock size={24} />
              </div>

              <h2 className="mb-3 text-2xl font-bold">
                Included in the paid library
              </h2>

              <p className="mb-4 text-sm leading-relaxed text-[#3f5f5a]">
                These tools are being designed as member resources, not free
                public tools. They will sit alongside foundation topic videos,
                reflection prompts and printable support resources.
              </p>

              <div className="rounded-2xl bg-white p-4">
                <p className="text-sm font-semibold text-[#0f766e]">
                  Planned access
                </p>

                <p className="mt-1 text-sm leading-relaxed text-[#6b6880]">
                  Foundation AHA PD Library members will receive access once the
                  first tool set is ready.
                </p>
              </div>
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
                These tools support reflective professional development. They do
                not replace workplace supervision, clinical supervision,
                delegation, direction, clinical oversight, workplace
                documentation, incident reporting or employer responsibilities.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <Sparkles size={22} />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#0f766e]">
                Planned member tools
              </p>
              <h2 className="text-2xl font-bold">
                Practical tools for everyday AHA reflection.
              </h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {tools.map((tool) => {
              const Icon = tool.icon;

              return (
                <article
                  key={tool.title}
                  className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                    <Icon size={23} />
                  </div>

                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#faf8f5] px-3 py-1 text-xs font-semibold text-[#6b6880]">
                    <Lock size={13} />
                    Member tool coming soon
                  </div>

                  <h3 className="mb-2 text-xl font-bold">{tool.title}</h3>

                  <p className="text-sm leading-relaxed text-[#6b6880]">
                    {tool.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl bg-[#1e1b2e] p-8 text-white shadow-sm md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.6fr] lg:items-center">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#99f6e4]">
                Build in progress
              </p>

              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Join the interest list to help shape what gets built first.
              </h2>

              <p className="max-w-2xl text-sm leading-relaxed text-[#d9d7e5] md:text-base">
                The first tools will be shaped around the support needs AHAs,
                managers and supervising professionals identify as most useful.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/subscribe"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Register interest
                <ArrowRight size={15} />
              </Link>

              <Link
                href="/reflective-practice"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#99f6e4] bg-transparent px-6 py-3 text-sm font-semibold text-[#99f6e4] transition hover:bg-[#2c2940]"
              >
                1:1 reflective practice
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}