// Navbar.js
import React, { useState } from "react";
import { FaSearch, FaUser, FaChevronRight } from "react-icons/fa";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import "../css/navbar.css";
import SearchResults from "./SearchResults";
import { css } from "@emotion/react";
import { BounceLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Navbar = ({ onToggleLeftBar }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    const term = e.target.value.trim();
    setSearchTerm(term);

    if (term === "") {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5010/searchUsers/${term}`,
        {
          withCredentials: true,
        }
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.log(error);
      toast.error("Error while searching for users.");
    } finally {
      setLoading(false);
    }
  };

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
          <input type="text" placeholder="Search..." onChange={handleSearch} />
        </div>
        <div className="icon-button">
          <Avatar className="profile-icon" />
        </div>
      </div>
      <ToastContainer />
      {loading && searchResults.length > 0 && (
        <div className="loader-container">
          <BounceLoader
            color={"#36D7B7"}
            loading={loading}
            css={override}
            size={100}
          />
        </div>
      )}
      {searchResults.length > 0 && (
        <div className="search-results-container">
          <SearchResults
            searchTerm={searchTerm}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
