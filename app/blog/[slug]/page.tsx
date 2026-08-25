import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
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