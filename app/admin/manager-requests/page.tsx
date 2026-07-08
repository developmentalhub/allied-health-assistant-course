import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Clock,
  LockKeyhole,
  Mail,
  MessageSquareText,
  Phone,
  UserRound,
  Users,
  XCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase-server";

type ManagerTeamMember = {
  id: string;
  manager_request_id: string;
  email: string;
  full_name: string | null;
  status: string;
  created_at: string;
};

type Subscription = {
  email: string;
  status: string;
  current_period_end: string | null;
};

type TeamMemberWithSubscription = ManagerTeamMember & {
  subscription_status: string | null;
  current_period_end: string | null;
};

type ManagerPathwayRequest = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  organisation: string | null;
  role: string | null;
  team_size: string | null;
  message: string | null;
  status: string | null;
  created_at: string;
};

export default async function AdminManagerRequestsPage() {
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
    .single();

  if (profile?.role !== "admin" && profile?.role !== "superadmin") {
    redirect("/dashboard");
  }

  const { data: requests, error: requestsError } = await supabase
    .from("manager_pathway_requests")
    .select(
      "id, full_name, email, phone, organisation, role, team_size, message, status, created_at"
    )
    .order("created_at", { ascending: false });

  const { data: teamMembers, error: teamMembersError } = await supabase
    .from("manager_team_members")
    .select("id, manager_request_id, email, full_name, status, created_at")
    .order("created_at", { ascending: true });

  const { data: subscriptions, error: subscriptionsError } = await supabase
    .from("aha_subscriptions")
    .select("email, status, current_period_end");

  const typedRequests = (requests || []) as ManagerPathwayRequest[];
  const typedTeamMembers = (teamMembers || []) as ManagerTeamMember[];
  const typedSubscriptions = (subscriptions || []) as Subscription[];

  const subscriptionsByEmail = typedSubscriptions.reduce<
    Record<string, Subscription>
  >((groups, subscription) => {
    groups[subscription.email.toLowerCase()] = subscription;
    return groups;
  }, {});

  const teamMembersWithSubscription: TeamMemberWithSubscription[] =
    typedTeamMembers.map((member) => {
      const subscription = subscriptionsByEmail[member.email.toLowerCase()];

      return {
        ...member,
        subscription_status: subscription?.status || null,
        current_period_end: subscription?.current_period_end || null,
      };
    });

  const teamMembersByRequestId = teamMembersWithSubscription.reduce<
    Record<string, TeamMemberWithSubscription[]>
  >((groups, member) => {
    if (!groups[member.manager_request_id]) {
      groups[member.manager_request_id] = [];
    }

    groups[member.manager_request_id].push(member);
    return groups;
  }, {});

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
            Admin manager requests
          </p>

          <h1 className="mb-5 text-4xl font-bold leading-tight md:text-6xl">
            Manager and clinic hub requests.
          </h1>

          <p className="max-w-3xl text-xl leading-relaxed text-[#5f5b73]">
            Review clinic requests, see the team email addresses submitted by
            managers, and check whether those staff have already signed up for
            the AHA webinar membership.
          </p>
        </div>

        {requestsError ? (
          <ErrorBox
            title="Could not load manager requests"
            message={requestsError.message}
          />
        ) : null}

        {teamMembersError ? (
          <ErrorBox
            title="Could not load team email addresses"
            message={teamMembersError.message}
          />
        ) : null}

        {subscriptionsError ? (
          <ErrorBox
            title="Could not load membership subscriptions"
            message={subscriptionsError.message}
          />
        ) : null}

        <section className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-8 shadow-sm md:p-10">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
            <Building2 size={24} />
          </div>

          <h2 className="mb-4 text-3xl font-bold">Manager hub workflow</h2>

          <p className="max-w-3xl text-base leading-relaxed text-[#3f5f5a]">
            When a manager submits team emails, this page compares those emails
            with the AHA membership subscriptions table. This helps you see who
            is already active, who is trialing, and who still needs follow-up.
          </p>
        </section>

        {typedRequests.length > 0 ? (
          <section className="grid gap-5">
            {typedRequests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                teamMembers={teamMembersByRequestId[request.id] || []}
              />
            ))}
          </section>
        ) : (
          <EmptyState message="No manager or clinic hub requests have been submitted yet." />
        )}
      </section>
    </main>
  );
}

function RequestCard({
  request,
  teamMembers,
}: {
  request: ManagerPathwayRequest;
  teamMembers: TeamMemberWithSubscription[];
}) {
  const createdDate = new Intl.DateTimeFormat("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Australia/Melbourne",
  }).format(new Date(request.created_at));

  const signedUpCount = teamMembers.filter((member) =>
    ["active", "trialing"].includes(member.subscription_status || "")
  ).length;

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
            {request.organisation || "Organisation not supplied"}
          </h2>

          <div className="space-y-2 text-base leading-relaxed text-[#6b6880]">
            {request.full_name ? (
              <p className="flex items-start gap-2">
                <UserRound
                  className="mt-1 shrink-0 text-[#0f766e]"
                  size={16}
                />
                <span>{request.full_name}</span>
              </p>
            ) : null}

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

            {request.phone ? (
              <p className="flex items-start gap-2">
                <Phone className="mt-1 shrink-0 text-[#0f766e]" size={16} />
                <a
                  href={`tel:${request.phone}`}
                  className="font-semibold text-[#1e1b2e] underline decoration-[#99f6e4] underline-offset-4"
                >
                  {request.phone}
                </a>
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

      <div className="mb-4 grid gap-4 md:grid-cols-3">
        <InfoBox label="Team size" value={request.team_size} />
        <InfoBox
          label="Team emails submitted"
          value={String(teamMembers.length)}
        />
        <InfoBox
          label="Signed up or trialing"
          value={`${signedUpCount} of ${teamMembers.length}`}
        />
      </div>

      <section className="mb-4 rounded-2xl border border-[#99f6e4] bg-[#f0fdfa] p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
          <Users size={18} />
          Team email addresses
        </div>

        {teamMembers.length > 0 ? (
          <div className="grid gap-2 md:grid-cols-2">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <p className="text-sm leading-relaxed text-[#3f5f5a]">
            No individual team email addresses were submitted with this request.
          </p>
        )}
      </section>

      <div className="rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
          <MessageSquareText size={18} />
          Manager notes and interests
        </div>

        <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#6b6880]">
          {request.message || "No message supplied."}
        </p>
      </div>
    </article>
  );
}

function TeamMemberCard({
  member,
}: {
  member: TeamMemberWithSubscription;
}) {
  const status = member.subscription_status || "not signed up";

  const isActive = ["active", "trialing"].includes(status);
  const isCancelled = ["cancelled", "canceled", "unpaid"].includes(status);

  return (
    <div className="rounded-2xl border border-[#99f6e4] bg-white p-3">
      <a
        href={`mailto:${member.email}`}
        className="break-all text-sm font-semibold text-[#1e1b2e] underline decoration-[#99f6e4] underline-offset-4"
      >
        {member.email}
      </a>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-[#faf8f5] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#6b6880]">
          Manager list: {member.status}
        </span>

        <span
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${
            isActive
              ? "bg-[#f0fdfa] text-[#0f766e]"
              : isCancelled
                ? "bg-red-50 text-red-700"
                : "bg-[#faf8f5] text-[#6b6880]"
          }`}
        >
          {isActive ? <CheckCircle2 size={13} /> : null}
          {isCancelled ? <XCircle size={13} /> : null}
          {!isActive && !isCancelled ? <Clock size={13} /> : null}
          Membership: {status}
        </span>
      </div>
    </div>
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

function ErrorBox({ title, message }: { title: string; message: string }) {
  return (
    <div className="mb-8 rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
      <h2 className="mb-2 text-xl font-bold">{title}</h2>
      <p className="text-sm leading-relaxed">{message}</p>
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