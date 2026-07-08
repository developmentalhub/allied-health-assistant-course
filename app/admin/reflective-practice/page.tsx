import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Mail,
  MessageCircleHeart,
  UserRound,
} from "lucide-react";
import { createClient } from "@/lib/supabase-server";

type ReflectivePracticeRequest = {
  id: string;
  name: string | null;
  email: string | null;
  role: string | null;
  organisation: string | null;
  preferred_provider: string | null;
  session_goal: string | null;
  current_context: string | null;
  supervision_context: string | null;
  what_have_you_tried: string | null;
  what_feels_unclear: string | null;
  hoped_outcome: string | null;
  understands_not_supervision: boolean | null;
  status: string | null;
  created_at: string | null;
};

export default async function AdminReflectivePracticePage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reflective_practice_requests")
    .select(
      "id, name, email, role, organisation, preferred_provider, session_goal, current_context, supervision_context, what_have_you_tried, what_feels_unclear, hoped_outcome, understands_not_supervision, status, created_at",
    )
    .order("created_at", { ascending: false });

  const requests = (data || []) as ReflectivePracticeRequest[];

  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-12 text-[#1e1b2e]">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Link
            href="/admin"
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e] hover:underline"
          >
            <ArrowLeft size={16} />
            Back to admin
          </Link>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            1:1 reflective support
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Reflective practice requests
          </h1>

          <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#6b6880]">
            These are AHAs, managers or team members asking for 1:1 reflective
            support. Use this page to quickly see what they need and who they
            prefer to speak with.
          </p>
        </div>

        {error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-800">
            <h2 className="mb-2 text-xl font-bold">Something needs fixing</h2>
            <p className="text-sm">{error.message}</p>
          </div>
        ) : null}

        {!error && requests.length === 0 ? (
          <div className="rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm">
            <h2 className="mb-2 text-2xl font-bold">
              No reflective practice requests yet
            </h2>
            <p className="text-base leading-relaxed text-[#6b6880]">
              When someone completes the 1:1 support form, their request will
              appear here.
            </p>
          </div>
        ) : null}

        <div className="grid gap-6">
          {requests.map((request) => (
            <article
              key={request.id}
              className="rounded-4xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8"
            >
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="mb-3 inline-flex rounded-full bg-[#f0fdfa] px-3 py-1 text-xs font-semibold text-[#0f766e]">
                    {request.status || "reflection_received"}
                  </div>

                  <h2 className="text-2xl font-bold">
                    {request.name || "Unknown name"}
                  </h2>

                  <p className="mt-1 text-base text-[#6b6880]">
                    {request.role || "Role not added"}
                    {request.organisation
                      ? ` · ${request.organisation}`
                      : ""}
                  </p>
                </div>

                <div className="rounded-3xl bg-[#faf8f5] px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                    Preferred provider
                  </p>
                  <p className="mt-1 text-lg font-bold">
                    {request.preferred_provider || "Not selected"}
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
                  icon={<UserRound size={18} />}
                  label="Role"
                  value={request.role || "Not added"}
                />

                <InfoCard
                  icon={<Building2 size={18} />}
                  label="Organisation"
                  value={request.organisation || "Not added"}
                />
              </div>

              <div className="mb-6 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
                <div className="mb-3 flex items-center gap-2">
                  <MessageCircleHeart
                    size={18}
                    className="text-[#0f766e]"
                  />
                  <p className="text-sm font-semibold text-[#0f766e]">
                    Support focus
                  </p>
                </div>

                <p className="text-base font-semibold text-[#1e1b2e]">
                  {request.session_goal || "No focus added"}
                </p>
              </div>

              <DetailsBlock
                label="Current context"
                value={request.current_context}
              />

              <DetailsBlock
                label="Supervision context"
                value={request.supervision_context}
              />

              <DetailsBlock
                label="What have they tried?"
                value={request.what_have_you_tried}
              />

              <DetailsBlock
                label="What feels unclear?"
                value={request.what_feels_unclear}
              />

              <DetailsBlock
                label="Hoped outcome"
                value={request.hoped_outcome}
              />

              <div className="mt-6 rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
                <p className="text-sm font-semibold text-[#0f766e]">
                  Reflective practice disclaimer accepted
                </p>
                <p className="mt-1 text-sm text-[#6b6880]">
                  {request.understands_not_supervision ? "Yes" : "Not recorded"}
                </p>
              </div>

              <p className="mt-4 text-xs text-[#8a8798]">
                Submitted:{" "}
                {request.created_at
                  ? new Date(request.created_at).toLocaleString("en-AU")
                  : "Unknown"}
              </p>
            </article>
          ))}
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

      <p className="wrap-break-word text-sm font-semibold text-[#1e1b2e]">
        {value}
      </p>
    </div>
  );
}

function DetailsBlock({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  if (!value) {
    return null;
  }

  return (
    <div className="mb-4 rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
      <p className="mb-2 text-sm font-semibold text-[#0f766e]">{label}</p>

      <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#5f5b73]">
        {value}
      </p>
    </div>
  );
}