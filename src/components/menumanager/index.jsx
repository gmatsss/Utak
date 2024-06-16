import React from "react";
import { Outlet } from "react-router-dom";

const MenuManager = () => {
  return (
    <div>
      <h2>Menu Manager</h2>
      <Outlet />
    </div>
  );
};

export default MenuManager;
