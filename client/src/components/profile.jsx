import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BiArrowBack, BiCloudLightRain } from "react-icons/bi";
import { css } from "@emotion/react";
import { BounceLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling the toasts
import "../css/login.css";

const CreateProfile = () => {
  const navigate = useNavigate();
  const backHome = () => {
    navigate("/");
  };
  const [Bio, setBio] = useState("");
  const [Username, setUsername] = useState("");
  const [ProfilePicture, setProfilePicture] = useState("");
  const [Location, setLocation] = useState("");
  const [SelectedFile, setSelectedFile] = useState(null); // New state variable
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
    console.log("inside cloudinary");
  };
  console.log("hey momma i made it");

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
    };
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:5010/createProfile",
        profileData,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.data.success) {
        toast.success("Profile created successfully!");
        // Profile created successfully, navigate to user's profile
        navigate("/home");
      } else {
        // Handle profile creation failure
        toast.error("Profile Creation Failed. Please try again.");
      }
    } catch (error) {
      toast.error("Error while creating profile. Please try again later.");
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
    <div>
      <div className="backhome" onClick={backHome}>
        <BiArrowBack />
      </div>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h1>Create Profile</h1>
        <input
          type="text"
          placeholder="Username"
          className="input-box"
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bio"
          className="input-box"
          value={Bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          className="input-box"
          value={Location}
          onChange={(e) => setLocation(e.target.value)}
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

        <button className="sign-btn" disabled={isLoading}>
          {isLoading ? (
            <BounceLoader css={override} size={20} color={"#ffffff"} />
          ) : (
            "Create Profile"
          )}
        </button>
      </form>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default CreateProfile;
