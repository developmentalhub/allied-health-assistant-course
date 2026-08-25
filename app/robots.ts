import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/blog/",
          "/tools/",
          "/webinars/",
          "/resource-shop/",
          "/reflective-practice/",
          "/manager-pathway/",
          "/contact/",
        ],
        disallow: [
          "/api/",
          "/login/",
          "/community/",
          "/member-library/",
          "/admin/",
          "/auth/",
        ],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: [
          "/",
          "/blog/",
          "/tools/",
          "/webinars/",
          "/resource-shop/",
          "/reflective-practice/",
          "/manager-pathway/",
          "/contact/",
        ],
        disallow: [
          "/api/",
          "/login/",
          "/community/",
          "/member-library/",
          "/admin/",
          "/auth/",
        ],
      },
      {
        userAgent: "GPTBot",
        allow: [
          "/",
          "/blog/",
          "/tools/",
          "/webinars/",
          "/resource-shop/",
          "/reflective-practice/",
          "/manager-pathway/",
          "/contact/",
        ],
        disallow: [
          "/api/",
          "/login/",
          "/community/",
          "/member-library/",
          "/admin/",
          "/auth/",
        ],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}