
import Embedclient from '@/components/embedclient';
import { getSession } from '@/lib/getsession'
import React from 'react'


async function page() {
  const session = await getSession();
  return (
    <>
      <Embedclient ownerId={session?.user?.id!}  />
    </>
  )
}

export default page