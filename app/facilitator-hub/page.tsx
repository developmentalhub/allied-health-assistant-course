import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function FacilitatorHubPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/facilitator-hub");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  const displayName = profile?.full_name || user.email || "there";

  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-14 text-[#1e1b2e] md:py-20">
      <section className="mx-auto max-w-5xl">
        <div className="mb-10">
          <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Contributor area
          </p>

          <h1 className="mb-5 text-4xl font-bold leading-tight md:text-6xl">
            Welcome, {displayName}
          </h1>

          <p className="max-w-3xl text-xl leading-relaxed text-[#5f5b73]">
            This area is being rebuilt for future academy contributors,
            presenters, mentors and approved support roles. The old facilitator
            session and banking hub has been paused.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <HubCard
            title="Academy dashboard"
            description="Return to your main academy dashboard."
            href="/dashboard"
          />

          <HubCard
            title="Community hub"
            description="View the temporary academy community area."
            href="/community"
          />

          <HubCard
            title="First Allied Health topic"
            description="Open the first foundation topic page."
            href="/allied-health/foundations/welcome-to-aha-role"
          />

          <HubCard
            title="Contact"
            description="Contact Play Move Improve about future contributor access."
            href="/contact"
          />
        </div>

        <div className="mt-10 rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-3 text-2xl font-bold">Paused old facilitator tools</h2>

          <p className="text-lg leading-relaxed text-[#5f5b73]">
            Profile completion, session assignment, banking details,
            facilitator approvals and old session notes should stay paused until
            the academy contributor model is rebuilt properly.
          </p>
        </div>
      </section>
    </main>
  );
}

function HubCard({
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