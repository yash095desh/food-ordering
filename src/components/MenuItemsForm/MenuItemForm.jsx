'use client'
import React, { useEffect, useState } from 'react'
import EditableImage from '../EditableImage/EditableImage'
import MenuItemsProps from '../MenuItemsProps/MenuItemsProps'
import DeleteButton from '../DeleteButton'

function MenuItemForm({handleSubmit,MenuItem,handleDelete}) {
    const [image ,setImage] = useState()
    const [name,setName] = useState()
    const [description,setDescription] = useState()
    const [basePrice ,setBasePrice] = useState()
    const [sizes,setSize] = useState([]);
    const [extraIngredients,setExtaIngredients] = useState([]);
    const [categories,setCategories] = useState(null)
    const [category,setCategory]  = useState()


    useEffect(()=>{
        setName(MenuItem?.name)
        setImage(MenuItem?.image)
        setDescription(MenuItem?.description)
        setBasePrice(MenuItem?.basePrice)
        setSize(MenuItem?.sizes || [])
        setExtaIngredients(MenuItem?.extraIngredients || [])
        setCategory(MenuItem?.category)
        fetch('/api/categories').then((res)=>res.json()).then((res)=>setCategories(res))
    },[MenuItem])

    
  return (
    <form className=' my-5  flex flex-col md:flex-row gap-5' onSubmit={(ev)=>handleSubmit(ev,image,name,category,description,basePrice,sizes,extraIngredients)} >
    <div className=' mt-4'>
    <EditableImage image={image} setImage={setImage} />
    </div>
    <div className=' flex flex-col profile-input ' style={{flex:3}} >
        <label>Name</label>
        <input type="text"
         placeholder='name' 
         value={name}
         onChange={(ev)=>setName(ev.target.value)}
         />
        
        <label> Description</label>
        <input type="text"
         placeholder='decription' 
         value={description}
         onChange={(ev)=>{
          console.log(category)
          setDescription(ev.target.value)}}
         />

         <label>Category</label>
         <select value={category} onChange={(ev)=>setCategory(ev.target.value)} >
          <option value="">-- select Category --</option>
          {categories && 
          categories.map((c,index)=>{
            return(
              <option value={c._id} key={index}>{c.name}</option>
            )
          })
          }
         </select>

        <label> Basic Price</label>
        <input type="number"
         placeholder='price'
         value={basePrice}
         onChange={(ev)=>{setBasePrice(ev.target.value)}}
         />

        <MenuItemsProps setProps={setSize} props={sizes} name={'Sizes'}/>
        <MenuItemsProps setProps={setExtaIngredients} props={extraIngredients} name={'ExtraIngredients'} />

        <button className=' p-2 bg-green-400 text-white rounded-md my-2' >{MenuItem?'Update':'Submit'}</button>
        {MenuItem && <DeleteButton handleDelete={handleDelete} id={MenuItem?._id} name={'Delete'}/>}
    </div>
    </form>
  )
}

export default MenuItemForm