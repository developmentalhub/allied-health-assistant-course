import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Home,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto flex max-w-5xl items-center px-6 py-16 md:min-h-[70vh] md:py-24">
        <div className="w-full rounded-3xl border border-[#e8e4de] bg-white p-8 text-center shadow-sm md:p-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
            <ShieldCheck size={32} />
          </div>

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
            Page not found
          </p>

          <h1 className="mx-auto mb-5 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            This AHA Professional Development page is not available.
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-[#6b6880] md:text-lg">
            The link may have changed, the page may still be coming soon, or the
            address may have been typed incorrectly. You can return to one of
            the main AHA Professional Development pathways below.
          </p>

          <div className="grid gap-4 text-left md:grid-cols-3">
            <Link
              href="/"
              className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5 transition hover:border-[#99f6e4] hover:bg-[#f0fdfa]"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <Home size={22} />
              </div>

              <h2 className="mb-2 text-lg font-bold">Homepage</h2>

              <p className="mb-4 text-sm leading-relaxed text-[#6b6880]">
                Return to the main AHA Professional Development page.
              </p>

              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
                Go home
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
                Register interest in foundation AHA PD, reflective practice or
                future learning options.
              </p>

              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
                View options
                <ArrowRight size={15} />
              </span>
            </Link>

            <Link
              href="/join"
              className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5 transition hover:border-[#99f6e4] hover:bg-[#f0fdfa]"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <MessageCircle size={22} />
              </div>

              <h2 className="mb-2 text-lg font-bold">Free community</h2>

              <p className="mb-4 text-sm leading-relaxed text-[#6b6880]">
                Join quietly, browse updates and stay connected.
              </p>

              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
                Join free
                <ArrowRight size={15} />
              </span>
            </Link>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/subscribe"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
            >
              View AHA PD options
              <ArrowRight size={15} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-6 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
            >
              Contact Robyn
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}