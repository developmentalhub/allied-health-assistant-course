import Link from "next/link";

export default function PrivacyPage() {
  const lastUpdated = "22 May 2026";

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5", fontFamily: "DM Sans, sans-serif", color: "#1e1b2e" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "64px 24px 100px" }}>

        <Link href="/" style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "40px" }}>
          ← Back to home
        </Link>

        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b6880", marginBottom: "12px" }}>
          Legal
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "40px", fontWeight: 300, color: "#1e1b2e", margin: "0 0 8px" }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: "14px", color: "#6b6880", margin: "0 0 48px" }}>
          Last updated {lastUpdated}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "40px", fontSize: "15px", lineHeight: 1.8, color: "#4a4660" }}>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 16px" }}>1. Who we are</h2>
            <p style={{ margin: 0 }}>
              Developmental Hub is operated by Play Move Improve Pty Ltd, a company registered in Victoria, Australia. We are committed to protecting your privacy and handling your personal information in accordance with the Australian Privacy Act 1988 and the Australian Privacy Principles.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 16px" }}>2. Information we collect</h2>
            <p style={{ margin: "0 0 12px" }}>We collect the following types of information:</p>
            <ul style={{ margin: "0 0 12px", paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li><strong>Account information</strong> — your name, email address, and password when you create an account</li>
              <li><strong>Child information</strong> — your child's name and date of birth if you choose to add a child profile</li>
              <li><strong>Payment information</strong> — processed securely through Stripe; we do not store your card details</li>
              <li><strong>Booking information</strong> — sessions you have booked and their status</li>
              <li><strong>Facilitator information</strong> — for approved facilitators, compliance documents including WWC check details, insurance, and professional registration</li>
              <li><strong>Usage information</strong> — how you use the platform, including pages visited and sessions attended</li>
            </ul>
            <p style={{ margin: 0 }}>
              We only collect information that is necessary to provide our services to you.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 16px" }}>3. How we use your information</h2>
            <p style={{ margin: "0 0 12px" }}>We use your information to:</p>
            <ul style={{ margin: 0, paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>Create and manage your account</li>
              <li>Process bookings and payments</li>
              <li>Send booking confirmations, session reminders, and important account notices</li>
              <li>Connect families with appropriate sessions based on their child's age and needs</li>
              <li>Verify facilitator credentials and compliance</li>
              <li>Improve the platform and our services</li>
              <li>Comply with our legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 16px" }}>4. Information about children</h2>
            <p style={{ margin: 0 }}>
              We take the privacy of children seriously. Child profile information (name and date of birth) is used only to personalise your family's experience on the platform and to help facilitators tailor their sessions. We do not share child information with third parties except as required to deliver our services. We do not knowingly collect information directly from children under the age of 18.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 16px" }}>5. Sharing your information</h2>
            <p style={{ margin: "0 0 12px" }}>We do not sell your personal information. We may share your information with:</p>
            <ul style={{ margin: 0, paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li><strong>Stripe</strong> — to process payments securely</li>
              <li><strong>Supabase</strong> — to store your account and booking data securely</li>
              <li><strong>Daily.co</strong> — to deliver live video sessions</li>
              <li><strong>Resend</strong> — to send transactional emails</li>
              <li><strong>Facilitators</strong> — limited booking information so they can deliver sessions effectively</li>
              <li><strong>Law enforcement or regulators</strong> — where required by law</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 16px" }}>6. Data storage and security</h2>
            <p style={{ margin: 0 }}>
              Your data is stored securely using Supabase, which uses industry-standard encryption. We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, loss, or disclosure. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 16px" }}>7. Your rights</h2>
            <p style={{ margin: "0 0 12px" }}>Under Australian privacy law, you have the right to:</p>
            <ul style={{ margin: 0, paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your account and personal information</li>
              <li>Opt out of marketing communications at any time</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 16px" }}>8. Cookies</h2>
            <p style={{ margin: 0 }}>
              We use cookies and similar technologies to keep you logged in and to understand how the platform is used. You can control cookies through your browser settings, but disabling cookies may affect your ability to use the platform.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 16px" }}>9. Changes to this policy</h2>
            <p style={{ margin: 0 }}>
              We may update this Privacy Policy from time to time. We will notify you of significant changes by email or by posting a notice on the platform. Your continued use of the platform after any changes constitutes your acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 16px" }}>10. Contact us</h2>
            <p style={{ margin: "0 0 12px" }}>
              If you have any questions about this Privacy Policy or wish to exercise your privacy rights, please contact us at{" "}
              <a href="mailto:hello@playmoveimprove.com.au" style={{ color: "#3730a3", textDecoration: "none" }}>
                hello@playmoveimprove.com.au
              </a>
            </p>
            <p style={{ margin: 0 }}>
              If you are not satisfied with our response, you may lodge a complaint with the Office of the Australian Information Commissioner at{" "}
              <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" style={{ color: "#3730a3", textDecoration: "none" }}>
                oaic.gov.au
              </a>
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}