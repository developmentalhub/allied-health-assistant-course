import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Mail,
  MessageCircleQuestion,
} from "lucide-react";

export default async function WebinarThankYouPage({
  searchParams,
}: {
  searchParams?: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const status = params?.status;

  const alreadyRegistered = status === "already-registered";

  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-14 text-[#1e1b2e] md:py-20">
      <section className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-[#99f6e4] bg-white p-8 shadow-sm md:p-12">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
            <CheckCircle2 size={30} />
          </div>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
            Webinar registration
          </p>

          <h1 className="mb-5 text-4xl font-bold leading-tight md:text-5xl">
            {alreadyRegistered
              ? "You’re already registered."
              : "Thank you for registering."}
          </h1>

          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-[#6b6880]">
            {alreadyRegistered
              ? "This email address is already on the webinar list, so there is nothing else you need to do."
              : "Your registration has been received. Robyn and Jess will email the webinar link and reminder closer to the date."}
          </p>

          <div className="mb-8 rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <CalendarDays size={24} />
            </div>

            <h2 className="mb-3 text-2xl font-bold">
              Free webinar: Meet Robyn and Jess + Your Questions, Answered
            </h2>

            <p className="text-base leading-relaxed text-[#6b6880]">
              Tuesday 4 August 2026, 12pm to 1pm QLD time. Free to attend.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
              <Mail className="mb-3 text-[#0f766e]" size={24} />

              <h3 className="mb-2 text-lg font-bold">
                Check your inbox later
              </h3>

              <p className="text-sm leading-relaxed text-[#6b6880]">
                The joining link and reminder will be emailed closer to the
                webinar date.
              </p>
            </div>

            <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
              <MessageCircleQuestion
                className="mb-3 text-[#0f766e]"
                size={24}
              />

              <h3 className="mb-2 text-lg font-bold">
                Questions are welcome
              </h3>

              <p className="text-sm leading-relaxed text-[#6b6880]">
                If you submitted a question, Robyn and Jess will use the themes
                to shape the session.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
            >
              Back to home
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/community"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-6 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
            >
              Visit the free community
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}