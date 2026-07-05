import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import GlobalBanner from "@/components/GlobalBanner";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AHA Professional Development | Play Move Improve",
  description:
    "Foundation reflective professional development for Allied Health Assistants, therapy assistants, students, educators, managers and the professionals working alongside them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GlobalBanner />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}