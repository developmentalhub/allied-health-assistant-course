import { createClient } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { name, email, age_group, session_topic, preferred_time, preferred_days } = await request.json();

  if (!name || !email || !age_group || !session_topic || !preferred_time) {
    return NextResponse.json({ error: "All required fields must be filled." }, { status: 400 });
  }

  const { error } = await supabase.from("session_interest").insert({
    name,
    email,
    age_group,
    session_topic,
    preferred_time,
    preferred_days: preferred_days || null,
  });

  if (error) {
    console.error("Session interest insert error:", error.message);
    return NextResponse.json({ error: "Failed to register interest. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}