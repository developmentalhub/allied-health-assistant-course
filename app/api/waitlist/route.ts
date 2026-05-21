import { createClient } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { name, email, age_group, topic, message } = await request.json();

  if (!name || !email || !age_group || !topic) {
    return NextResponse.json({ error: "All required fields must be filled." }, { status: 400 });
  }

  const { error } = await supabase.from("waitlist").insert({
    name,
    email,
    age_group,
    topic,
    message: message || null,
  });

  if (error) {
    console.error("Waitlist insert error:", error.message);
    return NextResponse.json({ error: "Failed to join waitlist. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}