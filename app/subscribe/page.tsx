import type { ReactNode } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Mail,
  Mic,
  MessageCircleQuestion,
  Sparkles,
  Users,
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
    <main className="min-h-screen bg-[#faf8f5] px-6 py-14 text-[#1e1b2e] md:py-20">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Built with AHAs, for AHAs
          </p>

          <p className="mt-2 text-base leading-relaxed text-[#3f5f5a]">
            Robyn and Jess are building this AHA space from scratch with
            feedback from AHAs, managers and clinics. This first webinar is
            completely free. No payment details, no membership, no catch.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Free launch webinar
            </p>

            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
              A free hour to meet Robyn and Jess, ask questions and hear what is
              being built for AHAs.
            </h1>

            <p className="mb-8 max-w-3xl text-xl leading-relaxed text-[#5f5b73]">
              This is a taster, not a sales pitch. We will spend part of the
              hour introducing who we are and why this space is being built, and
              part of the hour answering the questions AHAs actually have.
            </p>

            <div className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <CalendarDays size={24} />
              </div>

              <h2 className="mb-3 text-3xl font-bold">
                Free webinar: Meet Robyn and Jess + Your Questions, Answered
              </h2>

              <p className="mb-5 text-base leading-relaxed text-[#6b6880]">
                Tuesday 4 August 2026, 12pm to 1pm QLD time. Free to attend.
                Nothing to pay and nothing to cancel later.
              </p>

              <ul className="mb-6 grid gap-2 text-sm text-[#5f5b73]">
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-[#0f766e]"
                    size={16}
                  />
                  Meet Robyn and Jess and hear why this AHA space is being built
                </li>

                <li className="flex items-start gap-2">
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-[#0f766e]"
                    size={16}
                  />
                  Submit your questions in advance so we can answer them
                  properly
                </li>

                <li className="flex items-start gap-2">
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-[#0f766e]"
                    size={16}
                  />
                  Hear what is coming next, including future webinars, tools,
                  podcast plans and the AHA course
                </li>
              </ul>

              {webinarStatus === "missing-details" && (
                <div className="mb-5 rounded-3xl border border-[#fecaca] bg-[#fef2f2] p-5">
                  <p className="text-base font-semibold text-[#991b1b]">
                    Please add your name and email address.
                  </p>

                  <p className="mt-2 text-sm leading-relaxed text-[#7f1d1d]">
                    Then submit the form again so we can register you properly.
                  </p>
                </div>
              )}

              {webinarStatus === "save-error" && (
                <div className="mb-5 rounded-3xl border border-[#fecaca] bg-[#fef2f2] p-5">
                  <p className="text-base font-semibold text-[#991b1b]">
                    Something went wrong.
                  </p>

                  <p className="mt-2 text-sm leading-relaxed text-[#7f1d1d]">
                    Your registration could not be saved. Please try again or
                    email Jess directly.
                  </p>
                </div>
              )}

              <form
                action="/api/webinar-registration"
                method="POST"
                className="grid gap-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                    className="rounded-full border border-[#e8e4de] bg-[#faf8f5] px-5 py-3 text-base outline-none focus:border-[#0f766e]"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    required
                    className="rounded-full border border-[#e8e4de] bg-[#faf8f5] px-5 py-3 text-base outline-none focus:border-[#0f766e]"
                  />
                </div>

                <textarea
                  name="question"
                  placeholder="What is your biggest question about being an AHA? Optional. We will answer as many as we can on the day."
                  rows={3}
                  className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] px-5 py-4 text-base outline-none focus:border-[#0f766e]"
                />

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962] sm:w-auto"
                >
                  Register for the free webinar
                  <ArrowRight size={18} />
                </button>
              </form>

              <p className="mt-4 text-sm leading-relaxed text-[#6b6880]">
                No payment required. We will email you the joining link and a
                reminder closer to the date.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <SmallCard
                icon={<Users size={22} />}
                title="Meet the founders"
                text="Before anything else, this is a real introduction to Robyn and Jess and why we are building this space for AHAs."
              />

              <SmallCard
                icon={<MessageCircleQuestion size={22} />}
                title="Ask the real questions"
                text="Scope, confidence, supervision, communication and role clarity. Submit your question in advance so it can be answered thoughtfully."
              />

              <SmallCard
                icon={<Sparkles size={22} />}
                title="See what is coming"
                text="You will hear what we are planning next, including future webinars, reflective resources, tools and the AHA course."
              />

              <SmallCard
                icon={<Mic size={22} />}
                title="No pressure, no pitch"
                text="This first hour is free because we want it to be useful and supportive, not a hard sell."
              />
            </div>
          </div>

          <aside className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              What this is
            </p>

            <h2 className="mb-4 text-3xl font-bold">
              A free starting point for AHAs.
            </h2>

            <p className="mb-6 text-base leading-relaxed text-[#6b6880]">
              This webinar is the first step while the broader AHA resources are
              being built. We are not opening paid access or a membership offer
              on this page right now.
            </p>

            <div className="grid gap-3">
              <CheckItem text="Free to register" />
              <CheckItem text="No payment details required" />
              <CheckItem text="Questions can be submitted in advance" />
              <CheckItem text="Future webinars and tools will be shaped by AHA feedback" />
              <CheckItem text="The full AHA course is coming soon as a separate course pathway" />
            </div>

            <div className="mt-7 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0f766e]">
                <Mail size={20} />
              </div>

              <p className="text-sm font-semibold text-[#0f766e]">
                AHA enquiries
              </p>

              <p className="mt-2 text-sm leading-relaxed text-[#3f5f5a]">
                For now, AHA enquiries are being directed to Jess while a shared
                partnership inbox is being set up.
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
              <p className="text-sm font-semibold text-[#1e1b2e]">
                Want 1:1 support in the meantime?
              </p>

              <p className="mt-2 text-sm leading-relaxed text-[#6b6880]">
                You can also book reflective practice support to talk through a
                real session, role question or confidence worry.
              </p>

              <a
                href="/reflective-practice"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
              >
                Book 1:1 reflective support
                <ArrowRight size={15} />
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function SmallCard({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-[#e8e4de] bg-white p-5 shadow-sm">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
        {icon}
      </div>

      <h3 className="mb-2 text-lg font-bold">{title}</h3>

      <p className="text-sm leading-relaxed text-[#6b6880]">{text}</p>
    </article>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3">
      <CheckCircle2 className="mt-0.5 shrink-0 text-[#0f766e]" size={18} />
      <p className="text-sm leading-relaxed text-[#5f5b73]">{text}</p>
    </div>
  );
}