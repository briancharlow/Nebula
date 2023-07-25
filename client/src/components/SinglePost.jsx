import React, { useState } from "react";
import { BsChatLeftText } from "react-icons/bs";
import { AiOutlineLike, AiFillDislike } from "react-icons/ai";
import { Avatar } from "@material-ui/core";
import axios from "axios";
import CommentForm from "./CommentForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommentSection from "./CommentSection";
import moment from "moment";

const SinglePost = ({ post }) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleLikePost = (postId) => {
    axios
      .post(
        "http://localhost:5020/likePost",
        { postId },
        { withCredentials: true }
      )
      .then((res) => {
        // Update the post object in the parent component
        // with the new likes count and like status
        // We assume the parent component (CenterOutlet) will handle this update
        toast.success("Post liked!");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handleUnlikePost = (postId) => {
    axios
      .delete("http://localhost:5020/unlikePost", {
        data: { postId },
        withCredentials: true,
      })
      .then((res) => {
        // Update the post object in the parent component
        // with the new likes count and like status
        // We assume the parent component (CenterOutlet) will handle this update
        toast.success("Post unliked!");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handleComment = () => {
    setIsCommenting(!isCommenting);
    setShowComments(!showComments);
  };

  const handleCommentPost = (postId, content) => {
    if (!content) return;

    axios
      .post(
        "http://localhost:5020/commentPost",
        { postId, content },
        { withCredentials: true }
      )
      .then((res) => {
        // Update the post object in the parent component
        // with the new comments count and comments array
        // We assume the parent component (CenterOutlet) will handle this update
        toast.success("Comment added successfully!");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handleLikeComment = (postId, commentId) => {
    axios
      .post(
        "http://localhost:5020/likeComment",
        { commentId },
        { withCredentials: true }
      )
      .then((res) => {
        // Update the comments array in the post object
        // We assume the parent component (CenterOutlet) will handle this update
        toast.success("Comment liked!");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handleUnlikeComment = (postId, commentId) => {
    axios
      .delete("http://localhost:5020/unlikeComment", {
        data: { commentId },
        withCredentials: true,
      })
      .then((res) => {
        // Update the comments array in the post object
        // We assume the parent component (CenterOutlet) will handle this update
        toast.success("Comment unliked!");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const time = moment.utc(post.post_created_at).local().format("ddd, h:mm A");

  return (
    <div className="post">
      <div className="post-header">
        {/* Use Avatar as the default profile picture */}
        {post.post_user_profile_picture ? (
          <Avatar
            src={post.post_user_profile_picture}
            alt="Profile"
            className="profile-picture"
          />
        ) : (
          <Avatar className="profile-picture">
            {post.post_username[0].toUpperCase()}
          </Avatar>
        )}
        <span className="username">{post.post_username}</span>
      </div>
      <div className="info">
        <p>{post.post_content}</p>

        {post.post_media_url && (
          <img
            src={post.post_media_url}
            alt="Post Media"
            className="post-media"
          />
        )}
      </div>
      <div className="post-actions">
        <button
          className="action-button"
          onClick={() =>
            post.is_liked
              ? handleUnlikePost(post.post_id)
              : handleLikePost(post.post_id)
          }
        >
          {post.is_liked ? (
            <>
              <AiFillDislike className="icon" style={{ color: "red" }} />
              {post.post_likes_count} Likes
            </>
          ) : (
            <>
              <AiOutlineLike className="icon" />
              {post.post_likes_count} Likes
            </>
          )}
        </button>
        <span>{time}</span>
        <button className="action-button" onClick={handleComment}>
          <BsChatLeftText className="icon" />
          {post.post_comments_count} Comments
        </button>
      </div>
      {isCommenting && (
        <div className="comment-input">
          <CommentForm
            postId={post.post_id}
            handleCommentPost={handleCommentPost}
          />
        </div>
      )}
      {showComments && (
        <CommentSection
          comments={post.comments}
          handleLikeComment={handleLikeComment}
          handleUnlikeComment={handleUnlikeComment}
        />
      )}
    </div>
  );
};

export default SinglePost;
