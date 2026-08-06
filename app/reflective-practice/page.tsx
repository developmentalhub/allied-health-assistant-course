import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  Lightbulb,
  MessageCircleHeart,
  ShieldCheck,
} from "lucide-react";

export default function ReflectivePracticePage() {
  return (
    <main className="min-h-screen bg-[#fffaf3] px-5 py-12 text-[#1e1b2e] sm:px-6 md:py-20">
      <section className="mx-auto max-w-6xl">
        <section className="mb-8 overflow-hidden rounded-4xl border border-[#f4d9a6] bg-white shadow-sm">
          <div className="grid gap-8 bg-linear-to-br from-[#fff7df] via-white to-[#f0fdfa] p-7 md:p-12 lg:grid-cols-[1fr_0.72fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
                Allied Health Hive | Reflective Support
              </p>

              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                A supportive place to talk through the sessions that stay with you.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#5f5b73]">
                Reflective support can help you slow down, make sense of what
                happened and feel clearer about what to do next.
              </p>

              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#5f5b73]">
                A difficult session does not mean you have failed. Sometimes you
                simply need space to reflect, organise your thoughts and prepare
                a clearer conversation with your supervising professional.
              </p>

              <a
                href="#enquire"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Ask about reflective support
                <ArrowRight size={18} />
              </a>
            </div>

            <aside className="rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-6 md:p-8">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <HeartHandshake size={27} />
              </div>

              <h2 className="mb-4 text-2xl font-bold">
                You do not need to have the perfect words
              </h2>

              <div className="grid gap-3">
                <CheckItem text="Talk through a session that felt difficult" />
                <CheckItem text="Organise what you noticed" />
                <CheckItem text="Prepare questions for your supervisor" />
                <CheckItem text="Explore practical next steps" />
                <CheckItem text="Build confidence without judgement" />
              </div>
            </aside>
          </div>
        </section>

        <section className="mb-8 grid gap-5 md:grid-cols-3">
          <FeatureCard
            icon={<MessageCircleHeart size={24} />}
            title="Talk it through"
            text="Reflect on what happened, what felt difficult and what you are still unsure about."
          />

          <FeatureCard
            icon={<Lightbulb size={24} />}
            title="Find a clearer next step"
            text="Identify what may need discussion, clarification or a practical adjustment."
          />

          <FeatureCard
            icon={<HeartHandshake size={24} />}
            title="Build confidence"
            text="Use reflection as a learning process rather than a judgement of your performance."
          />
        </section>

        <section className="mb-8 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Reflective support may help when
          </p>

          <h2 className="text-3xl font-bold leading-tight md:text-4xl">
            You are carrying uncertainty after a session.
          </h2>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <SupportPoint text="A child did not engage and you are unsure what to try next." />
            <SupportPoint text="You want to give clearer feedback to the supervising professional." />
            <SupportPoint text="You are questioning whether you handled a situation well." />
            <SupportPoint text="You are feeling less confident after a difficult session." />
            <SupportPoint text="The instructions or expectations felt unclear." />
            <SupportPoint text="You want help preparing useful questions before your next session." />
          </div>
        </section>

        <section className="mb-8 rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-7 shadow-sm md:p-10">
          <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-start">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#0f766e]">
              <ShieldCheck size={26} />
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Professional boundary
              </p>

              <h2 className="text-3xl font-bold">
                Reflective support does not replace supervision.
              </h2>

              <p className="mt-4 max-w-4xl text-base leading-relaxed text-[#3f5f5a]">
                This support does not replace workplace supervision, clinical
                supervision, delegation, direction, incident reporting, clinical
                decision-making or employer responsibilities. Where a task,
                safety issue or clinical direction is unclear, contact the
                appropriate supervising professional or workplace manager.
              </p>
            </div>
          </div>
        </section>

        <section
          id="enquire"
          className="scroll-mt-24 rounded-4xl bg-[#1e1b2e] p-8 text-white shadow-sm md:p-12"
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#99f6e4]">
                Reflective support enquiry
              </p>

              <h2 className="text-3xl font-bold leading-tight md:text-5xl">
                You can start with a simple conversation.
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#d9d7e5] md:text-lg">
                Tell Robyn and Jess what you would like support with. You do not
                need to explain everything perfectly before making contact.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Contact the Allied Health Hive
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/tools"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Use a reflection tool first
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3">
      <CheckCircle2
        className="mt-0.5 shrink-0 text-[#0f766e]"
        size={18}
      />
      <p className="text-sm leading-relaxed text-[#3f5f5a]">{text}</p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
        {icon}
      </div>

      <h2 className="mb-3 text-xl font-bold">{title}</h2>
      <p className="text-sm leading-relaxed text-[#6b6880]">{text}</p>
    </article>
  );
}

function SupportPoint({ text }: { text: string }) {
  return (
    <div className="flex gap-3 rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
      <CheckCircle2
        className="mt-0.5 shrink-0 text-[#0f766e]"
        size={18}
      />
      <p className="text-sm leading-relaxed text-[#5f5b73]">{text}</p>
    </div>
  );
}