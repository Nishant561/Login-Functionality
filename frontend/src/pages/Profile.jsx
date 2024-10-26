import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData , setFormData] =useState({})
  const [btnDisable , setBtnDisable] = useState(true)
  console.log(formData)
  const handelChanges = (e)=>{
    setFormData((prev)=>({...prev , [e.target.id]:e.target.value}))
    setBtnDisable(false)
  }

  const handelFormSubmit = (e)=>{
    e.preventDefault()

  }

  return (
    <div className="universal flex items-center justify-center">
      <div className="w-[740px] flex flex-col items-center gap-5 p-3 h-[600px] border-2 bg-[#12403c]  text-[#F75300] rounded-lg">
        <h1 className="text-3xl text-center font-medium">User-Profile</h1>
        <img
          className="w-[140px] rounded-full cursor-pointer h-[140px]"
          src={currentUser.profilePicture}
        />
        <form onClick={handelFormSubmit} className="flex flex-col items-center w-full gap-4">
        <input
          type="text"
          id="username"
          defaultValue={currentUser.username}
          
          onChange={handelChanges}
          className="w-[70%] px-5 rounded-lg h-[47px] focus:outline-none bg-[#15938885] text-white"
        />
        <input
          type="email"
          id="email"
          defaultValue={currentUser.email}
          onChange={handelChanges}
          className="w-[70%] px-5 rounded-lg h-[47px] focus:outline-none bg-[#15938885] text-white"
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          onChange={handelChanges}
          defaultValue={''}
          className="w-[70%] px-5 rounded-lg h-[47px] focus:outline-none bg-[#15938885] text-white"
        />
        <button type="submit" disabled={btnDisable} className="text-2xl disabled:bg-opacity-70 cursor-pointer rounded-full py-2 font-medium w-[70%] text-white hover:bg-opacity-70 bg-[#F75300]">
          Update
        </button>
        </form>
       

        <p className="w-[70%] bg-red-700 py-3 font-medium rounded-full text-center cursor-pointer  hover:bg-opacity-70 text-xl text-white">
          Delete Account
          
        </p>
      </div>
    </div>
  );
}

export default Profile;
