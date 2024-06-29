'use client'
import ProfileTabs from '@/components/ProfileTabs/ProfileTabs'
import UseProfile from '@/components/UseProfile'
import Right from '@/components/icons/Right'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Page() {
    const {loading , data} = UseProfile()
    const [menuItems ,setMenuItems] = useState(null)
    const {status} = useSession();

    useEffect(()=>{
         fetch('/api/menuItems').then((res)=>res.json()).then((res)=>setMenuItems(res))
    },[])

    if(status === 'unauthenticated'){
      return redirect('/login')
    }
    if (loading || status === 'loading') {
      return "...loading";
    }
    if (!data.Isadmin) {
      return "Only Admin can access";
    }
  
  return (
    <div className='max-w-2xl m-auto'>
        <ProfileTabs Isadmin={data.Isadmin} />
        <Link href={'/menuItems/new'} className=' flex items-center justify-center max-w-md gap-2 bg-gray-100 border border-gray-600 p-2 rounded-md font-medium m-auto' >Create new MenuItem <Right/> </Link >
        <div className=' my-4'>
            <h1 className=' text-gray-500 text-md mb-2' >Edit Menu Items:</h1>
            {menuItems && 
            <div className=' flex flex-wrap gap-4'>
           {menuItems.map((items,index)=>(
                 <Link href={`/menuItems/edit/${items._id}`} key={index} className=' flex flex-col gap-4 p-2 bg-gray-100 rounded-md md:w-[31%] w-full items-center ' >
                    <div className='relative w-36 h-28 '>
                    <Image src={items.image} alt='image' fill className=' rounded-md' objectFit='contain'/>
                    </div>
                    <div className=' flex flex-col gap-2'>
                    <h3 className=' font-semibold'>{items.name}</h3>
                    <p className=' text-sm line-clamp-2' >{items.description}</p>
                    </div>
                </Link>
                ))}
            </div>
            }
        </div>
    </div>
  )
}

export default Page