import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      message:
        "Cup sequence email capture is not active. This old funnel has been paused for the academy rebuild.",
    },
    { status: 501 }
  );
}