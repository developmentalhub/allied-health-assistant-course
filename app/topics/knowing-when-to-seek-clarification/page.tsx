import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  ClipboardList,
  ExternalLink,
  FileText,
  PlayCircle,
  ShieldCheck,
} from "lucide-react";

const REFLECTION_QUESTIONS = [
  "When do you usually feel unsure in your AHA role?",
  "What kinds of situations make you pause or wonder whether you need more direction?",
  "What do you currently do when instructions are unclear?",
  "Who do you go back to when you need clarification?",
  "What would help you feel more confident asking for clarification early?",
];

const CLARIFICATION_SIGNS = [
  "The instruction does not feel specific enough to follow safely or confidently",
  "The person you are supporting responds differently from what you expected",
  "You are unsure whether to continue, pause, simplify or stop",
  "The activity appears outside what you were asked to support",
  "There is a change in behaviour, safety, fatigue, distress or engagement",
  "You feel like you are guessing rather than following clear direction",
];

const CLARIFICATION_LANGUAGE = [
  {
    title: "When instructions feel unclear",
    example:
      "Can I check exactly what you would like me to do if this situation happens again?",
  },
  {
    title: "When something changes",
    example:
      "This looked different today, so I wanted to bring it back before continuing in the same way.",
  },
  {
    title: "When you feel unsure",
    example:
      "I am not completely sure what the next step should be, so I would like to clarify before I proceed.",
  },
  {
    title: "When protecting role boundaries",
    example:
      "I do not want to make that decision independently. Can you please provide more direction?",
  },
];

const FOUNDATION_POINTS = [
  "Recognising that asking for clarification is a professional skill, not a weakness",
  "Understanding that AHAs should not guess when direction is unclear",
  "Knowing the difference between following a plan and making an independent clinical decision",
  "Using clear, respectful language to seek more direction",
  "Reflecting on uncertainty early so support remains safe, purposeful and within role expectations",
];

const NOT_INCLUDED = [
  "Clinical decision-making authority",
  "Independent risk assessment frameworks",
  "Replacing workplace escalation procedures",
  "Replacing supervision, delegation or clinical governance",
  "Play Move Improve specialist intervention or clinical reasoning frameworks",
];

export default function KnowingWhenToSeekClarificationTopicPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="mb-6">
          <Link
            href="/topics"
            className="inline-flex items-center gap-2 rounded-full border border-[#e8e4de] bg-white px-4 py-2 text-sm font-semibold text-[#6b6880] transition hover:border-[#99f6e4] hover:bg-[#f0fdfa] hover:text-[#0f766e]"
          >
            <ArrowLeft size={15} />
            Back to topics
          </Link>
        </div>

        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
                Foundation AHA Professional Development
              </p>

              <h1 className="mb-5 text-4xl font-bold leading-tight md:text-6xl">
                Knowing when to seek clarification.
              </h1>

              <p className="mb-6 max-w-3xl text-base leading-relaxed text-[#6b6880] md:text-lg">
                This topic helps AHAs recognise when they need more direction,
                pause before guessing and ask clear questions that protect role
                boundaries, safety and professional confidence.
              </p>

              <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
                <div className="flex gap-3">
                  <ShieldCheck
                    size={22}
                    className="mt-0.5 shrink-0 text-[#0f766e]"
                  />

                  <div>
                    <p className="mb-1 text-sm font-semibold text-[#0f766e]">
                      Foundation topic only
                    </p>

                    <p className="text-sm leading-relaxed text-[#3f5f5a]">
                      This page supports reflective AHA professional
                      development. It does not replace workplace supervision,
                      escalation procedures, clinical supervision, delegation,
                      direction, clinical oversight or employer responsibilities.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <AlertCircle size={24} />
              </div>

              <h2 className="mb-3 text-2xl font-bold">Topic structure</h2>

              <div className="space-y-3 text-sm leading-relaxed text-[#3f5f5a]">
                <p>1. Watch the foundation video.</p>
                <p>2. Reflect on situations where you feel unsure.</p>
                <p>3. Notice signs that clarification may be needed.</p>
                <p>4. Practise language for asking before guessing.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <div className="mb-6 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Video lesson
            </p>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Embedded video placeholder
            </h2>

            <p className="text-base leading-relaxed text-[#6b6880]">
              This is where the unlisted YouTube video for this foundation topic
              will be embedded when ready.
            </p>
          </div>

          <div className="flex min-h-70 items-center justify-center rounded-3xl border border-dashed border-[#99f6e4] bg-[#f0fdfa] p-8 text-center">
            <div>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <PlayCircle size={32} />
              </div>

              <h3 className="mb-2 text-2xl font-bold">Video coming soon</h3>

              <p className="mx-auto max-w-xl text-sm leading-relaxed text-[#3f5f5a]">
                Add the embedded YouTube iframe here once the topic video has
                been recorded and uploaded as unlisted.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-8 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
              <ClipboardList size={24} />
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Reflection questions
            </p>

            <h2 className="mb-5 text-3xl font-bold">
              Questions to think through.
            </h2>

            <ul className="space-y-3 text-sm leading-relaxed text-[#3f5f5a]">
              {REFLECTION_QUESTIONS.map((question) => (
                <li key={question} className="flex gap-2">
                  <Check
                    size={16}
                    className="mt-0.5 shrink-0 text-[#0f766e]"
                  />
                  {question}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <FileText size={24} />
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Printable resource
            </p>

            <h2 className="mb-5 text-3xl font-bold">
              Clarification prompt sheet.
            </h2>

            <p className="mb-5 text-sm leading-relaxed text-[#6b6880]">
              This printable will help AHAs identify when they feel unsure,
              write down what needs clarification and prepare questions for the
              supervising professional or workplace contact.
            </p>

            <div className="rounded-2xl border border-dashed border-[#99f6e4] bg-[#faf8f5] p-5">
              <p className="text-sm font-semibold text-[#0f766e]">
                PDF placeholder
              </p>

              <p className="mt-1 text-sm leading-relaxed text-[#6b6880]">
                Add the download link here once the PDF has been created.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Signs clarification may be needed
            </p>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              It is better to ask early than guess quietly.
            </h2>

            <p className="text-base leading-relaxed text-[#6b6880]">
              These examples are not a replacement for workplace policies or
              escalation procedures. They are prompts to help AHAs reflect on
              when more direction may be needed.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {CLARIFICATION_SIGNS.map((sign) => (
              <div
                key={sign}
                className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5"
              >
                <div className="flex gap-3">
                  <AlertCircle
                    size={18}
                    className="mt-0.5 shrink-0 text-[#0f766e]"
                  />

                  <p className="text-sm leading-relaxed text-[#6b6880]">
                    {sign}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-8 shadow-sm md:p-10">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Clarification language
            </p>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Professional language for asking before guessing.
            </h2>

            <p className="text-base leading-relaxed text-[#3f5f5a]">
              These are sentence starters only. Always follow your workplace
              communication process.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {CLARIFICATION_LANGUAGE.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-[#99f6e4] bg-white p-5"
              >
                <p className="mb-2 text-sm font-semibold text-[#0f766e]">
                  {item.title}
                </p>

                <p className="text-sm leading-relaxed text-[#6b6880]">
                  {item.example}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Foundation learning points
            </p>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              What this topic can help build.
            </h2>

            <p className="text-base leading-relaxed text-[#6b6880]">
              This topic supports reflective confidence around uncertainty and
              clarification. It does not teach AHAs to independently make
              clinical decisions.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {FOUNDATION_POINTS.map((point) => (
              <div
                key={point}
                className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5"
              >
                <div className="flex gap-3">
                  <Check
                    size={18}
                    className="mt-0.5 shrink-0 text-[#0f766e]"
                  />

                  <p className="text-sm leading-relaxed text-[#6b6880]">
                    {point}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-8 shadow-sm md:p-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
                Content boundary
              </p>

              <h2 className="mb-4 text-3xl font-bold">
                What is not included in this foundation topic.
              </h2>

              <p className="text-base leading-relaxed text-[#3f5f5a]">
                This keeps the topic focused on reflection, communication and
                role clarity rather than independent clinical decision-making.
              </p>
            </div>

            <ul className="space-y-3 text-sm leading-relaxed text-[#3f5f5a]">
              {NOT_INCLUDED.map((item) => (
                <li key={item} className="flex gap-2">
                  <Check
                    size={16}
                    className="mt-0.5 shrink-0 text-[#0f766e]"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-3xl bg-[#1e1b2e] p-8 text-white shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#99f6e4]">
                Deeper specialist pathway
              </p>

              <h2 className="mb-5 text-3xl font-bold md:text-5xl">
                Need deeper movement, regulation or child development training?
              </h2>

              <p className="text-base leading-relaxed text-[#d9d7e5] md:text-lg">
                Deeper Play Move Improve training remains separate from this
                foundation AHA PD topic library.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
              <p className="mb-5 text-sm leading-relaxed text-[#d9d7e5]">
                This topic helps with foundation AHA clarification and
                professional communication. Specialist Play Move Improve
                training can be explored separately.
              </p>

              <a
                href="https://www.playmoveimprove.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-4 text-center text-base font-semibold text-[#1e1b2e] transition hover:bg-[#f5f3ff]"
              >
                Visit Play Move Improve
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#1e1b2e]">
                Ready to keep exploring?
              </p>

              <p className="text-sm leading-relaxed text-[#6b6880]">
                View the topic library or register interest in the 2026
                Foundation AHA PD Library.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                href="/topics"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-5 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
              >
                View topics
                <ArrowRight size={15} />
              </Link>

              <Link
                href="/subscribe"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Register interest
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
