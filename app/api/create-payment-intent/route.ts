import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error:
        "Payment intent creation is not active yet. Academy payments will be connected later.",
    },
    { status: 501 }
  );
}