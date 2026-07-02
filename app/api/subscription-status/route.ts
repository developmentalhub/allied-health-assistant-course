import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    subscribed: false,
    status: "not_configured",
    message:
      "Academy subscription status is not active yet. Membership access will be connected later.",
  });
}