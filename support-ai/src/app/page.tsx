import HomeClient from "@/components/homeclient";
import { getSession } from "@/lib/getsession";

export default async function Page() {
  try {
    const session = await getSession()
    return (
      <HomeClient email={session?.user?.email} />
    )
  } catch (error) {
    console.error("Page error:", error)
    return (
      <HomeClient />
    )
  }
}
