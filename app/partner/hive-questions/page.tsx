import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  MessageCircleQuestion,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { createClient } from "@/lib/supabase-server";

type HiveQuestion = {
  id: string;
  full_name: string;
  email: string;
  role: string | null;
  question: string;
  can_share: boolean;
  created_at: string;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export default async function PartnerHiveQuestionsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/partner/hive-questions");
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

  const { data, error } = await supabase
    .from("webinar_questions")
    .select(
      "id, full_name, email, role, question, can_share, created_at",
    )
    .order("created_at", { ascending: false });

  const questions = (data || []) as HiveQuestion[];

  const shareableQuestions = questions.filter(
    (question) => question.can_share,
  );

  const privateQuestions = questions.filter(
    (question) => !question.can_share,
  );

  return (
    <main className="min-h-screen bg-[#fffaf3] px-5 py-10 text-[#1e1b2e] sm:px-6 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <Link
            href="/partner"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
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
                Hive questions
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#5f5b73] md:text-lg">
                Read the questions people are sending through to the Hive and
                notice the themes that could shape future webinars, blog
                articles, community conversations and practical resources.
              </p>
            </div>

            <div className="grid min-w-65 grid-cols-3 gap-3">
              <SummaryCard
                label="Total"
                value={questions.length}
              />

              <SummaryCard
                label="Shareable"
                value={shareableQuestions.length}
              />

              <SummaryCard
                label="Private"
                value={privateQuestions.length}
              />
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
              <p className="font-semibold text-[#1e1b2e]">
                Please check the sharing permission
              </p>

              <p className="mt-1 text-sm leading-relaxed text-[#3f5f5a]">
                Some people are happy for their question to be discussed
                publicly or anonymously. Others have asked for it to remain
                private. The permission is clearly shown on every question
                below.
              </p>
            </div>
          </div>
        </section>

        {error ? (
          <section className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-6">
            <h2 className="text-lg font-bold text-red-800">
              Questions could not be loaded
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-red-700">
              {error.message}
            </p>
          </section>
        ) : null}

        {!error && questions.length === 0 ? (
          <section className="mt-8 rounded-4xl border border-[#e8e4de] bg-white p-8 text-center shadow-sm">
            <MessageCircleQuestion
              size={34}
              className="mx-auto text-[#0f766e]"
            />

            <h2 className="mt-4 text-2xl font-bold">
              No Hive questions yet
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#6b6880]">
              Questions submitted through the Allied Health Hive will appear
              here.
            </p>
          </section>
        ) : null}

        {!error && questions.length > 0 ? (
          <section className="mt-10 grid gap-5">
            {questions.map((item) => (
              <article
                key={item.id}
                className="rounded-4xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-7"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={
                          item.can_share
                            ? "rounded-full bg-[#f0fdfa] px-3 py-1 text-xs font-semibold text-[#0f766e]"
                            : "rounded-full bg-[#fff7df] px-3 py-1 text-xs font-semibold text-[#6b5b45]"
                        }
                      >
                        {item.can_share
                          ? "Can be shared"
                          : "Keep private"}
                      </span>

                      {item.role ? (
                        <span className="rounded-full bg-[#faf8f5] px-3 py-1 text-xs font-semibold text-[#6b6880]">
                          {item.role}
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-5 flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                        <UserRound size={19} />
                      </div>

                      <div className="min-w-0">
                        <h2 className="text-lg font-bold">
                          {item.full_name}
                        </h2>

                        <a
                          href={`mailto:${item.email}`}
                          className="mt-1 inline-flex items-center gap-2 break-all text-sm font-semibold text-[#0f766e] hover:underline"
                        >
                          <Mail size={15} />
                          {item.email}
                        </a>

                        <p className="mt-2 text-xs text-[#6b6880]">
                          Received {formatDate(item.created_at)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
                        <MessageCircleQuestion size={17} />
                        Question
                      </div>

                      <p className="mt-3 whitespace-pre-wrap text-base leading-relaxed text-[#3f3b50]">
                        {item.question}
                      </p>
                    </div>

                    <div
                      className={
                        item.can_share
                          ? "mt-4 rounded-2xl border border-[#99f6e4] bg-[#f0fdfa] p-4"
                          : "mt-4 rounded-2xl border border-[#f4d9a6] bg-[#fff7df] p-4"
                      }
                    >
                      <p className="text-sm leading-relaxed text-[#5f5b73]">
                        {item.can_share
                          ? "This person has given permission for the question to be shared. You can use the theme in a webinar, blog or community conversation while still being thoughtful about identifying details."
                          : "This person has asked for the question to remain private. Use it only to understand what people may need support with and do not share identifying details publicly."}
                      </p>
                    </div>
                  </div>

                  <a
                    href={`mailto:${item.email}?subject=Allied Health Hive`}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-[#99f6e4] bg-white px-5 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#f0fdfa]"
                  >
                    <Mail size={16} />
                    Reply by email
                  </a>
                </div>
              </article>
            ))}
          </section>
        ) : null}
      </div>
    </main>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-[#e8e4de] bg-white p-4 text-center shadow-sm">
      <p className="text-2xl font-bold text-[#1e1b2e]">
        {value}
      </p>

      <p className="mt-1 text-xs font-semibold text-[#6b6880]">
        {label}
      </p>
    </div>
  );
}