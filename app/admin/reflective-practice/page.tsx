import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  LinkIcon,
  LockKeyhole,
  Mail,
  MessageSquareText,
  UserRound,
} from "lucide-react";
import { createClient } from "@/lib/supabase-server";

type ReflectivePracticeRequest = {
  id: string;
  full_name: string | null;
  email: string | null;
  role: string | null;
  organisation: string | null;
  setting: string | null;
  focus_area: string | null;
  child_initials: string | null;
  notes: string | null;
  preferred_contact_method: string | null;
  status: string | null;
  created_at: string;
};

export default async function AdminReflectivePracticePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/admin/reflective-practice");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin" && profile?.role !== "superadmin") {
    redirect("/dashboard");
  }

  const { data: requests, error } = await supabase
    .from("reflective_practice_requests")
    .select(
      "id, full_name, email, role, organisation, setting, focus_area, child_initials, notes, preferred_contact_method, status, created_at"
    )
    .order("created_at", { ascending: false });

  const typedRequests = (requests || []) as ReflectivePracticeRequest[];

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
            Admin reflective practice
          </p>

          <h1 className="mb-5 text-4xl font-bold leading-tight md:text-6xl">
            1:1 reflective practice requests.
          </h1>

          <p className="max-w-3xl text-xl leading-relaxed text-[#5f5b73]">
            Review requests from AHAs, educators, managers or team members who
            want reflective practice support.
          </p>
        </div>

        {error ? (
          <div className="mb-8 rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
            <h2 className="mb-2 text-xl font-bold">
              Could not load reflective practice requests
            </h2>
            <p className="text-sm leading-relaxed">{error.message}</p>
          </div>
        ) : null}

        <section className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-8 shadow-sm md:p-10">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
            <CalendarDays size={24} />
          </div>

          <h2 className="mb-4 text-3xl font-bold">Team calendar</h2>

          <p className="mb-6 max-w-3xl text-base leading-relaxed text-[#3f5f5a]">
            For now, keep the shared Google Calendar as the source of truth for
            booked 1:1 reflective practice sessions. Later, we can embed or sync
            this directly.
          </p>

          <a
            href="https://calendar.google.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0f766e] bg-white px-5 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#f0fdfa]"
          >
            Open Google Calendar
            <LinkIcon size={15} />
          </a>
        </section>

        {typedRequests.length > 0 ? (
          <section className="grid gap-5">
            {typedRequests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </section>
        ) : (
          <EmptyState message="No reflective practice requests have been submitted yet." />
        )}
      </section>
    </main>
  );
}

function RequestCard({
  request,
}: {
  request: ReflectivePracticeRequest;
}) {
  const createdDate = new Intl.DateTimeFormat("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Australia/Melbourne",
  }).format(new Date(request.created_at));

  return (
    <article className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-[#f0fdfa] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
              {request.status || "New"}
            </span>

            {request.role ? (
              <span className="inline-flex items-center rounded-full bg-[#faf8f5] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#6b6880]">
                {request.role}
              </span>
            ) : null}
          </div>

          <h2 className="mb-3 text-2xl font-bold">
            {request.full_name || "Name not supplied"}
          </h2>

          <div className="space-y-2 text-base leading-relaxed text-[#6b6880]">
            {request.email ? (
              <p className="flex items-start gap-2">
                <Mail className="mt-1 shrink-0 text-[#0f766e]" size={16} />
                <a
                  href={`mailto:${request.email}`}
                  className="font-semibold text-[#1e1b2e] underline decoration-[#99f6e4] underline-offset-4"
                >
                  {request.email}
                </a>
              </p>
            ) : null}

            {request.organisation ? (
              <p className="flex items-start gap-2">
                <UserRound
                  className="mt-1 shrink-0 text-[#0f766e]"
                  size={16}
                />
                <span>{request.organisation}</span>
              </p>
            ) : null}
          </div>
        </div>

        <div className="rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-4 md:min-w-60">
          <p className="mb-1 text-sm font-semibold text-[#0f766e]">
            Submitted
          </p>
          <p className="text-sm leading-relaxed text-[#1e1b2e]">
            {createdDate}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <InfoBox label="Setting" value={request.setting} />
        <InfoBox label="Focus area" value={request.focus_area} />
        <InfoBox label="Child initials only" value={request.child_initials} />
        <InfoBox
          label="Preferred contact"
          value={request.preferred_contact_method}
        />
      </div>

      <div className="mt-4 rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
          <MessageSquareText size={18} />
          Notes
        </div>

        <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#6b6880]">
          {request.notes || "No notes supplied."}
        </p>
      </div>
    </article>
  );
}

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  return (
    <div className="rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-4">
      <p className="mb-1 text-sm font-semibold text-[#0f766e]">{label}</p>
      <p className="text-sm leading-relaxed text-[#1e1b2e]">
        {value || "Not supplied"}
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