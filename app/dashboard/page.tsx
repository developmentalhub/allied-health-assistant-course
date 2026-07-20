import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirect=/dashboard");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const displayName = profile?.full_name || user.email || "there";

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
            Academy dashboard
          </p>

          <h1 className="mb-3 text-4xl font-bold md:text-5xl">
            Welcome back, {displayName}
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-[#6b6880]">
            Choose the area you want to open.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <section className="rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0fdfa]">
              <span className="text-sm font-bold text-[#0f766e]">AHA</span>
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
              Allied Health pathway
            </p>

            <h2 className="mb-5 text-3xl font-bold">Allied Health</h2>

            <div className="space-y-3 text-sm leading-relaxed text-[#6b6880]">
              <p>Foundation role clarity topics</p>
              <p>Reflective professional development</p>
              <p>Community support</p>
              <p>Future AHA resources and tools</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/topics"
                className="rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Open AHA topics
              </Link>

              <Link
                href="/community"
                className="rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-6 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
              >
                Open community hub
              </Link>
            </div>
          </section>

          <section className="rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef2ff]">
              <span className="text-sm font-bold text-[#3730a3]">EDU</span>
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#3730a3]">
              Educator pathway
            </p>

            <h2 className="mb-5 text-3xl font-bold">Educator</h2>

            <div className="space-y-3 text-sm leading-relaxed text-[#6b6880]">
              <p>Educator pathway</p>
              <p>Joyful Educator tools</p>
              <p>Movement and regulation resources</p>
              <p>Future educator modules</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/educator"
                className="rounded-full bg-[#3730a3] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2e288a]"
              >
                Open educator pathway
              </Link>

              <a
                href="https://pmi-joyful-educator.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[#c7d2fe] bg-[#eef2ff] px-6 py-3 text-sm font-semibold text-[#3730a3] transition hover:bg-[#e0e7ff]"
              >
                Open current Joyful Educator site
              </a>
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-3xl border border-[#e8e4de] bg-white p-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#6b6880]">
            Private access area
          </p>

          <h2 className="mb-5 text-3xl font-bold">AHA Community Hub</h2>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              "Community feed",
              "Webinar updates",
              "Recording library",
              "Shared resources",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-5 text-sm font-semibold text-[#1e1b2e]"
              >
                {item}
              </div>
            ))}
          </div>

          <Link
            href="/community"
            className="mt-8 inline-block rounded-full bg-[#1e1b2e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3730a3]"
          >
            View community hub
          </Link>
        </section>
      </section>
    </main>
  );
}