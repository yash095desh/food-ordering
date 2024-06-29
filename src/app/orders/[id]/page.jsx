"use client";
import SectionHeading from "@/components/Sectionheading/SectionHeading";
import { clearCart } from "@/lib/features/User";
import { useAppDispatch } from "@/lib/hooks";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function page() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const [order, setOrder] = useState();
  

  const getdate = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const d = new Date(date);
    const dstr = d.toLocaleDateString("en-GB", options);
    return dstr;
  };

  const getExtraPrice =(extra)=>{
    let price = 0
    for(const item of extra){
        price += item?.price
    }
    return price
  }

  const getTotal =(products)=>{
    let total = 0;
    for(const item of products){
        total += item.price;
      }
    return total
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("clearCart")) {
        dispatch(clearCart());
      }
    }
    fetch(`/api/orders?id=${params.id}`)
      .then((res) => res.json())
      .then((res) => setOrder(res));
  }, []);

  return (
    <div className=" m-auto text-center mt-5 ">
      <SectionHeading subheading={"Your Order"} />
      {order && (
        <div className=" flex flex-col  gap-4 max-w-2xl m-auto border  rounded-lg p-4 shadow-md  ">
          <div className=" flex items-end justify-between py-5 border-b-2 border-b-gray-100">
            <div className="flex flex-col gap-2">
            <h1 className=" text-xl font-bold text-left ">
              OrderId <br />
              <span className="text-[16px] text-slate-400 font-medium">
                {order?._id}
              </span>
            </h1>
            <p className=" text-slate-400 text-[16px] text-left" >({order?.email})</p>
            </div>
            <div className="flex flex-col gap-2">
              <p
                className={` px-4 py-2 text-white rounded-md border ${
                  order?.paid
                    ? "bg-green-300 border-green-500"
                    : "bg-red-300 border-red-500"
                }`}
              >
                {order?.paid ? "Paid" : "Cancelled"}
              </p>
              {order?.createdAt && (
                <p className=" text-[16px] ">
                  Order Date :
                  <span className=" text-slate-400">
                    {getdate(order?.createdAt)}
                  </span>
                </p>
              )}
            </div>
          </div>
          <div className=" flex flex-col gap-4">
            {order?.products &&
              order?.products.map((product) => (
                <div className=" flex p-2 gap-4 items-start justify-between border-b-2 border-b-gray-100">
                  <div className=" flex gap-4 items-center">
                    <Image
                      src={product?.image}
                      alt="Image"
                      width={100}
                      height={50}
                      className=" rounded-md border borer-gray-200"
                    />
                    <div className=" text-left">
                      <h1 className="text-lg font-medium ">{product?.name}</h1>
                      <p className=" text-slate-400">
                        {product?.size?.name || "Regular"}
                      </p>
                      {product?.extraIngredients?.length > 0 && 
                      <p>
                    Extra Ingredients 
                    { product?.extraIngredients.map((extra)=>(
                        <span className="text-slate-400 text-sm">
                          {" "+ extra?.name} ${extra?.price} | 
                       </span>
                     ))}
                     </p>
                        }
                    </div>
                  </div>
                  <div className="flex-col gap-4 items-end text-right">
                    <h1 className="text-[16px] font-bold"> BasePrice $ {product?.basePrice}</h1>
                    <p className={` text-slate-400 ${product.extraIngredients.length>0?'':'border-b border-b-gray-100'} `}>
                       +  $ {product?.size?.price || "0"}
                    </p>
                    {product.extraIngredients.length>0 && 
                    <p className=" text-slate-400">
                     + $ {getExtraPrice(product.extraIngredients)}
                  </p>
                    }
                    <h1 className="text-[16px] font-bold"> Total: $ {product?.price}</h1>
                  </div>
                </div>
              ))}
             <div className=" flex justify-between items-end p-2 gap-4">
                <div className="text-left">
                    <h1 className=" text-slate-400" > Delivery Address</h1>
                    <p className=" font-semibold">{order?.address} <br/> {order?.city} , {order?.country} <br /> {order?.postalCode}, PhoneNo : {order?.phoneNumber} </p>

                </div>
             <div className=" text-right">
                <p className="text-slate-400 text-lg">SubTotal : $ {getTotal(order?.products)} </p>
                <p className="text-slate-400 ">Delivery Charge : $ 5 </p>
                <p className=" text-xl font-semibold">Total : $ {getTotal(order?.products) + 5}</p>
              </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default page;
