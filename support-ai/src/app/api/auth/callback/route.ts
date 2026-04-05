import { scalekit } from "@/lib/scalekit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
  const {searchParams}=new URL(req.url)
  const code=searchParams.get("code")
  if(!code){
    return NextResponse.json({error:"Authorization code not found"}, {status:400})  
  }
  const session= await scalekit.authenticateWithCode(code, `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`)
  console.log("Session:", session)
  const response=NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`)
  response.cookies.set("access_token",session.accessToken,{
    httpOnly:true,
    secure:true,
    maxAge:60*60*24*7, // 7 days
    path:"/"
  })
  return response
}

