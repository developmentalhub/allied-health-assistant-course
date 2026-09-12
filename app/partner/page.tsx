import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ClipboardList,
  Lightbulb,
  MessageCircle,
  MessagesSquare,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

import { createClient } from "@/lib/supabase-server";

function formatRole(role: string | null) {
  if (role === "partner") return "Hive Partner";
  if (role === "superadmin") return "Superadmin";
  if (role === "admin") return "Admin";
  return "Member";
}

export default async function PartnerDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/partner");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .maybeSingle();

  const allowedRoles = ["partner", "admin", "superadmin"];

  if (!profile?.role || !allowedRoles.includes(profile.role)) {
    redirect("/dashboard");
  }

  const firstName =
    profile.full_name?.split(" ")[0] ||
    user.user_metadata?.full_name?.split(" ")[0] ||
    "there";

  return (
    <main className="min-h-screen bg-[#fffaf3] px-5 py-10 text-[#1e1b2e] sm:px-6 md:py-16">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-4xl border border-[#f4d9a6] bg-linear-to-br from-[#fff7df] via-white to-[#f0fdfa] p-7 shadow-sm md:p-10">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                <ShieldCheck size={18} />
                Allied Health Hive Management
              </div>

              <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                Welcome back, {firstName}.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#5f5b73] md:text-lg">
                This is your place to keep a close eye on what is happening
                across the Hive, listen to what members are asking for and help
                shape the conversations, webinars and resources we create next.
              </p>
            </div>

            <div className="rounded-3xl border border-[#99f6e4] bg-white px-5 py-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Your access
              </p>

              <p className="mt-1 text-lg font-bold text-[#1e1b2e]">
                {formatRole(profile.role)}
              </p>

              <p className="mt-1 text-sm leading-relaxed text-[#6b6880]">
                Community, member and workforce visibility.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Manage the Hive
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              What would you like to look at?
            </h2>

            <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#6b6880]">
              These areas give you a clear picture of the people joining the
              Hive, the questions being asked and the ideas worth exploring
              next.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <ManagementCard
              href="/partner/webinar-registrations"
              icon={<UsersRound size={24} />}
              eyebrow="People"
              title="Webinar registrations"
              description="See who has registered for Allied Health Hive webinars, including their names, email addresses and other registration details."
              action="View registrations"
            />

            <ManagementCard
              href="/partner/hive-questions"
              icon={<MessagesSquare size={24} />}
              eyebrow="Community listening"
              title="Hive questions"
              description="Read the questions people are sending through and notice the themes that could guide future webinars, discussions and resources."
              action="Read questions"
            />

            <ManagementCard
              href="/community"
              icon={<MessageCircle size={24} />}
              eyebrow="Community"
              title="Join the conversation"
              description="Post in the Hive, reply to community members and take part in the conversations happening across the community."
              action="Open community"
            />

            <ManagementCard
              href="/partner/ideas"
              icon={<Lightbulb size={24} />}
              eyebrow="Planning"
              title="Ideas board"
              description="Add ideas for future webinars, blog articles, community questions and other things you think the Hive should explore."
              action="Add an idea"
            />

            <ManagementCard
              href="/webinars"
              icon={<CalendarDays size={24} />}
              eyebrow="Learning"
              title="Webinars"
              description="See upcoming and previous webinar information and keep track of what the Hive is teaching next."
              action="View webinars"
            />

            <ManagementCard
              href="/member-library"
              icon={<BookOpen size={24} />}
              eyebrow="Member experience"
              title="Member library"
              description="See the learning experience from a member's perspective and review what is currently available inside the Hive."
              action="Preview library"
            />

            <ManagementCard
              href="/partner/manager-enquiries"
              icon={<ClipboardList size={24} />}
              eyebrow="Workforce"
              title="Manager enquiries"
              description="See organisations and managers who have reached out about supporting their Allied Health Assistant workforce."
              action="View enquiries"
            />
          </div>
        </section>

        <section className="mt-10 rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-7 md:p-9">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Help shape what comes next
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                You do not need to wait for a planning meeting to capture an
                idea.
              </h2>

              <p className="mt-3 text-base leading-relaxed text-[#3f5f5a]">
                When you notice a good webinar topic, blog idea, recurring
                question or something worth discussing with the community, add
                it to the ideas board so Robyn and Jess can keep building from
                what people actually need.
              </p>
            </div>

            <Link
              href="/partner/ideas"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
            >
              Add an idea
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function ManagementCard({
  href,
  icon,
  eyebrow,
  title,
  description,
  action,
}: {
  href: string;
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  action: string;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-4xl border border-[#e8e4de] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#99f6e4] hover:shadow-md"
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
        {icon}
      </div>

      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
        {eyebrow}
      </p>

      <h3 className="mt-2 text-xl font-bold">{title}</h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-[#6b6880]">
        {description}
      </p>

      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
        {action}
        <ArrowRight
          size={15}
          className="transition-transform group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}