import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ subscribed: false });

  const { data } = await supabase
    .from("subscriptions")
    .select("status, current_period_end")
    .eq("user_id", user.id)
    .single();

  const subscribed = data?.status === "active" || data?.status === "trialing";
  return NextResponse.json({ subscribed, status: data?.status, current_period_end: data?.current_period_end });
}