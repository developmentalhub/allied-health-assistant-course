import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select(
      `
      id,
      full_name,
      community_role,
      discipline,
      location_region,
      bio,
      show_in_community,
      created_at
    `,
    )
    .eq("show_in_community", true)
    .order("created_at", { ascending: false })
    .limit(12);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 },
    );
  }

  const members =
    data?.map((profile) => ({
      id: profile.id,
      name: profile.full_name,
      community_role: profile.community_role,
      discipline: profile.discipline,
      location_region: profile.location_region,
      bio: profile.bio,
    })) || [];

  return NextResponse.json({ members });
}