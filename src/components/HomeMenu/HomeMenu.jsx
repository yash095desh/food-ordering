"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import MenuCard from '../MenuCard/MenuCard'
import SectionHeading from '../Sectionheading/SectionHeading'

function HomeMenu() {
  const [bestSellers,setbestSellers] = useState([])

  useEffect(()=>{
    fetch('/api/menuItems').then((res)=>res.json()).then((res)=>{
      setbestSellers(res.slice(-3))
    },)
  },[])

  return (
    <div className=''>
      <div className='relative mb-20'>
      <div className=' absolute left-0 -top-6 -z-10'>
            <Image alt='Image' src={'/sallad1.png'}  className=' object-contain' height={190} width={109}/>
        </div>
        <div className=' absolute right-0 -top-24 -z-10 '>
            <Image  alt='Image' src={'/sallad2.png'}  className=' object-contain' height={195} width={107}/>
        </div>
       <SectionHeading heading={'Check Out'} subheading={'Our Best Sellers'}/>
      </div>
      <div className='flex flex-wrap gap-4 justify-evenly'>
       {bestSellers?.length > 0 &&
        bestSellers.map((item,index)=> <MenuCard item={item} key={index}/>)
       }
      </div>
    </div>
  )
}

export default HomeMenu