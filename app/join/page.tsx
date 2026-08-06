import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  HeartHandshake,
  MessageCircleHeart,
  UsersRound,
  Video,
} from "lucide-react";
import EmbeddedFreeTools from "@/components/EmbeddedFreeTools";

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-[#fffaf3] px-5 py-12 text-[#1e1b2e] sm:px-6 md:py-20">
      <section className="mx-auto max-w-7xl">
        <section className="mb-8 overflow-hidden rounded-4xl border border-[#f4d9a6] bg-white shadow-sm">
          <div className="grid gap-9 bg-linear-to-br from-[#fff7df] via-white to-[#f0fdfa] p-7 md:p-12 lg:grid-cols-[1fr_0.72fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
                Allied Health Hive | Workforce Development
              </p>

              <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
                Join a supportive space created for Allied Health Assistants.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#5f5b73] md:text-xl">
                Find practical activity ideas, reflective tools and supportive
                learning that helps you feel more confident in your work.
              </p>

              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#5f5b73]">
                You can browse quietly, use the free tools and read community
                conversations without needing to introduce yourself or post.
                Join in only when it feels right for you.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/community"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
                >
                  Enter the free community
                  <ArrowRight size={18} />
                </Link>

                <a
                  href="#free-tools"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0f766e] bg-white px-7 py-4 text-base font-semibold text-[#0f766e] transition hover:bg-[#f0fdfa]"
                >
                  Try the free tools
                  <ClipboardList size={18} />
                </a>
              </div>
            </div>

            <aside className="rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-6 md:p-8">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <HeartHandshake size={27} />
              </div>

              <h2 className="mb-4 text-2xl font-bold">
                There is no pressure to participate
              </h2>

              <div className="grid gap-3">
                <CheckItem text="Browse the community quietly" />
                <CheckItem text="Use practical tools in your own time" />
                <CheckItem text="Explore topics in any order" />
                <CheckItem text="Attend a webinar when it suits you" />
                <CheckItem text="Ask for support when you feel ready" />
              </div>
            </aside>
          </div>
        </section>

        <section className="mb-8 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-10">
          <div className="mb-8 max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Why join the Hive?
            </p>

            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              Practical support for the moments that can feel difficult or unclear.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#6b6880] md:text-lg">
              Allied Health Assistants often work across different people,
              professionals, environments and therapy goals. The Hive gives you
              a place to find ideas, reflect and feel less alone.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <PathwayCard
              icon={<ClipboardList size={24} />}
              title="Practical tools"
              text="Use guided tools to prepare for sessions, organise observations and reflect afterwards."
            />

            <PathwayCard
              icon={<BookOpen size={24} />}
              title="Useful learning"
              text="Explore topics connected to real AHA work, questions and everyday challenges."
            />

            <PathwayCard
              icon={<UsersRound size={24} />}
              title="Community"
              text="Read conversations, learn from others and contribute only when you feel comfortable."
            />

            <PathwayCard
              icon={<MessageCircleHeart size={24} />}
              title="Reflective support"
              text="Find reassurance and practical next steps after difficult or uncertain sessions."
            />
          </div>
        </section>

        <section
          id="free-tools"
          className="mb-8 scroll-mt-24 rounded-4xl border-2 border-[#0f766e] bg-white p-7 shadow-md md:p-10"
        >
          <div className="mb-7">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#f0fdfa] px-4 py-2 text-sm font-semibold text-[#0f766e]">
              <ClipboardList size={16} />
              Free practical tools
            </div>

            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              Start with something useful today.
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#6b6880] md:text-lg">
              Use the tools directly on this page. You can return to them before
              or after different sessions whenever you need support.
            </p>
          </div>

          <EmbeddedFreeTools />
        </section>

        <section className="mb-8 grid gap-5 md:grid-cols-3">
          <LinkedPathwayCard
            icon={<UsersRound size={24} />}
            title="Visit the community"
            text="Browse updates, read discussions and connect with other AHAs at your own pace."
            href="/community"
            linkText="Enter the community"
          />

          <LinkedPathwayCard
            icon={<BookOpen size={24} />}
            title="Explore learning topics"
            text="Choose from practical topics about preparation, reflection, role confidence and communication."
            href="/topics"
            linkText="Browse the topics"
          />

          <LinkedPathwayCard
            icon={<Video size={24} />}
            title="Join a live webinar"
            text="Learn practical session ideas and ask questions in a warm, supportive environment."
            href="/webinars"
            linkText="View webinars"
          />
        </section>

        <section className="mb-8 rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-7 shadow-sm md:p-10">
          <div className="grid gap-7 lg:grid-cols-[1fr_0.65fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Start in your own way
              </p>

              <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                There is no single correct way to use the Hive.
              </h2>

              <div className="mt-6 grid gap-3">
                <CheckItem text="Open a free tool before your next session." />
                <CheckItem text="Read a topic that connects with something you are experiencing." />
                <CheckItem text="Browse the community without posting." />
                <CheckItem text="Attend a live webinar for practical ideas." />
                <CheckItem text="Return whenever you need reassurance or a fresh perspective." />
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="mb-3 text-sm font-semibold text-[#0f766e]">
                Supporting an AHA team?
              </p>

              <p className="mb-5 text-sm leading-relaxed text-[#6b6880]">
                Managers, clinic owners and supervising professionals can
                explore workforce development options shaped around their team.
              </p>

              <Link
                href="/manager-pathway"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Explore team support
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        <section className="rounded-4xl bg-[#1e1b2e] p-8 text-white shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#99f6e4]">
                Welcome to the Hive
              </p>

              <h2 className="text-3xl font-bold leading-tight md:text-5xl">
                You do not have to do this work alone.
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#d9d7e5] md:text-lg">
                Start by browsing, opening a tool or reading one community
                update. Take the next step that feels manageable.
              </p>
            </div>

            <Link
              href="/community"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
            >
              Enter the Allied Health Hive
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}

function PathwayCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0f766e]">
        {icon}
      </div>

      <h3 className="mb-3 text-xl font-bold">{title}</h3>

      <p className="text-sm leading-relaxed text-[#6b6880]">{text}</p>
    </article>
  );
}

function LinkedPathwayCard({
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
    <article className="flex flex-col rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
        {icon}
      </div>

      <h3 className="mb-3 text-xl font-bold">{title}</h3>

      <p className="mb-5 flex-1 text-sm leading-relaxed text-[#6b6880]">
        {text}
      </p>

      <Link
        href={href}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
      >
        {linkText}
        <ArrowRight size={15} />
      </Link>
    </article>
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