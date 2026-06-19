import { createClient } from "@/lib/supabase-server";
import { createClient as createAdmin } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const DECKS = [
  { label: "Level 1", file: "move-to-read-level-1.pdf" },
  { label: "Level 2", file: "move-to-read-level-2.pdf" },
  { label: "Level 3", file: "move-to-read-level-3.pdf" },
];

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  let allowed = ["admin", "superadmin"].includes(profile?.role ?? "");

  if (!allowed) {
    const { data: sub } = await supabase.from("subscriptions").select("status").eq("user_id", user.id).maybeSingle();
    allowed = ["active", "trialing"].includes(sub?.status ?? "");
  }
  if (!allowed) {
    const { data: purchase } = await supabase.from("deck_purchases")
      .select("id").eq("user_id", user.id).eq("bundle", "move-to-read").maybeSingle();
    allowed = !!purchase;
  }
  if (!allowed) return NextResponse.json({ error: "No access" }, { status: 403 });

  const admin = createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const files = [];
  for (const d of DECKS) {
    const { data } = await admin.storage.from("resources").createSignedUrl(d.file, 3600);
    if (data?.signedUrl) files.push({ label: d.label, url: data.signedUrl });
  }
  return NextResponse.json({ files });
}