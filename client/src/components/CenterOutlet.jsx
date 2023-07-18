import React, { useState, useEffect } from "react";
import { FaHeart, FaComment } from "react-icons/fa";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { BiLike, BiDislike } from "react-icons/bi";
import axios from "axios";
import PostForm from "./PostForm";
import "../css/center-outlet.css";

const CenterOutlet = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5020/getAllPosts", { withCredentials: true })
      .then((res) => {
        const postsData = res.data.posts;
        setPosts(
          Object.values(postsData).map((post) => ({
            ...post,
            is_liked: false,
            is_commenting: false,
            comments: [], // Track comments for each post
            commentInput: "", // Track comment input value for each post
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLikePost = (postId) => {
    axios
      .post("http://localhost:5020/likePost", { postId }, { withCredentials: true })
      .then((res) => {
        const updatedPosts = posts.map((post) =>
          post.post_id === postId
            ? { ...post, post_likes_count: post.post_likes_count + 1, is_liked: true }
            : post
        );
        setPosts(updatedPosts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUnlikePost = (postId) => {
    axios
      .post("http://localhost:5020/unlikePost", { postId }, { withCredentials: true })
      .then((res) => {
        const updatedPosts = posts.map((post) =>
          post.post_id === postId
            ? { ...post, post_likes_count: post.post_likes_count - 1, is_liked: false }
            : post
        );
        setPosts(updatedPosts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleComment = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.post_id === postId ? { ...post, is_commenting: !post.is_commenting } : post
    );
    setPosts(updatedPosts);
  };

  const handleCommentInputChange = (postId, value) => {
    const updatedPosts = posts.map((post) =>
      post.post_id === postId ? { ...post, commentInput: value } : post
    );
    setPosts(updatedPosts);
  };

  const handleCommentPost = (postId) => {
    const post = posts.find((post) => post.post_id === postId);
    if (!post || !post.commentInput) return;

    axios
      .post(
        "http://localhost:5020/commentPost",
        { postId, content: post.commentInput },
        { withCredentials: true }
      )
      .then((res) => {
        const updatedPosts = posts.map((post) =>
          post.post_id === postId
            ? {
                ...post,
                post_comments_count: post.post_comments_count + 1,
                is_commenting: false,
                comments: [...post.comments, res.data.comment],
                commentInput: "", // Clear comment input after successful submission
              }
            : post
        );
        setPosts(updatedPosts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="center-outlet">
      <PostForm />
      {posts.length === 0 ? (
        <div>No posts available</div>
      ) : (
        posts.map((post) => (
          <div className="post" key={post.post_id}>
            <div className="post-header">
              <img
                src={post.post_user_profile_picture}
                alt="Profile"
                className="profile-picture"
              />
              <span className="username">{post.post_username}</span>
            </div>
            <div className="post-content">
              <p>{post.post_content}</p>
            </div>
            {post.post_media_url && (
              <img
                src={post.post_media_url}
                alt="Post Media"
                className="post-media"
              />
            )}
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
                    <BiDislike className="icon" style={{ color: "red" }} />
                    {post.post_likes_count} Likes
                  </>
                ) : (
                  <>
                    <BiLike className="icon" />
                    {post.post_likes_count} Likes
                  </>
                )}
              </button>
              <button className="action-button" onClick={() => handleComment(post.post_id)}>
                <FaComment className="icon" />
                {post.post_comments_count} Comments
              </button>
            </div>
            {post.is_commenting && (
              <div className="comment-input">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={post.commentInput}
                  onChange={(e) => handleCommentInputChange(post.post_id, e.target.value)}
                />
                <button
                  className="action-button"
                  onClick={() => handleCommentPost(post.post_id)}
                >
                  Send
                </button>
              </div>
            )}
            <div className="comments-section">
              {post.comments.map((comment) => (
                <div className="comment" key={comment.comment_id}>
                  <p>{comment.comment_content}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CenterOutlet;
