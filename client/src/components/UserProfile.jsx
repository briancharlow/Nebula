import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/profile.css"; // Import the CSS file for styling

const UserProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchUserProfileFromAPI();
  }, []);

  const fetchUserProfileFromAPI = async () => {
    try {
      const response = await axios.get("http://localhost:5010/Profile"); // Replace with the actual API endpoint
      const data = response.data;

      if (data.success) {
        setProfile(data.profile);
      } else {
        console.log("Failed to fetch user profile:", data.message);
      }
    } catch (error) {
      console.log("Error while fetching user profile:", error);
    }
  };

  return (
    <div className="user-profile">
      {profile ? (
        <>
          <div className="profile-info">
            <img src={profile.profile_picture} alt="Profile" />
            <h2>{profile.username}</h2>
            <div className="follow-count">
              <span>Followers: {profile.followers_count}</span>
              <span>Following: {profile.following_count}</span>
            </div>
          </div>
          <div className="posts-count">
            <p>Number of Posts: {profile.posts.length}</p>
          </div>
        </>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default UserProfile;
