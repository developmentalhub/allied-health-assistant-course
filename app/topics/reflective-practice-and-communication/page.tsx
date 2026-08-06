import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ClipboardList,
  ExternalLink,
  FileText,
  MessageSquare,
  PlayCircle,
  ShieldCheck,
} from "lucide-react";

const REFLECTION_QUESTIONS = [
  "What do you currently write down or communicate after a session?",
  "What information does your supervising professional usually need from you?",
  "When do you feel confident communicating observations, and when do you feel unsure?",
  "How do you separate what you noticed from what you think it might mean?",
  "What would help you communicate more clearly and professionally?",
];

const FOUNDATION_POINTS = [
  "Using reflection to prepare for professional conversations",
  "Communicating observations without stepping into clinical interpretation",
  "Understanding the difference between noticing, reporting and deciding",
  "Using respectful language when asking questions or seeking clarification",
  "Building confidence to communicate with allied health professionals, educators, families or managers where appropriate",
];

const COMMUNICATION_EXAMPLES = [
  {
    title: "Observation language",
    example:
      "I noticed that the child needed repeated prompts to stay with the activity today.",
  },
  {
    title: "Clarification language",
    example:
      "Can I check what you would like me to do if this happens again next session?",
  },
  {
    title: "Reflection language",
    example:
      "I felt unsure whether I should continue or pause, so I wanted to bring it back for guidance.",
  },
  {
    title: "Boundary-aware language",
    example:
      "I do not want to interpret this clinically, but I wanted to share what I observed.",
  },
];

const NOT_INCLUDED = [
  "Clinical interpretation or diagnosis",
  "Writing therapy reports as a clinician",
  "Replacing workplace documentation requirements",
  "Replacing supervision or direction from the allied health professional",
  "Play Move Improve specialist child development or intervention frameworks",
];

export default function ReflectivePracticeCommunicationTopicPage() {
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
                Reflective practice and communication.
              </h1>

              <p className="mb-6 max-w-3xl text-base leading-relaxed text-[#6b6880] md:text-lg">
                This topic helps AHAs build confidence with reflective practice,
                professional communication, observation language and knowing how
                to bring questions back to the supervising professional.
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
                      clinical supervision, clinical documentation requirements,
                      direction, delegation or clinical oversight.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <MessageSquare size={24} />
              </div>

              <h2 className="mb-3 text-2xl font-bold">Topic structure</h2>

              <div className="space-y-3 text-sm leading-relaxed text-[#3f5f5a]">
                <p>1. Watch the foundation video.</p>
                <p>2. Reflect on how you currently communicate.</p>
                <p>3. Practise boundary-aware observation language.</p>
                <p>4. Prepare one question to take back to your supervisor.</p>
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
              Reflection and communication prompt sheet.
            </h2>

            <p className="mb-5 text-sm leading-relaxed text-[#6b6880]">
              This printable will help AHAs reflect on what they noticed, what
              they need to communicate and what questions they may need to ask.
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
              Communication examples
            </p>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Simple language that keeps the role boundary clear.
            </h2>

            <p className="text-base leading-relaxed text-[#6b6880]">
              These are example sentence starters only. They do not replace your
              workplace expectations or the communication process set by your
              supervising professional.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {COMMUNICATION_EXAMPLES.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5"
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

        <section className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-8 shadow-sm md:p-10">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Foundation learning points
            </p>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              What this topic can help build.
            </h2>

            <p className="text-base leading-relaxed text-[#3f5f5a]">
              This topic supports reflective confidence, not clinical decision
              making.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {FOUNDATION_POINTS.map((point) => (
              <div
                key={point}
                className="rounded-3xl border border-[#99f6e4] bg-white p-5"
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

        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
                Content boundary
              </p>

              <h2 className="mb-4 text-3xl font-bold">
                What is not included in this foundation topic.
              </h2>

              <p className="text-base leading-relaxed text-[#6b6880]">
                This keeps the AHA PD platform focused on role clarity,
                reflection and communication without moving into clinical
                supervision or specialist intervention training.
              </p>
            </div>

            <ul className="space-y-3 text-sm leading-relaxed text-[#6b6880]">
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
                This topic helps with foundation AHA reflection and professional
                communication. Specialist Play Move Improve training can be
                explored separately.
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