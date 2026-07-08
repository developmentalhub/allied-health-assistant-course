export const siteConfig = {
  name: "AHA Professional Development",
  businessName: "Allied Health Hive",
  title: "AHA Professional Development",
  description:
    "A community and professional development platform for Allied Health Assistants, created by Jess Foster and Robyn from Play Move Improve.",
  creator: "Allied Health Hive",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://allied-health-assistant-course.vercel.app",
  logoUrl:
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/website-images/allied-health-hive-logo.png`,
  ogImage: "/og-image.png",
  links: {
    home: "/",
    join: "/join",
    subscribe: "/subscribe",
    webinars: "/webinars",
    contact: "/contact",
    managerPathway: "/manager-pathway",
  },
};