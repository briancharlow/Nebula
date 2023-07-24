import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, Button } from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HashLoader from "react-spinners/HashLoader";
import "../css/suggested.css";

const FollowButton = ({ userId, onFollow }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollowClick = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5010/followUser",
        {
          followingId: userId,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        setIsFollowing(true);
        toast.success("Successfully followed user!");
        onFollow(userId); // Refresh the list after following
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to follow user. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="follow-button">
      {isLoading ? (
        <HashLoader type="TailSpin" color="#00BFFF" height={20} width={20} />
      ) : isFollowing ? (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleFollowClick}
        >
          Unfollow
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={handleFollowClick}>
          Follow
        </Button>
      )}
    </div>
  );
};

const Suggested = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const response = await axios.get("http://localhost:5010/suggestions", {
        withCredentials: true,
      });
      const data = response.data;

      console.log(data);

      if (data.success) {
        setSuggestions(data.suggestions);
      } else {
        console.log("Failed to fetch suggestions:", data.message);
      }
    } catch (error) {
      console.log("Error while fetching suggestions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollow = (userId) => {
    // Filter out the user with the given userId from the suggestions list
    const updatedSuggestions = suggestions.filter((user) => user.id !== userId);
    setSuggestions(updatedSuggestions);
  };

  return (
    <div className="suggested-users">
      <h2>Suggested Users</h2>
      {isLoading ? (
        <div className="loader-container">
          <HashLoader color="#00BFFF" size={80} />
        </div>
      ) : suggestions.length > 0 ? (
        <div className="users-list">
          {suggestions.map((user) => (
            <div className="user-item" key={user.id}>
              {user.profile_picture ? (
                <Avatar src={user.profile_picture} alt="Profile" />
              ) : (
                <Avatar>{user.username[0]}</Avatar>
              )}
              <div className="user-info">
                <h3>{user.username}</h3>
                <FollowButton userId={user.id} onFollow={handleFollow} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No suggested users available.</p>
      )}
    </div>
  );
};

export default Suggested;
