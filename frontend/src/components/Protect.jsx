import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate , Outlet } from 'react-router-dom'

function Protect() {
    const {currentUser} = useSelector((state)=>state.user)
    
  return (
    <>
    {

      currentUser? <Navigate to='/home' /> : <Outlet/>  
    }
    </>
  )
}

export default Protect
