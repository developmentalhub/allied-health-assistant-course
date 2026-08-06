import Link from "next/link";
import { redirect } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  FileText,
  Info,
  PlayCircle,
  Save,
  Video,
} from "lucide-react";
import { createClient as createSupabaseAdminClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase-server";
import { updateWebinar } from "../../actions";

type Webinar = {
  id: string;
  title: string;
  description: string | null;
  starts_at: string;
  ends_at: string;
  access_type: "free" | "members";
  status: "upcoming" | "recorded" | "cancelled";
  zoom_join_url: string | null;
  zoom_url: string | null;
  resource_url: string | null;
  recording_url: string | null;
  bunny_video_id: string | null;
  bunny_embed_url: string | null;
  bunny_playback_url: string | null;
};

type PageProps = {
  params: Promise<{
    id: string;
  }>;
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

function formatDateInput(value: string) {
  const date = new Date(value);

  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Australia/Brisbane",
  }).format(date);
}

function formatTimeInput(value: string) {
  const date = new Date(value);

  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Australia/Brisbane",
  }).format(date);
}

export default async function EditWebinarPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?redirect=/admin/webinars/${id}/edit`);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin" && profile?.role !== "superadmin") {
    redirect("/dashboard");
  }

  const supabaseAdmin = getSupabaseAdmin();

  const { data, error } = await supabaseAdmin
    .from("webinars")
    .select(
      "id, title, description, starts_at, ends_at, access_type, status, zoom_join_url, zoom_url, resource_url, recording_url, bunny_video_id, bunny_embed_url, bunny_playback_url",
    )
    .eq("id", id)
    .single();

  if (error || !data) {
    redirect("/admin/webinars");
  }

  const webinar = data as Webinar;

  const hasZoomLink = Boolean(
    webinar.zoom_join_url || webinar.zoom_url,
  );

  const hasHandout = Boolean(webinar.resource_url);

  const hasRecording = Boolean(
    webinar.bunny_embed_url ||
      webinar.bunny_playback_url ||
      webinar.recording_url,
  );

  return (
    <main className="min-h-screen bg-[#fffaf3] px-5 py-12 text-[#1e1b2e] sm:px-6 md:py-20">
      <section className="mx-auto max-w-5xl">
        <Link
          href="/admin/webinars"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e] transition hover:text-[#0d6962]"
        >
          <ArrowLeft size={16} />
          Back to webinar administration
        </Link>

        <section className="mb-8 overflow-hidden rounded-4xl border border-[#f4d9a6] bg-white shadow-sm">
          <div className="grid gap-7 bg-linear-to-br from-[#fff7df] via-white to-[#f0fdfa] p-7 md:p-10 lg:grid-cols-[1fr_0.65fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
                Allied Health Hive | Edit Webinar
              </p>

              <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                Update webinar details and access.
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#5f5b73]">
                Manage the session information, Queensland time, Zoom link,
                participant handout and recording details.
              </p>
            </div>

            <aside className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
              <h2 className="mb-4 text-lg font-bold">
                Current completion
              </h2>

              <div className="grid gap-3">
                <CompletionItem
                  complete={Boolean(webinar.title && webinar.description)}
                  text="Title and description"
                />

                <CompletionItem
                  complete={hasZoomLink}
                  text="Zoom joining link"
                />

                <CompletionItem
                  complete={hasHandout}
                  text="Participant handout"
                />

                <CompletionItem
                  complete={hasRecording}
                  text="Edited recording"
                />
              </div>
            </aside>
          </div>
        </section>

        <form action={updateWebinar} className="grid gap-6">
          <input type="hidden" name="webinarId" value={webinar.id} />

          <FormSection
            icon={<CalendarDays size={22} />}
            title="Webinar details"
            description="These details appear on webinar pages and inside the private member library."
          >
            <TextField
              label="Webinar title"
              name="title"
              defaultValue={webinar.title}
              placeholder="Enter the webinar title"
              required
            />

            <TextareaField
              label="Webinar description"
              name="description"
              defaultValue={webinar.description || ""}
              rows={5}
              placeholder="Explain what participants will learn and the practical ideas covered."
              required
            />

            <div className="grid gap-4 md:grid-cols-3">
              <TextField
                label="Webinar date"
                name="date"
                type="date"
                defaultValue={formatDateInput(webinar.starts_at)}
                required
              />

              <TextField
                label="Start time, Queensland"
                name="startTime"
                type="time"
                defaultValue={formatTimeInput(webinar.starts_at)}
                required
              />

              <TextField
                label="End time, Queensland"
                name="endTime"
                type="time"
                defaultValue={formatTimeInput(webinar.ends_at)}
                required
              />
            </div>

            <InfoBox>
              All webinar times are stored and displayed using the
              Australia/Brisbane timezone. Queensland does not use daylight
              saving time.
            </InfoBox>

            <div className="grid gap-4 md:grid-cols-2">
              <SelectField
                label="Who can access this webinar?"
                name="accessType"
                defaultValue={webinar.access_type}
                options={[
                  {
                    label: "Free access",
                    value: "free",
                  },
                  {
                    label: "Private member access",
                    value: "members",
                  },
                ]}
              />

              <SelectField
                label="Webinar status"
                name="status"
                defaultValue={webinar.status}
                options={[
                  {
                    label: "Upcoming",
                    value: "upcoming",
                  },
                  {
                    label: "Recorded",
                    value: "recorded",
                  },
                  {
                    label: "Cancelled",
                    value: "cancelled",
                  },
                ]}
              />
            </div>

            <StatusGuidance />
          </FormSection>

          <FormSection
            icon={<Video size={22} />}
            title="Live Zoom access"
            description="Paste the attendee joining link. Do not use the host-only start link."
          >
            <TextField
              label="Zoom attendee join URL"
              name="zoomJoinUrl"
              type="url"
              defaultValue={
                webinar.zoom_join_url || webinar.zoom_url || ""
              }
              placeholder="https://zoom.us/j/..."
            />

            <InfoBox>
              This link may be emailed to registered participants and displayed
              inside private member areas. Check that it opens the attendee
              joining page before sending it.
            </InfoBox>
          </FormSection>

          <FormSection
            icon={<FileText size={22} />}
            title="Participant handout or resource"
            description="Add a public link to the PDF, worksheet or supporting resource."
          >
            <TextField
              label="Handout or resource URL"
              name="resourceUrl"
              type="url"
              defaultValue={webinar.resource_url || ""}
              placeholder="https://..."
            />

            <InfoBox>
              Use a public or securely shareable link that participants can open
              without signing into your personal storage account.
            </InfoBox>
          </FormSection>

          <FormSection
            icon={<PlayCircle size={22} />}
            title="Edited webinar recording"
            description="Add these details after editing the session and uploading the final recording to Bunny Stream."
          >
            <TextField
              label="Bunny video ID"
              name="bunnyVideoId"
              defaultValue={webinar.bunny_video_id || ""}
              placeholder="Bunny video identifier"
            />

            <TextField
              label="Bunny embed URL"
              name="bunnyEmbedUrl"
              type="url"
              defaultValue={webinar.bunny_embed_url || ""}
              placeholder="https://iframe.mediadelivery.net/embed/..."
            />

            <TextField
              label="Bunny playback URL"
              name="bunnyPlaybackUrl"
              type="url"
              defaultValue={webinar.bunny_playback_url || ""}
              placeholder="https://..."
            />

            <TextField
              label="Alternative recording URL"
              name="recordingUrl"
              type="url"
              defaultValue={webinar.recording_url || ""}
              placeholder="Optional backup or alternative recording link"
            />

            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex gap-3">
                <AlertTriangle
                  size={20}
                  className="mt-0.5 shrink-0 text-amber-700"
                />

                <div>
                  <p className="font-semibold text-amber-800">
                    When to mark the webinar as recorded
                  </p>

                  <p className="mt-2 text-sm leading-relaxed text-amber-800">
                    Change the webinar status to Recorded only after the final
                    edited recording has been uploaded and at least one working
                    recording link has been added.
                  </p>
                </div>
              </div>
            </div>
          </FormSection>

          <section className="sticky bottom-4 z-20 rounded-3xl border border-[#99f6e4] bg-white/95 p-5 shadow-lg backdrop-blur">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold">
                  Ready to update this webinar?
                </p>

                <p className="mt-1 text-sm leading-relaxed text-[#6b6880]">
                  Saving updates the administration page, public webinar pages
                  and private member library.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/admin/webinars"
                  className="inline-flex items-center justify-center rounded-full border border-[#e8e4de] bg-white px-6 py-3 text-sm font-semibold text-[#1e1b2e] transition hover:border-[#0f766e] hover:text-[#0f766e]"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
                >
                  <Save size={16} />
                  Save webinar changes
                </button>
              </div>
            </div>
          </section>
        </form>
      </section>
    </main>
  );
}

function FormSection({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-4xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
          {icon}
        </div>

        <div>
          <h2 className="text-2xl font-bold">{title}</h2>

          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#6b6880]">
            {description}
          </p>
        </div>
      </div>

      <div className="grid gap-5">{children}</div>
    </section>
  );
}

function TextField({
  label,
  name,
  defaultValue,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-[#1e1b2e]">
        {label}
      </span>

      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-base outline-none transition focus:border-[#0f766e] focus:bg-white"
      />
    </label>
  );
}

function TextareaField({
  label,
  name,
  defaultValue,
  rows = 4,
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-[#1e1b2e]">
        {label}
      </span>

      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-base outline-none transition focus:border-[#0f766e] focus:bg-white"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue: string;
  options: {
    label: string;
    value: string;
  }[];
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-[#1e1b2e]">
        {label}
      </span>

      <select
        name={name}
        defaultValue={defaultValue}
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

function CompletionItem({
  complete,
  text,
}: {
  complete: boolean;
  text: string;
}) {
  return (
    <div className="flex gap-3">
      {complete ? (
        <CheckCircle2
          size={18}
          className="mt-0.5 shrink-0 text-[#0f766e]"
        />
      ) : (
        <AlertTriangle
          size={18}
          className="mt-0.5 shrink-0 text-amber-700"
        />
      )}

      <p
        className={`text-sm leading-relaxed ${
          complete ? "text-[#3f5f5a]" : "text-amber-800"
        }`}
      >
        {text}
      </p>
    </div>
  );
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
      <div className="flex gap-3">
        <Info
          size={19}
          className="mt-0.5 shrink-0 text-[#0f766e]"
        />

        <p className="text-sm leading-relaxed text-[#3f5f5a]">
          {children}
        </p>
      </div>
    </div>
  );
}

function StatusGuidance() {
  return (
    <div className="grid gap-3 rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
      <p className="text-sm font-semibold">
        Status guidance
      </p>

      <p className="text-sm leading-relaxed text-[#6b6880]">
        <strong>Upcoming:</strong> Use before the live session, including when
        the Zoom link and handout are still being prepared.
      </p>

      <p className="text-sm leading-relaxed text-[#6b6880]">
        <strong>Recorded:</strong> Use after the session when the final edited
        recording is ready for participants or members.
      </p>

      <p className="text-sm leading-relaxed text-[#6b6880]">
        <strong>Cancelled:</strong> Use when the session will no longer go
        ahead. Cancelled webinars are excluded from normal public and member
        listings.
      </p>
    </div>
  );
}