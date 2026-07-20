import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Heart,
  Mail,
  MessageCircle,
  UserRoundCheck,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — Allied Health & Educator Resource Academy",
  description:
    "Get in touch about the Allied Health & Educator Resource Academy, free webinar, AHA community, reflective practice, resource shop or future training pathways.",
};

const jessEmail = "jess@spectrumvillage.com.au";

const jessPhoto =
  "https://aracabetvunmirlfgylv.supabase.co/storage/v1/object/public/website-images/Headshots/Jess%20Spectrum%20Village%20headshot.jpg";

const robynPhoto =
  "https://aracabetvunmirlfgylv.supabase.co/storage/v1/object/public/website-images/Headshots/Robyn%20Play%20Move%20Improve%20headshot.jpg";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
                Contact
              </p>

              <h1 className="mb-5 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
                Robyn and Jess are building this AHA space together.
              </h1>

              <p className="mb-6 max-w-2xl text-base leading-relaxed text-[#6b6880] md:text-lg">
                Jess from Spectrum Village and Robyn from Play Move Improve are
                joining forces to create a practical, supportive space for
                Allied Health Assistants, managers and clinics. If you have a
                question, want to get involved, or would like to enquire about
                future resources, start here.
              </p>
            </div>

            <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <Mail size={24} />
              </div>

              <h2 className="mb-3 text-2xl font-bold">AHA enquiries</h2>

              <p className="mb-5 text-sm leading-relaxed text-[#3f5f5a]">
                For now, AHA enquiries are being directed to Jess while a shared
                partnership inbox is being set up.
              </p>

              <a
                href={`mailto:${jessEmail}?subject=AHA enquiry`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-4 text-center text-base font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Email Jess
                <ArrowRight size={16} />
              </a>

              <p className="mt-4 text-xs leading-relaxed text-[#3f5f5a]">
                Email: {jessEmail}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Meet the founders
            </p>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Two clinics, one shared belief.
            </h2>

            <p className="text-base leading-relaxed text-[#6b6880]">
              We work either side of the same truth: as Developmental Educators
              in allied health, we could not do our jobs without Allied Health
              Assistants. AHAs are the people who help turn a therapy plan into
              real progress, week after week. This space is our way of investing
              back into the people who make that work possible.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
              <div className="mb-5 flex items-center gap-4">
                <img
                  src={jessPhoto}
                  alt="Jess Foster, founder of Spectrum Village"
                  className="h-20 w-20 rounded-full border border-[#e8e4de] object-cover"
                />

                <div>
                  <h3 className="text-xl font-bold">Jess Foster</h3>
                  <p className="text-sm text-[#0f766e]">
                    Founder, Spectrum Village
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-[#6b6880]">
                Jess is the founder of Spectrum Village, an NDIS-registered
                autism learning centre on the Fraser Coast in Hervey Bay. Her
                team supports children and families through a holistic,
                strengths-based approach. Jess understands how important skilled
                therapy assistants are in helping children and families receive
                consistent, meaningful support.
              </p>
            </article>

            <article className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
              <div className="mb-5 flex items-center gap-4">
                <img
                  src={robynPhoto}
                  alt="Robyn Papworth, Developmental Educator and founder of Play Move Improve"
                  className="h-20 w-20 rounded-full border border-[#e8e4de] object-cover"
                />

                <div>
                  <h3 className="text-xl font-bold">Robyn Papworth</h3>
                  <p className="text-sm text-[#0f766e]">
                    Founder, Play Move Improve
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-[#6b6880]">
                Robyn is a Developmental Educator, Exercise Physiologist and the
                founder of Play Move Improve, supporting children&apos;s
                movement, regulation and development. She is passionate about
                practical training that helps AHAs feel more confident,
                supported and clear in their role.
              </p>
            </article>
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Choose your pathway
            </p>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              The fastest way to the right place.
            </h2>

            <p className="text-base leading-relaxed text-[#6b6880]">
              Different people need different starting points. Join the free
              community, register for the free webinar, book 1:1 reflective
              practice, or enquire about team support.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <MessageCircle size={24} />
              </div>

              <h3 className="mb-3 text-2xl font-bold">Free AHA Community</h3>

              <p className="mb-5 text-sm leading-relaxed text-[#6b6880]">
                Join quietly, browse the feed, introduce yourself if you want,
                and connect with other AHAs as this space grows.
              </p>

              <Link
                href="/join"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Join free community
                <ArrowRight size={15} />
              </Link>
            </article>

            <article className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <BookOpen size={24} />
              </div>

              <h3 className="mb-3 text-2xl font-bold">Free Launch Webinar</h3>

              <p className="mb-5 text-sm leading-relaxed text-[#6b6880]">
                Register for the free webinar to meet Robyn and Jess, ask
                questions and hear what is being built for AHAs.
              </p>

              <Link
                href="/subscribe"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Register for free webinar
                <ArrowRight size={15} />
              </Link>
            </article>

            <article className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <UserRoundCheck size={24} />
              </div>

              <h3 className="mb-3 text-2xl font-bold">
                1:1 Reflective Practice
              </h3>

              <p className="mb-5 text-sm leading-relaxed text-[#6b6880]">
                Complete the reflection form first. Booking and payment details
                are sent once your reflection has been reviewed.
              </p>

              <Link
                href="/reflective-practice"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Complete reflection form
                <ArrowRight size={15} />
              </Link>
            </article>

            <article className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <Users size={24} />
              </div>

              <h3 className="mb-3 text-2xl font-bold">Manager pathway</h3>

              <p className="mb-5 text-sm leading-relaxed text-[#6b6880]">
                For clinic owners and managers wanting AHA PD, team support,
                resources or custom options for their service.
              </p>

              <Link
                href="/manager-pathway"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Manager pathway
                <ArrowRight size={15} />
              </Link>
            </article>
          </div>
        </section>

        <section className="rounded-3xl bg-[#1e1b2e] p-8 text-white shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#99f6e4] text-[#1e1b2e]">
                <Heart size={24} />
              </div>

              <h2 className="mb-5 text-3xl font-bold md:text-5xl">
                Built for the people who help therapy happen.
              </h2>

              <p className="text-base leading-relaxed text-[#d9d7e5] md:text-lg">
                Allied Health Assistants are often the people carrying the
                practical day-to-day support that helps children practise, build
                confidence and keep going between clinical input. This is a
                place to steady each other, share what actually works and grow
                together.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
              <p className="mb-5 text-sm leading-relaxed text-[#d9d7e5]">
                Learn more about the clinics behind the community.
              </p>

              <div className="space-y-3">
                <a
                  href="https://www.playmoveimprove.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-[#1e1b2e] transition hover:bg-[#f5f3ff]"
                >
                  Visit Play Move Improve
                  <ArrowRight size={15} />
                </a>

                <a
                  href="https://spectrumvillage.com.au"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Visit Spectrum Village
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}