import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Dashboard from "./components/dashboard";
import MenuManager from "./components/menumanager";
import "./App.css";
import Items from "./components/menumanager/items";
import Categories from "./components/menumanager/categories";
import Testsales from "./components/TestSales";

function App() {
  return (
    <div className="App flex">
      <Sidebar />
      <div className="flex-1 p-10 text-2xl font-bold">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/menu-manager" element={<MenuManager />}>
            <Route path="categories" element={<Categories />} />
            <Route path="items" element={<Items />} />
          </Route>
        </Routes>
      </div>
      <Testsales />
    </div>
  );
}

export default App;
