import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../../features/auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "/assets/logo1.png";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(new Array(6).fill("")); // 6 box array
  const inputsRef = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error } = useSelector((state) => state.auth);
  const email = location.state?.email;

  // handle change
  const handleChange = (e, index) => {
    let value = e.target.value;
    if (/[^0-9]/.test(value)) return; // only digits allowed

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto move next
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  // backspace handle
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalOtp = otp.join(""); // merge to string
    dispatch(verifyOtp({ email, otp: finalOtp })).then((res) => {
      if (res.payload?.message === "Email verified successfully") {
        navigate("/login");
      }
    });
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100 ">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl m-4 p-8 w-full max-w-md relative"
      >
        {/* Home Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-1 right-2 text-gray-600 "
        >
          <h4 className="text-md text-teal-700 hover:text-red-600 transition underline">
            Home
          </h4>
        </button>

        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <img src={Logo} alt="Logo" className="h-16 w-auto" />
        </div>

        <h2 className="text-2xl font-bold text-center text-teal-700 mb-6 underline">
          Verify OTP
        </h2>

        {/* OTP Input Boxes */}
        <div className="flex justify-between mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center border rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-teal-700"
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-teal-700 text-white py-2 rounded-lg font-medium hover:bg-teal-800 transition"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default VerifyOtp;
