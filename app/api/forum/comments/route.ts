import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  // Check subscription or admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const isAdmin = ["admin", "superadmin"].includes(profile?.role ?? "");

  if (!isAdmin) {
    const { data: sub } = await supabase
      .from("subscriptions")
      .select("status")
      .eq("user_id", user.id)
      .single();

    if (!["active", "trialing"].includes(sub?.status ?? "")) {
      return NextResponse.json({ error: "Subscription required to comment." }, { status: 403 });
    }
  }

  const { post_id, content } = await request.json();
  if (!post_id || !content?.trim()) {
    return NextResponse.json({ error: "Post ID and content are required." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("forum_comments")
    .insert({ post_id, author_id: user.id, content: content.trim() })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ comment: data });
}