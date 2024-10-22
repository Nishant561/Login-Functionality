import React from 'react'
import {Link ,NavLink} from 'react-router-dom'
function Header() {
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
                            <NavLink to={'/signin'} className={({isActive})=>`${isActive?"text-[#73EC8B]" :"text-[#E9EFEC]"} text-2xl font-semibold`}>
                              Signin
                            </NavLink>
                          </li>

                      </ul>
              </div>
        </div>
    </>
  )
}

export default Header
