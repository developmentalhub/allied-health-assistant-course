import Link from "next/link";

const posts = [
  {
    name: "Robyn",
    role: "Host",
    type: "Welcome post",
    title: "Welcome to the AHA Community Hub",
    body: "This space is for member posts, photos, questions and updates.",
    meta: "Pinned",
  },
  {
    name: "Monthly Zoom",
    role: "Live session",
    type: "Upcoming",
    title: "Next live Zoom",
    body: "Add the Zoom topic, date, time and access link here.",
    meta: "Member-only",
  },
  {
    name: "Recording Library",
    role: "Replay",
    type: "Saved recording",
    title: "Saved recordings",
    body: "Add Google Drive, private YouTube or Patreon recording links here.",
    meta: "Member-only",
  },
];

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm font-semibold text-[#0f766e] hover:underline"
          >
            ← Back to academy
          </Link>
        </div>

        <div className="mb-10 rounded-3xl border border-[#e8e4de] bg-white p-8 md:p-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
            Monthly membership
          </p>

          <h1 className="mb-5 text-4xl font-bold md:text-5xl">
            AHA Community Hub
          </h1>

          <div className="max-w-3xl space-y-3 text-base leading-relaxed text-[#6b6880]">
            <p>
              A private space for AHAs to connect.
            </p>
            <p>
              Monthly live Zooms.
            </p>
            <p>
              Saved recordings.
            </p>
            <p>
              A simple member feed for posts, photos, questions and updates.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Feed */}
          <section className="space-y-5">
            <div className="rounded-3xl border border-[#e8e4de] bg-white p-6">
              <label
                htmlFor="community-post"
                className="mb-3 block text-sm font-semibold text-[#1e1b2e]"
              >
                Start a post
              </label>

              <textarea
                id="community-post"
                rows={4}
                placeholder="Write a question, update, reflection or idea..."
                className="w-full resize-none rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-4 text-sm outline-none focus:border-[#0f766e]"
              />

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <button className="rounded-full border border-[#e8e4de] bg-white px-4 py-2 text-xs font-semibold text-[#6b6880]">
                    Add photo
                  </button>
                  <button className="rounded-full border border-[#e8e4de] bg-white px-4 py-2 text-xs font-semibold text-[#6b6880]">
                    Add link
                  </button>
                </div>

                <button className="rounded-full bg-[#0f766e] px-5 py-2 text-sm font-semibold text-white">
                  Post
                </button>
              </div>
            </div>

            {posts.map((post) => (
              <article
                key={post.title}
                className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-[#1e1b2e]">
                      {post.name}
                    </p>
                    <p className="text-xs text-[#6b6880]">
                      {post.role}
                    </p>
                  </div>

                  <span className="rounded-full bg-[#f0fdfa] px-3 py-1 text-xs font-semibold text-[#0f766e]">
                    {post.type}
                  </span>
                </div>

                <h2 className="mb-3 text-xl font-bold">
                  {post.title}
                </h2>

                <p className="mb-5 text-sm leading-relaxed text-[#6b6880]">
                  {post.body}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e8e4de] pt-4">
                  <div className="flex gap-2">
                    <button className="rounded-full bg-[#faf8f5] px-4 py-2 text-xs font-semibold text-[#6b6880]">
                      Like
                    </button>
                    <button className="rounded-full bg-[#faf8f5] px-4 py-2 text-xs font-semibold text-[#6b6880]">
                      Comment
                    </button>
                    <button className="rounded-full bg-[#faf8f5] px-4 py-2 text-xs font-semibold text-[#6b6880]">
                      Save
                    </button>
                  </div>

                  <p className="text-xs font-semibold text-[#b0acbf]">
                    {post.meta}
                  </p>
                </div>
              </article>
            ))}
          </section>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="rounded-3xl border border-[#e8e4de] bg-white p-6">
              <h2 className="mb-4 text-xl font-bold">
                Member spaces
              </h2>

              <div className="space-y-3">
                {[
                  "Community feed",
                  "Monthly Zooms",
                  "Recording library",
                  "Shared resources",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-sm font-semibold text-[#1e1b2e]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[#e8e4de] bg-white p-6">
              <h2 className="mb-4 text-xl font-bold">
                Access links
              </h2>

              <div className="space-y-3">
                <a
                  href="#"
                  className="block rounded-full bg-[#0f766e] px-5 py-3 text-center text-sm font-semibold text-white"
                >
                  Add Zoom link
                </a>

                <a
                  href="#"
                  className="block rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-5 py-3 text-center text-sm font-semibold text-[#0f766e]"
                >
                  Add recording link
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-[#e8e4de] bg-[#1e1b2e] p-6 text-white">
              <h2 className="mb-3 text-xl font-bold">
                Later build option
              </h2>

              <p className="text-sm leading-relaxed text-[#d9d7e5]">
                This can later connect to Supabase tables for real posts,
                comments, likes, photo uploads and member-only access.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}