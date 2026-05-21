"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function LiveSessionPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function setup() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push(`/login?redirect=/sessions/${id}/live`); return; }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      const { data: sessionData } = await supabase
        .from("sessions")
        .select("id, title, daily_room_url, status, scheduled_at, duration_minutes")
        .eq("id", id)
        .single();

      if (!sessionData) { setError("Session not found."); setLoading(false); return; }
      setSession(sessionData);

      // Check access — admin/superadmin/facilitator always have access
      const isStaff = ["admin", "superadmin", "facilitator"].includes(profile?.role ?? "");

      if (isStaff) {
        setHasAccess(true);
        setLoading(false);
        return;
      }

      // Families need a confirmed booking
      const { data: booking } = await supabase
        .from("bookings")
        .select("id, status")
        .eq("session_id", id)
        .eq("family_id", user.id)
        .in("status", ["confirmed", "pending"])
        .single();

      if (!booking) {
        setError("You don't have a booking for this session.");
        setLoading(false);
        return;
      }

      setHasAccess(true);
      setLoading(false);
    }
    setup();
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#1e1b2e", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#a5b4fc", fontFamily: "DM Sans, sans-serif" }}>Loading session...</p>
      </div>
    );
  }

  if (error || !hasAccess) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#faf8f5", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", fontFamily: "DM Sans, sans-serif" }}>
        <div style={{ maxWidth: "480px", textAlign: "center" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 300, color: "#1e1b2e", marginBottom: "12px" }}>
            Access denied
          </h1>
          <p style={{ fontSize: "15px", color: "#6b6880", marginBottom: "24px" }}>
            {error || "You don't have access to this session."}
          </p>
          <Link href="/dashboard" style={{ backgroundColor: "#3730a3", color: "white", padding: "12px 28px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            Go to dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!session?.daily_room_url) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#faf8f5", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px", fontFamily: "DM Sans, sans-serif" }}>
        <div style={{ maxWidth: "480px", textAlign: "center" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: 300, color: "#1e1b2e", marginBottom: "12px" }}>
            Room not ready yet
          </h1>
          <p style={{ fontSize: "15px", color: "#6b6880", marginBottom: "8px" }}>
            The video room for this session hasn't been set up yet.
          </p>
          <p style={{ fontSize: "14px", color: "#6b6880", marginBottom: "24px" }}>
            Rooms are created automatically when a session is confirmed 24 hours before it starts.
          </p>
          <Link href="/dashboard" style={{ backgroundColor: "#3730a3", color: "white", padding: "12px 28px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#1e1b2e", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div style={{ backgroundColor: "#1e1b2e", borderBottom: "1px solid #2d2a3e", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 400, color: "white", margin: 0 }}>
            {session.title}
          </p>
          <p style={{ fontSize: "12px", color: "#a5b4fc", margin: 0 }}>
            Live session
          </p>
        </div>
        <Link href="/dashboard" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none", border: "1px solid #374151", borderRadius: "8px", padding: "6px 14px" }}>
          Leave session
        </Link>
      </div>

      {/* Daily.co iframe */}
      <div style={{ flex: 1, position: "relative" }}>
        <iframe
          src={session.daily_room_url}
          allow="camera; microphone; fullscreen; speaker; display-capture"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
          title={session.title}
        />
      </div>
    </div>
  );
}