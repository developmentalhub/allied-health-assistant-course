import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      message:
        "Global interest collection is not active. This old Developmental Hub form has been paused for the academy rebuild.",
    },
    { status: 501 }
  );
}