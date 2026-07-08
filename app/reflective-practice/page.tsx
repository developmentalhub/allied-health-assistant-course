import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  MessageCircleHeart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { submitReflectivePracticeRequest } from "./actions";

type PageProps = {
  searchParams?: Promise<{
    success?: string;
  }>;
};

export default async function ReflectivePracticePage({
  searchParams,
}: PageProps) {
  const resolvedSearchParams = await searchParams;
  const success = resolvedSearchParams?.success === "true";

  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-14 text-[#1e1b2e] md:py-20">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Built with AHAs, for AHAs
          </p>
          <p className="mt-2 text-base leading-relaxed text-[#3f5f5a]">
            We are building this platform from scratch with feedback from AHAs,
            managers and clinics. More reflective practice options, resources
            and provider pathways are coming soon.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              1:1 reflective support
            </p>

            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
              Talk through the work with someone who understands the pressure,
              care and skill AHAs bring.
            </h1>

            <p className="mb-8 max-w-3xl text-xl leading-relaxed text-[#5f5b73]">
              Book a 1:1 reflective practice request if you want support with a
              real session, a child you are thinking about, your confidence, your
              role, your clinic work or the way you support children to thrive.
            </p>

            <div className="mb-8 rounded-[2rem] border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <HeartHandshake size={24} />
              </div>

              <h2 className="mb-4 text-3xl font-bold">
                What a 1:1 session can support
              </h2>

              <div className="grid gap-3">
                <CheckItem text="Therapy session ideas when you feel stuck" />
                <CheckItem text="Confidence when Plan A does not go to plan" />
                <CheckItem text="Role clarity and communication in the clinic" />
                <CheckItem text="Supporting children with skill and compassion" />
                <CheckItem text="Reflecting on what worked, what felt hard, and what to try next" />
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <ShieldCheck size={24} />
              </div>

              <h2 className="mb-4 text-2xl font-bold">
                Important note
              </h2>

              <p className="text-base leading-relaxed text-[#6b6880]">
                Reflective practice does not replace clinical supervision or
                direction from the supervising allied health professional. It is
                designed to support confidence, reflection, communication, role
                clarity and practical thinking.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
            {success ? (
              <SuccessBox />
            ) : (
              <>
                <div className="mb-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                    <MessageCircleHeart size={24} />
                  </div>

                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                    Request 1:1 support
                  </p>

                  <h2 className="mb-3 text-3xl font-bold">
                    Tell us what kind of support you are looking for.
                  </h2>

                  <p className="text-base leading-relaxed text-[#6b6880]">
                    Keep it simple. You do not need to write a long explanation.
                    We will follow up with the next step.
                  </p>
                </div>

                <form action={submitReflectivePracticeRequest} className="grid gap-5">
                  <TextField
                    label="Full name"
                    name="fullName"
                    required
                  />

                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    required
                  />

                  <TextField
                    label="Role"
                    name="role"
                    placeholder="AHA, therapy assistant, educator, manager..."
                  />

                  <TextField
                    label="Clinic or organisation"
                    name="organisation"
                    placeholder="Optional"
                  />

                  <SelectField
                    label="Preferred session provider"
                    name="preferredProvider"
                    required
                    options={[
                      {
                        label: "Choose a preferred session provider",
                        value: "",
                      },
                      {
                        label: "Developmental Educator",
                        value: "Developmental Educator",
                      },
                      {
                        label: "Speech Pathologist",
                        value: "Speech Pathologist",
                      },
                      {
                        label: "Clinic Business Coach",
                        value: "Clinic Business Coach",
                      },
                      {
                        label: "Exercise Physiologist",
                        value: "Exercise Physiologist",
                      },
                    ]}
                  />

                  <SelectField
                    label="What support are you looking for?"
                    name="supportFocus"
                    required
                    options={[
                      {
                        label: "Choose one",
                        value: "",
                      },
                      {
                        label: "Ideas for therapy sessions",
                        value: "Ideas for therapy sessions",
                      },
                      {
                        label: "Confidence and reflective practice",
                        value: "Confidence and reflective practice",
                      },
                      {
                        label: "Supporting a child with autism",
                        value: "Supporting a child with autism",
                      },
                      {
                        label: "Role clarity or communication",
                        value: "Role clarity or communication",
                      },
                      {
                        label: "Clinic or business support",
                        value: "Clinic or business support",
                      },
                    ]}
                  />

                  <SelectField
                    label="Preferred contact method"
                    name="preferredContactMethod"
                    options={[
                      {
                        label: "Email is fine",
                        value: "Email",
                      },
                      {
                        label: "Phone",
                        value: "Phone",
                      },
                      {
                        label: "Zoom",
                        value: "Zoom",
                      },
                    ]}
                  />

                  <TextareaField
                    label="Anything else you want us to know?"
                    name="notes"
                    placeholder="Optional. A few words is enough."
                  />

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
                  >
                    Request 1:1 support
                    <ArrowRight size={18} />
                  </button>

                  <p className="text-sm leading-relaxed text-[#6b6880]">
                    We will review your request and follow up with the best next
                    step. More booking and payment options are coming soon as the
                    platform grows.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function SuccessBox() {
  return (
    <div>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
        <Sparkles size={24} />
      </div>

      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
        Request received
      </p>

      <h1 className="mb-4 text-3xl font-bold">
        Thank you. Your 1:1 reflective practice request has been sent.
      </h1>

      <p className="mb-6 text-base leading-relaxed text-[#6b6880]">
        We will review your request and follow up with the next step. You do not
        need to submit the form again.
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
          View free webinar
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