import { scalekit } from "@/lib/scalekit";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
  const cookiestore= await cookies()
  cookiestore.delete("access_token")
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || `${req.nextUrl.protocol}//${req.nextUrl.host}`;
  return NextResponse.redirect(appUrl)  

}