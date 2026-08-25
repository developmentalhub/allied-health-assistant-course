'use client';

import { useEffect, useState, FormEvent } from 'react';

type Comment = {
  id: string;
  name: string;
  body: string;
  created_at: string;
};

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);

  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;

  const hours = Math.floor(mins / 60);

  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);

  if (days < 30) return `${days}d ago`;

  return new Date(iso).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function CommentSection({
  postSlug,
  postTitle,
}: {
  postSlug: string;
  postTitle?: string;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [hp, setHp] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justSubmitted, setJustSubmitted] = useState(false);

  async function loadComments() {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/blog/comments?postSlug=${encodeURIComponent(postSlug)}`,
      );

      const data = await res.json();

      if (res.ok) {
        setComments(data.comments || []);
      }
    } catch {
      // The article should still work normally if comments fail to load.
    }

    setLoading(false);
  }

  useEffect(() => {
    loadComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postSlug]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setError(null);
    setJustSubmitted(false);

    const trimmedName = name.trim();
    const trimmedBody = body.trim();

    if (trimmedName.length === 0) {
      setError('Pop your name in first so we know who is joining the chat.');
      return;
    }

    if (trimmedBody.length === 0) {
      setError('It looks like your comment is still empty.');
      return;
    }

    if (trimmedBody.length > 2000) {
      setError(
        'You have a lot to say, which we love, but could you shorten this one a little?',
      );
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/blog/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postSlug,
          postTitle,
          name: trimmedName.slice(0, 60),
          body: trimmedBody,
          hp,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));

        setError(
          data.error ||
            'Something went wrong posting your comment. Please try again.',
        );

        setSubmitting(false);
        return;
      }

      setName('');
      setBody('');
      setHp('');
      setJustSubmitted(true);
    } catch {
      setError(
        'Something went wrong posting your comment. Please try again.',
      );
    }

    setSubmitting(false);
  }

  return (
    <section aria-labelledby="comments-heading" className="mt-4">
      <div className="mb-5">
        <p className="hive-eyebrow">Over to you</p>

        <h2
          id="comments-heading"
          className="mt-2 font-display text-2xl font-semibold sm:text-3xl"
          style={{ color: 'var(--hive-ink)' }}
        >
          What do you think?
        </h2>

        <p
          className="mt-2 max-w-xl text-sm leading-relaxed"
          style={{ color: 'var(--hive-dusk)' }}
        >
          We&apos;d genuinely love to hear your take. Tell us what this brought
          up for you, share something that&apos;s worked in your sessions, or
          ask the question you&apos;re still sitting with.
        </p>

        <p
          className="mt-2 text-xs"
          style={{ color: 'var(--hive-dusk)' }}
        >
          {loading
            ? 'Loading the conversation…'
            : comments.length === 0
              ? 'No comments yet. You can be the first one in.'
              : `${comments.length} ${
                  comments.length === 1 ? 'comment' : 'comments'
                } so far`}
        </p>
      </div>

      {justSubmitted && (
        <div
          role="status"
          className="hive-comment-enter mb-5 rounded-2xl border px-4 py-4 text-sm leading-relaxed"
          style={{
            background: 'var(--hive-tape)',
            borderColor: 'var(--hive-border)',
            color: 'var(--hive-pine-dark)',
          }}
        >
          Thanks for joining in. Your comment has come through to us and is
          waiting for a quick check before it appears here.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border p-5 sm:p-6"
        style={{
          background: 'var(--hive-card)',
          borderColor: 'var(--hive-border)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 1,
            height: 1,
            overflow: 'hidden',
            clip: 'rect(0,0,0,0)',
          }}
        >
          <label htmlFor="website">Leave this field blank</label>

          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
          />
        </div>

        <div className="grid gap-4">
          <div>
            <label htmlFor="name" className="hive-eyebrow mb-2 block">
              Your name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First name is completely fine"
              maxLength={60}
              className="w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:ring-2"
              style={{
                borderColor: 'var(--hive-border)',
              }}
            />
          </div>

          <div>
            <label
              htmlFor="comment-body"
              className="hive-eyebrow mb-2 block"
            >
              Add to the conversation
            </label>

            <textarea
              id="comment-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="What are you thinking after reading this?"
              rows={5}
              maxLength={2000}
              className="w-full resize-y rounded-xl border bg-white px-4 py-3 text-sm leading-relaxed outline-none transition focus:ring-2"
              style={{
                borderColor: 'var(--hive-border)',
              }}
            />
          </div>
        </div>

        {error && (
          <p
            role="alert"
            className="mt-3 text-sm leading-relaxed"
            style={{ color: '#B4472C' }}
          >
            {error}
          </p>
        )}

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <p
            className="max-w-md text-xs leading-relaxed"
            style={{ color: 'var(--hive-dusk)' }}
          >
            No account needed. We just check comments before they appear
            publicly so this stays a thoughtful, respectful space.
          </p>

          <button
            type="submit"
            disabled={submitting}
            className="shrink-0 rounded-full px-5 py-2.5 text-sm font-medium text-white transition disabled:opacity-60"
            style={{ background: 'var(--hive-pine)' }}
          >
            {submitting ? 'Sending…' : 'Join the conversation'}
          </button>
        </div>
      </form>

      {!loading && comments.length > 0 && (
        <div className="mt-8">
          <p className="hive-eyebrow mb-4">From the Hive</p>

          <ul className="space-y-4">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="rounded-2xl border p-5"
                style={{
                  background: 'var(--hive-card)',
                  borderColor: 'var(--hive-border)',
                }}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span
                    className="font-medium"
                    style={{ color: 'var(--hive-ink)' }}
                  >
                    {comment.name}
                  </span>

                  <time
                    dateTime={comment.created_at}
                    className="hive-eyebrow shrink-0"
                    style={{ letterSpacing: '0.08em' }}
                  >
                    {timeAgo(comment.created_at)}
                  </time>
                </div>

                <p
                  className="mt-3 whitespace-pre-wrap text-sm leading-relaxed"
                  style={{ color: 'var(--hive-ink)' }}
                >
                  {comment.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}