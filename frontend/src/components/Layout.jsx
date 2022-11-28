import { Stack } from "@mui/material"; 
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

const Layout = () => {
  return (
    <Stack alignItems="center">
      <Navbar />
      <Outlet />
    </Stack>
  );
};

export default Layout;
