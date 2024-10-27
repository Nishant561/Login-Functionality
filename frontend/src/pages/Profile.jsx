import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import app from "../../firebase";
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from "firebase/storage"
import { frontsignOut, signinSuccess } from "../redux/slices/userSlice";
import toastMessage from "../utils/Error";
import { Toaster } from "react-hot-toast";

function Profile() {
  const { currentUser,appLoading, appError } = useSelector((state) => state.user);
 const profileImage = useRef()
 const dispatch = useDispatch()
  const [formData, setFormData] = useState({});
  const [btnDisable, setBtnDisable] = useState(true);
  const [image, setImage] = useState()
  
 
  const handelChanges = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setBtnDisable(false);
  };

  const handelFormSubmit = async(e) => {
    
    e.preventDefault();
    try {
      const response = await fetch(`/api/user/update/${currentUser._id}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify(formData)
      })
      const data = await response.json()
      if(data.success){
        toastMessage(data.message , true)
        dispatch(signinSuccess(data.data.user))

      }else{
        toastMessage(data.message ,false)
      }
      
    } catch (error) {
      console.log(error)
    }
  };

  const handelDeleteAccount = async(e)=>{
    try {
      const response = await fetch(`/api/user/delete/${currentUser._id}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        }
      })
      const data = await response.json()
      if(data.success){
        toastMessage(data.message , true)
        dispatch(frontsignOut())
      }else{
        toastMessage(data.message,false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handelPhotoUpdate =()=>{
    const storage = getStorage(app)
    const fileName = new Date().getTime() + image.name
    const profilePictureRef = ref(storage, fileName  )
    const uploadTask = uploadBytesResumable(profilePictureRef , image)

    uploadTask.on('state_changed',
      (snapshot)=>{
        const progress =Math.floor(( snapshot.bytesTransferred / snapshot.totalBytes) *100)
        
      },
      (error)=>{
        console.log("Error:: " + error.message)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL)=>{
          setFormData((prev)=> ({...prev , profilePicture:downloadURL}))
          
        })
      }
    )
  }

   useEffect(()=>{
     if(image){
       handelPhotoUpdate()
     }
   },[image])

  return (
    <div className="universal flex items-center justify-center">
      <div className="w-[740px] flex flex-col items-center gap-5 p-3 h-[600px] border-2 bg-[#12403c]  text-[#F75300] rounded-lg">
        <h1 className="text-3xl text-center font-medium">User-Profile</h1>
        <input ref={profileImage} id="profilePicture" onChange={(e)=>setImage(e.target.files[0])} type="file" hidden accept="image/*"  />
        <img
          onClick={()=>profileImage.current.click()}
          
          className="w-[140px] rounded-full cursor-pointer h-[140px]"
          src={ formData?.profilePicture || currentUser.profilePicture}
        />
        <form
          onSubmit={handelFormSubmit}
          className="flex flex-col items-center w-full gap-4"
        >
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
            defaultValue={""}
            className="w-[70%] px-5 rounded-lg h-[47px] focus:outline-none bg-[#15938885] text-white"
          />
          <button
            type="submit"
            disabled={btnDisable}
            className="text-2xl disabled:bg-opacity-70 cursor-pointer rounded-full py-2 font-medium w-[70%] text-white hover:bg-opacity-70 bg-[#F75300]"
          >
            Update
          </button>
        </form>

        <p onClick={handelDeleteAccount} className="w-[70%] bg-red-700 py-3 font-medium rounded-full text-center cursor-pointer  hover:bg-opacity-70 text-xl text-white">
          Delete Account
        </p>
      </div>
      <Toaster/>
    </div>
  );
}

export default Profile;
