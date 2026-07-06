import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  MessageCircle,
  ShieldCheck,
  Video,
} from "lucide-react";

export default function TopicsComingSoonPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-5xl px-6 py-14 md:py-20">
        <section className="rounded-3xl border border-[#e8e4de] bg-white p-8 text-center shadow-sm md:p-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
            <Video size={32} />
          </div>

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
            Foundation AHA PD topics
          </p>

          <h1 className="mx-auto mb-5 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Topic videos are being prepared.
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-[#6b6880] md:text-lg">
            The foundation AHA Professional Development topic pages will open
            once the videos and supporting resources are ready. For now, you can
            join the free community, register interest or complete the relevant
            reflection pathway.
          </p>

          <div className="mx-auto mb-8 max-w-3xl rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5 text-left">
            <div className="flex gap-3">
              <ShieldCheck
                size={22}
                className="mt-0.5 shrink-0 text-[#0f766e]"
              />

              <div>
                <p className="mb-1 text-sm font-semibold text-[#0f766e]">
                  Content boundary
                </p>

                <p className="text-sm leading-relaxed text-[#3f5f5a]">
                  These topics will focus on foundation reflective professional
                  development for AHAs. Deeper specialist Play Move Improve
                  training will remain separate.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 text-left md:grid-cols-3">
            <Link
              href="/join"
              className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5 transition hover:border-[#99f6e4] hover:bg-[#f0fdfa]"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <MessageCircle size={22} />
              </div>

              <h2 className="mb-2 text-lg font-bold">Free community</h2>

              <p className="mb-4 text-sm leading-relaxed text-[#6b6880]">
                Join quietly, browse updates and stay connected while the topic
                library is being prepared.
              </p>

              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
                Join free
                <ArrowRight size={15} />
              </span>
            </Link>

            <Link
              href="/subscribe"
              className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5 transition hover:border-[#99f6e4] hover:bg-[#f0fdfa]"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <BookOpen size={22} />
              </div>

              <h2 className="mb-2 text-lg font-bold">AHA PD options</h2>

              <p className="mb-4 text-sm leading-relaxed text-[#6b6880]">
                Register interest in individual foundation topics, the 2026
                library or future learning options.
              </p>

              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
                View options
                <ArrowRight size={15} />
              </span>
            </Link>

            <Link
              href="/reflective-practice"
              className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5 transition hover:border-[#99f6e4] hover:bg-[#f0fdfa]"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <ShieldCheck size={22} />
              </div>

              <h2 className="mb-2 text-lg font-bold">
                Reflective practice
              </h2>

              <p className="mb-4 text-sm leading-relaxed text-[#6b6880]">
                Complete the reflection form before any 1:1 booking or payment
                details are sent.
              </p>

              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
                Complete form
                <ArrowRight size={15} />
              </span>
            </Link>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/subscribe"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
            >
              Register interest
              <ArrowRight size={15} />
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-6 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
            >
              Back to homepage
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}