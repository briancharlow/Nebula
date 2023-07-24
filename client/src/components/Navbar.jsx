import React from "react";
import { FaSearch, FaUser, FaChevronRight } from "react-icons/fa";
import Avatar from "@material-ui/core/Avatar";

import "../css/navbar.css";

const Navbar = ({ onToggleLeftBar }) => {
  return (
    <div className="navbar">
      <div className="toolbar">
        <div className="menu-button" onClick={onToggleLeftBar}>
          <FaChevronRight />
        </div>
        <div className="nebula">
          <h2>Nebula</h2>
        </div>
        <div className="search">
          <div className="icon-button">
            <FaSearch />
          </div>
          <input type="text" placeholder="Search..." />
        </div>
        <div className="icon-button">
          <Avatar className="profile-icon" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
