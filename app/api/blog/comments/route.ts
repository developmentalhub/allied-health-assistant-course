import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { notifyNewComment } from "@/lib/notify-comment-email";

function cleanText(value: unknown) {
  const text = String(value || "").trim();
  return text.length > 0 ? text : null;
}

// GET /api/blog/comments?postSlug=some-post
// Returns approved comments for a given post, newest first.
export async function GET(request: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const postSlug = cleanText(searchParams.get("postSlug"));

  if (!postSlug) {
    return NextResponse.json({ error: "Missing postSlug." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("blog_comments")
    .select("id, name, body, created_at")
    .eq("post_slug", postSlug)
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ comments: data || [] });
}

// POST /api/blog/comments
// Creates a new (unapproved) comment and emails the team for review.
export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();

  const postSlug = cleanText(body.postSlug) || cleanText(body.post_slug);
  const postTitle = cleanText(body.postTitle); // optional, just for the email subject
  const name = cleanText(body.name) || "AHA community member";
  const message = cleanText(body.body) || cleanText(body.content);

  // Honeypot — real visitors never fill this field in
  const honeypot = cleanText(body.hp);

  if (!postSlug) {
    return NextResponse.json({ error: "Missing blog post ID." }, { status: 400 });
  }

  if (!message) {
    return NextResponse.json(
      { error: "Please write something before posting." },
      { status: 400 },
    );
  }

  if (honeypot) {
    // Silently pretend success so the bot doesn't learn anything.
    // Nothing is written to the database.
    return NextResponse.json({ pending: true });
  }

  const { error } = await supabase.from("blog_comments").insert({
    post_slug: postSlug,
    name,
    body: message,
    // approved defaults to false at the database level.
    // The comment stays hidden until approved in Supabase.
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Fire the email notification. This does not block or fail the comment
  // submission if email sending has an issue. The comment is already saved.
  notifyNewComment({ postSlug, postTitle, name, message }).catch((err: unknown) =>
    console.error("Comment notification email failed:", err),
  );

  return NextResponse.json({ pending: true });
}