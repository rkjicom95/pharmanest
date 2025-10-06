import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import Logo from "/assets/logo1.png";
import { clearAuthData, getAuthData } from "../../utils/localStorage";
import { showSuccess } from "../../utils/toastMessage";
import { useSelector } from "react-redux";
import { fetchCart } from "../../features/cart/cartSlice";

const Header = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);

  const { items } = useSelector((state) => state.cart);
  console.log("itemssssss..", items);
  const cartCount = items.length;

  // User info from localStorage
  const auth = getAuthData();
  const isAuthenticated = Boolean(auth?.token);

  // Link styling
  const linkClass = ({ isActive }) =>
    isActive
      ? "relative text-teal-700 font-semibold after:content-[''] after:block after:h-[2px] after:w-full after:bg-teal-700 after:mt-1"
      : "relative hover:text-teal-700";

  // Logout handler
  const handleLogout = () => {
    clearAuthData();
    showSuccess("You have logged out successfully 👋");
    navigate("/login");
  };

  return (
    // <nav className="flex items-center justify-between bg-white shadow-md px-6 py-3 relative">
    <nav className="fixed top-0 left-0 w-full h-[8%] z-50 flex items-center justify-between bg-teal-50 shadow-md px-6 py-3">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src={Logo} alt="PharmaNest Logo" className="h-10 w-18" />
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-12 font-medium text-gray-700">
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/medicines" className={linkClass}>
          Medicines
        </NavLink>
        {/* <NavLink to="/categories" className={linkClass}>
          Categories
        </NavLink> */}
        <NavLink to="/about" className={linkClass}>
          About
        </NavLink>
        <NavLink to="/contact" className={linkClass}>
          Contact Us
        </NavLink>
      </div>
      {/* Search Bar (Desktop only) */}
      {/* <div className="hidden md:flex items-center border rounded-lg overflow-hidden">
        <input
          type="text"
          placeholder="Search medicines..."
          className="px-3 py-1.5 outline-none w-40 md:w-60"
        />
        <button className="bg-teal-700 text-white px-4 py-2">Search</button>
      </div> */}
      {/* Cart + Auth */}
      <div className="flex items-center gap-8 ml-4">
        {/* Cart */}
        <Link to="/cart" className="flex items-center gap-1 relative">
          {/* Icon with Badge */}
          <div className="relative">
            <BsCartPlus size={22} className="text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute -top-3 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                {cartCount}
              </span>
            )}
          </div>

          {/* Text label */}
          <h4 className="text-gray-700 font-medium hidden md:block">Cart</h4>
        </Link>

        {/* Auth Check */}
        {isAuthenticated ? (
          <>
            {/* My Orders (Desktop) */}
            <Link to="/myorder" className="hidden md:block">
              My Orders
            </Link>

            {/* Profile Dropdown (Desktop) */}
            <div className="relative group hidden md:block">
              <button className="flex items-center text-teal-700 text-3xl hover:text-teal-800">
                <FaUserCircle />
              </button>
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <button
                  onClick={() => navigate("/profile")}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-100"
                >
                  Profile
                </button>
                {/* <button
                  onClick={() => navigate("/settings")}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-100"
                >
                  Settings
                </button> */}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-1.5 border border-teal-700 text-teal-700 rounded-lg hover:bg-teal-600 hover:text-white"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-1.5 bg-teal-700 text-white rounded-lg hover:bg-teal-800"
            >
              Signup
            </button>
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl text-teal-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {menuOpen && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-40 z-50 flex ">
          <div className="bg-white w-3/4 h-full p-6 flex flex-col gap-4 relative">
            {/* Close */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-600 text-2xl"
            >
              ✕
            </button>

            {/* Search (Mobile) */}
            {/* <div className="flex items-center border rounded-lg overflow-hidden mb-4 mt-8">
              <input
                type="text"
                placeholder="Search medicines..."
                className="px-3 py-2 outline-none w-full"
              />
              <button className="bg-teal-700 text-white px-4 py-2">
                Search
              </button>
            </div> */}

            {/* Nav Links */}
            <NavLink
              to="/"
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/medicines"
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              Medicines
            </NavLink>
            {/* <NavLink
              to="/categories"
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              Categories
            </NavLink> */}
            <NavLink
              to="/about"
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </NavLink>

            {/* Mobile Profile */}
            {isAuthenticated ? (
              <div className="mt-4">
                <button
                  onClick={() => setMobileProfileOpen(!mobileProfileOpen)}
                  className="flex items-center gap-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  <FaUserCircle className="text-xl" /> {auth?.name || "Account"}
                </button>

                {mobileProfileOpen && (
                  <div className="mt-2 flex flex-col gap-2">
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 rounded-lg hover:bg-teal-100"
                    >
                      Profile
                    </button>
                    {/* <button
                      onClick={() => {
                        navigate("/settings");
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 rounded-lg hover:bg-teal-100"
                    >
                      Settings
                    </button> */}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-4">
                <button
                  onClick={() => {
                    navigate("/login");
                    setMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 border border-teal-700 text-teal-700 rounded-lg hover:bg-teal-600 hover:text-white"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/signup");
                    setMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800"
                >
                  Signup
                </button>
              </div>
            )}
          </div>

          {/* Overlay click */}
          <div className="flex-1" onClick={() => setMenuOpen(false)}></div>
        </div>
      )}
    </nav>
  );
};

export default Header;
