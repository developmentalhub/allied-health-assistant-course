import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1e1b2e] px-6 py-12 font-sans">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="mb-3 text-xl font-bold leading-tight text-white">
              Allied Health & Educator Academy
            </p>

            <p className="mb-5 text-base leading-relaxed text-slate-400">
              A Play Move Improve Pty Ltd platform.
              <br />
              Victoria, Australia.
            </p>

            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/playmoveimprove"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2d2a3e] transition hover:bg-[#38344e]"
                aria-label="Instagram profile"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="#cbd5e1" />
                </svg>
              </a>

              <a
                href="https://www.facebook.com/playmoveimprove"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2d2a3e] transition hover:bg-[#38344e]"
                aria-label="Facebook page"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Academy
            </p>

            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-base text-slate-400 transition hover:text-white"
              >
                Home
              </Link>

              <Link
                href="/allied-health/foundations/welcome-to-aha-role"
                className="text-base text-slate-400 transition hover:text-white"
              >
                Allied Health pathway
              </Link>

              <Link
                href="/videos"
                className="text-base text-slate-400 transition hover:text-white"
              >
                Video area
              </Link>

              <Link
                href="/subscribe"
                className="text-base text-slate-400 transition hover:text-white"
              >
                Access options
              </Link>

              <Link
                href="/waitlist"
                className="text-base text-slate-400 transition hover:text-white"
              >
                Join the waitlist
              </Link>
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Members
            </p>

            <div className="flex flex-col gap-3">
              <Link
                href="/dashboard"
                className="text-base text-slate-400 transition hover:text-white"
              >
                Dashboard
              </Link>

              <Link
                href="/community"
                className="text-base text-slate-400 transition hover:text-white"
              >
                Community hub
              </Link>

              <Link
                href="/sessions"
                className="text-base text-slate-400 transition hover:text-white"
              >
                Live sessions
              </Link>

              <Link
                href="/team"
                className="text-base text-slate-400 transition hover:text-white"
              >
                Team and contributors
              </Link>
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Company
            </p>

            <div className="flex flex-col gap-3">
              <Link
                href="/about"
                className="text-base text-slate-400 transition hover:text-white"
              >
                About
              </Link>

              <Link
                href="/contact"
                className="text-base text-slate-400 transition hover:text-white"
              >
                Contact
              </Link>

              <Link
                href="/terms"
                className="text-base text-slate-400 transition hover:text-white"
              >
                Terms
              </Link>

              <Link
                href="/privacy"
                className="text-base text-slate-400 transition hover:text-white"
              >
                Privacy policy
              </Link>
            </div>
          </div>
        </div>

        <div className="mb-8 flex flex-col items-start justify-between gap-6 rounded-3xl bg-[#2d2a3e] p-6 md:flex-row md:items-center md:p-8">
          <div>
            <p className="mb-2 text-lg font-bold text-white">
              Want to hear when new academy areas open?
            </p>

            <p className="text-base leading-relaxed text-slate-400">
              Join the waitlist for updates about the Allied Health pathway,
              Educator pathway, community access and future live sessions.
            </p>
          </div>

          <Link
            href="/waitlist"
            className="whitespace-nowrap rounded-full border border-[#5eead4] px-5 py-3 text-base font-semibold text-[#99f6e4] transition hover:bg-[#38344e]"
          >
            Join the waitlist
          </Link>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#2d2a3e] pt-6 sm:flex-row">
          <p className="text-center text-sm text-slate-500 sm:text-left">
            © {new Date().getFullYear()} Play Move Improve Pty Ltd · ABN 17 415
            190 263
          </p>

          <a
            href="mailto:robyn@playmoveimprove.com.au"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            robyn@playmoveimprove.com.au
          </a>
        </div>
      </div>
    </footer>
  );
}