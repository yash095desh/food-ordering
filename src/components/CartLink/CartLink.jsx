import Link from "next/link";
import React from "react";
import Cart from "../icons/Cart";

function CartLink({products}) {
  return (
    <Link href={"/cart"} className=" relative">
      <Cart />
      {products?.length > 0 && (
        <span className=" rounded-full bg-primary text-white absolute -top-5 -right-5 text-xs px-2 py-1 ">
          {products?.length}
        </span>
      )}
    </Link>
  );
}

export default CartLink;
