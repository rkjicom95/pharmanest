import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Logo from "/assets/logo1.png";
import { registerUser } from "../../features/auth/authSlice";
import { showSuccess } from "../../utils/toastMessage";
import { useDispatch } from "react-redux";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({}); // validation errors state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // remove error while typing
  };

  // validate form
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm password is required";

    // ✅ password & confirmPassword match check
    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const result = await dispatch(registerUser(formData)).unwrap();

      console.log("Signup Success ✅", formData);
      showSuccess("You have signed up successfully 🎉");
      navigate("/login");
    } catch (err) {
      console.error("Signup Error ❌", err);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white shadow-lg rounded-2xl p-8 m-4 w-full max-w-md relative"
      >
        {/* Home Button */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="absolute top-1 right-2 text-gray-600"
        >
          <h4 className="text-md text-teal-700 hover:text-red-600 transition underline">
            Home
          </h4>
        </button>

        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <img src={Logo} alt="PharmaNest" className="h-16 w-auto" />
        </div>

        <h2 className="text-2xl font-bold text-center text-teal-700 mb-6 underline">
          Create an Account
        </h2>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-0 focus:ring-teal-700"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-0 focus:ring-teal-700"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-0 focus:ring-teal-700"
          />
          <span
            className="absolute right-3 top-9 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
          </span>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-6 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-0 focus:ring-teal-700"
          />
          <span
            className="absolute right-3 top-9 cursor-pointer text-gray-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
          </span>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Signup Button */}
        <button
          type="submit"
          className="w-full bg-teal-700 text-white py-2 rounded-lg font-medium hover:bg-teal-800 transition duration-200"
        >
          Sign Up
        </button>

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
      </form>
    </div>
  );
};

export default Signup;
