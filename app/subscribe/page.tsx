import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  FileText,
  Mail,
  PlayCircle,
  Sparkles,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AHA Professional Development Membership",
  description:
    "Join the AHA Professional Development Membership for monthly live webinars, PDF resources, and access to webinar recordings.",
};

export default function SubscribePage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        {/* HERO */}
        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
                AHA Professional Development Membership
              </p>

              <h1 className="mb-5 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
                Monthly support for Allied Health Assistants doing important
                work.
              </h1>

              <p className="mb-6 max-w-2xl text-base leading-relaxed text-[#6b6880] md:text-lg">
                Join Jess and Robyn each month for practical, reflective
                professional development created specifically for AHAs working
                in paediatric and allied health settings.
              </p>

              <div className="mb-6 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0f766e] text-white">
                    <Sparkles size={20} />
                  </div>

                  <h2 className="text-xl font-bold">
                    August launch webinar is free
                  </h2>
                </div>

                <p className="text-sm leading-relaxed text-[#3f5f5a]">
                  Join now and get access to the Tuesday 4 August 2026 launch
                  webinar free. Your card is added at checkout, but your first
                  $57 monthly payment is not taken until Tuesday 1 September
                  2026.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <form action="/api/stripe/monthly-webinar-checkout" method="POST">
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962] sm:w-auto"
                  >
                    Join with August free
                    <ArrowRight size={18} />
                  </button>
                </form>

                <Link
                  href="/webinars"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0f766e] px-6 py-4 text-base font-semibold text-[#0f766e] transition hover:bg-[#f0fdfa]"
                >
                  View webinar schedule
                  <CalendarDays size={18} />
                </Link>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#6b6880]">
                Pay yourself, or send this to your manager. Many clinics cover
                professional development for AHAs.
              </p>
            </div>

            <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-6 md:p-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
                Monthly membership
              </p>

              <div className="mb-5 flex items-end gap-2">
                <span className="text-5xl font-bold">$57</span>
                <span className="pb-2 text-base text-[#6b6880]">per month</span>
              </div>

              <p className="mb-4 text-sm leading-relaxed text-[#3f5f5a]">
                Includes monthly live webinars, topic PDFs, practical reflection
                resources, and access to recordings from your member library.
              </p>

              <div className="mb-6 rounded-2xl border border-[#99f6e4] bg-white p-4">
                <p className="text-sm font-semibold text-[#1e1b2e]">
                  First month free:
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#6b6880]">
                  August webinar access is included free. First payment is due
                  on Tuesday 1 September 2026.
                </p>
              </div>

              <ul className="mb-6 space-y-3 text-sm leading-relaxed text-[#1e1b2e]">
                <li className="flex gap-3">
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-[#0f766e]"
                    size={18}
                  />
                  <span>Monthly live AHA professional development webinar</span>
                </li>

                <li className="flex gap-3">
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-[#0f766e]"
                    size={18}
                  />
                  <span>PDF resources linked to each webinar topic</span>
                </li>

                <li className="flex gap-3">
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-[#0f766e]"
                    size={18}
                  />
                  <span>
                    Recordings saved under each topic after the live session
                  </span>
                </li>

                <li className="flex gap-3">
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-[#0f766e]"
                    size={18}
                  />
                  <span>First webinar promo starts Tuesday 4 August 2026</span>
                </li>
              </ul>

              <form action="/api/stripe/monthly-webinar-checkout" method="POST">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-4 text-center text-base font-semibold text-white transition hover:bg-[#0d6962]"
                >
                  Start membership with August free
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* WHAT IS INCLUDED */}
        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              What is included
            </p>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Simple, practical, and built around monthly topics.
            </h2>

            <p className="text-base leading-relaxed text-[#6b6880]">
              This is not a separate video library subscription. The membership
              is built around monthly live professional development sessions,
              with each topic supported by PDFs and a recording after the
              webinar.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <article className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <CalendarDays size={24} />
              </div>

              <h3 className="mb-3 text-xl font-bold">Monthly live webinar</h3>

              <p className="text-sm leading-relaxed text-[#6b6880]">
                Webinars run on the first Tuesday of each month from 12pm to
                1pm. Each session focuses on a practical AHA topic.
              </p>
            </article>

            <article className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <FileText size={24} />
              </div>

              <h3 className="mb-3 text-xl font-bold">Topic PDFs</h3>

              <p className="text-sm leading-relaxed text-[#6b6880]">
                Members receive simple, useful PDF resources connected to each
                webinar topic, so learning can be used in real practice.
              </p>
            </article>

            <article className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <PlayCircle size={24} />
              </div>

              <h3 className="mb-3 text-xl font-bold">Recorded sessions</h3>

              <p className="text-sm leading-relaxed text-[#6b6880]">
                Recordings are saved after each webinar and organised by topic
                inside the member resource area.
              </p>
            </article>
          </div>
        </section>

        {/* FIRST FREE PROMO */}
        <section className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-8 shadow-sm md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <Sparkles size={24} />
              </div>

              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                First webinar free promo
              </h2>

              <p className="text-base leading-relaxed text-[#3f5f5a]">
                The first webinar is Tuesday 4 August 2026. This is the free
                promo month to help AHAs and clinics experience the membership
                before ongoing monthly sessions begin.
              </p>
            </div>

            <div className="rounded-3xl border border-[#99f6e4] bg-white p-6">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
                First session
              </p>

              <h3 className="mb-3 text-2xl font-bold">
                Tuesday 4 August 2026
              </h3>

              <p className="mb-5 text-sm leading-relaxed text-[#6b6880]">
                12pm to 1pm AEST. Your first payment is not taken until Tuesday
                1 September 2026.
              </p>

              <form action="/api/stripe/monthly-webinar-checkout" method="POST">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
                >
                  Join and get August free
                  <ArrowRight size={15} />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* PAYMENT OPTIONS */}
        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Payment options
            </p>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Pay yourself or send it to your manager.
            </h2>

            <p className="text-base leading-relaxed text-[#6b6880]">
              AHAs can subscribe directly, or employers can organise payment for
              their team. Clinics wanting multiple seats can contact us for a
              team quote.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <article className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <Users size={24} />
              </div>

              <h3 className="mb-3 text-xl font-bold">AHA pays directly</h3>

              <p className="mb-5 text-sm leading-relaxed text-[#6b6880]">
                Subscribe yourself and access the monthly webinar, PDFs and
                recordings. Your first payment is not taken until Tuesday 1
                September 2026.
              </p>

              <form action="/api/stripe/monthly-webinar-checkout" method="POST">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
                >
                  Join with August free
                  <ArrowRight size={15} />
                </button>
              </form>
            </article>

            <article className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <Building2 size={24} />
              </div>

              <h3 className="mb-3 text-xl font-bold">Send to manager</h3>

              <p className="mb-5 text-sm leading-relaxed text-[#6b6880]">
                Copy the page link and send it to your employer. Many clinics
                cover professional development for AHAs.
              </p>

              <a
                href="mailto:?subject=AHA Professional Development Membership&body=Hi, I found this monthly AHA Professional Development Membership and wondered if our clinic would consider covering it. It includes monthly live webinars, PDF resources and recordings for $57/month. The August 4 launch webinar is free, and the first payment is not taken until September 1, 2026. Here is the page link: https://allied-health-assistant-course.vercel.app/subscribe"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#0f766e] px-5 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#f0fdfa]"
              >
                Email manager
                <Mail size={15} />
              </a>
            </article>

            <article className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <Building2 size={24} />
              </div>

              <h3 className="mb-3 text-xl font-bold">Team or clinic quote</h3>

              <p className="mb-5 text-sm leading-relaxed text-[#6b6880]">
                For clinics wanting multiple AHAs to join, contact us and we can
                discuss a simple team option.
              </p>

              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#0f766e] px-5 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#f0fdfa]"
              >
                Contact us
                <ArrowRight size={15} />
              </Link>
            </article>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="rounded-3xl bg-[#1e1b2e] p-8 text-white shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <h2 className="mb-5 text-3xl font-bold md:text-5xl">
                Built for AHAs, not hidden inside a generic training platform.
              </h2>

              <p className="text-base leading-relaxed text-[#d9d7e5] md:text-lg">
                This membership is designed to give AHAs practical monthly
                support, space to reflect, and resources they can return to
                after each topic.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
              <p className="mb-5 text-sm leading-relaxed text-[#d9d7e5]">
                Join now for the August launch webinar free. Your $57/month
                membership begins on Tuesday 1 September 2026.
              </p>

              <form action="/api/stripe/monthly-webinar-checkout" method="POST">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-4 text-center text-base font-semibold text-[#1e1b2e] transition hover:bg-[#f5f3ff]"
                >
                  Start with August free
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}