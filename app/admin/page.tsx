import Link from "next/link";
import {
  BookOpen,
  ClipboardList,
  FileText,
  MessageCircleHeart,
  Settings,
  UsersRound,
  Video,
} from "lucide-react";

const adminLinks = [
  {
    href: "/admin/webinars",
    title: "Webinars",
    description: "Create, edit and manage webinar details, Zoom links and recordings.",
    icon: Video,
  },
  {
    href: "/admin/resources",
    title: "Resources",
    description: "Manage PDFs and resources for the member library.",
    icon: FileText,
  },
  {
    href: "/admin/manager-requests",
    title: "Manager requests",
    description: "View team quote requests, team size, disciplines and support preferences.",
    icon: UsersRound,
  },
  {
    href: "/admin/reflective-practice",
    title: "Reflective practice requests",
    description: "View 1:1 reflective support requests and preferred provider details.",
    icon: MessageCircleHeart,
  },
  {
    href: "/admin/register",
    title: "Create admin account",
    description: "Create an admin login for someone who needs access.",
    icon: Settings,
  },
  {
    href: "/member-library",
    title: "Member library",
    description: "Preview what members see inside the AHA Professional Development library.",
    icon: BookOpen,
  },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-12 text-[#1e1b2e]">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Admin dashboard
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Allied Health Hive admin
          </h1>

          <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#6b6880]">
            Manage webinars, resources, manager requests and 1:1 reflective
            practice enquiries from one place.
          </p>
        </div>

        <div className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
          <div className="flex gap-3">
            <ClipboardList
              size={22}
              className="mt-0.5 shrink-0 text-[#0f766e]"
            />

            <div>
              <p className="mb-1 text-sm font-semibold text-[#0f766e]">
                Lead checks
              </p>

              <p className="text-sm leading-relaxed text-[#3f5f5a]">
                Check manager requests and reflective practice requests after
                testing the public forms.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {adminLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm transition hover:border-[#0f766e] hover:bg-[#f0fdfa]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                  <Icon size={24} />
                </div>

                <h2 className="mb-2 text-xl font-bold">{item.title}</h2>

                <p className="text-sm leading-relaxed text-[#6b6880]">
                  {item.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}