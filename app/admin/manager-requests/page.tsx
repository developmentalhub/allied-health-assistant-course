import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  LockKeyhole,
  Mail,
  MessageSquareText,
  Phone,
  UserRound,
  Users,
} from "lucide-react";
import { createClient } from "@/lib/supabase-server";

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

  const { data: requests, error } = await supabase
    .from("manager_pathway_requests")
    .select(
      "id, full_name, email, phone, organisation, role, team_size, message, status, created_at"
    )
    .order("created_at", { ascending: false });

  const typedRequests = (requests || []) as ManagerPathwayRequest[];

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
            Manager and clinic enquiries.
          </h1>

          <p className="max-w-3xl text-xl leading-relaxed text-[#5f5b73]">
            Review enquiries from clinic owners, team leaders and managers who
            are interested in AHA Professional Development for their service.
          </p>
        </div>

        {error ? (
          <div className="mb-8 rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
            <h2 className="mb-2 text-xl font-bold">
              Could not load manager requests
            </h2>
            <p className="text-sm leading-relaxed">{error.message}</p>
          </div>
        ) : null}

        <section className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-8 shadow-sm md:p-10">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
            <Building2 size={24} />
          </div>

          <h2 className="mb-4 text-3xl font-bold">Team quote workflow</h2>

          <p className="max-w-3xl text-base leading-relaxed text-[#3f5f5a]">
            For now, use this page as the simple enquiry list. When a clinic is
            interested, contact them directly and decide whether they need
            individual $57/month memberships or a custom team quote.
          </p>
        </section>

        {typedRequests.length > 0 ? (
          <section className="grid gap-5">
            {typedRequests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </section>
        ) : (
          <EmptyState message="No manager or clinic enquiries have been submitted yet." />
        )}
      </section>
    </main>
  );
}

function RequestCard({ request }: { request: ManagerPathwayRequest }) {
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

            {request.organisation ? (
              <p className="flex items-start gap-2">
                <Building2
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
        <InfoBox label="Organisation" value={request.organisation} />
        <InfoBox label="Role" value={request.role} />
        <InfoBox label="Team size" value={request.team_size} />
        <InfoBox label="Contact person" value={request.full_name} />
      </div>

      <div className="mt-4 rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
          <MessageSquareText size={18} />
          Message
        </div>

        <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#6b6880]">
          {request.message || "No message supplied."}
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