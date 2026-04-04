import HomeClient from "@/components/homeclient";
import { getSession } from "@/lib/getsession";

export default async function Page() {
  const session=await getSession() // Call getSession to log the token from cookies
  
  return (
    <HomeClient email={session?.user?.email!} />
  )
}
