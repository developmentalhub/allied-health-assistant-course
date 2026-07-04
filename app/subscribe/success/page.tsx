import Link from "next/link";
import { ArrowRight, Check, MessageCircle, Star, Users } from "lucide-react";

export default function SubscribeSuccessPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-14 text-[#1e1b2e] md:py-20">
      <section className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-8 text-center shadow-sm md:p-12">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#0f766e] text-white">
            <Check size={30} />
          </div>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
            You&apos;re on the list
          </p>

          <h1 className="mx-auto mb-6 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            You&apos;ll be first to hear when founding member access opens.
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-[#3f5f5a]">
            Thank you for joining the waitlist for the paid AHA members space.
            I&apos;ll let you know when the founding rate opens, what&apos;s
            included, and how to lock in the early member price.
          </p>

          <div className="mx-auto mb-8 grid max-w-3xl gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-[#99f6e4] bg-white p-5 text-left">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <Star size={22} />
              </div>

              <h2 className="mb-2 text-xl font-bold">Founding rate</h2>

              <p className="text-sm leading-relaxed text-[#6b6880]">
                Early members will be able to join for $19/month AUD, or
                $190/year AUD, before the price rises to $29/month.
              </p>
            </div>

            <div className="rounded-3xl border border-[#99f6e4] bg-white p-5 text-left">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <Users size={22} />
              </div>

              <h2 className="mb-2 text-xl font-bold">What&apos;s coming</h2>

              <p className="text-sm leading-relaxed text-[#6b6880]">
                Monthly live coaching, recorded sessions, AHA resources,
                Thriving Kids updates, a private members feed and priority
                question support.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/join"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
            >
              Join the free community now
              <MessageCircle size={16} />
            </Link>

            <Link
              href="/subscribe"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#99f6e4] bg-white px-6 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#f0fdfa]"
            >
              Back to paid space details
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
            Honest note
          </p>

          <p className="text-sm leading-relaxed text-[#6b6880]">
            This paid members space will provide professional development,
            coaching, practical resources and community support. It is not an
            official certification pathway, and joining does not guarantee
            employment, contract work or referrals.
          </p>
        </div>
      </section>
    </main>
  );
}