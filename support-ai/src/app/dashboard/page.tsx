import React from 'react'
import { getSession } from "@/lib/getsession";
import Dashboardclient from "@/components/Dashboardclient"; 

async function page() {
  const session=await getSession() 
  return (
    <>
      <Dashboardclient ownerId={session?.user?.id!}  />
    </>
  )
}

export default page
