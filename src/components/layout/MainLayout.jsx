import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Loading from "../common/Loading";
import Footer from "../common/Footer";
import Header from "../common/Header";

const MainLayout = () => {
  return (
    <>
      {/* Global Loading */}
      <Loading />
      <Box display="flex" minHeight="100vh">
        <Header />
        {/* main */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default MainLayout;
