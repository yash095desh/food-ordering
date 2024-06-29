'use client'
import EditableImage from '@/components/EditableImage/EditableImage'
import MenuItemForm from '@/components/MenuItemsForm/MenuItemForm'
import ProfileTabs from '@/components/ProfileTabs/ProfileTabs'
import UseProfile from '@/components/UseProfile'
import Left from '@/components/icons/Left'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

function page() {
    const router = useRouter()
    const {loading,data} = UseProfile();


const handleSubmit = async(ev,image,name,category,description,basePrice,sizes,extraIngredients) =>{
    ev.preventDefault();
   const uploadPromise = new Promise(async(resolve,reject)=>{
    try {
        const res = await fetch('/api/menuItems',{
            method : "POST",
            headers : {"Content-Type" : 'application/json'},
            body : JSON.stringify({image,name,description,category,basePrice,sizes,extraIngredients})
        })
        if(res.ok){
            resolve();
            router.push('/menuItems')
        }
    } catch (error) {
        reject();
        console.log(error)
    }
   })

   toast.promise(uploadPromise,{
    loading : 'Creating ...',
    success:'Created Successfully',
    error:'Error Occured'
   })
}


  return (
    <div className='max-w-2xl m-auto'>
        <ProfileTabs Isadmin={data.Isadmin} />
        <Link href={'/menuItems'} className=' flex items-center justify-center max-w-md gap-2 bg-gray-100 border border-gray-600 p-2 rounded-md font-medium m-auto' > <Left/> Show All Menu Items </Link >
        <MenuItemForm handleSubmit={handleSubmit} MenuItem={null}/>
    </div>
  )
}

export default page