import { blogPosts } from "@/lib/blog-posts";
import { siteConfig } from "@/lib/site";

export async function GET() {
  const posts = blogPosts
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  const blogList = posts
    .map(
      (post) =>
        `- [${post.title}](${siteConfig.url}/blog/${post.slug}): ${post.excerpt}`,
    )
    .join("\n");

  const content = `# Allied Health Hive

> Practical workforce development, professional learning and honest conversations for Allied Health Assistants, Allied Health Professionals and allied health teams.

Allied Health Hive is created by Jess Foster and Robyn Papworth.

The site focuses on the real challenges that arise in allied health work, including supervision, delegation, communication, emotional regulation, reflective practice, session planning, professional confidence and supporting clients and families.

## Main public pages

- [Home](${siteConfig.url}/): Allied Health Hive workforce development and professional learning.
- [Blog](${siteConfig.url}/blog): Articles and conversations for Allied Health Assistants and Allied Health Professionals.
- [Practical Tools](${siteConfig.url}/tools): Practical resources and tools for allied health work.
- [Webinars](${siteConfig.url}/webinars): Professional learning and webinar content.
- [Resources](${siteConfig.url}/resource-shop): Allied Health Hive resources.
- [Reflective Support](${siteConfig.url}/reflective-practice): Reflective practice and professional support.
- [For Managers and Supervisors](${siteConfig.url}/manager-pathway): Support for people supervising and developing Allied Health Assistants.
- [Contact](${siteConfig.url}/contact): Contact Allied Health Hive.

## Blog articles

${blogList || "- No blog articles published yet."}

## Topics covered

- Allied Health Assistants
- Allied Health Professionals
- allied health workforce development
- AHA supervision
- allied health supervision
- delegation
- reflective practice
- emotional regulation
- professional confidence
- communication between AHAs and AHPs
- adapting allied health sessions
- client and family support
- professional learning

## Authors

### Jess Foster

Co-founder of Allied Health Hive and contributor to Allied Health Hive articles, conversations and professional learning.

### Robyn Papworth

Co-founder of Allied Health Hive and contributor to Allied Health Hive articles, conversations and professional learning.

## Content discovery

- [XML Sitemap](${siteConfig.url}/sitemap.xml)
- [RSS Feed](${siteConfig.url}/feed.xml)

## Access

The blog and public learning pages listed above are publicly accessible.

Private member, login, administration and community areas are not intended for public indexing or AI discovery.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control":
        "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}