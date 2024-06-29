"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function register() {

  const [userData, setUserdata] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isUserCreated,setisUserCreated] = useState(false)
  const [Error,setError] = useState({error:false,message:''})

  const handleChange =(e) => {
    setUserdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setisUserCreated(false)
    setError({error:false,message:''})
    try {
      const res = await fetch('/api/register',{
        headers : {'Content-Type':'application/json'},
        body : JSON.stringify(userData),
        method : 'POST'
      })
      if(res.ok){
        setisUserCreated(true)
        setUserdata({
          username: "",
          email: "",
          password: "",
        })
      }else{
        const {error} = await res.json()
        setError({error:true,message:error.code == 11000 ? 'Username or email already exist':'Internal Error Occured ! Please try Again'})
      }
    } catch (e) {
      console.log(e.message)
      setError({error:true,message:'Internal Error'})
    }
  }
  
  return (
    <section className="my-4">
      <h1 className="text-4xl text-primary text-center mb-4">Register</h1>
      {isUserCreated && <p className="text-center py-2 text-green-600">User Created Sucessfully <br /> You can now  <Link href={'/login'} className=" underline font-semibold" >login &raquo;</Link> </p> }
      <form className="flex flex-col gap-2 max-w-xl m-auto " onSubmit={(e)=>handleSubmit(e)}>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={userData.username}
          onChange={(e) => {
            handleChange(e);
          }}
          disabled={isUserCreated}
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          value={userData.email}
          onChange={(e) => {
            handleChange(e);
          }}
          disabled={isUserCreated}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={userData.password}
          onChange={(e) => {
            handleChange(e);
          }}
          disabled={isUserCreated}
        />
        <button
          type="submit"
          className=" border-none rounded-lg bg-primary text-white px-4 py-2 disabled:opacity-50"
          disabled={isUserCreated}
        >
          Submit
        </button>
        {Error.error && <p className=" text-red-700 text-center">{Error.message}</p> }
        <p className=" text-slate-500 text-center">or login with provider</p>
        <button className="p-2 shadow-md shadow-gray-600 flex items-center justify-center gap-2" type="button" onClick={()=>signIn('google',{callbackUrl:'/'})}>
          <Image src={"/google.png"} width={32} height={32} alt="google logo" />
          Login with google
        </button>
        <p className="text-center text-gray-600">Already have Account ? <Link href={'/login'} className="font-bold underline" >Login &raquo;</Link> </p>
      </form>
    </section>
  );
}

export default register;
