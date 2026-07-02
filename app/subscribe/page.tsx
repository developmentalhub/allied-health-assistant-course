import Link from "next/link";

const accessOptions = [
  {
    title: "Allied Health course access",
    status: "Payment link coming later",
    details: [
      "Foundations module",
      "Developmental milestones series",
      "Specialty tracks",
      "Business partnership module",
    ],
  },
  {
    title: "AHA monthly membership",
    status: "Payment link coming later",
    details: [
      "Community feed",
      "Monthly live Zooms",
      "Saved recordings",
      "Shared resources",
    ],
  },
  {
    title: "Educator access",
    status: "Payment link coming later",
    details: [
      "Educator pathway",
      "Joyful Educator tools",
      "Movement and regulation resources",
      "Future educator modules",
    ],
  },
];

export default function SubscribePage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <div className="mb-10">
          <Link
            href="/"
            className="text-base font-semibold text-[#0f766e] hover:underline"
          >
            Back to academy
          </Link>
        </div>

        <header className="mb-10 max-w-4xl">
          <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Membership and access
          </p>

          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
            Choose your academy access
          </h1>

          <p className="text-xl leading-relaxed text-[#5f5b73]">
            Payment links will be connected later. For now, this page shows the access structure for the academy.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          {accessOptions.map((option) => (
            <article
              key={option.title}
              className="rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm"
            >
              <p className="mb-4 rounded-full bg-[#f0fdfa] px-5 py-3 text-base font-semibold text-[#0f766e]">
                {option.status}
              </p>

              <h2 className="mb-6 text-3xl font-bold">
                {option.title}
              </h2>

              <div className="mb-8 space-y-4">
                {option.details.map((detail) => (
                  <div
                    key={detail}
                    className="rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-4 text-lg font-semibold text-[#1e1b2e]"
                  >
                    {detail}
                  </div>
                ))}
              </div>

              <button
                type="button"
                disabled
                className="w-full rounded-full bg-[#d8d2c8] px-6 py-4 text-base font-semibold text-[#5f5b73] disabled:cursor-not-allowed"
              >
                Stripe link coming soon
              </button>
            </article>
          ))}
        </div>

        <section className="mt-10 rounded-3xl border border-[#e8e4de] bg-white p-8 md:p-10">
          <h2 className="mb-5 text-3xl font-bold">
            Already have access?
          </h2>

          <p className="mb-6 text-lg leading-relaxed text-[#5f5b73]">
            Sign in to continue to your dashboard.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/login?redirect=/dashboard"
              className="rounded-full bg-[#0f766e] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
            >
              Sign in
            </Link>

            <Link
              href="/signup"
              className="rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-7 py-4 text-base font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
            >
              Create learner account
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}