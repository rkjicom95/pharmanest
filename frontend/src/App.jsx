import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import About from "./pages/about/About";
import Login from "./authUI/login/Login";
import Logout from "./authUI/logout/Logout";
import Signup from "./authUI/signup/Signup";
import MyOrder from "./pages/myOrder/MyOrder";
import Contact from "./pages/contact/Contact";
import Medicines from "./pages/medicines/Medicines";
import Categories from "./pages/categories/Categories";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import ForgotPassword from "./authUI/forgotPassword/ForgotPassword";
import ResetPassword from "./authUI/resetPassword/ResetPassword";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Main Layout Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/myorder" element={<MyOrder />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/medicines" element={<Medicines />} />
          <Route path="/categories" element={<Categories />} />
        </Route>

        {/* ✅ Auth Layout Routes (no header/footer) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
