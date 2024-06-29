'use client'
import React, { useEffect, useState } from 'react'
import EditableImage from '../EditableImage/EditableImage';
import DeleteButton from '../DeleteButton';

function UserProfileForm({handleSubmit,handleDelete,user,loading}) {
    const [User, setUser] = useState('');
    const [image ,setImage] = useState('')

    useEffect(() => {
        setUser((prev)=>({...prev,...user}))
        setImage(user?.image || '/avatar.jpeg')
      }, [user]);


    const handleChange = async (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

  return (
    <form className=" flex-col md:flex-row flex gap-4 max-w-2xl m-auto" onSubmit={(ev)=>handleSubmit(ev,{...User,image})}>
        {image && 
        <EditableImage image={image} setImage={setImage}/>
          }
        <div className="flex flex-col profile-input" style={{ flex: 3 }}>
          <label>UserName</label>
          <input
            type="text"
            placeholder="username"
            name="name"
            value={User.name}
            onChange={(e) => handleChange(e)}
            />
            <label>Email</label>
          <input
            type="email"
            placeholder="email"
            disabled={true}
            value={User.email}
            />
            <label>Phone Number</label>
          <input
            type="Phone Number"
            placeholder="Phone Number"
            name="phoneNumber"
            value={User.phoneNumber}
            onChange={(e) => handleChange(e)}
            />
            <label>Address</label>
          <input
            type="Address"
            placeholder="Address"
            name="address"
            onChange={(e) => handleChange(e)}
            value={User.address}
            />
          <div className=" flex gap-2 ">
            <div className='flex flex-col grow'>
              <label>Postal Code</label>
            <input
              type="Postal Code"
              placeholder="Postal Code"
              name="postalCode"
              value={User.postalCode}
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
              value={User.city}
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
            value={User.country}
            onChange={(e) => handleChange(e)}
          />

          <button className=" bg-green-400 text-white px-6 py-2 rounded-lg mt-5 ">
            {loading ? "Updating.." : "Submit"}
          </button>
          {handleDelete && <DeleteButton handleDelete={handleDelete} id={user?._id} name={'Delete'} />}
        </div>
      </form>
  )
}

export default UserProfileForm