import Link from "next/link";

const TOOL_EMBED_URL = "";

const resourceCards = [
  {
    title: "What an AHA is / what an AHA isn't",
    type: "Visual one-pager",
    description:
      "Two-column comparison: IS / ISN'T, plus one line at the bottom: Where you'll work.",
  },
  {
    title: "Before You Walk In",
    type: "Printable resource",
    description:
      "Practical, self-check focused, not a repeat of the one-pager.",
  },
  {
    title: "Lesson plan: my warm-up activity",
    type: "Worksheet",
    description:
      "Fillable version of the template designed so an AHA can complete it digitally or print it.",
  },
];

const videoBeats = [
  "The textbook definition vs the real one — an AHA implements what the AHP designs, but the how is entirely on you: tone, pace, patience, reading the room.",
  "Where you'll actually work — not just clinics anymore. Home, early learning rooms, classrooms, playgroups. Same job, very different furniture.",
  "What a “good day” looks like — give one real story of a session that didn't go to plan and how you adjusted.",
  "The mindset shift: you're not “just the assistant” — you're the one who makes the plan come alive or fall flat.",
  "Close: “Next, we're going to build the actual toolkit you'll carry to make that happen — what's in your head, and what's in your bag.”",
];

const handsOnChecklist = [
  "Before you start: do a 30-second self-check — notice your own state. Are you rushed, calm, distracted?",
  "Then plan and run a short, genuinely fun warm-up/icebreaker with a child or small group you haven't worked with before.",
  "If no placement access yet — role-play it with a peer or family member playing the child.",
  "What done looks like: a 1–2 minute video, photo, or written account of the warm-up plus one line on how the child/peer responded.",
];

const lessonPlanItems = [
  {
    label: "Goal",
    text: "Help a child feel comfortable and safe with me in the first few minutes of a session",
  },
  {
    label: "Setting",
    text: "[early learning room / classroom / home / clinic — learner fills in]",
  },
  {
    label: "Materials needed",
    text: "[keep it to what's actually on hand — a ball, a puppet, nothing at all]",
  },
  {
    label: "Steps",
    text: "3–5 simple steps another AHA could run cold",
  },
  {
    label: "Adaptations",
    text: "One line each — a child who's shy/overwhelmed, a child who's excitable and needs settling first, a group version vs 1:1",
  },
  {
    label: "What to watch for",
    text: "Nervous-system cues, not just “engagement” — relaxed shoulders, breathing slowing, voluntary eye contact = it's working. Looking away, stilling, increasing fidgeting = back off the pace or change approach",
  },
];

const reflectionQuestions = [
  "What surprised you about how the child/peer responded?",
  "Did you change your plan halfway through? What made you adjust?",
  "How is this different from what you expected an AHA's “first job” to be?",
];

export default function WelcomeToAhaRolePage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        {/* Breadcrumb */}
        <nav className="mb-8 text-base text-[#5f5b73]" aria-label="Breadcrumb">
          <Link href="/" className="font-semibold text-[#0f766e] hover:underline">
            Academy
          </Link>
          <span className="mx-2">/</span>
          <Link
            href="/dashboard"
            className="font-semibold text-[#0f766e] hover:underline"
          >
            Allied Health
          </Link>
          <span className="mx-2">/</span>
          <span>Core — Module 1: Foundations</span>
        </nav>

        {/* Header */}
        <header className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <div className="mb-7 flex flex-wrap gap-3">
            <span className="rounded-full bg-[#f0fdfa] px-5 py-3 text-base font-semibold text-[#0f766e]">
              Core — Module 1: Foundations
            </span>
            <span className="rounded-full bg-[#eef2ff] px-5 py-3 text-base font-semibold text-[#3730a3]">
              Both — early childhood and school-age
            </span>
            <span className="rounded-full bg-[#faf8f5] px-5 py-3 text-base font-semibold text-[#5f5b73]">
              Approx. 25 min
            </span>
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
            Welcome to the Allied Health Assistant Role
          </h1>

          <div className="mb-7 rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-6">
            <p className="mb-2 text-lg font-semibold text-[#1e1b2e]">
              Why this matters
            </p>
            <p className="text-lg leading-relaxed text-[#5f5b73]">
              AHAs are increasingly the ones in the room day to day — early
              learning centres, classrooms, playgroups — implementing what the
              supervising AHP has designed, as support shifts into everyday
              community settings rather than clinic-only delivery.
            </p>
          </div>

          <div className="rounded-2xl border border-[#e8e4de] bg-white p-6">
            <p className="text-lg font-semibold text-[#1e1b2e]">
              Builds on: exact copy needed
              <span className="mx-2 text-[#b0acbf]">—</span>
              Leads to: Your AHA Toolkit
            </p>
          </div>
        </header>

        {/* Topic flow */}
        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Topic flow
          </p>

          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            What learners will do in this topic
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
              <h3 className="mb-3 text-2xl font-bold">Watch</h3>
              <p className="text-lg leading-relaxed text-[#5f5b73]">
                Start with the audio/video walkthrough for this topic.
              </p>
            </div>

            <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
              <h3 className="mb-3 text-2xl font-bold">Practice</h3>
              <p className="text-lg leading-relaxed text-[#5f5b73]">
                Use the scenario practice and lesson plan worksheet.
              </p>
            </div>

            <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
              <h3 className="mb-3 text-2xl font-bold">Do</h3>
              <p className="text-lg leading-relaxed text-[#5f5b73]">
                Complete the hands-on warm-up activity.
              </p>
            </div>

            <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
              <h3 className="mb-3 text-2xl font-bold">Reflect</h3>
              <p className="text-lg leading-relaxed text-[#5f5b73]">
                Finish with the reflection and debrief questions.
              </p>
            </div>
          </div>
        </section>

        {/* Hook */}
        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-[#1e1b2e] p-8 text-white md:p-10">
          <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#99f6e4]">
            Opening script
          </p>

          <blockquote className="text-xl leading-relaxed md:text-2xl">
            “You've finished your Cert IV. You know the theory. Nobody tells you
            what your first Monday actually looks like — and it's usually not
            what you pictured. It's not a clipboard and a treatment plan. It's a
            kid who doesn't know you yet, who's not sure if today's a good day or
            a bad one, and you're the person who has to make the next 30 minutes
            feel safe before anything else can happen. That's the actual job.
            Let's talk about what an AHA really is — not the textbook version.”
          </blockquote>
        </section>

        {/* Watch */}
        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Watch
              </p>
              <h2 className="text-3xl font-bold md:text-4xl">
                Audio/video walkthrough
              </h2>
            </div>

            <span className="rounded-full bg-[#f0fdfa] px-5 py-3 text-base font-semibold text-[#0f766e]">
              6 min
            </span>
          </div>

          <div className="mb-8 flex aspect-video items-center justify-center rounded-3xl border border-dashed border-[#d8d2c8] bg-[#faf8f5] p-8 text-center">
            <div>
              <p className="mb-3 text-lg font-semibold text-[#1e1b2e]">
                Video placeholder
              </p>
              <p className="text-base leading-relaxed text-[#5f5b73]">
                Add the final video URL here when it is ready.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {videoBeats.map((beat, index) => (
              <div
                key={beat}
                className="rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-6"
              >
                <p className="mb-3 text-base font-semibold text-[#0f766e]">
                  Beat {index + 1}
                </p>
                <p className="text-lg leading-relaxed text-[#5f5b73]">{beat}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Practice resources
          </p>

          <h2 className="mb-7 text-3xl font-bold md:text-4xl">
            Topic resources
          </h2>

          <div className="grid gap-5 md:grid-cols-3">
            {resourceCards.map((resource) => (
              <article
                key={resource.title}
                className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6"
              >
                <p className="mb-4 text-base font-semibold text-[#0f766e]">
                  {resource.type}
                </p>

                <h3 className="mb-4 text-2xl font-bold">{resource.title}</h3>

                <p className="text-lg leading-relaxed text-[#5f5b73]">
                  {resource.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Interactive Embed */}
        <section className="mb-8 rounded-3xl border-2 border-[#0f766e] bg-white p-8 shadow-sm md:p-10">
          <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Try it yourself
          </p>

          <h2 className="mb-5 text-3xl font-bold md:text-4xl">
            Before You Walk In: Scenario Practice + lesson plan worksheet
          </h2>

          <p className="mb-7 text-lg leading-relaxed text-[#5f5b73]">
            Learner clicks through four scenarios with feedback, then a
            “Continue to your lesson plan” button reveals the fillable worksheet
            on the same page — no second Netlify deploy needed.
          </p>

          {TOOL_EMBED_URL ? (
            <div className="overflow-hidden rounded-3xl border border-[#e8e4de] bg-[#faf8f5]">
              <iframe
                src={TOOL_EMBED_URL}
                title="Before You Walk In: Scenario Practice + lesson plan worksheet"
                className="h-190 w-full"
              />
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-[#d8d2c8] bg-[#faf8f5] p-8 text-center">
              <p className="mb-3 text-lg font-semibold text-[#1e1b2e]">
                Iframe URL not added yet
              </p>
              <p className="text-base leading-relaxed text-[#5f5b73]">
                Add the final Netlify or Vercel tool URL to TOOL_EMBED_URL at
                the top of this file.
              </p>
            </div>
          )}
        </section>

        {/* Hands-on Activity */}
        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Hands-on activity
          </p>

          <h2 className="mb-5 text-3xl font-bold md:text-4xl">
            Activity: Run a 5-minute “welcome” warm-up
          </h2>

          <p className="mb-7 max-w-4xl text-lg leading-relaxed text-[#5f5b73]">
            The first thing a good AHA does with a new child isn't therapy —
            it's making them feel safe enough for therapy to work. This activity
            puts that into practice immediately.
          </p>

          <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6 md:p-8">
            <h3 className="mb-6 text-2xl font-bold">Activity checklist</h3>

            <div className="space-y-4">
              {handsOnChecklist.map((item) => (
                <label
                  key={item}
                  className="flex gap-4 rounded-2xl border border-[#e8e4de] bg-white p-5"
                >
                  <input
                    type="checkbox"
                    className="mt-1 h-6 w-6 rounded border-[#d8d2c8]"
                  />
                  <span className="text-lg leading-relaxed text-[#5f5b73]">
                    {item}
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-white p-5">
              <p className="text-lg font-semibold text-[#1e1b2e]">
                Time: 10–15 min including setup
              </p>
            </div>
          </div>
        </section>

        {/* Lesson Plan */}
        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Lesson plan component
          </p>

          <h2 className="mb-7 text-3xl font-bold md:text-4xl">
            Lesson plan: my warm-up activity
          </h2>

          <div className="space-y-4">
            {lessonPlanItems.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-6"
              >
                <p className="mb-3 text-xl font-bold text-[#1e1b2e]">
                  {item.label}
                </p>
                <p className="text-lg leading-relaxed text-[#5f5b73]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Reflection */}
        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Reflect
          </p>

          <h2 className="mb-7 text-3xl font-bold md:text-4xl">
            Reflection / debrief
          </h2>

          <div className="space-y-4">
            {reflectionQuestions.map((question) => (
              <div
                key={question}
                className="rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-6"
              >
                <p className="text-lg font-semibold leading-relaxed text-[#1e1b2e]">
                  {question}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Where Do You Stand */}
        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#5f5b73]">
            Where Do You Stand?
          </p>

          <h2 className="mb-5 text-3xl font-bold md:text-4xl">
            Self-check copy needed
          </h2>

          <p className="text-lg leading-relaxed text-[#5f5b73]">
            This section is included in the reusable page structure, but Topic 1
            does not yet include exact “Where Do You Stand?” self-check copy.
          </p>
        </section>

        {/* Previous / Next */}
        <nav className="grid gap-4 md:grid-cols-2">
          <Link
            href="/dashboard"
            className="rounded-3xl border border-[#e8e4de] bg-white p-7 transition hover:border-[#0f766e]"
          >
            <p className="mb-3 text-base font-semibold text-[#5f5b73]">
              Previous
            </p>
            <p className="text-2xl font-bold">Academy dashboard</p>
          </Link>

          <Link
            href="/allied-health/foundations/your-aha-toolkit"
            className="rounded-3xl border border-[#e8e4de] bg-white p-7 text-right transition hover:border-[#0f766e]"
          >
            <p className="mb-3 text-base font-semibold text-[#0f766e]">
              Next
            </p>
            <p className="text-2xl font-bold">Your AHA Toolkit</p>
          </Link>
        </nav>
      </section>
    </main>
  );
}