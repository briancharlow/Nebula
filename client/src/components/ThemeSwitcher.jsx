import React from "react";
import { IconButton, Button, Dialog, DialogTitle } from "@material-ui/core";
import { AiFillCloseCircle } from "react-icons/ai"; // Import the close icon
import "../css/theme-switcher.css";

const ThemeSwitcherPopup = ({ onClose, onColorChange }) => {
  const colorOptions = [
    "orange", // Main color
    "yellow", // Secondary color
    "orange", // Box color
    "green", // Text color
    "orange", // Primary color
    "#6f7e8c", // Secondary color
  ];

  return (
    <Dialog open={true} onClose={onClose} maxWidth="xs">
      <DialogTitle>Choose a Color</DialogTitle>
      <div className="color-options">
        {colorOptions.map((color, index) => (
          <Button
            key={index}
            style={{ backgroundColor: color }}
            onClick={() => onColorChange(color)}
          />
        ))}
      </div>
      <IconButton className="close-button" onClick={onClose}>
        <AiFillCloseCircle />
      </IconButton>
    </Dialog>
  );
};

export default ThemeSwitcherPopup;
