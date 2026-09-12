import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

const ALLOWED_CONTENT_TYPES = [
  "blog",
  "tool",
  "webinar",
  "resource",
  "topic",
  "community",
] as const;

function isAllowedContentType(value: string) {
  return ALLOWED_CONTENT_TYPES.includes(
    value as (typeof ALLOWED_CONTENT_TYPES)[number],
  );
}

export async function GET(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Not signed in." },
      { status: 401 },
    );
  }

  const url = new URL(request.url);

  const contentType =
    url.searchParams.get("contentType")?.trim() || "";

  const contentKey =
    url.searchParams.get("contentKey")?.trim() || "";

  if (!contentType || !contentKey) {
    return NextResponse.json(
      {
        error:
          "contentType and contentKey are required.",
      },
      { status: 400 },
    );
  }

  if (!isAllowedContentType(contentType)) {
    return NextResponse.json(
      { error: "Invalid content type." },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("saved_content")
    .select("id")
    .eq("user_id", user.id)
    .eq("content_type", contentType)
    .eq("content_key", contentKey)
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({
    saved: Boolean(data),
  });
}

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Not signed in." },
      { status: 401 },
    );
  }

  const body = await request.json();

  const contentType = String(
    body.contentType || "",
  ).trim();

  const contentKey = String(
    body.contentKey || "",
  ).trim();

  const title = String(
    body.title || "",
  ).trim();

  const href = String(
    body.href || "",
  ).trim();

  if (
    !contentType ||
    !contentKey ||
    !title ||
    !href
  ) {
    return NextResponse.json(
      {
        error:
          "contentType, contentKey, title and href are required.",
      },
      { status: 400 },
    );
  }

  if (!isAllowedContentType(contentType)) {
    return NextResponse.json(
      { error: "Invalid content type." },
      { status: 400 },
    );
  }

  if (contentKey.length > 500) {
    return NextResponse.json(
      { error: "Content key is too long." },
      { status: 400 },
    );
  }

  if (title.length > 300) {
    return NextResponse.json(
      { error: "Title is too long." },
      { status: 400 },
    );
  }

  if (
    href.length > 1000 ||
    !href.startsWith("/")
  ) {
    return NextResponse.json(
      {
        error:
          "Saved content must use a valid internal Hive link.",
      },
      { status: 400 },
    );
  }

  const { error } = await supabase
    .from("saved_content")
    .upsert(
      {
        user_id: user.id,
        content_type: contentType,
        content_key: contentKey,
        title,
        href,
      },
      {
        onConflict:
          "user_id,content_type,content_key",
      },
    );

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({
    saved: true,
  });
}

export async function DELETE(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Not signed in." },
      { status: 401 },
    );
  }

  const body = await request.json();

  const contentType = String(
    body.contentType || "",
  ).trim();

  const contentKey = String(
    body.contentKey || "",
  ).trim();

  if (!contentType || !contentKey) {
    return NextResponse.json(
      {
        error:
          "contentType and contentKey are required.",
      },
      { status: 400 },
    );
  }

  if (!isAllowedContentType(contentType)) {
    return NextResponse.json(
      { error: "Invalid content type." },
      { status: 400 },
    );
  }

  const { error } = await supabase
    .from("saved_content")
    .delete()
    .eq("user_id", user.id)
    .eq("content_type", contentType)
    .eq("content_key", contentKey);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({
    saved: false,
  });
}