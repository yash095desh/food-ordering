"use client";
import { useAppDispatch } from "@/lib/hooks";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UseProfile from "../UseProfile";
import { add } from "@/lib/features/User";

function MenuCard({ item }) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSize, setSelectedSize] = useState(item?.sizes[0]);
  const [selectedExtra, setSelectedextra] = useState([]);
  const {loading,data} = UseProfile();
  const dispatch = useAppDispatch();

  let selectedPrice = item?.basePrice;

  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }

  if (selectedExtra?.length > 0) {
    for (const extra of selectedExtra) {
      selectedPrice += extra.price;
    }
  }

  const handleClick = () => {
    if(!data?.email) return toast.error("Please Login First")

    if (
      !item?.sizes.length > 0 ||
      !item?.extraIngredients.length > 0 ||
      showPopup
    ) {
      dispatch(
        add({
          ...item,
          size: selectedSize,
          price:selectedPrice,
          extraIngredients: [...selectedExtra],
        })
      );
      setShowPopup(false);
      return toast.success("Added to Cart");
    }
    if (!showPopup) {
      setShowPopup(true);
    }
  };
  const handleExtra = (ev, extra) => {
    let checked = ev.target.checked;
    if (!checked) {
      setSelectedextra((prev) => {
        const newitems = prev.filter((i) => extra.name !== i.name);
        return newitems;
      });
    } else {
      setSelectedextra((prev) => [...prev, extra]);
    }
  };

  if (showPopup) {
    return (
      <div
        className="fixed h-screen w-full inset-0 bg-black/80 flex items-center justify-center z-10 "
        onClick={() => setShowPopup(false)}
      >
        <div className=" bg-white rounded-lg max-w-md p-2">
        <div
          className="overflow-y-scroll p-2 "
          style={{ maxHeight: "calc(100vh - 80px)" }}
          onClick={(ev) => ev.stopPropagation()}
          >
          <div className=" flex flex-col  px-4 py-2 justify-center gap-4  ">
            <div className="relative w-56 h-40 m-auto ">
              <Image src={item.image} alt="ItemImage" fill className=" object-contain" />
            </div>
            <h3 className="text-3xl font-bold text-center">{item?.name}</h3>
            <p className="text-slate-600 text-center ">{item?.description}</p>
            <div className=" flex flex-col gap-2 ">
              <h3 className="text-xl font-bold">Sizes</h3>
              {item?.sizes.length > 0 &&
                item?.sizes.map((size) => (
                  <label className=" py-3 px-6 border text-lg border-gray-600 flex gap-2 rounded-md  ">
                    <input
                      type="radio"
                      name="size"
                      onChange={() => setSelectedSize(size)}
                      checked={selectedSize?.name === size?.name}
                    />
                    {size?.name} $ {size?.price}
                  </label>
                ))}
            </div>
            <div className=" flex flex-col gap-2 ">
              <h3 className="text-xl font-bold">Extra Ingredients</h3>
              {item?.extraIngredients?.length > 0 &&
                item?.extraIngredients.map((extra) => (
                  <label className=" py-3 px-6 border text-lg border-gray-600 flex gap-2 rounded-md  ">
                    <input
                      type="checkbox"
                      checked={selectedExtra
                        .map((e) => e.name)
                        .includes(extra.name)}
                      onChange={(ev) => handleExtra(ev, extra)}
                      name={extra.name}
                    />
                    {extra?.name} $ {extra?.price}
                  </label>
                ))}
            </div>
            <button
              className="px-10 py-2 bg-primary rounded-lg text-white sticky bottom-2 "
              onClick={() => handleClick()}
            >
              Add to Cart <span> $ {selectedPrice}</span>
            </button>
          </div>
          </div>
          </div>
      </div>
    );
  }

  return (
    <div className=" bg-gray-100  rounded-2xl w-full md:w-[30%] flex flex-col items-center gap-4 px-4 py-4 text-center hover:bg-white hover:shadow-md hover:shadow-slate-700 ">
      <div className="relative w-36 h-28">
        <Image alt="Image" src={item.image} fill className=" object-contain" />
      </div>
      <h3 className="text-2xl font-bold">{item?.name}</h3>
      <p className="text-sm text-slate-600 ">{item?.description}</p>
      <button
        onClick={() => handleClick()}
        className="px-10 py-2 bg-primary rounded-full text-white"
      >
        Add to Cart <span> $ {item?.basePrice}</span>{" "}
      </button>
    </div>
  );
}

export default MenuCard;
