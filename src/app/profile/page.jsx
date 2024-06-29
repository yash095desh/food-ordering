"use client";
import EditableImage from "@/components/EditableImage/EditableImage";
import ProfileTabs from "@/components/ProfileTabs/ProfileTabs";
import UseProfile from "@/components/UseProfile";
import UserProfileForm from "@/components/UserProfileForm/UserProfileForm";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Profile() {
  const [loading,setloading] = useState(false)
  const { data: session, update, status } = useSession();
  const {loading:profileLoading,data} = UseProfile()


  
  const handleSubmit = async (e,data) => {
    e.preventDefault();
    setloading(true)
    const profileUpdatePromise = new Promise(async(resolve,reject)=>{
      try {
        const res = await fetch("/api/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({...data}),
        });
        const user = await res.json();
        await update({ name: user.name, image:user.image });
        resolve();
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
    setloading(false)
  };
  

  if(status === 'unauthenticated'){
    return redirect('/login')
  }
  if(profileLoading || status === 'loading'){
    return '...Loading'
  }

  return (
    <div>
      <ProfileTabs Isadmin={data.Isadmin}/>
      <UserProfileForm  handleSubmit={handleSubmit} user={data} loading={loading} />
    </div>
  );
}

export default Profile;
