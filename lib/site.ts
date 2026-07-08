export const siteConfig = {
  name: "AHA Professional Development",
  title: "AHA Professional Development",
  description:
    "A community and professional development platform for Allied Health Assistants, created by Jess Foster and Robyn from Play Move Improve.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://allied-health-assistant-course.vercel.app",
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