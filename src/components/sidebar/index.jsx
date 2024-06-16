import { Link } from "react-router-dom";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";

const Sidebar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div
      style={{ height: "90vh" }}
      className="bg-gray-800 text-white w-64 mt-9 py-7 px-2 fixed inset-y-0 left-4 h-screen transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out rounded-lg"
    >
      <h1 className="text-white text-3xl font-semibold">Logo</h1>
      <nav className="mt-10">
        <Link
          to="/"
          className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white"
        >
          <DashboardIcon style={{ marginRight: 8 }} /> Dashboard
        </Link>
        <div>
          <button
            onClick={toggleMenu}
            className="w-full text-left flex justify-between items-center py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white"
          >
            <span className="flex items-center">
              <MenuIcon style={{ marginRight: 8 }} /> Menu Manager
            </span>
            {isMenuOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </button>
          {isMenuOpen && (
            <div className="pl-4">
              <Link
                to="/menu-manager/categories"
                className="flex items-center py-2 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white"
              >
                <CategoryIcon style={{ marginRight: 8 }} />
                Categories
              </Link>
              <Link
                to="/menu-manager/items"
                className="flex items-center py-2 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white"
              >
                <InventoryIcon style={{ marginRight: 8 }} /> Items
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
