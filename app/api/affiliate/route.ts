import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) return NextResponse.json({ valid: false });

  const supabase = await createClient();
  const { data } = await supabase
    .from("affiliate_codes")
    .select("id, code, partner_name, commission_percentage")
    .eq("code", code.toUpperCase().trim())
    .eq("active", true)
    .single();

  if (!data) return NextResponse.json({ valid: false });
  return NextResponse.json({ valid: true, code: data.code, partner_name: data.partner_name, commission_percentage: data.commission_percentage });
}