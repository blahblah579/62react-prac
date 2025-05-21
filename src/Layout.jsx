import React from "react";
import { Outlet } from "react-router-dom";
import LeftBar from "./LeftBar";

const Layout = ({ user, setUser }) => {
  return (
    <>
      <LeftBar user={user} setUser={setUser} />
      <Outlet />
    </>
  );
};

export default Layout;
