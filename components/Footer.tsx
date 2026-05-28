import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#1e1b2e", padding: "48px 24px", fontFamily: "DM Sans, sans-serif" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px", marginBottom: "40px" }}>

          {/* Brand */}
          <div>
            <p style={{ fontSize: "16px", fontWeight: 600, color: "white", margin: "0 0 8px" }}>Developmental Hub</p>
            <p style={{ fontSize: "13px", color: "#6b7280", margin: "0 0 20px", lineHeight: 1.6 }}>
              A Play Move Improve Pty Ltd platform.<br />Victoria, Australia.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <a href="https://www.instagram.com/playmoveimprove" target="_blank" rel="noopener noreferrer" style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#2d2a3e", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="#9ca3af"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/playmoveimprove" target="_blank" rel="noopener noreferrer" style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "#2d2a3e", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* For families */}
          <div>
            <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b7280", margin: "0 0 16px" }}>For families</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link href="/videos/free" style={{ fontSize: "14px", color: "#9ca3af", textDecoration: "none" }}>Free videos</Link>
              <Link href="/pricing" style={{ fontSize: "14px", color: "#9ca3af", textDecoration: "none" }}>Membership</Link>
              <Link href="/cup-sequence" style={{ fontSize: "14px", color: "#9ca3af", textDecoration: "none" }}>Cup Rhythm Series</Link>
              <Link href="/register-interest" style={{ fontSize: "14px", color: "#9ca3af", textDecoration: "none" }}>Request content</Link>
              <Link href="/waitlist" style={{ fontSize: "14px", color: "#9ca3af", textDecoration: "none" }}>Join the waitlist</Link>
            </div>
          </div>

          {/* Members */}
          <div>
            <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b7280", margin: "0 0 16px" }}>Members</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link href="/videos" style={{ fontSize: "14px", color: "#9ca3af", textDecoration: "none" }}>Video library</Link>
              <Link href="/resources" style={{ fontSize: "14px", color: "#9ca3af", textDecoration: "none" }}>Activity sheets</Link>
              <Link href="/forum" style={{ fontSize: "14px", color: "#9ca3af", textDecoration: "none" }}>Community</Link>
              <Link href="/qanda" style={{ fontSize: "14px", color: "#9ca3af", textDecoration: "none" }}>Monthly Q&A</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b7280", margin: "0 0 16px" }}>Company</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link href="/about" style={{ fontSize: "14px", color: "#9ca3af", textDecoration: "none" }}>About us</Link>
              <Link href="/contact" style={{ fontSize: "14px", color: "#9ca3af", textDecoration: "none" }}>About & Contact</Link>
              <Link href="/terms" style={{ fontSize: "14px", color: "#9ca3af", textDecoration: "none" }}>Terms</Link>
              <Link href="/privacy" style={{ fontSize: "14px", color: "#9ca3af", textDecoration: "none" }}>Privacy policy</Link>
            </div>
          </div>

        </div>

        {/* Waitlist section */}
        <div style={{ backgroundColor: "#2d2a3e", borderRadius: "14px", padding: "24px 28px", marginBottom: "32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: "14px", fontWeight: 600, color: "white", margin: "0 0 4px" }}>Not ready to subscribe yet?</p>
            <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>Tell us what your family needs and we'll build toward it.</p>
          </div>
          <Link href="/waitlist" style={{ fontSize: "13px", fontWeight: 600, color: "#a5b4fc", textDecoration: "none", border: "1px solid #4338ca", borderRadius: "999px", padding: "8px 18px", whiteSpace: "nowrap" as const }}>
            Join the waitlist →
          </Link>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid #2d2a3e", paddingTop: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontSize: "12px", color: "#4b5563", margin: 0 }}>
            © {new Date().getFullYear()} Play Move Improve Pty Ltd · ABN 17 415 190 263
          </p>
          <a href="mailto:robyn@playmoveimprove.com.au" style={{ fontSize: "12px", color: "#6b7280", textDecoration: "none" }}>
            robyn@playmoveimprove.com.au
          </a>
        </div>

      </div>
    </footer>
  );
}