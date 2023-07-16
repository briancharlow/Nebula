import React from "react";
import Posts from "./Posts"; // Assuming you have a Post component to display individual posts
import "../css/centeroutlet.css";

const CenterOutlet = () => {
    return (
        <div className="centeroutlet">
            <Posts />
            {/* Add more posts here */}
        </div>
    );
};

export default CenterOutlet;
