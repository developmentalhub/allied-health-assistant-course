import Link from "next/link";

export default function EditSessionPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-4xl px-6 py-14 md:py-20">
        <div className="mb-10">
          <Link
            href="/sessions"
            className="text-base font-semibold text-[#0f766e] hover:underline"
          >
            Back to live sessions
          </Link>
        </div>

        <section className="rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-12">
          <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Admin area
          </p>

          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
            Live session editing will be rebuilt later
          </h1>

          <p className="mb-8 text-xl leading-relaxed text-[#5f5b73]">
            This old edit page has been paused while the academy structure is cleaned up. Later, this can become an admin page for creating or editing academy live sessions, monthly Zooms, or replay events.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/sessions"
              className="rounded-2xl bg-[#0f766e] px-5 py-4 text-center text-base font-semibold text-white transition hover:bg-[#0d6962]"
            >
              View sessions area
            </Link>

            <Link
              href="/dashboard"
              className="rounded-2xl border border-[#99f6e4] bg-[#f0fdfa] px-5 py-4 text-center text-base font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
            >
              Go to dashboard
            </Link>

            <Link
              href="/"
              className="rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-5 py-4 text-center text-base font-semibold text-[#1e1b2e] transition hover:border-[#0f766e]"
            >
              Back to academy
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}