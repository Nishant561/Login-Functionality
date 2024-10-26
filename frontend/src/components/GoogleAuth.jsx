import React, { useState } from 'react'
import {GoogleAuthProvider,getAuth, signInWithPopup} from 'firebase/auth'
import app from '../../firebase'
import toastMessage from '../utils/Error'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { signinSuccess } from '../redux/slices/userSlice'

function GoogleAuth() {

    const{currentUser} =useSelector((state)=>state.user)
    const dispatch = useDispatch()
   
    
    const handelGoogleClick = ()=>{
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            signInWithPopup(auth,provider)
            .then(async(result)=>{
                console.log(result)
                const {displayName , email , photoURL}= result.user
                const formData = {
                    username: displayName,
                    email:email,
                    profilePicture:photoURL
                }
                
                try {
                    const response = await fetch("/api/user/googlesignin",{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json",
                        },
                        credentials:"include",
                        body:JSON.stringify(formData)
                    })
                    const data = await response.json()
                    
                    if(data.success){
                        toastMessage("logged in successfully." , true)
                        dispatch(signinSuccess(data.data.user))
                    }
                } catch (error) {
                    console.log("Error:: " + error.message)
                }
               
                
            })
            .catch((error)=>{
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
      <button onClick={handelGoogleClick} className='bg-red-600 w-full text-white font-semibold text-xl py-4 mt-4 rounded-lg'>Continue With Google </button>
    <Toaster/>
    </>

  )
}

export default GoogleAuth
