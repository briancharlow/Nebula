import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
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

  const uploadImage = (files) => {
    const formData = new FormData();
    formData.append( "file", files[0]);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const profileData = {
      bio: Bio,
      username: Username,
      profilePicture: ProfilePicture.toString(),
      location: Location,
    };
    try {
      const response = await axios.post(
        "http://localhost:5010/createProfile",
        profileData,
        {
            withCredentials: true,
        }
      );
      console.log(response);
      if (response.data.success) {
        // Profile created successfully, navigate to user's pr
        navigate("/signin");
      } else {
        // Handle profile creation failure
        alert("Profile Creation Failed Try Again");
      }
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
      } else if (error.request) {
        console.error("No response from server:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

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
       <label>
        <p>
             Choose Profile Picture
        </p>
           
            <input
          type="file"
          placeholder="Profile Picture"
          value={ProfilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
        />
       </label>
       

        <button className="sign-btn">Create Profile</button>
      </form>
    </div>
  );
};

export default CreateProfile;
