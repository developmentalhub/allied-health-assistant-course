import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      message:
        "Email lead capture is not active. This old Developmental Hub ebook funnel has been paused for the academy rebuild.",
    },
    { status: 501 }
  );
}