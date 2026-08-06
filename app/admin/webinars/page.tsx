import Link from "next/link";
import { redirect } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  FileText,
  LinkIcon,
  LockKeyhole,
  Mail,
  PlayCircle,
  Video,
} from "lucide-react";
import { createClient } from "@/lib/supabase-server";
import { sendZoomDetailsToMembers } from "./actions";

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
  email_sent_at: string | null;
  created_at: string;
};

export default async function AdminWebinarsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/admin/webinars");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin" && profile?.role !== "superadmin") {
    redirect("/dashboard");
  }

  const { data: webinars, error } = await supabase
    .from("webinars")
    .select(
      "id, title, description, starts_at, ends_at, access_type, status, zoom_url, zoom_join_url, recording_url, resource_url, bunny_video_id, bunny_embed_url, bunny_playback_url, email_sent_at, created_at",
    )
    .order("starts_at", { ascending: true });

  const typedWebinars = (webinars || []) as Webinar[];
  const now = new Date();

  const incompleteWebinars = typedWebinars.filter((webinar) =>
    needsAttention(webinar, now),
  );

  const incompleteIds = new Set(
    incompleteWebinars.map((webinar) => webinar.id),
  );

  const upcomingWebinars = typedWebinars.filter(
    (webinar) =>
      webinar.status !== "cancelled" &&
      new Date(webinar.starts_at) >= now &&
      !incompleteIds.has(webinar.id),
  );

  const recordedWebinars = typedWebinars.filter(
    (webinar) =>
      webinar.status !== "cancelled" &&
      new Date(webinar.starts_at) < now &&
      hasRecording(webinar) &&
      !incompleteIds.has(webinar.id),
  );

  const pastWithoutRecording = typedWebinars.filter(
    (webinar) =>
      webinar.status !== "cancelled" &&
      new Date(webinar.starts_at) < now &&
      !hasRecording(webinar) &&
      !incompleteIds.has(webinar.id),
  );

  const cancelledWebinars = typedWebinars.filter(
    (webinar) => webinar.status === "cancelled",
  );

  return (
    <main className="min-h-screen bg-[#fffaf3] px-5 py-12 text-[#1e1b2e] sm:px-6 md:py-20">
      <section className="mx-auto max-w-7xl">
        <Link
          href="/admin"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e] transition hover:text-[#0d6962]"
        >
          <ArrowLeft size={16} />
          Back to admin dashboard
        </Link>

        <section className="mb-8 overflow-hidden rounded-4xl border border-[#f4d9a6] bg-white shadow-sm">
          <div className="grid gap-8 bg-linear-to-br from-[#fff7df] via-white to-[#f0fdfa] p-7 md:p-12 lg:grid-cols-[1fr_0.72fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
                Allied Health Hive | Webinar Administration
              </p>

              <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
                Manage live learning, recordings and member access.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#5f5b73] md:text-xl">
                Check each webinar’s date, Zoom link, handout, recording and
                member email status from one place.
              </p>
            </div>

            <aside className="rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-6 md:p-8">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <Video size={27} />
              </div>

              <h2 className="mb-4 text-2xl font-bold">
                Webinar workflow
              </h2>

              <div className="grid gap-3 text-sm leading-relaxed text-[#3f5f5a]">
                <p>1. Add the webinar details and date.</p>
                <p>2. Add the Zoom joining link.</p>
                <p>3. Upload or link the participant handout.</p>
                <p>4. Send the Zoom details to members.</p>
                <p>5. Add the edited Bunny recording afterwards.</p>
              </div>
            </aside>
          </div>
        </section>

        {error ? (
          <div className="mb-8 rounded-4xl border border-red-200 bg-red-50 p-6 text-red-700">
            <h2 className="mb-2 text-xl font-bold">
              Could not load webinars
            </h2>

            <p className="text-sm leading-relaxed">{error.message}</p>
          </div>
        ) : null}

        <section className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            label="Upcoming"
            value={upcomingWebinars.length}
            text="Ready future webinars"
          />

          <SummaryCard
            label="Needs attention"
            value={incompleteWebinars.length}
            text="Missing key information"
            warning
          />

          <SummaryCard
            label="Recorded"
            value={recordedWebinars.length}
            text="Completed with recording"
          />

          <SummaryCard
            label="Awaiting recording"
            value={pastWithoutRecording.length}
            text="Past sessions without video"
          />
        </section>

        {incompleteWebinars.length > 0 ? (
          <WebinarSection
            eyebrow="Action required"
            title="Webinars needing attention"
            text="These entries are missing information needed for their current stage."
            icon={<AlertTriangle size={23} />}
            webinars={incompleteWebinars}
            variant="warning"
          />
        ) : (
          <section className="mb-10 rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-6">
            <div className="flex gap-3">
              <CheckCircle2
                size={22}
                className="mt-0.5 shrink-0 text-[#0f766e]"
              />

              <div>
                <h2 className="font-bold">
                  No webinar entries currently need attention.
                </h2>

                <p className="mt-1 text-sm leading-relaxed text-[#3f5f5a]">
                  Required links and details are complete for each webinar’s
                  current stage.
                </p>
              </div>
            </div>
          </section>
        )}

        <WebinarSection
          eyebrow="Live learning"
          title="Upcoming webinars"
          text="Future sessions with the main details required to prepare for delivery."
          icon={<CalendarDays size={23} />}
          webinars={upcomingWebinars}
          emptyTitle="No ready upcoming webinars"
          emptyText="Future sessions will appear here once their required details are complete."
        />

        <WebinarSection
          eyebrow="Published learning"
          title="Recorded webinars"
          text="Past webinars with a recording available for members."
          icon={<PlayCircle size={23} />}
          webinars={recordedWebinars}
          emptyTitle="No recorded webinars yet"
          emptyText="Completed webinars will appear here after a recording link is added."
        />

        <WebinarSection
          eyebrow="Post-webinar tasks"
          title="Past webinars awaiting a recording"
          text="These sessions have finished but do not yet have a recording link."
          icon={<Video size={23} />}
          webinars={pastWithoutRecording}
          emptyTitle="No recordings are outstanding"
          emptyText="All past webinar entries currently have a recording or need attention elsewhere."
        />

        {cancelledWebinars.length > 0 ? (
          <WebinarSection
            eyebrow="Inactive"
            title="Cancelled webinars"
            text="Cancelled entries remain visible here for administration records."
            icon={<LockKeyhole size={23} />}
            webinars={cancelledWebinars}
          />
        ) : null}
      </section>
    </main>
  );
}

function WebinarSection({
  eyebrow,
  title,
  text,
  icon,
  webinars,
  variant = "standard",
  emptyTitle,
  emptyText,
}: {
  eyebrow: string;
  title: string;
  text: string;
  icon: React.ReactNode;
  webinars: Webinar[];
  variant?: "standard" | "warning";
  emptyTitle?: string;
  emptyText?: string;
}) {
  return (
    <section className="mb-10">
      <div className="mb-6 flex items-start gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
            variant === "warning"
              ? "bg-amber-100 text-amber-700"
              : "bg-[#0f766e] text-white"
          }`}
        >
          {icon}
        </div>

        <div>
          <p
            className={`mb-2 text-sm font-semibold uppercase tracking-[0.14em] ${
              variant === "warning"
                ? "text-amber-700"
                : "text-[#0f766e]"
            }`}
          >
            {eyebrow}
          </p>

          <h2 className="text-3xl font-bold md:text-4xl">
            {title}
          </h2>

          <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#6b6880]">
            {text}
          </p>
        </div>
      </div>

      {webinars.length > 0 ? (
        <div className="grid gap-5">
          {webinars.map((webinar) => (
            <WebinarCard
              key={webinar.id}
              webinar={webinar}
              showAttention={variant === "warning"}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title={emptyTitle || "No webinars in this section"}
          message={emptyText || "There are no webinar entries to display here."}
        />
      )}
    </section>
  );
}

function WebinarCard({
  webinar,
  showAttention = false,
}: {
  webinar: Webinar;
  showAttention?: boolean;
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

  const zoomLink = webinar.zoom_join_url || webinar.zoom_url;

  const recordingLink =
    webinar.bunny_embed_url ||
    webinar.bunny_playback_url ||
    webinar.recording_url;

  const emailSentDate = webinar.email_sent_at
    ? new Intl.DateTimeFormat("en-AU", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZone: "Australia/Brisbane",
      }).format(new Date(webinar.email_sent_at))
    : null;

  const attentionItems = getAttentionItems(webinar, new Date());

  return (
    <article
      className={`rounded-4xl border bg-white p-6 shadow-sm md:p-8 ${
        showAttention
          ? "border-amber-200"
          : "border-[#e8e4de]"
      }`}
    >
      <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="max-w-3xl">
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="inline-flex rounded-full bg-[#f0fdfa] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
              {webinar.access_type === "free"
                ? "Free access"
                : "Member access"}
            </span>

            <span className="inline-flex rounded-full bg-[#faf8f5] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#6b6880]">
              {webinar.status}
            </span>

            {webinar.email_sent_at ? (
              <span className="inline-flex rounded-full bg-[#eefbf5] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#047857]">
                Email sent
              </span>
            ) : (
              <span className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-amber-700">
                Email not sent
              </span>
            )}
          </div>

          <h3 className="mb-3 text-2xl font-bold md:text-3xl">
            {webinar.title}
          </h3>

          <p className="text-base leading-relaxed text-[#6b6880]">
            {webinar.description || "No description has been added yet."}
          </p>
        </div>

        <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5 md:min-w-72">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
            <CalendarDays size={17} />
            Date and time
          </div>

          <p className="text-sm leading-relaxed">
            {dateLabel}
            <br />
            {startTime} to {endTime} QLD time
          </p>
        </div>
      </div>

      {showAttention && attentionItems.length > 0 ? (
        <div className="mb-5 rounded-3xl border border-amber-200 bg-amber-50 p-5">
          <div className="mb-3 flex items-center gap-2 font-semibold text-amber-800">
            <AlertTriangle size={18} />
            Attention needed
          </div>

          <div className="grid gap-2">
            {attentionItems.map((item) => (
              <p
                key={item}
                className="text-sm leading-relaxed text-amber-800"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mb-5 grid gap-4 md:grid-cols-3">
        <ResourceStatus
          icon={<Video size={18} />}
          label="Zoom joining link"
          value={zoomLink}
          emptyText="Not added yet"
        />

        <ResourceStatus
          icon={<FileText size={18} />}
          label="Participant handout"
          value={webinar.resource_url}
          emptyText="Not added yet"
        />

        <ResourceStatus
          icon={<PlayCircle size={18} />}
          label="Webinar recording"
          value={recordingLink}
          emptyText="Not added yet"
        />
      </div>

      <div className="mb-5 rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
        <p className="mb-4 text-sm font-semibold text-[#0f766e]">
          Bunny Stream details
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          <SmallInfo
            label="Bunny video ID"
            value={webinar.bunny_video_id}
          />

          <SmallInfo
            label="Embed URL"
            value={webinar.bunny_embed_url}
          />

          <SmallInfo
            label="Playback URL"
            value={webinar.bunny_playback_url}
          />
        </div>
      </div>

      <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#0f766e]">
              Member Zoom email
            </p>

            <p className="mt-1 text-sm leading-relaxed text-[#6b6880]">
              {emailSentDate
                ? `Last sent: ${emailSentDate}`
                : "Zoom details have not been sent yet."}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/admin/webinars/${webinar.id}/edit`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0f766e] bg-white px-5 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#f0fdfa]"
            >
              <LinkIcon size={15} />
              Edit webinar
            </Link>

            <form action={sendZoomDetailsToMembers}>
              <input
                type="hidden"
                name="webinarId"
                value={webinar.id}
              />

              <button
                type="submit"
                disabled={!zoomLink || webinar.status === "cancelled"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Mail size={15} />
                {webinar.email_sent_at
                  ? "Resend Zoom details"
                  : "Send Zoom details"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </article>
  );
}

function ResourceStatus({
  icon,
  label,
  value,
  emptyText,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | null;
  emptyText: string;
}) {
  return (
    <div
      className={`rounded-3xl border p-5 ${
        value
          ? "border-[#99f6e4] bg-[#f0fdfa]"
          : "border-amber-200 bg-amber-50"
      }`}
    >
      <div
        className={`mb-3 flex items-center gap-2 text-sm font-semibold ${
          value ? "text-[#0f766e]" : "text-amber-800"
        }`}
      >
        {icon}
        {label}
      </div>

      {value ? (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 break-all text-sm font-semibold text-[#1e1b2e] underline decoration-[#99f6e4] underline-offset-4"
        >
          Open link
          <LinkIcon size={14} />
        </a>
      ) : (
        <p className="text-sm text-amber-800">{emptyText}</p>
      )}
    </div>
  );
}

function SmallInfo({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  return (
    <div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#6b6880]">
        {label}
      </p>

      <p className="break-all text-sm leading-relaxed text-[#1e1b2e]">
        {value || "Not added"}
      </p>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  text,
  warning = false,
}: {
  label: string;
  value: number;
  text: string;
  warning?: boolean;
}) {
  return (
    <article
      className={`rounded-3xl border p-6 shadow-sm ${
        warning
          ? "border-amber-200 bg-amber-50"
          : "border-[#e8e4de] bg-white"
      }`}
    >
      <p
        className={`text-sm font-semibold uppercase tracking-[0.12em] ${
          warning ? "text-amber-700" : "text-[#0f766e]"
        }`}
      >
        {label}
      </p>

      <p className="mt-3 text-4xl font-bold">{value}</p>

      <p className="mt-2 text-sm leading-relaxed text-[#6b6880]">
        {text}
      </p>
    </article>
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

      <p className="text-base leading-relaxed text-[#6b6880]">
        {message}
      </p>
    </div>
  );
}

function hasRecording(webinar: Webinar) {
  return Boolean(
    webinar.bunny_embed_url ||
      webinar.bunny_playback_url ||
      webinar.recording_url,
  );
}

function needsAttention(webinar: Webinar, now: Date) {
  if (webinar.status === "cancelled") {
    return false;
  }

  return getAttentionItems(webinar, now).length > 0;
}

function getAttentionItems(webinar: Webinar, now: Date) {
  const issues: string[] = [];
  const startDate = new Date(webinar.starts_at);
  const zoomLink = webinar.zoom_join_url || webinar.zoom_url;
  const recordingAvailable = hasRecording(webinar);

  if (!webinar.title.trim()) {
    issues.push("Add a webinar title.");
  }

  if (!webinar.description?.trim()) {
    issues.push("Add a webinar description.");
  }

  if (Number.isNaN(startDate.getTime())) {
    issues.push("Check the webinar date and time.");
  }

  if (startDate >= now && !zoomLink) {
    issues.push("Add the Zoom joining link before the live session.");
  }

  if (startDate >= now && !webinar.resource_url) {
    issues.push("Add the participant handout or resource link.");
  }

  if (startDate < now && !recordingAvailable) {
    issues.push("Add the edited webinar recording.");
  }

  if (
    startDate < now &&
    recordingAvailable &&
    webinar.status !== "recorded"
  ) {
    issues.push("Change the webinar status to recorded.");
  }

  return issues;
}