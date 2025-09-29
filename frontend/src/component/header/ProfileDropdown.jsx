import React, { useState } from "react";
import { useNavigate, useDispatch } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Profile icon
import { logout } from "../../features/auth/authSlice";

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Profile Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center text-teal-700 text-3xl hover:text-teal-800"
      >
        <FaUserCircle />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2 z-50">
          <button
            onClick={() => navigate("/profile")}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-100"
          >
            Profile
          </button>
          {/* <button
            onClick={() => dispatch(logout())}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-100"
          >
            Settings
          </button> */}
          <button
            onClick={() => dispatch(logout())}
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
