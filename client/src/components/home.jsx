import React from "react";
import Navbar from "./Navbar";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";
import CenterOutlet from "./CenterOutlet";
import "../css/home.css";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="content">
        {/* <LeftBar />
        <CenterOutlet />
        <RightBar /> */}
      </div>
    </div>
  );
};

export default Home;
