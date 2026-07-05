import type { MetadataRoute } from "next";

const baseUrl = "https://allied-health-assistant-course.vercel.app";

const routes = [
  "",
  "/join",
  "/subscribe",
  "/subscribe/success",
  "/topics",
  "/topics/understanding-aha-role",
  "/topics/working-under-allied-health-direction",
  "/topics/reflective-practice-and-communication",
  "/topics/preparing-for-sessions-and-asking-better-questions",
  "/topics/knowing-when-to-seek-clarification",
  "/topics/thriving-kids-and-changing-support-roles",
  "/reflective-practice",
  "/manager-pathway",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/topics" ? 0.9 : 0.7,
  }));
}