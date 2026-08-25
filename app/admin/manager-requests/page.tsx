import Link from "next/link";
import { redirect } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  CheckCircle2,
  ClipboardList,
  Clock3,
  ExternalLink,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";
import { createClient } from "@/lib/supabase-server";

type ManagerRequest = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  organisation: string;
  role: string | null;
  team_size: string;
  message: string | null;
  status: string | null;
  created_at?: string | null;
};

type TeamMember = {
  id?: string;
  manager_request_id: string;
  email: string;
  status: string | null;
  created_at?: string | null;
};

export default async function ManagerRequestsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/admin/manager-requests");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin" && profile?.role !== "superadmin") {
    redirect("/dashboard");
  }

  const [
    { data: requests, error: requestError },
    { data: teamMembers, error: teamError },
  ] = await Promise.all([
    supabase
      .from("manager_pathway_requests")
      .select("*")
      .order("created_at", { ascending: false }),

    supabase
      .from("manager_team_members")
      .select("*"),
  ]);

  const typedRequests = (requests || []) as ManagerRequest[];
  const typedTeamMembers = (teamMembers || []) as TeamMember[];

  const newRequests = typedRequests.filter(
    (request) => normaliseStatus(request.status) === "new",
  );

  const activeRequests = typedRequests.filter((request) =>
    ["reviewed", "contacted", "awaiting response", "in progress"].includes(
      normaliseStatus(request.status),
    ),
  );

  const completedRequests = typedRequests.filter((request) =>
    ["completed", "closed", "declined"].includes(
      normaliseStatus(request.status),
    ),
  );

  const uncategorisedRequests = typedRequests.filter((request) => {
    const status = normaliseStatus(request.status);

    return ![
      "new",
      "reviewed",
      "contacted",
      "awaiting response",
      "in progress",
      "completed",
      "closed",
      "declined",
    ].includes(status);
  });

  const teamMembersByRequest = typedTeamMembers.reduce<
    Record<string, TeamMember[]>
  >((groups, member) => {
    if (!groups[member.manager_request_id]) {
      groups[member.manager_request_id] = [];
    }

    groups[member.manager_request_id].push(member);
    return groups;
  }, {});

  const loadError = requestError || teamError;

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
                Allied Health Hive | Manager Enquiries
              </p>

              <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
                Review manager and organisation support requests.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#5f5b73] md:text-xl">
                View new enquiries, organisation details, team size, requested
                support, manager notes and any AHA email addresses submitted
                with the request.
              </p>
            </div>

            <aside className="rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-6 md:p-8">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <ShieldCheck size={27} />
              </div>

              <h2 className="mb-4 text-2xl font-bold">
                Private workforce information
              </h2>

              <p className="text-sm leading-relaxed text-[#3f5f5a]">
                These submissions may contain personal contact details and
                information about workplace support needs. Only authorised
                administrators should access or share this page.
              </p>
            </aside>
          </div>
        </section>

        {loadError ? (
          <section className="mb-8 rounded-4xl border border-red-200 bg-red-50 p-6 text-red-700">
            <div className="flex gap-3">
              <AlertTriangle size={22} className="mt-0.5 shrink-0" />

              <div>
                <h2 className="text-xl font-bold">
                  Some enquiry information could not be loaded
                </h2>

                <p className="mt-2 text-sm leading-relaxed">
                  {loadError.message}
                </p>
              </div>
            </div>
          </section>
        ) : null}

        <section className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            label="Total enquiries"
            value={typedRequests.length}
            text="All manager requests"
          />

          <SummaryCard
            label="New"
            value={newRequests.length}
            text="Awaiting review"
            warning={newRequests.length > 0}
          />

          <SummaryCard
            label="In progress"
            value={activeRequests.length}
            text="Reviewed or contacted"
          />

          <SummaryCard
            label="Completed"
            value={completedRequests.length}
            text="Closed requests"
          />
        </section>

        <RequestSection
          eyebrow="Action required"
          title="New manager enquiries"
          text="These requests have been submitted and are still marked as new."
          requests={newRequests}
          teamMembersByRequest={teamMembersByRequest}
          warning
          emptyTitle="No new manager enquiries"
          emptyText="There are no new requests waiting for review."
        />

        <RequestSection
          eyebrow="Follow-up underway"
          title="Active enquiries"
          text="These requests have been reviewed, contacted or are awaiting a response."
          requests={activeRequests}
          teamMembersByRequest={teamMembersByRequest}
          emptyTitle="No active enquiries"
          emptyText="Requests will appear here after their status is updated."
        />

        {uncategorisedRequests.length > 0 ? (
          <RequestSection
            eyebrow="Check status"
            title="Other enquiry statuses"
            text="These requests use a status that does not match the standard workflow."
            requests={uncategorisedRequests}
            teamMembersByRequest={teamMembersByRequest}
            warning
          />
        ) : null}

        <RequestSection
          eyebrow="Previous enquiries"
          title="Completed and closed requests"
          text="These enquiries are marked as completed, closed or declined."
          requests={completedRequests}
          teamMembersByRequest={teamMembersByRequest}
          emptyTitle="No completed enquiries yet"
          emptyText="Finished requests will appear here once their status is updated."
        />

        <section className="rounded-4xl bg-[#1e1b2e] p-8 text-white shadow-sm md:p-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#99f6e4]">
            Current workflow
          </p>

          <h2 className="max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
            Review the request, contact the manager and update its status in
            Supabase.
          </h2>

          <p className="mt-5 max-w-4xl text-base leading-relaxed text-[#d9d7e5] md:text-lg">
            This page now displays live submissions. The next development step
            will be adding protected buttons for changing the status and
            recording follow-up notes directly from the admin portal.
          </p>
        </section>
      </section>
    </main>
  );
}

function RequestSection({
  eyebrow,
  title,
  text,
  requests,
  teamMembersByRequest,
  warning = false,
  emptyTitle,
  emptyText,
}: {
  eyebrow: string;
  title: string;
  text: string;
  requests: ManagerRequest[];
  teamMembersByRequest: Record<string, TeamMember[]>;
  warning?: boolean;
  emptyTitle?: string;
  emptyText?: string;
}) {
  return (
    <section className="mb-10">
      <div className="mb-6">
        <p
          className={`mb-3 text-sm font-semibold uppercase tracking-[0.14em] ${
            warning ? "text-amber-700" : "text-[#0f766e]"
          }`}
        >
          {eyebrow}
        </p>

        <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>

        <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#6b6880]">
          {text}
        </p>
      </div>

      {requests.length > 0 ? (
        <div className="grid gap-5">
          {requests.map((request) => (
            <ManagerRequestCard
              key={request.id}
              request={request}
              teamMembers={teamMembersByRequest[request.id] || []}
              warning={warning}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title={emptyTitle || "No enquiries in this section"}
          text={emptyText || "There are no manager requests to display."}
        />
      )}
    </section>
  );
}

function ManagerRequestCard({
  request,
  teamMembers,
  warning = false,
}: {
  request: ManagerRequest;
  teamMembers: TeamMember[];
  warning?: boolean;
}) {
  const status = request.status || "new";

  const createdDate = request.created_at
    ? new Intl.DateTimeFormat("en-AU", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZone: "Australia/Melbourne",
      }).format(new Date(request.created_at))
    : "Date unavailable";

  const mailSubject = encodeURIComponent(
    `Allied Health Hive support for ${request.organisation}`,
  );

  const mailBody = encodeURIComponent(
    `Hi ${request.full_name},\n\nThank you for telling us about your AHA team at ${request.organisation}.\n\n`,
  );

  return (
    <article
      className={`rounded-4xl border bg-white p-6 shadow-sm md:p-8 ${
        warning ? "border-amber-200" : "border-[#e8e4de]"
      }`}
    >
      <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="mb-3 flex flex-wrap gap-2">
            <StatusBadge status={status} />

            <span className="inline-flex items-center gap-1 rounded-full bg-[#faf8f5] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#6b6880]">
              <UsersRound size={12} />
              {formatTeamSize(request.team_size)}
            </span>

            {request.role ? (
              <span className="inline-flex rounded-full bg-[#faf8f5] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#6b6880]">
                {request.role}
              </span>
            ) : null}
          </div>

          <h3 className="text-2xl font-bold md:text-3xl">
            {request.full_name}
          </h3>

          <p className="mt-2 flex items-center gap-2 text-base font-semibold text-[#0f766e]">
            <Building2 size={17} />
            {request.organisation}
          </p>
        </div>

        <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5 lg:min-w-72">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
            <Clock3 size={17} />
            Enquiry received
          </div>

          <p className="text-sm leading-relaxed">{createdDate}</p>
        </div>
      </div>

      <div className="mb-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ContactCard
          icon={<Mail size={18} />}
          label="Manager email"
          value={request.email}
          href={`mailto:${request.email}?subject=${mailSubject}&body=${mailBody}`}
        />

        <ContactCard
          icon={<Phone size={18} />}
          label="Phone"
          value={request.phone}
          href={request.phone ? `tel:${request.phone}` : undefined}
        />

        <ContactCard
          icon={<UserRound size={18} />}
          label="Role"
          value={request.role}
        />
      </div>

      <section className="mb-5 rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
          <ClipboardList size={18} />
          Support request and manager notes
        </div>

        {request.message ? (
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#1e1b2e]">
            {request.message}
          </p>
        ) : (
          <p className="text-sm text-[#6b6880]">
            No additional notes were submitted.
          </p>
        )}
      </section>

      <section className="mb-5 rounded-3xl border border-[#e8e4de] bg-white p-5">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
          <UsersRound size={18} />
          Team email addresses
        </div>

        {teamMembers.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <a
                key={member.id || `${request.id}-${member.email}-${index}`}
                href={`mailto:${member.email}`}
                className="rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-4 transition hover:border-[#0f766e]"
              >
                <p className="break-all text-sm font-semibold">
                  {member.email}
                </p>

                <p className="mt-1 text-xs uppercase tracking-widest text-[#6b6880]">
                  {member.status || "invited"}
                </p>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-sm leading-relaxed text-[#6b6880]">
            No team email addresses were submitted with this enquiry.
          </p>
        )}
      </section>

      <div className="flex flex-col gap-3 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#0f766e]">
            Recommended next action
          </p>

          <p className="mt-1 text-sm leading-relaxed text-[#3f5f5a]">
            Review the support request, email the manager and then update the
            enquiry status in Supabase.
          </p>
        </div>

        <a
          href={`mailto:${request.email}?subject=${mailSubject}&body=${mailBody}`}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
        >
          <Mail size={16} />
          Email manager
          <ExternalLink size={14} />
        </a>
      </div>
    </article>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | null;
  href?: string;
}) {
  const content = (
    <>
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
        {icon}
        {label}
      </div>

      <p className="break-all text-sm leading-relaxed text-[#1e1b2e]">
        {value || "Not provided"}
      </p>
    </>
  );

  if (href && value) {
    return (
      <a
        href={href}
        className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5 transition hover:border-[#0f766e]"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
      {content}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const normalised = normaliseStatus(status);

  const className =
    normalised === "new"
      ? "bg-amber-50 text-amber-700"
      : ["completed", "closed"].includes(normalised)
        ? "bg-[#eefbf5] text-[#047857]"
        : normalised === "declined"
          ? "bg-red-50 text-red-700"
          : "bg-[#f0fdfa] text-[#0f766e]";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${className}`}
    >
      {status}
    </span>
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
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-4xl border border-dashed border-[#e8e4de] bg-white p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
        <CheckCircle2 size={24} />
      </div>

      <h3 className="text-xl font-bold">{title}</h3>

      <p className="mt-2 text-base leading-relaxed text-[#6b6880]">
        {text}
      </p>
    </div>
  );
}

function normaliseStatus(status: string | null) {
  return String(status || "")
    .trim()
    .toLowerCase()
    .replaceAll("_", " ");
}

function formatTeamSize(teamSize: string) {
  const labels: Record<string, string> = {
    "1-5": "1–5 AHAs",
    "6-10": "6–10 AHAs",
    "11-20": "11–20 AHAs",
    "20+": "More than 20 AHAs",
    "Not sure": "Team size not confirmed",
  };

  return labels[teamSize] || teamSize;
}