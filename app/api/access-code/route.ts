import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const code = body?.code;

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Please enter your access code." },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: "Server access is not configured yet." },
        { status: 500 }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

    const cleanCode = code.trim().toUpperCase();

    const { data: accessCode, error } = await supabaseAdmin
      .from("customer_access_codes")
      .select("*")
      .eq("code", cleanCode)
      .maybeSingle();

    if (error) {
      return NextResponse.json(
        { error: "There was a problem checking this code." },
        { status: 500 }
      );
    }

    if (!accessCode) {
      return NextResponse.json(
        { error: "That code was not found. Please check it and try again." },
        { status: 404 }
      );
    }

    if (accessCode.expires_at && new Date(accessCode.expires_at) < new Date()) {
      return NextResponse.json(
        {
          error:
            "This code has expired. Please contact Play Move Improve for a new one."
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      redirectPath: accessCode.redirect_path || "/library"
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}