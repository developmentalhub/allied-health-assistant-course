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
    "Get in touch with Play Move Improve about the Allied Health & Educator Resource Academy, course access, waitlist updates, or future training pathways.",
};

// Headshots live in the Supabase "website-images" bucket.
// Filenames must match EXACTLY, including capitalisation.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const jessPhoto = `${SUPABASE_URL}/storage/v1/object/public/website-images/headshots/Jess%20Spectrum%20Village%20headshot.jpg`;
const robynPhoto = `${SUPABASE_URL}/storage/v1/object/public/website-images/headshots/Robyn%20Play%20Move%20Improve%20headshot.jpg`;

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        {/* HERO */}
        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
                Contact
              </p>

              <h1 className="mb-5 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
                Two Developmental Educators, joining forces for Allied Health
                Assistants.
              </h1>

              <p className="mb-6 max-w-2xl text-base leading-relaxed text-[#6b6880] md:text-lg">
                Jess from Spectrum Village and Robyn from Play Move Improve are
                building this community together — because the work we do simply
                isn&apos;t possible without skilled, confident AHAs beside us.
                Have a question, or want to get involved? Start below.
              </p>
            </div>

            <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <Mail size={24} />
              </div>

              <h2 className="mb-3 text-2xl font-bold">Email Robyn</h2>

              <p className="mb-5 text-sm leading-relaxed text-[#3f5f5a]">
                For questions about the community, foundation AHA PD, webinars,
                1:1 reflective practice or team options, email Robyn directly.
              </p>

              <a
                href="mailto:robyn@playmoveimprove.com.au?subject=AHA community enquiry"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-4 text-center text-base font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Email robyn@playmoveimprove.com.au
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* MEET JESS & ROBYN */}
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
              in allied health, we couldn&apos;t do our jobs without Allied
              Health Assistants. AHAs are the ones who turn a therapy plan into
              real progress, week after week. This community is our way of
              investing back in the people who make it all happen.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Jess */}
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
                strengths-based approach — and, like Robyn, she knows first-hand
                how much of that support is carried by skilled therapy
                assistants working alongside the clinical team.
              </p>
            </article>

            {/* Robyn */}
            <article className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
              <div className="mb-5 flex items-center gap-4">
                <img
                  src={robynPhoto}
                  alt="Robyn, Developmental Educator and founder of Play Move Improve"
                  className="h-20 w-20 rounded-full border border-[#e8e4de] object-cover"
                />

                <div>
                  <h3 className="text-xl font-bold">Robyn</h3>
                  <p className="text-sm text-[#0f766e]">
                    Developmental Educator, Play Move Improve
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-[#6b6880]">
                Robyn is a Developmental Educator and the founder of Play Move
                Improve, supporting children&apos;s movement, regulation and
                development. She started this community to give AHAs the
                practical, honest professional development she wished existed
                when she was building her own team.
              </p>
            </article>
          </div>
        </section>

        {/* CHOOSE YOUR PATHWAY */}
        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Choose your pathway
            </p>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              The fastest way to the right place.
            </h2>

            <p className="text-base leading-relaxed text-[#6b6880]">
              Different people need different starting points — join the free
              community, register interest in AHA PD, book a 1:1, or enquire
              about team support.
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
                and connect with other AHAs.
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

              <h3 className="mb-3 text-2xl font-bold">AHA PD Options</h3>

              <p className="mb-5 text-sm leading-relaxed text-[#6b6880]">
                Register interest in individual foundation topics, webinars, or
                future learning options.
              </p>

              <Link
                href="/subscribe"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                View PD options
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
                For clinic owners and managers wanting AHA PD or team support
                for their service.
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

        {/* WHY WE BUILT THIS */}
        <section className="rounded-3xl bg-[#1e1b2e] p-8 text-white shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#99f6e4] text-[#1e1b2e]">
                <Heart size={24} />
              </div>

              <h2 className="mb-5 text-3xl font-bold md:text-5xl">
                Built for the people who make therapy happen.
              </h2>

              <p className="text-base leading-relaxed text-[#d9d7e5] md:text-lg">
                Allied Health Assistants are already at capacity, and with
                Thriving Kids reshaping the work, the pressure is only growing.
                This is a place to steady each other, share what actually works,
                and grow — together.
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