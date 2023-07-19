import React, { useState, useEffect } from "react";
import { BsChatLeftText } from "react-icons/bs";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import axios from "axios";
import PostForm from "./PostForm";
import CommentForm from "./CommentForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/center-outlet.css";
import CommentSection from "./CommentSection";

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
            show_comments: false, // Track if comments section should be shown
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
      post.post_id === postId ? { ...post, is_commenting: !post.is_commenting, show_comments: !post.show_comments } : post
    );
    setPosts(updatedPosts);
  };

  const handleCommentInputChange = (postId, value) => {
    const updatedPosts = posts.map((post) =>
      post.post_id === postId ? { ...post, commentInput: value } : post
    );
    setPosts(updatedPosts);
  };

  const handleCommentPost = (postId, content) => {
    const post = posts.find((post) => post.post_id === postId);
    if (!post || !content) return;

    axios
      .post(
        "http://localhost:5020/commentPost",
        { postId, content },
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
        toast.success("Comment added successfully!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error occurred while adding comment.");
      });
  };

  return (
    <div className="center-outlet">
      <PostForm />
      <ToastContainer />
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
                    <AiOutlineDislike className="icon" style={{ color: "red" }} />
                    {post.post_likes_count} Likes
                  </>
                ) : (
                  <>
                    <AiOutlineLike className="icon" />
                    {post.post_likes_count} Likes
                  </>
                )}
              </button>
              <button className="action-button" onClick={() => handleComment(post.post_id)}>
                <BsChatLeftText className="icon" />
                {post.post_comments_count} Comments
              </button>
            </div>
            {post.is_commenting && (
              <div className="comment-input">
                <CommentForm postId={post.post_id} handleCommentPost={handleCommentPost} />
              </div>
            )}
            {/* Use CommentSection component here */}
            {post.show_comments && <CommentSection comments={post.comments} />}
          </div>
        ))
      )}
    </div>
  );
};

export default CenterOutlet;
