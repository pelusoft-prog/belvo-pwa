import { NextResponse } from "next/server";

export function proxy(req) {
  const auth = req.cookies.get("auth");

  if (!auth) {
    if (
      req.nextUrl.pathname.startsWith("/dashboard") ||
      req.nextUrl.pathname.startsWith("/transactions")
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/transactions/:path*"],
};