import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1e1b2e] px-6 py-12 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* Links Directories Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">

          {/* Primary Business Identity Block */}
          <div>
            <p className="text-base font-semibold text-white mb-2">
              Developmental Hub
            </p>
            <p className="text-xs text-slate-400 mb-5 leading-relaxed">
              A Play Move Improve Pty Ltd platform.<br />Victoria, Australia.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://www.instagram.com/playmoveimprove" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-lg bg-[#2d2a3e] flex items-center justify-center hover:bg-[#38344e] transition"
                aria-label="Instagram Profile"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="#9ca3af"/>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/playmoveimprove" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-lg bg-[#2d2a3e] flex items-center justify-center hover:bg-[#38344e] transition"
                aria-label="Facebook Page"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Families Category Columns */}
          <div>
            <p className="text-xs font-semibold tracking-wider uppercase text-slate-500 mb-4">
              For families
            </p>
            <div className="flex flex-col gap-2.5">
              <Link href="/videos/free" className="text-sm text-slate-400 hover:text-white transition">Free videos</Link>
              <Link href="/pricing" className="text-sm text-slate-400 hover:text-white transition">Membership</Link>
              <Link href="/cup-sequence" className="text-sm text-slate-400 hover:text-white transition">Cup Rhythm Series</Link>
              <Link href="/register-interest" className="text-sm text-slate-400 hover:text-white transition">Request content</Link>
              <Link href="/waitlist" className="text-sm text-slate-400 hover:text-white transition">Join the waitlist</Link>
            </div>
          </div>

          {/* Members Information Navigation */}
          <div>
            <p className="text-xs font-semibold tracking-wider uppercase text-slate-500 mb-4">
              Members
            </p>
            <div className="flex flex-col gap-2.5">
              <Link href="/videos" className="text-sm text-slate-400 hover:text-white transition">Video library</Link>
              <Link href="/resources" className="text-sm text-slate-400 hover:text-white transition">Activity sheets</Link>
              <Link href="/forum" className="text-sm text-slate-400 hover:text-white transition">Community</Link>
              <Link href="/qanda" className="text-sm text-slate-400 hover:text-white transition">Monthly Q&A</Link>
            </div>
          </div>

          {/* Company Context Links */}
          <div>
            <p className="text-xs font-semibold tracking-wider uppercase text-slate-500 mb-4">
              Company
            </p>
            <div className="flex flex-col gap-2.5">
              <Link href="/about" className="text-sm text-slate-400 hover:text-white transition">About us</Link>
              <Link href="/contact" className="text-sm text-slate-400 hover:text-white transition">About & Contact</Link>
              <Link href="/terms" className="text-sm text-slate-400 hover:text-white transition">Terms</Link>
              <Link href="/privacy" className="text-sm text-slate-400 hover:text-white transition">Privacy policy</Link>
            </div>
          </div>

        </div>

        {/* Secondary Subscription Notification Bar */}
        <div className="bg-[#2d2a3e] rounded-xl p-6 md:p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-white mb-1">
              Not ready to subscribe yet?
            </p>
            <p className="text-xs text-slate-400">
              Tell us what your family needs and we will build toward it.
            </p>
          </div>
          <Link 
            href="/waitlist" 
            className="text-xs font-semibold text-indigo-200 border border-indigo-900 rounded-full px-4.5 py-2 whitespace-nowrap hover:bg-[#38344e] transition"
          >
            Join the waitlist →
          </Link>
        </div>

        {/* Closing Corporate and Legal Line */}
        <div className="border-t border-[#2d2a3e] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} Play Move Improve Pty Ltd · ABN 17 415 190 263
          </p>
          <a 
            href="mailto:robyn@playmoveimprove.com.au" 
            className="text-xs text-slate-400 hover:text-white transition"
          >
            robyn@playmoveimprove.com.au
          </a>
        </div>

      </div>
    </footer>
  );
}