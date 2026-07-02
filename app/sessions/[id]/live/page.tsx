import Link from "next/link";

export default function LiveSessionPage() {
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
            Live room
          </p>

          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
            Live room will be connected later
          </h1>

          <p className="mb-8 text-xl leading-relaxed text-[#5f5b73]">
            This page will later hold the live room or Zoom access for academy sessions once the membership and event structure is final.
          </p>

          <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
            <h2 className="mb-4 text-2xl font-bold">
              Future use
            </h2>

            <div className="space-y-4 text-lg leading-relaxed text-[#5f5b73]">
              <p>Monthly live Zoom access</p>
              <p>Member-only session links</p>
              <p>Replay or recording access</p>
              <p>Future embedded live-room option if needed</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Link
              href="/community"
              className="rounded-2xl bg-[#0f766e] px-5 py-4 text-center text-base font-semibold text-white transition hover:bg-[#0d6962]"
            >
              Open community hub
            </Link>

            <Link
              href="/dashboard"
              className="rounded-2xl border border-[#99f6e4] bg-[#f0fdfa] px-5 py-4 text-center text-base font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
            >
              Go to dashboard
            </Link>

            <Link
              href="/sessions"
              className="rounded-2xl border border-[#e8e4de] bg-white px-5 py-4 text-center text-base font-semibold text-[#1e1b2e] transition hover:border-[#0f766e]"
            >
              Back to sessions
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}