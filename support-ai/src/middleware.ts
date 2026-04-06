import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/getsession";

export async function middleware(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/embed/:path*"],
};