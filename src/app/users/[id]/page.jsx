'use client'
import ProfileTabs from '@/components/ProfileTabs/ProfileTabs'
import UseProfile from '@/components/UseProfile'
import UserProfileForm from '@/components/UserProfileForm/UserProfileForm';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function page() {
    const {loading ,data} = UseProfile();
    const [user,setUser] = useState();
    const params = useParams()
    const router = useRouter()
    const {status} = useSession();

    useEffect(()=>{
        const id = params.id
        fetch(`/api/profile?id=${id}`).then((res)=>res.json()).then((res)=>setUser(res))
    },[params])

    const handleSubmit = async (e,data) => {
        e.preventDefault();
        const profileUpdatePromise = new Promise(async(resolve,reject)=>{
          try {
            const res = await fetch("/api/profile", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({...data}),
            });
            if(res.ok){
                resolve();
                router.push('/users');
            }
          } catch (error) {
            reject();
            console.log(error);
          }
        })
        toast.promise(profileUpdatePromise,{
          loading : 'Updating...',
          success : ' Updated',
          error : 'error'
        })
      };
    
    const handleDelete = async(id)=>{
      const deletePromise = new Promise(async(resolve,reject)=>{
        try {
            const res = await fetch(`/api/profile?id=${id}`,{
                method:"DELETE"
            })
           if(res.ok){
            resolve()
             router.push('/users')
           }
        } catch (error) {
            reject()
            console.log(error)
        }
      })

      toast.promise(deletePromise,{
        loading:'Deleting..',
        success:'Deleted',
        error:'Something went Wrong'
      })
    }

    if(status === 'unauthenticated'){
      return redirect('/login')
    }
    if(loading || status === 'loading'){
      return '...Loading'
    }
    if(status === 'unauthenticated'){
      return 'Only Admin can Access'
    }

  return (
    <div className=' m-auto max-w-2xl'>
        <ProfileTabs Isadmin={data.Isadmin}/>
        <UserProfileForm user={user} handleSubmit={handleSubmit} handleDelete={handleDelete} />
    </div>
  )
}

export default page