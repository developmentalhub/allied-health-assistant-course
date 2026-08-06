export const siteConfig = {
  name: "Allied Health Hive",
  businessName: "Workforce Development",
  title: "Allied Health Hive | AHA Workforce Development",
  description:
    "Practical workforce development, creative session ideas, reflective tools, live learning and community support for Allied Health Assistants and their teams.",
  creator: "Allied Health Hive",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://allied-health-assistant-course.vercel.app",
  logoUrl:
    "https://aracabetvunmirlfgylv.supabase.co/storage/v1/object/public/website-images/allied-health-hive-logo-2026.png",
  ogImage: "/og-image.png",
  links: {
    home: "/",
    community: "/community",
    join: "/join",
    tools: "/tools",
    subscribe: "/subscribe",
    webinars: "/webinars",
    resources: "/resource-shop",
    reflectivePractice: "/reflective-practice",
    contact: "/contact",
    managerPathway: "/manager-pathway",
  },
};