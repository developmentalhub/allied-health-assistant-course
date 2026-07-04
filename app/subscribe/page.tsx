"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  Loader2,
  Mail,
  MessageCircle,
  PlayCircle,
  Sparkles,
  Users,
  Video,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

type WaitlistForm = {
  name: string;
  email: string;
};

type Feature = {
  title: string;
  description: string;
  icon: React.ElementType;
};

const FEATURES: Feature[] = [
  {
    title: "Monthly live Zoom coaching",
    description:
      "Come together for practical coaching, reflection and real-world support with me.",
    icon: Video,
  },
  {
    title: "Recorded session library",
    description:
      "Catch up in your own time with a growing library of professional learning sessions.",
    icon: PlayCircle,
  },
  {
    title: "Practical AHA resources",
    description:
      "Movement, regulation and play resources mapped to the everyday work AHAs are doing.",
    icon: Sparkles,
  },
  {
    title: "Skill-building for real settings",
    description:
      "Build confidence supporting children in classrooms, therapy spaces, homes and community routines.",
    icon: Check,
  },
  {
    title: "Get ready for Thriving Kids",
    description:
      "Stay across the reform conversation and what it may mean for AHAs and the teams around them.",
    icon: ArrowRight,
  },
  {
    title: "Private members-only feed",
    description:
      "A closer space to ask questions, share wins, problem-solve and feel less alone in the work.",
    icon: MessageCircle,
  },
  {
    title: "Priority question support",
    description:
      "Bring your questions and get clearer, practical answers that connect back to everyday practice.",
    icon: Mail,
  },
];

export default function SubscribePage() {
  const supabase = useMemo(() => createClient(), []);

  const [form, setForm] = useState<WaitlistForm>({
    name: "",
    email: "",
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
                The deeper support space for AHAs who want to feel ready,
                capable and connected.
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-[#6b6880] md:text-lg">
                The free community is your warm front door. The paid community
                will be the next layer — with live coaching, practical resources,
                reform updates and closer support for the real everyday work of
                being an Allied Health Assistant.
              </p>
            </div>

            <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <Users size={24} />
              </div>

              <h2 className="mb-3 text-2xl font-bold">Join the interest list</h2>

              <p className="mb-5 text-sm leading-relaxed text-[#3f5f5a]">
                Be the first to hear when the paid community opens, what is
                included, and how founding members can join.
              </p>

              {submitted ? (
                <div className="rounded-3xl border border-[#99f6e4] bg-white p-5">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#0f766e] text-white">
                    <Check size={22} />
                  </div>

                  <h3 className="mb-2 text-lg font-bold">You&apos;re on the list.</h3>

                  <p className="text-sm leading-relaxed text-[#6b6880]">
                    Thank you — I&apos;ll let you know when the paid community is
                    ready to open.
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
              everyday child development support, and the changes coming across
              the sector.
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
            Want to know when it opens?
          </p>

          <h2 className="mx-auto mb-4 max-w-2xl text-3xl font-bold md:text-4xl">
            Add your name now and I&apos;ll keep you in the loop.
          </h2>

          <p className="mx-auto mb-6 max-w-2xl text-base leading-relaxed text-[#6b6880]">
            You can stay in the free community at /join, and add your name here
            if you are interested in the deeper paid support space when it is
            ready.
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