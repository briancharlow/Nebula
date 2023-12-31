import React, { useState } from "react";
import axios from "axios";
import { FaImage, FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/post-form.css";

const PostForm = () => {
  const [postContent, setPostContent] = useState("");
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    setMediaFile(file);
    setMediaPreview(URL.createObjectURL(file));
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    // Upload media to Cloudinary if present
    let mediaUrl = null;
    if (mediaFile) {
      const formData = new FormData();
      formData.append("file", mediaFile);
      formData.append("upload_preset", "hwx1s3ze");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dtkfsipoi/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      mediaUrl = data.secure_url;
    }

    // Post data to the server
    const postData = {
      content: postContent,
      mediaUrl: mediaUrl,
    };
    
    try {
      let response = await axios.post("http://localhost:5020/createPost", postData, {
        withCredentials: true,
      });
      if (response.data.message === "Successfully created post") {
      toast.success("Post created successfully");

      // Clear form after successful post
      setPostContent("");
      setMediaFile(null);
      setMediaPreview(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error creating post");
    }
  };

  return (
    <div className="post-form">
      <div className="post-form-header">Create Post</div>
      <form onSubmit={handlePostSubmit}>
        <textarea
          className="post-content"
          placeholder="What's on your mind?"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        ></textarea>
        <div className="post-controls">
        <div className="post-media-container">
         
          <label htmlFor="post-media" className="post-media-label">
            <FaImage className="media-icon" />
            Add Media
          </label>
          {mediaPreview ? (
            <img
              src={mediaPreview}
              alt="Media Preview"
              className="post-media-preview"
            />
          ) : null}
         
          <input
            type="file"
            id="post-media"
            className="post-media-input"
            onChange={handleMediaChange}
          />
        </div>
        <button type="submit" className="post-button">
          <FaPaperPlane className="post-icon" />
          Post
        </button>
        </div>
      
      </form>
    </div>
  );
};

export default PostForm;
