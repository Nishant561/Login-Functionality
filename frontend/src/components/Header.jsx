import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { frontsignOut, signinFailure } from "../redux/slices/userSlice";
import { persistor } from "../redux/store";
import toastMessage from "../utils/Error";
import { Toaster } from "react-hot-toast";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handelSignOut = async () => {
    try {
      const response = await fetch("/api/user/signout", {
        method: "GET",
      });
      const data = await response.json();
      if (data.success) {
        dispatch(frontsignOut());
        toastMessage("Logged Out successfully.", true);
        setTimeout(async () => {
          await persistor.purge();
        }, 1000);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="navbar w-full bg-[#16423C] h-[78px] py-4 ">
        <div className="max-w-[1200px] mx-auto h-full flex justify-between items-center ">
          <Link to={""}>
            {" "}
            <h1 className="font-bold text-3xl text-[#15B392]">Authorization</h1>
          </Link>
          <ul className="links-container flex items-center gap-6">
            <li>
              <NavLink
                to={"/home"}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-[#73EC8B]" : "text-[#E9EFEC]"
                  } text-2xl font-semibold`
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to={"/about"}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-[#73EC8B]" : "text-[#E9EFEC]"
                  } text-2xl font-semibold`
                }
              >
                About
              </NavLink>
            </li>
            {currentUser && (
              <li
                onClick={handelSignOut}
                className="text-2xl font-semibold text-white cursor-pointer"
              >
                Signout
              </li>
            )}
            <li>
              {currentUser ? (
                <Link to={"/profile"}>
                  <div className="">
                    <img
                      className="w-[47px] object-cover object-center block h-[47px] rounded-full"
                      src={
                        currentUser?.profilePicture
                          ? encodeURI(currentUser.profilePicture)
                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      }
                      alt={"profile url"}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </Link>
              ) : (
                <NavLink
                  to={"/signin"}
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-[#73EC8B]" : "text-[#E9EFEC]"
                    } text-2xl font-semibold`
                  }
                >
                  Signin
                </NavLink>
              )}
            </li>
          </ul>
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default Header;
