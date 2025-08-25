import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Outlet /> {/* yaha page ka content render hoga */}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
