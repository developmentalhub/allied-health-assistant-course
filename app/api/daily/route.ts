import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      message:
        "Daily live-room creation is not active. This old session room route has been paused for the academy rebuild.",
    },
    { status: 501 }
  );
}