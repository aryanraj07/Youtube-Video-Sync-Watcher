import React from "react";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { AuthProvider } from "../context/AuthContext";
import { SocketProvider } from "../context/SocketContext";

const MainLayouts = () => {
  return (
    <AuthProvider>
      <SocketProvider>
        <Header />

        <Outlet />

        <Footer />
      </SocketProvider>
    </AuthProvider>
  );
};

export default MainLayouts;
