import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  HeartHandshake,
  Lightbulb,
  MessageCircleHeart,
  Store,
  UsersRound,
  Video,
} from "lucide-react";
import { submitManagerPathwayRequest } from "./actions";

type PageProps = {
  searchParams?: Promise<{
    success?: string;
  }>;
};

export default async function ManagerPathwayPage({
  searchParams,
}: PageProps) {
  const resolvedSearchParams = await searchParams;
  const success = resolvedSearchParams?.success === "true";

  return (
    <main className="min-h-screen bg-[#fffaf3] px-5 py-12 text-[#1e1b2e] sm:px-6 md:py-20">
      <section className="mx-auto max-w-7xl">
        <section className="mb-8 overflow-hidden rounded-4xl border border-[#f4d9a6] bg-white shadow-sm">
          <div className="grid gap-10 bg-linear-to-br from-[#fff7df] via-white to-[#f0fdfa] p-7 md:p-12 lg:grid-cols-[1fr_0.72fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
                Allied Health Hive | Workforce Development
              </p>

              <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
                Help your AHAs feel supported, capable and connected.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#5f5b73] md:text-xl">
                Practical workforce development for managers, clinic owners and
                supervising professionals who want their AHA team to grow in
                confidence, communicate clearly and feel valued in their work.
              </p>

              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#5f5b73]">
                Strong AHA teams need more than policies and procedures. They
                need clear direction, useful feedback, practical learning and a
                workplace where questions are welcomed.
              </p>

              <a
                href="#team-quote-form"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Tell us about your team
                <ArrowRight size={18} />
              </a>
            </div>

            <aside className="rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-6 shadow-sm md:p-8">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <HeartHandshake size={27} />
              </div>

              <h2 className="mb-4 text-2xl font-bold">
                Workforce development that feels human
              </h2>

              <div className="grid gap-3">
                <CheckItem text="Practical support for real workplace challenges" />
                <CheckItem text="Clearer communication between AHAs and supervisors" />
                <CheckItem text="Confidence-building for new and experienced AHAs" />
                <CheckItem text="Reflective learning without judgement" />
                <CheckItem text="Resources shaped around your service needs" />
              </div>
            </aside>
          </div>
        </section>

        <section className="mb-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<UsersRound size={24} />}
            title="Stronger onboarding"
            text="Help new AHAs understand the team, communication pathways and where to go for support."
          />

          <FeatureCard
            icon={<Lightbulb size={24} />}
            title="Practical learning"
            text="Give AHAs ideas they can adapt in real sessions, not just information to read."
          />

          <FeatureCard
            icon={<MessageCircleHeart size={24} />}
            title="Better conversations"
            text="Support clearer questions, feedback and communication with supervising professionals."
          />

          <FeatureCard
            icon={<HeartHandshake size={24} />}
            title="Greater confidence"
            text="Create a workplace where AHAs can reflect, learn and ask for clarification safely."
          />
        </section>

        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <section>
            <div className="mb-8 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-9">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Support options
              </p>

              <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                Build the support your AHA team actually needs.
              </h2>

              <p className="mt-4 text-base leading-relaxed text-[#6b6880]">
                We can help you shape a practical workforce development pathway
                around your team size, disciplines, experience levels and
                everyday challenges.
              </p>

              <div className="mt-7 grid gap-4">
                <SupportPoint
                  title="Team learning"
                  text="Practical webinars, resources and topic-based learning for AHAs and supervisors."
                />

                <SupportPoint
                  title="Reflective support"
                  text="Structured opportunities for AHAs to talk through confidence, communication and challenging sessions."
                />

                <SupportPoint
                  title="Onboarding and role support"
                  text="Resources that help AHAs understand expectations, ask questions and feel part of the team."
                />

                <SupportPoint
                  title="Clinic-specific resources"
                  text="Custom templates, trackers and tools shaped around your organisation."
                />
              </div>

              <a
                href="#team-quote-form"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Request team support
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="mb-8 rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-7 shadow-sm md:p-9">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0f766e]">
                <MessageCircleHeart size={24} />
              </div>

              <h2 className="text-3xl font-bold">
                You do not need to know the perfect solution yet.
              </h2>

              <p className="mt-4 text-base leading-relaxed text-[#3f5f5a]">
                Tell us what feels difficult, what takes too much manager time
                or where your AHAs seem uncertain. Robyn and Jess can help you
                identify a practical starting point.
              </p>

              <div className="mt-6 grid gap-3">
                <CheckItem text="Your team may need more practical session ideas" />
                <CheckItem text="New AHAs may need stronger onboarding" />
                <CheckItem text="Supervisors may want clearer communication tools" />
                <CheckItem text="Experienced AHAs may need ongoing development" />
                <CheckItem text="You may simply need help deciding what comes first" />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <SupportCard
                icon={<Video size={23} />}
                title="Start with the free webinar"
                text="See the warm, practical style of Allied Health Hive learning before planning wider team support."
                href="/subscribe"
                linkText="Save a free place"
              />

              <SupportCard
                icon={<Store size={23} />}
                title="Explore practical resources"
                text="View tools, templates and resources designed to support AHAs in real workplace settings."
                href="/resource-shop"
                linkText="View resources"
              />
            </div>
          </section>

          <aside
            id="team-quote-form"
            className="scroll-mt-24 rounded-4xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8"
          >
            {success ? (
              <SuccessBox />
            ) : (
              <>
                <div className="mb-7">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                    <ClipboardList size={24} />
                  </div>

                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                    Team development enquiry
                  </p>

                  <h2 className="text-3xl font-bold">
                    Tell us about your AHA workforce.
                  </h2>

                  <p className="mt-3 text-base leading-relaxed text-[#6b6880]">
                    Keep it simple. We will use your answers to suggest a useful
                    starting point for your team.
                  </p>
                </div>

                <form
                  action={submitManagerPathwayRequest}
                  className="grid gap-5"
                >
                  <TextField label="Your name" name="fullName" required />

                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    required
                  />

                  <TextField
                    label="Phone"
                    name="phone"
                    placeholder="Optional"
                  />

                  <TextField
                    label="Clinic or organisation"
                    name="organisation"
                    required
                  />

                  <TextField
                    label="Your role"
                    name="role"
                    placeholder="Manager, clinic owner, supervisor..."
                  />

                  <SelectField
                    label="How many AHAs are in your team?"
                    name="teamSize"
                    required
                    options={[
                      { label: "Choose one", value: "" },
                      { label: "1–5 staff", value: "1-5" },
                      { label: "6–10 staff", value: "6-10" },
                      { label: "11–20 staff", value: "11-20" },
                      { label: "More than 20 staff", value: "20+" },
                      { label: "Not sure yet", value: "Not sure" },
                    ]}
                  />

                  <TextareaField
                    label="Which allied health disciplines are involved?"
                    name="disciplines"
                    placeholder="For example: Speech Pathology, Occupational Therapy, Physiotherapy or Exercise Physiology."
                  />

                  <SelectField
                    label="What would help your team most?"
                    name="supportType"
                    required
                    options={[
                      { label: "Choose one", value: "" },
                      {
                        label: "Practical team learning",
                        value: "Team learning",
                      },
                      {
                        label: "AHA onboarding support",
                        value: "Onboarding support",
                      },
                      {
                        label: "Reflective support",
                        value: "Reflective practice",
                      },
                      {
                        label: "Communication and feedback tools",
                        value: "Communication tools",
                      },
                      {
                        label: "Custom resources or templates",
                        value: "Custom resources",
                      },
                      {
                        label: "Help me choose",
                        value: "Not sure",
                      },
                    ]}
                  />

                  <TextareaField
                    label="What currently feels hardest?"
                    name="message"
                    placeholder="Tell us where your team feels uncertain, what takes too much manager time, or what you would like to improve."
                  />

                  <TextareaField
                    label="Team emails, if you already know them"
                    name="teamEmails"
                    placeholder="Optional. Add one email per line or separate with commas."
                  />

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
                  >
                    Send team development enquiry
                    <ArrowRight size={18} />
                  </button>

                  <p className="text-sm leading-relaxed text-[#6b6880]">
                    Robyn or Jess will review your enquiry and contact you with a
                    practical next step.
                  </p>
                </form>
              </>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}

function SuccessBox() {
  return (
    <div>
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
        <HeartHandshake size={24} />
      </div>

      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
        Enquiry received
      </p>

      <h1 className="text-3xl font-bold">
        Thank you for telling us about your team.
      </h1>

      <p className="mt-4 text-base leading-relaxed text-[#6b6880]">
        Robyn or Jess will review your team size, disciplines and support needs,
        then contact you with a practical next step.
      </p>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
        >
          Back to home
        </Link>

        <Link
          href="/webinars"
          className="inline-flex items-center justify-center rounded-full border border-[#0f766e] bg-white px-6 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#f0fdfa]"
        >
          Explore webinars
        </Link>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
        {icon}
      </div>

      <h2 className="mb-3 text-xl font-bold">{title}</h2>

      <p className="text-sm leading-relaxed text-[#6b6880]">{text}</p>
    </article>
  );
}

function SupportPoint({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
      <h3 className="mb-2 text-lg font-bold">{title}</h3>

      <p className="text-sm leading-relaxed text-[#6b6880]">{text}</p>
    </div>
  );
}

function SupportCard({
  icon,
  title,
  text,
  href,
  linkText,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  href: string;
  linkText: string;
}) {
  return (
    <article className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
        {icon}
      </div>

      <h3 className="mb-2 text-xl font-bold">{title}</h3>

      <p className="mb-5 text-sm leading-relaxed text-[#6b6880]">{text}</p>

      <Link
        href={href}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
      >
        {linkText}
        <ArrowRight size={14} />
      </Link>
    </article>
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

function TextField({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-[#1e1b2e]">{label}</span>

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-base outline-none transition focus:border-[#0f766e] focus:bg-white"
      />
    </label>
  );
}

function TextareaField({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-[#1e1b2e]">{label}</span>

      <textarea
        name={name}
        placeholder={placeholder}
        rows={4}
        className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-base outline-none transition focus:border-[#0f766e] focus:bg-white"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  required = false,
}: {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-[#1e1b2e]">{label}</span>

      <select
        name={name}
        required={required}
        className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-base outline-none transition focus:border-[#0f766e] focus:bg-white"
      >
        {options.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}