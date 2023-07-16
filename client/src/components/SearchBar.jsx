import React from "react";
import SearchIcon from "@material-ui/icons/Search";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <SearchIcon className="search-icon" />
      <input type="text" placeholder="Search" />
    </div>
  );
};

export default SearchBar;
