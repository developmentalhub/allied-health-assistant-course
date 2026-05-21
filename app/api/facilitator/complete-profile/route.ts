import { createClient } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, email")
    .eq("id", user.id)
    .single();

  if (!["facilitator", "admin", "superadmin"].includes(profile?.role ?? "")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const formData = await request.formData();

  const bio = formData.get("bio") as string;
  const wwc_number = formData.get("wwc_number") as string;
  const wwc_expiry = formData.get("wwc_expiry") as string;
  const insurance_provider = formData.get("insurance_provider") as string;
  const insurance_expiry = formData.get("insurance_expiry") as string;
  const registration_number = formData.get("registration_number") as string;
  const registration_expiry = formData.get("registration_expiry") as string;
  const photoFile = formData.get("photo") as File | null;

  if (
    !bio ||
    !wwc_number ||
    !wwc_expiry ||
    !insurance_provider ||
    !insurance_expiry ||
    !registration_number ||
    !registration_expiry
  ) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  // Keep existing photo if no new one uploaded
  const { data: existing } = await supabase
    .from("facilitator_profiles")
    .select("photo_url")
    .eq("user_id", user.id)
    .single();

  let photo_url: string | null = existing?.photo_url ?? null;

  if (photoFile && photoFile.size > 0) {
    const fileExt = photoFile.name.split(".").pop();
    const filePath = `${user.id}.${fileExt}`;
    const arrayBuffer = await photoFile.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from("facilitator-profiles")
      .upload(filePath, buffer, {
        contentType: photoFile.type,
        upsert: true,
      });

    if (uploadError) {
      console.error("Photo upload failed:", uploadError.message);
      return NextResponse.json(
        { error: `Photo upload failed: ${uploadError.message}` },
        { status: 500 }
      );
    }

    const { data: urlData } = supabase.storage
      .from("facilitator-profiles")
      .getPublicUrl(filePath);

    photo_url = urlData.publicUrl;
  }

  const { error: upsertError } = await supabase
    .from("facilitator_profiles")
    .upsert(
      {
        user_id: user.id,
        email: profile?.email ?? user.email ?? "",
        bio,
        photo_url,
        wwc_number,
        wwc_expiry,
        insurance_provider,
        insurance_expiry,
        registration_number,
        registration_expiry,
        profile_complete: true,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );

  if (upsertError) {
    console.error("Profile upsert failed:", upsertError.message);
    return NextResponse.json(
      { error: "Failed to save profile. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}