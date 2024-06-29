"use client";
import React, { useState } from "react";
import Trash from "./icons/Trash";

function DeleteButton({ handleDelete, id ,name}) {
  const [isOpen, setIsOpen] = useState(false);

  if (isOpen) {
    return (
      <div className=" fixed flex justify-center items-center h-full inset-0 bg-black/80">
        <div className=" px-8 py-6 border border-gray-400 bg-white flex flex-col gap-4 items-center justify-center rounded-md">
          <p className=" text-lg text-gray-600">Press 'Confirm' to delete</p>
          <div className=" flex gap-4">
            <button
              className=" p-1 px-2 rounded-md border border-gray-400 bg-primary text-white"
              onClick={() => {
                  handleDelete(id);
                  setIsOpen(false);
              }}
              type="button"
            >
              Confirm
            </button>
            <button
              className=" p-1 px-2 rounded-md border border-gray-400 bg-white"
              onClick={(ev) => setIsOpen(false)}
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      className=" p-2 items-center justify-center rounded-md border flex gap-2 my-2  bg-primary text-white"
      onClick={() => setIsOpen(true)}
      type="button"
    >
      <Trash/> {name} 
    </button>
  );
}

export default DeleteButton;
