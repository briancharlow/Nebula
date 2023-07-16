import React, { useState } from "react";
import axios from "axios";
import "../css/login.css";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [mediaFile, setMediaFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", content);
    formData.append("mediaFile", mediaFile);

    try {
      const response = await axios.post("http://localhost:5020/createpost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);
      if (response.data.success) {
        // Post created successfully, perform any desired action or show a success message
      } else {
        // Handle error case
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
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Create Post</h1>
        <textarea
          type="text"
          placeholder="Content"
          className="input-box"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          className="input-box"
          onChange={(e) => setMediaFile(e.target.files[0])}
        />

        <button className="login-btn">Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
