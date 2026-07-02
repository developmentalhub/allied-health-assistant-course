import Link from "next/link";

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>

          <p className="text-lg text-[#5f5b73]">
            Last updated {lastUpdated}
          </p>
        </header>

        <div className="mb-10 rounded-3xl border border-[#fcd34d] bg-[#fffbeb] p-6">
          <p className="text-base leading-relaxed text-[#92400e]">
            This is a draft privacy policy for the academy while the site is
            being rebuilt. It should be reviewed before paid enrolments,
            memberships, or large-scale data collection are activated.
          </p>
        </div>

        <div className="space-y-8 text-lg leading-relaxed text-[#4a4660]">
          <section className="rounded-3xl border border-[#e8e4de] bg-white p-7">
            <h2 className="mb-4 text-2xl font-bold text-[#1e1b2e]">
              1. Who we are
            </h2>
            <p>
              The Allied Health & Educator Resource Academy is operated by Play
              Move Improve Pty Ltd, a company based in Victoria, Australia. We
              are committed to protecting your privacy and handling personal
              information in accordance with applicable Australian privacy
              requirements.
            </p>
          </section>

          <section className="rounded-3xl border border-[#e8e4de] bg-white p-7">
            <h2 className="mb-4 text-2xl font-bold text-[#1e1b2e]">
              2. Information we collect
            </h2>
            <p className="mb-4">
              We may collect information you provide when you use the academy,
              including:
            </p>

            <ul className="space-y-3 pl-6">
              <li>Your name and email address</li>
              <li>Account login details</li>
              <li>Messages submitted through contact or waitlist forms</li>
              <li>Course, membership, community or access preferences</li>
              <li>Technical information about how the site is used</li>
              <li>
                Payment or subscription status when payment systems are
                connected
              </li>
            </ul>
          </section>

          <section className="rounded-3xl border border-[#e8e4de] bg-white p-7">
            <h2 className="mb-4 text-2xl font-bold text-[#1e1b2e]">
              3. How we use your information
            </h2>
            <p className="mb-4">
              We use personal information to operate and improve the academy,
              including to:
            </p>

            <ul className="space-y-3 pl-6">
              <li>Create and manage user accounts</li>
              <li>Provide access to courses, resources and community areas</li>
              <li>Respond to enquiries and support requests</li>
              <li>Send important account or access information</li>
              <li>Manage waitlist updates and launch communications</li>
              <li>Improve the website, learning experience and resources</li>
              <li>Meet legal, security and administrative requirements</li>
            </ul>
          </section>

          <section className="rounded-3xl border border-[#e8e4de] bg-white p-7">
            <h2 className="mb-4 text-2xl font-bold text-[#1e1b2e]">
              4. Payments and subscriptions
            </h2>
            <p>
              When payments or subscriptions are connected, payment details will
              be processed by a secure third-party payment provider. We do not
              intend to store full card details on our own servers.
            </p>
          </section>

          <section className="rounded-3xl border border-[#e8e4de] bg-white p-7">
            <h2 className="mb-4 text-2xl font-bold text-[#1e1b2e]">
              5. Sharing your information
            </h2>
            <p className="mb-4">
              We do not sell your personal information. We may share limited
              information with trusted service providers who help us operate the
              academy, such as:
            </p>

            <ul className="space-y-3 pl-6">
              <li>Website hosting and analytics providers</li>
              <li>Authentication and database providers</li>
              <li>Email delivery providers</li>
              <li>Payment processors, when payment systems are active</li>
              <li>Professional advisers where required</li>
              <li>Regulators or authorities where required by law</li>
            </ul>
          </section>

          <section className="rounded-3xl border border-[#e8e4de] bg-white p-7">
            <h2 className="mb-4 text-2xl font-bold text-[#1e1b2e]">
              6. Community areas
            </h2>
            <p>
              If you use academy community features, information you choose to
              post may be visible to other members of that community area. You
              are responsible for the information you choose to share in member
              spaces.
            </p>
          </section>

          <section className="rounded-3xl border border-[#e8e4de] bg-white p-7">
            <h2 className="mb-4 text-2xl font-bold text-[#1e1b2e]">
              7. Data storage and security
            </h2>
            <p>
              We take reasonable steps to protect personal information from
              misuse, interference, loss, unauthorised access, modification or
              disclosure. No online platform can guarantee absolute security,
              but we aim to use appropriate technical and organisational
              safeguards.
            </p>
          </section>

          <section className="rounded-3xl border border-[#e8e4de] bg-white p-7">
            <h2 className="mb-4 text-2xl font-bold text-[#1e1b2e]">
              8. Cookies and analytics
            </h2>
            <p>
              We may use cookies and similar technologies to keep users signed
              in, understand how the site is used, improve performance and
              support security. You can manage cookies through your browser
              settings, though some features may not work properly if cookies
              are disabled.
            </p>
          </section>

          <section className="rounded-3xl border border-[#e8e4de] bg-white p-7">
            <h2 className="mb-4 text-2xl font-bold text-[#1e1b2e]">
              9. Your rights
            </h2>
            <p className="mb-4">
              Depending on your circumstances, you may ask to:
            </p>

            <ul className="space-y-3 pl-6">
              <li>Access the personal information we hold about you</li>
              <li>Correct inaccurate or outdated information</li>
              <li>Delete your account or personal information where appropriate</li>
              <li>Opt out of marketing emails</li>
              <li>Ask questions about how your information is handled</li>
            </ul>
          </section>

          <section className="rounded-3xl border border-[#e8e4de] bg-white p-7">
            <h2 className="mb-4 text-2xl font-bold text-[#1e1b2e]">
              10. Changes to this policy
            </h2>
            <p>
              We may update this Privacy Policy as the academy develops. The
              latest version will be published on this page with an updated date.
            </p>
          </section>

          <section className="rounded-3xl border border-[#e8e4de] bg-white p-7">
            <h2 className="mb-4 text-2xl font-bold text-[#1e1b2e]">
              11. Contact us
            </h2>
            <p className="mb-4">
              For privacy questions, contact Play Move Improve at{" "}
              <a
                href="mailto:hello@playmoveimprove.com.au"
                className="font-semibold text-[#0f766e] hover:underline"
              >
                hello@playmoveimprove.com.au
              </a>
              .
            </p>

            <p>
              If you are not satisfied with our response, you may contact the
              Office of the Australian Information Commissioner.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}