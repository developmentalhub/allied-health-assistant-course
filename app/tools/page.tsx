import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  FileText,
  HelpCircle,
  MessageSquareText,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  Video,
} from "lucide-react";
import EmbeddedFreeTools from "@/components/EmbeddedFreeTools";

export const metadata: Metadata = {
  title: "AHA Tools",
  description:
    "Practical tools for Allied Health Assistants to support preparation, reflection, communication and role clarity.",
};

const toolsInProgress = [
  {
    title: "Supervisor Question Builder",
    description:
      "Turn uncertainty into respectful, clear questions to take back to the supervising allied health professional.",
    icon: HelpCircle,
  },
  {
    title: "AHA Role Boundary Reflection Tool",
    description:
      "Reflect on whether a task feels within your role, feels unclear or needs clarification from the supervising professional.",
    icon: ShieldCheck,
  },
  {
    title: "Feedback to Therapist Tool",
    description:
      "Organise session observations into clear professional feedback without stepping into clinical interpretation.",
    icon: MessageSquareText,
  },
  {
    title: "Confidence and Clarification Tracker",
    description:
      "Track what feels comfortable, what remains unclear and what may need further support or professional development.",
    icon: UserRoundCheck,
  },
  {
    title: "Session Debrief Reflection Tool",
    description:
      "Reflect after a challenging session by considering what happened, what helped and what needs further discussion.",
    icon: FileText,
  },
  {
    title: "AHA Communication Reflection Tool",
    description:
      "Reflect on communication with clients, families, educators, team members and supervising professionals.",
    icon: MessageSquareText,
  },
];

const toolBenefits = [
  "Open and use the free tools directly on this page",
  "Return to the tools across different sessions",
  "Prepare clearer questions for supervising professionals",
  "Organise observations and session feedback",
  "Reflect without replacing workplace or clinical supervision",
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 md:py-16">
        <section className="mb-7 overflow-hidden rounded-4xl bg-[#1e1b2e] text-white shadow-sm">
          <div className="grid gap-8 px-7 py-10 md:px-12 md:py-14 lg:grid-cols-[1fr_0.55fr] lg:items-center">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#99f6e4]">
                Practical AHA tools
              </p>

              <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
                Tools to help you prepare, reflect and communicate clearly.
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#d9d7e5] md:text-lg">
                Use the free AHA tools below without leaving this page. They are
                designed to support session preparation, professional reflection,
                clearer feedback and conversations with supervising allied health
                professionals.
              </p>

              <a
                href="#use-tools"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Start using the tools
                <ArrowRight size={16} />
              </a>
            </div>

            <aside className="rounded-3xl border border-[#4b4762] bg-[#2c2940] p-6 md:p-7">
              <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <Sparkles size={25} />
              </div>

              <h2 className="mb-4 text-2xl font-bold">
                Built specifically for AHAs
              </h2>

              <div className="grid gap-3">
                {toolBenefits.map((item) => (
                  <div key={item} className="flex gap-3">
                    <Check
                      size={17}
                      className="mt-0.5 shrink-0 text-[#99f6e4]"
                    />

                    <p className="text-sm leading-relaxed text-[#d9d7e5]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section
          id="use-tools"
          className="mb-8 scroll-mt-24 rounded-4xl border-2 border-[#0f766e] bg-white p-6 shadow-md md:p-10"
        >
          <div className="mb-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#f0fdfa] px-4 py-2 text-sm font-semibold text-[#0f766e]">
              <Sparkles size={16} />
              Free tools available now
            </div>

            <h2 className="max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
              Choose a tool and complete it here.
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#6b6880] md:text-lg">
              Each tool opens directly inside this page so you can use it without
              losing your place. You can also open a full-screen version when
              needed.
            </p>
          </div>

          <EmbeddedFreeTools />
        </section>

        <section className="mb-8 rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-6 shadow-sm md:p-8">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0f766e] text-white">
              <ShieldCheck size={23} />
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Professional boundary
              </p>

              <h2 className="mb-3 text-2xl font-bold">
                These tools support reflection, not clinical decision-making.
              </h2>

              <p className="max-w-4xl text-sm leading-relaxed text-[#3f5f5a] md:text-base">
                The tools do not replace workplace supervision, clinical
                supervision, delegation, direction, clinical oversight,
                workplace documentation, incident reporting or employer
                responsibilities. Seek clarification from the supervising
                professional whenever a task, direction or situation is unclear.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-10">
          <div className="mb-8 grid gap-5 md:grid-cols-[auto_1fr] md:items-start">
            <div className="flex h-13 w-13 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <RefreshCw size={24} />
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                More tools coming
              </p>

              <h2 className="text-3xl font-bold md:text-4xl">
                The AHA tool library will keep growing.
              </h2>

              <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#6b6880]">
                New tools will be added based on common questions from AHAs,
                managers, clinics and supervising professionals.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {toolsInProgress.map((tool) => {
              const Icon = tool.icon;

              return (
                <article
                  key={tool.title}
                  className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                      <Icon size={21} />
                    </div>

                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#6b6880]">
                      In development
                    </span>
                  </div>

                  <h3 className="mb-3 text-xl font-bold">{tool.title}</h3>

                  <p className="text-sm leading-relaxed text-[#6b6880]">
                    {tool.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="rounded-4xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <Video size={23} />
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-[#0f766e]">
                Free launch webinar
              </p>

              <h2 className="text-2xl font-bold">
                Meet Robyn and Jess and help shape future tools.
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#6b6880]">
                The webinar is an optional way to ask questions, meet the team
                and share what practical support would be most useful.
              </p>
            </div>

            <Link
              href="/subscribe"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0f766e] bg-white px-6 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#f0fdfa]"
            >
              View webinar
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}