'use client'
import React, { useState } from 'react'
import Trash from '../icons/Trash'
import DownArrow from '../icons/DownArrow'
import UpArrow from '../icons/UpArrow'
import Add from '../icons/Add'

function MenuItemsProps({props,setProps,name}) {
    const [isOpen ,setIsOpen] = useState(false)

    const addProps = () =>{
        setProps((prev)=>[...prev,{name:'',price:0}])
      }
      const editProps = (ev,index,prop) =>{
        setProps((prev)=>{
          const newProp = [...prev]
          newProp[index][prop] = ev.target.value
          return newProp
        })
        console.log(props)
      }
  
      const deleteProp= (removeIndex)=>{
        setProps((prev)=>prev.filter((prop,index)=>index !== removeIndex ))
      }
  return (
    <div className=' my-2 bg-gray-200 flex flex-col p-2 rounded-md'>
    <h2 className=' font-medium text-lg my-1 cursor-pointer select-none flex gap-2 items-center' onClick={()=>setIsOpen((prev)=>!prev)} >{isOpen?<UpArrow className='size-4' />:<DownArrow className='size-4' />} {name}  ({props?.length}) </h2>
     <div className={isOpen?'flex flex-col':'hidden'} >
     {props?.length>0 && 
      props.map((prop,index)=>{
        return (
        <div className='flex gap-2 items-end my-1'>
        <div className='flex flex-col '>
          <label>Name</label>
          <input type="text"
           placeholder='name'
           value={prop.name}
           onChange={(ev)=>(editProps(ev,index,'name'))}
           />
        </div>
        <div className='flex flex-col '>
          <label>Price</label>
          <input type="number"
           placeholder='price' 
           value={prop.price}
           onChange={(ev)=>(editProps(ev,index,'price'))}
           />
        </div>
        <div className=' p-2 bg-white rounded-md cursor-pointer' onClick={(ev)=>deleteProp(index)}>
          <Trash/>
        </div>
      </div>)
      })
      }
      <button className=' p-2 rounded-md bg-white font-medium my-2 flex gap-2 items-center justify-center' type='button' onClick={(ev)=>addProps(ev)} > <Add className={'size-4'}/> Add Menu Items</button>
     </div>
   </div>
  )
}

export default MenuItemsProps