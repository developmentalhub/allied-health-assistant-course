import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    valid: false,
    message:
      "Academy affiliate codes are not active yet. This will be connected later.",
  });
}