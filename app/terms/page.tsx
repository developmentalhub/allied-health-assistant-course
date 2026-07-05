import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  FileText,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-5xl px-6 py-14 md:py-20">
        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
            Terms and professional disclaimer
          </p>

          <h1 className="mb-5 text-4xl font-bold leading-tight md:text-6xl">
            Terms of use for AHA Professional Development.
          </h1>

          <p className="mb-6 max-w-3xl text-base leading-relaxed text-[#6b6880] md:text-lg">
            This page outlines the professional boundaries, responsibilities and
            terms for using the AHA Professional Development website, foundation
            topic pages, reflection forms, resources and related learning
            pathways.
          </p>

          <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
            <div className="flex gap-3">
              <ShieldCheck
                size={22}
                className="mt-0.5 shrink-0 text-[#0f766e]"
              />

              <div>
                <p className="mb-1 text-sm font-semibold text-[#0f766e]">
                  Core professional boundary
                </p>

                <p className="text-sm leading-relaxed text-[#3f5f5a]">
                  AHA Professional Development provides foundation reflective
                  professional development and reflective practice support. It
                  does not replace workplace supervision, clinical supervision,
                  delegation, direction, clinical oversight, clinical governance,
                  legal advice, medical advice, employment advice or
                  organisation-specific policies and procedures.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-6 md:grid-cols-3">
          <article className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <BookOpen size={22} />
            </div>

            <h2 className="mb-3 text-xl font-bold">Foundation PD only</h2>

            <p className="text-sm leading-relaxed text-[#6b6880]">
              The topic pages and resources support learning, reflection and
              role clarity. They are not clinical training or a substitute for
              supervision.
            </p>
          </article>

          <article className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <UserRoundCheck size={22} />
            </div>

            <h2 className="mb-3 text-xl font-bold">Reflective practice</h2>

            <p className="text-sm leading-relaxed text-[#6b6880]">
              Reflective practice sessions are professional development support.
              They do not replace the supervisor, employer or treating
              professional.
            </p>
          </article>

          <article className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <ClipboardList size={22} />
            </div>

            <h2 className="mb-3 text-xl font-bold">User responsibility</h2>

            <p className="text-sm leading-relaxed text-[#6b6880]">
              Users remain responsible for following their workplace policies,
              role description, supervision requirements and professional
              boundaries.
            </p>
          </article>
        </section>

        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <h2 className="mb-5 text-3xl font-bold">
            Professional development, not supervision
          </h2>

          <div className="space-y-4 text-sm leading-relaxed text-[#6b6880]">
            <p>
              AHA Professional Development is designed to support foundation
              professional learning, reflection, role clarity, communication,
              preparation and confidence for Allied Health Assistants, therapy
              assistants, students, educators, managers and related support
              roles.
            </p>

            <p>
              The information, videos, prompts, forms and resources on this site
              are general in nature. They do not provide individual clinical
              advice, client-specific therapy recommendations, diagnosis,
              treatment planning, legal advice, funding advice or employment
              advice.
            </p>

            <p>
              Allied Health Assistants and therapy assistants must continue to
              work within the direction, delegation, supervision, scope and
              governance requirements of their workplace, employer and
              supervising allied health professional.
            </p>
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-8 shadow-sm md:p-10">
          <h2 className="mb-5 text-3xl font-bold">
            Reflective practice session terms
          </h2>

          <div className="space-y-4 text-sm leading-relaxed text-[#3f5f5a]">
            <p>
              A 1:1 reflective practice session may help a person think through
              role clarity, communication, preparation, confidence, professional
              reflection or questions they may need to take back to their
              workplace or supervising professional.
            </p>

            <p>
              Reflective practice sessions do not provide clinical supervision,
              clinical decision-making, case management, therapy planning,
              diagnosis, medical advice, legal advice or workplace governance.
            </p>

            <p>
              Submission of a reflection form does not guarantee that a session
              will be offered. A reflection may be reviewed first to consider
              whether a reflective practice session appears appropriate and
              within the professional boundaries of this service.
            </p>

            <p>
              Booking and payment details may be sent only after the submitted
              reflection has been reviewed.
            </p>
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <h2 className="mb-5 text-3xl font-bold">
            Use of resources and topic pages
          </h2>

          <div className="space-y-4 text-sm leading-relaxed text-[#6b6880]">
            <p>
              Topic pages, reflection prompts, printable resources, examples and
              tools are provided for personal professional learning and
              reflection unless otherwise stated.
            </p>

            <p>
              Resources must not be copied, redistributed, resold, uploaded to
              other platforms, used as part of another paid product or presented
              as your own work without written permission from Play Move
              Improve.
            </p>

            <p>
              Any examples provided on the site are general examples only. They
              should be adapted carefully to your own workplace expectations and
              should not override instructions from your employer or supervising
              professional.
            </p>
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <h2 className="mb-5 text-3xl font-bold">
            No client-specific information
          </h2>

          <div className="space-y-4 text-sm leading-relaxed text-[#6b6880]">
            <p>
              Users should avoid submitting identifying client, child, family,
              staff or workplace details through website forms unless they have
              permission and it is genuinely necessary.
            </p>

            <p>
              Reflection forms should be written in a way that protects privacy.
              Focus on your role, question, communication, preparation or
              professional reflection rather than identifying another person.
            </p>

            <p>
              If a situation involves immediate risk, safety concerns, mandatory
              reporting obligations, clinical deterioration or urgent workplace
              matters, users should follow their organisation&apos;s policies and
              contact the appropriate supervisor, employer, professional or
              emergency service.
            </p>
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-8 shadow-sm md:p-10">
          <h2 className="mb-5 text-3xl font-bold">
            Play Move Improve specialist content
          </h2>

          <div className="space-y-4 text-sm leading-relaxed text-[#3f5f5a]">
            <p>
              AHA Professional Development is a foundation reflective PD
              pathway. Deeper specialist training relating to developmental
              movement, play-based intervention, regulation, child development,
              screen dependency, reflexes, sensory support and Play Move Improve
              frameworks remains separate within Play Move Improve.
            </p>

            <p>
              This distinction protects the AHA platform from becoming a full
              specialist intervention training pathway and helps users understand
              the difference between foundation reflection and deeper specialist
              learning.
            </p>
          </div>

          <a
            href="https://www.playmoveimprove.com"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
          >
            Visit Play Move Improve
            <ArrowRight size={15} />
          </a>
        </section>

        <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <h2 className="mb-5 text-3xl font-bold">
            Accuracy and changes to content
          </h2>

          <div className="space-y-4 text-sm leading-relaxed text-[#6b6880]">
            <p>
              The website may be updated, changed, expanded or corrected over
              time. Topic pages may begin as previews or placeholders before
              videos, PDFs, tools or payment pathways are fully available.
            </p>

            <p>
              While care is taken to provide useful and professional content,
              users should not rely on this website as their only source of
              guidance. Users should check relevant workplace, professional,
              government, funding or legal sources where required.
            </p>
          </div>
        </section>

        <section className="rounded-3xl bg-[#1e1b2e] p-8 text-white shadow-sm md:p-10">
          <div className="flex gap-3">
            <FileText
              size={22}
              className="mt-0.5 shrink-0 text-[#99f6e4]"
            />

            <div>
              <h2 className="mb-4 text-3xl font-bold">Questions?</h2>

              <p className="mb-6 max-w-3xl text-sm leading-relaxed text-[#d9d7e5]">
                For questions about these terms, AHA Professional Development,
                reflective practice or Play Move Improve pathways, contact Play
                Move Improve directly.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:playmoveimprove@gmail.com?subject=AHA Professional Development terms enquiry"
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
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}