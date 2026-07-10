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
} from "lucide-react";
import { joinResourceShopWaitlist } from "./actions";

const premiumPacks = [
  {
    title: "AHA Framework Pack",
    price: "From $1,497",
    description:
      "A structured framework to help clinics clarify the AHA role, delegation pathways, session expectations and therapist communication.",
    icon: <UsersRound size={26} />,
    includes: [
      "AHA role framework",
      "Delegation and communication pathways",
      "Session preparation expectations",
      "Team implementation templates",
    ],
  },
  {
    title: "Therapist Framework Pack",
    price: "From $1,497",
    description:
      "Templates and systems to help therapists delegate clearly, review AHA work and keep therapy plans moving safely.",
    icon: <ClipboardList size={26} />,
    includes: [
      "Therapist delegation framework",
      "Treatment plan handover templates",
      "Review and feedback systems",
      "Clinical communication templates",
    ],
  },
  {
    title: "Clinic Systems Pack",
    price: "From $2,497",
    description:
      "A practical operating system for clinics wanting stronger AHA workflows, accountability, reporting and team structure.",
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
      "High-value templates for clinics needing clearer policies, risk processes, documentation standards and governance systems.",
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
      "Editable trackers and dashboards to help clinics monitor treatment plans, waitlists, capacity, KPIs and reporting.",
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
      "Templates for clinic owners and managers supporting recruitment, onboarding, induction, reviews and team accountability.",
    icon: <FileText size={26} />,
    includes: [
      "Position description templates",
      "Interview and induction checklists",
      "Performance review templates",
      "Employer flowchart templates",
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
            Premium clinic systems, frameworks, templates and trackers are being
            organised for Allied Health Assistant teams, therapists, managers
            and clinic owners.
          </p>
        </div>

        <section className="mb-8 overflow-hidden rounded-4xl border border-[#e8e4de] bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1fr_0.72fr]">
            <div className="p-8 md:p-12">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#f0fdfa] px-4 py-2 text-sm font-semibold text-[#0f766e]">
                <Lock size={16} />
                Premium clinic resources
              </div>

              <h1 className="mb-5 text-4xl font-bold leading-tight md:text-5xl">
                Clinic systems that are too valuable to sit inside a standard
                membership.
              </h1>

              <p className="mb-7 max-w-3xl text-lg leading-relaxed text-[#5f5b73]">
                The AHAH resource shop will house the deeper frameworks,
                templates, spreadsheets and organisational systems that help
                teams work with more clarity, consistency and confidence.
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
                  View AHA membership
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <aside className="border-t border-[#e8e4de] bg-[#1e1b2e] p-8 text-white lg:border-l lg:border-t-0 md:p-10">
              <Sparkles className="mb-5 text-[#99f6e4]" size={34} />

              <h2 className="mb-4 text-2xl font-bold">
                What will be different about the shop?
              </h2>

              <div className="grid gap-4">
                <CheckItem text="Premium systems will be sold separately from the $57/month membership." />
                <CheckItem text="Resources will be designed for teams, clinics and managers." />
                <CheckItem text="Packs will support implementation, not just information." />
                <CheckItem text="AHA teams on the waitlist will be first to know when packs open." />
              </div>
            </aside>
          </div>
        </section>

        <section className="mb-8">
          <div className="mb-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Coming soon
            </p>

            <h2 className="text-3xl font-bold md:text-4xl">
              Premium resource packs being prepared.
            </h2>

            <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#6b6880]">
              These are higher-value clinic resources for organisations that
              want systems they can adapt, implement and build from.
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
                  Join waitlist for this pack
                  <ArrowRight size={15} />
                </a>
              </article>
            ))}
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
              Join the waitlist
            </p>

            <h2 className="mb-4 text-3xl font-bold">
              Be first to know when the premium resource shop opens.
            </h2>

            <p className="mb-5 text-base leading-relaxed text-[#6b6880]">
              This waitlist is for AHA teams, therapists, managers and clinic
              owners who want early updates when the premium packs are ready.
            </p>

            <div className="rounded-3xl bg-[#faf8f5] p-5">
              <p className="text-sm leading-relaxed text-[#5f5b73]">
                The $57/month AHA Professional Development membership will stay
                focused on webinars, reflection tools, starter templates and AHA
                support. These premium packs are separate, higher-value clinic
                systems.
              </p>
            </div>
          </div>

          <div>
            {success ? (
              <div className="mb-5 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5 text-[#0f766e]">
                <p className="font-semibold">You are on the waitlist.</p>
                <p className="mt-1 text-sm leading-relaxed">
                  We will let you know when the premium resource shop is ready.
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
                      Select a pack
                    </option>
                    <option value="AHA Framework Pack">
                      AHA Framework Pack
                    </option>
                    <option value="Therapist Framework Pack">
                      Therapist Framework Pack
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
                    <option value="Several packs">Several packs</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-semibold">
                  What would be most helpful for your team?
                </span>
                <textarea
                  name="message"
                  rows={5}
                  className="rounded-2xl border border-[#d8d3ca] bg-white px-4 py-3 text-sm outline-none focus:border-[#0f766e]"
                  placeholder="Tell us what systems, templates or supports your team is looking for."
                />
              </label>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Join the resource shop waitlist
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