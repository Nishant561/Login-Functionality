import React, { useState } from 'react'
import {GoogleAuthProvider,getAuth, signInWithPopup} from 'firebase/auth'
import app from '../../firebase'
function GoogleAuth() {


    const [formData , setFormData] = useState({})
    const handelGoogleClick = ()=>{
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            signInWithPopup(auth,provider)
            .then((result)=>{
                const {displayName , email , photoURL}= result.user
                setFormData((prev)=>({
                    username:displayName,
                    email:email,
                    profilePicture:photoURL
                }))
                console.log(formData)
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
    </>
  )
}

export default GoogleAuth
