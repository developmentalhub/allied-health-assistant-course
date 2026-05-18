import Link from "next/link";

type SessionCard = {
  tag: string;
  tagColor: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  price: string;
  priceNote: string;
  capacity: string;
  minimum: string;
  duration: string;
  highlight?: string;
  cta: string;
  href: string;
  border: string;
};

function GroupIcon() {
  return (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WebinarOwnerIcon() {
  return (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <rect x="2" y="3" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 21h8M12 17v4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WebinarFacilitatorIcon() {
  return (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 3l1.5 3L23 6.5l-2.5 2.5.5 3.5L18 10.5 15 12.5l.5-3.5L13 6.5l3.5-.5L18 3z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const sessions: SessionCard[] = [
  {
    tag: "Small Group",
    tagColor: "bg-violet-100 text-violet-700",
    icon: <GroupIcon />,
    title: "Small Group Sessions",
    description:
      "Intimate expert-led sessions exploring a specific topic together. Structured conversation, peer connection, and practical strategies — all in 45 minutes.",
    price: "$39",
    priceNote: "per family",
    capacity: "Up to 8 families",
    minimum: "Minimum 6 families to run",
    duration: "45 minutes",
    highlight: "Most intimate",
    cta: "See group sessions",
    href: "/sessions?type=group",
    border: "border-violet-200",
  },
  {
    tag: "Webinar",
    tagColor: "bg-indigo-100 text-indigo-700",
    icon: <WebinarOwnerIcon />,
    title: "Webinars by Our Team",
    description:
      "Live webinars run directly by the Developmental Hub team. Deep-dive presentations on key topics, with live Q&A. Accessible and affordable for any family.",
    price: "$25",
    priceNote: "per family",
    capacity: "Up to 100 families",
    minimum: "Minimum 30 families to run",
    duration: "60 minutes",
    highlight: "Best value",
    cta: "See upcoming webinars",
    href: "/sessions?type=webinar-owner",
    border: "border-indigo-200",
  },
  {
    tag: "Webinar",
    tagColor: "bg-blue-100 text-blue-700",
    icon: <WebinarFacilitatorIcon />,
    title: "Specialist Webinars",
    description:
      "Webinars hosted by vetted external specialists and therapists. Expert voices on the topics your family needs most — from sleep to school transitions to anxiety.",
    price: "$79",
    priceNote: "per family",
    capacity: "Up to 100 families",
    minimum: "Minimum 30 families to run",
    duration: "60 minutes",
    cta: "See specialist webinars",
    href: "/sessions?type=webinar-facilitator",
    border: "border-blue-200",
  },
];

export default function SessionTypes() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

      <div className="text-center mb-14">
        <p className="text-xs font-medium tracking-widest uppercase text-[#6b6880] mb-3">
          How it works
        </p>
        <h2
          className="text-3xl md:text-4xl font-light text-[#1e1b2e] tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Three ways to get support
        </h2>
        <p className="mt-4 text-[#6b6880] max-w-lg mx-auto text-base leading-relaxed">
          All sessions are live, online, and designed around busy family life.
          No 1:1 appointments — just meaningful group learning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sessions.map((session) => (
          <div
            key={session.title}
            className={`relative flex flex-col rounded-2xl border ${session.border} bg-white p-7 shadow-sm hover:shadow-md transition-shadow duration-300`}
          >
            {session.highlight && (
              <div className="absolute -top-3 left-6">
                <span className="inline-block bg-[#3730a3] text-white text-xs font-medium px-3 py-1 rounded-full">
                  {session.highlight}
                </span>
              </div>
            )}

            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-xl bg-[#f0f0fa] flex items-center justify-center text-[#3730a3]">
                {session.icon}
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${session.tagColor}`}>
                {session.tag}
              </span>
            </div>

            <h3
              className="text-xl font-medium text-[#1e1b2e] mb-3 leading-snug"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {session.title}
            </h3>

            <p className="text-sm text-[#6b6880] leading-relaxed mb-6 flex-1">
              {session.description}
            </p>

            <div className="flex flex-col gap-2 mb-5 text-xs text-[#6b6880]">
              <div className="flex items-center gap-1.5">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M9 12v-1a3 3 0 0 0-6 0v1M6 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM13 12v-1a3 3 0 0 0-2.25-2.9M10.5 4a2 2 0 0 1 0 3.87" strokeLinecap="round" />
                </svg>
                {session.capacity}
              </div>
              <div className="flex items-center gap-1.5">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="7" cy="7" r="5.5" />
                  <path d="M7 4.5V7l1.5 1.5" strokeLinecap="round" />
                </svg>
                {session.duration}
              </div>
              <div className="flex items-center gap-1.5">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M7 2v10M4 9l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 13h10" strokeLinecap="round" />
                </svg>
                {session.minimum}
              </div>
            </div>

            <div className="flex items-end justify-between pt-4 border-t border-[#f0eee9]">
              <div>
                <span
                  className="text-2xl font-light text-[#1e1b2e]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {session.price}
                </span>
                <span className="text-xs text-[#6b6880] ml-1">{session.priceNote}</span>
              </div>
              <Link
                href={session.href}
                className="text-sm font-medium text-[#3730a3] hover:text-[#312e81] flex items-center gap-1 transition-colors"
              >
                {session.cta}
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 7h8M7 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-[#6b6880]">
        If the minimum number of families isn't reached 24 hours before the session,
        it will be cancelled and every family receives a full refund automatically.
      </p>

    </section>
  );
}