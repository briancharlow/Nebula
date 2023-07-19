// CommentSection.jsx

import React from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

const CommentSection = ({ comments }) => {
  return (
    <div className="comment-section">
      {comments.map((comment) => (
        <div className="comment" key={comment.comment_id}>
          <p>{comment.comment_content}</p>
          <div className="comment-actions">
            <button className="action-button">
              <AiOutlineLike className="icon" />
              {comment.likes_count} Likes
            </button>
            <button className="action-button">
              <AiOutlineDislike className="icon" />
              {comment.replies_count} Replies
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
