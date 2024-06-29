'use client'
import DeleteButton from '@/components/DeleteButton'
import MenuItemForm from '@/components/MenuItemsForm/MenuItemForm'
import ProfileTabs from '@/components/ProfileTabs/ProfileTabs'
import UseProfile from '@/components/UseProfile'
import Left from '@/components/icons/Left'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function page() {
    const router = useRouter()
    const {loading,data} = UseProfile();
    const [MenuItem,setMenuItem] = useState(null)
    const params = useParams()

useEffect(()=>{
    fetch('/api/menuItems').then((res)=>res.json()).then((res)=>{setMenuItem(res.find((item)=>item._id == params.id))})
    },[])


const handleSubmit = async(ev,image,name,category,description,basePrice,sizes,extraIngredients) =>{
    ev.preventDefault();
   const uploadPromise = new Promise(async(resolve,reject)=>{
    try {
        const res = await fetch('/api/menuItems',{
            method : "PUT",
            headers : {"Content-Type" : 'application/json'},
            body : JSON.stringify({id:params.id,image,name,category,description,basePrice,sizes,extraIngredients})
        })
        if(res.ok){
            resolve();
            router.push('/menuItems')
        }
    } catch (error) {
        console.log(error)
        reject();
    }
   })
   toast.promise(uploadPromise,{
    loading : 'Updating..',
    success : 'Updated Successfully',
    error:'Error Occoured'
   })
}
const handleDelete = (id)=>{
    const deletePromise = new Promise(async(resolve,reject)=>{
     try {
      const res = await fetch(`/api/menuItems?id=${id}`,{
        method : 'DELETE'
      })
      if(res.ok){
        resolve();
        router.push('/menuItems')
    }
      fetchcategories();
      } catch (error) {
        reject();
        console.log(error)
     }
    })
    toast.promise(deletePromise,{
      loading:'Deleting...',
      success : 'Deleted Successfully',
      error : 'Error Occured'
    })
  }


  return (
    <div className='max-w-2xl m-auto'>
        <ProfileTabs Isadmin={data.Isadmin} />
        <Link href={'/menuItems'} className=' flex items-center justify-center max-w-md gap-2 bg-gray-100 border border-gray-600 p-2 rounded-md font-medium m-auto' > <Left/> Show All Menu Items </Link >
        <MenuItemForm handleSubmit={handleSubmit} MenuItem={MenuItem} handleDelete={handleDelete}/>
    </div>
  )
}

export default page