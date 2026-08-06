import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient as createSupabaseAdminClient } from "@supabase/supabase-js";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  FileHeart,
  FileText,
  HeartHandshake,
  Lightbulb,
  LockKeyhole,
  MessageCircleHeart,
  NotebookPen,
  PlayCircle,
  UsersRound,
  Video,
} from "lucide-react";
import MemberToolsCard from "@/components/MemberToolsCard";
import { createClient } from "@/lib/supabase-server";

type Webinar = {
  id: string;
  title: string;
  description: string | null;
  starts_at: string;
  ends_at: string;
  access_type: "free" | "members";
  status: "upcoming" | "recorded" | "cancelled";
  zoom_url: string | null;
  zoom_join_url: string | null;
  recording_url: string | null;
  resource_url: string | null;
  bunny_video_id: string | null;
  bunny_embed_url: string | null;
  bunny_playback_url: string | null;
  created_at: string;
};

const learningAreas = [
  {
    icon: <ClipboardCheck size={24} />,
    title: "Session planning",
    text: "Prepare equipment, clarify the purpose of activities and think through flexible options before sessions.",
    href: "/tools",
    linkText: "Open planning tools",
  },
  {
    icon: <HeartHandshake size={24} />,
    title: "Regulation and engagement",
    text: "Explore practical ways to support connection, participation and regulation when sessions feel difficult.",
    href: "/topics",
    linkText: "Explore regulation learning",
  },
  {
    icon: <NotebookPen size={24} />,
    title: "Documentation support",
    text: "Organise observations and prepare clearer information for supervising professionals.",
    href: "/tools",
    linkText: "Use reflection tools",
  },
  {
    icon: <FileHeart size={24} />,
    title: "Empowering families",
    text: "Find ideas for explaining activities clearly and supporting carryover within everyday routines.",
    href: "/resource-shop",
    linkText: "Explore family resources",
  },
  {
    icon: <MessageCircleHeart size={24} />,
    title: "Reflective practice",
    text: "Work through difficult sessions without judgement and identify useful questions or next steps.",
    href: "/reflective-practice",
    linkText: "Explore reflective support",
  },
  {
    icon: <BookOpen size={24} />,
    title: "Learning topics",
    text: "Build confidence with role clarity, communication, preparation and working under professional direction.",
    href: "/topics",
    linkText: "Browse learning topics",
  },
];

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable.");
  }

  if (!serviceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable.");
  }

  return createSupabaseAdminClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function formatWebinarDate(startsAt: string, endsAt: string) {
  const startDate = new Date(startsAt);
  const endDate = new Date(endsAt);

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

  return `${dateLabel}, ${startTime} to ${endTime} QLD time`;
}

export default async function MemberLibraryPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/login?redirect=/member-library");
  }

  const supabaseAdmin = getSupabaseAdmin();

  const { data: subscription, error: subscriptionError } = await supabaseAdmin
    .from("aha_subscriptions")
    .select("email, status, current_period_end")
    .eq("email", user.email.toLowerCase())
    .in("status", ["active", "trialing"])
    .maybeSingle();

  if (subscriptionError) {
    throw new Error(subscriptionError.message);
  }

  if (!subscription) {
    redirect("/subscribe");
  }

  const { data: webinars, error: webinarsError } = await supabaseAdmin
    .from("webinars")
    .select(
      "id, title, description, starts_at, ends_at, access_type, status, zoom_url, zoom_join_url, recording_url, resource_url, bunny_video_id, bunny_embed_url, bunny_playback_url, created_at",
    )
    .neq("status", "cancelled")
    .order("starts_at", { ascending: true });

  if (webinarsError) {
    throw new Error(webinarsError.message);
  }

  const typedWebinars = (webinars || []) as Webinar[];
  const now = new Date();

  const upcomingWebinars = typedWebinars.filter(
    (webinar) => new Date(webinar.starts_at) >= now,
  );

  const recordedWebinars = typedWebinars.filter(
    (webinar) =>
      webinar.status === "recorded" ||
      Boolean(
        webinar.bunny_embed_url ||
          webinar.bunny_playback_url ||
          webinar.recording_url,
      ),
  );

  const firstName =
    typeof user.user_metadata?.full_name === "string"
      ? user.user_metadata.full_name.trim().split(" ")[0]
      : "";

  return (
    <main className="min-h-screen bg-[#fffaf3] px-5 py-12 text-[#1e1b2e] sm:px-6 md:py-20">
      <section className="mx-auto max-w-7xl">
        <section className="mb-8 overflow-hidden rounded-4xl border border-[#f4d9a6] bg-white shadow-sm">
          <div className="grid gap-8 bg-linear-to-br from-[#fff7df] via-white to-[#f0fdfa] p-7 md:p-12 lg:grid-cols-[1fr_0.72fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
                Allied Health Hive | Private Learning Hub
              </p>

              <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
                {firstName
                  ? `Welcome back, ${firstName}.`
                  : "Welcome to your private learning hub."}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#5f5b73] md:text-xl">
                Access your webinars, practical tools, learning topics and
                workforce development resources in one place.
              </p>

              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#5f5b73]">
                Start with whatever feels most useful today. You can prepare for
                a session, reflect afterwards, revisit a recording or explore a
                topic connected with your current work.
              </p>
            </div>

            <aside className="rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-6 md:p-8">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <LockKeyhole size={27} />
              </div>

              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Private access
              </p>

              <h2 className="mb-4 text-2xl font-bold">
                Your learning access is active
              </h2>

              <div className="grid gap-3">
                <StatusItem text={`Access status: ${subscription.status}`} />
                <StatusItem text={`Signed in as: ${user.email}`} />
                <StatusItem text="Private webinar links are protected" />
                <StatusItem text="New resources will appear here as released" />
              </div>
            </aside>
          </div>
        </section>

        <section className="mb-8 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-10">
          <div className="mb-8 max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Choose your starting point
            </p>

            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              What would help most in your work today?
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#6b6880] md:text-lg">
              Your library is organised around the practical areas AHAs manage
              before, during and after sessions.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {learningAreas.map((area) => (
              <LearningAreaCard
                key={area.title}
                icon={area.icon}
                title={area.title}
                text={area.text}
                href={area.href}
                linkText={area.linkText}
              />
            ))}
          </div>
        </section>

        <section className="mb-10">
          <SectionHeading
            icon={<Video size={23} />}
            eyebrow="Live learning"
            title="Upcoming webinars"
            text="Your private joining links and session resources will appear here when they are available."
          />

          {upcomingWebinars.length > 0 ? (
            <div className="grid gap-5">
              {upcomingWebinars.map((webinar) => (
                <MemberWebinarCard
                  key={webinar.id}
                  webinar={webinar}
                  mode="upcoming"
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No upcoming webinars are listed yet"
              message="New live learning sessions will appear here as they are scheduled."
            />
          )}
        </section>

        <section className="mb-10 rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-6 shadow-sm md:p-8">
          <div className="mb-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Interactive member tools
            </p>

            <h2 className="text-3xl font-bold">
              Prepare, reflect and organise your thinking.
            </h2>

            <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#3f5f5a]">
              Use these tools around different sessions whenever you need a
              clearer starting point or a more structured reflection.
            </p>
          </div>

          <MemberToolsCard />
        </section>

        <section className="mb-10">
          <SectionHeading
            icon={<PlayCircle size={23} />}
            eyebrow="Watch and revisit"
            title="Webinar recordings and handouts"
            text="Return to completed sessions, practical resources and downloadable handouts."
          />

          {recordedWebinars.length > 0 ? (
            <div className="grid gap-5">
              {recordedWebinars.map((webinar) => (
                <MemberWebinarCard
                  key={webinar.id}
                  webinar={webinar}
                  mode="recording"
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No recordings have been added yet"
              message="Recordings and supporting resources will appear here after live sessions."
            />
          )}
        </section>

        <section className="mb-8 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Keep exploring
              </p>

              <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                Learning does not have to happen in one sitting.
              </h2>

              <p className="mt-4 text-base leading-relaxed text-[#6b6880]">
                Return to a topic, tool or recording when it becomes relevant to
                a real session or workplace conversation.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <PrivateLink
                icon={<BookOpen size={22} />}
                title="Learning topics"
                text="Explore role clarity, preparation, communication and reflective confidence."
                href="/topics"
              />

              <PrivateLink
                icon={<Lightbulb size={22} />}
                title="Practical tools"
                text="Use preparation and reflection tools before or after sessions."
                href="/tools"
              />

              <PrivateLink
                icon={<MessageCircleHeart size={22} />}
                title="Community"
                text="Read, reflect and join conversations when you feel ready."
                href="/community"
              />

              <PrivateLink
                icon={<FileText size={22} />}
                title="Resource library"
                text="Explore planned activity, documentation and family resources."
                href="/resource-shop"
              />
            </div>
          </div>
        </section>

        <section className="rounded-4xl bg-[#1e1b2e] p-8 text-white shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#99f6e4]">
                For teams and managers
              </p>

              <h2 className="text-3xl font-bold leading-tight md:text-5xl">
                Need workforce support beyond individual learning?
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#d9d7e5] md:text-lg">
                Managers and supervising professionals can explore team
                onboarding, workforce development, reflective support and
                custom resources.
              </p>
            </div>

            <Link
              href="/manager-pathway"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
            >
              Explore team support
              <UsersRound size={18} />
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}

function SectionHeading({
  icon,
  eyebrow,
  title,
  text,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="mb-6 flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0f766e] text-white">
        {icon}
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
          {eyebrow}
        </p>

        <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>

        <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#6b6880]">
          {text}
        </p>
      </div>
    </div>
  );
}

function LearningAreaCard({
  icon,
  title,
  text,
  href,
  linkText,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  href: string;
  linkText: string;
}) {
  return (
    <article className="flex flex-col rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0f766e]">
        {icon}
      </div>

      <h3 className="mb-3 text-xl font-bold">{title}</h3>

      <p className="mb-5 flex-1 text-sm leading-relaxed text-[#6b6880]">
        {text}
      </p>

      <Link
        href={href}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
      >
        {linkText}
        <ArrowRight size={15} />
      </Link>
    </article>
  );
}

function StatusItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3">
      <CheckCircle2
        className="mt-0.5 shrink-0 text-[#0f766e]"
        size={18}
      />

      <p className="text-sm leading-relaxed text-[#3f5f5a]">{text}</p>
    </div>
  );
}

function MemberWebinarCard({
  webinar,
  mode,
}: {
  webinar: Webinar;
  mode: "upcoming" | "recording";
}) {
  const zoomLink = webinar.zoom_join_url || webinar.zoom_url;

  const recordingLink =
    webinar.bunny_embed_url ||
    webinar.bunny_playback_url ||
    webinar.recording_url;

  const dateTime = formatWebinarDate(webinar.starts_at, webinar.ends_at);

  return (
    <article className="rounded-4xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="max-w-3xl">
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="inline-flex rounded-full bg-[#f0fdfa] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
              {webinar.access_type === "free"
                ? "Free live session"
                : "Private member session"}
            </span>

            <span className="inline-flex rounded-full bg-[#fffaf0] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#b45309]">
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
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
            <CalendarDays size={17} />
            Date and time
          </div>

          <p className="text-sm leading-relaxed text-[#1e1b2e]">
            {dateTime}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <MemberResourceButton
          icon={<Video size={18} />}
          label="Join live webinar"
          href={zoomLink}
          emptyText="Joining link coming soon"
        />

        <MemberResourceButton
          icon={<FileText size={18} />}
          label="Download handout"
          href={webinar.resource_url}
          emptyText="Handout coming soon"
        />

        <MemberResourceButton
          icon={<PlayCircle size={18} />}
          label={mode === "recording" ? "Watch recording" : "Recording"}
          href={recordingLink}
          emptyText="Added after the webinar"
        />
      </div>
    </article>
  );
}

function MemberResourceButton({
  icon,
  label,
  href,
  emptyText,
}: {
  icon: React.ReactNode;
  label: string;
  href: string | null;
  emptyText: string;
}) {
  if (!href) {
    return (
      <div className="rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#6b6880]">
          {icon}
          {label}
        </div>

        <p className="text-sm text-[#6b6880]">{emptyText}</p>
      </div>
    );
  }

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className="rounded-2xl border border-[#99f6e4] bg-[#f0fdfa] p-4 transition hover:border-[#0f766e] hover:bg-white"
    >
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
        {icon}
        {label}
      </div>

      <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#1e1b2e]">
        Open
        <ArrowRight size={14} />
      </p>
    </Link>
  );
}

function PrivateLink({
  icon,
  title,
  text,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5 transition hover:border-[#0f766e] hover:bg-white"
    >
      <div className="mb-3 text-[#0f766e]">{icon}</div>

      <h3 className="mb-2 text-lg font-bold">{title}</h3>

      <p className="text-sm leading-relaxed text-[#6b6880]">{text}</p>
    </Link>
  );
}

function EmptyState({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="rounded-4xl border border-dashed border-[#e8e4de] bg-white p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
        <LockKeyhole size={24} />
      </div>

      <h3 className="mb-2 text-xl font-bold">{title}</h3>

      <p className="text-base leading-relaxed text-[#6b6880]">{message}</p>
    </div>
  );
}