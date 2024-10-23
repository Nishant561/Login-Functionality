import React from 'react'
import { useSelector } from 'react-redux'
import {Link ,NavLink} from 'react-router-dom'

function Header() {
  const {currentUser} = useSelector((state) => state.user)
  return (
    <>
        <div className='navbar w-full bg-[#16423C] h-[78px] py-4 '>
              <div className='max-w-[1200px] mx-auto h-full flex justify-between items-center '>
                     <Link to={''}> <h1 className='font-bold text-3xl text-[#15B392]'>Authorization</h1></Link>
                      <ul className="links-container flex items-center gap-6">
                          <li>  
                            <NavLink to={'/home'} className={({isActive})=>`${isActive?"text-[#73EC8B]" :"text-[#E9EFEC]"} text-2xl font-semibold`}>
                              Home
                            </NavLink>
                          </li>

                          <li>
                            <NavLink to={'/about'} className={({isActive})=>`${isActive?"text-[#73EC8B]" :"text-[#E9EFEC]"} text-2xl font-semibold`}>
                              About
                            </NavLink>
                          </li>
                          <li>

                            {
                              currentUser? <Link to={'/profile'}><div className=''>
                              <img className='w-[47px] object-cover object-center h-[47px] rounded-full' src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} />
                          </div></Link> : <NavLink to={'/signin'} className={({isActive})=>`${isActive?"text-[#73EC8B]" :"text-[#E9EFEC]"} text-2xl font-semibold`}>
                              Signin
                            </NavLink>
                            }
                            
                            
                          </li>

                      </ul>
              </div>
        </div>
    </>
  )
}

export default Header
