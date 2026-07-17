import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
