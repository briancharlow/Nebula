import React, { useState } from "react";
import Navbar from "./Navbar";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";
import { Outlet } from "react-router-dom";
import "../css/home.css";
//import outlet from react

const Home = () => {
  const [isLeftBarOpen, setIsLeftBarOpen] = useState(true);

  const toggleLeftBar = () => {
    setIsLeftBarOpen(!isLeftBarOpen);
  };

  return (
    <div className="home">
      <Navbar onToggleLeftBar={toggleLeftBar} />
      <div className="content-container">
        <LeftBar isOpen={isLeftBarOpen} onClose={toggleLeftBar} />
        <Outlet />
        <RightBar />
      </div>
    </div>
  );
};

export default Home;
