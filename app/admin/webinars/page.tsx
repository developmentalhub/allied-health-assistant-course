import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
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
      "id, title, description, starts_at, ends_at, access_type, status, zoom_url, zoom_join_url, recording_url, resource_url, bunny_video_id, bunny_embed_url, bunny_playback_url, email_sent_at, created_at"
    )
    .order("starts_at", { ascending: true });

  const typedWebinars = (webinars || []) as Webinar[];

  const now = new Date();

  const upcomingWebinars = typedWebinars.filter(
    (webinar) => new Date(webinar.starts_at) >= now
  );

  const pastWebinars = typedWebinars.filter(
    (webinar) => new Date(webinar.starts_at) < now
  );

  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-14 text-[#1e1b2e] md:py-20">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Link
            href="/admin"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e] transition hover:text-[#0d6962]"
          >
            <ArrowLeft size={16} />
            Back to admin dashboard
          </Link>

          <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Admin webinars
          </p>

          <h1 className="mb-5 text-4xl font-bold leading-tight md:text-6xl">
            Monthly webinar schedule.
          </h1>

          <p className="max-w-3xl text-xl leading-relaxed text-[#5f5b73]">
            Use this page to keep track of monthly AHA Professional Development
            webinars, topic PDFs, Zoom links, Bunny recordings and member emails.
          </p>
        </div>

        {error ? (
          <div className="mb-8 rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
            <h2 className="mb-2 text-xl font-bold">
              Could not load webinars
            </h2>
            <p className="text-sm leading-relaxed">{error.message}</p>
          </div>
        ) : null}

        <section className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-8 shadow-sm md:p-10">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
            <Video size={24} />
          </div>

          <h2 className="mb-4 text-3xl font-bold">
            Zoom live, Bunny for edited recordings
          </h2>

          <p className="max-w-3xl text-base leading-relaxed text-[#3f5f5a]">
            Zoom links are used for the live webinar. After the webinar, edit the
            recording on your computer, upload the final version to Bunny Stream,
            then paste the Bunny link into Supabase for that webinar.
          </p>
        </section>

        <section className="mb-10">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold">Upcoming webinars</h2>
              <p className="mt-2 text-base leading-relaxed text-[#6b6880]">
                Future monthly sessions and the launch webinar.
              </p>
            </div>
          </div>

          {upcomingWebinars.length > 0 ? (
            <div className="grid gap-5">
              {upcomingWebinars.map((webinar) => (
                <WebinarCard key={webinar.id} webinar={webinar} />
              ))}
            </div>
          ) : (
            <EmptyState message="No upcoming webinars have been added yet." />
          )}
        </section>

        <section>
          <div className="mb-5">
            <h2 className="text-3xl font-bold">Past and recorded webinars</h2>
            <p className="mt-2 text-base leading-relaxed text-[#6b6880]">
              Completed webinars, Bunny recordings and related PDF resources.
            </p>
          </div>

          {pastWebinars.length > 0 ? (
            <div className="grid gap-5">
              {pastWebinars.map((webinar) => (
                <WebinarCard key={webinar.id} webinar={webinar} />
              ))}
            </div>
          ) : (
            <EmptyState message="No past webinars yet." />
          )}
        </section>
      </section>
    </main>
  );
}

function WebinarCard({ webinar }: { webinar: Webinar }) {
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
  const bunnyLink =
    webinar.bunny_embed_url || webinar.bunny_playback_url || webinar.recording_url;

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

  return (
    <article className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-[#f0fdfa] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
              {webinar.access_type === "free" ? "Free" : "Members"}
            </span>

            <span className="inline-flex items-center rounded-full bg-[#faf8f5] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#6b6880]">
              {webinar.status}
            </span>
          </div>

          <h3 className="mb-3 text-2xl font-bold">{webinar.title}</h3>

          <p className="mb-4 text-base leading-relaxed text-[#6b6880]">
            {webinar.description || "No description added yet."}
          </p>
        </div>

        <div className="rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-4 md:min-w-64">
          <p className="mb-1 text-sm font-semibold text-[#0f766e]">
            Date and time
          </p>
          <p className="text-sm leading-relaxed text-[#1e1b2e]">
            {dateLabel}
            <br />
            {startTime} to {endTime} QLD time
          </p>
        </div>
      </div>

      <div className="mb-4 grid gap-4 md:grid-cols-3">
        <ResourceStatus
          icon={<Video size={18} />}
          label="Zoom live link"
          value={zoomLink}
          emptyText="Not added yet"
        />

        <ResourceStatus
          icon={<FileText size={18} />}
          label="PDF resource"
          value={webinar.resource_url}
          emptyText="Not added yet"
        />

        <ResourceStatus
          icon={<PlayCircle size={18} />}
          label="Bunny recording"
          value={bunnyLink}
          emptyText="Add after editing"
        />
      </div>

      <div className="mb-4 rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-4">
        <p className="mb-2 text-sm font-semibold text-[#0f766e]">
          Bunny Stream details
        </p>

        <div className="grid gap-3 md:grid-cols-3">
          <SmallInfo label="Bunny video ID" value={webinar.bunny_video_id} />
          <SmallInfo label="Embed URL" value={webinar.bunny_embed_url} />
          <SmallInfo label="Playback URL" value={webinar.bunny_playback_url} />
        </div>
      </div>

      <div className="rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#0f766e]">
              Zoom email status
            </p>
            <p className="text-sm leading-relaxed text-[#6b6880]">
              {emailSentDate
                ? `Last sent: ${emailSentDate}`
                : "Not sent yet"}
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
    <input type="hidden" name="webinarId" value={webinar.id} />

    <button
      type="submit"
      disabled={!zoomLink}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Mail size={15} />
      Send Zoom details
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
    <div className="rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
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
        <p className="text-sm text-[#6b6880]">{emptyText}</p>
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

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-[#e8e4de] bg-white p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
        <LockKeyhole size={24} />
      </div>

      <p className="text-base leading-relaxed text-[#6b6880]">{message}</p>
    </div>
  );
}