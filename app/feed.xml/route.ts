import { blogPosts } from "@/lib/blog-posts";
import { siteConfig } from "@/lib/site";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = blogPosts
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  const latestPostDate =
    posts.length > 0 ? new Date(posts[0].date) : new Date();

  const items = posts
    .map((post) => {
      const postUrl = `${siteConfig.url}/blog/${post.slug}`;

      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${postUrl}</link>
          <guid isPermaLink="true">${postUrl}</guid>
          <description>${escapeXml(post.excerpt)}</description>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          <category>${escapeXml(post.tag)}</category>
          <author>Jess Foster and Robyn Papworth</author>
        </item>
      `;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Allied Health Hive Blog</title>
    <link>${siteConfig.url}/blog</link>
    <description>Practical conversations for Allied Health Assistants, Allied Health Professionals and allied health teams about real sessions, supervision, delegation, emotional regulation, confidence and communication.</description>
    <language>en-AU</language>
    <lastBuildDate>${latestPostDate.toUTCString()}</lastBuildDate>
    <generator>Allied Health Hive</generator>
    <managingEditor>robyn@playmoveimprove.com.au (Allied Health Hive)</managingEditor>
    <webMaster>robyn@playmoveimprove.com.au (Allied Health Hive)</webMaster>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control":
        "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}