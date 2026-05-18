import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SessionTypes from "@/components/SessionTypes";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#faf8f5]">
      <Navbar />
      <Hero />
      <SessionTypes />
    </main>
  );
}