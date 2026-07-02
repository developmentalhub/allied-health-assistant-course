import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error:
        "Academy checkout is not active yet. Stripe payment links and subscriptions will be connected later.",
    },
    { status: 501 }
  );
}