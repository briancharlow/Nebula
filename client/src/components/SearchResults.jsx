// SearchResults.js
import React, { useState } from "react";
import { FaUserPlus, FaUserTimes } from "react-icons/fa";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import { css } from "@emotion/react";
import { BounceLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const SearchResults = ({ searchTerm, searchResults, setSearchResults }) => {
  const [loading, setLoading] = useState(false);

  const handleFollow = async (followingId) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5010/followUser",
        {
          followingId,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        // Update the UI to reflect that the user is now followed
        const updatedResults = searchResults.map((result) =>
          result.userId === followingId
            ? { ...result, isFollowing: true }
            : result
        );
        setSearchResults(updatedResults);
      }
    } catch (error) {
      console.error("Error while following user:", error.message);
      toast.error("Failed to follow user.");
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async (followingId) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5010/unfollowUser",
        {
          followingId,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        // Update the UI to reflect that the user is now unfollowed
        const updatedResults = searchResults.map((result) =>
          result.userId === followingId
            ? { ...result, isFollowing: false }
            : result
        );
        setSearchResults(updatedResults);
      }
    } catch (error) {
      console.error("Error while unfollowing user:", error.message);
      toast.error("Failed to unfollow user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-results">
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
      {searchResults.length === 0 && searchTerm.trim() !== "" ? (
        <div className="no-results">No results found for "{searchTerm}"</div>
      ) : (
        searchResults.map((result) => (
          <div className="search-result" key={result.userId}>
            <Avatar
              src={result.profilePicture || "default-avatar.jpg"} // Use default avatar if profilePicture is not available
              className="avatar"
            />
            <div className="user-info">
              <span className="username">{result.username}</span>
              {result.isFollowing ? (
                <button
                  className="unfollow-button"
                  onClick={() => handleUnfollow(result.userId)}
                  disabled={loading}
                >
                  <FaUserTimes /> Unfollow
                </button>
              ) : (
                <button
                  className="follow-button"
                  onClick={() => handleFollow(result.userId)}
                  disabled={loading}
                >
                  <FaUserPlus /> Follow
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchResults;
