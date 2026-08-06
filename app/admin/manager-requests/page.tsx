import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About the Allied Health & Educator Resource Academy being built by Robyn Papworth and Jess Foster for Allied Health Assistants, educators and support teams.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-5xl px-6 py-16 text-center md:py-24">
        <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
          About the academy
        </p>

        <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
          Practical support for the people doing the work with children every
          day.
        </h1>

        <p className="mx-auto max-w-3xl text-xl leading-relaxed text-[#5f5b73]">
          The Allied Health & Educator Resource Academy is being built by Robyn
          Papworth from Play Move Improve and Jess Foster from Spectrum Village
          as a practical, grounded support space for Allied Health Assistants,
          educators, managers and support teams.
        </p>
      </section>

      <section className="border-y border-[#e8e4de] bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 md:grid-cols-3 md:py-20">
          <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-7">
            <h2 className="mb-4 text-2xl font-bold">Allied Health pathway</h2>

            <p className="text-lg leading-relaxed text-[#5f5b73]">
              A growing learning pathway for Allied Health Assistants who need
              support with role clarity, safe implementation, communication,
              observation and everyday confidence.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-7">
            <h2 className="mb-4 text-2xl font-bold">Educator pathway</h2>

            <p className="text-lg leading-relaxed text-[#5f5b73]">
              A practical resource area for educators and teams supporting
              movement, regulation, play, participation and connection in early
              childhood and school-age settings.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-7">
            <h2 className="mb-4 text-2xl font-bold">
              Community and live support
            </h2>

            <p className="text-lg leading-relaxed text-[#5f5b73]">
              A supportive place for free community connection, live webinars,
              reflective practice options and practical tools as the academy
              grows.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-14 md:py-20">
        <div className="rounded-3xl bg-[#1e1b2e] p-8 text-white md:p-12">
          <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#99f6e4]">
            Built by Robyn and Jess
          </p>

          <h2 className="mb-6 text-3xl font-bold leading-tight md:text-5xl">
            Built from real-world work across development, regulation,
            communication, movement and everyday support.
          </h2>

          <div className="space-y-5 text-lg leading-relaxed text-slate-300">
            <p>
              Robyn and Jess both work in developmental and allied health
              settings where Allied Health Assistants play a vital role in
              helping children and families receive consistent, meaningful
              support.
            </p>

            <p>
              This academy is being built to make practical knowledge easier to
              access, easier to apply and easier to return to when AHAs,
              educators, managers and support teams need clear next steps.
            </p>

            <p>
              The goal is not to overwhelm people with theory. The goal is to
              create grounded professional development, reflective tools and
              practical resources that help teams feel clearer, calmer and more
              supported in the work they are already doing.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
              <p className="text-xl font-bold text-white">Robyn Papworth</p>

              <p className="mt-2 text-base leading-relaxed text-slate-300">
                Founder of Play Move Improve, Developmental Educator and
                Exercise Physiologist.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
              <p className="text-xl font-bold text-white">Jess Foster</p>

              <p className="mt-2 text-base leading-relaxed text-slate-300">
                Founder of Spectrum Village and Developmental Educator.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e8e4de] bg-white">
        <div className="mx-auto max-w-5xl px-6 py-14 text-center md:py-20">
          <h2 className="mb-5 text-3xl font-bold md:text-5xl">
            The academy is still being built.
          </h2>

          <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-[#5f5b73]">
            Some areas are live now, and others will be opened as the course
            structure, community space, webinar pathway and resource library are
            developed.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/subscribe"
              className="rounded-full bg-[#0f766e] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
            >
              Register for the free webinar
            </Link>

            <Link
              href="/join"
              className="rounded-full border border-[#0f766e] bg-white px-6 py-4 text-base font-semibold text-[#0f766e] transition hover:bg-[#f0fdfa]"
            >
              Join the free community
            </Link>

            <Link
              href="/resource-shop"
              className="rounded-full border border-[#e8e4de] bg-[#faf8f5] px-6 py-4 text-base font-semibold text-[#1e1b2e] transition hover:border-[#0f766e]"
            >
              View resource shop
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}