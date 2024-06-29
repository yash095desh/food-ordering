"use client";
import ProfileTabs from "@/components/ProfileTabs/ProfileTabs";
import UseProfile from "@/components/UseProfile";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Page() {
  const [orders, setOrders] = useState(null);
  const { loading, data } = UseProfile();

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((res) => setOrders(res));
  }, []);

  const getTotal = (products) => {
    let total = 0;
    for (const item of products) {
      total += item.price;
    }
    return total;
  };

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

  if (loading) {
    return "loading...";
  }

  return (
    <div className=" m-auto text-center mt-5 max-w-3xl ">
      <ProfileTabs Isadmin={data?.Isadmin} />
      <div className=" flex flex-col gap-6 ">
        {orders &&
          orders.map((order,index) => (
            <div key={index} className=" px-6 py-2 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-100 rounded-md ">
              <div className=" flex gap-4 items-center">
              <div className=" flex flex-col text-left " style={{ flex: 3 }}>
                <h1 className=" text-lg font-medium">{order?.email}</h1>
                <p>
                  {order?.products?.length > 0 &&
                    order?.products.map((product,index) => (
                      <span className="text-slate-400 text-sm" key={index}>
                        {" " + product?.name} ,{" "}
                      </span>
                    ))}
                </p>
              </div>
              <p className=" flex-1 text-slate-400 text-sm ">
                {getdate(order?.createdAt)}
              </p>
              <p className=" flex-1 ">$ {getTotal(order.products) + 5}</p>
              </div>
              <div className=" flex gap-4 items-center">
              <p
                className={` border  text-white px-4 py-2 rounded-md ${
                  order?.paid
                    ? "bg-green-400 border-green-500"
                    : " bg-red-400 border-red-500"
                }`}
                style={{ flex: 0.5 }}
              >
                {order?.paid ? "Paid" : "Cancelled"}
              </p>
              <Link
                className=" px-4 py-2  border border-gray-400 rounded-md whitespace-nowrap"
                href={`/orders/${order._id}`}
                style={{ flex: 0.5 }}
              >
                Show Order
              </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Page;
