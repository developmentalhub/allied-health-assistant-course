import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  MessageCircleHeart,
  UsersRound,
  Video,
} from "lucide-react";
import CommunityFeed from "@/components/CommunityFeed";
import CommunityMembers from "@/components/CommunityMembers";

const freeTools = [
  {
    title: "AHA Course Tools Preview",
    description:
      "Explore the starter AHA tools and get a feel for the kind of support being built inside the hive.",
    href: "https://allied-health-assistant-course.netlify.app/",
  },
  {
    title: "Clinic Session Feedback Tool",
    description:
      "Reflect after a clinic session, organise observations and prepare clearer feedback for the supervising professional.",
    href: "https://aha-clinic-session-feedback.netlify.app/",
  },
];

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-12 text-[#1e1b2e] md:py-16">
      <section className="mx-auto max-w-5xl">
        <div className="mb-6 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Free AHA community
          </p>

          <p className="mt-2 text-base leading-relaxed text-[#3f5f5a]">
            A low-pressure place to start. Browse quietly, access the free
            starter tools, register for the free August webinar, or join the
            community conversation when you are ready.
          </p>
        </div>

        <section className="mb-6 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-start">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Welcome to the hive
              </p>

              <h1 className="mb-5 text-4xl font-bold leading-tight md:text-5xl">
                Your free AHA community space.
              </h1>

              <p className="mb-7 text-lg leading-relaxed text-[#5f5b73]">
                Start with the free tools, browse the feed quietly, see who else
                is joining, or reply when you feel ready.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#community-feed"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
                >
                  Go to community feed
                  <ArrowRight size={16} />
                </a>

                <a
                  href="#free-tools"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-6 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
                >
                  Open free tools
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>

            <aside className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <UsersRound size={24} />
              </div>

              <h2 className="mb-4 text-2xl font-bold">
                What you can do here
              </h2>

              <div className="grid gap-3">
                <CheckItem text="Use the two free starter tools." />
                <CheckItem text="Browse quietly without needing to post." />
                <CheckItem text="Read community updates and replies." />
                <CheckItem text="Register for the free August webinar." />
              </div>
            </aside>
          </div>
        </section>

        <div className="mb-6 grid gap-6 lg:grid-cols-[0.68fr_0.32fr] lg:items-start">
          <section
            id="community-feed"
            className="rounded-4xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8"
          >
            <div className="mb-6">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Community feed
              </p>

              <h2 className="mb-3 text-3xl font-bold">
                Read, reply or quietly follow along.
              </h2>

              <p className="max-w-3xl text-base leading-relaxed text-[#6b6880]">
                You do not need to post to belong here. You can read updates,
                reply when something feels useful, or simply use the tools and
                come back later.
              </p>
            </div>

            <CommunityFeed />
          </section>

          <CommunityMembers />
        </div>

        <section
          id="free-tools"
          className="mb-6 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-8"
        >
          <div className="mb-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Free starter tools
            </p>

            <h2 className="mb-3 text-3xl font-bold">
              Start here with your free tools.
            </h2>

            <p className="max-w-3xl text-base leading-relaxed text-[#6b6880]">
              These tools are a small taste of the practical support being built
              for AHAs. The full member tool library will sit inside the
              $57/month AHA Professional Development membership.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {freeTools.map((tool) => (
              <a
                key={tool.href}
                href={tool.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-6 transition hover:border-[#0f766e] hover:bg-white"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0f766e]">
                  <ClipboardList size={24} />
                </div>

                <h3 className="mb-2 text-xl font-bold">{tool.title}</h3>

                <p className="mb-5 text-sm leading-relaxed text-[#3f5f5a]">
                  {tool.description}
                </p>

                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
                  Open free tool
                  <span aria-hidden="true">→</span>
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-6 grid gap-5 md:grid-cols-3">
          <PathwayCard
            icon={<Video size={24} />}
            title="Free August webinar"
            text="Start with the free August webinar, then continue monthly from September if it feels helpful."
            href="/subscribe"
            linkText="Register free"
          />

          <PathwayCard
            icon={<ClipboardList size={24} />}
            title="$57/month membership"
            text="Monthly live webinars, replays, PDFs and reusable member tools as the library grows."
            href="/subscribe"
            linkText="View membership"
          />

          <PathwayCard
            icon={<MessageCircleHeart size={24} />}
            title="1:1 reflective support"
            text="Request support when you want to talk through confidence, role clarity or practical session ideas."
            href="/reflective-practice"
            linkText="Request support"
          />
        </section>

        <section className="rounded-4xl bg-[#1e1b2e] p-8 text-white shadow-sm md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.55fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#99f6e4]">
                For managers
              </p>

              <h2 className="mb-4 text-3xl font-bold">
                Supporting a team of AHAs?
              </h2>

              <p className="max-w-3xl text-base leading-relaxed text-[#d9d7e5]">
                Team access starts at $57/month for up to 5 staff. Larger teams
                or clinics wanting monthly webinars and 1:1 reflective practice
                can request a team quote.
              </p>
            </div>

            <Link
              href="/manager-pathway"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
            >
              View manager pathway
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3">
      <CheckCircle2 className="mt-0.5 shrink-0 text-[#0f766e]" size={18} />
      <p className="text-sm leading-relaxed text-[#3f5f5a]">{text}</p>
    </div>
  );
}

function PathwayCard({
  icon,
  title,
  text,
  href,
  linkText,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  href: string;
  linkText: string;
}) {
  return (
    <article className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
        {icon}
      </div>

      <h3 className="mb-2 text-xl font-bold">{title}</h3>

      <p className="mb-5 text-sm leading-relaxed text-[#6b6880]">{text}</p>

      <Link
        href={href}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
      >
        {linkText}
        <ArrowRight size={14} />
      </Link>
    </article>
  );
}