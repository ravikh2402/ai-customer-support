import React from 'react'
import { getSession } from "@/lib/getsession";
import Dashboardclient from "@/components/Dashboardclient"; 

export const dynamic = "force-dynamic";

async function page() {
  const session = await getSession();
  const ownerId = session?.user?.id;
  if (!ownerId) {
    return <div>Error: User session not found. Please log in.</div>;
  }
  return (
    <>
      <Dashboardclient ownerId={ownerId}  />
    </>
  )
}

export default page
