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
    "https://aracabetvunmirlfgylv.supabase.co/storage/v1/object/sign/website-images/allied-health-hive-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lNjdiY2Q2MC1iYTUzLTQxZGItYTlkOC1hOThlYTY2M2QxMjEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWltYWdlcy9hbGxpZWQtaGVhbHRoLWhpdmUtbG9nby5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzgzNDg3MDIzLCJleHAiOjE4MTUwMjMwMjN9.AYiqzMIMBdr79q3aec0N8LvGxa_AkEjaQvk2Ne-xfwY",
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