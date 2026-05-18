import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">

      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-indigo-100 opacity-60 blur-3xl" />
        <div className="absolute bottom-0 -left-16 w-72 h-72 rounded-full bg-amber-50 opacity-80 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-28 md:pb-32">

        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#3730a3] bg-[#e0e7ff] px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3730a3] inline-block" />
            Expert-led group support
          </span>
        </div>

        <h1
          className="text-center text-4xl sm:text-5xl md:text-6xl font-light text-[#1e1b2e] leading-tight tracking-tight max-w-3xl mx-auto"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Support for families,{" "}
          <em className="font-normal not-italic text-[#3730a3]">
            built around community
          </em>
        </h1>

        <p className="mt-6 text-center text-lg text-[#6b6880] max-w-xl mx-auto leading-relaxed font-light">
          Join specialist-led small group sessions and webinars — affordable,
          evidence-informed, and designed for parents navigating developmental
          challenges with their children.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/sessions"
            className="inline-flex items-center justify-center gap-2 bg-[#3730a3] text-white px-7 py-3.5 rounded-full font-medium text-sm hover:bg-[#312e81] transition-colors duration-200 shadow-sm"
          >
            Browse upcoming sessions
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center bg-white text-[#1e1b2e] px-7 py-3.5 rounded-full font-medium text-sm border border-[#e8e4de] hover:border-[#3730a3] hover:text-[#3730a3] transition-colors duration-200"
          >
            How it works
          </Link>
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {[
            { icon: "🔒", text: "Secure & private sessions" },
            { icon: "✅", text: "Vetted practitioners" },
            { icon: "💳", text: "Stripe-secured payments" },
            { icon: "📅", text: "Flexible scheduling" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-sm text-[#6b6880]">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}