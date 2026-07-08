import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  MessageCircleHeart,
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
    <main className="min-h-screen bg-[#faf8f5] px-6 py-14 text-[#1e1b2e] md:py-20">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Built with AHAs, managers and clinics
          </p>
          <p className="mt-2 text-base leading-relaxed text-[#3f5f5a]">
            We are building this platform from scratch with feedback from AHAs,
            clinic owners, managers and supervising professionals. More team
            options, resources and support pathways are coming soon.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <section>
            <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              For managers and clinics
            </p>

            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
              Support your AHA team without building everything from scratch.
            </h1>

            <p className="mb-8 max-w-3xl text-xl leading-relaxed text-[#5f5b73]">
              Give your AHAs access to practical monthly professional
              development, reusable tools and reflective support options that
              help them feel clearer, more confident and more connected in their
              work.
            </p>

            <div className="mb-8 rounded-4xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <UsersRound size={24} />
              </div>

              <h2 className="mb-4 text-3xl font-bold">
                Small team access
              </h2>

              <div className="mb-5 rounded-3xl bg-[#faf8f5] p-5">
                <p className="text-sm font-semibold text-[#6b6880]">
                  Up to 5 staff
                </p>
                <p className="mt-1 text-4xl font-bold">$57/month</p>
                <p className="mt-2 text-sm leading-relaxed text-[#6b6880]">
                  Suitable for small clinics or teams wanting access to the
                  monthly AHA Professional Development webinars and member
                  resources.
                </p>
              </div>

              <div className="grid gap-3">
                <CheckItem text="Monthly live AHA Professional Development webinars" />
                <CheckItem text="Member library access for eligible staff" />
                <CheckItem text="PDFs, recordings and tools as they are added" />
                <CheckItem text="Designed to support AHAs with practical ideas and role clarity" />
              </div>

              <Link
                href="/subscribe"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Start monthly access
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-6 shadow-sm md:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <MessageCircleHeart size={24} />
              </div>

              <h2 className="mb-4 text-3xl font-bold">
                Need support for more than 5 staff?
              </h2>

              <p className="mb-5 text-base leading-relaxed text-[#3f5f5a]">
                If your team is larger, mixed across disciplines, or you want to
                combine monthly webinars with 1:1 reflective practice, complete
                the team enquiry form. We will review your team needs and
                organise a quote.
              </p>

              <div className="grid gap-3">
                <CheckItem text="Tell us how many AHAs are in your team" />
                <CheckItem text="Tell us which disciplines or supervising professionals are involved" />
                <CheckItem text="Choose monthly webinars, 1:1 reflective practice, or both" />
                <CheckItem text="We will follow up with a suitable quote" />
              </div>
            </div>
          </section>

          <aside className="rounded-4xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
            {success ? (
              <SuccessBox />
            ) : (
              <>
                <div className="mb-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                    <ClipboardList size={24} />
                  </div>

                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                    Team quote form
                  </p>

                  <h2 className="mb-3 text-3xl font-bold">
                    Tell us about your AHA team.
                  </h2>

                  <p className="text-base leading-relaxed text-[#6b6880]">
                    Keep it simple. This helps us understand whether you need
                    monthly webinar access, 1:1 reflective practice, or a
                    tailored team option.
                  </p>
                </div>

                <form action={submitManagerPathwayRequest} className="grid gap-5">
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
                      { label: "20+ staff", value: "20+" },
                      { label: "Not sure yet", value: "Not sure" },
                    ]}
                  />

                  <TextareaField
                    label="Which disciplines are involved?"
                    name="disciplines"
                    placeholder="Example: Speech Pathology, OT, Physiotherapy, Exercise Physiology, Developmental Education..."
                  />

                  <SelectField
                    label="What support are you interested in?"
                    name="supportType"
                    required
                    options={[
                      { label: "Choose one", value: "" },
                      {
                        label: "Monthly webinars only",
                        value: "Monthly webinars only",
                      },
                      {
                        label: "1:1 reflective practice only",
                        value: "1:1 reflective practice only",
                      },
                      {
                        label: "Monthly webinars and 1:1 reflective practice",
                        value: "Monthly webinars and 1:1 reflective practice",
                      },
                      {
                        label: "Not sure — help me choose",
                        value: "Not sure",
                      },
                    ]}
                  />

                  <TextareaField
                    label="Team emails, if you already know them"
                    name="teamEmails"
                    placeholder="Optional. Add one email per line or separate with commas."
                  />

                  <TextareaField
                    label="Anything else we should know?"
                    name="message"
                    placeholder="Optional. Tell us what would help your team most."
                  />

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
                  >
                    Request a team quote
                    <ArrowRight size={18} />
                  </button>

                  <p className="text-sm leading-relaxed text-[#6b6880]">
                    We will review your team details and follow up with the best
                    next step.
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
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
        <Video size={24} />
      </div>

      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
        Request received
      </p>

      <h1 className="mb-4 text-3xl font-bold">
        Thank you. Your team quote request has been sent.
      </h1>

      <p className="mb-6 text-base leading-relaxed text-[#6b6880]">
        We will review your team size, disciplines and support preferences, then
        follow up with the best next step.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
        >
          Back to home
        </Link>

        <Link
          href="/subscribe"
          className="inline-flex items-center justify-center rounded-full border border-[#0f766e] bg-white px-6 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#f0fdfa]"
        >
          View webinars
        </Link>
      </div>
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3">
      <CheckCircle2 className="mt-0.5 shrink-0 text-[#0f766e]" size={18} />
      <p className="text-base leading-relaxed text-[#5f5b73]">{text}</p>
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