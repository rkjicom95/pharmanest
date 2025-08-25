import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Logo from "/assets/logo1.png";

const ResetPassword = () => {
  const { token } = useParams(); // token from URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={Logo} alt="logo" className="h-16" />
        </div>

        <h2 className="text-2xl font-bold text-center text-teal-700 mb-6 underline">
          Reset Password
        </h2>

        {/* New Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full border rounded-lg px-4 py-2 focus:ring-0 focus:ring-teal-700 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full border rounded-lg px-4 py-2 focus:ring-0 focus:ring-teal-700 outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Submit */}
        <button className="w-full bg-teal-700 text-white py-2 rounded-lg font-medium hover:bg-teal-800 transition duration-200">
          Reset Password
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

export default ResetPassword;
