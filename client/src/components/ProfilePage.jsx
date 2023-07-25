// ProfilePage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PacmanLoader } from "react-spinners";
import "../css/user-profile.css";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ProfilePage = ({ match }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = match.params;
  const location = useLocation();
  const profile = location.state.profile;

  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5010/getUserProfile/${profile.user_id}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setUserProfile(response.data.profile);
        setLoading(false);
      } else {
        toast.error("Failed to fetch user profile");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Error while fetching user profile");
      setLoading(false);
    }
  };

  return (
    <div className="user-profile-container">
      <ToastContainer />
      {loading ? (
        <div className="loading-spinner">
          <PacmanLoader color="#007bff" size={50} />
        </div>
      ) : userProfile ? (
        <div className="user-profile">
          <div className="user-info">
            {userProfile.profile_picture ? (
              <img
                src={userProfile.profile_picture}
                alt="Profile"
                className="profile-picture"
              />
            ) : (
              <FaUserCircle className="default-profile-picture" />
            )}
            <div className="user-details">
              <h2>{userProfile.username}</h2>
              <p>{userProfile.bio}</p>
              <p>{userProfile.location}</p>
            </div>
          </div>
          <div className="user-stats">
            <p>Followers: {userProfile.followers_count}</p>
            <p>Following: {userProfile.following_count}</p>
          </div>
          <div className="user-posts">
            <h3>Posts</h3>
            {userProfile.posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>
      ) : (
        <p>No user profile found.</p>
      )}
    </div>
  );
};

const Post = ({ post }) => {
  return (
    <div className="post">
      {/* Display post content, media, etc. */}
      <p>{post.content}</p>
      {post.media_url && <img src={post.media_url} alt="Post Media" />}
      {/* Display post interactions */}
      <div className="post-interactions">
        <span>
          {post.likes_count} Likes{" "}
          {post.is_liked ? (
            <AiFillHeart className="like-icon" />
          ) : (
            <AiOutlineHeart className="like-icon" />
          )}
        </span>
        <span>
          {post.comments_count} Comments{" "}
          <AiOutlineComment className="comment-icon" />
        </span>
      </div>
    </div>
  );
};

export default ProfilePage;
