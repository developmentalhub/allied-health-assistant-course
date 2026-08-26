import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  HeartHandshake,
  Mail,
  MessageCircleQuestion,
  Sparkles,
  UsersRound,
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
    <main className="min-h-screen bg-[#fffaf3] px-5 py-12 text-[#1e1b2e] sm:px-6 md:py-20">
      <section className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-4xl border border-[#f4d9a6] bg-white shadow-sm">
          <div className="bg-linear-to-br from-[#fff7df] via-[#f0fdfa] to-white p-8 md:p-12">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#0f766e] text-white shadow-sm">
              <CheckCircle2 size={34} />
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
              Your free place is saved
            </p>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
              {alreadyRegistered
                ? "You’re already on the list."
                : "We’re so glad you’re joining us."}
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#5f5b73]">
              {alreadyRegistered
                ? "Your email address is already registered, so there is nothing else you need to do. We will send the webinar link and reminder closer to the date."
                : "Your registration has been received. Robyn and Jess will send the webinar link and a friendly reminder closer to the session."}
            </p>
          </div>

          <div className="p-8 md:p-12">
            <section className="mb-8 rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-6 md:p-8">
              <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-start">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#0f766e]">
                  <CalendarDays size={27} />
                </div>

                <div>
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                    Free live webinar
                  </p>

                  <h2 className="text-2xl font-bold leading-tight md:text-3xl">
                    Inside The Allied Health Hive: Your Top 5 Questions Answered
                  </h2>

                  <p className="mt-4 text-base leading-relaxed text-[#3f5f5a]">
                    Tuesday 8 September 2026
                    <br />
                    12:00 pm to 1:00 pm Queensland time
                    <br />
                    Free live online session
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="mb-6">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                  What to expect
                </p>

                <h2 className="text-3xl font-bold">
                  A welcoming hour to understand what The Hive is really about.
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <InfoCard
                  icon={<UsersRound size={24} />}
                  title="Who The Hive is for"
                  text="Hear how Allied Health Hive is designed for Allied Health Assistants while also supporting the professionals, supervisors and managers around them."
                />

                <InfoCard
                  icon={<Sparkles size={24} />}
                  title="What is actually inside"
                  text="We will explain the community, webinars, practical tools, resources and reflective support being built through The Hive."
                />

                <InfoCard
                  icon={<MessageCircleQuestion size={24} />}
                  title="Your questions answered"
                  text="Robyn and Jess will answer the questions we hear most often and use submitted questions to shape the live conversation."
                />
              </div>
            </section>

            <section className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-6">
              <div className="flex gap-4">
                <HeartHandshake
                  className="mt-0.5 shrink-0 text-[#0f766e]"
                  size={24}
                />

                <div>
                  <h2 className="mb-2 text-xl font-bold">
                    Bring your real questions
                  </h2>

                  <p className="text-sm leading-relaxed text-[#3f5f5a]">
                    You do not need to understand The Hive before you come.
                    That is exactly what this first webinar is for. Bring the
                    things you are genuinely wondering about and we will talk
                    them through together.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8 rounded-3xl border border-[#f4d9a6] bg-[#fffaf0] p-6">
              <div className="flex gap-4">
                <Mail className="mt-0.5 shrink-0 text-[#b45309]" size={24} />

                <div>
                  <h2 className="mb-2 text-xl font-bold">
                    Keep an eye on your inbox
                  </h2>

                  <p className="text-sm leading-relaxed text-[#6b5b45]">
                    The joining link and reminder will be emailed closer to the
                    webinar. Check your junk or promotions folder if you do not
                    see it.
                  </p>
                </div>
              </div>
            </section>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/community"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Visit the free AHA community
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/tools"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0f766e] bg-white px-6 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#f0fdfa]"
              >
                Explore the free tools
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/webinars"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#e8e4de] bg-white px-6 py-3 text-sm font-semibold text-[#5f5b73] transition hover:bg-[#faf8f5]"
              >
                Back to webinar page
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0f766e]">
        {icon}
      </div>

      <h3 className="mb-2 text-lg font-bold">{title}</h3>

      <p className="text-sm leading-relaxed text-[#6b6880]">{text}</p>
    </article>
  );
}