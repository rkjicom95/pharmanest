import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header className="" />

      {/* Body */}
      <main className="flex-1 mt-15">
        <Outlet /> {/* Page ka content yaha render hoga */}
      </main>

      {/* Footer (scroll ke end me aayega) */}
      <Footer />
    </div>
  );
};

export default MainLayout;
