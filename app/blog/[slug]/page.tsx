import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Headphones } from 'lucide-react';
import { getPostBySlug, getAllPostSlugs } from '@/lib/blog-posts';
import { siteConfig } from '@/lib/site';
import ArticleBody from '@/components/blog/ArticleBody';
import CommentSection from '@/components/blog/CommentSection';

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const canonicalUrl = `${siteConfig.url}/blog/${post.slug}`;
  const seoTitle = post.seoTitle || post.title;
  const seoDescription = post.seoDescription || post.excerpt;
  const publishedTime = new Date(post.date).toISOString();
  const modifiedTime = new Date(
    post.updatedDate || post.date,
  ).toISOString();

  return {
    title: seoTitle,
    description: seoDescription,

    keywords: post.keywords,

    authors: [
      {
        name: 'Jess Foster',
      },
      {
        name: 'Robyn Papworth',
      },
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      siteName: 'Allied Health Hive',
      locale: 'en_AU',
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: ['Jess Foster', 'Robyn Papworth'],
      tags: [
        post.tag,
        ...(post.keywords || []),
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleUrl = `${siteConfig.url}/blog/${post.slug}`;
  const publishedDate = new Date(post.date).toISOString();
  const modifiedDate = new Date(
    post.updatedDate || post.date,
  ).toISOString();

  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    datePublished: publishedDate,
    dateModified: modifiedDate,

    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },

    author: [
      {
        '@type': 'Person',
        name: 'Jess Foster',
      },
      {
        '@type': 'Person',
        name: 'Robyn Papworth',
      },
    ],

    publisher: {
      '@type': 'Organization',
      name: 'Allied Health Hive',
      url: siteConfig.url,
    },

    about: [
      {
        '@type': 'Thing',
        name: post.tag,
      },
      ...(post.keywords || []).map((keyword) => ({
        '@type': 'Thing',
        name: keyword,
      })),
    ],

    keywords: post.keywords?.join(', '),

    inLanguage: 'en-AU',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData).replace(
            /</g,
            '\\u003c',
          ),
        }}
      />

      <main className="mx-auto max-w-2xl px-4 py-14 sm:py-20">
        <Link href="/blog" className="hive-link text-sm font-medium">
          ← Back to the blog
        </Link>

        <p className="hive-eyebrow mt-6">
          {post.tag} ·{' '}
          {new Date(post.date).toLocaleDateString('en-AU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}{' '}
          · {post.readMinutes} min read
        </p>

        <h1
          className="mt-2 font-display text-3xl font-semibold sm:text-4xl"
          style={{ color: 'var(--hive-ink)' }}
        >
          {post.title}
        </h1>

        <p
          className="mt-4 text-sm leading-relaxed"
          style={{ color: 'var(--hive-dusk)' }}
        >
          By Jess Foster and Robyn Papworth
        </p>

        {post.audioUrl ? (
          <section className="mt-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#0f766e]">
                <Headphones size={21} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#0f766e]">
                  Prefer to listen?
                </p>

                <h2 className="mt-1 text-xl font-semibold text-[#1e1b2e]">
                  {post.audioTitle || 'Listen to this article'}
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-[#5f5b73]">
                  Listen while you drive, take a break between sessions or
                  catch up when reading is not convenient.
                </p>

                <audio
                  controls
                  preload="metadata"
                  className="mt-4 w-full"
                >
                  <source src={post.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio player.
                </audio>
              </div>
            </div>
          </section>
        ) : null}

        <div className="mt-8">
          <ArticleBody blocks={post.body} />
        </div>

        <div className="my-10 text-center text-2xl" aria-hidden="true">
          🐝
        </div>

        <CommentSection
          postSlug={post.slug}
          postTitle={post.title}
        />
      </main>
    </>
  );
}