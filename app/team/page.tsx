import Link from "next/link";

const teamSections = [
  {
    title: "Academy leadership",
    items: [
      "Founder / lead educator profile",
      "Business partner profile",
      "Course contributor profiles",
    ],
  },
  {
    title: "Allied Health contributors",
    items: [
      "Supervising AHP contributors",
      "AHA course contributors",
      "Guest presenters",
    ],
  },
  {
    title: "Educator contributors",
    items: [
      "Early childhood contributors",
      "School-age contributors",
      "Guest presenters",
    ],
  },
];

export default function TeamPage() {
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

        <header className="mb-12 max-w-4xl">
          <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Team
          </p>

          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
            The people behind the academy
          </h1>

          <p className="text-xl leading-relaxed text-[#5f5b73]">
            This page will introduce the academy team, contributors and guest presenters once the final profile copy is approved.
          </p>
        </header>

        <section className="mb-10 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Profile copy still needed
          </h2>

          <p className="mb-6 text-lg leading-relaxed text-[#5f5b73]">
            To keep this page accurate, add each person only when their approved name, role, credentials, profile image and short bio are ready.
          </p>

          <div className="rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-6">
            <p className="mb-3 text-lg font-semibold text-[#1e1b2e]">
              Suggested fields for each profile
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Name",
                "Role",
                "Credentials",
                "Approved short bio",
                "Approved areas of contribution",
                "Profile photo",
              ].map((field) => (
                <div
                  key={field}
                  className="rounded-2xl border border-[#e8e4de] bg-white p-4 text-lg font-semibold text-[#1e1b2e]"
                >
                  {field}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {teamSections.map((section) => (
            <article
              key={section.title}
              className="rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm"
            >
              <h2 className="mb-6 text-3xl font-bold">
                {section.title}
              </h2>

              <div className="space-y-4">
                {section.items.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-4 text-lg font-semibold text-[#1e1b2e]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-3xl border border-[#e8e4de] bg-[#1e1b2e] p-8 text-white md:p-10">
          <h2 className="mb-5 text-3xl font-bold md:text-4xl">
            Later build option
          </h2>

          <p className="max-w-3xl text-lg leading-relaxed text-[#d9d7e5]">
            This page can later become a full contributor directory with filters for Allied Health, Educator, business partnership and guest presenter profiles.
          </p>
        </section>
      </section>
    </main>
  );
}