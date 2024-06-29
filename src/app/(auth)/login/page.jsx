"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {  useState } from "react";

function LoginPage() {
    
const [userData, setUserdata] = useState({
    email: "",
    password: "",
  }); 
const [Error,setError] = useState({error:false,message:''})
const [isLoading,setisLoading] = useState(false)
const router = useRouter()


  const handleChange =(e) => {
    setUserdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setisLoading(true)
    const res = await signIn('credentials',{...userData,redirect:false})
    console.log(res)
    if(res.error){
      setError({error:true,message:'Invalid username or password'})
    }
    else{
      router.push('/')
    }
    setisLoading(false)
  }
  
  return (
    <section className="my-4">
      <h1 className="text-4xl text-primary text-center mb-4">Login</h1>
      <form className="flex flex-col gap-2 max-w-xl m-auto " onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          name="email"
          value={userData.email}
          onChange={(e) => {
            handleChange(e);
          }}
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={userData.password}
          onChange={(e) => {
            handleChange(e);
          }}
          disabled={isLoading}
        />
        <button
          type="submit"
          className=" border-none rounded-lg bg-primary text-white px-4 py-2 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? '...Logging':'Submit'}
        </button>
        {Error.error && <p className="text-red-700 text-center">{Error.message}</p> }
        <p className=" text-slate-500 text-center">or login with provider</p>
        <button className="p-2 shadow-md shadow-gray-600 flex items-center justify-center gap-2"
          onClick={()=>signIn('google',{callbackUrl:'/'})}
          type="button"
        >
          <Image src={"/google.png"} width={32} height={32} alt="google logo" />
          Login with google
        </button>
        <p className="text-center text-gray-600"> Don `&apos;` t  have Account ? <Link href={'/register'} className="font-bold underline" >Register &raquo;</Link> </p>
      </form>
    </section>
  )
}

export default LoginPage