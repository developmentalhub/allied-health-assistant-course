import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  applicationName: "Allied Health Hive",

  title: {
    default:
      "Allied Health Hive | Allied Health Workforce Development",
    template: "%s | Allied Health Hive",
  },

  description:
    "Practical workforce development for Allied Health Assistants, Allied Health Professionals and allied health teams. Explore real session challenges, reflective practice, supervision, emotional regulation, practical tools, webinars and professional learning.",

  authors: [
    {
      name: "Jess Foster",
    },
    {
      name: "Robyn Papworth",
    },
  ],

  creator: siteConfig.creator,
  publisher: "Allied Health Hive",

  category: "Allied Health Workforce Development",

  keywords: [
    "Allied Health Assistant",
    "Allied Health Assistants",
    "AHA",
    "Allied Health Professional",
    "Allied Health Professionals",
    "allied health",
    "allied health workforce development",
    "AHA professional development",
    "allied health professional development",
    "AHA supervision",
    "allied health supervision",
    "clinical supervision",
    "delegation in allied health",
    "allied health reflective practice",
    "allied health training",
    "therapy assistants",
    "allied health teams",
    "emotional regulation allied health",
  ],

  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": `${siteConfig.url}/feed.xml`,
    },
  },

  openGraph: {
    title: "Allied Health Hive | Allied Health Workforce Development",
    description:
      "Practical learning, honest conversations and workforce development for Allied Health Assistants, Allied Health Professionals and the teams who work alongside them.",
    url: siteConfig.url,
    siteName: "Allied Health Hive",
    locale: "en_AU",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Allied Health Hive | Allied Health Workforce Development",
    description:
      "Practical learning, honest conversations and workforce development for Allied Health Assistants, Allied Health Professionals and allied health teams.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organisationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Allied Health Hive",
    url: siteConfig.url,
    description:
      "Allied Health Hive provides practical workforce development, professional learning, reflective support and resources for Allied Health Assistants, Allied Health Professionals and allied health teams.",
    founders: [
      {
        "@type": "Person",
        name: "Jess Foster",
      },
      {
        "@type": "Person",
        name: "Robyn Papworth",
      },
    ],
    knowsAbout: [
      "Allied Health",
      "Allied Health Assistants",
      "Allied Health Professionals",
      "Allied Health Workforce Development",
      "Allied Health Supervision",
      "Delegation in Allied Health",
      "Reflective Practice",
      "Emotional Regulation",
      "Professional Development",
    ],
  };

  return (
    <html lang="en-AU">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organisationStructuredData).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />

        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}