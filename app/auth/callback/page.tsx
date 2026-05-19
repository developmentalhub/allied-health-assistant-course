"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function handleCallback() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();

        const role = profile?.role || "parent";

        if (role === "admin") {
          router.push("/admin");
        } else if (role === "facilitator") {
          router.push("/facilitator-hub");
        } else {
          router.push("/dashboard");
        }
      } else {
        router.push("/login");
      }
    }

    handleCallback();
  }, []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#faf8f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#6b6880", fontSize: "15px" }}>Signing you in...</p>
    </div>
  );
}