import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  CalendarDays,
  FileText,
  LayoutDashboard,
  MessageSquareText,
  Users,
} from "lucide-react";
import { createClient } from "@/lib/supabase-server";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/admin");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin" && profile?.role !== "superadmin") {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-14 text-[#1e1b2e] md:py-20">
      <section className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Admin area
            </p>

            <h1 className="mb-5 text-4xl font-bold leading-tight md:text-6xl">
              AHA Professional Development dashboard
            </h1>

            <p className="max-w-3xl text-xl leading-relaxed text-[#5f5b73]">
              A simple internal space for Robyn, Jess and approved team members
              to keep track of monthly webinars, PDF resources, recordings,
              reflective practice sessions and clinic enquiries.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#e8e4de] bg-white px-5 py-3 text-sm font-semibold text-[#1e1b2e] shadow-sm transition hover:bg-[#f0fdfa]"
          >
            Learner dashboard
            <ArrowRight size={15} />
          </Link>
        </div>

        <section className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-8 shadow-sm md:p-10">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
            <CalendarDays size={24} />
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
            Next webinar
          </p>

          <h2 className="mb-4 text-3xl font-bold">
            Tuesday 4 August 2026 — Free launch webinar
          </h2>

          <p className="mb-6 max-w-3xl text-base leading-relaxed text-[#3f5f5a]">
            This is the free promotional session before the $57/month AHA
            Professional Development Membership begins billing on Tuesday 1
            September 2026. Use this admin area to keep the topic, PDF resources,
            Zoom link and recording link organised.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[#99f6e4] bg-white p-5">
              <p className="mb-1 text-sm font-semibold text-[#0f766e]">
                Time
              </p>
              <p className="text-sm text-[#6b6880]">12pm to 1pm QLD time</p>
            </div>

            <div className="rounded-2xl border border-[#99f6e4] bg-white p-5">
              <p className="mb-1 text-sm font-semibold text-[#0f766e]">
                PDF resources
              </p>
              <p className="text-sm text-[#6b6880]">Coming soon</p>
            </div>

            <div className="rounded-2xl border border-[#99f6e4] bg-white p-5">
              <p className="mb-1 text-sm font-semibold text-[#0f766e]">
                Recording
              </p>
              <p className="text-sm text-[#6b6880]">Added after webinar</p>
            </div>
          </div>
        </section>

        <div className="grid gap-5 md:grid-cols-2">
          <AdminCard
            title="Webinars"
            description="View and manage upcoming webinar topics, dates, Zoom links, PDF resource links and recording links."
            href="/admin/webinars"
            icon={<CalendarDays size={24} />}
          />

          <AdminCard
            title="PDF resources"
            description="Keep track of the PDF documents added for each monthly webinar topic."
            href="/admin/resources"
            icon={<FileText size={24} />}
          />

          <AdminCard
            title="Reflective practice requests"
            description="Review 1:1 reflective practice requests and keep the team calendar visible."
            href="/admin/reflective-practice"
            icon={<MessageSquareText size={24} />}
          />

          <AdminCard
            title="Manager and clinic enquiries"
            description="See team pathway requests, clinic interest and possible group membership enquiries."
            href="/admin/manager-requests"
            icon={<Users size={24} />}
          />

          <AdminCard
            title="Waitlist"
            description="Review AHA Professional Development waitlist interest while the platform is being built."
            href="/admin/waitlist"
            icon={<Users size={24} />}
          />

          <AdminCard
            title="Community hub"
            description="Open the community area and check the current public member experience."
            href="/community"
            icon={<MessageSquareText size={24} />}
          />
        </div>

        <div className="mt-10 rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
            <LayoutDashboard size={24} />
          </div>

          <h2 className="mb-3 text-2xl font-bold">
            Google Calendar placeholder
          </h2>

          <p className="mb-6 text-lg leading-relaxed text-[#5f5b73]">
            For the cleanest MVP, keep Google Calendar as a simple team link
            first. Later, this can be upgraded to show 1:1 reflective practice
            sessions directly inside the admin portal.
          </p>

          <a
            href="https://calendar.google.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0f766e] px-5 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#f0fdfa]"
          >
            Open Google Calendar
            <ArrowRight size={15} />
          </a>
        </div>

        <div className="mt-8 rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-3 text-2xl font-bold">Paused old admin areas</h2>

          <p className="text-lg leading-relaxed text-[#5f5b73]">
            Session management, facilitator approvals, bookings, affiliate
            tools, payment reports and old admin panels should stay paused until
            the AHA Professional Development structure, Supabase tables and
            Stripe membership access model are rebuilt properly.
          </p>
        </div>
      </section>
    </main>
  );
}

function AdminCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
        {icon}
      </div>

      <h2 className="mb-3 text-2xl font-bold text-[#1e1b2e]">{title}</h2>

      <p className="mb-5 text-lg leading-relaxed text-[#5f5b73]">
        {description}
      </p>

      <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
        Open
        <ArrowRight size={15} />
      </span>
    </Link>
  );
}