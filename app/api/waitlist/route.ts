import { createClient } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const { name, email, pathway, interest, message } = await request.json();

    const cleanName = typeof name === "string" ? name.trim() : "";
    const cleanEmail =
      typeof email === "string" ? email.trim().toLowerCase() : "";
    const cleanPathway = typeof pathway === "string" ? pathway.trim() : "";
    const cleanInterest = typeof interest === "string" ? interest.trim() : "";
    const cleanMessage = typeof message === "string" ? message.trim() : "";

    if (!cleanName || !cleanEmail || !cleanPathway || !cleanInterest) {
      return NextResponse.json(
        {
          error: "Please complete all required fields.",
        },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("waitlist").insert({
      name: cleanName,
      email: cleanEmail,
      age_group: cleanPathway,
      topic: cleanInterest,
      message: cleanMessage || null,
    });

    if (error) {
      console.error("Academy waitlist insert error:", error.message);

      return NextResponse.json(
        {
          error: "Failed to join the waitlist. Please try again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Academy waitlist route error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}