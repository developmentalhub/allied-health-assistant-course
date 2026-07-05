import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Mail,
  MessageCircle,
  ShieldCheck,
  UserRoundCheck,
  Users,
} from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
                Contact
              </p>

              <h1 className="mb-5 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
                Questions about AHA Professional Development?
              </h1>

              <p className="mb-6 max-w-2xl text-base leading-relaxed text-[#6b6880] md:text-lg">
                This space is being built for Allied Health Assistants, therapy
                assistants, students, educators, managers and the professionals
                working alongside them. Use the links below to choose the best
                next step.
              </p>

              <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
                <div className="flex gap-3">
                  <ShieldCheck
                    size={22}
                    className="mt-0.5 shrink-0 text-[#0f766e]"
                  />

                  <div>
                    <p className="mb-1 text-sm font-semibold text-[#0f766e]">
                      Professional boundary
                    </p>

                    <p className="text-sm leading-relaxed text-[#3f5f5a]">
                      This platform provides reflective professional development
                      and reflective practice support. It does not replace
                      workplace supervision, clinical supervision, delegation,
                      direction, clinical oversight or workplace responsibilities.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <Mail size={24} />
              </div>

              <h2 className="mb-3 text-2xl font-bold">Email Robyn</h2>

              <p className="mb-5 text-sm leading-relaxed text-[#3f5f5a]">
                For general questions about the AHA PD platform, foundation
                topics, reflective practice, team options or Play Move Improve
                pathways, email Robyn directly.
              </p>

              <a
                href="mailto:playmoveimprove@gmail.com?subject=AHA Professional Development enquiry"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-4 text-center text-base font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Email playmoveimprove@gmail.com
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Choose your pathway
            </p>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              The fastest way to get to the right place.
            </h2>

            <p className="text-base leading-relaxed text-[#6b6880]">
              Different people will need different entry points. You may want to
              join the free community, register interest in foundation AHA PD,
              submit a reflection form, or enquire about team support.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <MessageCircle size={24} />
              </div>

              <h3 className="mb-3 text-2xl font-bold">Free AHA Community</h3>

              <p className="mb-5 text-sm leading-relaxed text-[#6b6880]">
                Join quietly, browse the feed, introduce yourself if you want
                and stay connected as the AHA PD options grow.
              </p>

              <Link
                href="/join"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Join free community
                <ArrowRight size={15} />
              </Link>
            </article>

            <article className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <BookOpen size={24} />
              </div>

              <h3 className="mb-3 text-2xl font-bold">AHA PD Options</h3>

              <p className="mb-5 text-sm leading-relaxed text-[#6b6880]">
                Register interest in individual foundation topics, the 2026
                Foundation AHA PD Library or future learning options.
              </p>

              <Link
                href="/subscribe"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                View PD options
                <ArrowRight size={15} />
              </Link>
            </article>

            <article className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <UserRoundCheck size={24} />
              </div>

              <h3 className="mb-3 text-2xl font-bold">
                1:1 Reflective Practice
              </h3>

              <p className="mb-5 text-sm leading-relaxed text-[#6b6880]">
                Complete the reflection form first. Booking and payment details
                are only sent after the reflection has been reviewed.
              </p>

              <Link
                href="/reflective-practice"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Complete reflection form
                <ArrowRight size={15} />
              </Link>
            </article>

            <article className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <Users size={24} />
              </div>

              <h3 className="mb-3 text-2xl font-bold">Manager pathway</h3>

              <p className="mb-5 text-sm leading-relaxed text-[#6b6880]">
                For clinic owners, managers, team leaders and services wanting
                foundation AHA PD or future team support options.
              </p>

              <Link
                href="/manager-pathway"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Manager pathway
                <ArrowRight size={15} />
              </Link>
            </article>
          </div>
        </section>

        <section className="rounded-3xl bg-[#1e1b2e] p-8 text-white shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#99f6e4]">
                Play Move Improve
              </p>

              <h2 className="mb-5 text-3xl font-bold md:text-5xl">
                Looking for Robyn&apos;s deeper specialist training?
              </h2>

              <p className="text-base leading-relaxed text-[#d9d7e5] md:text-lg">
                The AHA platform focuses on foundation reflective professional
                development. Deeper specialist learning around movement,
                regulation, play, child development, screen dependency, reflexes
                and intervention resources stays within Play Move Improve.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
              <p className="mb-5 text-sm leading-relaxed text-[#d9d7e5]">
                Once the Allied Health page is finished, we can build a more
                specific Play Move Improve professional pathway page.
              </p>

              <a
                href="https://www.playmoveimprove.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-4 text-center text-base font-semibold text-[#1e1b2e] transition hover:bg-[#f5f3ff]"
              >
                Visit Play Move Improve
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}