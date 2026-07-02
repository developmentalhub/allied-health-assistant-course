import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      files: [],
      message:
        "Deck downloads are not active. This old Move to Read download route has been paused for the academy rebuild.",
    },
    { status: 501 }
  );
}