import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      message:
        "Session interest collection is not active. This old family session form has been paused for the academy rebuild.",
    },
    { status: 501 }
  );
}