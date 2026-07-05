"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ClipboardList,
  Loader2,
  Mail,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

type ReflectionForm = {
  name: string;
  email: string;
  role: string;
  organisation: string;
  preferred_provider: string;
  session_goal: string;
  current_context: string;
  supervision_context: string;
  what_have_you_tried: string;
  what_feels_unclear: string;
  hoped_outcome: string;
  understands_not_supervision: boolean;
};

const ROLE_OPTIONS = [
  "Allied Health Assistant",
  "Therapy Assistant",
  "Student",
  "Educator",
  "Allied Health Professional",
  "Manager / Team Leader",
  "Parent / Carer",
  "Other",
];

const PROVIDER_OPTIONS = [
  "Robyn — Developmental Educator",
  "Occupational Therapist",
  "Psychologist",
  "Best fit based on my reflection",
  "Not sure yet",
];

export default function ReflectivePracticePage() {
  const supabase = useMemo(() => createClient(), []);

  const [form, setForm] = useState<ReflectionForm>({
    name: "",
    email: "",
    role: ROLE_OPTIONS[0],
    organisation: "",
    preferred_provider: PROVIDER_OPTIONS[3],
    session_goal: "",
    current_context: "",
    supervision_context: "",
    what_have_you_tried: "",
    what_feels_unclear: "",
    hoped_outcome: "",
    understands_not_supervision: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validEmail = /\S+@\S+\.\S+/.test(form.email);

  const canSubmit =
    Boolean(form.name.trim()) &&
    validEmail &&
    Boolean(form.session_goal.trim()) &&
    Boolean(form.current_context.trim()) &&
    Boolean(form.supervision_context.trim()) &&
    Boolean(form.hoped_outcome.trim()) &&
    form.understands_not_supervision;

  const updateForm = <K extends keyof ReflectionForm>(
    key: K,
    value: ReflectionForm[K]
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const submitReflection = async () => {
    setErrorMessage("");

    if (!canSubmit) {
      setErrorMessage(
        "Please complete the required fields and confirm that you understand this is reflective practice, not a replacement for workplace supervision."
      );
      return;
    }

    setSubmitting(true);

    const cleanForm = {
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role,
      organisation: form.organisation.trim(),
      preferred_provider: form.preferred_provider,
      session_goal: form.session_goal.trim(),
      current_context: form.current_context.trim(),
      supervision_context: form.supervision_context.trim(),
      what_have_you_tried: form.what_have_you_tried.trim(),
      what_feels_unclear: form.what_feels_unclear.trim(),
      hoped_outcome: form.hoped_outcome.trim(),
      understands_not_supervision: form.understands_not_supervision,
      status: "reflection_received",
    };

    const { error } = await supabase
      .from("reflective_practice_requests")
      .insert(cleanForm);

    setSubmitting(false);

    if (error) {
      console.error("REFLECTIVE PRACTICE REQUEST ERROR:", error);
      setErrorMessage(error.message || "Something went wrong. Please try again.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="mb-6">
          <Link
            href="/subscribe"
            className="inline-flex items-center gap-2 rounded-full border border-[#e8e4de] bg-white px-4 py-2 text-sm font-semibold text-[#6b6880] transition hover:border-[#99f6e4] hover:bg-[#f0fdfa] hover:text-[#0f766e]"
          >
            <ArrowLeft size={15} />
            Back to AHA PD options
          </Link>
        </div>

        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
                1:1 Reflective Practice
              </p>

              <h1 className="mb-5 text-4xl font-bold leading-tight md:text-6xl">
                Reflection first. Booking second.
              </h1>

              <p className="mb-6 max-w-3xl text-base leading-relaxed text-[#6b6880] md:text-lg">
                This form helps make sure a 1:1 reflective practice session is
                purposeful, prepared and appropriate. Booking and payment details
                are only sent after your reflection has been reviewed.
              </p>

              <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
                <div className="flex gap-3">
                  <ShieldCheck
                    size={22}
                    className="mt-0.5 shrink-0 text-[#0f766e]"
                  />

                  <div>
                    <p className="mb-1 text-sm font-semibold text-[#0f766e]">
                      Important professional boundary
                    </p>

                    <p className="text-sm leading-relaxed text-[#3f5f5a]">
                      Reflective practice is professional development support.
                      It does not replace the supervision, direction,
                      delegation, clinical oversight or workplace
                      responsibilities provided by the allied health
                      professional, employer or service you work under.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <UserRoundCheck size={24} />
              </div>

              <h2 className="mb-3 text-2xl font-bold">$193 AUD per session</h2>

              <p className="mb-5 text-sm leading-relaxed text-[#3f5f5a]">
                Sessions may be offered by Robyn as a Developmental Educator, or
                by an OT or Psych where appropriate.
              </p>

              <div className="space-y-3 text-sm leading-relaxed text-[#3f5f5a]">
                <p>Step 1: Complete this reflection form.</p>
                <p>Step 2: Robyn or the team reviews your answers.</p>
                <p>Step 3: If appropriate, booking and payment details are sent.</p>
                <p>Step 4: Attend your reflective practice session.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          {submitted ? (
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <Check size={30} />
              </div>

              <h2 className="mb-4 text-3xl font-bold">
                Your reflection has been received.
              </h2>

              <p className="mb-6 text-base leading-relaxed text-[#6b6880]">
                Thank you. Your reflection will be reviewed before any booking
                or payment link is sent. This helps make sure the session is
                useful, prepared and within the right professional boundary.
              </p>

              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/join"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-6 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
                >
                  Visit free community
                  <ArrowRight size={15} />
                </Link>

                <Link
                  href="/subscribe"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
                >
                  Back to PD options
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8 max-w-3xl">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
                  Reflection form
                </p>

                <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                  Tell us what you want to reflect on.
                </h2>

                <p className="text-base leading-relaxed text-[#6b6880]">
                  The more thoughtful the reflection, the more useful the
                  session can be. This is not about writing perfectly. It is
                  about coming prepared.
                </p>
              </div>

              {errorMessage ? (
                <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {errorMessage}
                </div>
              ) : null}

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold">
                    Your name
                  </label>
                  <input
                    value={form.name}
                    onChange={(event) => updateForm("name", event.target.value)}
                    placeholder="First and last name"
                    className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-3 text-sm outline-none transition focus:border-[#0f766e]"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => updateForm("email", event.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-3 text-sm outline-none transition focus:border-[#0f766e]"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold">
                    Your role
                  </label>
                  <select
                    value={form.role}
                    onChange={(event) => updateForm("role", event.target.value)}
                    className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-3 text-sm outline-none transition focus:border-[#0f766e]"
                  >
                    {ROLE_OPTIONS.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold">
                    Organisation or service
                  </label>
                  <input
                    value={form.organisation}
                    onChange={(event) =>
                      updateForm("organisation", event.target.value)
                    }
                    placeholder="Optional"
                    className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-3 text-sm outline-none transition focus:border-[#0f766e]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold">
                    Preferred session provider
                  </label>
                  <select
                    value={form.preferred_provider}
                    onChange={(event) =>
                      updateForm("preferred_provider", event.target.value)
                    }
                    className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-3 text-sm outline-none transition focus:border-[#0f766e]"
                  >
                    {PROVIDER_OPTIONS.map((provider) => (
                      <option key={provider} value={provider}>
                        {provider}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold">
                    What is the main goal of this reflective practice session?
                  </label>
                  <textarea
                    rows={4}
                    value={form.session_goal}
                    onChange={(event) =>
                      updateForm("session_goal", event.target.value)
                    }
                    placeholder="What do you want to think through, understand more clearly, or leave the session feeling more confident about?"
                    className="w-full resize-none rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-3 text-sm outline-none transition focus:border-[#0f766e]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold">
                    What is the current context?
                  </label>
                  <textarea
                    rows={4}
                    value={form.current_context}
                    onChange={(event) =>
                      updateForm("current_context", event.target.value)
                    }
                    placeholder="Tell us briefly about your role, setting, current challenge or situation you want to reflect on. Please do not include identifying client details."
                    className="w-full resize-none rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-3 text-sm outline-none transition focus:border-[#0f766e]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold">
                    Who currently provides your workplace direction or
                    supervision?
                  </label>
                  <textarea
                    rows={3}
                    value={form.supervision_context}
                    onChange={(event) =>
                      updateForm("supervision_context", event.target.value)
                    }
                    placeholder="For example: an OT, Speech Pathologist, Physio, Psychologist, employer, team leader or placement supervisor."
                    className="w-full resize-none rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-3 text-sm outline-none transition focus:border-[#0f766e]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold">
                    What have you already tried or considered?
                  </label>
                  <textarea
                    rows={3}
                    value={form.what_have_you_tried}
                    onChange={(event) =>
                      updateForm("what_have_you_tried", event.target.value)
                    }
                    placeholder="This helps us know what preparation you have already done."
                    className="w-full resize-none rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-3 text-sm outline-none transition focus:border-[#0f766e]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold">
                    What still feels unclear?
                  </label>
                  <textarea
                    rows={3}
                    value={form.what_feels_unclear}
                    onChange={(event) =>
                      updateForm("what_feels_unclear", event.target.value)
                    }
                    placeholder="What are you unsure about, stuck on, or wanting to reflect on more deeply?"
                    className="w-full resize-none rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-3 text-sm outline-none transition focus:border-[#0f766e]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold">
                    What would make the session feel useful?
                  </label>
                  <textarea
                    rows={3}
                    value={form.hoped_outcome}
                    onChange={(event) =>
                      updateForm("hoped_outcome", event.target.value)
                    }
                    placeholder="For example: clearer language, next steps, questions to ask your supervising professional, confidence in your role, or a better understanding of boundaries."
                    className="w-full resize-none rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-3 text-sm outline-none transition focus:border-[#0f766e]"
                  />
                </div>

                <div className="md:col-span-2 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
                  <label className="flex cursor-pointer gap-3">
                    <input
                      type="checkbox"
                      checked={form.understands_not_supervision}
                      onChange={(event) =>
                        updateForm(
                          "understands_not_supervision",
                          event.target.checked
                        )
                      }
                      className="mt-1 h-4 w-4"
                    />

                    <span className="text-sm leading-relaxed text-[#3f5f5a]">
                      I understand this is a reflective practice session and
                      professional development support. It does not replace
                      workplace supervision, clinical supervision, delegation,
                      direction, clinical oversight or the responsibilities of
                      my employer or supervising allied health professional.
                    </span>
                  </label>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-relaxed text-[#6b6880]">
                  Booking and payment details are only sent after the reflection
                  has been reviewed.
                </p>

                <button
                  type="button"
                  onClick={submitReflection}
                  disabled={submitting || !canSubmit}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Mail size={16} />
                  )}
                  {submitting ? "Submitting…" : "Submit reflection"}
                </button>
              </div>
            </>
          )}
        </section>
      </section>
    </main>
  );
}