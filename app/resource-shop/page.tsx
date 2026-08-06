import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileHeart,
  FileText,
  HeartHandshake,
  Lightbulb,
  Mail,
  MessageCircleHeart,
  NotebookPen,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Wand2,
} from "lucide-react";
import { joinResourceShopWaitlist } from "./actions";

const resourceCategories = [
  {
    title: "Regulation and Engagement Pack",
    audience: "For AHAs and therapy teams",
    description:
      "Practical prompts and activity ideas to help AHAs respond when children feel overwhelmed, avoidant, frustrated or unsure how to begin.",
    icon: <HeartHandshake size={26} />,
    includes: [
      "Regulation observation prompts",
      "Ideas for reducing sensory and task demands",
      "Connection-before-correction strategies",
      "Visual and movement-based engagement ideas",
    ],
  },
  {
    title: "Session Planning Toolkit",
    audience: "For AHAs preparing therapy sessions",
    description:
      "Simple planning tools that help AHAs understand the purpose of a session, prepare equipment and think through flexible options.",
    icon: <ClipboardCheck size={26} />,
    includes: [
      "Pre-session preparation checklist",
      "Equipment and environment planner",
      "Plan A, Plan B and Plan C prompts",
      "Questions to clarify before a session",
    ],
  },
  {
    title: "Documentation Support Pack",
    audience: "For AHAs and supervising professionals",
    description:
      "Prompts and templates to help AHAs record clear observations and communicate useful information after sessions.",
    icon: <NotebookPen size={26} />,
    includes: [
      "Objective observation prompts",
      "Session feedback templates",
      "Progress note preparation sheets",
      "Examples of clear professional wording",
    ],
  },
  {
    title: "Low-Cost Activity Ideas Pack",
    audience: "For practical therapy sessions",
    description:
      "A growing collection of adaptable activities using simple materials found in clinics, homes, schools and community settings.",
    icon: <Lightbulb size={26} />,
    includes: [
      "Masking tape movement games",
      "Ball and cup activities",
      "Paper, socks and household item ideas",
      "Ways to increase or reduce challenge",
    ],
  },
  {
    title: "Family Empowerment Pack",
    audience: "For AHAs, therapists and families",
    description:
      "Resources that help families understand the purpose of activities and feel confident continuing simple strategies within everyday routines.",
    icon: <FileHeart size={26} />,
    includes: [
      "Plain-language family handouts",
      "Home carryover idea sheets",
      "Routine-based strategy prompts",
      "Questions families can bring back to the team",
    ],
  },
  {
    title: "Reflective Practice Pack",
    audience: "For individual AHAs and teams",
    description:
      "Supportive reflection prompts for sessions that felt difficult, unclear or different from the original plan.",
    icon: <MessageCircleHeart size={26} />,
    includes: [
      "After-session reflection sheets",
      "Confidence and communication prompts",
      "Preparing questions for a supervisor",
      "Learning without self-judgement",
    ],
  },
  {
    title: "AHA Onboarding Pack",
    audience: "For managers and new AHA staff",
    description:
      "Help new AHAs understand the workplace, communication pathways, role expectations and where to go for support.",
    icon: <UsersRound size={26} />,
    includes: [
      "First-week onboarding checklist",
      "Role and communication pathway prompts",
      "Supervisor meeting templates",
      "Confidence check-in questions",
    ],
  },
  {
    title: "Supervisor Support Pack",
    audience: "For therapists and supervising professionals",
    description:
      "Practical tools that make direction, delegation, feedback and session preparation clearer for both AHAs and supervisors.",
    icon: <BookOpen size={26} />,
    includes: [
      "Session handover templates",
      "Delegation discussion prompts",
      "Feedback and review tools",
      "Clarification pathways",
    ],
  },
  {
    title: "Manager Workforce Pack",
    audience: "For managers and clinic owners",
    description:
      "Workforce development tools to support onboarding, communication, learning priorities and ongoing AHA confidence.",
    icon: <Building2 size={26} />,
    includes: [
      "Team development planning tools",
      "AHA confidence check-ins",
      "Learning pathway templates",
      "Manager implementation prompts",
    ],
  },
  {
    title: "Professional Boundaries Pack",
    audience: "For AHAs and organisations",
    description:
      "Clear, approachable resources that support role understanding, communication and knowing when further direction is required.",
    icon: <ShieldCheck size={26} />,
    includes: [
      "Role clarity discussion prompts",
      "When to pause and ask flowcharts",
      "Workplace boundary reminders",
      "Professional communication examples",
    ],
  },
  {
    title: "Custom Resource Build",
    audience: "For clinics, teams and organisations",
    description:
      "A tailored option for services that need resources designed around their workforce, clients, documentation systems or service model.",
    icon: <Wand2 size={26} />,
    includes: [
      "Custom onboarding resources",
      "Clinic-specific templates",
      "Supervisor and manager tools",
      "Tailored activity or family resources",
    ],
  },
];

type PageProps = {
  searchParams?: Promise<{
    success?: string;
  }>;
};

export default async function ResourceShopPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const success = params?.success === "true";

  return (
    <main className="min-h-screen bg-[#fffaf3] px-5 py-12 text-[#1e1b2e] sm:px-6 md:py-16">
      <section className="mx-auto max-w-7xl">
        <section className="mb-8 overflow-hidden rounded-4xl border border-[#f4d9a6] bg-white shadow-sm">
          <div className="grid gap-8 bg-linear-to-br from-[#fff7df] via-white to-[#f0fdfa] p-7 md:p-12 lg:grid-cols-[1fr_0.72fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
                Allied Health Hive | Practical Resources
              </p>

              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0f766e] shadow-sm">
                <Sparkles size={16} />
                Resource library in development
              </div>

              <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
                Practical resources for the real work AHAs do every day.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#5f5b73] md:text-xl">
                Find support for regulation, documentation, session planning,
                family communication, reflective practice and creative therapy
                activities.
              </p>

              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#5f5b73]">
                These resources are being designed to reduce uncertainty, save
                preparation time and help AHAs feel more confident without
                expecting them to work outside their role.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#resources"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
                >
                  Explore planned resources
                  <ArrowRight size={18} />
                </a>

                <a
                  href="#waitlist"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0f766e] bg-white px-7 py-4 text-base font-semibold text-[#0f766e] transition hover:bg-[#f0fdfa]"
                >
                  Join the resource list
                  <Mail size={18} />
                </a>
              </div>
            </div>

            <aside className="rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-6 md:p-8">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <FileText size={27} />
              </div>

              <h2 className="mb-4 text-2xl font-bold">
                Resources that make the work feel clearer
              </h2>

              <div className="grid gap-3">
                <HeroCheck text="Simple enough to use during a busy week" />
                <HeroCheck text="Relevant to real AHA sessions" />
                <HeroCheck text="Supportive rather than compliance-heavy" />
                <HeroCheck text="Useful for AHAs, supervisors and managers" />
                <HeroCheck text="Designed with professional boundaries in mind" />
              </div>
            </aside>
          </div>
        </section>

        <section className="mb-8 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-10">
          <div className="mb-8 max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Built around AHA needs
            </p>

            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              Not another folder of documents nobody uses.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#6b6880] md:text-lg">
              Each resource will be designed around a practical question AHAs,
              supervisors or managers commonly face.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <NeedCard
              title="What do I do when the child disengages?"
              text="Use regulation, engagement and activity adaptation prompts."
            />

            <NeedCard
              title="What should I write after the session?"
              text="Use observation, documentation and feedback templates."
            />

            <NeedCard
              title="How do I prepare without overstepping?"
              text="Use session planning and clarification tools."
            />

            <NeedCard
              title="How can families continue this at home?"
              text="Use plain-language carryover and family support resources."
            />
          </div>
        </section>

        <section
          id="resources"
          className="mb-8 scroll-mt-24"
        >
          <div className="mb-7 max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Planned resource collection
            </p>

            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              Choose the area that would help most.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#6b6880]">
              Final pack contents and pricing will be confirmed as the resources
              are developed and tested with AHAs and allied health teams.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {resourceCategories.map((resource) => (
              <article
                key={resource.title}
                className="flex h-full flex-col rounded-4xl border border-[#e8e4de] bg-white p-6 shadow-sm"
              >
                <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                  {resource.icon}
                </div>

                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
                  {resource.audience}
                </p>

                <h3 className="mb-3 text-2xl font-bold">
                  {resource.title}
                </h3>

                <p className="mb-5 text-sm leading-relaxed text-[#6b6880]">
                  {resource.description}
                </p>

                <div className="mt-auto rounded-3xl bg-[#faf8f5] p-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#5f5b73]">
                    Planned inclusions
                  </p>

                  <div className="grid gap-2">
                    {resource.includes.map((item) => (
                      <div key={item} className="flex gap-2">
                        <CheckCircle2
                          size={16}
                          className="mt-0.5 shrink-0 text-[#0f766e]"
                        />

                        <p className="text-sm leading-relaxed text-[#5f5b73]">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="#waitlist"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-5 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
                >
                  {resource.title === "Custom Resource Build"
                    ? "Request a custom resource"
                    : "Register interest"}
                  <ArrowRight size={15} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-7 shadow-sm md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                For managers and supervisors
              </p>

              <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                Help your team use the resources consistently.
              </h2>

              <p className="mt-4 text-base leading-relaxed text-[#3f5f5a]">
                Resources can also be packaged into team learning pathways,
                onboarding support or manager-led workforce development.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ManagerCard
                title="Team resource bundles"
                text="Combine several resource areas around your organisation’s current priorities."
              />

              <ManagerCard
                title="Supervisor tools"
                text="Support clearer instructions, communication, feedback and follow-up."
              />

              <ManagerCard
                title="Onboarding pathways"
                text="Help new AHAs know what to expect, where to ask and how to prepare."
              />

              <ManagerCard
                title="Custom workforce support"
                text="Request tailored resources for your service model, clients or team structure."
              />
            </div>
          </div>

          <Link
            href="/manager-pathway"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
          >
            Explore manager support
            <ArrowRight size={16} />
          </Link>
        </section>

        <section className="mb-8 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-10">
          <div className="grid gap-7 md:grid-cols-[auto_1fr] md:items-start">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <ShieldCheck size={27} />
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Professional boundaries
              </p>

              <h2 className="text-3xl font-bold">
                Resources support good practice, but do not replace direction.
              </h2>

              <p className="mt-4 max-w-4xl text-base leading-relaxed text-[#6b6880]">
                Allied Health Hive resources support preparation, reflection,
                communication and workforce development. They do not replace
                workplace supervision, allied health direction, delegation,
                clinical decision-making, incident reporting or employer
                responsibilities.
              </p>
            </div>
          </div>
        </section>

        <section
          id="waitlist"
          className="scroll-mt-24 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div>
              <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <Mail size={26} />
              </div>

              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Resource interest form
              </p>

              <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                Tell us what would make your work easier.
              </h2>

              <p className="mt-4 text-base leading-relaxed text-[#6b6880]">
                You do not need to know the exact name of the resource you need.
                Tell us what currently feels difficult, repetitive or unclear.
              </p>

              <div className="mt-6 rounded-3xl bg-[#faf8f5] p-5">
                <p className="text-sm leading-relaxed text-[#5f5b73]">
                  Your feedback will help Robyn and Jess decide which resources
                  to create first. A custom quote can also be discussed where a
                  team needs something tailored.
                </p>
              </div>
            </div>

            <div>
              {success ? (
                <div className="mb-6 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5 text-[#0f766e]">
                  <p className="font-semibold">
                    Your resource enquiry has been received.
                  </p>

                  <p className="mt-2 text-sm leading-relaxed">
                    We will keep you informed as relevant resources become
                    available or follow up if you requested something custom.
                  </p>
                </div>
              ) : null}

              <form action={joinResourceShopWaitlist} className="grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <TextField
                    label="Your name"
                    name="fullName"
                    placeholder="Your name"
                    required
                  />

                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <TextField
                    label="Organisation or clinic"
                    name="organisation"
                    placeholder="Optional"
                  />

                  <TextField
                    label="Your role"
                    name="role"
                    placeholder="AHA, therapist, manager..."
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <SelectField
                    label="Team size"
                    name="teamSize"
                    options={[
                      { label: "Select team size", value: "" },
                      { label: "Individual AHA", value: "Individual AHA" },
                      { label: "Solo practitioner", value: "Solo practitioner" },
                      { label: "2–5 staff", value: "2-5 staff" },
                      { label: "6–15 staff", value: "6-15 staff" },
                      { label: "16–30 staff", value: "16-30 staff" },
                      { label: "More than 30 staff", value: "31+ staff" },
                    ]}
                  />

                  <SelectField
                    label="Most interested in"
                    name="interestedIn"
                    options={[
                      { label: "Select an option", value: "" },
                      {
                        label: "Regulation and Engagement Pack",
                        value: "Regulation and Engagement Pack",
                      },
                      {
                        label: "Session Planning Toolkit",
                        value: "Session Planning Toolkit",
                      },
                      {
                        label: "Documentation Support Pack",
                        value: "Documentation Support Pack",
                      },
                      {
                        label: "Low-Cost Activity Ideas Pack",
                        value: "Low-Cost Activity Ideas Pack",
                      },
                      {
                        label: "Family Empowerment Pack",
                        value: "Family Empowerment Pack",
                      },
                      {
                        label: "Reflective Practice Pack",
                        value: "Reflective Practice Pack",
                      },
                      {
                        label: "AHA Onboarding Pack",
                        value: "AHA Onboarding Pack",
                      },
                      {
                        label: "Supervisor Support Pack",
                        value: "Supervisor Support Pack",
                      },
                      {
                        label: "Manager Workforce Pack",
                        value: "Manager Workforce Pack",
                      },
                      {
                        label: "Professional Boundaries Pack",
                        value: "Professional Boundaries Pack",
                      },
                      {
                        label: "Custom Resource Build",
                        value: "Custom Resource Build",
                      },
                      {
                        label: "Several resource areas",
                        value: "Several resource areas",
                      },
                      {
                        label: "Not sure yet",
                        value: "Not sure yet",
                      },
                    ]}
                  />
                </div>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold">
                    What would help you or your team most?
                  </span>

                  <textarea
                    name="message"
                    rows={5}
                    className="rounded-2xl border border-[#d8d3ca] bg-[#faf8f5] px-4 py-3 text-sm outline-none transition focus:border-[#0f766e] focus:bg-white"
                    placeholder="For example: regulation strategies, activity ideas, clearer documentation, session planning, family handouts, onboarding or supervisor communication."
                  />
                </label>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
                >
                  Send resource enquiry
                  <ArrowRight size={17} />
                </button>
              </form>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function HeroCheck({ text }: { text: string }) {
  return (
    <div className="flex gap-3">
      <CheckCircle2
        className="mt-0.5 shrink-0 text-[#0f766e]"
        size={18}
      />

      <p className="text-sm leading-relaxed text-[#3f5f5a]">{text}</p>
    </div>
  );
}

function NeedCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
      <h3 className="mb-3 text-lg font-bold">{title}</h3>

      <p className="text-sm leading-relaxed text-[#6b6880]">{text}</p>
    </article>
  );
}

function ManagerCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-[#99f6e4] bg-white p-5">
      <h3 className="mb-2 text-lg font-bold">{title}</h3>

      <p className="text-sm leading-relaxed text-[#6b6880]">{text}</p>
    </article>
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
      <span className="text-sm font-semibold">{label}</span>

      <input
        required={required}
        type={type}
        name={name}
        className="rounded-2xl border border-[#d8d3ca] bg-[#faf8f5] px-4 py-3 text-sm outline-none transition focus:border-[#0f766e] focus:bg-white"
        placeholder={placeholder}
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: { label: string; value: string }[];
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold">{label}</span>

      <select
        name={name}
        className="rounded-2xl border border-[#d8d3ca] bg-[#faf8f5] px-4 py-3 text-sm outline-none transition focus:border-[#0f766e] focus:bg-white"
        defaultValue=""
      >
        {options.map((option, index) => (
          <option
            key={option.label}
            value={option.value}
            disabled={index === 0}
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}