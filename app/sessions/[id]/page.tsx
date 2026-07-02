import Link from "next/link";

export default function SessionDetailPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-5xl px-6 py-14 md:py-20">
        <div className="mb-10">
          <Link
            href="/sessions"
            className="text-base font-semibold text-[#0f766e] hover:underline"
          >
            Back to live sessions
          </Link>
        </div>

        <header className="mb-10 max-w-4xl">
          <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Live session detail
          </p>

          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
            Session detail page coming later
          </h1>

          <p className="text-xl leading-relaxed text-[#5f5b73]">
            This page will later show the details for an academy live session, monthly Zoom, or replay event.
          </p>
        </header>

        <section className="rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <h2 className="mb-5 text-3xl font-bold">
            Current options
          </h2>

          <div className="grid gap-5 md:grid-cols-3">
            <Link
              href="/community"
              className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6 transition hover:border-[#0f766e]"
            >
              <h3 className="mb-3 text-2xl font-bold">
                Community hub
              </h3>
              <p className="text-lg leading-relaxed text-[#5f5b73]">
                Open the member community layout.
              </p>
            </Link>

            <Link
              href="/videos"
              className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6 transition hover:border-[#0f766e]"
            >
              <h3 className="mb-3 text-2xl font-bold">
                Video area
              </h3>
              <p className="text-lg leading-relaxed text-[#5f5b73]">
                Open the academy video area.
              </p>
            </Link>

            <Link
              href="/dashboard"
              className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6 transition hover:border-[#0f766e]"
            >
              <h3 className="mb-3 text-2xl font-bold">
                Dashboard
              </h3>
              <p className="text-lg leading-relaxed text-[#5f5b73]">
                Return to your learner dashboard.
              </p>
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}