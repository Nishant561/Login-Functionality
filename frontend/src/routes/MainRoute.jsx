import React, { lazy, Suspense } from "react";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Loading from "../components/Loading";
import Protect from "../components/Protect";

const Home = lazy(() => import("../pages/Home"));
const Profile = lazy(() => import("../pages/Profile"));
const About = lazy(() => import("../pages/About"));
const Sigin = lazy(() => import("../pages/Sigin"));
const Signup = lazy(() => import("../pages/Signup"));
const Layout = lazy(() => import("../Layout/Layout"));

function MainRoute() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Navigate to={"home"} replace={true} />,
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "signin",
          element: <Protect/>,
          children:[
            {path:"" , element:<Sigin/>}
          ]
          
        },
        {
          path: "signup",
          element: <Protect/>,
          children:[
            {path:"" , element:<Signup/>}
          ]
        },
      ],
    },
    {
      path: "*",
      element: <div>404 error :: page not found</div>,
    },
  ]);
  return (
    <>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </>
  );
}

export default MainRoute;
