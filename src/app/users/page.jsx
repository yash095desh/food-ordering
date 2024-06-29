"use client";
import ProfileTabs from "@/components/ProfileTabs/ProfileTabs";
import UseProfile from "@/components/UseProfile";
import Edit from "@/components/icons/Edit";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const [users, setUser] = useState();
  const {loading,data} = UseProfile();
  const {status} = useSession();

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((res) =>{
        const usersData = res.filter((u)=>data.email !== u.email) 
        setUser(usersData)
      });
  }, [data]);

 
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
    <div className=" m-auto max-w-2xl">
      <ProfileTabs Isadmin={true} />
      <h1 className=" text-xl font-medium  mb-4">Users </h1>
      <div className=" flex flex-col gap-2">
        {users &&
          users.map((user,index) => {
            return (
              <div key={index} className="bg-gray-100 border border-gray-500 p-2 rounded-md flex items-center justify-between min-h-16 ">
                <div className="flex items-center gap-2 ">
                <Image  alt="Image" src={user?.image || '/avatar.jpeg'} width={50} height={50} className=" rounded-full" />
                <h3>{user.name}</h3>
                <p>({user.email})</p>
                </div>
                <Link className=" p-2 bg-white rounded-md border border-gray-600" href={`/users/${user._id}`} ><Edit/></Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Page;
