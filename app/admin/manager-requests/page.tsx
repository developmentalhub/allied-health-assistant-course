import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  UsersRound,
} from "lucide-react";
import { createClient } from "@/lib/supabase-server";

type ManagerRequest = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  organisation: string | null;
  role: string | null;
  team_size: string | null;
  message: string | null;
  status: string | null;
  created_at: string | null;
};

type TeamMember = {
  id: string;
  manager_request_id: string;
  email: string;
  full_name: string | null;
  status: string | null;
  created_at: string | null;
};

export default async function AdminManagerRequestsPage() {
  const supabase = await createClient();

  const { data: requests, error: requestsError } = await supabase
    .from("manager_pathway_requests")
    .select(
      "id, full_name, email, phone, organisation, role, team_size, message, status, created_at",
    )
    .order("created_at", { ascending: false });

  const { data: teamMembers, error: teamMembersError } = await supabase
    .from("manager_team_members")
    .select(
      "id, manager_request_id, email, full_name, status, created_at",
    )
    .order("created_at", { ascending: false });

  const managerRequests = (requests || []) as ManagerRequest[];
  const members = (teamMembers || []) as TeamMember[];

  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-12 text-[#1e1b2e]">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/admin"
              className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e] hover:underline"
            >
              <ArrowLeft size={16} />
              Back to admin
            </Link>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Manager leads
            </p>

            <h1 className="text-4xl font-bold md:text-5xl">
              Manager pathway requests
            </h1>

            <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#6b6880]">
              These are clinics or managers asking about team access, monthly
              webinars, 1:1 reflective practice, or a tailored quote.
            </p>
          </div>
        </div>

        {(requestsError || teamMembersError) ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-800">
            <h2 className="mb-2 text-xl font-bold">Something needs fixing</h2>

            {requestsError ? (
              <p className="mb-2 text-sm">
                Manager requests error: {requestsError.message}
              </p>
            ) : null}

            {teamMembersError ? (
              <p className="text-sm">
                Team members error: {teamMembersError.message}
              </p>
            ) : null}
          </div>
        ) : null}

        {!requestsError && managerRequests.length === 0 ? (
          <div className="rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm">
            <h2 className="mb-2 text-2xl font-bold">No manager requests yet</h2>
            <p className="text-base leading-relaxed text-[#6b6880]">
              When a manager completes the team quote form, their request will
              appear here.
            </p>
          </div>
        ) : null}

        <div className="grid gap-6">
          {managerRequests.map((request) => {
            const linkedMembers = members.filter(
              (member) => member.manager_request_id === request.id,
            );

            return (
              <article
                key={request.id}
                className="rounded-4xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8"
              >
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="mb-3 inline-flex rounded-full bg-[#f0fdfa] px-3 py-1 text-xs font-semibold text-[#0f766e]">
                      {request.status || "new"}
                    </div>

                    <h2 className="text-2xl font-bold">
                      {request.organisation || "Unknown organisation"}
                    </h2>

                    <p className="mt-1 text-base text-[#6b6880]">
                      {request.full_name || "No name added"}
                      {request.role ? ` · ${request.role}` : ""}
                    </p>
                  </div>

                  <div className="rounded-3xl bg-[#faf8f5] px-5 py-4 text-left md:text-right">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                      Team size
                    </p>
                    <p className="mt-1 text-2xl font-bold">
                      {request.team_size || "Not added"}
                    </p>
                  </div>
                </div>

                <div className="mb-6 grid gap-3 md:grid-cols-3">
                  <InfoCard
                    icon={<Mail size={18} />}
                    label="Email"
                    value={request.email || "Not added"}
                  />

                  <InfoCard
                    icon={<Phone size={18} />}
                    label="Phone"
                    value={request.phone || "Not added"}
                  />

                  <InfoCard
                    icon={<Building2 size={18} />}
                    label="Organisation"
                    value={request.organisation || "Not added"}
                  />
                </div>

                {request.message ? (
                  <div className="mb-6 rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
                    <p className="mb-2 text-sm font-semibold text-[#0f766e]">
                      Request details
                    </p>

                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-[#5f5b73]">
                      {request.message}
                    </pre>
                  </div>
                ) : null}

                <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <UsersRound size={18} className="text-[#0f766e]" />
                    <p className="text-sm font-semibold text-[#0f766e]">
                      Team members submitted
                    </p>
                  </div>

                  {linkedMembers.length > 0 ? (
                    <div className="grid gap-2">
                      {linkedMembers.map((member) => (
                        <div
                          key={member.id}
                          className="rounded-2xl bg-white px-4 py-3 text-sm text-[#5f5b73]"
                        >
                          {member.email}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed text-[#3f5f5a]">
                      No team emails were added with this request.
                    </p>
                  )}
                </div>

                <p className="mt-4 text-xs text-[#8a8798]">
                  Submitted:{" "}
                  {request.created_at
                    ? new Date(request.created_at).toLocaleString("en-AU")
                    : "Unknown"}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-4">
      <div className="mb-2 flex items-center gap-2 text-[#0f766e]">
        {icon}
        <p className="text-xs font-semibold uppercase tracking-[0.12em]">
          {label}
        </p>
      </div>

      <p className="break-words text-sm font-semibold text-[#1e1b2e]">
        {value}
      </p>
    </div>
  );
}