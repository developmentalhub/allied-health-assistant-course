import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  Mail,
  ShieldCheck,
  Users,
} from "lucide-react";
import { submitManagerPathwayRequest } from "./actions";

export const metadata: Metadata = {
  title: "Manager Team Hub — AHA Professional Development",
  description:
    "Add team members, request AHA webinar series access, and register interest in future clinic induction and growth programs.",
};

type ManagerPathwayPageProps = {
  searchParams?: Promise<{
    success?: string;
    error?: string;
  }>;
};

export default async function ManagerPathwayPage({
  searchParams,
}: ManagerPathwayPageProps) {
  const params = await searchParams;
  const success = params?.success === "true";
  const error = params?.error;

  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-14 text-[#1e1b2e] md:py-20">
      <section className="mx-auto max-w-6xl">
        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
                Manager and clinic hub
              </p>

              <h1 className="mb-5 text-4xl font-bold leading-tight md:text-6xl">
                Manage AHA webinar access for your team in one place.
              </h1>

              <p className="mb-6 max-w-2xl text-base leading-relaxed text-[#6b6880] md:text-lg">
                This page is for clinic owners, practice managers and team
                leaders who want to organise AHA Professional Development for
                multiple staff members without sending everyone through
                separately.
              </p>

              <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
                <div className="flex gap-3">
                  <ShieldCheck
                    size={22}
                    className="mt-0.5 shrink-0 text-[#0f766e]"
                  />

                  <div>
                    <p className="mb-1 text-sm font-semibold text-[#0f766e]">
                      Clear professional boundary
                    </p>

                    <p className="text-sm leading-relaxed text-[#3f5f5a]">
                      The AHA Professional Development membership provides
                      reflective professional development, monthly webinars, PDF
                      resources and recordings. It does not replace workplace
                      supervision, clinical supervision, delegation, direction,
                      clinical oversight or employer governance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-6 md:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <Users size={24} />
              </div>

              <h2 className="mb-3 text-2xl font-bold">
                What managers can use this for
              </h2>

              <div className="space-y-3 text-sm leading-relaxed text-[#3f5f5a]">
                <p>Add individual AHA or educator email addresses.</p>
                <p>Request team access to the monthly webinar series.</p>
                <p>Check who still needs to sign up.</p>
                <p>Register interest in future clinic induction programs.</p>
                <p>Register interest in future clinic growth programs.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-3">
          <FeatureCard
            icon={<Mail size={22} />}
            title="Add team emails"
            description="Paste staff emails in one box so your team can be followed up together."
          />

          <FeatureCard
            icon={<ClipboardList size={22} />}
            title="Track webinar interest"
            description="Use the manager hub to organise who needs access to the monthly webinar series."
          />

          <FeatureCard
            icon={<Building2 size={22} />}
            title="Future clinic programs"
            description="Register interest in clinic induction and business growth pathways as they are developed."
          />
        </section>

        <section className="rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          {success ? (
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <CheckCircle2 size={34} />
              </div>

              <h2 className="mb-4 text-3xl font-bold">
                Your manager hub request has been received.
              </h2>

              <p className="mb-6 text-base leading-relaxed text-[#6b6880]">
                Thank you. Your team details have been submitted. We’ll review
                the request and use the email list to help organise access,
                webinar sign-ups or team options.
              </p>

              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/subscribe"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-6 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
                >
                  View AHA membership
                  <ArrowRight size={15} />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
                >
                  Contact us
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8 max-w-3xl">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
                  Set up team access
                </p>

                <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                  Add your team details.
                </h2>

                <p className="text-base leading-relaxed text-[#6b6880]">
                  Add your manager details, paste in your team’s email
                  addresses, and choose what you want support with. This does not
                  automatically charge your team. It creates a manager request
                  so access can be organised properly.
                </p>
              </div>

              {error ? (
                <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-700">
                  {decodeURIComponent(error)}
                </div>
              ) : null}

              <form action={submitManagerPathwayRequest} className="space-y-8">
                <section>
                  <h3 className="mb-4 text-2xl font-bold">
                    Manager details
                  </h3>

                  <div className="grid gap-5 md:grid-cols-2">
                    <TextInput
                      label="Your name"
                      name="fullName"
                      placeholder="First and last name"
                      required
                    />

                    <TextInput
                      label="Your email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                    />

                    <TextInput
                      label="Phone"
                      name="phone"
                      placeholder="Optional"
                    />

                    <TextInput
                      label="Clinic, organisation or service"
                      name="organisation"
                      placeholder="Organisation name"
                      required
                    />

                    <TextInput
                      label="Your role"
                      name="role"
                      placeholder="Clinic owner, manager, team leader"
                    />

                    <TextInput
                      label="Approximate team size"
                      name="teamSize"
                      placeholder="For example: 3 AHAs, 8 educators, whole team"
                    />
                  </div>
                </section>

                <section className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
                    <Mail size={24} />
                  </div>

                  <h3 className="mb-3 text-2xl font-bold">
                    Team email addresses
                  </h3>

                  <p className="mb-5 max-w-3xl text-sm leading-relaxed text-[#3f5f5a]">
                    Paste each staff member’s email on a new line, or separate
                    them with commas. These are the people you may want added to
                    the AHA webinar series or future team access.
                  </p>

                  <label
                    htmlFor="teamEmails"
                    className="mb-2 block text-sm font-semibold text-[#1e1b2e]"
                  >
                    Team emails
                  </label>

                  <textarea
                    id="teamEmails"
                    name="teamEmails"
                    rows={7}
                    className="w-full rounded-2xl border border-[#99f6e4] bg-white px-4 py-3 text-base outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#99f6e4]"
                    placeholder={`staff1@example.com\nstaff2@example.com\nstaff3@example.com`}
                  />

                  <p className="mt-3 text-sm leading-relaxed text-[#3f5f5a]">
                    You can submit this now even if you do not have every email
                    yet. We can add more later.
                  </p>
                </section>

                <section>
                  <h3 className="mb-4 text-2xl font-bold">
                    What are you interested in?
                  </h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    <CheckboxCard
                      name="wantsWebinarSeries"
                      title="Monthly AHA webinar series"
                      description="For managers who want their AHAs or educators added to the $57/month webinar, PDF and recording membership."
                    />

                    <CheckboxCard
                      name="wantsTeamQuote"
                      title="Team or clinic quote"
                      description="For clinics wanting multiple seats or a simpler team access arrangement."
                    />

                    <CheckboxCard
                      name="wantsClinicInduction"
                      title="Future clinic induction program"
                      description="Register interest in a future induction pathway for AHAs joining your clinic or service."
                    />

                    <CheckboxCard
                      name="wantsGrowthProgram"
                      title="Future clinic growth program"
                      description="Register interest in future business, workforce or service growth programs connected to AHA team development."
                    />
                  </div>
                </section>

                <section>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-[#1e1b2e]"
                  >
                    Notes for Robyn and Jess
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full rounded-2xl border border-[#e8e4de] bg-white px-4 py-3 text-base outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#99f6e4]"
                    placeholder="For example: which team members need access first, whether you want to pay as a clinic, or what you want the future induction/growth program to include."
                  />
                </section>

                <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
                  <p className="text-sm leading-relaxed text-[#6b6880]">
                    Submitting this form does not automatically create paid
                    accounts or charge your clinic. It creates a manager request
                    so we can organise the right next step for your team.
                  </p>
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
                >
                  Submit manager hub request
                  <ArrowRight size={16} />
                </button>
              </form>
            </>
          )}
        </section>
      </section>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
        {icon}
      </div>

      <h2 className="mb-3 text-xl font-bold">{title}</h2>

      <p className="text-sm leading-relaxed text-[#6b6880]">{description}</p>
    </article>
  );
}

function TextInput({
  label,
  name,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-[#1e1b2e]"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-2xl border border-[#e8e4de] bg-white px-4 py-3 text-base outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#99f6e4]"
        placeholder={placeholder}
      />
    </div>
  );
}

function CheckboxCard({
  name,
  title,
  description,
}: {
  name: string;
  title: string;
  description: string;
}) {
  return (
    <label className="flex cursor-pointer gap-4 rounded-3xl border border-[#e8e4de] bg-white p-5 shadow-sm transition hover:border-[#99f6e4] hover:bg-[#f0fdfa]">
      <input
        name={name}
        type="checkbox"
        className="mt-1 h-5 w-5 shrink-0 rounded border-[#e8e4de] accent-[#0f766e]"
      />

      <span>
        <span className="mb-1 block text-base font-bold text-[#1e1b2e]">
          {title}
        </span>

        <span className="block text-sm leading-relaxed text-[#6b6880]">
          {description}
        </span>
      </span>
    </label>
  );
}