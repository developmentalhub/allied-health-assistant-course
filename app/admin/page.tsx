import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirect=/admin");

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
      <section className="mx-auto max-w-5xl">
        <div className="mb-10">
          <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Admin area
          </p>

          <h1 className="mb-5 text-4xl font-bold leading-tight md:text-6xl">
            Academy admin dashboard
          </h1>

          <p className="max-w-3xl text-xl leading-relaxed text-[#5f5b73]">
            This admin area is being rebuilt for the Allied Health & Educator
            Resource Academy. The old Developmental Hub session, booking,
            facilitator and revenue panels have been paused.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <AdminCard
            title="Waitlist"
            description="Review academy waitlist interest while the platform is being rebuilt."
            href="/admin/waitlist"
          />

          <AdminCard
            title="Academy dashboard"
            description="Return to the learner dashboard and check the current academy flow."
            href="/dashboard"
          />

          <AdminCard
            title="First Allied Health topic"
            description="Open the first foundation topic page and review the learner experience."
            href="/allied-health/foundations/welcome-to-aha-role"
          />

          <AdminCard
            title="Community hub"
            description="View the temporary community hub layout."
            href="/community"
          />
        </div>

        <div className="mt-10 rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-3 text-2xl font-bold">Paused old admin areas</h2>

          <p className="text-lg leading-relaxed text-[#5f5b73]">
            Session management, facilitator approvals, bookings, affiliate
            tools, payment reports and old Developmental Hub admin panels should
            stay paused until the academy structure, Supabase tables and Stripe
            access model are rebuilt properly.
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
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <h2 className="mb-3 text-2xl font-bold text-[#1e1b2e]">{title}</h2>

      <p className="text-lg leading-relaxed text-[#5f5b73]">{description}</p>
    </Link>
  );
}