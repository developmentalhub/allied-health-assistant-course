import Link from "next/link";

export default function TermsPage() {
  const lastUpdated = "22 May 2026";

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-4xl px-6 py-14 md:py-20">
        <div className="mb-10">
          <Link
            href="/"
            className="text-base font-semibold text-[#0f766e] hover:underline"
          >
            Back to academy
          </Link>
        </div>

        <header className="mb-12">
          <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Legal
          </p>

          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-6xl">
            Terms and Conditions
          </h1>

          <p className="text-lg text-[#5f5b73]">
            Last updated {lastUpdated}
          </p>
        </header>

        <div className="mb-10 rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-4 text-2xl font-bold">
            Draft notice
          </h2>

          <p className="text-lg leading-relaxed text-[#5f5b73]">
            These terms are a working draft for the Allied Health & Educator Resource Academy. They should be reviewed before paid enrolments, memberships, or community access are launched.
          </p>
        </div>

        <div className="space-y-10 text-lg leading-relaxed text-[#4a4660]">
          <section className="rounded-3xl border border-[#e8e4de] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[#1e1b2e]">
              1. About us
            </h2>

            <p>
              The Allied Health & Educator Resource Academy is operated by Play Move Improve Pty Ltd (ABN: 17 415 190 263), a company registered in Victoria, Australia. References to “we”, “us”, or “our” in these terms refer to Play Move Improve Pty Ltd. References to “you” refer to any person who accesses or uses the academy platform.
            </p>
          </section>

          <section className="rounded-3xl border border-[#e8e4de] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[#1e1b2e]">
              2. Acceptance of terms
            </h2>

            <p>
              By creating an account, accessing course material, joining a membership area, or using the platform, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, please do not use the platform.
            </p>
          </section>

          <section className="rounded-3xl border border-[#e8e4de] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[#1e1b2e]">
              3. The platform
            </h2>

            <p className="mb-4">
              The academy platform may include online courses, topic pages, embedded tools, downloadable resources, live sessions, saved recordings, membership areas, and community features.
            </p>

            <p>
              Platform content is provided for education, training, professional learning, and general information. It does not replace individual supervision, workplace policies, professional judgement, or advice from an appropriately qualified professional.
            </p>
          </section>

          <section className="rounded-3xl border border-[#e8e4de] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[#1e1b2e]">
              4. Course and membership access
            </h2>

            <p className="mb-4">
              Access to some parts of the academy may require payment, enrolment approval, a valid subscription, or a specific access level.
            </p>

            <p>
              We may update, add, remove, or change platform content over time as the academy develops.
            </p>
          </section>

          <section className="rounded-3xl border border-[#e8e4de] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[#1e1b2e]">
              5. Payments
            </h2>

            <p className="mb-4">
              Payments may be processed through Stripe or another secure payment provider. We do not store your card details on our servers.
            </p>

            <p>
              Specific prices, inclusions, billing periods, cancellation terms, and refund terms will be shown at the time of purchase.
            </p>
          </section>

          <section className="rounded-3xl border border-[#e8e4de] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[#1e1b2e]">
              6. Community conduct
            </h2>

            <p className="mb-4">
              If you access a community or membership area, you agree to participate respectfully and professionally.
            </p>

            <p className="mb-4">
              You agree not to harass, abuse, threaten, shame, or disclose private information about other members, children, families, workplaces, or professionals.
            </p>

            <p>
              We may remove posts, restrict access, or cancel membership access if community conduct expectations are not followed.
            </p>
          </section>

          <section className="rounded-3xl border border-[#e8e4de] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[#1e1b2e]">
              7. User responsibilities
            </h2>

            <p className="mb-4">
              You agree not to:
            </p>

            <ul className="list-disc space-y-3 pl-6">
              <li>Share your login details with another person</li>
              <li>Copy, reproduce, or distribute academy content without permission</li>
              <li>Use the platform for unlawful, unsafe, or misleading purposes</li>
              <li>Represent academy content as individual clinical advice</li>
              <li>Upload content that breaches another person’s privacy or rights</li>
              <li>Provide false or misleading information when creating an account</li>
            </ul>
          </section>

          <section className="rounded-3xl border border-[#e8e4de] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[#1e1b2e]">
              8. Intellectual property
            </h2>

            <p>
              All academy content, including course materials, videos, worksheets, tools, text, graphics, downloads, platform structure, and related resources, is owned by Play Move Improve Pty Ltd or licensed to us. You may not reproduce, distribute, adapt, sell, or use our content for commercial purposes without our prior written consent.
            </p>
          </section>

          <section className="rounded-3xl border border-[#e8e4de] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[#1e1b2e]">
              9. External links and embedded tools
            </h2>

            <p>
              The platform may link to or embed external tools, videos, forms, communities, file storage, or third-party services. We are not responsible for the availability, security, or content of third-party platforms.
            </p>
          </section>

          <section className="rounded-3xl border border-[#e8e4de] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[#1e1b2e]">
              10. Limitation of liability
            </h2>

            <p className="mb-4">
              To the maximum extent permitted by law, Play Move Improve Pty Ltd is not liable for indirect, incidental, or consequential loss arising from your use of the platform.
            </p>

            <p>
              Nothing in these terms limits any rights you may have under Australian Consumer Law or other laws that cannot be excluded.
            </p>
          </section>

          <section className="rounded-3xl border border-[#e8e4de] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[#1e1b2e]">
              11. Changes to these terms
            </h2>

            <p>
              We may update these terms from time to time. If changes are material, we may notify users by email or by posting a notice on the platform.
            </p>
          </section>

          <section className="rounded-3xl border border-[#e8e4de] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[#1e1b2e]">
              12. Governing law
            </h2>

            <p>
              These terms are governed by the laws of Victoria, Australia. Any disputes will be subject to the jurisdiction of the courts of Victoria.
            </p>
          </section>

          <section className="rounded-3xl border border-[#e8e4de] bg-white p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[#1e1b2e]">
              13. Contact us
            </h2>

            <p>
              If you have any questions about these terms, please contact us at{" "}
              <a
                href="mailto:robyn@playmoveimprove.com.au"
                className="font-semibold text-[#0f766e] hover:underline"
              >
                robyn@playmoveimprove.com.au
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}