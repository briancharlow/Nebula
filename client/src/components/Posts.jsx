import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiThumbUpLine, RiChat1Line, RiArrowDownSLine } from 'react-icons/ri';
import '../css/posts.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5020/posts')
      .then(res => {
        setPosts(res.data.posts);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // Function to handle liking a post
  const likePost = (postId) => {
    // Implement the logic to send a like request to the server and update the post's likes count
    // Example:
    // axios.post(`http://localhost:5020/likePost`, { postId })
    //   .then(res => {
    //     // Update the posts state with the updated likes count
    //     setPosts(prevPosts => ({
    //       ...prevPosts,
    //       [postId]: {
    //         ...prevPosts[postId],
    //         post_likes_count: res.data.likesCount
    //       }
    //     }));
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };

  // Function to handle commenting on a post
  const commentPost = (postId) => {
    // Implement the logic to handle commenting on a post
  };

  // Function to handle liking a comment
  const likeComment = (commentId) => {
    // Implement the logic to handle liking a comment
  };

  // Function to handle replying to a comment
  const replyComment = (commentId) => {
    // Implement the logic to handle replying to a comment
  };

  // Function to handle liking a reply
  const likeReply = (replyId) => {
    // Implement the logic to handle liking a reply
  };

  // Function to handle replying to a reply
  const replyReply = (replyId) => {
    // Implement the logic to handle replying to a reply
  };

  return (
    <div className="posts">
      {Object.values(posts).map(post => (
        <div className="post" key={post.post_id}>
          <div className="post-content">
            <h3>{post.post_content}</h3>
            <div className="post-info">
              <div className="user-info">
                <img src={post.post_user_profile_picture} alt="User Profile" />
                <p>{post.post_username}</p>
              </div>
              <div className="interactions">
                <div className="likes" onClick={() => likePost(post.post_id)}>
                  <RiThumbUpLine /> {post.post_likes_count}
                </div>
                <div className="comments" onClick={() => commentPost(post.post_id)}>
                  <RiChat1Line /> {post.post_comments_count}
                </div>
              </div>
            </div>
            {post.post_media_url && <img src={post.post_media_url} alt="Post Media" />}
          </div>
          {/* Render comments */}
          <div className="comments-section">
            {Object.values(post.comments).map(comment => (
              <div className="comment" key={comment.comment_id}>
                <div className="comment-content">
                  <p>{comment.comment_content}</p>
                  <div className="comment-info">
                    <div className="user-info">
                      <img src={comment.comment_user_profile_picture} alt="User Profile" />
                      <p>{comment.comment_username}</p>
                    </div>
                    <div className="interactions">
                      <div className="likes" onClick={() => likeComment(comment.comment_id)}>
                        <RiThumbUpLine /> {comment.comment_likes_count}
                      </div>
                      <div className="reply" onClick={() => replyComment(comment.comment_id)}>
                        <RiArrowDownSLine /> Reply
                      </div>
                    </div>
                  </div>
                </div>
                {/* Render replies */}
                <div className="replies-section">
                  {Object.values(comment.replies).map(reply => (
                    <div className="reply" key={reply.reply_id}>
                      <div className="reply-content">
                        <p>{reply.reply_content}</p>
                        <div className="reply-info">
                          <div className="user-info">
                            <img src={reply.reply_user_profile_picture} alt="User Profile" />
                            <p>{reply.reply_username}</p>
                          </div>
                          <div className="interactions">
                            <div className="likes" onClick={() => likeReply(reply.reply_id)}>
                              <RiThumbUpLine /> {reply.reply_likes_count}
                            </div>
                            <div className="reply" onClick={() => replyReply(reply.reply_id)}>
                              <RiArrowDownSLine /> Reply
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
