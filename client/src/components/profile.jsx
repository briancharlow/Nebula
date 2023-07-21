import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
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
  const [SelectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State variable to control the loading spinner

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
    };
    try {
      setIsLoading(true); // Show the loading spinner
      const response = await axios.post(
        "http://localhost:5010/createProfile",
        profileData,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.data.success) {
        setIsLoading(false); // Hide the loading spinner
        toast.success("Profile created successfully!");
        navigate("/home");
      } else {
        setIsLoading(false); // Hide the loading spinner
        toast.error("Profile creation failed. Try again.");
      }
    } catch (error) {
      setIsLoading(false); // Hide the loading spinner
      if (error.response) {
        console.error("Server Error:", error.response.data);
        toast.error("Server Error. Please try again later.");
      } else if (error.request) {
        console.error("No response from server:", error.request);
        toast.error("No response from server. Please try again later.");
      } else {
        console.error("Error:", error.message);
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div>
      <ToastContainer />
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

        {/* Show the loading spinner when isLoading is true */}
        {isLoading ? (
          <div className="loading-spinner">
            <Loader type="Oval" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <button className="sign-btn">Create Profile</button>
        )}
      </form>
    </div>
  );
};

export default CreateProfile;
