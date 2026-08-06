import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Balloon,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Footprints,
  HeartHandshake,
  Lightbulb,
  LockKeyhole,
  MessageCircleHeart,
  NotebookPen,
  PlayCircle,
  Route,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Video,
} from "lucide-react";
import { createClient } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "AHA Webinars | Allied Health Hive Workforce Development",
  description:
    "Practical workforce development for Allied Health Assistants covering regulation, documentation, session planning, family support and creative therapy ideas.",
};

type Webinar = {
  id: string;
  title: string;
  description: string | null;
  starts_at: string;
  ends_at: string;
  access_type: "free" | "members";
  status: "upcoming" | "recorded" | "cancelled";
  zoom_url: string | null;
  recording_url: string | null;
  resource_url: string | null;
  created_at: string;
};

const FUTURE_LEARNING_AREAS = [
  {
    icon: <HeartHandshake size={25} />,
    title: "Regulation and engagement",
    text: "Understand what may be happening underneath withdrawal, refusal, frustration or dysregulation, and explore practical ways to support connection and participation.",
  },
  {
    icon: <NotebookPen size={25} />,
    title: "Clearer documentation",
    text: "Build confidence recording useful observations, describing what happened objectively and communicating information that supports the wider allied health team.",
  },
  {
    icon: <ClipboardCheck size={25} />,
    title: "Session planning and preparation",
    text: "Learn how to prepare equipment, clarify the purpose of an activity and create flexible options before a session begins.",
  },
  {
    icon: <UsersRound size={25} />,
    title: "Empowering families",
    text: "Explore respectful ways to help families understand activities, participate with confidence and continue simple strategies within everyday routines.",
  },
  {
    icon: <MessageCircleHeart size={25} />,
    title: "Working with supervising professionals",
    text: "Prepare clearer questions, share useful observations and strengthen communication with the allied health professionals directing your work.",
  },
  {
    icon: <Lightbulb size={25} />,
    title: "Practical activity libraries",
    text: "Build a growing collection of adaptable ideas using simple equipment, movement, play and everyday materials.",
  },
];

export default async function WebinarsPage() {
  const supabase = await createClient();

  const { data: webinars, error } = await supabase
    .from("webinars")
    .select(
      "id, title, description, starts_at, ends_at, access_type, status, zoom_url, recording_url, resource_url, created_at",
    )
    .order("starts_at", { ascending: true });

  const typedWebinars = (webinars || []) as Webinar[];
  const now = new Date();

  const upcomingWebinars = typedWebinars.filter(
    (webinar) =>
      webinar.status !== "cancelled" && new Date(webinar.starts_at) >= now,
  );

  const pastWebinars = typedWebinars.filter(
    (webinar) =>
      webinar.status !== "cancelled" && new Date(webinar.starts_at) < now,
  );

  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#1e1b2e]">
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 md:py-16">
        <section className="mb-8 overflow-hidden rounded-4xl border border-[#f4d9a6] bg-white shadow-sm">
          <div className="grid gap-8 bg-linear-to-br from-[#fff7df] via-white to-[#f0fdfa] p-8 md:p-12 lg:grid-cols-[1fr_0.72fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
                Allied Health Hive | Workforce Development
              </p>

              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0f766e] shadow-sm">
                <Sparkles size={16} />
                Free live webinar for Allied Health Assistants
              </div>

              <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
                Practical ideas are only the beginning.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#5f5b73] md:text-xl">
                Join Robyn and Jess for a practical introduction to the kind of
                workforce development Allied Health Assistants have been asking
                for.
              </p>

              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#5f5b73]">
                We understand that AHA work involves much more than finding
                another activity. You are preparing sessions, responding to
                regulation needs, recording useful observations, communicating
                with supervising professionals and helping families feel
                capable of continuing strategies at home.
              </p>

              <p className="mt-4 max-w-3xl text-base font-semibold leading-relaxed text-[#1e1b2e]">
                The Allied Health Hive is being built to support all of these
                parts of your role.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/subscribe"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
                >
                  Save my free place
                  <ArrowRight size={18} />
                </Link>

                <a
                  href="#what-we-will-explore"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0f766e] bg-white px-7 py-4 text-base font-semibold text-[#0f766e] transition hover:bg-[#f0fdfa]"
                >
                  See what we understand
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>

            <aside className="rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-6 shadow-sm md:p-8">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <Video size={27} />
              </div>

              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Free live session
              </p>

              <h2 className="mb-4 text-3xl font-bold">
                Creative and practical ideas for more engaging AHA sessions
              </h2>

              <div className="grid gap-3">
                <Detail text="Tuesday 8 September 2026" />
                <Detail text="12:00 pm to 1:00 pm Queensland time" />
                <Detail text="Live online and free to attend" />
                <Detail text="Practical examples you can adapt immediately" />
                <Detail text="Questions can be submitted in advance" />
                <Detail text="No payment details required" />
              </div>
            </aside>
          </div>
        </section>

        <section className="mb-8 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                We understand the AHA role
              </p>

              <h2 className="text-3xl font-bold leading-tight md:text-5xl">
                AHA sessions rarely follow a perfectly predictable plan.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-relaxed text-[#5f5b73]">
                You may receive a therapy plan but still need to work out how to
                prepare the space, explain the activity, support engagement,
                notice meaningful changes and communicate what happened.
              </p>

              <p className="mt-4 text-base leading-relaxed text-[#6b6880]">
                You may also be supporting children who are tired, anxious,
                dysregulated, avoidant or simply not interested in the original
                activity. At the same time, you need to stay within your role,
                follow professional direction and provide useful feedback.
              </p>

              <div className="mt-6 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
                <p className="font-semibold text-[#0f766e]">
                  This is the reality our learning will be built around.
                </p>

                <p className="mt-2 text-sm leading-relaxed text-[#3f5f5a]">
                  Not generic training. Not passive videos. Practical learning
                  designed around the decisions, questions and challenges AHAs
                  experience during real sessions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="what-we-will-explore"
          className="mb-8 scroll-mt-24 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-10"
        >
          <div className="mb-8 max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Inside the free webinar
            </p>

            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              Fresh ideas you can adapt in your next session.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#6b6880] md:text-lg">
              The first webinar will show the practical and creative style of
              Allied Health Hive learning while introducing the wider support
              still to come.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <FeatureCard
              icon={<Route size={25} />}
              title="Masking tape movement games"
              text="Use tape lines, pathways, targets and shapes to support crossing the midline, balance, coordination, visual attention and motor planning."
            />

            <FeatureCard
              icon={<Balloon size={25} />}
              title="Low-cost equipment ideas"
              text="Turn balls, cups, balloons, paper, socks and everyday items into movement, matching, throwing, catching and communication activities."
            />

            <FeatureCard
              icon={<Footprints size={25} />}
              title="Strategies when participation drops"
              text="Explore ways to change the pace, instructions, body position, equipment, environment or challenge level when a child disengages."
            />

            <FeatureCard
              icon={<HeartHandshake size={25} />}
              title="Supporting regulation before performance"
              text="Consider what may be underneath avoidance, frustration or refusal and how connection can help a child feel safe enough to participate."
            />

            <FeatureCard
              icon={<Lightbulb size={25} />}
              title="Adapting when Plan A does not work"
              text="Learn how small changes can make an activity more achievable while still following the intended session direction."
            />

            <FeatureCard
              icon={<MessageCircleHeart size={25} />}
              title="Observing and communicating clearly"
              text="Think about what to notice during an activity and how to bring useful observations back to the supervising professional."
            />
          </div>
        </section>

        <section className="mb-8 rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-7 shadow-sm md:p-10">
          <div className="mb-8 max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              What is coming through the Hive
            </p>

            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              A growing workforce development pathway for AHAs and their teams.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#3f5f5a] md:text-lg">
              Future webinars, tools and resources will go beyond individual
              activity ideas and support the wider capabilities AHAs need in
              their daily work.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {FUTURE_LEARNING_AREAS.map((area) => (
              <article
                key={area.title}
                className="rounded-3xl border border-[#99f6e4] bg-white p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                  {area.icon}
                </div>

                <h3 className="mb-3 text-xl font-bold">{area.title}</h3>

                <p className="text-sm leading-relaxed text-[#6b6880]">
                  {area.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-4xl border border-[#f4d9a6] bg-[#fffaf0] p-7 shadow-sm md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#b45309]">
                This webinar may be for you
              </p>

              <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                Have you ever wondered whether you are doing enough?
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Thought text="I am running out of fresh activity ideas." />
              <Thought text="The child does not want to participate." />
              <Thought text="I am unsure how much I can adapt." />
              <Thought text="I do not know what to document." />
              <Thought text="I want to give more useful feedback." />
              <Thought text="I need clearer session preparation strategies." />
              <Thought text="I want to support families more confidently." />
              <Thought text="I would love to hear what other AHAs try." />
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-10">
          <div className="grid gap-7 md:grid-cols-[auto_1fr] md:items-start">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <ShieldCheck size={27} />
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Professional learning with clear boundaries
              </p>

              <h2 className="text-3xl font-bold">
                Confidence includes knowing when to ask.
              </h2>

              <p className="mt-4 max-w-4xl text-base leading-relaxed text-[#6b6880]">
                Allied Health Hive learning supports preparation, reflection,
                communication and practical skill development. It does not
                replace workplace supervision, allied health direction,
                delegation, clinical decision-making, incident reporting or
                employer responsibilities.
              </p>
            </div>
          </div>
        </section>

        {error ? (
          <div className="mb-8 rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
            <h2 className="mb-2 text-xl font-bold">
              The webinar list could not be loaded
            </h2>

            <p className="text-sm leading-relaxed">{error.message}</p>
          </div>
        ) : null}

        <section className="mb-10">
          <div className="mb-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Upcoming sessions
            </p>

            <h2 className="text-3xl font-bold md:text-4xl">
              Join the next AHA learning conversation.
            </h2>

            <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#6b6880]">
              New sessions will be shaped around the practical workforce needs
              shared by AHAs, managers and supervising professionals.
            </p>
          </div>

          {upcomingWebinars.length > 0 ? (
            <div className="grid gap-5">
              {upcomingWebinars.map((webinar) => (
                <WebinarCard
                  key={webinar.id}
                  webinar={webinar}
                  showResourceLinks={false}
                />
              ))}
            </div>
          ) : (
            <EmptyState message="The next webinar details will be added here soon." />
          )}
        </section>

        <section className="mb-10">
          <div className="mb-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Recordings and resources
            </p>

            <h2 className="text-3xl font-bold md:text-4xl">
              Return to useful ideas after each session.
            </h2>

            <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#6b6880]">
              Recordings, preparation prompts, activity ideas and related
              resources will appear here as the learning library grows.
            </p>
          </div>

          {pastWebinars.length > 0 ? (
            <div className="grid gap-5">
              {pastWebinars.map((webinar) => (
                <WebinarCard
                  key={webinar.id}
                  webinar={webinar}
                  showResourceLinks={false}
                />
              ))}
            </div>
          ) : (
            <EmptyState message="Recordings will appear here after the first live session." />
          )}
        </section>

        <section className="rounded-4xl bg-[#1e1b2e] p-8 text-white shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#99f6e4]">
                Begin with the free webinar
              </p>

              <h2 className="text-3xl font-bold leading-tight md:text-5xl">
                See how well we understand the realities of AHA work.
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#d9d7e5] md:text-lg">
                Bring your questions, your difficult sessions and the areas
                where you want more confidence. Leave with practical ideas and
                a clearer picture of the support being built through the Allied
                Health Hive.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
              <Link
                href="/subscribe"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-4 text-center text-base font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Save my free place
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/topics"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-4 text-center text-base font-semibold text-white transition hover:bg-white/10"
              >
                Explore the topic library
                <BookOpen size={17} />
              </Link>

              <Link
                href="/community"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-4 text-center text-base font-semibold text-white transition hover:bg-white/10"
              >
                Visit the free community
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function Detail({ text }: { text: string }) {
  return (
    <div className="flex gap-3">
      <CheckCircle2
        className="mt-0.5 shrink-0 text-[#0f766e]"
        size={18}
      />

      <p className="text-sm leading-relaxed text-[#1e1b2e]">{text}</p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
        {icon}
      </div>

      <h3 className="mb-3 text-xl font-bold">{title}</h3>

      <p className="text-sm leading-relaxed text-[#6b6880]">{text}</p>
    </article>
  );
}

function Thought({ text }: { text: string }) {
  return (
    <div className="flex gap-3 rounded-2xl bg-white p-4">
      <CheckCircle2
        className="mt-0.5 shrink-0 text-[#b45309]"
        size={18}
      />

      <p className="text-sm leading-relaxed text-[#5f5b73]">{text}</p>
    </div>
  );
}

function WebinarCard({
  webinar,
  showResourceLinks,
}: {
  webinar: Webinar;
  showResourceLinks: boolean;
}) {
  const startDate = new Date(webinar.starts_at);
  const endDate = new Date(webinar.ends_at);

  const dateLabel = new Intl.DateTimeFormat("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Australia/Brisbane",
  }).format(startDate);

  const startTime = new Intl.DateTimeFormat("en-AU", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Australia/Brisbane",
  }).format(startDate);

  const endTime = new Intl.DateTimeFormat("en-AU", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Australia/Brisbane",
  }).format(endDate);

  return (
    <article className="rounded-4xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="max-w-3xl">
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-[#f0fdfa] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
              {webinar.access_type === "free"
                ? "Free live session"
                : "AHA learning session"}
            </span>

            <span className="inline-flex items-center rounded-full bg-[#fffaf0] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#b45309]">
              {webinar.status}
            </span>
          </div>

          <h3 className="mb-3 text-2xl font-bold md:text-3xl">
            {webinar.title}
          </h3>

          <p className="text-base leading-relaxed text-[#6b6880]">
            {webinar.description ||
              "Practical workforce development and supportive learning for Allied Health Assistants."}
          </p>
        </div>

        <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5 md:min-w-72">
          <p className="mb-2 text-sm font-semibold text-[#0f766e]">
            Date and time
          </p>

          <p className="text-sm leading-relaxed text-[#1e1b2e]">
            {dateLabel}
            <br />
            {startTime} to {endTime} QLD time
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <ResourceStatus
          icon={<Video size={18} />}
          label="Live joining link"
          hasValue={Boolean(showResourceLinks && webinar.zoom_url)}
          value={webinar.zoom_url}
          emptyText={
            webinar.access_type === "free"
              ? "Sent after registration"
              : "Available when released"
          }
        />

        <ResourceStatus
          icon={<FileText size={18} />}
          label="Practical resource"
          hasValue={Boolean(showResourceLinks && webinar.resource_url)}
          value={webinar.resource_url}
          emptyText="Added with the session"
        />

        <ResourceStatus
          icon={<PlayCircle size={18} />}
          label="Recording"
          hasValue={Boolean(showResourceLinks && webinar.recording_url)}
          value={webinar.recording_url}
          emptyText="Added after the webinar"
        />
      </div>
    </article>
  );
}

function ResourceStatus({
  icon,
  label,
  hasValue,
  value,
  emptyText,
}: {
  icon: React.ReactNode;
  label: string;
  hasValue: boolean;
  value: string | null;
  emptyText: string;
}) {
  return (
    <div className="rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
        {icon}
        {label}
      </div>

      {hasValue && value ? (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 break-all text-sm font-semibold text-[#1e1b2e] underline decoration-[#99f6e4] underline-offset-4"
        >
          Open
          <ArrowRight size={14} />
        </a>
      ) : (
        <p className="text-sm text-[#6b6880]">{emptyText}</p>
      )}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-4xl border border-dashed border-[#e8e4de] bg-white p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
        <LockKeyhole size={24} />
      </div>

      <p className="text-base leading-relaxed text-[#6b6880]">{message}</p>
    </div>
  );
}