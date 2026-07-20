import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  LockKeyhole,
  PlayCircle,
  Sparkles,
  Video,
} from "lucide-react";
import { createClient } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "AHA Webinars — AHA Professional Development",
  description:
    "View upcoming AHA Professional Development webinars, topic resources and webinar recordings.",
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

export default async function WebinarsPage() {
  const supabase = await createClient();

  const { data: webinars, error } = await supabase
    .from("webinars")
    .select(
      "id, title, description, starts_at, ends_at, access_type, status, zoom_url, recording_url, resource_url, created_at"
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
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
                AHA webinars
              </p>

              <h1 className="mb-5 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
                Live professional development and practical conversations for
                AHAs.
              </h1>

              <p className="mb-6 max-w-2xl text-base leading-relaxed text-[#6b6880] md:text-lg">
                Join Jess and Robyn for practical AHA Professional Development
                conversations that focus on real questions, role clarity,
                communication, confidence and everyday support.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/subscribe"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
                >
                  Register for the free webinar
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/manager-pathway"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0f766e] px-6 py-4 text-base font-semibold text-[#0f766e] transition hover:bg-[#f0fdfa]"
                >
                  Manager pathway
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-6 md:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <Sparkles size={24} />
              </div>

              <h2 className="mb-3 text-2xl font-bold">
                The launch webinar is free
              </h2>

              <p className="mb-5 text-sm leading-relaxed text-[#3f5f5a]">
                The first webinar is a free introduction to meet Robyn and Jess,
                ask questions and hear what is being built for AHAs. No payment
                details are required.
              </p>

              <ul className="space-y-3 text-sm leading-relaxed text-[#1e1b2e]">
                <li className="flex gap-3">
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-[#0f766e]"
                    size={18}
                  />
                  <span>Tuesday 4 August 2026</span>
                </li>

                <li className="flex gap-3">
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-[#0f766e]"
                    size={18}
                  />
                  <span>12pm to 1pm QLD time</span>
                </li>

                <li className="flex gap-3">
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-[#0f766e]"
                    size={18}
                  />
                  <span>Questions can be submitted in advance</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {error ? (
          <div className="mb-8 rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
            <h2 className="mb-2 text-xl font-bold">
              Could not load webinars
            </h2>

            <p className="text-sm leading-relaxed">{error.message}</p>
          </div>
        ) : null}

        <section className="mb-10">
          <div className="mb-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Upcoming webinars
            </p>

            <h2 className="mb-3 text-3xl font-bold md:text-4xl">
              What is coming up next.
            </h2>

            <p className="max-w-3xl text-base leading-relaxed text-[#6b6880]">
              Upcoming webinars will be added as the AHA Professional
              Development pathway grows. The current priority is the free launch
              webinar with Robyn and Jess.
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
            <EmptyState message="Upcoming webinars will be added soon." />
          )}
        </section>

        <section className="mb-10">
          <div className="mb-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Recorded webinars
            </p>

            <h2 className="mb-3 text-3xl font-bold md:text-4xl">
              Recordings and resources.
            </h2>

            <p className="max-w-3xl text-base leading-relaxed text-[#6b6880]">
              Recordings and related resources will be added here once webinars
              are running and the resource pathway is ready.
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
            <EmptyState message="Recorded webinars will appear here after the first live session." />
          )}
        </section>

        <section className="rounded-3xl bg-[#1e1b2e] p-8 text-white shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <h2 className="mb-5 text-3xl font-bold md:text-5xl">
                Start with the free webinar.
              </h2>

              <p className="text-base leading-relaxed text-[#d9d7e5] md:text-lg">
                This first session is designed to introduce the AHA space, hear
                what AHAs and managers need, and answer real questions before
                the broader webinar and resource pathway is built.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
              <p className="mb-5 text-sm leading-relaxed text-[#d9d7e5]">
                Register for the free launch webinar, or view the manager
                pathway if you are looking at support for a team.
              </p>

              <div className="flex flex-col gap-3">
                <Link
                  href="/subscribe"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-4 text-center text-base font-semibold text-[#1e1b2e] transition hover:bg-[#f5f3ff]"
                >
                  Register for free webinar
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/manager-pathway"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-4 text-center text-base font-semibold text-white transition hover:bg-white/10"
                >
                  Manager pathway
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
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
    <article className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-[#f0fdfa] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
              {webinar.access_type === "free" ? "Free" : "Professional development"}
            </span>

            <span className="inline-flex items-center rounded-full bg-[#faf8f5] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#6b6880]">
              {webinar.status}
            </span>
          </div>

          <h3 className="mb-3 text-2xl font-bold">{webinar.title}</h3>

          <p className="mb-4 text-base leading-relaxed text-[#6b6880]">
            {webinar.description || "Topic details coming soon."}
          </p>
        </div>

        <div className="rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-4 md:min-w-64">
          <p className="mb-1 text-sm font-semibold text-[#0f766e]">
            Date and time
          </p>

          <p className="text-sm leading-relaxed text-[#1e1b2e]">
            {dateLabel}
            <br />
            {startTime} to {endTime}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <ResourceStatus
          icon={<Video size={18} />}
          label="Live link"
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
          label="PDF resource"
          hasValue={Boolean(showResourceLinks && webinar.resource_url)}
          value={webinar.resource_url}
          emptyText="Added with topic"
        />

        <ResourceStatus
          icon={<PlayCircle size={18} />}
          label="Recording"
          hasValue={Boolean(showResourceLinks && webinar.recording_url)}
          value={webinar.recording_url}
          emptyText="Added after webinar"
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
    <div className="rounded-3xl border border-dashed border-[#e8e4de] bg-white p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
        <LockKeyhole size={24} />
      </div>

      <p className="text-base leading-relaxed text-[#6b6880]">{message}</p>
    </div>
  );
}