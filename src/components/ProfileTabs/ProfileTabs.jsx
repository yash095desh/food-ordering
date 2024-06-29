'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function ProfileTabs({Isadmin}) {
    const pathname = usePathname()
  return (
    <div className=" flex gap-6 items-center justify-center m-auto my-6 tabs max-w-xl flex-wrap  ">
        <Link href={'/profile'} className = { pathname =='/profile'? 'active':''}  >Profile</Link>
        {Isadmin &&
        <>
        <Link href={'/categories'} className = { pathname =='/categories'? 'active':''} >Categories</Link>
        <Link href={'/menuItems'} className = { pathname.includes('/menuItems')? 'active':''} >Menu</Link>
        <Link href={'/users'} className = { pathname.includes('/users')? 'active':''}>User</Link>
        </>
        }
        <Link href={'/orders'} className = { pathname.includes('/orders')? 'active':''}>Orders</Link>
      </div>
  )
}

export default ProfileTabs