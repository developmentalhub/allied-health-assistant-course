import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  HeartHandshake,
  Lightbulb,
  Mail,
  MessageCircleQuestion,
  NotebookPen,
  Route,
  Sparkles,
  UsersRound,
} from "lucide-react";

const JESS_EMAIL = "jess@spectrumvillage.com.au";

export default async function SubscribePage({
  searchParams,
}: {
  searchParams?: Promise<{ webinar?: string }>;
}) {
  const params = await searchParams;
  const webinarStatus = params?.webinar;

  return (
    <main className="min-h-screen bg-[#fffaf3] px-5 py-12 text-[#1e1b2e] sm:px-6 md:py-20">
      <section className="mx-auto max-w-7xl">
        <section className="mb-8 overflow-hidden rounded-4xl border border-[#f4d9a6] bg-white shadow-sm">
          <div className="grid gap-8 bg-linear-to-br from-[#fff7df] via-white to-[#f0fdfa] p-7 md:p-12 lg:grid-cols-[1fr_0.72fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
                Allied Health Hive | Workforce Development
              </p>

              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0f766e] shadow-sm">
                <Sparkles size={16} />
                Free live webinar for Allied Health Assistants
              </div>

              <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
                Practical ideas for more confident, engaging AHA sessions.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#5f5b73] md:text-xl">
                Join Robyn and Jess for an hour of practical strategies,
                creative session ideas and supportive conversation shaped
                around the realities of AHA work.
              </p>

              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#5f5b73]">
                This webinar is the beginning of a wider learning pathway
                covering regulation, documentation, session planning,
                communication with supervising professionals, practical activity
                design and empowering families.
              </p>

              <a
                href="#register"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Register for free
                <ArrowRight size={18} />
              </a>
            </div>

            <aside className="rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-6 md:p-8">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <CalendarDays size={27} />
              </div>

              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Free live webinar
              </p>

              <h2 className="mb-5 text-3xl font-bold">
                Creative and practical ideas for AHA sessions
              </h2>

              <div className="grid gap-3">
                <CheckItem text="Tuesday 8 September 2026" />
                <CheckItem text="12:00 pm to 1:00 pm Queensland time" />
                <CheckItem text="Live online and free to attend" />
                <CheckItem text="Questions can be submitted in advance" />
                <CheckItem text="No payment details required" />
              </div>
            </aside>
          </div>
        </section>

        <section className="mb-8 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-10">
          <div className="mb-8 max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              We understand the wider AHA role
            </p>

            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              AHA work involves much more than delivering an activity.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#6b6880] md:text-lg">
              You are preparing sessions, supporting regulation, adapting within
              professional direction, recording useful observations, helping
              families understand strategies and communicating with the wider
              allied health team.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <LearningCard
              icon={<HeartHandshake size={24} />}
              title="Regulation and engagement"
              text="Understand what may sit underneath refusal, frustration, avoidance or reduced participation."
            />

            <LearningCard
              icon={<NotebookPen size={24} />}
              title="Documentation"
              text="Build confidence recording clear, objective and useful observations after sessions."
            />

            <LearningCard
              icon={<ClipboardCheck size={24} />}
              title="Session planning"
              text="Prepare equipment, clarify the purpose and create flexible options before sessions begin."
            />

            <LearningCard
              icon={<UsersRound size={24} />}
              title="Empowering families"
              text="Help families understand activities and use practical strategies within daily routines."
            />

            <LearningCard
              icon={<MessageCircleQuestion size={24} />}
              title="Professional communication"
              text="Ask clearer questions and provide useful feedback to supervising professionals."
            />

            <LearningCard
              icon={<Lightbulb size={24} />}
              title="Practical activity ideas"
              text="Use low-cost equipment and creative adaptations to make sessions more engaging."
            />
          </div>
        </section>

        <section className="mb-8 rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-7 shadow-sm md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Inside the free webinar
              </p>

              <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                Ideas you can take into your next session.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <WebinarPoint
                icon={<Route size={22} />}
                title="Masking tape activities"
                text="Create pathways, targets and movement challenges supporting coordination, balance and attention."
              />

              <WebinarPoint
                icon={<Lightbulb size={22} />}
                title="Everyday equipment"
                text="Use balls, cups, paper, socks and simple materials in new and engaging ways."
              />

              <WebinarPoint
                icon={<HeartHandshake size={22} />}
                title="Supporting regulation"
                text="Explore what to consider when a child withdraws, refuses or becomes frustrated."
              />

              <WebinarPoint
                icon={<ClipboardCheck size={22} />}
                title="When Plan A changes"
                text="Adapt the pace, setup, instructions or challenge while staying within professional direction."
              />
            </div>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[1fr_0.68fr] lg:items-start">
          <section
            id="register"
            className="scroll-mt-24 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-9"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Free webinar registration
            </p>

            <h2 className="text-3xl font-bold leading-tight md:text-4xl">
              Save your place.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#6b6880]">
              Add your name and email below. We will email your joining link and
              a reminder closer to the webinar.
            </p>

            {webinarStatus === "missing-details" && (
              <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-5">
                <p className="font-semibold text-red-800">
                  Please add your name and email address.
                </p>

                <p className="mt-2 text-sm leading-relaxed text-red-700">
                  Then submit the form again so we can complete your
                  registration.
                </p>
              </div>
            )}

            {webinarStatus === "save-error" && (
              <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-5">
                <p className="font-semibold text-red-800">
                  Your registration could not be saved.
                </p>

                <p className="mt-2 text-sm leading-relaxed text-red-700">
                  Please try again or contact Jess using the email address on
                  this page.
                </p>
              </div>
            )}

            <form
              action="/api/webinar-registration"
              method="POST"
              className="mt-7 grid gap-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  label="Your name"
                  name="name"
                  type="text"
                  placeholder="Jane Smith"
                />

                <FormField
                  label="Your email"
                  name="email"
                  type="email"
                  placeholder="jane@example.com"
                />
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[#1e1b2e]">
                  What would you most like help with?
                  <span className="ml-1 font-normal text-[#6b6880]">
                    Optional
                  </span>
                </span>

                <textarea
                  name="question"
                  rows={4}
                  placeholder="For example: regulation, documentation, session planning, family communication or activity ideas."
                  className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] px-5 py-4 text-base outline-none transition focus:border-[#0f766e] focus:bg-white"
                />
              </label>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962] sm:w-auto"
              >
                Register for the free webinar
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="mt-5 grid gap-2">
              <CheckItem text="No payment details required" />
              <CheckItem text="No subscription is created" />
              <CheckItem text="Your joining link will be emailed to you" />
            </div>
          </section>

          <aside className="rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              What happens after you register?
            </p>

            <h2 className="text-3xl font-bold">
              You will receive everything by email.
            </h2>

            <div className="mt-6 grid gap-3">
              <CheckItem text="Confirmation that your registration was received" />
              <CheckItem text="The online joining link" />
              <CheckItem text="A reminder closer to Tuesday 8 September" />
              <CheckItem text="Information about future Allied Health Hive learning" />
            </div>

            <div className="mt-7 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0f766e]">
                <Mail size={21} />
              </div>

              <p className="font-semibold text-[#0f766e]">
                Need help registering?
              </p>

              <p className="mt-2 text-sm leading-relaxed text-[#3f5f5a]">
                Contact Jess if you have a registration question or do not
                receive your confirmation.
              </p>

              <a
                href={`mailto:${JESS_EMAIL}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
              >
                Email Jess
                <ArrowRight size={15} />
              </a>
            </div>

            <div className="mt-5 rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
              <p className="font-semibold text-[#1e1b2e]">
                Looking for support now?
              </p>

              <p className="mt-2 text-sm leading-relaxed text-[#6b6880]">
                Explore the free community, practical tools and reflective
                support while you wait for the webinar.
              </p>

              <Link
                href="/community"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
              >
                Visit the community
                <ArrowRight size={15} />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function LearningCard({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0f766e]">
        {icon}
      </div>

      <h3 className="mb-3 text-xl font-bold">{title}</h3>

      <p className="text-sm leading-relaxed text-[#6b6880]">{text}</p>
    </article>
  );
}

function WebinarPoint({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-[#99f6e4] bg-white p-5">
      <div className="mb-3 text-[#0f766e]">{icon}</div>

      <h3 className="mb-2 text-lg font-bold">{title}</h3>

      <p className="text-sm leading-relaxed text-[#6b6880]">{text}</p>
    </article>
  );
}

function FormField({
  label,
  name,
  type,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-[#1e1b2e]">{label}</span>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required
        className="rounded-full border border-[#e8e4de] bg-[#faf8f5] px-5 py-3 text-base outline-none transition focus:border-[#0f766e] focus:bg-white"
      />
    </label>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3">
      <CheckCircle2
        className="mt-0.5 shrink-0 text-[#0f766e]"
        size={18}
      />

      <p className="text-sm leading-relaxed text-[#5f5b73]">{text}</p>
    </div>
  );
}