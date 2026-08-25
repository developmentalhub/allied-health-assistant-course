import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-posts';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Allied Health Blog',
  description:
    'Practical conversations for Allied Health Assistants, Allied Health Professionals and allied health teams about real sessions, supervision, delegation, emotional regulation, confidence, communication and the everyday challenges of allied health work.',

  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },

  openGraph: {
    title: 'Allied Health Blog | Allied Health Hive',
    description:
      'Real conversations and practical ideas for Allied Health Assistants, Allied Health Professionals and allied health teams.',
    url: `${siteConfig.url}/blog`,
    siteName: 'Allied Health Hive',
    locale: 'en_AU',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Allied Health Blog | Allied Health Hive',
    description:
      'Real conversations and practical ideas for Allied Health Assistants, Allied Health Professionals and allied health teams.',
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogIndexPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
      <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:gap-8 sm:text-left">
        <img
          src="https://aracabetvunmirlfgylv.supabase.co/storage/v1/object/public/website-images/Headshots/allied-health-hive-blog.png"
          alt="Jess Foster and Robyn Papworth from Allied Health Hive"
          className="h-32 w-32 shrink-0 rounded-full border-4 object-cover sm:h-40 sm:w-40"
          style={{ borderColor: 'var(--hive-tape)' }}
        />

        <div>
          <p className="hive-eyebrow">Hey, it&apos;s Jess and Robyn</p>

          <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">
            Grab a cuppa, you&apos;re in the right place
          </h1>

          <p
            className="mt-4 max-w-xl text-base leading-relaxed"
            style={{ color: 'var(--hive-ink)' }}
          >
            This is where we talk through the real stuff. The sessions that
            threw us, the wins, the questions that come up between Allied
            Health Assistants and Allied Health Professionals, and the things
            nobody really prepares you for when you start working in allied
            health. Read a bit, join the conversation, or just sit with a
            coffee and know you&apos;re not doing this alone.
          </p>
        </div>
      </div>

      <div className="my-10 text-center text-2xl" aria-hidden="true">
        🐝
      </div>

      <ul className="space-y-6">
        {blogPosts
          .slice()
          .sort((a, b) => (a.date < b.date ? 1 : -1))
          .map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block rounded-xl border p-5 transition hover:shadow-sm sm:p-6"
                style={{
                  background: 'var(--hive-card)',
                  borderColor: 'var(--hive-border)',
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="hive-eyebrow rounded-full px-2.5 py-1"
                    style={{
                      background: 'var(--hive-tape)',
                      color: 'var(--hive-pine-dark)',
                    }}
                  >
                    {post.tag}
                  </span>

                  <span
                    className="hive-eyebrow"
                    style={{ color: 'var(--hive-dusk)' }}
                  >
                    {new Date(post.date).toLocaleDateString('en-AU', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}{' '}
                    · {post.readMinutes} min read
                  </span>
                </div>

                <h2
                  className="mt-3 font-display text-2xl font-semibold"
                  style={{ color: 'var(--hive-ink)' }}
                >
                  {post.title}
                </h2>

                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: 'var(--hive-ink)' }}
                >
                  {post.excerpt}
                </p>

                <span className="hive-link mt-3 inline-block text-sm font-medium">
                  Read the post →
                </span>
              </Link>
            </li>
          ))}
      </ul>
    </main>
  );
}