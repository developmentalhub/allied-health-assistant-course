import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Bookmark,
  BookOpen,
  Building2,
  CalendarDays,
  ClipboardCheck,
  Headphones,
  HeartHandshake,
  Lightbulb,
  LockKeyhole,
  MessageCircleHeart,
  Settings,
  UsersRound,
  Video,
} from "lucide-react";

import { createClient } from "@/lib/supabase-server";
import { blogPosts } from "@/lib/blog-posts";

type CommunityPost = {
  id: string;
  name: string | null;
  author_name: string | null;
  body: string | null;
  content: string | null;
  message: string | null;
  created_at: string | null;
};

type Webinar = {
  id: string;
  title: string;
  description: string | null;
  starts_at: string;
  ends_at: string;
  access_type: "free" | "members";
  status: "upcoming" | "recorded" | "cancelled";
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/dashboard");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .maybeSingle();

  const rawDisplayName =
    profile?.full_name ||
    user.user_metadata?.full_name ||
    user.email ||
    "there";

  const firstName =
    typeof rawDisplayName === "string"
      ? rawDisplayName.trim().split(" ")[0]
      : "there";

  const role = profile?.role || "learner";

  const hasAdminAccess =
    role === "admin" || role === "superadmin";

  const hasManagerAccess =
    role === "manager" ||
    role === "admin" ||
    role === "superadmin";

  const now = new Date();
  const nowIso = now.toISOString();

  const [
    { data: communityPosts },
    { data: upcomingWebinars },
  ] = await Promise.all([
    supabase
      .from("community_posts")
      .select(
        "id, name, author_name, body, content, message, created_at",
      )
      .order("created_at", { ascending: false })
      .limit(2),

    supabase
      .from("webinars")
      .select(
        "id, title, description, starts_at, ends_at, access_type, status",
      )
      .neq("status", "cancelled")
      .gte("starts_at", nowIso)
      .order("starts_at", { ascending: true })
      .limit(1),
  ]);

  const latestCommunityPosts =
    (communityPosts || []) as CommunityPost[];

  const nextWebinar =
    ((upcomingWebinars || []) as Webinar[])[0] || null;

  const latestBlogPost = [...blogPosts].sort(
    (a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime(),
  )[0];

  return (
    <main className="min-h-screen bg-[#fffaf3] px-5 py-12 text-[#1e1b2e] sm:px-6 md:py-20">
      <section className="mx-auto max-w-7xl">
        <section className="mb-8 overflow-hidden rounded-4xl border border-[#f4d9a6] bg-white shadow-sm">
          <div className="grid gap-8 bg-linear-to-br from-[#fff7df] via-white to-[#f0fdfa] p-7 md:p-12 lg:grid-cols-[1fr_0.72fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
                Allied Health Hive | Workforce Development
              </p>

              <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
                Welcome back, {firstName}.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#5f5b73] md:text-xl">
                See what is happening across the Hive, join a
                conversation or choose the support that feels most
                useful today.
              </p>

              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#5f5b73]">
                You do not need to work through everything in order.
                Drop into the community, listen to something useful,
                prepare for a session or simply see what other people
                are talking about.
              </p>
            </div>

            <aside className="rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-6 md:p-8">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <LockKeyhole size={27} />
              </div>

              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Your Hive
              </p>

              <h2 className="mb-4 text-2xl font-bold">
                Your home base for learning and connection
              </h2>

              <div className="grid gap-3 text-sm leading-relaxed text-[#3f5f5a]">
                <p>Signed in as {user.email}</p>
                <p>Account role: {formatRole(role)}</p>
                <p>
                  Private areas will only appear where access applies.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="mb-8">
          <div className="mb-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Happening in the Hive
            </p>

            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              Come back and see what is new.
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#6b6880] md:text-lg">
              New conversations, upcoming learning and fresh ideas
              will appear here automatically as the Hive grows.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            <section className="rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-6 shadow-sm">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0f766e]">
                <MessageCircleHeart size={23} />
              </div>

              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
                From the community
              </p>

              <h3 className="mb-5 text-2xl font-bold">
                What people are talking about
              </h3>

              {latestCommunityPosts.length > 0 ? (
                <div className="grid gap-4">
                  {latestCommunityPosts.map((post) => {
                    const name =
                      post.author_name ||
                      post.name ||
                      "Hive community member";

                    const text =
                      post.body ||
                      post.content ||
                      post.message ||
                      "";

                    return (
                      <article
                        key={post.id}
                        className="rounded-3xl border border-[#99f6e4] bg-white p-4"
                      >
                        <p className="text-sm font-semibold text-[#1e1b2e]">
                          {name}
                        </p>

                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#5f5b73]">
                          {text}
                        </p>

                        {post.created_at ? (
                          <p className="mt-3 text-xs text-[#8a8798]">
                            {formatCommunityDate(post.created_at)}
                          </p>
                        ) : null}
                      </article>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm leading-relaxed text-[#5f5b73]">
                  The conversation is just beginning. Visit the
                  community to ask a question, share an idea or quietly
                  follow along.
                </p>
              )}

              <Link
                href="/community#community-feed"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
              >
                Join the conversation
                <ArrowRight size={15} />
              </Link>
            </section>

            <section className="rounded-4xl border border-[#e8e4de] bg-white p-6 shadow-sm">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <CalendarDays size={23} />
              </div>

              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
                Coming up next
              </p>

              {nextWebinar ? (
                <>
                  <h3 className="text-2xl font-bold">
                    {nextWebinar.title}
                  </h3>

                  <p className="mt-3 text-sm font-semibold text-[#0f766e]">
                    {formatWebinarDate(nextWebinar.starts_at)}
                  </p>

                  <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-[#5f5b73]">
                    {nextWebinar.description ||
                      "Join the next Allied Health Hive learning conversation."}
                  </p>

                  <span className="mt-4 inline-flex rounded-full bg-[#f0fdfa] px-3 py-1 text-xs font-semibold text-[#0f766e]">
                    {nextWebinar.access_type === "free"
                      ? "Free session"
                      : "Hive member session"}
                  </span>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold">
                    More live learning is coming
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#5f5b73]">
                    New webinar dates will appear here as soon as they
                    are added to the Hive.
                  </p>
                </>
              )}

              <Link
                href="/webinars"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
              >
                View webinars
                <ArrowRight size={15} />
              </Link>
            </section>

            <section className="rounded-4xl border border-[#e8e4de] bg-white p-6 shadow-sm">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                {latestBlogPost?.audioUrl ? (
                  <Headphones size={23} />
                ) : (
                  <BookOpen size={23} />
                )}
              </div>

              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
                New from Robyn and Jess
              </p>

              {latestBlogPost ? (
                <>
                  <h3 className="text-2xl font-bold">
                    {latestBlogPost.title}
                  </h3>

                  <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-[#5f5b73]">
                    {latestBlogPost.excerpt}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#faf8f5] px-3 py-1 text-xs font-semibold text-[#6b6880]">
                      {latestBlogPost.readMinutes} min read
                    </span>

                    {latestBlogPost.audioUrl ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#f0fdfa] px-3 py-1 text-xs font-semibold text-[#0f766e]">
                        <Headphones size={12} />
                        Audio available
                      </span>
                    ) : null}
                  </div>

                  <Link
                    href={`/blog/${latestBlogPost.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
                  >
                    {latestBlogPost.audioUrl
                      ? "Read or listen"
                      : "Read article"}
                    <ArrowRight size={15} />
                  </Link>
                </>
              ) : (
                <p className="text-sm leading-relaxed text-[#5f5b73]">
                  New articles and conversations from Robyn and Jess
                  will appear here.
                </p>
              )}
            </section>
          </div>
        </section>

        <section className="mb-8 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-10">
          <div className="mb-8 max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Explore the Hive
            </p>

            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              Choose what would help today.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#6b6880] md:text-lg">
              There is no required order. Move between community,
              learning, practical tools and private resources as your
              work changes.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <DashboardCard
              icon={<UsersRound size={24} />}
              title="Community"
              text="Read questions, share ideas and connect with others doing similar work."
              href="/community"
              linkText="Visit community"
              featured
            />

            <DashboardCard
              icon={<Bookmark size={24} />}
              title="Saved items"
              text="Return to the articles, tools, webinars and resources you have saved around the Hive."
              href="/saved"
              linkText="View saved items"
            />

            <DashboardCard
              icon={<Video size={24} />}
              title="Webinars"
              text="Join live conversations and return to learning as new sessions are added."
              href="/webinars"
              linkText="View webinars"
            />

            <DashboardCard
              icon={<BookOpen size={24} />}
              title="Private member library"
              text="Access recordings, handouts, private tools and member resources available to you."
              href="/member-library"
              linkText="Open member library"
            />

            <DashboardCard
              icon={<ClipboardCheck size={24} />}
              title="Practical tools"
              text="Use preparation, planning and reflection tools before or after sessions."
              href="/tools"
              linkText="Open tools"
            />

            <DashboardCard
              icon={<Lightbulb size={24} />}
              title="Learning topics"
              text="Explore role confidence, communication, preparation and reflective practice."
              href="/topics"
              linkText="Browse topics"
            />

            <DashboardCard
              icon={<HeartHandshake size={24} />}
              title="Reflective support"
              text="Talk through difficult sessions, organise observations and prepare useful next steps."
              href="/reflective-practice"
              linkText="Explore reflective support"
            />
          </div>
        </section>

        {hasManagerAccess ? (
          <section className="mb-8 rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-7 shadow-sm md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                  Manager and team access
                </p>

                <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                  Support your AHA workforce.
                </h2>

                <p className="mt-4 text-base leading-relaxed text-[#3f5f5a]">
                  Explore onboarding, team learning, reflective
                  support, workforce resources and custom options for
                  your organisation.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <RoleLink
                  icon={<Building2 size={22} />}
                  title="Manager pathway"
                  text="Explore workforce development and team support options."
                  href="/manager-pathway"
                />

                <RoleLink
                  icon={<UsersRound size={22} />}
                  title="Team resources"
                  text="View resources for onboarding, planning and communication."
                  href="/resource-shop"
                />
              </div>
            </div>
          </section>
        ) : null}

        {hasAdminAccess ? (
          <section className="mb-8 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-10">
            <div className="grid gap-7 md:grid-cols-[auto_1fr_auto] md:items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <Settings size={27} />
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                  Administration
                </p>

                <h2 className="text-2xl font-bold">
                  Manage Allied Health Hive content and access.
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-[#6b6880]">
                  Open the administration area for webinars, users and
                  private resources.
                </p>
              </div>

              <Link
                href="/admin"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Open admin area
                <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        ) : null}

        <section className="rounded-4xl bg-[#1e1b2e] p-8 text-white shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#99f6e4]">
                Keep connected
              </p>

              <h2 className="text-3xl font-bold leading-tight md:text-5xl">
                The Hive is something you can return to, not something
                you need to finish.
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#d9d7e5] md:text-lg">
                Read a conversation, listen to an article, bring a
                question to a webinar or use one practical idea in your
                next session. The value grows through the conversations
                we have together.
              </p>
            </div>

            <Link
              href="/community"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
            >
              Go to the community
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}

function DashboardCard({
  icon,
  title,
  text,
  href,
  linkText,
  featured = false,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  href: string;
  linkText: string;
  featured?: boolean;
}) {
  return (
    <article
      className={`flex flex-col rounded-3xl border p-6 ${
        featured
          ? "border-[#99f6e4] bg-[#f0fdfa]"
          : "border-[#e8e4de] bg-[#faf8f5]"
      }`}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0f766e]">
        {icon}
      </div>

      <h3 className="mb-3 text-xl font-bold">
        {title}
      </h3>

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

function RoleLink({
  icon,
  title,
  text,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-3xl border border-[#99f6e4] bg-white p-5 transition hover:border-[#0f766e]"
    >
      <div className="mb-3 text-[#0f766e]">
        {icon}
      </div>

      <h3 className="mb-2 text-lg font-bold">
        {title}
      </h3>

      <p className="text-sm leading-relaxed text-[#6b6880]">
        {text}
      </p>
    </Link>
  );
}

function formatCommunityDate(date: string) {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function formatWebinarDate(date: string) {
  return new Intl.DateTimeFormat("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Australia/Brisbane",
  }).format(new Date(date));
}

function formatRole(role: string) {
  if (role === "superadmin") {
    return "Super administrator";
  }

  if (role === "admin") {
    return "Administrator";
  }

  if (role === "manager") {
    return "Manager";
  }

  if (role === "partner") {
    return "Hive Partner";
  }

  return "Learner";
}