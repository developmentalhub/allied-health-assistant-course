import Link from "next/link";

export default function TermsPage() {
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
          Terms and Conditions
        </h1>
        <p style={{ fontSize: "14px", color: "#6b6880", margin: "0 0 48px" }}>
          Last updated {lastUpdated}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "40px", fontSize: "15px", lineHeight: 1.8, color: "#4a4660" }}>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 16px" }}>1. About us</h2>
            <p style={{ margin: 0 }}>
              Developmental Hub is operated by Play Move Improve Pty Ltd (ABN: 17 415 190 263), a company registered in Victoria, Australia. References to "we", "us", or "our" in these terms refer to Play Move Improve Pty Ltd. References to "you" refer to any person who accesses or uses the Developmental Hub platform at developmental-hub.vercel.app.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 16px" }}>2. Acceptance of terms</h2>
            <p style={{ margin: 0 }}>
              By creating an account or using our platform, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, please do not use the platform. We may update these terms from time to time and will notify you of material changes by email or by posting a notice on the platform.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 16px" }}>3. The platform and services</h2>
            <p style={{ margin: "0 0 12px" }}>
              Developmental Hub is an online platform that connects families with qualified practitioners for live group sessions and webinars focused on childhood development. We facilitate the booking and payment process but are not ourselves a health or therapeutic service provider.
            </p>
            <p style={{ margin: 0 }}>
              Sessions on the platform are educational and informational in nature. They do not constitute medical advice, diagnosis, or treatment. If you have concerns about your child's health or development, please consult a registered health professional.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 16px" }}>4. Bookings and payments</h2>
            <p style={{ margin: "0 0 12px" }}>
              When you book a session, your payment card is authorised but not charged immediately. Payment is only captured if the session reaches its minimum number of participating families, which is assessed 24 hours before the session start time.
            </p>
            <p style={{ margin: "0 0 12px" }}>
              If a session does not reach the minimum number of families, it will be cancelled and your authorisation will be released. You will not be charged.
            </p>
            <p style={{ margin: 0 }}>
              All payments are processed securely through Stripe. We do not store your card details on our servers.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 16px" }}>5. Cancellations and refunds</h2>
            <p style={{ margin: "0 0 12px" }}>
              If a session is cancelled by us due to insufficient bookings, you will receive a full automatic refund within 5–10 business days.
            </p>
            <p style={{ margin: "0 0 12px" }}>
              If you wish to cancel your booking, please contact us at least 48 hours before the session start time. Cancellations made within 48 hours of the session start time are not eligible for a refund unless the session is also cancelled by us.
            </p>
            <p style={{ margin: 0 }}>
              We reserve the right to cancel or reschedule sessions due to facilitator unavailability, technical issues, or other circumstances beyond our control. In such cases, a full refund will be issued.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 16px" }}>6. Facilitators</h2>
            <p style={{ margin: "0 0 12px" }}>
              All facilitators on Developmental Hub are independent contractors, not employees of Play Move Improve Pty Ltd. Each facilitator is required to hold a current Working With Children Check, professional indemnity insurance, and relevant professional registration before being approved to facilitate sessions.
            </p>
            <p style={{ margin: 0 }}>
              While we screen and approve all facilitators, we do not guarantee the accuracy or completeness of information they provide. We are not liable for the content of sessions delivered by independent facilitators.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 16px" }}>7. User conduct</h2>
            <p style={{ margin: "0 0 12px" }}>You agree not to:</p>
            <ul style={{ margin: "0", paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>Share session links or access with people who have not booked</li>
              <li>Record sessions without the express consent of the facilitator and all participants</li>
              <li>Use the platform for any unlawful purpose</li>
              <li>Harass, abuse, or threaten other users or facilitators</li>
              <li>Provide false or misleading information when creating your account</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 16px" }}>8. Intellectual property</h2>
            <p style={{ margin: 0 }}>
              All content on the Developmental Hub platform, including session materials, text, graphics, and the platform itself, is owned by Play Move Improve Pty Ltd or licensed to us. You may not reproduce, distribute, or use our content for commercial purposes without our prior written consent.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 16px" }}>9. Limitation of liability</h2>
            <p style={{ margin: "0 0 12px" }}>
              To the maximum extent permitted by law, Play Move Improve Pty Ltd is not liable for any indirect, incidental, or consequential loss or damage arising from your use of the platform or attendance at sessions.
            </p>
            <p style={{ margin: 0 }}>
              Our total liability to you for any claim arising out of your use of the platform is limited to the amount you paid for the session giving rise to the claim.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 16px" }}>10. Governing law</h2>
            <p style={{ margin: 0 }}>
              These terms are governed by the laws of Victoria, Australia. Any disputes will be subject to the exclusive jurisdiction of the courts of Victoria.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, color: "#1e1b2e", margin: "0 0 16px" }}>11. Contact us</h2>
            <p style={{ margin: 0 }}>
              If you have any questions about these terms, please contact us at{" "}
              <a href="mailto:hello@playmoveimprove.com.au" style={{ color: "#3730a3", textDecoration: "none" }}>
                hello@playmoveimprove.com.au
              </a>
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}