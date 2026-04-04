import { cookies } from "next/headers";
import { scalekit } from "./scalekit";

export async function getSession() {
  const session=await cookies()
  const Token=session.get("access_token")?.value
  
  if(!Token){
    return null
  }
  try {
    const result:any=await scalekit.validateToken(Token!)
    const user=await scalekit.user.getUser(result.sub)
    return user
  } catch (error) {
    console.error("Token validation failed:", error)
    return null
  }
  
}