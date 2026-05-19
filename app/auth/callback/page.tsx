"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function handleCallback() {
      const { data: { session }, error } = await supabase.auth.getSession();

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
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
          if (event === "SIGNED_IN" && session) {
            subscription.unsubscribe();

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
          }

          if (event === "PASSWORD_RECOVERY") {
            router.push("/auth/reset-password");
          }
        });
      }
    }

    handleCallback();
  }, []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#faf8f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: "40px", height: "40px", border: "3px solid #e0e7ff", borderTopColor: "#3730a3", borderRadius: "50%", margin: "0 auto 16px", animation: "spin 0.8s linear infinite" }} />
        <p style={{ color: "#6b6880", fontSize: "15px" }}>Signing you in...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}