import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { blogPosts } from "@/lib/blog-posts";

const staticRoutes = [
  "",
  "/join",
  "/subscribe",
  "/reflective-practice",
  "/tools",
  "/manager-pathway",
  "/contact",
  "/privacy",
  "/terms",
  "/blog",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: currentDate,
    changeFrequency:
      route === ""
        ? "weekly"
        : route === "/blog"
          ? "weekly"
          : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/blog"
          ? 0.9
          : route === "/subscribe"
            ? 0.85
            : route === "/tools"
              ? 0.8
              : route === "/reflective-practice"
                ? 0.8
                : 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...blogPages];
}