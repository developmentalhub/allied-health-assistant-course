import { createClient } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  // 1. Fetch the application to get the applicant's email
  const { data: application, error: fetchError } = await supabase
    .from("facilitator_applications")
    .select("email")
    .eq("id", id)
    .single();

  if (fetchError || !application) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 });
  }

  // 2. Update application status to approved
  const { error: statusError } = await supabase
    .from("facilitator_applications")
    .update({ status: "approved" })
    .eq("id", id);

  if (statusError) {
    return NextResponse.json(
      { error: "Failed to update application status", details: statusError.message },
      { status: 500 }
    );
  }

  // 3. Update matching profile role to facilitator
  const { error: profileError } = await supabase
    .from("profiles")
    .update({ role: "facilitator" })
    .eq("email", application.email);

  if (profileError) {
    // Non-fatal — user may not have registered yet
    console.error("Failed to update profile role:", profileError.message);
  }

  return NextResponse.redirect(new URL("/admin/applications", request.url));
}