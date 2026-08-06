import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign In | Allied Health Hive Workforce Development",
  description:
    "Sign in to access your Allied Health Hive learning, tools and workforce development resources.",
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#fffaf3]" />
      }
    >
      <LoginForm />
    </Suspense>
  );
}