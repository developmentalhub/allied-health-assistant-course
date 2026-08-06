import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  Lightbulb,
  MessageCircleHeart,
  Store,
  UsersRound,
  Video,
} from "lucide-react";
import CommunityFeed from "@/components/CommunityFeed";
import CommunityMembers from "@/components/CommunityMembers";
import EmbeddedFreeTools from "@/components/EmbeddedFreeTools";

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-[#fffaf3] px-5 py-12 text-[#1e1b2e] sm:px-6 md:py-16">
      <section className="mx-auto max-w-7xl">
        <section className="mb-8 overflow-hidden rounded-4xl border border-[#f4d9a6] bg-white shadow-sm">
          <div className="grid gap-8 bg-linear-to-br from-[#fff7df] via-white to-[#f0fdfa] p-7 md:p-10 lg:grid-cols-[1fr_0.72fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
                Allied Health Hive | Workforce Development
              </p>

              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                A supportive place to learn, reflect and feel less alone.
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#5f5b73]">
                Use practical tools, discover fresh ideas and join community
                conversations when you feel ready. You can also browse quietly
                without needing to post.
              </p>

              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#5f5b73]">
                You do not need to have the perfect question or feel confident
                before you begin. The Hive is here to support learning without
                judgement.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#free-tools"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
                >
                  Use the free tools
                  <ArrowRight size={16} />
                </a>

                <a
                  href="#community-feed"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0f766e] bg-white px-6 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#f0fdfa]"
                >
                  Visit the community feed
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>

            <aside className="rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-6 md:p-8">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <HeartHandshake size={27} />
              </div>

              <h2 className="mb-4 text-2xl font-bold">
                Come as you are
              </h2>

              <div className="grid gap-3">
                <CheckItem text="Browse quietly without needing to post" />
                <CheckItem text="Use practical tools in your own time" />
                <CheckItem text="Share questions when you feel ready" />
                <CheckItem text="Learn from other AHAs and managers" />
                <CheckItem text="Return whenever you need fresh support" />
              </div>
            </aside>
          </div>
        </section>

        <section
          id="free-tools"
          className="mb-8 scroll-mt-24 rounded-4xl border-2 border-[#0f766e] bg-white p-7 shadow-md md:p-10"
        >
          <div className="mb-7">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#f0fdfa] px-4 py-2 text-sm font-semibold text-[#0f766e]">
              <Lightbulb size={16} />
              Free practical tools
            </div>

            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              Start with something useful right now.
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#6b6880] md:text-lg">
              Open a tool directly on this page to prepare for a session,
              reflect afterwards or organise questions for a supervising
              professional.
            </p>
          </div>

          <EmbeddedFreeTools />
        </section>

        <section className="mb-8 grid gap-5 md:grid-cols-3">
          <PathwayCard
            icon={<Video size={24} />}
            title="Free live webinar"
            text="Join Robyn and Jess for practical activity ideas, session adaptations and supportive conversation."
            href="/subscribe"
            linkText="Save my free place"
          />

          <PathwayCard
            icon={<Store size={24} />}
            title="Practical resources"
            text="Explore templates, tools and resources designed around real AHA work."
            href="/resource-shop"
            linkText="View resources"
          />

          <PathwayCard
            icon={<MessageCircleHeart size={24} />}
            title="Reflective support"
            text="Talk through confidence, communication or a challenging session in a supportive space."
            href="/reflective-practice"
            linkText="Explore support"
          />
        </section>

        <div className="mb-8 grid gap-6 lg:grid-cols-[0.68fr_0.32fr] lg:items-start">
          <section
            id="community-feed"
            className="scroll-mt-24 rounded-4xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8"
          >
            <div className="mb-6">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Community feed
              </p>

              <h2 className="text-3xl font-bold">
                Read, reply or quietly follow along.
              </h2>

              <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#6b6880]">
                You do not need to post to belong here. Read updates, share a
                question, offer an idea or simply return when something feels
                useful.
              </p>
            </div>

            <CommunityFeed />
          </section>

          <CommunityMembers />
        </div>

        <section className="rounded-4xl bg-[#1e1b2e] p-8 text-white shadow-sm md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.55fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#99f6e4]">
                For managers and supervisors
              </p>

              <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                Help your AHA workforce feel supported and connected.
              </h2>

              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#d9d7e5]">
                Explore practical workforce development, reflective support and
                resources shaped around your team.
              </p>
            </div>

            <Link
              href="/manager-pathway"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
            >
              Explore team development
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
      <CheckCircle2
        className="mt-0.5 shrink-0 text-[#0f766e]"
        size={18}
      />

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