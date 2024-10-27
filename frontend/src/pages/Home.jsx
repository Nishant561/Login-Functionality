import React from "react";
import "../App.css";
function Home() {
  return (
    <div className="home universal flex items-center justify-center ">
      <div className="w-[800px]   items-center">
        <h1 className="font-semibold text-center text-white text-4xl">
          Welcome to the Authentication page
        </h1>
        <p className="text-justify pt-3 text-xl leading-7 ">
          I am Nishant Baruwal, a full-stack engineer. I developed this
          authenticated page app using the MERN stack (MongoDB, Express, React,
          and Node.js) along with Firebase for secure authentication and
          real-time data management. This project demonstrates my ability to
          integrate frontend and backend technologies while ensuring smooth user
          authentication and data handling.
        </p>
        <div className="w-full pt-5">
            <p className=" inline-block font-medium text-3xl float-right">Nishant Baruwal</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
