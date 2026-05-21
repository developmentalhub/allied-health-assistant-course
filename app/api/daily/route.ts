import { createClient } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  // Auth check — admin only
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!["admin", "superadmin"].includes(profile?.role ?? "")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { sessionId } = await request.json();
  if (!sessionId) return NextResponse.json({ error: "Session ID required" }, { status: 400 });

  // Fetch session
  const { data: session } = await supabase
    .from("sessions")
    .select("id, title, scheduled_at, duration_minutes, daily_room_url")
    .eq("id", sessionId)
    .single();

  if (!session) return NextResponse.json({ error: "Session not found" }, { status: 404 });

  // Don't recreate if room already exists
  if (session.daily_room_url) {
    return NextResponse.json({ room_url: session.daily_room_url, already_existed: true });
  }

  // Create a room name from session id (Daily.co room names must be unique)
  const roomName = `dh-${sessionId.slice(0, 8)}`;

  // Calculate expiry — session end time + 30 min buffer
  const scheduledAt = new Date(session.scheduled_at);
  const durationMs = (session.duration_minutes ?? 60) * 60 * 1000;
  const expiryTime = new Date(scheduledAt.getTime() + durationMs + 30 * 60 * 1000);

  // Create room via Daily.co API
  const dailyRes = await fetch("https://api.daily.co/v1/rooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
    },
    body: JSON.stringify({
      name: roomName,
      privacy: "private",
      properties: {
        exp: Math.floor(expiryTime.getTime() / 1000),
        max_participants: 110, // 100 families + 10 buffer
        enable_chat: true,
        enable_screenshare: true,
        start_video_off: true,
        start_audio_off: true,
      },
    }),
  });

  if (!dailyRes.ok) {
    const err = await dailyRes.json();
    console.error("Daily.co room creation failed:", err);
    return NextResponse.json({ error: "Failed to create video room", details: err }, { status: 500 });
  }

  const room = await dailyRes.json();
  const roomUrl = room.url;

  // Save room URL and name to session
  await supabase
    .from("sessions")
    .update({ daily_room_url: roomUrl, daily_room_name: roomName })
    .eq("id", sessionId);

  return NextResponse.json({ room_url: roomUrl, room_name: roomName });
}