'use client'
import SectionHeading from "@/components/Sectionheading/SectionHeading";
import UseProfile from "@/components/UseProfile";
import Trash from "@/components/icons/Trash";
import { remove } from "@/lib/features/User";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Page() {
    const {loading,data:profileData} = UseProfile()
    const [User ,setUser] = useState(null)
    const products = useAppSelector((state) => state.User.User.products);
    const dispatch = useAppDispatch();
    let totalPrice = 0 ;

    const checkOut = async(ev)=>{
        ev.preventDefault()
        if(!User.address || !User.postalCode || !User.city || !User.phoneNumber || !User.country)return toast.error('Address required');

        const CheckOutPromise = new Promise(async(resolve,reject)=>{
            let address = {phoneNumber:User.phoneNumber,address:User.address,postalCode:User.postalCode,city:User.city,country:User.country}

        try {
            const res = await fetch('/api/checkout',{
                method : "POST",
                headers : {"Content-Type":"application/json"},
                body : JSON.stringify({products,address})
            })
            if(res.ok){
                const url = await res.json()
                window.location = url ;
               return setTimeout(() => {
                    resolve();
                }, 1000);
            }
            reject();
        } catch (error) {
            reject();
            console.log(error.message)
        }
        })

        toast.promise(CheckOutPromise,{
            loading : 'redirecting to Payment Page',
            success : 'redirected successfully',
            error : 'Error Occured'
        })

    }
    useEffect(()=>{
        if(typeof window !== 'undefined'){
            if(window.location.href.includes('cancelled')){
                toast.error('Payment Failed')
            }
        }
    },[])

    useEffect(()=>{
        setUser((prev)=>({...prev,...profileData}))
    },[profileData])

    const getTotalPrice = (item) =>{
        let total = item.basePrice;
        if(item?.sizes.length > 0){
            total += item?.size?.price;
        }
        if(item?.extraIngredients){
            for(const extra of item?.extraIngredients){
                total += extra?.price
            }
        }
        return total
    }
    for( const item of products ){
        totalPrice += getTotalPrice(item)
    }

    const handleChange = async (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    if(!products?.length > 0){
        return (
            <div className=" mt-6 text-center">
                <SectionHeading subheading={"Cart"} />
                <p className=" text-lg text-slate-400 font-medium" >Your Cart is Empty 😢</p>
            </div>
        )
    }
    if(!profileData){
        return 'Please Login first'
    }

  return (
    <div className=" my-6">
      <SectionHeading subheading={"Cart"} />
      <div className=" block md:flex gap-4 mt-6 " >
        <div className=" flex flex-col gap-2 flex-1" >
        {products?.length>0 &&
            products.map((item,index)=>(
            <div className=" flex border-b-gray-200 border-b-2 p-2 rounded-md items-center justify-between " key={index} >
                <div className=" flex gap-4">
                    <Image alt="Image" src={item?.image} width={100} height={50}/>
                    <div className=" flex flex-col gap-1 justify-center" >
                        <h1 className=" text-xl font-bold" >{item?.name}</h1>
                        <p className=" text-slate-500" >
                            Size : {item.sizes.length>0 ? `${item?.size?.name} $ ${item?.size?.price} ` : 'Regular' }
                        </p>
                        {item?.extraIngredients &&
                            item.extraIngredients.map((extra,index)=>(
                                <p className=" text-slate-500" key={index} >Extra {extra?.name} ${extra?.price} </p>
                            ))
                        }
                    </div>
                </div>
                <div className=" flex gap-4 p-2 items-center " >
                <h1 className=" text-xl font-bold" > $ {getTotalPrice(item)}</h1>
                <button className=" p-2 border border-gray-500 rounded-md" onClick={()=>dispatch(remove(index))} ><Trash/></button>
                </div>
            </div>
            ))
        }
        <div className=" text-md font-bold text-end px-6" > 
            <span className=" text-slate-400 text-md font-medium" >SubTotal :</span>  $ {totalPrice}
        </div>
        <div className=" text-md font-bold text-end px-6" > 
            <span className=" text-slate-400 text-md font-medium" > Delivery Fees :</span>  $ 5
        </div>
        <div className=" text-xl font-bold text-end px-6" > 
            <span className=" text-slate-400 text-lg font-medium" >Total :</span>  $ {totalPrice + 5}
        </div>
        </div>
        <form className=" flex flex-col gap-2 flex-1 p-4 rounded-lg bg-gray-50 h-fit border border-gray-500" onSubmit={checkOut} >
        <label>Phone Number</label>
          <input
            type="Phone Number"
            placeholder="Phone Number"
            name="phoneNumber"
            value={User?.phoneNumber}
            onChange={(e) => handleChange(e)}
            />
        <label>Address</label>
          <input
            type="Address"
            placeholder="Address"
            name="address"
            onChange={(e) => handleChange(e)}
            value={User?.address}
            />
          <div className=" flex gap-2 ">
            <div className='flex flex-col grow'>
              <label>Postal Code</label>
            <input
              type="Postal Code"
              placeholder="Postal Code"
              name="postalCode"
              value={User?.postalCode}
              onChange={(e) => handleChange(e)}
              className=" flex-1"
              />
                </div>
              <div className='flex flex-col grow'>
                <label>City</label>
            <input
              type="City"
              placeholder="City"
              name="city"
              value={User?.city}
              onChange={(e) => handleChange(e)}
              className=" flex-1"
              />
              </div>
          </div>
          <label>Country</label>
          <input
            type="Country"
            placeholder="Country"
            name="country"
            value={User?.country}
            onChange={(e) => handleChange(e)}
          />
        <button className=" bg-primary text-white px-6 py-2 rounded-lg mt-2 ">
            Pay  $ {totalPrice + 5}
        </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
