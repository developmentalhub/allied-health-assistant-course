import Link from "next/link";
import { redirect } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  CheckCircle2,
  ClipboardList,
  Clock3,
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

export default async function PartnerManagerEnquiriesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/partner/manager-enquiries");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .maybeSingle();

  const allowedRoles = ["partner", "admin", "superadmin"];

  if (!profile?.role || !allowedRoles.includes(profile.role)) {
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
    <main className="min-h-screen bg-[#fffaf3] px-5 py-10 text-[#1e1b2e] sm:px-6 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <Link
            href="/partner"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e] transition hover:text-[#0d6962]"
          >
            <ArrowLeft size={16} />
            Back to Hive Management
          </Link>
        </div>

        <section className="rounded-4xl border border-[#f4d9a6] bg-linear-to-br from-[#fff7df] via-white to-[#f0fdfa] p-7 shadow-sm md:p-10">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                <ShieldCheck size={18} />
                Allied Health Hive Management
              </div>

              <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                Manager enquiries
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#5f5b73] md:text-lg">
                See which managers and organisations are reaching out to the
                Hive, what support they are looking for and which team members
                they have included in their enquiry.
              </p>
            </div>

            <div className="rounded-3xl border border-[#99f6e4] bg-white px-6 py-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Total enquiries
              </p>

              <p className="mt-1 text-4xl font-bold">
                {typedRequests.length}
              </p>

              <p className="mt-1 text-sm text-[#6b6880]">
                {newRequests.length} currently new
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
          <div className="flex gap-3">
            <ShieldCheck
              size={20}
              className="mt-0.5 shrink-0 text-[#0f766e]"
            />

            <div>
              <p className="font-semibold">
                Private workforce information
              </p>

              <p className="mt-1 text-sm leading-relaxed text-[#3f5f5a]">
                These enquiries can include personal contact information and
                workplace support needs. This area is for authorised Hive team
                members only.
              </p>
            </div>
          </div>
        </section>

        {loadError ? (
          <section className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
            <div className="flex gap-3">
              <AlertTriangle
                size={22}
                className="mt-0.5 shrink-0"
              />

              <div>
                <h2 className="text-lg font-bold">
                  Some enquiry information could not be loaded
                </h2>

                <p className="mt-2 text-sm leading-relaxed">
                  {loadError.message}
                </p>
              </div>
            </div>
          </section>
        ) : null}

        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            label="Total enquiries"
            value={typedRequests.length}
            text="All manager requests"
          />

          <SummaryCard
            label="New"
            value={newRequests.length}
            text="Waiting to be reviewed"
            warning={newRequests.length > 0}
          />

          <SummaryCard
            label="In progress"
            value={activeRequests.length}
            text="Already being followed up"
          />

          <SummaryCard
            label="Completed"
            value={completedRequests.length}
            text="Previous enquiries"
          />
        </section>

        <div className="mt-10">
          <RequestSection
            eyebrow="New interest"
            title="New manager enquiries"
            text="These organisations have recently reached out to the Allied Health Hive."
            requests={newRequests}
            teamMembersByRequest={teamMembersByRequest}
            warning
            emptyTitle="No new enquiries"
            emptyText="There are currently no new manager enquiries waiting."
          />

          <RequestSection
            eyebrow="Conversations underway"
            title="Active enquiries"
            text="These managers have already moved beyond the initial enquiry stage."
            requests={activeRequests}
            teamMembersByRequest={teamMembersByRequest}
            emptyTitle="No active enquiries"
            emptyText="Active manager conversations will appear here."
          />

          {uncategorisedRequests.length > 0 ? (
            <RequestSection
              eyebrow="Other"
              title="Other enquiry statuses"
              text="These requests currently use another workflow status."
              requests={uncategorisedRequests}
              teamMembersByRequest={teamMembersByRequest}
            />
          ) : null}

          <RequestSection
            eyebrow="Previous conversations"
            title="Completed and closed enquiries"
            text="These organisations have enquiries that are now marked as completed, closed or declined."
            requests={completedRequests}
            teamMembersByRequest={teamMembersByRequest}
            emptyTitle="No completed enquiries yet"
            emptyText="Completed enquiries will appear here."
          />
        </div>

        <section className="rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-7 md:p-9">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#0f766e]">
              <UsersRound size={21} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Use these enquiries to help guide the Hive
              </h2>

              <p className="mt-2 max-w-4xl text-sm leading-relaxed text-[#3f5f5a]">
                Manager enquiries can help Robyn and Jess notice what
                organisations are struggling with, what AHA teams need more
                support around and which topics may be worth bringing into a
                future webinar, blog or community conversation.
              </p>
            </div>
          </div>
        </section>
      </div>
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

        <h2 className="text-3xl font-bold">
          {title}
        </h2>

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
          title={emptyTitle || "No enquiries"}
          text={emptyText || "There are no enquiries in this section."}
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
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={status} />

            <span className="inline-flex items-center gap-1 rounded-full bg-[#faf8f5] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#6b6880]">
              <UsersRound size={12} />
              {formatTeamSize(request.team_size)}
            </span>

            {request.role ? (
              <span className="rounded-full bg-[#faf8f5] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#6b6880]">
                {request.role}
              </span>
            ) : null}
          </div>

          <h3 className="mt-4 text-2xl font-bold">
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

          <p className="text-sm leading-relaxed">
            {createdDate}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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

      <section className="mt-5 rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
          <ClipboardList size={18} />
          Support request and manager notes
        </div>

        {request.message ? (
          <p className="whitespace-pre-wrap text-sm leading-relaxed">
            {request.message}
          </p>
        ) : (
          <p className="text-sm text-[#6b6880]">
            No additional notes were submitted.
          </p>
        )}
      </section>

      <section className="mt-5 rounded-3xl border border-[#e8e4de] bg-white p-5">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
          <UsersRound size={18} />
          Team email addresses
        </div>

        {teamMembers.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <a
                key={
                  member.id ||
                  `${request.id}-${member.email}-${index}`
                }
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

      <div className="mt-5 flex flex-col gap-4 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#0f766e]">
            Want to follow this up?
          </p>

          <p className="mt-1 text-sm leading-relaxed text-[#3f5f5a]">
            You can contact the manager directly. Their enquiry record remains
            unchanged.
          </p>
        </div>

        <a
          href={`mailto:${request.email}?subject=${mailSubject}&body=${mailBody}`}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
        >
          <Mail size={16} />
          Email manager
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

      <p className="break-all text-sm leading-relaxed">
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

      <p className="mt-3 text-4xl font-bold">
        {value}
      </p>

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

      <h3 className="text-xl font-bold">
        {title}
      </h3>

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