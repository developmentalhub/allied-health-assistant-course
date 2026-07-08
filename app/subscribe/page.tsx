import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  FileText,
  HeartHandshake,
  PlayCircle,
  Video,
} from "lucide-react";

export default function SubscribePage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-14 text-[#1e1b2e] md:py-20">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Built with AHAs, for AHAs
          </p>
          <p className="mt-2 text-base leading-relaxed text-[#3f5f5a]">
            We are building this platform from scratch with feedback from AHAs,
            managers and clinics. More topics, resources and support options are
            coming soon.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Free August launch webinar
            </p>

            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
              Start with simple therapy ideas that help children feel motivated,
              connected and ready to join in.
            </h1>

            <p className="mb-8 max-w-3xl text-xl leading-relaxed text-[#5f5b73]">
              This free launch webinar is for Allied Health Assistants who want
              fresh ideas, more confidence and a supportive hive around them as
              they help children thrive.
            </p>

            <div className="mb-8 rounded-4x1 border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <CalendarDays size={24} />
              </div>

              <h2 className="mb-3 text-3xl font-bold">
                August topic: Simple Activities and Games to Motivate Children
                in Therapy Sessions
              </h2>

              <p className="mb-5 text-base leading-relaxed text-[#6b6880]">
                Tuesday 4 August 2026, 12pm to 1pm QLD time.
              </p>

              <form action="/api/stripe/monthly-webinar-checkout" method="POST">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962] sm:w-auto"
                >
                  Register for the free August webinar
                  <ArrowRight size={18} />
                </button>
              </form>

              <p className="mt-4 text-sm leading-relaxed text-[#6b6880]">
                Your first payment is not due until 1 September 2026. You can
                start with the free launch webinar and decide if the monthly
                support is right for you.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <SmallCard
                icon={<Video size={22} />}
                title="Live monthly webinars"
                text="Practical topics for real AHA sessions, therapy days and clinic life."
              />

              <SmallCard
                icon={<FileText size={22} />}
                title="PDF resources"
                text="Simple handouts and resources to help you come back to the ideas later."
              />

              <SmallCard
                icon={<PlayCircle size={22} />}
                title="Recordings"
                text="Edited webinar recordings added to the member library after each session."
              />

              <SmallCard
                icon={<HeartHandshake size={22} />}
                title="Reflective support"
                text="A supportive professional development space that respects the skill and compassion AHAs bring."
              />
            </div>
          </div>

          <aside className="rounded-4x1 border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Membership after August
            </p>

            <h2 className="mb-4 text-3xl font-bold">
              Continue with monthly AHA Professional Development.
            </h2>

            <div className="mb-6 rounded-3xl bg-[#faf8f5] p-5">
              <p className="text-sm font-semibold text-[#6b6880]">
                From September
              </p>
              <p className="mt-1 text-4xl font-bold">$57/month</p>
              <p className="mt-2 text-sm leading-relaxed text-[#6b6880]">
                Includes live monthly webinars, PDF resources and recordings.
              </p>
            </div>

            <div className="grid gap-3">
              <CheckItem text="Free August launch webinar included" />
              <CheckItem text="First Tuesday of every month" />
              <CheckItem text="12pm to 1pm QLD time" />
              <CheckItem text="Practical ideas for therapy sessions" />
              <CheckItem text="Member library access" />
              <CheckItem text="PDFs and recordings as they are added" />
            </div>

            <div className="mt-7 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
              <p className="text-sm font-semibold text-[#0f766e]">
                Looking for 1:1 support instead?
              </p>

              <p className="mt-2 text-sm leading-relaxed text-[#3f5f5a]">
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
  icon: React.ReactNode;
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