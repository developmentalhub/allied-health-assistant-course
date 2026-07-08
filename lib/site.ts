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
    "https://aracabetvunmirlfgylv.supabase.co/storage/v1/object/sign/website-images/allied-health-hive-logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lNjdiY2Q2MC1iYTUzLTQxZGItYTlkOC1hOThlYTY2M2QxMjEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWltYWdlcy9hbGxpZWQtaGVhbHRoLWhpdmUtbG9nby5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzgzNDg3MDIzLCJleHAiOjE4MTUwMjMwMjN9.AYiqzMIMBdr79q3aec0N8LvGxa_AkEjaQvk2Ne-xfwY",
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