import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: "Allied Health Hive | AHA Workforce Development",
    template: "%s | Allied Health Hive",
  },

  description:
    "Practical workforce development, creative session ideas, reflective tools, live learning and community support for Allied Health Assistants and their teams.",

  creator: siteConfig.creator,

  openGraph: {
    title: "Allied Health Hive | AHA Workforce Development",
    description:
      "Practical workforce development, creative session ideas, reflective tools, live learning and community support for Allied Health Assistants and their teams.",
    url: siteConfig.url,
    siteName: "Allied Health Hive",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <body>
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}