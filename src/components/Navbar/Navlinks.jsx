'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function Navlinks() {
    const pathname = usePathname()
  return (
    <nav className=" flex flex-col md:flex-row gap-8 text-lg font-[500] items-center">
          <Link href={"/"} className={`ease-in-out delay-300  ${pathname == '/'?' border-b-2 border-b-primary  ':''}`} >Home</Link>
          <Link href={"/menu"} className={`ease-in-out delay-300  ${pathname == '/menu'?' border-b-2 border-b-primary':''}`} >Menu</Link>
          <Link href={"/#about"} className={`ease-in-out delay-300  ${pathname == '/#about'?' border-b-2 border-b-primary':''}`} >About</Link>
          <Link href={"/#contact"} className={`ease-in-out delay-300  ${pathname == '/#contact'?' border-b-2 border-b-primary':''}`} >Contact</Link>
    </nav>
  )
}

export default Navlinks