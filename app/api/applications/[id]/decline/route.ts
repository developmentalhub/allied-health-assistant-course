import { createClient } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";
import { sendApplicationDeclined } from "@/lib/email";

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

  // Send declined email
  try {
    await sendApplicationDeclined({
      to: application.email,
      applicantName: application.full_name,
    });
  } catch (emailError) {
    console.error("Failed to send declined email:", emailError);
  }

  return NextResponse.redirect(new URL("/admin/applications", request.url));
}