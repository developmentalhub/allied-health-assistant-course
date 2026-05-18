import Link from "next/link";

export default function ConfirmPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 bg-[#e0e7ff] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" fill="none" stroke="#3730a3" strokeWidth="2">
            <path d="M4 14l6 6L20 8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1
          className="text-3xl font-light text-[#1e1b2e] mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Check your email
        </h1>
        <p className="text-[#6b6880] mb-8 leading-relaxed">
          We've sent a confirmation link to your email address.
          Click it to activate your account and you'll be ready to go.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-[#3730a3] text-white px-7 py-3 rounded-full font-medium text-sm hover:bg-[#312e81] transition-colors"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );
}