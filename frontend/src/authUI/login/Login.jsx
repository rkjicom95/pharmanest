import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { IoMdClose } from "react-icons/io"; // Close icon
import Logo from "/assets/logo1.png";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // abhi dummy user
    dispatch(login({ name: "Rohit Kumar", email: "rohit@test.com" }));
    navigate("/");
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100 ">
      {/* Login Card */}
      <div className="bg-white shadow-lg rounded-2xl m-4 p-8 w-full max-w-md relative">
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
          <img src={Logo} alt="Logo" className="h-16 w-auto" />
        </div>

        <h2 className="text-2xl font-bold text-center text-teal-700 mb-6 underline">
          Login an Account
        </h2>

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
        <div className="mb-6 relative">
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

        {/* Forgot Password Link */}
        <div className="flex justify-end mb-2">
          <Link
            to="/forgot-password"
            className="text-md text-teal-700 hover:text-teal-800 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-teal-700 text-white py-2 rounded-lg font-medium hover:bg-teal-800 transition duration-200"
        >
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Button */}
        <button className="flex items-center justify-center gap-2 w-full border py-2 rounded-lg hover:bg-gray-50 transition duration-200">
          <FcGoogle className="text-xl" />
          <span className="font-medium">Continue with Google</span>
        </button>

        {/* Signup Option */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-teal-700 hover:text-teal-800 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
