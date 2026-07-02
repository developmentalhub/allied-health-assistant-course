import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-14 text-[#1e1b2e] md:py-20">
      <section className="mx-auto max-w-4xl">
        <div className="mb-10">
          <Link
            href="/"
            className="text-base font-semibold text-[#0f766e] hover:underline"
          >
            Back to academy
          </Link>
        </div>

        <header className="mb-10">
          <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Terms of use
          </p>

          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
            Allied Health & Educator Resource Academy terms
          </h1>

          <p className="text-xl leading-relaxed text-[#5f5b73]">
            These draft terms explain how the academy platform, learning
            resources, community spaces and future membership access are
            intended to be used.
          </p>
        </header>

        <div className="space-y-6 rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-10">
          <TermsSection title="1. About us">
            <p>
              The Allied Health & Educator Resource Academy is created by Play
              Move Improve Pty Ltd in Victoria, Australia.
            </p>
          </TermsSection>

          <TermsSection title="2. Acceptance of these terms">
            <p>
              By using this website, joining the waitlist, creating an account,
              accessing learning resources, or participating in academy spaces,
              you agree to use the platform respectfully and only for lawful
              purposes.
            </p>
          </TermsSection>

          <TermsSection title="3. Platform purpose">
            <p>
              The academy provides professional learning, practical resources,
              implementation tools, reflection prompts, community support and
              pathway-based training for allied health assistants, educators and
              related professionals.
            </p>
          </TermsSection>

          <TermsSection title="4. Course and membership access">
            <p>
              Some academy content may be free, some may require account access,
              and some may require a paid course, membership, licence or future
              subscription. Access rules may change as the academy is developed.
            </p>
          </TermsSection>

          <TermsSection title="5. Payments and access">
            <p>
              Payment access is not fully active yet. When payments are
              connected, any paid access terms, refund conditions, cancellation
              rules and licence details will be clearly shown before purchase.
            </p>
          </TermsSection>

          <TermsSection title="6. Professional responsibility">
            <p>
              Academy resources are educational in nature. They do not replace
              individual professional judgement, supervision, clinical
              reasoning, workplace policy, legal duties, safeguarding
              obligations, or advice from a qualified professional who knows the
              specific situation.
            </p>
          </TermsSection>

          <TermsSection title="7. Community conduct">
            <p>
              You agree not to harass, abuse, threaten, shame, or disclose
              private information about other members, learners, workplaces, or
              professionals. Community spaces must be used respectfully and with
              care.
            </p>
          </TermsSection>

          <TermsSection title="8. Privacy and confidentiality">
            <p>
              You must not upload, share or discuss identifying personal
              information unless you have the right consent and a lawful reason
              to do so. De-identified examples should be used wherever possible.
            </p>
          </TermsSection>

          <TermsSection title="9. Intellectual property">
            <p>
              All academy content, including videos, worksheets, written
              resources, graphics, activities, frameworks and downloadable
              materials, remains the intellectual property of Play Move Improve
              Pty Ltd unless otherwise stated.
            </p>

            <p>
              You may use resources for your own learning and approved
              implementation setting. You may not resell, redistribute, upload,
              copy, rebrand, or train others using academy materials unless
              written permission or a licence specifically allows it.
            </p>
          </TermsSection>

          <TermsSection title="10. External tools and links">
            <p>
              The academy may link to external platforms, embedded tools,
              payment providers, email services, video platforms, forms or
              community spaces. Those services may have their own terms and
              privacy policies.
            </p>
          </TermsSection>

          <TermsSection title="11. Availability and changes">
            <p>
              The academy is being built and improved over time. Pages,
              resources, prices, access rules, tools, pathways and features may
              change as the platform develops.
            </p>
          </TermsSection>

          <TermsSection title="12. Limitation of liability">
            <p>
              To the extent allowed by law, Play Move Improve Pty Ltd is not
              liable for loss, damage, injury, interruption, misuse of resources,
              or decisions made from general educational content without
              appropriate professional judgement and supervision.
            </p>
          </TermsSection>

          <TermsSection title="13. Governing law">
            <p>
              These terms are governed by the laws of Victoria, Australia.
            </p>
          </TermsSection>

          <TermsSection title="14. Contact">
            <p>
              For questions about these terms, academy access or use of
              resources, please contact Play Move Improve through the contact
              page.
            </p>

            <Link
              href="/contact"
              className="inline-flex rounded-full bg-[#0f766e] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#0d6962]"
            >
              Contact Play Move Improve
            </Link>
          </TermsSection>
        </div>
      </section>
    </main>
  );
}

function TermsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-[#f0ede8] pb-6 last:border-b-0 last:pb-0">
      <h2 className="mb-3 text-2xl font-bold text-[#1e1b2e]">{title}</h2>

      <div className="space-y-4 text-lg leading-relaxed text-[#5f5b73]">
        {children}
      </div>
    </section>
  );
}