import type { Metadata } from "next";
import TopicsPageClient from "./TopicsPageClient";

export const metadata: Metadata = {
  title: "Foundation AHA PD Topics | AHA Professional Development",
  description:
    "Browse foundation Allied Health Assistant professional development topics covering role clarity, working under direction, reflective practice, preparation, clarification and changing support roles.",
};

export default function TopicsPage() {
  return <TopicsPageClient />;
}