import React from "react";
import { Link } from "react-router-dom";
import Logo from "/assets/logo1.png";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    // abhi dummy user
    // dispatch(login({ name: "Rohit Kumar", email: "rohit@test.com" }));
    navigate("/reset-password");
  };
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 m-4 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={Logo} alt="logo" className="h-16" />
        </div>

        <h2 className="text-2xl font-bold text-center text-teal-700 mb-6 underline">
          Forgot Password
        </h2>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enter your Email
          </label>
          <input
            type="email"
            placeholder="Enter your registered email"
            className="w-full border rounded-lg px-4 py-2 focus:ring-0 focus:ring-teal-700 outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleForgotPassword}
          className="w-full bg-teal-700 text-white py-2 rounded-lg font-medium hover:bg-teal-800 transition duration-200"
        >
          Send Reset Link
        </button>

        {/* Back to Login */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-teal-700 hover:text-teal-800 hover:underline"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
