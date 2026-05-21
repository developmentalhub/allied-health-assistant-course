import { createClient } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { error } = await supabase
    .from("facilitator_applications")
    .update({ status: "declined" })
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: "Failed to update application status", details: error.message },
      { status: 500 }
    );
  }

  return NextResponse.redirect(new URL("/admin/applications", request.url));
}