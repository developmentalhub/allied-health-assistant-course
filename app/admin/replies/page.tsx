import { createClient } from "@supabase/supabase-js";
import { Check, Clock, MessageCircle, X } from "lucide-react";
import { approveReply, declineReply } from "./actions";

export const dynamic = "force-dynamic";

type PostContext = { author: string; body: string };

type PendingReply = {
  id: string;
  post_id: string;
  author: string;
  body: string;
  status: string;
  created_at: string;
  community_posts: PostContext | PostContext[] | null;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("en-AU", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

const postOf = (reply: PendingReply): PostContext | null => {
  const value = reply.community_posts;
  if (!value) return null;
  return Array.isArray(value) ? value[0] ?? null : value;
};

export default async function AdminRepliesPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data, error } = await supabase
    .from("community_replies")
    .select(
      "id, post_id, author, body, status, created_at, community_posts(author, body)"
    )
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  const replies = (data ?? []) as PendingReply[];

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto max-w-4xl px-6 py-8 md:py-10">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#0f766e]">
              Moderation
            </p>
            <h1 className="text-3xl font-bold leading-tight md:text-4xl">
              Pending replies
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-[#6b6880]">
              Approved replies appear publicly in the community feed. Declined
              replies stay hidden.
            </p>
          </div>

          <span className="shrink-0 text-sm font-semibold text-[#6b6880]">
            {replies.length} pending
          </span>
        </div>

        {error ? (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error.message}
          </div>
        ) : null}

        {replies.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#d8d3cb] bg-white/50 py-16 text-center text-sm text-[#6b6880]">
            Nothing waiting for review. You&apos;re all caught up.
          </div>
        ) : (
          <div className="space-y-4">
            {replies.map((reply) => {
              const post = postOf(reply);

              return (
                <article
                  key={reply.id}
                  className="rounded-3xl border border-[#e8e4de] bg-white p-5 shadow-sm"
                >
                  {post ? (
                    <div className="mb-4 rounded-2xl border border-[#e8e4de] bg-[#faf8f5] p-4">
                      <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-[#0f766e]">
                        <MessageCircle size={13} />
                        Replying to {post.author}
                      </div>
                      <p className="line-clamp-3 whitespace-pre-wrap text-sm leading-relaxed text-[#6b6880]">
                        {post.body}
                      </p>
                    </div>
                  ) : null}

                  <div className="mb-2 flex items-center gap-2">
                    <p className="font-bold">{reply.author}</p>
                    <span className="inline-flex items-center gap-1 text-xs text-[#9a97a8]">
                      <Clock size={11} />
                      {formatDate(reply.created_at)}
                    </span>
                  </div>

                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#4b4860]">
                    {reply.body}
                  </p>

                  <div className="mt-4 flex gap-3">
                    <form action={approveReply}>
                      <input type="hidden" name="id" value={reply.id} />
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-full bg-[#0f766e] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
                      >
                        <Check size={15} />
                        Approve
                      </button>
                    </form>

                    <form action={declineReply}>
                      <input type="hidden" name="id" value={reply.id} />
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-full border border-[#e8e4de] bg-white px-5 py-2.5 text-sm font-semibold text-[#6b6880] transition hover:bg-[#faf8f5]"
                      >
                        <X size={15} />
                        Decline
                      </button>
                    </form>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}