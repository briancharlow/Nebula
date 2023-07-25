import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import { AiOutlineLike, AiFillDislike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import ReplySection from "./ReplySection"; // Import the ReplySection component
import moment from "moment";
import "../css/comment-section.css"; // Add your CSS for styling

const CommentSection = ({
  comments,
  handleLikeComment,
  handleUnlikeComment,
  loading,
}) => {
  // Local state to handle replies
  const [showReplies, setShowReplies] = useState({});

  const toggleReplies = (commentId) => {
    setShowReplies((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  if (loading) {
    return <div>Loading comments...</div>;
  }

  return (
    <div className="comment-section">
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div className="comment" key={comment.comment_id}>
            <div className="comment-header">
              {comment.user_profile_picture ? (
                <Avatar
                  src={comment.user_profile_picture}
                  alt="Profile"
                  className="comment-profile-picture"
                />
              ) : (
                <Avatar className="comment-profile-picture">
                  {comment.username[0].toUpperCase()}
                </Avatar>
              )}
              <span className="comment-username">{comment.username}</span>
            </div>
            <div className="comment-info">
              <p>{comment.content}</p>
            </div>
            <div className="comment-actions">
              <button
                className="comment-action-button"
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
              <button
                className="comment-action-button"
                onClick={() => toggleReplies(comment.comment_id)}
              >
                <FaRegComment className="icon" />
                {comment.replies_count} Replies
              </button>
              <span>
                {moment
                  .utc(comment.comment_created_at)
                  .local()
                  .format("ddd, h:mm A")}
              </span>
            </div>
            {showReplies[comment.comment_id] && (
              <ReplySection
                postId={comment.post_id}
                commentId={comment.comment_id}
                replies={comment.replies}
                handleLikeComment={handleLikeComment}
                handleUnlikeComment={handleUnlikeComment}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CommentSection;
