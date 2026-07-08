import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isDraftTopicPage =
    pathname.startsWith("/topics/") && pathname !== "/topics";

  if (isDraftTopicPage) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/topics";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/topics/:path*"],
};