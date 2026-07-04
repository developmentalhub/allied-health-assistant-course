"use client";

import { useMemo, useState } from "react";
import type { ElementType } from "react";
import {
  ArrowRight,
  Check,
  HelpCircle,
  Library,
  Loader2,
  Mail,
  MessageCircle,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Video,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

type WaitlistForm = {
  name: string;
  email: string;
  role: string;
  biggest_support_need: string;
  pricing_preference: string;
  main_question: string;
};

type Feature = {
  title: string;
  description: string;
  icon: ElementType;
};

type PriceOption = {
  title: string;
  price: string;
  note: string;
  highlight?: string;
  bestValue?: boolean;
};

const ROLE_OPTIONS = [
  "Allied Health Assistant",
  "Therapy Assistant",
  "Student",
  "Educator",
  "Allied Health Professional",
  "Parent / Carer",
  "Other",
];

const SUPPORT_OPTIONS = [
  "Understanding the AHA role",
  "Working well with therapists",
  "Supporting children’s regulation",
  "Movement and play ideas",
  "Thriving Kids updates",
  "Building confidence in sessions",
  "Finding work or understanding opportunities",
  "Something else",
];

const PRICING_OPTIONS = ["$19/month AUD", "$190/year AUD", "Not sure yet"];

const FEATURES: Feature[] = [
  {
    title: "Monthly live Zoom coaching with me",
    description:
      "Practical coaching, reflection and support around real AHA work, real questions and real settings.",
    icon: Video,
  },
  {
    title: "Growing library of recorded sessions",
    description:
      "Catch up in your own time and revisit key sessions whenever you need a refresh.",
    icon: Library,
  },
  {
    title: "Movement, regulation and play resources",
    description:
      "Practical resources mapped to everyday AHA work with children, educators, therapists and families.",
    icon: Sparkles,
  },
  {
    title: "Skill-building for everyday child support",
    description:
      "Build confidence supporting children in classrooms, therapy spaces, homes and community routines.",
    icon: ShieldCheck,
  },
  {
    title: "Get ready for Thriving Kids track",
    description:
      "Stay across the reform conversation and what it may mean for AHAs and the teams around them.",
    icon: ArrowRight,
  },
  {
    title: "Private members-only feed",
    description:
      "A closer space to ask questions, share wins, problem-solve and feel supported between live sessions.",
    icon: MessageCircle,
  },
  {
    title: "Priority answers to your questions",
    description:
      "Bring your questions and get clearer, practical answers that connect back to everyday practice.",
    icon: HelpCircle,
  },
];

const PRICE_OPTIONS: PriceOption[] = [
  {
    title: "Founding monthly",
    price: "$19/month AUD",
    note: "A low monthly option for early members who want to join the paid space as soon as it opens.",
    highlight: "Locked in for founding members",
  },
  {
    title: "Founding annual",
    price: "$190/year AUD",
    note: "Two months free compared with paying monthly, with the same founding member access.",
    highlight: "Best value",
    bestValue: true,
  },
];

export default function SubscribePage() {
  const supabase = useMemo(() => createClient(), []);

  const [form, setForm] = useState<WaitlistForm>({
    name: "",
    email: "",
    role: ROLE_OPTIONS[0],
    biggest_support_need: SUPPORT_OPTIONS[0],
    pricing_preference: PRICING_OPTIONS[0],
    main_question: "",
  });

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const validEmail = /\S+@\S+\.\S+/.test(form.email);
  const canSubmit = Boolean(form.name.trim() && validEmail);

  const updateForm = (key: keyof WaitlistForm, value: string) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const submitWaitlist = async () => {
    setErrorMessage("");

    if (!canSubmit) {
      setErrorMessage("Please add your name and a valid email address.");
      return;
    }

    setSubmitting(true);

    const cleanForm: WaitlistForm = {
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role,
      biggest_support_need: form.biggest_support_need,
      pricing_preference: form.pricing_preference,
      main_question: form.main_question.trim(),
    };

    const { error } = await supabase.from("paid_waitlist").insert(cleanForm);

    setSubmitting(false);

    if (error) {
      console.error("PAID WAITLIST INSERT ERROR:", error);
      setErrorMessage(error.message || "Something went wrong. Please try again.");
      return;
    }

    setSubmitted(true);
    setForm({
      name: "",
      email: "",
      role: ROLE_OPTIONS[0],
      biggest_support_need: SUPPORT_OPTIONS[0],
      pricing_preference: PRICING_OPTIONS[0],
      main_question: "",
    });
  };

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <div className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
            Coming soon
          </p>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h1 className="mb-5 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
                The paid AHA support space for people who want to feel ready,
                capable and connected.
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-[#6b6880] md:text-lg">
                The free community is your warm front door. The paid members
                space will be the deeper layer — with live coaching, recorded
                sessions, practical resources, Thriving Kids updates and closer
                support for the real everyday work of being an Allied Health
                Assistant.
              </p>
            </div>

            <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <Users size={24} />
              </div>

              <h2 className="mb-3 text-2xl font-bold">Join the waitlist</h2>

              <p className="mb-5 text-sm leading-relaxed text-[#3f5f5a]">
                Be the first to hear when founding member spots open, what is
                included, and how to lock in the lowest monthly rate.
              </p>

              {submitted ? (
                <div className="rounded-3xl border border-[#99f6e4] bg-white p-5">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#0f766e] text-white">
                    <Check size={22} />
                  </div>

                  <h3 className="mb-2 text-lg font-bold">
                    You&apos;re on the founding member interest list.
                  </h3>

                  <p className="text-sm leading-relaxed text-[#6b6880]">
                    Thank you — I&apos;ll let you know when founding member
                    access is ready to open.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {errorMessage ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                      {errorMessage}
                    </div>
                  ) : null}

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold">
                      Your name
                    </label>
                    <input
                      value={form.name}
                      onChange={(event) => updateForm("name", event.target.value)}
                      placeholder="First name is fine"
                      className="w-full rounded-2xl border border-[#e8e4de] bg-white p-3 text-sm outline-none transition focus:border-[#0f766e]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) => updateForm("email", event.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-2xl border border-[#e8e4de] bg-white p-3 text-sm outline-none transition focus:border-[#0f766e]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold">
                      I am a...
                    </label>
                    <select
                      value={form.role}
                      onChange={(event) => updateForm("role", event.target.value)}
                      className="w-full rounded-2xl border border-[#e8e4de] bg-white p-3 text-sm outline-none transition focus:border-[#0f766e]"
                    >
                      {ROLE_OPTIONS.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold">
                      What would you most want support with?
                    </label>
                    <select
                      value={form.biggest_support_need}
                      onChange={(event) =>
                        updateForm("biggest_support_need", event.target.value)
                      }
                      className="w-full rounded-2xl border border-[#e8e4de] bg-white p-3 text-sm outline-none transition focus:border-[#0f766e]"
                    >
                      {SUPPORT_OPTIONS.map((supportNeed) => (
                        <option key={supportNeed} value={supportNeed}>
                          {supportNeed}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold">
                      What is one question you would love answered inside the paid members space?
                    </label>
                    <textarea
                      rows={3}
                      value={form.main_question}
                      onChange={(event) =>
                        updateForm("main_question", event.target.value)
                      }
                      placeholder="For example: What can an AHA do independently? How do I support regulation? How do I work well with therapists?"
                      className="w-full resize-none rounded-2xl border border-[#e8e4de] bg-white p-3 text-sm outline-none transition focus:border-[#0f766e]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold">
                      Which founding option interests you most?
                    </label>
                    <select
                      value={form.pricing_preference}
                      onChange={(event) =>
                        updateForm("pricing_preference", event.target.value)
                      }
                      className="w-full rounded-2xl border border-[#e8e4de] bg-white p-3 text-sm outline-none transition focus:border-[#0f766e]"
                    >
                      {PRICING_OPTIONS.map((pricingOption) => (
                        <option key={pricingOption} value={pricingOption}>
                          {pricingOption}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={submitWaitlist}
                    disabled={submitting || !canSubmit}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Mail size={16} />
                    )}
                    {submitting ? "Adding you…" : "Notify me"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <section className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-8 shadow-sm md:p-10">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
                Onboarding webinar included
              </p>

              <h2 className="mb-3 text-3xl font-bold md:text-4xl">
                Start with a clear pathway into the AHA role.
              </h2>

              <p className="text-base leading-relaxed text-[#3f5f5a]">
                The onboarding webinar will become part of the paid members
                space, so new members can start with a clear foundation before
                moving into monthly coaching, resources and deeper support.
              </p>
            </div>

            <div className="rounded-3xl border border-[#99f6e4] bg-white p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <PlayCircle size={24} />
              </div>

              <h3 className="mb-3 text-2xl font-bold">
                AHA onboarding webinar
              </h3>

              <p className="mb-4 text-sm leading-relaxed text-[#6b6880]">
                A practical introduction to the AHA role, boundaries,
                confidence, communication, child development support and how to
                work well alongside therapists, educators and families.
              </p>

              <div className="rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-4">
                <p className="text-sm font-semibold text-[#1e1b2e]">
                  Planned as part of founding member access
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#6b6880]">
                  This gives people a reason to join early, even before the full
                  session library has grown.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <div className="mb-7 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              What&apos;s inside
            </p>

            <h2 className="mb-3 text-3xl font-bold md:text-4xl">
              Practical support for the work you are actually doing.
            </h2>

            <p className="text-base leading-relaxed text-[#6b6880]">
              This will not be another place full of vague advice. The paid
              community is being built around practical AHA work, real questions,
              everyday child development support, movement, regulation, play and
              the changes coming across the sector.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                    <Icon size={21} />
                  </div>

                  <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>

                  <p className="text-sm leading-relaxed text-[#6b6880]">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <div className="mb-7 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Founding member offer
            </p>

            <h2 className="mb-3 text-3xl font-bold md:text-4xl">
              Join early and lock in the lowest rate.
            </h2>

            <p className="text-base leading-relaxed text-[#6b6880]">
              Founding members will be able to join for $19/month AUD, locked in
              while they remain a member. The price will rise to $29/month later,
              so joining early will be the best deal.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {PRICE_OPTIONS.map((option) => (
              <article
                key={option.title}
                className={`relative rounded-3xl border p-6 shadow-sm ${
                  option.bestValue
                    ? "border-[#99f6e4] bg-[#f0fdfa]"
                    : "border-[#e8e4de] bg-[#faf8f5]"
                }`}
              >
                {option.highlight ? (
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#0f766e]">
                    <Star size={13} />
                    {option.highlight}
                  </div>
                ) : null}

                <h3 className="mb-3 text-2xl font-bold">{option.title}</h3>

                <p className="mb-3 text-4xl font-bold text-[#0f766e]">
                  {option.price}
                </p>

                <p className="mb-5 text-sm leading-relaxed text-[#6b6880]">
                  {option.note}
                </p>

                <div className="rounded-2xl border border-[#e8e4de] bg-white p-4">
                  <p className="text-sm font-semibold text-[#1e1b2e]">
                    Later price: $29/month AUD
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#6b6880]">
                    Join as a founding member to keep the early rate while your
                    membership stays active.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-3xl border border-[#e8e4de] bg-white p-7 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Who it&apos;s for
            </p>

            <h2 className="mb-3 text-2xl font-bold">
              AHAs and the people working alongside them.
            </h2>

            <p className="text-sm leading-relaxed text-[#6b6880]">
              This space is being created for Allied Health Assistants, therapy
              assistants, students, educators, allied health professionals and
              teams who want clearer, more practical support around children&apos;s
              development, movement, regulation and play.
            </p>
          </div>

          <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-7">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Honest note
            </p>

            <h2 className="mb-3 text-2xl font-bold">
              Professional development and community support.
            </h2>

            <p className="text-sm leading-relaxed text-[#3f5f5a]">
              This paid community will provide professional development,
              resources, coaching and community support. It is not an official
              certification pathway, and joining does not guarantee employment,
              contract work or referrals.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-[#e8e4de] bg-white p-8 text-center shadow-sm md:p-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
            Want founding member access?
          </p>

          <h2 className="mx-auto mb-4 max-w-2xl text-3xl font-bold md:text-4xl">
            Add your name now and I&apos;ll let you know when the $19/month rate opens.
          </h2>

          <p className="mx-auto mb-6 max-w-2xl text-base leading-relaxed text-[#6b6880]">
            You can stay in the free community at /join now, and add your name
            here if you are interested in the deeper paid support space when it
            is ready.
          </p>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
          >
            Join the waitlist
            <ArrowRight size={16} />
          </button>
        </section>
      </section>
    </main>
  );
}