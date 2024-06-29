import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

function UseProfile() {
    const[loading,setloading] = useState(false)
    const [data ,setData] = useState('')
    const {data : session} = useSession()

    useEffect(()=>{
        getUserInfo()
    },[session])

    const getUserInfo = async () => {
        setloading(true)
        try {
          const res = await fetch("/api/profile");
          const data = await res.json();
          if (res.ok) {
            setData(data)
          }
          setloading(false)
        } catch (error) {
          console.log(error);
          setloading(false)
        }
      };

  return { loading ,data}
}

export default UseProfile