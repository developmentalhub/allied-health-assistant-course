import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Building2,
  CalendarDays,
  ClipboardCheck,
  HeartHandshake,
  Lightbulb,
  LockKeyhole,
  MessageCircleHeart,
  Settings,
  UsersRound,
  Video,
} from "lucide-react";
import { createClient } from "@/lib/supabase-server";

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
  const hasAdminAccess = role === "admin" || role === "superadmin";
  const hasManagerAccess =
    role === "manager" || role === "admin" || role === "superadmin";

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
                Choose the area that will help most with your work today.
              </p>

              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#5f5b73]">
                You can prepare for a session, explore practical ideas, revisit
                learning, reflect after a difficult moment or access your
                private member resources.
              </p>
            </div>

            <aside className="rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-6 md:p-8">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <LockKeyhole size={27} />
              </div>

              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Signed-in access
              </p>

              <h2 className="mb-4 text-2xl font-bold">
                Your Allied Health Hive home base
              </h2>

              <div className="grid gap-3 text-sm leading-relaxed text-[#3f5f5a]">
                <p>Signed in as {user.email}</p>
                <p>Account role: {formatRole(role)}</p>
                <p>Private areas will only appear where access applies.</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="mb-8 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-10">
          <div className="mb-8 max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Your main pathways
            </p>

            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              Start with the area that feels most relevant.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#6b6880] md:text-lg">
              There is no required order. Return to different areas as your
              sessions, questions and responsibilities change.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <DashboardCard
              icon={<BookOpen size={24} />}
              title="Private member library"
              text="Access webinars, recordings, handouts, private tools and member resources."
              href="/member-library"
              linkText="Open member library"
              featured
            />

            <DashboardCard
              icon={<Video size={24} />}
              title="Upcoming webinars"
              text="View live learning sessions covering practical AHA strategies and workforce development."
              href="/webinars"
              linkText="View webinars"
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
              icon={<MessageCircleHeart size={24} />}
              title="Reflective support"
              text="Talk through difficult sessions, organise observations and prepare useful next steps."
              href="/reflective-practice"
              linkText="Explore reflective support"
            />

            <DashboardCard
              icon={<UsersRound size={24} />}
              title="Community"
              text="Read updates, use practical tools and join conversations when you feel ready."
              href="/community"
              linkText="Visit community"
            />
          </div>
        </section>

        <section className="mb-8 grid gap-5 md:grid-cols-3">
          <QuickActionCard
            icon={<CalendarDays size={23} />}
            title="Prepare for learning"
            text="Check upcoming webinar dates and save the sessions that matter to you."
            href="/webinars"
          />

          <QuickActionCard
            icon={<HeartHandshake size={23} />}
            title="Reflect after a session"
            text="Use support that helps you learn without judging yourself."
            href="/reflective-practice"
          />

          <QuickActionCard
            icon={<Lightbulb size={23} />}
            title="Find a practical idea"
            text="Explore tools, topics and resources for your next session."
            href="/tools"
          />
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
                  Explore onboarding, team learning, reflective support,
                  workforce resources and custom options for your organisation.
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
                  Open the administration area for webinars, users and private
                  resources.
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
                Keep it practical
              </p>

              <h2 className="text-3xl font-bold leading-tight md:text-5xl">
                Use the Hive around the work you are already doing.
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#d9d7e5] md:text-lg">
                Open one tool, revisit one topic or prepare one question for
                your supervising professional. Small steps can make the next
                session feel much clearer.
              </p>
            </div>

            <Link
              href="/member-library"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
            >
              Open my learning hub
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

function QuickActionCard({
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
      className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm transition hover:border-[#0f766e]"
    >
      <div className="mb-4 text-[#0f766e]">{icon}</div>

      <h3 className="mb-2 text-xl font-bold">{title}</h3>

      <p className="text-sm leading-relaxed text-[#6b6880]">{text}</p>

      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
        Continue
        <ArrowRight size={14} />
      </span>
    </Link>
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
      <div className="mb-3 text-[#0f766e]">{icon}</div>

      <h3 className="mb-2 text-lg font-bold">{title}</h3>

      <p className="text-sm leading-relaxed text-[#6b6880]">{text}</p>
    </Link>
  );
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

  return "Learner";
}