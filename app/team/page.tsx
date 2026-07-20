import Link from "next/link";

const teamSections = [
  {
    title: "Academy leadership",
    items: [
      "Robyn Papworth, Founder of Play Move Improve",
      "Jess Foster, Founder of Spectrum Village",
      "Future approved contributor profiles",
    ],
  },
  {
    title: "Allied Health contributors",
    items: [
      "Supervising allied health professional contributors",
      "AHA course and webinar contributors",
      "Guest presenters with approved profile copy",
    ],
  },
  {
    title: "Educator contributors",
    items: [
      "Early childhood contributors",
      "School-age contributors",
      "Community and inclusion presenters",
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
            The people behind the academy.
          </h1>

          <p className="text-xl leading-relaxed text-[#5f5b73]">
            The Allied Health & Educator Resource Academy is being built by
            Robyn Papworth from Play Move Improve and Jess Foster from Spectrum
            Village, with future contributors added only when approved profile
            copy is ready.
          </p>
        </header>

        <section className="mb-10 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Academy leadership
            </p>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Robyn and Jess are building this space together.
            </h2>

            <p className="text-lg leading-relaxed text-[#5f5b73]">
              This academy brings together practical developmental education,
              allied health experience, clinic systems and real-world AHA
              support. The aim is to create a grounded space that helps AHAs,
              educators, managers and clinics feel clearer and more supported in
              their day-to-day work.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Play Move Improve
              </p>

              <h3 className="mb-3 text-2xl font-bold">Robyn Papworth</h3>

              <p className="text-base leading-relaxed text-[#5f5b73]">
                Robyn is the founder of Play Move Improve, a Developmental
                Educator and Exercise Physiologist. She brings practical
                experience across movement, regulation, child development,
                education and allied health support.
              </p>
            </article>

            <article className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Spectrum Village
              </p>

              <h3 className="mb-3 text-2xl font-bold">Jess Foster</h3>

              <p className="text-base leading-relaxed text-[#5f5b73]">
                Jess is the founder of Spectrum Village and a Developmental
                Educator. She brings experience in autism support, family-centred
                practice, team development and the everyday realities of
                supporting AHAs within a service.
              </p>
            </article>
          </div>
        </section>

        <section className="mb-10 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Contributor profiles will be added carefully.
          </h2>

          <p className="mb-6 text-lg leading-relaxed text-[#5f5b73]">
            To keep this page accurate, each contributor will only be added once
            their approved name, role, credentials, profile image and short bio
            are ready.
          </p>

          <div className="rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-6">
            <p className="mb-3 text-lg font-semibold text-[#1e1b2e]">
              Suggested fields for each future profile
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
              <h2 className="mb-6 text-3xl font-bold">{section.title}</h2>

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
            This page can later become a full contributor directory with filters
            for academy leadership, allied health, educators, business
            partnership and guest presenter profiles.
          </p>
        </section>
      </section>
    </main>
  );
}