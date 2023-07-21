import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import "../css/rightbar.css";
import UserProfile from "./UserProfile";

const RightBar = () => {
  return (
    <div className="rightbar">
      <UserProfile />
      <div className="suggested">
        <Avatar alt="User 1" />
        <span>User 1</span>
        <Button variant="contained" color="primary">
          Follow
        </Button>
      </div>
      <div className="suggested">
        <Avatar alt="User 2" />
        <span>User 2</span>
        <Button variant="contained" color="primary">
          Follow
        </Button>
      </div>
    </div>
  );
};

export default RightBar;
