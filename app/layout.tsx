import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalBanner from "@/components/GlobalBanner";

export const metadata: Metadata = {
  title: {
    default: "The Allied Health & Educator Resource Academy",
    template: "%s | The Allied Health & Educator Resource Academy",
  },
  description:
    "A Play Move Improve academy for allied health assistants, educators and support teams building practical confidence through movement, play, regulation and everyday implementation.",
  keywords: [
    "allied health assistant",
    "educator resources",
    "Play Move Improve",
    "movement and regulation",
    "child development",
    "early childhood education",
    "school age support",
    "developmental educator",
    "inclusive play",
    "AHA training",
  ],
  openGraph: {
    title: "The Allied Health & Educator Resource Academy",
    description:
      "A Play Move Improve academy for allied health assistants, educators and support teams building practical confidence through movement, play, regulation and everyday implementation.",
    url: "https://playmoveimprove.com",
    siteName: "The Allied Health & Educator Resource Academy",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400&family=DM+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body
        className="antialiased"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          color: "#1e1b2e",
          backgroundColor: "#faf8f5",
        }}
      >
        <AuthProvider>
          <GlobalBanner />
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>

        <Analytics />
      </body>
    </html>
  );
}