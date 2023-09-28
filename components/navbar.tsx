

import { UserButton, auth } from '@clerk/nextjs'
import React from 'react'
import { MainNav } from './main-nav'
import StoreSwitcher from './store-switcher'
import prismadb from '@/lib/prismadb'
import { redirect } from 'next/navigation'

const   Navbar = async  () => {
   const {userId} = auth()
   if(!userId){
    redirect("/sign-in")
   }

   const stores = await prismadb.store.findMany({
    where:{ userId:userId}
   })

  return (
    <div className='border-b'>
        <div className='flex h-16 items-center px-4'>
          <StoreSwitcher className='ml-8' items={stores}/>
          <div><MainNav/></div>
          <div className='ml-auto flex items-center space-x-4'>
            <UserButton afterSignOutUrl='/'></UserButton>
          </div>
        </div>
        </div>
  )
}

export default Navbar