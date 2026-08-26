import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  HeartHandshake,
  Mail,
  MessageCircleQuestion,
  ShieldCheck,
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
                Allied Health Hive | Free Live Webinar
              </p>

              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0f766e] shadow-sm">
                <Sparkles size={16} />
                For Allied Health Assistants and allied health professionals
              </div>

              <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
                Inside The Allied Health Hive: Your Top 5 Questions Answered
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#5f5b73] md:text-xl">
                Join Robyn and Jess for our first free Hive webinar, where we
                will explain what The Allied Health Hive actually is, who it is
                for and how we hope it can make the everyday AHA role feel more
                supported and less isolating.
              </p>

              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#5f5b73]">
                We will answer five of the questions we hear most often about
                the community, webinars, practical resources, reflective
                support and how the Hive fits alongside workplace supervision.
              </p>

              <a
                href="#register"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Save my free place
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
                Come and meet The Allied Health Hive
              </h2>

              <div className="grid gap-3">
                <CheckItem text="Tuesday 8 September 2026" />
                <CheckItem text="12:00 pm to 1:00 pm Queensland time" />
                <CheckItem text="Live online and free to attend" />
                <CheckItem text="Meet Robyn and Jess" />
                <CheckItem text="Your top 5 Hive questions answered" />
                <CheckItem text="Submit your own question when you register" />
                <CheckItem text="No payment details required" />
              </div>
            </aside>
          </div>
        </section>

        <section className="mb-8 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Why we are starting here
              </p>

              <h2 className="text-3xl font-bold leading-tight md:text-5xl">
                Before we give you more resources, we want you to understand
                what we are building.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-relaxed text-[#5f5b73]">
                Allied Health Assistants have told us they want practical ideas,
                more connection with others doing similar work, somewhere to
                reflect on difficult sessions and learning that understands the
                realities of the role.
              </p>

              <p className="mt-4 text-base leading-relaxed text-[#6b6880]">
                The Hive is being built around those needs, while also
                supporting the allied health professionals, supervisors and
                managers working alongside AHAs.
              </p>

              <p className="mt-4 text-base leading-relaxed text-[#6b6880]">
                This first webinar is our chance to show you what we mean, answer
                your questions honestly and help you decide whether the Hive
                feels useful for you or your team.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-7 shadow-sm md:p-10">
          <div className="mb-8 max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Inside the free webinar
            </p>

            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              The five questions we will unpack together.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <QuestionCard
              number="01"
              title="Who is The Allied Health Hive actually for?"
              text="We will explain how the Hive supports Allied Health Assistants while also including supervising professionals, managers and wider allied health teams."
            />

            <QuestionCard
              number="02"
              title="What will I actually get inside the Hive?"
              text="We will show you the community, webinars, practical tools, resources and reflective support being developed."
            />

            <QuestionCard
              number="03"
              title="Is the Hive the same as supervision?"
              text="We will explain the difference between reflective support, workforce learning and the supervision and delegation provided through your workplace."
            />

            <QuestionCard
              number="04"
              title="How will this help with real therapy sessions?"
              text="We will talk about the practical issues AHAs face, including confidence, session planning, regulation, communication and what happens when Plan A does not work."
            />

            <QuestionCard
              number="05"
              title="What happens after this webinar?"
              text="We will show you what is coming next and the different ways individuals and allied health teams can stay connected with the Hive."
            />

            <article className="rounded-3xl border border-[#99f6e4] bg-white p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <MessageCircleQuestion size={24} />
              </div>

              <h3 className="mb-3 text-xl font-bold">
                Plus the questions you send us
              </h3>

              <p className="text-sm leading-relaxed text-[#6b6880]">
                There is a question box in the registration form below. Tell us
                what you genuinely want to know and we will use those questions
                to shape the live conversation.
              </p>
            </article>
          </div>
        </section>

        <section className="mb-8 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-10">
          <div className="grid gap-7 md:grid-cols-[auto_1fr] md:items-start">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <HeartHandshake size={27} />
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                A conversation, not a sales presentation
              </p>

              <h2 className="text-3xl font-bold">
                Bring the things you are genuinely wondering about.
              </h2>

              <p className="mt-4 max-w-4xl text-base leading-relaxed text-[#6b6880]">
                You might want to know whether the Hive is useful if you already
                receive supervision, whether allied health professionals can
                join, what reflective support actually looks like or how the
                practical resources will work. Those are exactly the kinds of
                questions we want to hear.
              </p>
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
              Save your place for 8 September.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#6b6880]">
              Add your name and email below and we will send you your online
              joining details and a reminder before the webinar.
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
                  Which best describes you?
                </span>

                <select
                  name="role"
                  className="rounded-full border border-[#e8e4de] bg-[#faf8f5] px-5 py-3 text-base outline-none transition focus:border-[#0f766e] focus:bg-white"
                >
                  <option value="">Choose one</option>
                  <option value="Allied Health Assistant">
                    Allied Health Assistant
                  </option>
                  <option value="Allied health professional">
                    Allied health professional
                  </option>
                  <option value="Manager or supervisor">
                    Manager or supervisor
                  </option>
                  <option value="Student">Student</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[#1e1b2e]">
                  What would you like us to answer during the webinar?
                  <span className="ml-1 font-normal text-[#6b6880]">
                    Optional
                  </span>
                </span>

                <textarea
                  name="question"
                  rows={5}
                  placeholder="Ask us anything about The Hive, the AHA role, the community, reflective support, resources, webinars or how it might work for your team."
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
              <CheckItem text="Your joining details will be emailed to you" />
              <CheckItem text="Tuesday 8 September, 12:00 pm Queensland time" />
            </div>
          </section>

          <aside className="rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              What happens after you register?
            </p>

            <h2 className="text-3xl font-bold">
              We will send everything you need by email.
            </h2>

            <div className="mt-6 grid gap-3">
              <CheckItem text="Confirmation that your registration was received" />
              <CheckItem text="Your online joining details" />
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
              <div className="mb-3 text-[#0f766e]">
                <ShieldCheck size={22} />
              </div>

              <p className="font-semibold text-[#1e1b2e]">
                The Hive does not replace workplace supervision.
              </p>

              <p className="mt-2 text-sm leading-relaxed text-[#6b6880]">
                Our learning and reflective support sit alongside the clinical
                direction, delegation and supervision provided through your
                workplace.
              </p>
            </div>

            <Link
              href="/webinars"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
            >
              Read more about the webinar
              <ArrowRight size={15} />
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}

function QuestionCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-[#99f6e4] bg-white p-6">
      <p className="mb-4 text-sm font-bold tracking-[0.14em] text-[#0f766e]">
        {number}
      </p>

      <h3 className="mb-3 text-xl font-bold">{title}</h3>

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
      <span className="text-sm font-semibold text-[#1e1b2e]">
        {label}
      </span>

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

      <p className="text-sm leading-relaxed text-[#5f5b73]">
        {text}
      </p>
    </div>
  );
}