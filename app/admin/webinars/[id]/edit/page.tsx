import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  FileText,
  LinkIcon,
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
      "id, title, description, starts_at, ends_at, access_type, status, zoom_join_url, zoom_url, resource_url, recording_url, bunny_video_id, bunny_embed_url, bunny_playback_url"
    )
    .eq("id", id)
    .single();

  if (error || !data) {
    redirect("/admin/webinars");
  }

  const webinar = data as Webinar;

  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-14 text-[#1e1b2e] md:py-20">
      <section className="mx-auto max-w-4xl">
        <Link
          href="/admin/webinars"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e] transition hover:text-[#0d6962]"
        >
          <ArrowLeft size={16} />
          Back to webinars
        </Link>

        <div className="mb-8 rounded-[2rem] border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Edit webinar
          </p>

          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
            Update webinar details.
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-[#6b6880]">
            Use this page to update Zoom links, PDF links, Bunny recordings and
            the webinar status without opening Supabase.
          </p>
        </div>

        <form action={updateWebinar} className="grid gap-6">
          <input type="hidden" name="webinarId" value={webinar.id} />

          <FormSection
            icon={<CalendarDays size={22} />}
            title="Webinar details"
            description="This is what members will see on the webinar and member library pages."
          >
            <TextField
              label="Title"
              name="title"
              defaultValue={webinar.title}
              required
            />

            <TextareaField
              label="Description"
              name="description"
              defaultValue={webinar.description || ""}
              rows={5}
            />

            <div className="grid gap-4 md:grid-cols-3">
              <TextField
                label="Date"
                name="date"
                type="date"
                defaultValue={formatDateInput(webinar.starts_at)}
                required
              />

              <TextField
                label="Start time, QLD"
                name="startTime"
                type="time"
                defaultValue={formatTimeInput(webinar.starts_at)}
                required
              />

              <TextField
                label="End time, QLD"
                name="endTime"
                type="time"
                defaultValue={formatTimeInput(webinar.ends_at)}
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <SelectField
                label="Access type"
                name="accessType"
                defaultValue={webinar.access_type}
                options={[
                  { label: "Free", value: "free" },
                  { label: "Members", value: "members" },
                ]}
              />

              <SelectField
                label="Status"
                name="status"
                defaultValue={webinar.status}
                options={[
                  { label: "Upcoming", value: "upcoming" },
                  { label: "Recorded", value: "recorded" },
                  { label: "Cancelled", value: "cancelled" },
                ]}
              />
            </div>
          </FormSection>

          <FormSection
            icon={<Video size={22} />}
            title="Zoom live webinar link"
            description="Paste the attendee join link here. Do not paste the host-only start link."
          >
            <TextField
              label="Zoom join URL"
              name="zoomJoinUrl"
              defaultValue={webinar.zoom_join_url || webinar.zoom_url || ""}
              placeholder="https://..."
            />
          </FormSection>

          <FormSection
            icon={<FileText size={22} />}
            title="PDF resource"
            description="Paste the public PDF link for the handout or worksheet."
          >
            <TextField
              label="PDF resource URL"
              name="resourceUrl"
              defaultValue={webinar.resource_url || ""}
              placeholder="https://..."
            />
          </FormSection>

          <FormSection
            icon={<PlayCircle size={22} />}
            title="Bunny recording"
            description="After editing and uploading the webinar recording to Bunny, paste the final links here."
          >
            <TextField
              label="Bunny video ID"
              name="bunnyVideoId"
              defaultValue={webinar.bunny_video_id || ""}
            />

            <TextField
              label="Bunny embed URL"
              name="bunnyEmbedUrl"
              defaultValue={webinar.bunny_embed_url || ""}
              placeholder="https://iframe.mediadelivery.net/embed/..."
            />

            <TextField
              label="Bunny playback URL"
              name="bunnyPlaybackUrl"
              defaultValue={webinar.bunny_playback_url || ""}
              placeholder="https://..."
            />

            <TextField
              label="General recording URL"
              name="recordingUrl"
              defaultValue={webinar.recording_url || ""}
              placeholder="Optional backup recording link"
            />
          </FormSection>

          <div className="flex flex-col gap-3 rounded-3xl border border-[#e8e4de] bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
            <p className="text-sm leading-relaxed text-[#6b6880]">
              Saving will update the admin page, public webinars page and member
              library.
            </p>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
            >
              <Save size={16} />
              Save webinar
            </button>
          </div>
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
    <section className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
          {icon}
        </div>

        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-[#6b6880]">
            {description}
          </p>
        </div>
      </div>

      <div className="grid gap-4">{children}</div>
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
      <span className="text-sm font-semibold text-[#1e1b2e]">{label}</span>
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
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-[#1e1b2e]">{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
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
  options: { label: string; value: string }[];
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-[#1e1b2e]">{label}</span>
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