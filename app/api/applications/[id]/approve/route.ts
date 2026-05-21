import { createClient } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";
import { sendApplicationApproved } from "@/lib/email";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: application, error: fetchError } = await supabase
    .from("facilitator_applications")
    .select("email, full_name")
    .eq("id", id)
    .single();

  if (fetchError || !application) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 });
  }

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

  const { error: profileError } = await supabase
    .from("profiles")
    .update({ role: "facilitator" })
    .eq("email", application.email);

  if (profileError) {
    console.error("Failed to update profile role:", profileError.message);
  }

  // Send approval email
  try {
    await sendApplicationApproved({
      to: application.email,
      applicantName: application.full_name,
    });
  } catch (emailError) {
    console.error("Failed to send approval email:", emailError);
  }

  return NextResponse.redirect(new URL("/admin/applications", request.url));
}