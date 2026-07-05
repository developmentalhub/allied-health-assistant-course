"use client";

import { useMemo, useState } from "react";
import type { ElementType } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  ClipboardList,
  ExternalLink,
  FileText,
  Loader2,
  Mail,
  MessageCircle,
  PlayCircle,
  ShieldCheck,
  UserRoundCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

type WaitlistForm = {
  name: string;
  email: string;
  role: string;
  biggest_support_need: string;
  pricing_preference: string;
  main_question: string;
  interest_type: string;
  team_size: string;
  wants_one_to_one: string;
  employer_or_manager: string;
};

type OptionCard = {
  title: string;
  eyebrow: string;
  price: string;
  description: string;
  icon: ElementType;
  highlights: string[];
  cta: string;
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

const SUPPORT_OPTIONS = [
  "Understanding the AHA role and boundaries",
  "Working under allied health direction",
  "Reflective practice and communication",
  "Session preparation and confidence",
  "Understanding delegation and supervision",
  "Thriving Kids updates",
  "Manager/team support for AHAs",
  "Knowing when to ask for clarification",
  "Something else",
];

const INTEREST_OPTIONS = [
  "Free community",
  "Individual foundation topic videos",
  "Full 2026 foundation PD library",
  "1:1 reflective practice",
  "Manager/team pathway",
  "Deeper Play Move Improve specialist training",
  "Not sure yet",
];

const PRICING_OPTIONS = [
  "Individual foundation topic videos $7–$19",
  "Full 2026 foundation library $279",
  "1:1 reflective practice $193",
  "Manager/team option",
  "Deeper Play Move Improve specialist training",
  "Not sure yet",
];

const TEAM_SIZE_OPTIONS = [
  "Just me",
  "2–3 people",
  "4–6 people",
  "7–10 people",
  "11+ people",
  "Not applicable",
];

const ONE_TO_ONE_OPTIONS = [
  "Yes, I may want 1:1 reflective practice",
  "Maybe later",
  "No, I am mainly interested in the library",
  "I am enquiring for someone else",
];

const OPTIONS: OptionCard[] = [
  {
    title: "Free AHA Community",
    eyebrow: "Free front door",
    price: "Free",
    description:
      "A low-pressure place to browse quietly, introduce yourself if you want, read updates and connect with others in the AHA space.",
    icon: MessageCircle,
    highlights: [
      "Browse without needing to post",
      "Introduce yourself if you feel comfortable",
      "Read community updates",
      "Stay connected as the PD options grow",
    ],
    cta: "Join the free community",
  },
  {
    title: "Individual Foundation Topics",
    eyebrow: "Small topic passes",
    price: "$7–$19 AUD",
    description:
      "Short, practical foundation AHA PD topics available individually depending on length, depth and included resources.",
    icon: PlayCircle,
    highlights: [
      "Choose only the topics you need",
      "Foundation AHA role and reflective practice content",
      "Embedded unlisted YouTube videos",
      "Printable PDFs where relevant",
    ],
    cta: "Register interest",
  },
  {
    title: "2026 Foundation AHA PD Library",
    eyebrow: "Full foundation library access",
    price: "$279 AUD",
    description:
      "12 months access from the day of purchase to the growing 2026 foundation AHA professional development library.",
    icon: BookOpen,
    highlights: [
      "Foundation AHA PD across 2026",
      "Role clarity, boundaries and reflective practice",
      "Printable reflection tools and prompts",
      "Does not include full PMI specialist training",
    ],
    cta: "Register interest",
  },
  {
    title: "1:1 Reflective Practice",
    eyebrow: "Individual support",
    price: "$193 AUD",
    description:
      "Reflective, practical and personal sessions with Robyn as a Developmental Educator, or with an allied health professional where appropriate.",
    icon: UserRoundCheck,
    highlights: [
      "Reflection form required first",
      "No instant booking without preparation",
      "Role, goal and context reviewed first",
      "Booking/payment details sent after review",
    ],
    cta: "Complete reflection form",
  },
];

const FOUNDATION_AHA_TOPICS = [
  "Understanding the AHA role and boundaries",
  "Working under allied health direction",
  "Reflective practice and communication with therapists",
  "Preparing for sessions and asking better questions",
  "Knowing when to seek clarification",
  "Thriving Kids and what may change for support roles",
];

const PMI_SPECIALIST_AREAS = [
  "Developmental movement and play-based intervention",
  "Regulation, sensory and nervous system support",
  "Screen dependency and developmental readiness",
  "Reflexes, balance, coordination and core strength",
  "Detailed child development strategies and resources",
  "Play Move Improve specialist training and programs",
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
    interest_type: INTEREST_OPTIONS[0],
    team_size: TEAM_SIZE_OPTIONS[0],
    wants_one_to_one: ONE_TO_ONE_OPTIONS[1],
    employer_or_manager: "",
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
      interest_type: form.interest_type,
      team_size: form.team_size,
      wants_one_to_one: form.wants_one_to_one,
      employer_or_manager: form.employer_or_manager.trim(),
    };

    const { error } = await supabase.from("paid_waitlist").insert(cleanForm);

    setSubmitting(false);

    if (error) {
      console.error("AHA PD OPTIONS WAITLIST INSERT ERROR:", error);
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
      interest_type: INTEREST_OPTIONS[0],
      team_size: TEAM_SIZE_OPTIONS[0],
      wants_one_to_one: ONE_TO_ONE_OPTIONS[1],
      employer_or_manager: "",
    });
  };

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <div
          id="top"
          className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-12"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
            AHA Reflective PD Options
          </p>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <h1 className="mb-5 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
                Foundation AHA professional development, with a pathway into
                deeper specialist learning.
              </h1>

              <p className="mb-6 max-w-2xl text-base leading-relaxed text-[#6b6880] md:text-lg">
                Start with the free community, choose individual foundation
                topic videos, register interest in the 2026 Foundation AHA PD
                Library, or apply for a 1:1 reflective practice session.
              </p>

              <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
                <div className="mb-2 flex items-start gap-3">
                  <ShieldCheck
                    size={21}
                    className="mt-0.5 shrink-0 text-[#0f766e]"
                  />

                  <div>
                    <p className="mb-1 text-sm font-semibold text-[#0f766e]">
                      Important professional note
                    </p>

                    <p className="text-sm leading-relaxed text-[#3f5f5a]">
                      This platform provides reflective professional development
                      and reflective practice support. It does not replace the
                      supervision, direction, delegation, clinical oversight or
                      workplace responsibilities provided by the allied health
                      professional, employer or service the AHA works under.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <Users size={24} />
              </div>

              <h2 className="mb-3 text-2xl font-bold">Register your interest</h2>

              <p className="mb-5 text-sm leading-relaxed text-[#3f5f5a]">
                Tell me what you are most interested in so I can build the
                foundation AHA PD topics, tools and reflective practice options
                around real needs.
              </p>

              {submitted ? (
                <div className="rounded-3xl border border-[#99f6e4] bg-white p-5">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#0f766e] text-white">
                    <Check size={22} />
                  </div>

                  <h3 className="mb-2 text-lg font-bold">
                    You&apos;re on the interest list.
                  </h3>

                  <p className="text-sm leading-relaxed text-[#6b6880]">
                    Thank you — your answers will help shape the foundation AHA
                    Professional Development library, topic tools and reflective
                    practice options.
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
                      I am most interested in...
                    </label>
                    <select
                      value={form.interest_type}
                      onChange={(event) =>
                        updateForm("interest_type", event.target.value)
                      }
                      className="w-full rounded-2xl border border-[#e8e4de] bg-white p-3 text-sm outline-none transition focus:border-[#0f766e]"
                    >
                      {INTEREST_OPTIONS.map((interest) => (
                        <option key={interest} value={interest}>
                          {interest}
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
                      Which option are you most likely to consider?
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

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold">
                      Are you interested in 1:1 reflective practice?
                    </label>
                    <select
                      value={form.wants_one_to_one}
                      onChange={(event) =>
                        updateForm("wants_one_to_one", event.target.value)
                      }
                      className="w-full rounded-2xl border border-[#e8e4de] bg-white p-3 text-sm outline-none transition focus:border-[#0f766e]"
                    >
                      {ONE_TO_ONE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold">
                      Team size
                    </label>
                    <select
                      value={form.team_size}
                      onChange={(event) =>
                        updateForm("team_size", event.target.value)
                      }
                      className="w-full rounded-2xl border border-[#e8e4de] bg-white p-3 text-sm outline-none transition focus:border-[#0f766e]"
                    >
                      {TEAM_SIZE_OPTIONS.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold">
                      Organisation, clinic or manager name
                    </label>
                    <input
                      value={form.employer_or_manager}
                      onChange={(event) =>
                        updateForm("employer_or_manager", event.target.value)
                      }
                      placeholder="Optional"
                      className="w-full rounded-2xl border border-[#e8e4de] bg-white p-3 text-sm outline-none transition focus:border-[#0f766e]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold">
                      What is one question you would love answered?
                    </label>
                    <textarea
                      rows={3}
                      value={form.main_question}
                      onChange={(event) =>
                        updateForm("main_question", event.target.value)
                      }
                      placeholder="For example: What can an AHA do independently? How do I reflect on tricky sessions? How do I work well under therapist direction?"
                      className="w-full resize-none rounded-2xl border border-[#e8e4de] bg-white p-3 text-sm outline-none transition focus:border-[#0f766e]"
                    />
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
                    {submitting ? "Saving…" : "Register interest"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Your options
            </p>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Start free, choose a foundation topic, access the foundation
              library, or apply for reflective practice.
            </h2>

            <p className="text-base leading-relaxed text-[#6b6880]">
              The aim is to make AHA professional development practical,
              reflective and flexible, while protecting the difference between
              foundation AHA PD and Robyn&apos;s deeper Play Move Improve
              specialist training.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {OPTIONS.map((option) => {
              const Icon = option.icon;

              return (
                <article
                  key={option.title}
                  className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                    <Icon size={24} />
                  </div>

                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
                    {option.eyebrow}
                  </p>

                  <h3 className="mb-3 text-2xl font-bold">{option.title}</h3>

                  <p className="mb-3 text-3xl font-bold text-[#0f766e]">
                    {option.price}
                  </p>

                  <p className="mb-5 text-sm leading-relaxed text-[#6b6880]">
                    {option.description}
                  </p>

                  <ul className="mb-6 space-y-2 text-sm leading-relaxed text-[#6b6880]">
                    {option.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2">
                        <Check
                          size={16}
                          className="mt-0.5 shrink-0 text-[#0f766e]"
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {option.title === "Free AHA Community" ? (
                    <Link
                      href="/join"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
                    >
                      {option.cta}
                      <ArrowRight size={15} />
                    </Link>
                  ) : option.title === "1:1 Reflective Practice" ? (
                    <Link
                      href="/reflective-practice"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
                    >
                      {option.cta}
                      <ArrowRight size={15} />
                    </Link>
                  ) : (
                    <a
                      href="#top"
                      onClick={(event) => {
                        event.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
                    >
                      {option.cta}
                      <ArrowRight size={15} />
                    </a>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-8 shadow-sm md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
                Foundation AHA PD Library
              </p>

              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Useful foundation content, not the whole PMI method.
              </h2>

              <p className="mb-5 text-base leading-relaxed text-[#3f5f5a]">
                The 2026 Foundation AHA PD Library is designed to support role
                clarity, reflective practice, communication and confidence. It
                gives AHAs useful professional development without placing
                Robyn&apos;s deeper Play Move Improve specialist frameworks into
                the shared AHA platform.
              </p>

              <div className="rounded-2xl border border-[#99f6e4] bg-white p-4">
                <p className="text-sm font-semibold text-[#0f766e]">
                  Full foundation library: $279 AUD
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#6b6880]">
                  12 months access from the day of purchase. Individual
                  foundation topic videos may also be available from $7–$19
                  depending on length and included resources.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-[#99f6e4] bg-white p-5">
                <PlayCircle className="mb-3 text-[#0f766e]" size={24} />
                <h3 className="mb-2 font-bold">Video</h3>
                <p className="text-sm leading-relaxed text-[#6b6880]">
                  Embedded unlisted YouTube foundation lessons.
                </p>
              </div>

              <div className="rounded-3xl border border-[#99f6e4] bg-white p-5">
                <FileText className="mb-3 text-[#0f766e]" size={24} />
                <h3 className="mb-2 font-bold">PDFs</h3>
                <p className="text-sm leading-relaxed text-[#6b6880]">
                  Reflection sheets, checklists and discussion prompts.
                </p>
              </div>

              <div className="rounded-3xl border border-[#99f6e4] bg-white p-5">
                <ClipboardList className="mb-3 text-[#0f766e]" size={24} />
                <h3 className="mb-2 font-bold">Tools</h3>
                <p className="text-sm leading-relaxed text-[#6b6880]">
                  Embedded Netlify tools for reflection and preparation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-[#e8e4de] bg-white p-7 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Foundation AHA PD may include
            </p>

            <h2 className="mb-5 text-2xl font-bold">
              The content that belongs here.
            </h2>

            <ul className="space-y-3 text-sm leading-relaxed text-[#6b6880]">
              {FOUNDATION_AHA_TOPICS.map((topic) => (
                <li key={topic} className="flex gap-2">
                  <Check
                    size={16}
                    className="mt-0.5 shrink-0 text-[#0f766e]"
                  />
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-[#e8e4de] bg-white p-7 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Play Move Improve specialist pathway
            </p>

            <h2 className="mb-5 text-2xl font-bold">
              The deeper content stays with PMI.
            </h2>

            <ul className="mb-6 space-y-3 text-sm leading-relaxed text-[#6b6880]">
              {PMI_SPECIALIST_AREAS.map((area) => (
                <li key={area} className="flex gap-2">
                  <Check
                    size={16}
                    className="mt-0.5 shrink-0 text-[#0f766e]"
                  />
                  {area}
                </li>
              ))}
            </ul>

            <a
              href="https://www.playmoveimprove.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-5 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
            >
              Visit Play Move Improve
              <ExternalLink size={15} />
            </a>
          </div>
        </section>

        <section className="mb-8 rounded-3xl bg-[#1e1b2e] p-8 text-white shadow-sm md:p-12">
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#99f6e4]">
                1:1 Reflective Practice
              </p>

              <h2 className="mb-6 text-3xl font-bold md:text-5xl">
                Reflection first. Booking second.
              </h2>

              <p className="mb-6 text-base leading-relaxed text-[#d9d7e5] md:text-lg">
                1:1 reflective practice sessions are not instant-booked. You
                complete reflection questions first so the session is useful,
                prepared and focused on your real goal.
              </p>

              <div className="space-y-3 text-sm leading-relaxed text-[#d9d7e5] md:text-base">
                <p>Step 1: Complete the reflection form.</p>
                <p>Step 2: Robyn or the team reviews your role, context and goal.</p>
                <p>Step 3: If appropriate, booking and payment details are sent.</p>
                <p>Step 4: Attend your 1:1 reflective practice session.</p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
              <p className="mb-3 text-lg font-semibold text-white">
                Session options
              </p>

              <p className="mb-5 text-sm leading-relaxed text-[#d9d7e5]">
                Sessions may be offered by Robyn as a Developmental Educator, or
                by an OT or Psych where appropriate.
              </p>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-sm font-semibold text-[#99f6e4]">
                  $193 AUD per session
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#d9d7e5]">
                  Reflection form required before booking details are sent.
                </p>
              </div>

              <Link
                href="/reflective-practice"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-4 text-center text-base font-semibold text-[#1e1b2e] transition hover:bg-[#f5f3ff]"
              >
                Complete reflection form
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-[#e8e4de] bg-white p-7 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              For managers and clinic owners
            </p>

            <h2 className="mb-3 text-2xl font-bold">
              Support your AHAs with reflective professional development.
            </h2>

            <p className="mb-5 text-sm leading-relaxed text-[#6b6880]">
              If you manage AHAs or therapy assistants, you can register
              interest in foundation library access, topic bundles, reflective
              tools or future team options.
            </p>

            <Link
              href="/manager-pathway"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
            >
              Manager pathway
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-7">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Clear boundary
            </p>

            <h2 className="mb-3 text-2xl font-bold">
              Reflective PD does not replace workplace supervision.
            </h2>

            <p className="text-sm leading-relaxed text-[#3f5f5a]">
              Managers and employers remain responsible for appropriate
              delegation, direction, supervision, scope, risk management and
              clinical governance within their own service.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-[#e8e4de] bg-white p-8 text-center shadow-sm md:p-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
            Help shape what gets built first
          </p>

          <h2 className="mx-auto mb-4 max-w-2xl text-3xl font-bold md:text-4xl">
            Register your interest and tell me what would actually help.
          </h2>

          <p className="mx-auto mb-6 max-w-2xl text-base leading-relaxed text-[#6b6880]">
            Your answers help decide which foundation topics, tools, PDFs and
            reflective practice options are prioritised first.
          </p>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
          >
            Register interest
            <ArrowRight size={16} />
          </button>
        </section>
      </section>
    </main>
  );
}