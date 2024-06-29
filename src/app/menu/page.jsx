'use client'
import MenuCard from '@/components/MenuCard/MenuCard';
import SectionHeading from '@/components/Sectionheading/SectionHeading';
import React, { useEffect, useState } from 'react'

function page() {
    const [categories,setcategories] = useState();
    const [menuItems,setMenuItems] = useState();

    useEffect(()=>{
        fetch('/api/categories').then((res)=>res.json()).then((res)=>setcategories(res))
        fetch('/api/menuItems').then((res)=>res.json()).then((res)=>setMenuItems(res))
    },[])

  return (
    <div className='max-w-5xl m-auto my-10'>
        { categories?.length > 0 && 
         categories.map((category,index)=>(
            <div className=' my-4' key={index} >
                <SectionHeading subheading={category.name} className=""/>
                <div className=' flex flex-wrap gap-4 justify-around'>
                    {menuItems?.length && 
                    menuItems.filter((item)=>category._id === item.category ).map((item)=>(
                        <MenuCard item={item}/>
                    ))
                    }
                </div>
            </div>
         ))
        }

    </div>
  )
}

export default page