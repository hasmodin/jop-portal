import React, { useState, useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { use } from "react";

export default function RecruiterLogin() {
  const { setShowRecruiterLogin } = useContext(AppContext);
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [image, setImage] = useState(false);
  const [isTextDataSubmited, setIsTextDataSubmited] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (state === "Sing Up" && !isTextDataSubmited) {
    //   setIsTextDataSubmited(true);
    // }
    setIsTextDataSubmited(true);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className=" absolute bg-white p-8 rounded-lg flex flex-col space-y-4"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium ">
          Recruiter {state}
        </h1>
        <p className="text-sm">Welcome back! please sign in to continue</p>

        {state === "Sign Up" && isTextDataSubmited ? (
          <>
            <div className="flex items-center gap-4 my-10">
              <label htmlFor="image">
                <img
                  className="w-16 rounded-full"
                  src={image ? URL.createObjectURL(image) : assets.upload_area}
                  alt=""
                />
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  name=""
                  id="image"
                  hidden
                />
              </label>
              <p>
                Upload Company <br />
                Logo
              </p>
            </div>
          </>
        ) : (
          <>
            {state !== "login" && (
              <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                <img src={assets.person_icon} alt="" />
                <input
                  className="outline-none text-sm"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Company name"
                  required
                />
              </div>
            )}
            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.email_icon} alt="" />
              <input
                className="outline-none text-sm"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Id"
                required
              />
            </div>

            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.lock_icon} alt="" />
              <input
                className="outline-none text-sm"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
          </>
        )}

        {state === "login" && (
          <p className="text-blue-600 text-sm my-4 cursor-pointer">
            Fogot password?
          </p>
        )}
        <button
          type="submit"
          className="bg-blue-500 w-full text-white py-2 rounded-full"
        >
          {state === "login"
            ? "Login"
            : isTextDataSubmited
            ? "Sign Up"
            : "Next"}
        </button>
        {state === "login" ? (
          <p className="text-slate-400 mt-4 text-center">
            Don't have an account ?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="bg-blue-500 px-4 py-2 rounded-full text-white cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="text-slate-400 mt-4 text-center">
            Already have an account ?{" "}
            <span
              onClick={() => setState("login")}
              className="bg-blue-500 px-4 py-2 rounded-full text-white cursor-pointer"
            >
              Login
            </span>
          </p>
        )}
        <img
          onClick={() => setShowRecruiterLogin(false)}
          className=" absolute top-1 right-5 cursor-pointer hover:border-2 border-gray-200 rounded-lg p-2"
          src={assets.cross_icon}
          alt=""
        />
      </form>
    </div>
  );
}
