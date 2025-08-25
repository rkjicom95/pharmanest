import React, { useState } from "react";
// import { FcGoogle } from "react-icons/fc";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import Logo from "/assets/logo1.png";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 m-4 w-full max-w-md relative">
        {/* Close Button (Top Right Corner) */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-1 right-2 text-gray-600 "
        >
          <h4 className="text-md text-teal-700 hover:text-red-600 transition underline">
            Home
          </h4>
          {/* <IoMdClose size={28} /> */}
        </button>

        {/* Logo / Title */}
        <div className="flex items-center justify-center mb-6">
          <img src={Logo} alt="PharmaNest" className="h-16 w-auto" />
        </div>

        <h2 className="text-2xl font-bold text-center text-teal-700 mb-6 underline">
          Create an Account
        </h2>

        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full border rounded-lg px-4 py-2 focus:ring-0 focus:ring-teal-700 outline-none"
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-lg px-4 py-2 focus:ring-0 focus:ring-teal-700 outline-none"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full border rounded-lg px-4 py-2 focus:ring-0 focus:ring-teal-700 outline-none"
          />
          <span
            className="absolute right-3 top-9 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
          </span>
        </div>

        {/* Confirm Password */}
        <div className="mb-6 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            className="w-full border rounded-lg px-4 py-2 focus:ring-0 focus:ring-teal-700 outline-none"
          />
          <span
            className="absolute right-3 top-9 cursor-pointer text-gray-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
          </span>
        </div>

        {/* Signup Button */}
        <button className="w-full bg-teal-700 text-white py-2 rounded-lg font-medium hover:bg-teal-800 transition duration-200">
          Sign Up
        </button>

        {/* Divider */}
        {/* <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div> */}

        {/* Google Signup */}
        {/* <button className="flex items-center justify-center gap-2 w-full border py-2 rounded-lg hover:bg-gray-50 transition duration-200">
          <FcGoogle className="text-xl" />
          <span className="font-medium">Continue with Google</span>
        </button> */}

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-teal-700 hover:text-teal-800 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
