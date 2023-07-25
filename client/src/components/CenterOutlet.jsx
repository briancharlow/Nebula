import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HashLoader } from "react-spinners";
import { FaUser, FaUsers, FaStickyNote, FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlineLike, AiFillDislike } from "react-icons/ai";
import { BsChatLeftText } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { AiOutlineEdit } from "react-icons/ai"; // Import the pen/quill icon
import "../css/center-outlet.css";
import CommentSection from "./CommentSection";
import moment from "moment";
import SinglePost from "./SinglePost"; // Import the SinglePost component
import PostForm from "./PostForm"; // Import the PostForm component

const CenterOutlet = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPostsFromAPI();
  }, []);

  const fetchPostsFromAPI = async () => {
    try {
      const response = await axios.get("http://localhost:5020/getAllPosts", {
        withCredentials: true,
      });
      const postsData = response.data.posts;
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
    } catch (error) {
      toast.error("Error while fetching posts.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostContentClick = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.post_id === postId) {
        return { ...post, show_comments: !post.show_comments };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleLikePost = (postId) => {
    axios
      .post(
        "http://localhost:5020/likePost",
        { postId },
        { withCredentials: true }
      )
      .then((res) => {
        const updatedPosts = posts.map((post) =>
          post.post_id === postId
            ? {
                ...post,
                post_likes_count: post.post_likes_count + 1,
                is_liked: true,
              }
            : post
        );
        setPosts(updatedPosts);
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
        const updatedPosts = posts.map((post) =>
          post.post_id === postId
            ? {
                ...post,
                post_likes_count: post.post_likes_count - 1,
                is_liked: false,
              }
            : post
        );
        setPosts(updatedPosts);
        toast.success("Post unliked!");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handleComment = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.post_id === postId
        ? {
            ...post,
            is_commenting: !post.is_commenting,
            show_comments: !post.show_comments,
          }
        : post
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

  const handleLikeComment = (postId, commentId) => {
    axios
      .post(
        "http://localhost:5020/likeComment",
        { commentId },
        { withCredentials: true }
      )
      .then((res) => {
        const updatedPosts = posts.map((post) => {
          if (post.post_id === postId) {
            const updatedComments = post.comments.map((comment) =>
              comment.comment_id === commentId
                ? {
                    ...comment,
                    likes_count: comment.likes_count + 1,
                    is_liked: true,
                  }
                : comment
            );
            return { ...post, comments: updatedComments };
          }
          return post;
        });
        setPosts(updatedPosts);
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
        const updatedPosts = posts.map((post) => {
          if (post.post_id === postId) {
            const updatedComments = post.comments.map((comment) =>
              comment.comment_id === commentId
                ? {
                    ...comment,
                    likes_count: comment.likes_count - 1,
                    is_liked: false,
                  }
                : comment
            );
            return { ...post, comments: updatedComments };
          }
          return post;
        });
        setPosts(updatedPosts);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <HashLoader color="#00BFFF" loading={isLoading} size={80} />
        <p>Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="center-outlet">
      <ToastContainer />
      <PostForm />
      {posts.length === 0 ? (
        <div>No posts available</div>
      ) : (
        posts.map((post) => (
          <div className="post" key={post.post_id}>
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
              {/* Add onClick to the post content */}
              <p onClick={() => handlePostContentClick(post.post_id)}>
                {post.post_content}
              </p>

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
              <span>
                {moment.utc(post.post_created_at).local().format("ddd, h:mm A")}
              </span>
              <button
                className="action-button"
                onClick={() => handleComment(post.post_id)}
              >
                <BsChatLeftText className="icon" />
                {post.post_comments_count} Comments
              </button>
            </div>
            {/* Use SinglePost component to display comments */}
            {post.show_comments && (
              <CommentSection
                postId={post.post_id}
                comments={post.comments}
                handleLikeComment={handleLikeComment}
                handleUnlikeComment={handleUnlikeComment}
                handleCommentInputChange={handleCommentInputChange}
                handleCommentPost={handleCommentPost}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CenterOutlet;
