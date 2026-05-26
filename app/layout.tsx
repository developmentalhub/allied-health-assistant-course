import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Developmental Hub — Expert Child Development Support for Families",
  description: "Follow-along activity videos, downloadable resources and a monthly live Q&A with Robyn Papworth. Expert developmental support for children aged 0–8, at home, on your schedule. $39/month.",
  keywords: "child development, developmental support, tummy time, fine motor skills, sensory play, school readiness, occupational therapy, developmental educator, online, telehealth",
  openGraph: {
    title: "Developmental Hub — Expert Child Development Support for Families",
    description: "Expert developmental support for children aged 0–8. Follow-along videos, activity sheets and monthly live Q&A with Robyn Papworth. $39/month, cancel anytime.",
    url: "https://developmental-hub.vercel.app",
    siteName: "Developmental Hub",
    images: [{ url: "https://pndihjsqkwbjewlulotg.supabase.co/storage/v1/object/public/public-assets/robyn-hero.png", width: 1200, height: 630, alt: "Robyn Papworth — Developmental Hub" }],
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'DM Sans', sans-serif", color: "#1e1b2e", backgroundColor: "#faf8f5" }} className="antialiased">
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}