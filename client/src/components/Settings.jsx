import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import { css } from "@emotion/react";
import { BounceLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/settings.css";

const Settings = () => {
  const navigate = useNavigate();
  const backHome = () => {
    navigate("/home/");
  };

  const [Bio, setBio] = useState("");
  const [Username, setUsername] = useState("");
  const [ProfilePicture, setProfilePicture] = useState("");
  const [Location, setLocation] = useState("");
  const [SelectedFile, setSelectedFile] = useState(null);
  const [OldPassword, setOldPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = (files) => {
    console.log(files);
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "hwx1s3ze");
    fetch("https://api.cloudinary.com/v1_1/dtkfsipoi/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setProfilePicture(data.secure_url);
      });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    uploadImage(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profileData = {
      bio: Bio,
      username: Username,
      profilePicture: ProfilePicture.toString(),
      location: Location,
      oldPassword: OldPassword,
      newPassword: NewPassword,
    };
    try {
      setIsLoading(true);
      const response = await axios.put(
        "http://localhost:5010/updateProfile",
        profileData,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.data.success) {
        toast.success("Profile updated successfully!");
        // Profile updated successfully, navigate back to user's profile
        navigate("/home/");
      } else {
        // Handle profile update failure
        toast.error("Profile Update Failed. Please try again.");
      }
    } catch (error) {
      toast.error("Error while updating profile. Please try again later.");
      if (error.response) {
        console.error("Server Error:", error.response.data);
      } else if (error.request) {
        console.error("No response from server:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    // Your code for handling account deletion
    try {
      setIsLoading(true);
      const response = await axios.put(
        "http://localhost:5010/deleteProfile",
        {},
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.data.success) {
        toast.success("Account deleted successfully!");
        // Account deleted successfully, navigate back to home page
        navigate("/signin");
      } else {
        // Handle account deletion failure
        toast.error("Account Deletion Failed. Please try again.");
      }
    } catch (error) {
      toast.error("Error while deleting account. Please try again later.");
      if (error.response) {
        console.error("Server Error:", error.response.data);
      } else if (error.request) {
        console.error("No response from server:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const override = css`
    display: block;
    margin: 0 auto;
  `;

  return (
    <div className="settings-container">
      <div className="back-btn" onClick={backHome}>
        <BiArrowBack />
      </div>
      <form className="settings-form" onSubmit={handleSubmit}>
        <h1>Edit Profile</h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="bio">Bio</label>
        <input
          type="text"
          id="bio"
          value={Bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <div className="file-input-container">
          <label htmlFor="profilePicture" className="file-input-label">
            Choose Profile Picture
          </label>
          <input
            type="file"
            id="profilePicture"
            className="file-input"
            onChange={handleFileSelect}
          />
          {SelectedFile && (
            <span className="file-selected-label">
              {SelectedFile.name} selected
            </span>
          )}
        </div>
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          value={Location}
          onChange={(e) => setLocation(e.target.value)}
        />
        {/* New password fields */}
        <label htmlFor="oldPassword">Old Password</label>
        <input
          type="password"
          id="oldPassword"
          value={OldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          id="newPassword"
          value={NewPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button className="update-btn" disabled={isLoading}>
          {isLoading ? (
            <BounceLoader css={override} size={20} color={"#ffffff"} />
          ) : (
            "Update Profile"
          )}
        </button>
      </form>

      <button className="delete-account-btn" onClick={handleDeleteAccount}>
        Delete Account
      </button>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Settings;
