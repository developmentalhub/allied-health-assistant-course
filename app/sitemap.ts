import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const routes = [
  "",
  "/join",
  "/subscribe",
  "/subscribe/success",
  "/reflective-practice",
  "/tools",
  "/manager-pathway",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: currentDate,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/subscribe"
          ? 0.85
          : route === "/tools"
            ? 0.8
            : route === "/reflective-practice"
              ? 0.8
              : 0.7,
  }));
}