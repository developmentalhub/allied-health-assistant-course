import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ClipboardList,
  ExternalLink,
  FileText,
  PlayCircle,
  ShieldCheck,
} from "lucide-react";

const REFLECTION_QUESTIONS = [
  "What does working under direction currently look like in your role?",
  "What information do you usually receive before a session or support activity?",
  "When do you feel confident to continue, and when do you feel unsure?",
  "What kind of communication helps you feel clear about expectations?",
  "What would you like to ask the allied health professional you work under?",
];

const FOUNDATION_POINTS = [
  "Understanding that AHAs work from direction, delegation and workplace expectations",
  "Knowing that support work should connect back to the plan or goals set by the allied health professional",
  "Recognising when instructions are not clear enough to proceed confidently",
  "Using reflective questions to prepare for sessions and seek clarification",
  "Documenting observations in a way that supports communication with the supervising professional",
];

const NOT_INCLUDED = [
  "Detailed clinical decision-making frameworks",
  "Client-specific therapy prescription",
  "Advanced intervention planning",
  "Play Move Improve specialist movement, regulation or child development frameworks",
];

export default function WorkingUnderDirectionTopicPage() {
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
                Working under allied health direction.
              </h1>

              <p className="mb-6 max-w-3xl text-base leading-relaxed text-[#6b6880] md:text-lg">
                This topic helps AHAs reflect on what it means to work under
                direction, understand expectations, prepare for support sessions
                and know when to seek clarification.
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
                      clinical supervision, delegation, direction, clinical
                      oversight or the responsibilities of the allied health
                      professional or employer.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <BookOpen size={24} />
              </div>

              <h2 className="mb-3 text-2xl font-bold">Topic structure</h2>

              <div className="space-y-3 text-sm leading-relaxed text-[#3f5f5a]">
                <p>1. Watch the foundation video.</p>
                <p>2. Reflect on your current role and communication.</p>
                <p>3. Use the prompt sheet before your next session.</p>
                <p>4. Identify questions to take back to your supervisor.</p>
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
              Direction and clarification prompt sheet.
            </h2>

            <p className="mb-5 text-sm leading-relaxed text-[#6b6880]">
              This printable will help AHAs prepare questions before sessions,
              reflect after sessions and identify where further direction may be
              needed.
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
              Foundation learning points
            </p>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              What this topic can help clarify.
            </h2>

            <p className="text-base leading-relaxed text-[#6b6880]">
              This topic is not about teaching AHAs to make clinical decisions.
              It is about helping them reflect, prepare and communicate clearly
              within the direction they are given.
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
                This protects the difference between AHA reflective PD and
                deeper specialist intervention training.
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
                This topic helps with foundation AHA reflection and role clarity.
                Specialist Play Move Improve training can be explored separately.
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