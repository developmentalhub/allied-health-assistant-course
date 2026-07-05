import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  ClipboardList,
  MessageCircle,
  ShieldCheck,
  UserRoundCheck,
  Users,
} from "lucide-react";

export default function SubscribeSuccessPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-5xl px-6 py-14 md:py-20">
        <div className="rounded-3xl border border-[#e8e4de] bg-white p-8 text-center shadow-sm md:p-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#0f766e] text-white">
            <Check size={32} />
          </div>

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
            Interest received
          </p>

          <h1 className="mx-auto mb-5 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            You&apos;re on the AHA Professional Development interest list.
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-[#6b6880] md:text-lg">
            Thank you. Your response helps shape the foundation AHA PD topics,
            reflection tools, printable resources and reflective practice
            pathways being built.
          </p>

          <div className="mx-auto mb-8 max-w-3xl rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5 text-left">
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
                  This platform provides reflective professional development and
                  reflective practice support. It does not replace the
                  supervision, direction, delegation, clinical oversight or
                  workplace responsibilities provided by the allied health
                  professional, employer or service the AHA works under.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 text-left md:grid-cols-2">
            <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <MessageCircle size={22} />
              </div>

              <h2 className="mb-2 text-lg font-bold">Free community</h2>

              <p className="mb-4 text-sm leading-relaxed text-[#6b6880]">
                Browse quietly, introduce yourself if you want, read updates and
                stay connected while the AHA PD options are being shaped.
              </p>

              <Link
                href="/join"
                className="inline-flex items-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Visit free community
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <BookOpen size={22} />
              </div>

              <h2 className="mb-2 text-lg font-bold">
                Foundation AHA PD Library
              </h2>

              <p className="mb-4 text-sm leading-relaxed text-[#6b6880]">
                The planned foundation library will include topic videos,
                reflection prompts, printable PDFs and practical tools.
              </p>

              <Link
                href="/topics"
                className="inline-flex items-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-5 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
              >
                View topic preview
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <UserRoundCheck size={22} />
              </div>

              <h2 className="mb-2 text-lg font-bold">
                1:1 Reflective Practice
              </h2>

              <p className="mb-4 text-sm leading-relaxed text-[#6b6880]">
                For 1:1 reflective practice, the reflection form must be
                submitted and reviewed before any booking or payment details are
                sent.
              </p>

              <Link
                href="/reflective-practice"
                className="inline-flex items-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-5 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
              >
                Complete reflection form
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <Users size={22} />
              </div>

              <h2 className="mb-2 text-lg font-bold">Manager pathway</h2>

              <p className="mb-4 text-sm leading-relaxed text-[#6b6880]">
                Managers and clinic owners can register interest in future team
                options, topic bundles and foundation AHA PD support.
              </p>

              <Link
                href="/manager-pathway"
                className="inline-flex items-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-5 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
              >
                Manager pathway
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="mt-8 rounded-3xl bg-[#1e1b2e] p-6 text-left text-white">
            <div className="flex gap-3">
              <ClipboardList
                size={22}
                className="mt-0.5 shrink-0 text-[#99f6e4]"
              />

              <div>
                <p className="mb-1 text-sm font-semibold text-[#99f6e4]">
                  What happens next?
                </p>

                <p className="text-sm leading-relaxed text-[#d9d7e5]">
                  The first priorities will be shaped by the questions and
                  support needs people submit. The goal is to build foundation
                  AHA PD that is practical, reflective and useful without
                  replacing workplace supervision.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/subscribe"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
            >
              Back to AHA PD options
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
        </div>
      </section>
    </main>
  );
}