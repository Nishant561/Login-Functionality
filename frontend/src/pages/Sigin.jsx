import React ,{useState} from 'react'
import '../App.css'

import { useDispatch, useSelector } from 'react-redux'
import { signinFailure,signinSuccess,signinStart } from '../redux/slices/userSlice'
import { Link } from 'react-router-dom'
import toast,{ Toaster } from 'react-hot-toast'
import toastMessage from '../utils/Error'

function Sigin() {

  const {currentUser ,appLoading , appError} = useSelector((state)=> state.user)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({});

  const handelChanges = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handelFormSubmit = async(e)=>{
    e.preventDefault()
    try {
      toast.dismiss()
      dispatch(signinFailure())
      dispatch(signinStart())
      const response = await fetch('/api/user/login',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify(formData)
      })

      const data = await response.json()

      if(data.success === true){
        dispatch(signinSuccess(data.data.user))
        toastMessage(data.message , true)
      }else{
        dispatch(signinFailure(data))
        toastMessage(data.message , false)
      }




    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
     <div className="universal flex items-center justify-center">
        <div className="w-[500px] py-4 px-6  border-2 rounded-lg">
          <h1 className="text-3xl font-medium uppercase text-[#025b46]">
            SignIn
          </h1>

          <form
            onSubmit={handelFormSubmit}
            className="mt-8 flex flex-col gap-5"
          >
           
            <input
              type="email"
              id="email"
              onChange={handelChanges}
              placeholder="email"
              className="w-full rounded-lg text-xl p-4 placeholder:uppercase placeholder:text-xl focus:outline-none"
            />
            <input
              type="password"
              id="password"
              onChange={handelChanges}
              placeholder="password"
              className="w-full rounded-lg text-xl p-4 placeholder:uppercase placeholder:text-xl focus:outline-none"
            />

            <button
              disabled={appLoading}
              type="submit"
              className="bg-slate-600  active:bg-green-500 hover:opacity-95 font-semibold rounded-lg text-white p-4 text-2xl"
            >
              {appLoading ? "Loading..." : "Sign in"}
            </button>
          </form>
          <p className="mt-4 w-full text-center">
            <span className="">
              Don't have an account?{" "}
              <Link to={"/signup"} className="text-[#d20ad6] font-bold text-xl">
                Signup
              </Link>
            </span>
          </p>
          {/* {appError && (
            <p className="text-center">
              <span className="text-sm font-medium text-red-600">
                {appError.message}
              </span>
            </p>
          )} */}
        </div>
        <Toaster />
      </div>
    </>
  )
}

export default Sigin
