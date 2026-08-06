import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  FileText,
  MessageCircleHeart,
  Settings,
  ShieldCheck,
  UsersRound,
  Video,
} from "lucide-react";

const adminSections = [
  {
    href: "/admin/webinars",
    title: "Webinars",
    description:
      "Create and update webinar dates, descriptions, Zoom links, recordings and member handouts.",
    icon: Video,
    label: "Learning delivery",
  },
  {
    href: "/admin/resources",
    title: "Member resources",
    description:
      "Manage PDFs, practical resources and downloadable content for the private member library.",
    icon: FileText,
    label: "Resource library",
  },
  {
    href: "/admin/manager-requests",
    title: "Manager enquiries",
    description:
      "Review requests from managers, supervisors, clinic owners and organisations seeking team support.",
    icon: UsersRound,
    label: "Workforce enquiries",
  },
  {
    href: "/admin/reflective-practice",
    title: "Reflective practice requests",
    description:
      "Review submitted reflections and enquiries for individual professional support.",
    icon: MessageCircleHeart,
    label: "Individual support",
  },
  {
    href: "/member-library",
    title: "Preview member library",
    description:
      "Open the private learning hub and check what signed-in members can currently access.",
    icon: BookOpen,
    label: "Member experience",
  },
  {
    href: "/admin/register",
    title: "Authorised admin registration",
    description:
      "Create an approved administration account for a trusted Allied Health Hive team member.",
    icon: Settings,
    label: "Administration",
  },
];

const routineChecks = [
  "Review new manager and organisation enquiries",
  "Check reflective practice submissions",
  "Confirm upcoming webinar dates and joining links",
  "Check that recordings and handouts open correctly",
  "Preview the member library after publishing changes",
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#fffaf3] px-5 py-12 text-[#1e1b2e] sm:px-6 md:py-20">
      <section className="mx-auto max-w-7xl">
        <section className="mb-8 overflow-hidden rounded-4xl border border-[#f4d9a6] bg-white shadow-sm">
          <div className="grid gap-8 bg-linear-to-br from-[#fff7df] via-white to-[#f0fdfa] p-7 md:p-12 lg:grid-cols-[1fr_0.7fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
                Allied Health Hive | Administration
              </p>

              <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
                Manage learning, resources and workforce enquiries.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#5f5b73] md:text-xl">
                Use this dashboard to manage the private areas of Allied Health
                Hive and respond to the people seeking support.
              </p>

              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#5f5b73]">
                Start with enquiries that need a response, then check webinar
                access, member resources and the public experience after making
                changes.
              </p>
            </div>

            <aside className="rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-6 md:p-8">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <ShieldCheck size={27} />
              </div>

              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Protected administration area
              </p>

              <h2 className="mb-4 text-2xl font-bold">
                Approved team access only
              </h2>

              <p className="text-sm leading-relaxed text-[#3f5f5a]">
                This area may contain private member information, enquiry
                details, webinar links and internal administration functions.
                Only approved administrators should access or share this
                information.
              </p>
            </aside>
          </div>
        </section>

        <section className="mb-8 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-10">
          <div className="mb-8 max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Administration areas
            </p>

            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              Choose what you need to manage.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#6b6880]">
              Each section opens the relevant administration page or private
              member view.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {adminSections.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex flex-col rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6 transition hover:border-[#0f766e] hover:bg-white"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0f766e]">
                    <Icon size={24} />
                  </div>

                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
                    {item.label}
                  </p>

                  <h3 className="mb-3 text-xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mb-5 flex-1 text-sm leading-relaxed text-[#6b6880]">
                    {item.description}
                  </p>

                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
                    Open section
                    <ArrowRight
                      size={15}
                      className="transition group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <article className="rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-7 shadow-sm md:p-9">
            <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-full bg-white text-[#0f766e]">
              <ClipboardList size={25} />
            </div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Suggested order
            </p>

            <h2 className="text-3xl font-bold">
              Check people before content.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#3f5f5a]">
              Begin with submissions that may be waiting for a response. Then
              review upcoming learning and resource access.
            </p>
          </article>

          <article className="rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-9">
            <h2 className="mb-6 text-2xl font-bold">
              Routine administration checks
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {routineChecks.map((item, index) => (
                <div
                  key={item}
                  className="flex gap-4 rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0f766e] text-sm font-bold text-white">
                    {index + 1}
                  </div>

                  <p className="text-sm font-semibold leading-relaxed text-[#1e1b2e]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mb-8 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-10">
          <div className="grid gap-7 md:grid-cols-[auto_1fr_auto] md:items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <BookOpen size={27} />
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Member experience check
              </p>

              <h2 className="text-2xl font-bold">
                Preview the learning hub after making changes.
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-[#6b6880]">
                Check headings, links, webinar dates, recordings and handouts
                from the member’s point of view.
              </p>
            </div>

            <Link
              href="/member-library"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
            >
              Preview library
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section className="rounded-4xl bg-[#1e1b2e] p-8 text-white shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#99f6e4]">
                Public website
              </p>

              <h2 className="text-3xl font-bold leading-tight md:text-5xl">
                Check the public pathway before finishing.
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#d9d7e5] md:text-lg">
                Make sure visitors can still understand what Allied Health Hive
                offers, find the free webinar, access practical tools and reach
                the right contact pathway.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
            >
              View public website
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}