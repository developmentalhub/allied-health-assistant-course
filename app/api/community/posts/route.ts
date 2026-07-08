import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

function cleanText(value: unknown) {
  const text = String(value || "").trim();
  return text.length > 0 ? text : null;
}

export async function GET() {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from("community_posts")
    .select(
      `
      id,
      name,
      author_name,
      title,
      body,
      content,
      message,
      created_at,
      community_replies (
        id,
        post_id,
        name,
        author_name,
        body,
        content,
        message,
        created_at
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const formattedPosts =
    posts?.map((post) => ({
      ...post,
      replies: post.community_replies || [],
      comments: post.community_replies || [],
    })) || [];

  return NextResponse.json({ posts: formattedPosts });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  const name =
    cleanText(body.authorName) ||
    cleanText(body.author_name) ||
    cleanText(body.name) ||
    "AHA community member";

  const message =
    cleanText(body.body) || cleanText(body.content) || cleanText(body.message);

  if (!message) {
    return NextResponse.json(
      { error: "Please write something before posting." },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("community_posts")
    .insert({
      name,
      author_name: name,
      body: message,
      content: message,
      message,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ post: data });
}