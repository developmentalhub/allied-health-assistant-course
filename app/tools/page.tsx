import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  ClipboardList,
  FileText,
  HelpCircle,
  Lock,
  MessageSquareText,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  Video,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AHA Member Tools",
  description:
    "AHA-specific reflective tools and previews for the AHA Professional Development membership, including preparation, feedback, supervisor questions and role boundary reflection.",
};

const freeStarterTools = [
  {
    title: "AHA Course Tools Preview",
    description:
      "A starter preview of the kinds of tools being created to help AHAs prepare, reflect and feel more supported in their work.",
    imageUrl:
      "https://aracabetvunmirlfgylv.supabase.co/storage/v1/object/public/website-images/aha-course-tools-preview.png",
    icon: ClipboardList,
  },
  {
    title: "AHA Session Tracker",
    description:
      "A simple tool to help AHAs track sessions, reflect on what happened and notice what may need follow-up or clarification.",
    imageUrl:
      "https://aracabetvunmirlfgylv.supabase.co/storage/v1/object/public/website-images/aha-session-tracker.png",
    icon: ClipboardCheck,
  },
];

const memberToolsComingSoon = [
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

const included = [
  "Two starter tools available through the free community",
  "Full tool library planned for the $57/month membership",
  "Designed to be used more than once",
  "Helpful before sessions, after sessions and when preparing questions",
  "More tools added as the platform grows with AHA feedback",
];

export default function ToolsComingSoonPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <section className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Built with AHAs, for AHAs
          </p>
          <p className="mt-2 text-base leading-relaxed text-[#3f5f5a]">
            We are building this platform from scratch with feedback from AHAs,
            managers and clinics. More tools, examples and resources are coming
            soon as the hive grows.
          </p>
        </section>

        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-start">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
                AHA tools
              </p>

              <h1 className="mb-5 text-4xl font-bold leading-tight md:text-6xl">
                Practical tools to help AHAs feel prepared, clear and supported.
              </h1>

              <p className="mb-6 max-w-3xl text-base leading-relaxed text-[#6b6880] md:text-lg">
                These tools are being designed for Allied Health Assistants who
                want to reflect, prepare, communicate clearly and know when to
                seek clarification. You will be able to use them multiple times
                across different children, sessions and clinic situations.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/join"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
                >
                  Join free community for starter tools
                  <ArrowRight size={15} />
                </Link>

                <Link
                  href="/subscribe"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-6 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
                >
                  View monthly access
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <Lock size={24} />
              </div>

              <h2 className="mb-3 text-2xl font-bold">
                Free starter tools, then member tools
              </h2>

              <p className="mb-4 text-sm leading-relaxed text-[#3f5f5a]">
                The first two starter tools can support free community sign-ups.
                The fuller tool library will sit alongside monthly webinars,
                replay access, PDFs and reflection prompts inside the $57/month
                member library.
              </p>

              <div className="grid gap-3">
                {included.map((item) => (
                  <div key={item} className="flex gap-2">
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0 text-[#0f766e]"
                    />
                    <p className="text-sm leading-relaxed text-[#3f5f5a]">
                      {item}
                    </p>
                  </div>
                ))}
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

        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <div className="mb-7 flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <Sparkles size={22} />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#0f766e]">
                Free starter tools
              </p>
              <h2 className="text-2xl font-bold md:text-3xl">
                Join the free community to access these first two AHA tools.
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#6b6880] md:text-base">
                These two tools are the first taste of what is being built. The
                full member tool library will sit inside the $57/month AHA
                Professional Development membership as more tools are added.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {freeStarterTools.map((tool) => {
              const Icon = tool.icon;

              return (
                <article
                  key={tool.title}
                  className="overflow-hidden rounded-3xl border border-[#e8e4de] bg-[#faf8f5]"
                >
                  <img
                    src={tool.imageUrl}
                    alt={`${tool.title} preview`}
                    className="h-64 w-full object-cover object-top"
                  />

                  <div className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                      <Icon size={23} />
                    </div>

                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0f766e]">
                      Free community tool
                    </div>

                    <h3 className="mb-2 text-xl font-bold">{tool.title}</h3>

                    <p className="mb-5 text-sm leading-relaxed text-[#6b6880]">
                      {tool.description}
                    </p>

                    <Link
                      href="/join"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
                    >
                      Join free community to access
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <div className="mb-7">
            <p className="mb-3 text-sm font-semibold text-[#0f766e]">
              Member tools coming soon
            </p>

            <h2 className="text-2xl font-bold md:text-3xl">
              More reusable tools will be added inside the monthly membership.
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#6b6880] md:text-base">
              These tools are planned for the $57/month member library. They are
              listed here so AHAs can see what is being built, without showing
              unfinished form previews.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {memberToolsComingSoon.map((tool) => {
              const Icon = tool.icon;

              return (
                <article
                  key={tool.title}
                  className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                    <Icon size={23} />
                  </div>

                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#6b6880]">
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

        <section className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-8 shadow-sm md:p-10">
          <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-start">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0f766e] text-white">
              <RefreshCw size={25} />
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
                Reusable support
              </p>

              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                These are not one-time worksheets.
              </h2>

              <p className="max-w-3xl text-base leading-relaxed text-[#3f5f5a]">
                AHA members will be able to return to the tools whenever they
                need them — before a session, after a tricky session, when
                preparing questions for a therapist, or when reflecting on
                confidence, communication and role clarity.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <div className="mb-7">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              What members will receive
            </p>

            <h2 className="text-3xl font-bold md:text-4xl">
              Tools will sit beside the monthly PD content.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <MemberFeature
              icon={<Video size={24} />}
              title="Monthly webinar"
              text="Live monthly AHA Professional Development sessions, with edited replay access added after."
            />

            <MemberFeature
              icon={<FileText size={24} />}
              title="PDF resources"
              text="Simple support sheets, prompts and reflection resources linked with the monthly topic."
            />

            <MemberFeature
              icon={<ClipboardList size={24} />}
              title="Member tools"
              text="Interactive tools and structured prompts that can be used again and again."
            />
          </div>
        </section>

        <section className="rounded-3xl bg-[#1e1b2e] p-8 text-white shadow-sm md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.6fr] lg:items-center">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#99f6e4]">
                Build in progress
              </p>

              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Help shape what gets built first.
              </h2>

              <p className="max-w-2xl text-sm leading-relaxed text-[#d9d7e5] md:text-base">
                The first tools will be shaped around what AHAs, managers and
                supervising professionals tell us is most useful. Start with the
                free community or the free August webinar while the member tools
                are being built.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/join"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Join free community
                <ArrowRight size={15} />
              </Link>

              <Link
                href="/subscribe"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#99f6e4] bg-transparent px-6 py-3 text-sm font-semibold text-[#99f6e4] transition hover:bg-[#2c2940]"
              >
                Register for free August webinar
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function MemberFeature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
        {icon}
      </div>

      <h3 className="mb-2 text-lg font-bold">{title}</h3>

      <p className="text-sm leading-relaxed text-[#6b6880]">{text}</p>
    </article>
  );
}