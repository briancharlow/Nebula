import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import ChevronRightIcon from "@material-ui/icons/ChevronRight"; // Icon for reveal button
import Logo from "../img/logo2.png";
import "../css/navbar.css";

const Navbar = ({ onToggleLeftBar }) => {
  

  return (
    <AppBar position="sticky" className="navbar">
      <Toolbar className="toolbar">
         <IconButton className="menu-button" onClick={onToggleLeftBar}>
          <ChevronRightIcon />
        </IconButton>
        <div>
          <img src={Logo} alt="LOGO" className="logo" />
        </div>
        <div className="search">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <InputBase placeholder="Search..." />
        </div>
        
        <IconButton>
          <PersonIcon className="profile-icon" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
