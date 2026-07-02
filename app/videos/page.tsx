import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

const TOPIC_VIDEOS = [
  {
    module: "Core — Module 1: Foundations",
    topic: "Welcome to the Allied Health Assistant Role",
    duration: "~25 min",
    href: "/allied-health/foundations/welcome-to-aha-role",
    status: "Layout ready",
  },
];

export default async function VideosPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirect=/videos");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const firstName = profile?.full_name?.split(" ")[0] ?? "there";

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
            Academy videos
          </p>

          <h1 className="mb-3 text-4xl font-bold md:text-5xl">
            Welcome back, {firstName}
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-[#6b6880]">
            Course videos will appear here as each topic is approved and added.
          </p>
        </div>

        <div className="grid gap-6">
          {TOPIC_VIDEOS.map((video) => (
            <article
              key={video.topic}
              className="rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm"
            >
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#f0fdfa] px-4 py-2 text-xs font-semibold text-[#0f766e]">
                  {video.module}
                </span>

                <span className="rounded-full bg-[#faf8f5] px-4 py-2 text-xs font-semibold text-[#6b6880]">
                  {video.duration}
                </span>

                <span className="rounded-full bg-[#eef2ff] px-4 py-2 text-xs font-semibold text-[#3730a3]">
                  {video.status}
                </span>
              </div>

              <h2 className="mb-4 text-3xl font-bold">
                {video.topic}
              </h2>

              <div className="mb-6 flex aspect-video items-center justify-center rounded-3xl border border-dashed border-[#d8d2c8] bg-[#faf8f5] p-8 text-center">
                <div>
                  <p className="mb-2 text-sm font-semibold text-[#1e1b2e]">
                    Video placeholder
                  </p>
                  <p className="text-sm text-[#6b6880]">
                    Add the final video URL here when it is ready.
                  </p>
                </div>
              </div>

              <Link
                href={video.href}
                className="inline-block rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Open topic page
              </Link>
            </article>
          ))}
        </div>

        <section className="mt-8 rounded-3xl border border-[#e8e4de] bg-white p-8">
          <h2 className="mb-4 text-2xl font-bold">
            Future video areas
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Foundations",
              "Developmental milestones series",
              "Specialty tracks",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-5 text-sm font-semibold text-[#1e1b2e]"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}