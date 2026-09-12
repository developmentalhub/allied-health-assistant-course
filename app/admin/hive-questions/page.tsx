import Link from "next/link";
import { redirect } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Mail,
  MessageCircleHeart,
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

export default async function HiveQuestionsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/admin/hive-questions");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (
    profile?.role !== "admin" &&
    profile?.role !== "superadmin"
  ) {
    redirect("/dashboard");
  }

  const { data: questions, error } = await supabase
    .from("webinar_questions")
    .select(
      "id, full_name, email, role, question, can_share, created_at",
    )
    .order("created_at", { ascending: false });

  const typedQuestions = (questions || []) as HiveQuestion[];

  const shareableQuestions = typedQuestions.filter(
    (question) => question.can_share,
  );

  const privateQuestions = typedQuestions.filter(
    (question) => !question.can_share,
  );

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
                Allied Health Hive | Community Questions
              </p>

              <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
                Listen to what the Hive is asking.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#5f5b73] md:text-xl">
                Review questions submitted by Allied Health
                Assistants, allied health professionals, managers and
                other people connecting with the Hive.
              </p>

              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#5f5b73]">
                These questions can help Robyn and Jess understand what
                people actually need before deciding which webinars,
                conversations, videos or resources to create next.
              </p>
            </div>

            <aside className="rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-6 md:p-8">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <ShieldCheck size={27} />
              </div>

              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Private admin area
              </p>

              <h2 className="mb-4 text-2xl font-bold">
                Treat every question with care.
              </h2>

              <p className="text-sm leading-relaxed text-[#3f5f5a]">
                Submissions may contain names, email addresses and
                personal or workplace information. Only approved Hive
                administrators should access this page.
              </p>
            </aside>
          </div>
        </section>

        {error ? (
          <section className="mb-8 rounded-4xl border border-red-200 bg-red-50 p-6 text-red-700">
            <div className="flex gap-3">
              <AlertTriangle
                size={22}
                className="mt-0.5 shrink-0"
              />

              <div>
                <h2 className="text-xl font-bold">
                  Questions could not be loaded
                </h2>

                <p className="mt-2 text-sm leading-relaxed">
                  {error.message}
                </p>
              </div>
            </div>
          </section>
        ) : null}

        <section className="mb-8 grid gap-5 sm:grid-cols-3">
          <SummaryCard
            label="Total questions"
            value={typedQuestions.length}
            text="All questions received"
          />

          <SummaryCard
            label="Can be shared"
            value={shareableQuestions.length}
            text="Permission given to discuss"
          />

          <SummaryCard
            label="Keep private"
            value={privateQuestions.length}
            text="Do not share publicly"
          />
        </section>

        <section className="mb-10">
          <div className="mb-6 max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Latest questions
            </p>

            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              What is the community wondering about?
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#6b6880]">
              Look for repeated themes before deciding what to create
              next. A question might become a community conversation,
              webinar topic, short video, article or future member
              resource.
            </p>
          </div>

          {typedQuestions.length > 0 ? (
            <div className="grid gap-5">
              {typedQuestions.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </section>

        <section className="rounded-4xl bg-[#1e1b2e] p-8 text-white shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#99f6e4]">
                Community-led development
              </p>

              <h2 className="max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
                Let the questions help shape what the Hive builds next.
              </h2>

              <p className="mt-5 max-w-4xl text-base leading-relaxed text-[#d9d7e5] md:text-lg">
                You do not need to guess which content people need.
                Notice the patterns in these questions, keep the
                conversation going and create deeper learning when the
                same needs continue to appear.
              </p>
            </div>

            <Link
              href="/community"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
            >
              <MessageCircleHeart size={18} />
              View community
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}

function QuestionCard({
  question,
}: {
  question: HiveQuestion;
}) {
  const createdDate = new Intl.DateTimeFormat("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Australia/Melbourne",
  }).format(new Date(question.created_at));

  const emailSubject = encodeURIComponent(
    "Your Allied Health Hive question",
  );

  const emailBody = encodeURIComponent(
    `Hi ${question.full_name},\n\nThank you for sending us your question through Allied Health Hive.\n\n`,
  );

  return (
    <article className="rounded-4xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="mb-3 flex flex-wrap gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${
                question.can_share
                  ? "bg-[#eefbf5] text-[#047857]"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {question.can_share
                ? "Permission to share"
                : "Keep private"}
            </span>

            {question.role ? (
              <span className="rounded-full bg-[#faf8f5] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#6b6880]">
                {question.role}
              </span>
            ) : null}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <UserRound size={20} />
            </div>

            <div>
              <h3 className="text-xl font-bold md:text-2xl">
                {question.full_name}
              </h3>

              <a
                href={`mailto:${question.email}`}
                className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
              >
                <Mail size={14} />
                {question.email}
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5 lg:min-w-72">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
            <Clock3 size={17} />
            Question received
          </div>

          <p className="text-sm leading-relaxed">
            {createdDate}
          </p>
        </div>
      </div>

      <section className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5 md:p-6">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
          <MessageCircleHeart size={18} />
          Their question
        </div>

        <p className="whitespace-pre-wrap text-base leading-relaxed text-[#1e1b2e]">
          {question.question}
        </p>
      </section>

      <div className="mt-5 flex flex-col gap-4 rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#1e1b2e]">
            {question.can_share
              ? "This person has given permission for the question to be discussed."
              : "This question should remain private."}
          </p>

          <p className="mt-1 text-sm leading-relaxed text-[#6b6880]">
            {question.can_share
              ? "Do not share their email address or unnecessary identifying information."
              : "Use it only to understand their support needs unless they give further permission."}
          </p>
        </div>

        <a
          href={`mailto:${question.email}?subject=${emailSubject}&body=${emailBody}`}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
        >
          <Mail size={16} />
          Reply by email
        </a>
      </div>
    </article>
  );
}

function SummaryCard({
  label,
  value,
  text,
}: {
  label: string;
  value: number;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
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

function EmptyState() {
  return (
    <div className="rounded-4xl border border-dashed border-[#e8e4de] bg-white p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
        <CheckCircle2 size={24} />
      </div>

      <h3 className="text-xl font-bold">
        No Hive questions yet
      </h3>

      <p className="mx-auto mt-2 max-w-xl text-base leading-relaxed text-[#6b6880]">
        Questions submitted through the Hive question form will appear
        here.
      </p>
    </div>
  );
}