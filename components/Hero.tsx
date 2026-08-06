import Link from "next/link";
import {
  ArrowRight,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

const reassuranceItems = [
  {
    icon: <Lightbulb size={18} />,
    text: "Practical session ideas",
  },
  {
    icon: <HeartHandshake size={18} />,
    text: "Compassionate support",
  },
  {
    icon: <UsersRound size={18} />,
    text: "AHA workforce connection",
  },
  {
    icon: <ShieldCheck size={18} />,
    text: "Clear professional boundaries",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#fffaf3]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#ccfbf1] opacity-60 blur-3xl" />
        <div className="absolute -bottom-20 -left-16 h-80 w-80 rounded-full bg-[#fff0c7] opacity-80 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#99f6e4] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
              <span className="h-2 w-2 rounded-full bg-[#0f766e]" />
              Allied Health Hive | Workforce Development
            </span>
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#1e1b2e] sm:text-5xl md:text-6xl">
            Practical support for a stronger, more confident AHA workforce.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-[#5f5b73]">
            Creative session ideas, reflective tools, live learning and a
            supportive community for Allied Health Assistants and the teams who
            guide them.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#6b6880]">
            You are not expected to know everything. The Hive is a place to
            learn, ask questions, discover practical ideas and grow through
            supportive professional conversations.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/community"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-7 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-[#0d6962]"
            >
              Explore support for AHAs
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/manager-pathway"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0f766e] bg-white px-7 py-4 text-base font-semibold text-[#0f766e] transition hover:bg-[#f0fdfa]"
            >
              Support my AHA team
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4">
            {reassuranceItems.map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-2 text-sm font-medium text-[#6b6880]"
              >
                <span className="text-[#0f766e]">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}