
import Embedclient from '@/components/embedclient';
import { getSession } from '@/lib/getsession'
import React from 'react'

export const dynamic = "force-dynamic";

async function page() {
  const session = await getSession();
  const ownerId = session?.user?.id;
  if (!ownerId) {
    return <div>Error: User session not found. Please log in.</div>;
  }
  return (
    <>
      <Embedclient ownerId={ownerId}  />
    </>
  )
}

export default page