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
  Users,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

type ManagerForm = {
  name: string;
  email: string;
  organisation: string;
  role: string;
  team_size: string;
  current_aha_support: string;
  interested_in: string;
  biggest_need: string;
  questions: string;
};

const ROLE_OPTIONS = [
  "Clinic owner",
  "Practice manager",
  "Team leader",
  "Allied health professional",
  "Educator / service leader",
  "AHA coordinator",
  "Other",
];

const TEAM_SIZE_OPTIONS = [
  "1 AHA / therapy assistant",
  "2–3 AHAs / therapy assistants",
  "4–6 AHAs / therapy assistants",
  "7–10 AHAs / therapy assistants",
  "11+ AHAs / therapy assistants",
  "We are planning to hire AHAs",
  "Not sure yet",
];

const SUPPORT_OPTIONS = [
  "We provide regular internal supervision",
  "We provide supervision, but want more reflective PD support",
  "We are still working out how to support AHAs well",
  "We are planning to hire AHAs and want to prepare",
  "Not sure yet",
];

const INTEREST_OPTIONS = [
  "Foundation AHA PD library access",
  "Individual topic access for staff",
  "1:1 reflective practice for AHAs",
  "Team reflective PD session",
  "Support designing an AHA pathway",
  "Not sure yet",
];

const NEED_OPTIONS = [
  "Role clarity and boundaries",
  "Helping AHAs work under direction",
  "Reflective practice and communication",
  "Consistency across the team",
  "Reducing pressure on therapists",
  "Preparing AHAs before sessions",
  "Supporting confidence and professional growth",
  "Something else",
];

export default function ManagerPathwayPage() {
  const supabase = useMemo(() => createClient(), []);

  const [form, setForm] = useState<ManagerForm>({
    name: "",
    email: "",
    organisation: "",
    role: ROLE_OPTIONS[0],
    team_size: TEAM_SIZE_OPTIONS[0],
    current_aha_support: SUPPORT_OPTIONS[0],
    interested_in: INTEREST_OPTIONS[0],
    biggest_need: NEED_OPTIONS[0],
    questions: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validEmail = /\S+@\S+\.\S+/.test(form.email);
  const canSubmit =
    Boolean(form.name.trim()) &&
    validEmail &&
    Boolean(form.organisation.trim());

  const updateForm = (key: keyof ManagerForm, value: string) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const submitManagerRequest = async () => {
    setErrorMessage("");

    if (!canSubmit) {
      setErrorMessage(
        "Please add your name, organisation and a valid email address."
      );
      return;
    }

    setSubmitting(true);

    const cleanForm: ManagerForm = {
      name: form.name.trim(),
      email: form.email.trim(),
      organisation: form.organisation.trim(),
      role: form.role,
      team_size: form.team_size,
      current_aha_support: form.current_aha_support,
      interested_in: form.interested_in,
      biggest_need: form.biggest_need,
      questions: form.questions.trim(),
    };

    const { error } = await supabase
      .from("manager_pathway_requests")
      .insert(cleanForm);

    setSubmitting(false);

    if (error) {
      console.error("MANAGER PATHWAY REQUEST ERROR:", error);
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
                Manager and team pathway
              </p>

              <h1 className="mb-5 text-4xl font-bold leading-tight md:text-6xl">
                Support your AHAs without blurring supervision boundaries.
              </h1>

              <p className="mb-6 max-w-3xl text-base leading-relaxed text-[#6b6880] md:text-lg">
                This pathway is for clinic owners, managers, allied health
                professionals and service leaders who want their AHAs to access
                foundation reflective professional development, practical tools
                and structured reflection support.
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
                      This pathway supports reflective professional development.
                      It does not replace workplace supervision, clinical
                      supervision, delegation, direction, clinical oversight or
                      the governance responsibilities of the employer or
                      supervising allied health professional.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <Users size={24} />
              </div>

              <h2 className="mb-3 text-2xl font-bold">
                What this could support
              </h2>

              <div className="space-y-3 text-sm leading-relaxed text-[#3f5f5a]">
                <p>Foundation AHA PD library access for staff.</p>
                <p>Topic-based reflective prompts and practical tools.</p>
                <p>1:1 reflective practice after form review.</p>
                <p>Future team reflective PD options.</p>
                <p>Clearer language around AHA role boundaries.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-3">
          <article className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <ClipboardList size={22} />
            </div>

            <h2 className="mb-3 text-xl font-bold">Foundation PD access</h2>

            <p className="text-sm leading-relaxed text-[#6b6880]">
              Give AHAs access to foundation topics around role clarity,
              reflective practice, communication and working under direction.
            </p>
          </article>

          <article className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <Users size={22} />
            </div>

            <h2 className="mb-3 text-xl font-bold">Team support</h2>

            <p className="text-sm leading-relaxed text-[#6b6880]">
              Register interest in future team options, topic bundles or
              reflective PD sessions designed for groups of AHAs.
            </p>
          </article>

          <article className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <ShieldCheck size={22} />
            </div>

            <h2 className="mb-3 text-xl font-bold">Protected boundaries</h2>

            <p className="text-sm leading-relaxed text-[#6b6880]">
              Keep reflective professional development separate from clinical
              supervision, governance and workplace delegation responsibilities.
            </p>
          </article>
        </section>

        <section className="rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          {submitted ? (
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <Check size={30} />
              </div>

              <h2 className="mb-4 text-3xl font-bold">
                Your manager pathway interest has been received.
              </h2>

              <p className="mb-6 text-base leading-relaxed text-[#6b6880]">
                Thank you. Your answers will help shape the manager and team
                options for foundation AHA Professional Development.
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
                  Register manager/team interest
                </p>

                <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                  Tell me what your team may need.
                </h2>

                <p className="text-base leading-relaxed text-[#6b6880]">
                  This does not lock you into anything. It helps shape whether
                  team access, topic bundles, 1:1 reflective practice or a
                  manager pathway would be useful.
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
                    Organisation / clinic / service
                  </label>
                  <input
                    value={form.organisation}
                    onChange={(event) =>
                      updateForm("organisation", event.target.value)
                    }
                    placeholder="Organisation name"
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
                    Team size
                  </label>
                  <select
                    value={form.team_size}
                    onChange={(event) =>
                      updateForm("team_size", event.target.value)
                    }
                    className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-3 text-sm outline-none transition focus:border-[#0f766e]"
                  >
                    {TEAM_SIZE_OPTIONS.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold">
                    Current AHA support
                  </label>
                  <select
                    value={form.current_aha_support}
                    onChange={(event) =>
                      updateForm("current_aha_support", event.target.value)
                    }
                    className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-3 text-sm outline-none transition focus:border-[#0f766e]"
                  >
                    {SUPPORT_OPTIONS.map((support) => (
                      <option key={support} value={support}>
                        {support}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold">
                    I am most interested in
                  </label>
                  <select
                    value={form.interested_in}
                    onChange={(event) =>
                      updateForm("interested_in", event.target.value)
                    }
                    className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-3 text-sm outline-none transition focus:border-[#0f766e]"
                  >
                    {INTEREST_OPTIONS.map((interest) => (
                      <option key={interest} value={interest}>
                        {interest}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold">
                    Biggest need
                  </label>
                  <select
                    value={form.biggest_need}
                    onChange={(event) =>
                      updateForm("biggest_need", event.target.value)
                    }
                    className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-3 text-sm outline-none transition focus:border-[#0f766e]"
                  >
                    {NEED_OPTIONS.map((need) => (
                      <option key={need} value={need}>
                        {need}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold">
                    Anything else you want me to know?
                  </label>
                  <textarea
                    rows={4}
                    value={form.questions}
                    onChange={(event) =>
                      updateForm("questions", event.target.value)
                    }
                    placeholder="For example: what you are trying to solve, what your AHAs need, what your therapists are finding hard, or what kind of team option would be useful."
                    className="w-full resize-none rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-3 text-sm outline-none transition focus:border-[#0f766e]"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-relaxed text-[#6b6880]">
                  This is an interest form only. It helps shape the manager and
                  team pathway.
                </p>

                <button
                  type="button"
                  onClick={submitManagerRequest}
                  disabled={submitting || !canSubmit}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Mail size={16} />
                  )}
                  {submitting ? "Submitting…" : "Register interest"}
                </button>
              </div>
            </>
          )}
        </section>
      </section>
    </main>
  );
}