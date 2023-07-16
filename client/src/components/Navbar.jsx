import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import CreateIcon from "@material-ui/icons/Create";
import PersonIcon from "@material-ui/icons/Person";
import PostForm from "./PostForm"; // Assuming you have a PostForm component for creating posts
import "../css/navbar.css";

const Navbar = () => {
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);

  const handleCreateClick = () => {
    setIsPostFormOpen(!isPostFormOpen);
  };

  return (
    <AppBar position="sticky" className="navbar">
      <Toolbar>
        <div className="search">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <InputBase placeholder="Search..." />
        </div>
        <IconButton onClick={handleCreateClick}>
          <CreateIcon />
        </IconButton>
        {isPostFormOpen && <PostForm />}
        {/* Replace the above line with the PostForm component */}
        <IconButton>
          {/* <Avatar src="/path-to-profile-picture.png" alt="Profile" /> */}
          {/* If the profile picture doesn't exist, use PersonIcon: */}
          <PersonIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
