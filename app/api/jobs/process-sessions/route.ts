import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      success: false,
      message:
        "Automated session processing is not active. This old family session payment, reminder and Daily room job has been paused for the academy rebuild.",
    },
    { status: 501 }
  );
}