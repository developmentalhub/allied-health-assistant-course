import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      message:
        "Service interest collection is not active. This old family service enquiry route has been paused for the academy rebuild.",
    },
    { status: 501 }
  );
}