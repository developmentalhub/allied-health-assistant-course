import Link from "next/link";

export default function SubscribeSuccessPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-14 text-[#1e1b2e] md:py-20">
      <section className="mx-auto max-w-3xl rounded-3xl border border-[#e8e4de] bg-white p-8 text-center shadow-sm md:p-12">
        <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
          Access confirmed
        </p>

        <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
          Welcome to the academy
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-[#5f5b73]">
          Your access has been confirmed. You can now continue to the academy dashboard, open the first Allied Health topic, or visit the community hub.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/dashboard"
            className="rounded-2xl bg-[#0f766e] px-5 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
          >
            Go to dashboard
          </Link>

          <Link
            href="/allied-health/foundations/welcome-to-aha-role"
            className="rounded-2xl border border-[#99f6e4] bg-[#f0fdfa] px-5 py-4 text-base font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
          >
            Open first topic
          </Link>

          <Link
            href="/community"
            className="rounded-2xl border border-[#c7d2fe] bg-[#eef2ff] px-5 py-4 text-base font-semibold text-[#3730a3] transition hover:bg-[#e0e7ff]"
          >
            Open community hub
          </Link>
        </div>

        <div className="mt-8 rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-5 text-left">
          <p className="text-base leading-relaxed text-[#5f5b73]">
            Later, this page can be used as the Stripe redirect page after successful course or membership purchase.
          </p>
        </div>
      </section>
    </main>
  );
}