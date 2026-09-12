import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  Lightbulb,
  LockKeyhole,
  MessageCircleHeart,
  MessageCircleQuestion,
  Sparkles,
  Store,
  UsersRound,
  Video,
} from "lucide-react";

import CommunityFeed from "@/components/CommunityFeed";
import CommunityMembers from "@/components/CommunityMembers";
import EmbeddedFreeTools from "@/components/EmbeddedFreeTools";
import { createClient } from "@/lib/supabase-server";
import { submitPrivateHiveQuestion } from "./actions";

type CommunityPageProps = {
  searchParams?: Promise<{
    questionReceived?: string;
    questionError?: string;
  }>;
};

type CommunityPrompt = {
  id: string;
  title: string;
  prompt: string;
  published_at: string | null;
};

export default async function CommunityPage({
  searchParams,
}: CommunityPageProps) {
  const params = await searchParams;

  const supabase = await createClient();

  const { data: publishedPrompt, error: promptError } = await supabase
    .from("community_prompts")
    .select("id, title, prompt, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (promptError) {
    console.error(
      "Could not load published community prompt:",
      promptError,
    );
  }

  const currentPrompt =
    (publishedPrompt as CommunityPrompt | null) || null;

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
                  href="#ask-the-hive"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
                >
                  Ask the Hive
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
                <CheckItem text="Ask publicly or privately" />
                <CheckItem text="Learn from other AHAs and managers" />
                <CheckItem text="Return whenever you need fresh support" />
              </div>
            </aside>
          </div>
        </section>

        <section
          id="ask-the-hive"
          className="mb-8 scroll-mt-24 rounded-4xl border-2 border-[#0f766e] bg-white p-7 shadow-md md:p-10"
        >
          <div className="mb-8 max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#f0fdfa] px-4 py-2 text-sm font-semibold text-[#0f766e]">
              <MessageCircleQuestion size={17} />
              Ask the Hive
            </div>

            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              Have something you are trying to work through?
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#6b6880] md:text-lg">
              Sometimes it helps to ask the wider community and sometimes you
              would rather send the question quietly to Robyn and Jess. Both
              options are welcome here.
            </p>
          </div>

          {params?.questionReceived === "true" ? (
            <div className="mb-6 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
              <p className="font-semibold text-[#0f766e]">
                Your question has been received.
              </p>

              <p className="mt-2 text-sm leading-relaxed text-[#3f5f5a]">
                Robyn and Jess have been notified and your question is now
                available inside the private Hive management area.
              </p>
            </div>
          ) : null}

          {params?.questionError ? (
            <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 p-5 text-sm leading-relaxed text-red-700">
              {decodeURIComponent(params.questionError)}
            </div>
          ) : null}

          <div className="grid gap-6 lg:grid-cols-2">
            <article className="flex flex-col rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-6 md:p-7">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0f766e]">
                <UsersRound size={23} />
              </div>

              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Ask publicly
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                Put your question into the community.
              </h3>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-[#3f5f5a]">
                Use the community feed when your question could help other AHAs
                too, or when you would like to hear different perspectives and
                ideas from people doing similar work.
              </p>

              <a
                href="#community-feed"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
              >
                Ask in the community
                <ArrowRight size={15} />
              </a>
            </article>

            <article className="rounded-4xl border border-[#e8e4de] bg-[#faf8f5] p-6 md:p-7">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0f766e]">
                <LockKeyhole size={23} />
              </div>

              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Ask privately
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                Send your question directly to Robyn and Jess.
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-[#6b6880]">
                Use this option when you would rather not put your question
                into the public community feed. Please avoid including names or
                identifying information about clients.
              </p>

              <form
                action={submitPrivateHiveQuestion}
                className="mt-6 grid gap-4"
              >
                <label className="grid gap-2">
                  <span className="text-sm font-semibold">
                    Your name
                  </span>

                  <input
                    type="text"
                    name="fullName"
                    required
                    autoComplete="name"
                    className="w-full rounded-2xl border border-[#e8e4de] bg-white px-4 py-3 text-base outline-none transition focus:border-[#0f766e]"
                    placeholder="Your name"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold">
                    Email address
                  </span>

                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    className="w-full rounded-2xl border border-[#e8e4de] bg-white px-4 py-3 text-base outline-none transition focus:border-[#0f766e]"
                    placeholder="you@example.com"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold">
                    Your role
                  </span>

                  <input
                    type="text"
                    name="role"
                    className="w-full rounded-2xl border border-[#e8e4de] bg-white px-4 py-3 text-base outline-none transition focus:border-[#0f766e]"
                    placeholder="e.g. Allied Health Assistant"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold">
                    What would you like to ask?
                  </span>

                  <textarea
                    name="question"
                    required
                    rows={6}
                    className="w-full resize-y rounded-2xl border border-[#e8e4de] bg-white px-4 py-3 text-base leading-relaxed outline-none transition focus:border-[#0f766e]"
                    placeholder="Share the situation or question you would like Robyn and Jess to think about..."
                  />
                </label>

                <label className="flex items-start gap-3 rounded-2xl border border-[#e8e4de] bg-white p-4">
                  <input
                    type="checkbox"
                    name="canShare"
                    className="mt-1 h-4 w-4"
                  />

                  <span className="text-sm leading-relaxed text-[#5f5b73]">
                    Robyn and Jess may discuss the general theme of my question
                    in a future webinar, blog or community conversation,
                    without sharing identifying details.
                  </span>
                </label>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
                >
                  Send private question
                  <ArrowRight size={17} />
                </button>
              </form>
            </article>
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

        {currentPrompt ? (
          <section className="mb-8 overflow-hidden rounded-4xl border border-[#99f6e4] bg-linear-to-br from-[#f0fdfa] via-white to-[#fff7df] p-7 shadow-sm md:p-10">
            <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-4xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0f766e] shadow-sm">
                  <Sparkles size={16} />
                  Current Hive conversation
                </div>

                <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                  {currentPrompt.title}
                </h2>

                <p className="mt-4 whitespace-pre-wrap text-base leading-relaxed text-[#3f5f5a] md:text-lg">
                  {currentPrompt.prompt}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-[#6b6880]">
                  There is no perfect answer. Share what you have noticed,
                  experienced or wondered about in your own work.
                </p>
              </div>

              <a
                href="#community-feed"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Join this conversation
                <ArrowRight size={16} />
              </a>
            </div>
          </section>
        ) : null}

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

      <p className="text-sm leading-relaxed text-[#3f5f5a]">
        {text}
      </p>
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

      <h3 className="mb-2 text-xl font-bold">
        {title}
      </h3>

      <p className="mb-5 text-sm leading-relaxed text-[#6b6880]">
        {text}
      </p>

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