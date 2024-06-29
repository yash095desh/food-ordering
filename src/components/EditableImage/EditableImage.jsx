'use client'
import Image from 'next/image';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

function EditableImage({image ,setImage}) {
    const [updating, setUpdating] = useState(false);
    const [error,setError] = useState('')

    const handleUpload = (e) => {
       const uploadPromise = new Promise(async(resolve,reject)=>{
        try {
          setUpdating(true);
          setError('')
          let upload = e.target.files[0];
          const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];
          if (acceptedImageTypes.includes(upload.type)) {
            const data = new FormData();
            data.append("file", upload);
            data.append("upload_preset", "food-ordering");
            data.append("cloud_name", "yashdesh");
            const res = await fetch(
              "https://api.cloudinary.com/v1_1/yashdesh/image/upload",
              {
                method: "POST",
                body: data,
              }
            );
            let response = await res.json();
            setImage(response.url)
            if(res.ok){
              resolve();
            }
          } else {
            reject();
            setError('Please enter a valid image')
          }
          setUpdating(false);
        } catch (error) {
          setUpdating(false);
          reject();
          setError(error.message)
        }
       })
       toast.promise(uploadPromise,{
        loading:'Uploading image...',
        success : 'Successfully Uploaded',
        error : <p>{error}</p>
       })
      };

  return (
    <div className=" flex flex-1 flex-col  items-center gap-2">
    
        <div className=" w-40 h-40  md:w-28 md:h-28 relative ">
          {image && 
          <Image
          src={image}
          alt='No Image'
          fill
          className=" object-fit rounded-xl "
        />}
        </div>
        <label className="flex flex-col ">
          <input type="file" className="hidden" onChange={handleUpload} />
          <span className=" cursor-pointer border px-8 py-2 rounded-xl font-semibold  ">
            {image ? updating ? "uploading.." : "Edit":updating ? "uploading.." : "Upload Img"}
          </span>
        </label>
  </div>
  )
}

export default EditableImage