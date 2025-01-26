import React, { useContext } from "react";
import { assets } from "../assets/assets.js";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

export default function Navbar() {
  const { openSignIn } = useClerk();
  const { user } = useUser();

  const { setShowRecruiterLogin } = useContext(AppContext);

  const navigate = useNavigate();

  return (
    <div className="py-4 shadow-lg">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img
          onClick={() => navigate("/")}
          className="cursor-pointer"
          src={assets.logo}
          alt="logo"
        />
        {user ? (
          <div className="flex space-x-3">
            <Link to={"/Applications"}>Applied Job</Link>
            <p>|</p>
            <p className="max-sm:hidden">
              Hi, {user.firstName + " " + user.lastName}
            </p>
            <UserButton />
          </div>
        ) : (
          <div className="flex space-x-8">
            <button
              onClick={() => setShowRecruiterLogin(true)}
              className="text-gray-600"
            >
              Recruiter Login
            </button>
            <button
              onClick={(e) => openSignIn()}
              className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
