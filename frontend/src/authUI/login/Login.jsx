import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { IoMdClose } from "react-icons/io"; // Close icon
import Logo from "/assets/logo1.png";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, loginWithGoogle } from "../../features/auth/authSlice";
import { showSuccess, showError } from "../../utils/toastMessage";
import { useGoogleLogin } from "@react-oauth/google";
// import { login } from "../../features/auth/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import { saveAuthData } from "../../utils/localStorage";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({}); // validation errors state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // remove error while typing
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const result = await dispatch(loginUser(formData)).unwrap();

      saveAuthData(result);

      showSuccess("You have logged in successfully 🎉");
      navigate("/");
    } catch (err) {
      showError(err?.message || "Email or password does not match ❌");
    }
  };

  // const googleLogin = useGoogleLogin({
  //   onSuccess: async (tokenResponse) => {
  //     try {
  //       const accessToken = tokenResponse?.access_token;
  //       if (!accessToken) throw new Error("No access token received");

  //       const result = await dispatch(
  //         loginWithGoogle({ accessToken })
  //       ).unwrap();

  //       // ✅ Save data to localStorage
  //       saveAuthData(result);

  //       showSuccess("Logged in with Google 🎉");
  //       navigate("/");
  //     } catch (e) {
  //       console.error("Google login error:", e);
  //       showError(e?.message || "Google login failed ❌");
  //     }
  //   },
  //   onError: () => showError("Google Sign-In failed ❌"),
  //   scope: "openid email profile",
  // });

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100 ">
      {/* Login Card */}
      <form className="bg-white shadow-lg rounded-2xl m-4 p-8 w-full max-w-md relative">
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
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Enter your email"
            className={`w-full border rounded-lg px-4 py-2 outline-none ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-6 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className={`w-full border rounded-lg px-4 py-2 outline-none ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          <span
            className="absolute right-3 top-9 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
          </span>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Error from API */}
        {errors.api && (
          <p className="text-red-600 text-sm mb-3 text-center">
            {(errors.api, "Please check email and password")}
          </p>
        )}

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
          type="submit"
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

        {/* Google Signup */}
        {/* <button className="flex items-center justify-center gap-2 w-full border py-2 rounded-lg hover:bg-gray-50 transition duration-200">
          <FcGoogle className="text-xl" />
          <span className="font-medium">Continue with Google</span>
        </button> */}

        {/* Google Button */}
        {/* ✅ Google Login Button */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const idToken = credentialResponse.credential;
                if (!idToken) throw new Error("No ID Token received");

                const result = await dispatch(
                  loginWithGoogle({ idToken })
                ).unwrap();

                // ✅ save localStorage
                saveAuthData({
                  token: result.token,
                  user: result.user,
                });

                showSuccess("Logged in with Google 🎉");
                navigate("/");
              } catch (e) {
                showError(e?.message || "Google login failed ❌");
              }
            }}
            onError={() => {
              showError("Google Sign-In failed ❌");
            }}
          />
        </div>

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
      </form>
    </div>
  );
};

export default Login;
