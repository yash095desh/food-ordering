"use client";
import DeleteButton from "@/components/DeleteButton";
import ProfileTabs from "@/components/ProfileTabs/ProfileTabs";
import UseProfile from "@/components/UseProfile";
import Edit from "@/components/icons/Edit";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

 function page() {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState("");
  const [updatingCategory, setUpdatingCategory] = useState(null);
  const { loading: profileLoading, data } = UseProfile();
  const {status} = useSession()

  useEffect(() => {
    fetchcategories();
  }, [setCategories]);

  const fetchcategories = async () => {
    const res = await fetch("api/categories");
    const data = await res.json();
    setCategories(data);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const uploadPromise = new Promise(async (resolve, reject) => {
      try {
        const data = { category };
        if (updatingCategory) {
          data._id = updatingCategory._id;
        }
        const res = await fetch("/api/categories", {
          headers: { "Content-Type": "application/json" },
          method: updatingCategory ? "PUT" : "POST",
          body: JSON.stringify({ data }),
        });
        fetchcategories();
        setCategory("");
        setUpdatingCategory(null);
        if (res.ok) resolve();
      } catch (error) {
        console.log(error);
        reject();
      }
    });
    toast.promise(uploadPromise, {
      loading: <p>{updatingCategory ? "Updating.." : "Creating.."}</p>,
      success: <p>{updatingCategory ? "Updated" : "Created"}</p>,
      error: "Error Occured",
    });
  };

  const removeCategory = (id)=>{
    const deletePromise = new Promise(async(resolve,reject)=>{
     try {
      const res = await fetch(`/api/categories?id=${id}`,{
        method : 'DELETE'
      })
      if(res.ok)resolve();
      fetchcategories();
      } catch (error) {
        reject();
        console.log(error)
     }
    })
    toast.promise(deletePromise,{
      loading:'Deleting...',
      success : 'Deleted Successfully',
      error : 'Error Occured'
    })
  }

  if(status === 'unauthenticated'){
    return redirect('/login')
  }

  if (profileLoading || status === 'loading') {
    return "...loading";
  }
  if (!data.Isadmin) {
    return "Only Admin can access";
  }

  return (
    <div className=" max-w-2xl m-auto">
      <ProfileTabs Isadmin={data.Isadmin} />
      <form
        className=" flex items-end gap-4 max-w-xl m-auto"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col" style={{ flex: 3 }}>
          <label>
            {updatingCategory ? "Update Category" : "Create New Category"}
          </label>
          <input
            type="text"
            placeholder="name"
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="px-6 py-2 bg-primary text-white flex-1 rounded-md">
            {updatingCategory ? "Update" : "Create"}
          </button>
          {updatingCategory && (
            <button
              type="button"
              className="px-6 py-2 bg-gray-100 border border-gray-500 flex-1 rounded-md"
              onClick={() => {
                setUpdatingCategory(null);
                setCategory("");
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className=" max-w-xl m-auto mt-6 ">
        {categories && (
          <>
            <label> Edit Categories </label>
            <div className=" flex flex-col gap-2">
              {categories.map((category) => {
                return (
                  <div
                    className={` px-2 rounded-md border-gray-400 border flex justify-between items-center ${
                      updatingCategory?._id == category._id
                        ? "bg-gray-300"
                        : "bg-gray-100"
                    } `}
                  >
                    {category.name}

                    <div className=" flex gap-2 items-center">
                      <button
                        className="  p-1 px-2 rounded-md border border-gray-400 bg-white "
                        onClick={() => {
                          setUpdatingCategory(category);
                          setCategory(category.name);
                        }}
                      >
                        <Edit />
                      </button>
                      <DeleteButton handleDelete={removeCategory} id={category._id} />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default page;
