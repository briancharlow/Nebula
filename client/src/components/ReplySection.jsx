import React from "react";
import { Avatar } from "@material-ui/core";
import { AiOutlineLike, AiFillDislike } from "react-icons/ai";
import moment from "moment";
//import "../css/reply-section.css"; // Add your CSS for styling

const ReplySection = ({
  postId,
  commentId,
  replies,
  handleLikeComment,
  handleUnlikeComment,
}) => {
  return (
    <div className="reply-section">
      {replies.length === 0 ? (
        <p>No replies yet.</p>
      ) : (
        replies.map((reply) => (
          <div className="reply" key={reply.reply_id}>
            <div className="reply-header">
              {reply.user_profile_picture ? (
                <Avatar
                  src={reply.user_profile_picture}
                  alt="Profile"
                  className="reply-profile-picture"
                />
              ) : (
                <Avatar className="reply-profile-picture">
                  {reply.username[0].toUpperCase()}
                </Avatar>
              )}
              <span className="reply-username">{reply.username}</span>
            </div>
            <div className="reply-info">
              <p>{reply.content}</p>
            </div>
            <div className="reply-actions">
              <button
                className="reply-action-button"
                onClick={() =>
                  reply.is_liked
                    ? handleUnlikeComment(postId, reply.reply_id)
                    : handleLikeComment(postId, reply.reply_id)
                }
              >
                {reply.is_liked ? (
                  <>
                    <AiFillDislike className="icon" style={{ color: "red" }} />
                    {reply.likes_count} Likes
                  </>
                ) : (
                  <>
                    <AiOutlineLike className="icon" />
                    {reply.likes_count} Likes
                  </>
                )}
              </button>
              <span>
                {moment
                  .utc(reply.reply_created_at)
                  .local()
                  .format("ddd, h:mm A")}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReplySection;
