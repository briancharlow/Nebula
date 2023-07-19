// CommentSection.jsx

import React from "react";
import { AiOutlineLike, AiFillLike, AiOutlineDislike, AiFillDislike } from "react-icons/ai";

const handleCommentReplies = (postId, commentId) => {
    // Handle comment replies
};

const CommentSection = ({ comments, handleLikeComment, handleUnlikeComment }) => {
  return (
    <div className="comment-section">
      {comments.map((comment) => (
        <div className="comment" key={comment.comment_id}>
          <p>{comment.comment_content}</p>
          <div className="comment-actions">
            <button
              className="action-button"
              onClick={() =>
                comment.is_liked
                  ? handleUnlikeComment(comment.post_id, comment.comment_id)
                  : handleLikeComment(comment.post_id, comment.comment_id)
              }
            >
              {comment.is_liked ? (
                <>
                  <AiFillDislike className="icon" style={{ color: "red" }} />
                  {comment.likes_count} Likes
                </>
              ) : (
                <>
                  <AiOutlineLike className="icon" />
                  {comment.likes_count} Likes
                </>
              )}
            </button>
            {/* Assuming there's a handleCommentReplies function for replying to comments */}
            <button className="action-button" onClick={() => handleCommentReplies(comment.post_id, comment.comment_id)}>
              {/* Use appropriate icon for comment replies */}
              {/* Replace AiOutlineDislike with the appropriate icon for replies */}
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
