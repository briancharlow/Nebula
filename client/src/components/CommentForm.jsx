import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/comment-form.css";


const CommentForm = ({ postId, handleCommentPost }) => {
  const [commentInput, setCommentInput] = useState("");

  const handleChange = (e) => {
    setCommentInput(e.target.value);
  };

  const handleSubmit = () => {
    if (!commentInput.trim()) {
      toast.error("Please enter a comment.");
      return;
    }

    handleCommentPost(postId, commentInput);
    setCommentInput(""); // Clear comment input after successful submission
  };

  return (
    <div className="comment-form">
      <input
        type="text"
        placeholder="Write a comment..."
        value={commentInput}
        onChange={handleChange}
      />
      <button className="action-button" onClick={handleSubmit}>
        <FaRegComment className="icon" />
        Send
      </button>
    </div>
  );
};

export default CommentForm;
