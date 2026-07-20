import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  FileText,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  Table2,
  UsersRound,
  Wand2,
} from "lucide-react";
import { joinResourceShopWaitlist } from "./actions";

const premiumPacks = [
  {
    title: "AHA Framework Pack",
    price: "From $1,497",
    description:
      "For teams who need everyone to understand what AHAs can do, what needs therapist direction, and how support should flow across the week.",
    icon: <UsersRound size={26} />,
    includes: [
      "AHA role clarity framework",
      "Delegation and communication pathways",
      "Session preparation expectations",
      "Templates to help AHAs know where to start",
    ],
  },
  {
    title: "Therapist Framework Pack",
    price: "From $1,497",
    description:
      "For therapists who want to delegate more clearly, reduce repeated explaining, and feel confident that therapy plans are being followed safely.",
    icon: <ClipboardList size={26} />,
    includes: [
      "Delegation templates",
      "Treatment plan handover tools",
      "Review and feedback systems",
      "Clinical communication templates",
    ],
  },
  {
    title: "Clinical Template Pack",
    price: "From $497",
    description:
      "For teams who are tired of starting from a blank page when writing notes, summaries, emails, referrals or parent updates.",
    icon: <FileText size={26} />,
    includes: [
      "SOAP and progress note templates",
      "Parent consultation templates",
      "Referral and email templates",
      "Session summary and letter templates",
    ],
  },
  {
    title: "Assessment and Screener Pack",
    price: "From $797",
    description:
      "For clinics wanting clearer pathways around what AHAs can observe, what therapists need to assess, and how information should be reported.",
    icon: <ClipboardList size={26} />,
    includes: [
      "Suggested AHA screeners",
      "Therapist standardised assessment lists",
      "Assessment flowcharts",
      "Reporting expectation templates",
    ],
  },
  {
    title: "Therapy Area Resource Packs",
    price: "From $297",
    description:
      "For AHAs who want practical ideas ready to go when a child is disengaged, the plan is not working, or the session needs a different entry point.",
    icon: <Sparkles size={26} />,
    includes: [
      "Emotional regulation resources",
      "Fine and gross motor activity ideas",
      "Sensory and self-care supports",
      "Communication and social skills resources",
    ],
  },
  {
    title: "Clinic Systems Pack",
    price: "From $2,497",
    description:
      "For managers who know their team needs better systems, but do not have the time to build every workflow, checklist and process from scratch.",
    icon: <Building2 size={26} />,
    includes: [
      "Clinic workflow maps",
      "Team structure templates",
      "Reporting expectations",
      "Manager implementation guides",
    ],
  },
  {
    title: "Compliance and Governance Pack",
    price: "From $2,997",
    description:
      "For organisations wanting clearer documentation, safer processes and stronger systems around risk, privacy, records and clinical governance.",
    icon: <ShieldCheck size={26} />,
    includes: [
      "Policy and procedure templates",
      "Risk and incident processes",
      "Documentation standards",
      "Governance checklists",
    ],
  },
  {
    title: "Spreadsheet Systems Pack",
    price: "From $1,497",
    description:
      "For managers who need easier ways to track treatment plans, capacity, waitlists, KPIs and reporting without rebuilding spreadsheets every month.",
    icon: <Table2 size={26} />,
    includes: [
      "Treatment plan expiry tracker",
      "KPI dashboard templates",
      "Waitlist and capacity trackers",
      "Monthly reporting tools",
    ],
  },
  {
    title: "Employer Hub Pack",
    price: "From $1,997",
    description:
      "For clinic owners and managers who want recruitment, onboarding, induction and staff review processes to feel more organised and repeatable.",
    icon: <UsersRound size={26} />,
    includes: [
      "Position description templates",
      "Interview and induction checklists",
      "Performance review templates",
      "Employer flowchart templates",
    ],
  },
  {
    title: "AI Systems and Prompt Library",
    price: "From $497",
    description:
      "For teams who want to use AI carefully to reduce admin load, organise ideas, draft communication and make documentation feel less overwhelming.",
    icon: <Mail size={26} />,
    includes: [
      "Documentation prompts",
      "Report and home program prompts",
      "Email and communication prompts",
      "Workflow and admin prompt systems",
    ],
  },
  {
    title: "Custom Build / Request a Quote",
    price: "Quoted individually",
    description:
      "For clinics, teams or organisations who need something tailored rather than a packaged resource.",
    icon: <Wand2 size={26} />,
    includes: [
      "Custom induction or onboarding packs",
      "Clinic-specific AHA documentation",
      "Supervisor checklists and handover tools",
      "Tailored templates, trackers or resource bundles",
    ],
  },
];

type PageProps = {
  searchParams?: Promise<{
    success?: string;
  }>;
};

export default async function ResourceShopPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const success = params?.success === "true";

  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-12 text-[#1e1b2e] md:py-16">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Resource shop coming soon
          </p>

          <p className="mt-2 text-base leading-relaxed text-[#3f5f5a]">
            Robyn and Jess are preparing practical documentation, templates and
            systems for AHA teams, therapists, managers and clinics who want the
            working day to feel clearer, calmer and easier to organise.
          </p>
        </div>

        <section className="mb-8 overflow-hidden rounded-4xl border border-[#e8e4de] bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1fr_0.72fr]">
            <div className="p-8 md:p-12">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#f0fdfa] px-4 py-2 text-sm font-semibold text-[#0f766e]">
                <Lock size={16} />
                Premium systems and practical resources
              </div>

              <h1 className="mb-5 text-4xl font-bold leading-tight md:text-5xl">
                When the work feels important, but the systems around it feel
                messy.
              </h1>

              <p className="mb-5 max-w-3xl text-lg leading-relaxed text-[#5f5b73]">
                AHAs often want to do a good job, but can feel unsure where to
                start, what to write down, how to adapt a session, or when to go
                back to the therapist for direction.
              </p>

              <p className="mb-7 max-w-3xl text-lg leading-relaxed text-[#5f5b73]">
                Managers and therapists can also feel stretched. They are trying
                to support staff, meet compliance expectations, keep treatment
                plans moving and create consistency across the team without
                building every template from scratch.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#waitlist"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
                >
                  Join the waitlist
                  <ArrowRight size={16} />
                </a>

                <Link
                  href="/subscribe"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-6 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
                >
                  Start with the free webinar
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <aside className="border-t border-[#e8e4de] bg-[#1e1b2e] p-8 text-white lg:border-l lg:border-t-0 md:p-10">
              <Sparkles className="mb-5 text-[#99f6e4]" size={34} />

              <h2 className="mb-4 text-2xl font-bold">
                Start with support. Add systems when you are ready.
              </h2>

              <div className="grid gap-4">
                <CheckItem text="The free webinar helps AHAs, managers and clinics understand what is being built." />
                <CheckItem text="The resource shop will help teams run the day with clearer templates, trackers and systems." />
                <CheckItem text="Managers will be able to choose the packs that match their team’s pressure points." />
                <CheckItem text="Custom builds will be available for teams needing something more tailored." />
              </div>
            </aside>
          </div>
        </section>

        <section className="mb-8 grid gap-5 md:grid-cols-3">
          <JourneyCard
            step="Step 1"
            title="Start with the free webinar"
            text="Meet Robyn and Jess, ask questions and get a feel for the AHA support space being built."
          />

          <JourneyCard
            step="Step 2"
            title="Join the free community"
            text="Start gently. Browse, use starter tools as they become available and connect with other AHAs."
          />

          <JourneyCard
            step="Step 3"
            title="Request resources or custom support"
            text="Choose a planned pack, join the waitlist, or request a custom quote if your clinic needs something tailored."
          />
        </section>

        <section className="mb-8">
          <div className="mb-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Coming soon
            </p>

            <h2 className="text-3xl font-bold md:text-4xl">
              Resource packs for the parts of the work that slow teams down.
            </h2>

            <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#6b6880]">
              These packs are being prepared for teams who want practical,
              editable resources they can adapt into their own clinic or
              organisation.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {premiumPacks.map((pack) => (
              <article
                key={pack.title}
                className="flex h-full flex-col rounded-4xl border border-[#e8e4de] bg-white p-6 shadow-sm"
              >
                <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                  {pack.icon}
                </div>

                <h3 className="mb-2 text-2xl font-bold">{pack.title}</h3>

                <p className="mb-4 text-lg font-bold text-[#0f766e]">
                  {pack.price}
                </p>

                <p className="mb-5 text-sm leading-relaxed text-[#6b6880]">
                  {pack.description}
                </p>

                <div className="mt-auto rounded-3xl bg-[#faf8f5] p-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#5f5b73]">
                    May include
                  </p>

                  <div className="grid gap-2">
                    {pack.includes.map((item) => (
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
                  {pack.title === "Custom Build / Request a Quote"
                    ? "Request a custom quote"
                    : "Join waitlist for this pack"}
                  <ArrowRight size={15} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-10">
          <div className="grid gap-6 lg:grid-cols-[0.72fr_1fr] lg:items-start">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Packaged or custom
              </p>

              <h2 className="mb-4 text-3xl font-bold">
                Choose a ready-made direction, or request something tailored.
              </h2>

              <p className="text-base leading-relaxed text-[#6b6880]">
                Some teams need a clear template pack. Others need something
                more specific to their clinic, team structure, documentation
                expectations or service model.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl bg-[#f0fdfa] p-5">
                <h3 className="mb-3 text-xl font-bold text-[#0f766e]">
                  Resource packs
                </h3>

                <p className="text-sm leading-relaxed text-[#3f5f5a]">
                  For teams who want practical templates, frameworks, trackers,
                  processes and support materials they can adapt and use.
                </p>
              </div>

              <div className="rounded-3xl bg-[#faf8f5] p-5">
                <h3 className="mb-3 text-xl font-bold">Custom build</h3>

                <p className="text-sm leading-relaxed text-[#5f5b73]">
                  For teams who need a tailored documentation pack, clinic
                  workflow, supervisor resource, induction system or resource
                  bundle built around their needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="waitlist"
          className="grid gap-6 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm lg:grid-cols-[0.82fr_1fr] md:p-10"
        >
          <div>
            <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <Mail size={26} />
            </div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Join the waitlist or request a quote
            </p>

            <h2 className="mb-4 text-3xl font-bold">
              Tell us what your team needs.
            </h2>

            <p className="mb-5 text-base leading-relaxed text-[#6b6880]">
              Join the waitlist if your team is looking for clearer templates,
              better systems, easier planning, stronger delegation pathways or
              practical resources that reduce the daily overwhelm.
            </p>

            <div className="rounded-3xl bg-[#faf8f5] p-5">
              <p className="text-sm leading-relaxed text-[#5f5b73]">
                You do not need to know exactly what you need yet. Tell us what
                feels messy, time-consuming or unclear in your team. If you need
                something custom-built, choose Custom Build in the form and give
                us a short description.
              </p>
            </div>
          </div>

          <div>
            {success ? (
              <div className="mb-5 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5 text-[#0f766e]">
                <p className="font-semibold">Your enquiry has been received.</p>
                <p className="mt-1 text-sm leading-relaxed">
                  We will let you know when the resource shop is ready, or
                  follow up if your enquiry is about a custom quote.
                </p>
              </div>
            ) : null}

            <form action={joinResourceShopWaitlist} className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold">Name</span>
                  <input
                    required
                    name="fullName"
                    className="rounded-2xl border border-[#d8d3ca] bg-white px-4 py-3 text-sm outline-none focus:border-[#0f766e]"
                    placeholder="Your name"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold">Email</span>
                  <input
                    required
                    type="email"
                    name="email"
                    className="rounded-2xl border border-[#d8d3ca] bg-white px-4 py-3 text-sm outline-none focus:border-[#0f766e]"
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold">
                    Organisation or clinic
                  </span>
                  <input
                    name="organisation"
                    className="rounded-2xl border border-[#d8d3ca] bg-white px-4 py-3 text-sm outline-none focus:border-[#0f766e]"
                    placeholder="Clinic or organisation name"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold">Your role</span>
                  <input
                    name="role"
                    className="rounded-2xl border border-[#d8d3ca] bg-white px-4 py-3 text-sm outline-none focus:border-[#0f766e]"
                    placeholder="AHA, therapist, manager, owner..."
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold">Team size</span>
                  <select
                    name="teamSize"
                    className="rounded-2xl border border-[#d8d3ca] bg-white px-4 py-3 text-sm outline-none focus:border-[#0f766e]"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select team size
                    </option>
                    <option value="Solo practitioner">Solo practitioner</option>
                    <option value="2-5 staff">2-5 staff</option>
                    <option value="6-15 staff">6-15 staff</option>
                    <option value="16-30 staff">16-30 staff</option>
                    <option value="31+ staff">31+ staff</option>
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold">
                    Most interested in
                  </span>
                  <select
                    name="interestedIn"
                    className="rounded-2xl border border-[#d8d3ca] bg-white px-4 py-3 text-sm outline-none focus:border-[#0f766e]"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="AHA Framework Pack">
                      AHA Framework Pack
                    </option>
                    <option value="Therapist Framework Pack">
                      Therapist Framework Pack
                    </option>
                    <option value="Clinical Template Pack">
                      Clinical Template Pack
                    </option>
                    <option value="Assessment and Screener Pack">
                      Assessment and Screener Pack
                    </option>
                    <option value="Therapy Area Resource Packs">
                      Therapy Area Resource Packs
                    </option>
                    <option value="Clinic Systems Pack">
                      Clinic Systems Pack
                    </option>
                    <option value="Compliance and Governance Pack">
                      Compliance and Governance Pack
                    </option>
                    <option value="Spreadsheet Systems Pack">
                      Spreadsheet Systems Pack
                    </option>
                    <option value="Employer Hub Pack">
                      Employer Hub Pack
                    </option>
                    <option value="AI Systems and Prompt Library">
                      AI Systems and Prompt Library
                    </option>
                    <option value="Custom Build / Request a Quote">
                      Custom Build / Request a Quote
                    </option>
                    <option value="Several packs">Several packs</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-semibold">
                  What feels hardest to organise in your team right now?
                </span>

                <textarea
                  name="message"
                  rows={5}
                  className="rounded-2xl border border-[#d8d3ca] bg-white px-4 py-3 text-sm outline-none focus:border-[#0f766e]"
                  placeholder="For example: delegation, treatment plan tracking, session planning, documentation, onboarding, compliance, reporting, knowing what AHAs can do, or needing a custom pack for your clinic."
                />
              </label>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Send resource enquiry
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </section>
      </section>
    </main>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3">
      <CheckCircle2 className="mt-0.5 shrink-0 text-[#99f6e4]" size={18} />

      <p className="text-sm leading-relaxed text-[#d9d7e5]">{text}</p>
    </div>
  );
}

function JourneyCard({
  step,
  title,
  text,
}: {
  step: string;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-4xl border border-[#e8e4de] bg-white p-6 shadow-sm">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
        {step}
      </p>

      <h2 className="mb-3 text-2xl font-bold">{title}</h2>

      <p className="text-sm leading-relaxed text-[#6b6880]">{text}</p>
    </article>
  );
}