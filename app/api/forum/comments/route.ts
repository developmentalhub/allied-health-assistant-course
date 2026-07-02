import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      message:
        "Forum comments are not active. This old Developmental Hub forum route has been paused for the academy rebuild.",
    },
    { status: 501 }
  );
}