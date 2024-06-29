"use client";
import { useAppSelector } from "@/lib/hooks";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import Cart from "../icons/Cart";
import Navlinks from "./Navlinks";
import CartLink from "../CartLink/CartLink";
import Menu from "../icons/Menu";

function Navbar() {
  const products = useAppSelector((state) => state?.User?.User?.products);
  let session = useSession();
  let username = session?.data?.user?.name || session?.data?.user?.email;
  const [showMenu,setShowMenu] = useState(false)

  if (username && username.includes(" ")) {
    username = username.split(" ")[0];
  }

  return (
    <div className="flex justify-between px-4 py-2 items-center">
      <div className="flex  items-center gap-10 ">
        <span className=" text-primary text-4xl font-bold uppercase ">
          ST Pizza
        </span>
        <div className="hidden md:flex">
        <Navlinks/>
        </div>
      </div>

      <div className="hidden md:flex text-lg font-[500] items-center gap-6 ">
        {session.status === "authenticated" && (
          <>
            <Link href={"/profile"}> Hi,{username}</Link>
            <CartLink products={products}/>
            <button
              type="submit"
              className=" bg-primary px-6 py-2 rounded-lg text-white"
              onClick={() => signOut()}
            >
              LogOut
            </button>
          </>
        )}
        {session.status === "unauthenticated" && (
          <>
            <Link href={"/register"}>Register</Link>
            <Link
              href={"/login"}
              className=" bg-primary px-6 py-2 rounded-2xl text-white"
            >
              Login
            </Link>
          </>
        )}
      </div>
      <div className=" md:hidden flex gap-6 items-center">
        <CartLink products={products}/>
        <div onClick={()=>setShowMenu((prev)=>!prev)} className=" cursor-pointer" ><Menu/></div>
        {showMenu && 
        <div className="fixed h-screen w-full inset-0 z-10 " onClick={()=>setShowMenu(false)}>
          <div className=" bg-white top-0 left-0 h-full w-1/2 flex flex-col justify-center shadow-md " onClick={(ev)=>ev.stopPropagation()}>
          <div className="flex flex-col items-center justify-center gap-10 ">
              <Navlinks/>
              {session.status === "authenticated" && (
          <>
            <Link href={"/profile"} className=" font-bold"> Hi,{username}</Link>
            <button
              type="submit"
              className=" bg-primary px-6 py-2 rounded-lg text-white"
              onClick={() => signOut()}
            >
              LogOut
            </button>
          </>
        )}
        {session.status === "unauthenticated" && (
          <>
            <Link href={"/register"}>Register</Link>
            <Link
              href={"/login"}
              className=" bg-primary px-6 py-2 rounded-2xl text-white"
            >
              Login
            </Link>
          </>
        )}
          </div>
          </div>
        </div>
        }
      </div>
    </div>
  );
}

export default Navbar;
