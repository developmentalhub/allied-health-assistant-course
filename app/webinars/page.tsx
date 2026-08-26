import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  FileQuestion,
  FileText,
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
import { submitWebinarQuestion } from "./actions";

export const metadata: Metadata = {
  title: "AHA Webinars | Allied Health Hive Workforce Development",
  description:
    "Free and practical webinars for Allied Health Assistants and allied health professionals through Allied Health Hive.",
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

type PageProps = {
  searchParams?: Promise<{
    question?: string;
  }>;
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

export default async function WebinarsPage({
  searchParams,
}: PageProps) {
  const resolvedSearchParams = await searchParams;
  const questionReceived =
    resolvedSearchParams?.question === "received";

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
      webinar.status !== "cancelled" &&
      new Date(webinar.starts_at) >= now,
  );

  const pastWebinars = typedWebinars.filter(
    (webinar) =>
      webinar.status !== "cancelled" &&
      new Date(webinar.starts_at) < now,
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
                Free live webinar for Allied Health Assistants and allied
                health professionals
              </div>

              <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
                Inside The Allied Health Hive: Your Top 5 Questions Answered
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#5f5b73] md:text-xl">
                Join Robyn and Jess as we introduce The Allied Health Hive
                and answer five of the questions we hear most often from
                Allied Health Assistants and the professionals supporting
                them.
              </p>

              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#5f5b73]">
                We will talk about what the Hive is, who it is for, how the
                webinars and resources work, what reflective support looks
                like and how we hope to make the everyday AHA role feel a
                little less isolating.
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
                  href="#webinar-question"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0f766e] bg-white px-7 py-4 text-base font-semibold text-[#0f766e] transition hover:bg-[#f0fdfa]"
                >
                  Ask us a question
                  <FileQuestion size={18} />
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
                Meet The Hive and bring us your questions
              </h2>

              <div className="grid gap-3">
                <Detail text="Tuesday 8 September 2026" />
                <Detail text="12:00 pm to 1:00 pm Queensland time" />
                <Detail text="Live online and free to attend" />
                <Detail text="Meet Robyn and Jess" />
                <Detail text="Your top 5 Hive questions answered" />
                <Detail text="Submit your own question before the webinar" />
              </div>
            </aside>
          </div>
        </section>

        <section className="mb-8 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Our first Hive conversation
              </p>

              <h2 className="text-3xl font-bold leading-tight md:text-5xl">
                We want you to understand what we are building before we ask
                you to become part of it.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-relaxed text-[#5f5b73]">
                Allied Health Assistants often tell us they want practical
                ideas, somewhere to ask questions, more connection with
                others doing similar work and support that understands the
                realities of busy therapy sessions.
              </p>

              <p className="mt-4 text-base leading-relaxed text-[#6b6880]">
                The Allied Health Hive is our response to that. Our first
                webinar is a chance to show you what we are creating, explain
                how it will work and answer the questions you have before
                deciding whether the Hive is useful for you or your team.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-10">
          <div className="mb-8 max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Inside the free webinar
            </p>

            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              Five questions we are going to answer honestly.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <FeatureCard
              icon={<UsersRound size={25} />}
              title="1. Who is The Allied Health Hive actually for?"
              text="We will explain how the Hive supports Allied Health Assistants while also including supervising professionals, managers and wider allied health teams."
            />

            <FeatureCard
              icon={<BookOpen size={25} />}
              title="2. What will I actually get inside the Hive?"
              text="We will walk through the community, practical tools, webinars, recordings, resources and reflective support being developed."
            />

            <FeatureCard
              icon={<MessageCircleHeart size={25} />}
              title="3. Is this supervision?"
              text="We will explain the difference between reflective support, workforce learning and the clinical supervision and delegation provided by your workplace."
            />

            <FeatureCard
              icon={<Route size={25} />}
              title="4. How will this help with real sessions?"
              text="We will show how Hive learning will focus on practical session problems, confidence, communication, regulation, planning and adapting when Plan A changes."
            />

            <FeatureCard
              icon={<HeartHandshake size={25} />}
              title="5. What happens after the free webinar?"
              text="We will show you how you can stay connected, what learning is coming next and how individuals and organisations can use the Hive."
            />

            <FeatureCard
              icon={<FileQuestion size={25} />}
              title="Plus your questions"
              text="If there is something you want us to answer, submit it below and it may become one of the questions we discuss live."
            />
          </div>
        </section>

        <section
          id="webinar-question"
          className="mb-8 scroll-mt-24 rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-7 shadow-sm md:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#0f766e]">
                <FileQuestion size={27} />
              </div>

              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Your question matters
              </p>

              <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                What would you like us to answer on 8 September?
              </h2>

              <p className="mt-4 text-base leading-relaxed text-[#3f5f5a]">
                Ask us anything about The Allied Health Hive, the AHA role,
                our community, reflective support, webinars, resources or
                how the Hive might work for your team.
              </p>
            </div>

            <div className="rounded-4xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
              {questionReceived ? (
                <div>
                  <CheckCircle2
                    size={34}
                    className="mb-4 text-[#0f766e]"
                  />

                  <h3 className="text-2xl font-bold">
                    Your question has been received.
                  </h3>

                  <p className="mt-3 text-base leading-relaxed text-[#6b6880]">
                    Thank you. Robyn and Jess will review the questions
                    submitted before the live webinar.
                  </p>

                  <Link
                    href="/subscribe"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white"
                  >
                    Save my free webinar place
                    <ArrowRight size={16} />
                  </Link>
                </div>
              ) : (
                <form
                  action={submitWebinarQuestion}
                  className="grid gap-5"
                >
                  <TextField
                    label="Your name"
                    name="fullName"
                    required
                  />

                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    required
                  />

                  <SelectField
                    label="Which best describes you?"
                    name="role"
                    options={[
                      {
                        label: "Choose one",
                        value: "",
                      },
                      {
                        label: "Allied Health Assistant",
                        value: "Allied Health Assistant",
                      },
                      {
                        label: "Allied health professional",
                        value: "Allied health professional",
                      },
                      {
                        label: "Manager or supervisor",
                        value: "Manager or supervisor",
                      },
                      {
                        label: "Student",
                        value: "Student",
                      },
                      {
                        label: "Other",
                        value: "Other",
                      },
                    ]}
                  />

                  <label className="grid gap-2">
                    <span className="text-sm font-semibold">
                      What would you like Robyn and Jess to answer?
                    </span>

                    <textarea
                      name="question"
                      rows={5}
                      required
                      placeholder="Ask us anything about The Hive, the AHA role, sessions, support, resources or how it all works..."
                      className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-base outline-none transition focus:border-[#0f766e] focus:bg-white"
                    />
                  </label>

                  <label className="flex items-start gap-3 rounded-2xl bg-[#faf8f5] p-4">
                    <input
                      type="checkbox"
                      name="canShare"
                      defaultChecked
                      className="mt-1 h-4 w-4"
                    />

                    <span className="text-sm leading-relaxed text-[#5f5b73]">
                      You can mention my question during the webinar. We will
                      not share my email address.
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
                  >
                    Send my question
                    <ArrowRight size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-7 shadow-sm md:p-10">
          <div className="mb-8 max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              What is coming through the Hive
            </p>

            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              A growing workforce development pathway for AHAs and their
              teams.
            </h2>
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

                <h3 className="mb-3 text-xl font-bold">
                  {area.title}
                </h3>

                <p className="text-sm leading-relaxed text-[#6b6880]">
                  {area.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-10">
          <div className="grid gap-7 md:grid-cols-[auto_1fr] md:items-start">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <ShieldCheck size={27} />
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Clear professional boundaries
              </p>

              <h2 className="text-3xl font-bold">
                The Hive supports your role. It does not replace supervision.
              </h2>

              <p className="mt-4 max-w-4xl text-base leading-relaxed text-[#6b6880]">
                Allied Health Hive supports preparation, reflection,
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

            <p className="text-sm leading-relaxed">
              {error.message}
            </p>
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
                Come and meet The Hive on 8 September.
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#d9d7e5] md:text-lg">
                Bring your questions and hear what we are building for Allied
                Health Assistants and the allied health teams supporting
                them.
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

              <a
                href="#webinar-question"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-4 text-center text-base font-semibold text-white transition hover:bg-white/10"
              >
                Submit a question
                <FileQuestion size={17} />
              </a>
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

      <p className="text-sm leading-relaxed">{text}</p>
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

      <p className="text-sm leading-relaxed text-[#6b6880]">
        {text}
      </p>
    </article>
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
            <span className="rounded-full bg-[#f0fdfa] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
              {webinar.access_type === "free"
                ? "Free live session"
                : "AHA learning session"}
            </span>

            <span className="rounded-full bg-[#fffaf0] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#b45309]">
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

          <p className="text-sm leading-relaxed">
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
          hasValue={Boolean(
            showResourceLinks && webinar.resource_url,
          )}
          value={webinar.resource_url}
          emptyText="Added with the session"
        />

        <ResourceStatus
          icon={<PlayCircle size={18} />}
          label="Recording"
          hasValue={Boolean(
            showResourceLinks && webinar.recording_url,
          )}
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
          className="inline-flex items-center gap-2 text-sm font-semibold underline"
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

function TextField({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold">{label}</span>

      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-base outline-none transition focus:border-[#0f766e] focus:bg-white"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: { label: string; value: string }[];
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold">{label}</span>

      <select
        name={name}
        className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-base outline-none transition focus:border-[#0f766e] focus:bg-white"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-4xl border border-dashed border-[#e8e4de] bg-white p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
        <LockKeyhole size={24} />
      </div>

      <p className="text-base leading-relaxed text-[#6b6880]">
        {message}
      </p>
    </div>
  );
}