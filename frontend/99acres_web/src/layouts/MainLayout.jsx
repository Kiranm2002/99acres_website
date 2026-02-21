import React from "react";
import Navbar from "../components/navbar/Navbar";
import { Toolbar } from "@mui/material";
import { useLocation } from "react-router-dom";

const MainLayout = ({ children }) => {
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const hideNavbarRoutes = ["/login", "/register"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* Show Navbar only if not login/register */}
      {!shouldHideNavbar && (
        <>
          <Navbar isHomePage={isHomePage} />
          
          {/* Add spacing only if not home */}
          {!isHomePage && <Toolbar />}
        </>
      )}

      {children}
    </>
  );
};

export default MainLayout;