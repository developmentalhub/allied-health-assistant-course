import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient as createSupabaseAdminClient } from "@supabase/supabase-js";
import { CalendarDays, FileText, LockKeyhole, PlayCircle, Video } from "lucide-react";
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
      "id, title, description, starts_at, ends_at, access_type, status, zoom_url, zoom_join_url, recording_url, resource_url, bunny_video_id, bunny_embed_url, bunny_playback_url, created_at"
    )
    .neq("status", "cancelled")
    .order("starts_at", { ascending: true });

  if (webinarsError) {
    throw new Error(webinarsError.message);
  }

  const typedWebinars = (webinars || []) as Webinar[];
  const now = new Date();

  const upcomingWebinars = typedWebinars.filter(
    (webinar) => new Date(webinar.starts_at) >= now
  );

  const recordedWebinars = typedWebinars.filter(
    (webinar) =>
      webinar.status === "recorded" ||
      Boolean(webinar.bunny_embed_url || webinar.bunny_playback_url || webinar.recording_url)
  );

  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-14 text-[#1e1b2e] md:py-20">
      <section className="mx-auto max-w-6xl">
        <div className="mb-10 rounded-4x1 border border-[#e8e4de] bg-white p-8 shadow-sm md:p-12">
          <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Member library
          </p>

          <h1 className="mb-5 text-4xl font-bold leading-tight md:text-6xl">
            Your AHA Professional Development hub.
          </h1>

          <p className="max-w-3xl text-xl leading-relaxed text-[#5f5b73]">
            Access upcoming Zoom details, webinar PDFs and edited recordings
            from your AHA Professional Development membership.
          </p>

          <div className="mt-6 inline-flex rounded-full bg-[#f0fdfa] px-4 py-2 text-sm font-semibold text-[#0f766e]">
            Membership status: {subscription.status}
          </div>
        </div>

        <section className="mb-12">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0f766e] text-white">
              <Video size={22} />
            </div>

            <div>
              <h2 className="text-3xl font-bold">Upcoming live webinars</h2>
              <p className="mt-1 text-base leading-relaxed text-[#6b6880]">
                First Tuesday of every month, 12pm to 1pm QLD time.
              </p>
            </div>
          </div>

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
            <EmptyState message="No upcoming webinars have been added yet." />
          )}
        </section>

<MemberToolsCard />

        <section>
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0f766e] text-white">
              <PlayCircle size={22} />
            </div>

            <div>
              <h2 className="text-3xl font-bold">Recordings and resources</h2>
              <p className="mt-1 text-base leading-relaxed text-[#6b6880]">
                Edited Bunny recordings and downloadable PDFs will appear here
                after each webinar.
              </p>
            </div>
          </div>

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
            <EmptyState message="No recordings have been added yet." />
          )}
        </section>
      </section>
    </main>
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
    webinar.bunny_embed_url || webinar.bunny_playback_url || webinar.recording_url;

  const dateTime = formatWebinarDate(webinar.starts_at, webinar.ends_at);

  return (
    <article className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="inline-flex rounded-full bg-[#f0fdfa] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
              {webinar.access_type === "free" ? "Free launch webinar" : "Members"}
            </span>

            <span className="inline-flex rounded-full bg-[#faf8f5] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#6b6880]">
              {webinar.status}
            </span>
          </div>

          <h3 className="mb-3 text-2xl font-bold">{webinar.title}</h3>

          <p className="max-w-3xl text-base leading-relaxed text-[#6b6880]">
            {webinar.description || "More details coming soon."}
          </p>
        </div>

        <div className="rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-4 md:min-w-72">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
            <CalendarDays size={17} />
            Date and time
          </div>
          <p className="text-sm leading-relaxed text-[#1e1b2e]">{dateTime}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <MemberResourceButton
          icon={<Video size={18} />}
          label="Join live webinar"
          href={zoomLink}
          emptyText="Zoom link coming soon"
        />

        <MemberResourceButton
          icon={<FileText size={18} />}
          label="Download PDF"
          href={webinar.resource_url}
          emptyText="PDF coming soon"
        />

        <MemberResourceButton
          icon={<PlayCircle size={18} />}
          label={mode === "recording" ? "Watch recording" : "Recording"}
          href={recordingLink}
          emptyText="Added after webinar"
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
      <p className="text-sm font-semibold text-[#1e1b2e]">Open link</p>
    </Link>
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