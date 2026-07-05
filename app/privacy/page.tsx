import Link from "next/link";
import {
  ArrowRight,
  Database,
  Mail,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-5xl px-6 py-14 md:py-20">
        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
            Privacy
          </p>

          <h1 className="mb-5 text-4xl font-bold leading-tight md:text-6xl">
            Privacy and information collection.
          </h1>

          <p className="mb-6 max-w-3xl text-base leading-relaxed text-[#6b6880] md:text-lg">
            This page explains how information submitted through the AHA
            Professional Development website may be collected and used. This
            website is operated by Play Move Improve.
          </p>

          <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
            <div className="flex gap-3">
              <ShieldCheck
                size={22}
                className="mt-0.5 shrink-0 text-[#0f766e]"
              />

              <div>
                <p className="mb-1 text-sm font-semibold text-[#0f766e]">
                  Plain language summary
                </p>

                <p className="text-sm leading-relaxed text-[#3f5f5a]">
                  The site collects information you choose to submit, such as
                  your name, email, role, questions, reflection form answers or
                  manager pathway interest. This information is used to respond
                  to you, shape the AHA PD pathway and provide appropriate next
                  steps.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-6 md:grid-cols-3">
          <article className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <UserRoundCheck size={22} />
            </div>

            <h2 className="mb-3 text-xl font-bold">What is collected</h2>

            <p className="text-sm leading-relaxed text-[#6b6880]">
              Information you submit through forms, including your name, email,
              role, organisation, questions, reflection responses and areas of
              interest.
            </p>
          </article>

          <article className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <Database size={22} />
            </div>

            <h2 className="mb-3 text-xl font-bold">How it is stored</h2>

            <p className="text-sm leading-relaxed text-[#6b6880]">
              Form responses are stored securely using the website database and
              are only used for AHA Professional Development and Play Move
              Improve related communication.
            </p>
          </article>

          <article className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <Mail size={22} />
            </div>

            <h2 className="mb-3 text-xl font-bold">How to contact us</h2>

            <p className="text-sm leading-relaxed text-[#6b6880]">
              You can contact Play Move Improve at any time to ask about your
              submitted information or request that your details be removed.
            </p>
          </article>
        </section>

        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <h2 className="mb-5 text-3xl font-bold">
            Information you may choose to submit
          </h2>

          <div className="space-y-4 text-sm leading-relaxed text-[#6b6880]">
            <p>
              When you use this website, you may choose to submit information
              through forms such as the AHA PD interest form, reflective practice
              form, manager pathway form, community introduction form or contact
              links.
            </p>

            <p>
              This may include your name, email address, role, organisation,
              questions, areas of interest, professional context, reflection
              responses or information about the support you are looking for.
            </p>

            <p>
              You should avoid submitting identifying client details, sensitive
              client information, confidential workplace information or anything
              you do not have permission to share.
            </p>
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-8 shadow-sm md:p-10">
          <h2 className="mb-5 text-3xl font-bold">
            How submitted information may be used
          </h2>

          <div className="space-y-4 text-sm leading-relaxed text-[#3f5f5a]">
            <p>
              Information submitted through this website may be used to respond
              to your enquiry, understand what AHA Professional Development
              topics are needed, review whether a reflective practice session is
              appropriate, shape future team or manager options, and send
              relevant follow-up information.
            </p>

            <p>
              Your information may also help Play Move Improve understand common
              questions, support needs and content priorities. Any public-facing
              content created from these insights should be generalised and not
              identify you personally.
            </p>

            <p>
              Your information is not intended to be sold to third parties.
            </p>
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <h2 className="mb-5 text-3xl font-bold">
            Reflective practice form boundary
          </h2>

          <div className="space-y-4 text-sm leading-relaxed text-[#6b6880]">
            <p>
              Reflective practice form responses are used to understand the
              context, role, goal and suitability of a possible 1:1 reflective
              practice session.
            </p>

            <p>
              Reflective practice is professional development support. It does
              not replace workplace supervision, clinical supervision,
              delegation, direction, clinical oversight, legal advice, medical
              advice or workplace governance.
            </p>

            <p>
              Please do not include names or identifying information about
              clients, children, families, staff members or workplaces unless you
              have explicit permission and it is necessary for your enquiry.
            </p>
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <h2 className="mb-5 text-3xl font-bold">Third-party services</h2>

          <div className="space-y-4 text-sm leading-relaxed text-[#6b6880]">
            <p>
              This website may use third-party services to operate forms,
              databases, hosting, email, payment links, video embeds or website
              functionality. These services may process information as part of
              providing the website and related services.
            </p>

            <p>
              Examples may include website hosting, database storage, video
              hosting, payment processing or email communication tools.
            </p>
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-8 shadow-sm md:p-10">
          <h2 className="mb-5 text-3xl font-bold">
            Requesting access or removal
          </h2>

          <p className="mb-6 text-sm leading-relaxed text-[#3f5f5a]">
            You can contact Play Move Improve to ask about information you have
            submitted or request that your details be removed from the AHA
            Professional Development interest records where reasonably possible.
          </p>

          <a
            href="mailto:playmoveimprove@gmail.com?subject=AHA Professional Development privacy request"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
          >
            Email privacy request
            <ArrowRight size={15} />
          </a>
        </section>

        <section className="rounded-3xl bg-[#1e1b2e] p-8 text-white shadow-sm md:p-10">
          <h2 className="mb-4 text-3xl font-bold">Questions?</h2>

          <p className="mb-6 max-w-3xl text-sm leading-relaxed text-[#d9d7e5]">
            For questions about this privacy page, the AHA Professional
            Development website or information you have submitted, contact Play
            Move Improve directly.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:playmoveimprove@gmail.com?subject=AHA Professional Development enquiry"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1e1b2e] transition hover:bg-[#f5f3ff]"
            >
              Email Play Move Improve
              <ArrowRight size={15} />
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Contact page
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}