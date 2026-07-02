import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      received: true,
      message:
        "Academy Stripe webhook is not active yet. Payment and membership webhooks will be connected later.",
    },
    { status: 200 }
  );
}